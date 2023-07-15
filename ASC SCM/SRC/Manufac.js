import React, { useEffect, useState, useRef } from 'react';
import Web3 from 'web3';
import { ABI, Address } from './ABI1';
import { ABI1, Address1 } from './ABI2';
import { ABI2, Address2 } from './ABI3';
import { useLocation, useNavigate } from "react-router-dom";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery"
import axios from 'axios';
const Manufacturer = () => {
  const [user, setUser] = useState('');
  const [res, setRes] = useState([]);
  const {state} = useLocation();
    var list;
    if(state!=null){
      list=state.id;
    }
    const navigate=useNavigate()
  const GoHome=()=>{
    navigate("/md",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
    const TransactionsPage=()=>{
      navigate("/TransactionHistory",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
    }
  const x = state.user;

  useEffect(() => {
    get();
  }, []);

  const tableRef = useRef();
    useEffect(() => {
    if (res.length > 0) {
        $(tableRef.current).DataTable();
    }
    }, [res]);
    const transactionTime = new Date();
  const get = async () => {
    try{
      setRes([]);
        let update=[];
    const x = localStorage.getItem('user');
    setUser(x);
    console.log(x);

    if (window.ethereum !== undefined) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[3];
      window.web3 = new Web3(window.ethereum);
      window.contract = new window.web3.eth.Contract(ABI, Address);
      const data = await window.contract.methods.getMyStructs().call();
      window.contract1 = new window.web3.eth.Contract(ABI1, Address1);
      window.contract2 = new window.web3.eth.Contract(ABI2, Address2);
      const y = await window.contract1.methods.get_data().call();
      const y1 = await window.contract1.methods.get_divdata().call();
      const d1 = await window.contract2.methods.getMyStructs().call();

      let tabledata = '';
      let l, c = 1, n, count = 0,m=0;
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        if (data[i][4] === 'manufacturer' && data[i][5] !== 'Approved') {
          var arr=new Array(8);
          arr[0]=data[i][0]; arr[1]=data[i][1]; arr[2]=data[i][2]; arr[3]=data[i][3]; arr[4]=data[i][4]; arr[5]=data[i][5]; arr[6]=data[i][6]; arr[7]="1"; 
          update.unshift( arr);
          m++;
          console.log(arr,arr[7]==1);
        }
      }
      if(m==0){
        console.log("Hi")
        document.getElementById("Nodata").innerHTML = `<div style="text-align: center">
  
        <img src="https://yt3.ggpht.com/a/AATXAJw3ypajMnRllsQ3h3xDrZC2rXzXhT4a_kKYgQ=s900-c-k-c0xffffffff-no-rj-mo" class="img-fluid " alt="...">
        </div>`
    }
    else{
      document.getElementById('tablebody').innerHTML = tabledata;
    }
    }
    

    setRes(update);
  
  }catch (error) {
    console.error(error);
  }
  };

  const Approve = async (i) => {
    try{
    if (window.ethereum !== undefined) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[3];
      
    }
    window.web3 = new Web3(window.ethereum);
      console.log('hi');
      await window.contract.methods.Approve(i, x).send({ from: state.Account })
      .then(async(result)=>{
        await axios.post("http://localhost:4000/TransactionHistory",{"userId":state.user,"ReqId":i,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Accepted","gas":result.gasUsed.toString(),"transactionDate": transactionTime.toLocaleDateString(),
        "transactionTime": transactionTime.toLocaleTimeString(),},{withCredentials:true});
     })
    
    window.location.reload();
  }catch (error) {
    console.error(error);
  }
  };

  return (
    <div>
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
            <h1 style={{ textAlign: 'center' }}>Manufacturer dashboard</h1>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  align-items-center">
            <h4><strong>
                <a id="user_name" style={{ marginRight: '50px' }}>{x}</a>
                </strong></h4>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <button className="btn btn-info" style={{fontWeight: 'bold',marginRight: '20px'}}>Logout</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <div id='Nodata' className='container'>
      <table className="table" ref={tableRef}>
        <thead>
          <tr>
            <th>Requested by</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Forwarded By</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody id="tablebody">

                {res.map((data, index) => (
                    <tr key={index}>
                        <td>{data[0]}</td>
                        <td>{data[1]}</td>
                        <td>{String(data[2])}</td>
                        <td>{data[3]}</td>
                        <td>{data[5]}</td>
                        
                        <td>
                            <button type="button" className="btn btn-primary" style={{ fontWeight: 'bold',width: '100px', height: '40px'  }} onClick={() => Approve(data[6])}>
                                Approve
                            </button>

                        
                        </td>:
                        
                    </tr>
                    
                ))}
            </tbody>
      </table>
      </div>
    </div>
  );
};

export default Manufacturer;
