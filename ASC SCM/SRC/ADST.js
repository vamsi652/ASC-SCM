import React, { useEffect } from 'react';
import { Link, useLocation,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function ADST() {
  const {state}=useLocation();
  var list;
  if(state!=null){
    list=state.id;
  }
  const navigate=useNavigate()
  const GoHome=()=>{
    navigate("/ADST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
  const TransactionsPage=()=>{
    navigate("/TransactionHistory",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
  const Transportation=()=>{
    navigate("/Transportation",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
}
    const x = state.user;
  useEffect(() => {
    // get();
  }, []);
  console.log("hi");
  // function get() {
  //   document.getElementById('user_name').innerHTML = x;
  //   console.log(x);
  //   console.log(state.Account);
  // }
  console.log(state.Account);
  return (
    <div className='container-fluid' >
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
            <h1 style={{ textAlign: 'center' }}>ADST dashboard</h1>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li>
              <h4><strong>
                <a id="user_name" style={{ marginRight: '50px' }}>{x}</a>
                </strong></h4>
              </li>
              <li>

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
      <div style={{ textAlign: 'center' }}>
        <div className="row 0">
          <Link to="/req" state={{"user":state.user,"Account":state.Account}}>
            <button className="btn btn-dark" style={{ width: 'max-content', marginTop: '200px', marginBottom: '20px' }} >
              PLACE REQUEST
            </button>
          </Link>
        </div>
        <div className="row 1">
          <Link to="/ADRR" state={{"user":state.user,"Account":state.Account}}>
          <button className="btn btn-dark" style={{ width: 'max-content', marginBottom: '20px' }}>
            RECEIVED REQUESTS
          </button>
          </Link>
        </div>
        <div className="row 2">
          <Link to="/ReqSent" state={{"user":state.user}}>
            <button className="btn btn-dark" style={{ width: 'max-content', marginBottom: '20px' }}>
              REQUESTS SENT
            </button>
          </Link>
        </div>
        <div >
        <button onClick={TransactionsPage} className="btn btn-dark" style={{ width: 'max-content', marginBottom: '20px' }}>TRANSACTIONS</button>
            </div>
            {/* <div >
        <button onClick={Transportation} className="btn btn-dark" style={{ width: 'max-content', marginBottom: '20px' }}>TRANSPORTATION</button>
            </div> */}
      </div>
    </div>
  );
}

export default ADST;
