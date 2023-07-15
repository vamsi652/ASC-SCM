import React, { useEffect } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';

function DDSTDashboard() {
  const {state}=useLocation();
  var list;
  if(state!=null){
    list=state.id;
  }
  const navigate=useNavigate()
  const GoHome=()=>{
    navigate("/DDST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }

  const TransactionsPage=()=>{
    navigate("/TransactionHistory",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }

  const x=state.user;
  useEffect(() => {
    // const user = localStorage.getItem('user');
    // document.getElementById('user_name').innerHTML = user;
    // console.log(user);
  }, []);
  console.log(state.Account);
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
            <h1 style={{ textAlign: 'center' }}>DDST dashboard</h1>
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
      <div style={{ textAlign: 'center' }}>
        <div className="row 0">
          <Link to="/DDRR" state={{"user":state.user,"Account":state.Account}}>
            <button className="btn btn-dark" style={{ width: 'max-content', marginTop: '200px', marginBottom: '20px'}}>
              REQUESTS RECEIVED
            </button>
          </Link>
        </div>
        <div >
        

            <button onClick={TransactionsPage} className="btn btn-dark" style={{ width: 'max-content', marginBottom: '20px'}}>
            TRANSACTIONS
            </button>

        </div>
      </div>
      </div>
  );
}

export default DDSTDashboard;
