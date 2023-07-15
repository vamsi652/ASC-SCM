import React, { useEffect, useState,useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import './styles.css';

import axios from "axios";

export default function Trans() {
    const [res, setRes] = useState([]);
    const { state } = useLocation();
    let x = state.user;
    console.log(state);
    const navigate=useNavigate()
    const GoHome=()=>{
      if(state.user==='U-1' || state.user==='U-2' || state.user==='U-3' || state.user==='U-4'){
          navigate("/ADST",{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account}})
        }
        else if(state.user==='D-1' || state.user==='D-2'){
          navigate("/DDST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
        }
        else if(state.user==='ASC'){
          navigate("/DGST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
        }
        else if(state.user==='MANUFACTURER'){
          navigate("/md",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
        }
    }
    const tableRef = useRef();
    useEffect(() => {
        if (res.length > 0) {
        $(tableRef.current).DataTable();
        }
    }, [res]);
    

    
    async function get() {
        setRes([])
        const z =await axios.get(`http://localhost:4000/TransactionsHistory?param1=${x}`,{withCredentials:true});
        console.log(z.data,"hle");
        setRes(z.data)
    }
    useEffect(() => {
        get();
    }, []);
    return (
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg bg-body-primary navbar-light bg-secondary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <a class="nav-link active" aria-current="page" onClick={GoHome}><button class="btn btn-info" style={{fontWeight: 'bold'}}>Home</button></a>

              </li>
            </ul>
            <h1 style={{ textAlign: 'center' }}>Transaction History</h1>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0   align-items-center">
              <li>
              <h4><strong>
                <a id="user_name" style={{ marginRight: '50px' }}>{x}</a>
                </strong></h4>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <button className="btn btn-info" style={{fontWeight: 'bold',marginRight: '20px'}}>Logout</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br/>
      <br/>
      <div className="container-fluid">
        <div className="table-responsive">
                <table id="ex1"  className="table table-striped " ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>From address</th>
                            <th>To address</th>
                            <th>Action</th>
                            <th>Gas Used</th>
                            <th>Transaction Date(M/D/Y)</th>
                            <th>Transaction Time</th>
                        </tr>
                    </thead>
                    <tbody id="tablebody">
                        {res.map((data, index) => (
                            <tr key={index}>
                                <td>{data.transactionhash}</td>
                                <td>{data.from}</td>
                                <td>{data.to}</td>
                                <td>{data.purpose}</td>
                              <td>{String(data.gas)}</td>
                              <td>{data.transactionDate}</td>
                              <td>{data.transactionTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>   
      </div>
            </div>
        );
}