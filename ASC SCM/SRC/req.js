import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ABI, Address } from './ABI1';
import { Link, useLocation, useNavigate} from 'react-router-dom';
function ADSTDashboard() {
  const {state} = useLocation();
    
    const navigate=useNavigate()
  const GoHome=()=>{
    navigate("/ADST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
  console.log(state.Account);
  const x = state.user;
  useEffect(() => {
    
    // getUserName();
  }, []);

  // const getUserName = () => {
  //   document.getElementById('user_name').innerHTML = x;
  //   console.log(x);
  // };

  const add = async () => {
    try{
    if (window.ethereum !== undefined) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      window.web3 = new Web3(window.ethereum);
      const contract = new window.web3.eth.Contract(ABI, Address); 
      const m2 = document.getElementById('n2').value;
      const m3 = document.getElementById('n3').value;
      const m4 = document.getElementById('n4').value;
      // const m4 = new Date().toLocaleDateString();
      const m5 = new Date().getTime();
      console.log(x, m2, m3,m4, 'pending', 'pending', '' + m5);
      await contract.methods
        .push_element(x, m2, m3,m4, 'pending', 'pending', '' + m5)
        .send({ from: state.Account }).then(result=>{console.log(result)})
    }
  }catch (error) {
    console.error(error);
  }
  };

  return (
    <>
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
            <h1 style={{ textAlign: 'center' }}>Request Form</h1>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  align-items-center">
              <li>
              <h4><strong>
                <a id="user_name" style={{ marginRight: '50px' }}>{x}</a>
                </strong></h4>
              </li>
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
      <br />
      <div className='container'>
      <div className="form">
        <label htmlFor="browser6" className="form-label">
          Product name:
        </label>
        <input type="text" className="form-control" list="browsers6" name="browser6" id="n2" />
        <br />
        <input type="number" name="quantity" placeholder="quantity" id="n3" />
        <br />
        <br/>
        <input type="date" name="date" placeholder="date" id="n4"/>
        <br/>
        <br />
        <button onClick={add} className='btn btn-primary'>Submit</button>
      </div>
      <p id="sum"></p>
      </div>
    </>
  );
}

export default ADSTDashboard;
