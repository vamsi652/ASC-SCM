import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
function DGST() {
  const {state}=useLocation();
  var list;
  if(state!=null){
    list=state.id;
  }
  const navigate=useNavigate()
  const GoHome=()=>{
    navigate("/DGST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
  const TransactionsPage=()=>{
    navigate("/TransactionHistory",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
  const RegisterPage=()=>{
    navigate("/Dreg",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
  const x=state.user;

  useEffect(() => {
  }, []);

  return (
    <div className='container-fluid'>
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
            <h1 style={{ textAlign: 'center' }}>DGST dashboard</h1>
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

      <div style={{ textAlign: 'center' }}>
        <div className="row 0">
          <Link to ="/DGRR" state={{"user":state.user,"Account":state.Account}}>
            <button className="btn btn-dark" style={{ width: 'max-content', marginTop: '200px', marginBottom: '20px' }}>
              RECIEVED REQUESTS
            </button>
          </Link>
        </div>
        
        <button onClick={TransactionsPage} className="btn btn-dark" style={{ width: 'max-content', marginBottom: '20px'}}>
              TRANSACTIONS
            </button>
            {/* <button onClick={RegisterPage} className="btn btn-dark" style={{ width: 'max-content', marginBottom: '20px'}}>
              REGISER NEW ACCOUNTS
            </button> */}
        {/* <div className="row 1">
          <a href="Transportation.html">
            <button className="btn btn-dark" style={{ width: 'max-content', marginBottom: '20px' }}>
              STATUS OF A REQUEST
            </button>
          </a>
        </div>
        <div className="row 2">
          <Link to="/ReqSent" state={{"user":state.user}}>
            <button className="btn btn-dark" style={{ width: 'max-content', marginBottom: '20px' }}>
              ALL REQUESTS
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default DGST;
