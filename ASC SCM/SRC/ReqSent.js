import React, { useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import { ABI, Address } from './ABI1';
import { useLocation, useNavigate } from 'react-router-dom';
import $ from "jquery"
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import './styles.css';
const Req = () => {
  
  const {state} = useLocation();
    const x = state.user;
    const [res, setRes] = useState([]);
    const tableRef = useRef();
    const navigate=useNavigate()
  const GoHome=()=>{
    navigate("/ADST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
    useEffect(() => {
    if (res.length > 0) {
        $(tableRef.current).DataTable();
    }
    }, [res]);
  useEffect(() => {
    let account;
    const get = async () => {

      document.getElementById('user_name').innerHTML = `${x}`;
      console.log(x);

      if (window.ethereum !== undefined) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
      }

      window.web3 = new Web3(window.ethereum);
      window.contract = new window.web3.eth.Contract(ABI, Address);

      const data = await window.contract.methods.getMyStructs().call();
      console.log(data[4]);
      let tabledata = '';
      for (let i = 0; i < data.length; i++) {
        if (x === data[i][0]) {
          tabledata += `
            <tr>
              <td>${data[i][6]}</td>
              <td>${data[i][1]}</td>
              <td>${data[i][2]}</td>
              <td>${data[i][3]}</td>
              <td>${data[i][4]}</td>
              <td>${data[i][5]}</td>
            </tr>
          `;
        }
      }

      document.getElementById('tablebody').innerHTML = tabledata;
      setRes(tabledata);
    };
    
    get();
  }, []);

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-body-primary navbar-light bg-secondary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <a class="nav-link active" aria-current="page" onClick={GoHome}><button class="btn btn-info" style={{fontWeight: 'bold'}}>Home</button></a>

              </li>
            </ul>
            <h1 style={{ textAlign: 'center' }}>Requested Goods</h1>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li>
              <h4><strong>
                <a id="user_name" style={{ marginRight: '50px' }}></a>
                </strong></h4>
              </li>
              <a className="nav-item" href='/'>
              <button className="btn btn-info" style={{fontWeight: 'bold',marginRight: '20px'}}>Logout</button>
              </a>
            </ul>
          </div>
        </div>
      </nav>
      <br />
      <br />
      
      <br />
      <div className='container'>
      <table className="table" ref={tableRef}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Date(YYYY-MM-DD)</th>
            <th>Confirmation At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="tablebody"></tbody>
      </table>
      </div>
    </div>
  );
};

export default Req;
