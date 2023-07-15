import React,{useState} from "react";
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";
import  {toast} from "react-toastify";
export default function Register(){
  const [res, setRes] = useState([]);
    const { state } = useLocation();
    let x = state.user;
    console.log(state);
    const navigate=useNavigate()
    const GoHome=()=>{
      if(state.id===176 || state.id===177 || state.id===178 || state.id===179){
          navigate("/ADST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
        }
        else if(state.id===276 || state.id===277){
          navigate("/DDST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
        }
        else if(state.id===376){
          navigate("/DGST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
        }
        else if(state.id===476){
          navigate("/md",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
        }
    }
    let c=0;
    const [values,setValues]=useState({Name:"",ID: [
      { id: 0 },
      { parent: 0 },
    ],Password:"",Role:""})
    const generateError=(err)=>toast.error(err,{
        position:"bottom-right",
    });
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            console.log(values)
            const {data} =await axios.post("http://localhost:4000/Register",{...values},{withCredentials:true});
            console.log(data);
            if(data){
                if(data.errors){
                    const {email,password}=data.errors;
                    if(email) generateError(email);
                    else if(password) generateError(password);
                }
                else{
                    
                    document.getElementById("sub").innerHTML = `Successfully Registered.......`;
                }
            }
        }catch(err){console.log(err)};
        
    };
    return(
        <div>
          <nav className="navbar navbar-expand-lg bg-body-primary navbar-light bg-secondary">
        
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
          <h1 style={{ textAlign: 'center' }}>REGISTER NEW ACCOUNT</h1>
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
      
    </nav>
    <br/>
      <br/>
            <form className="container" onSubmit={(e)=>handleSubmit(e)}>
                <p>Name:
                    <input type="text" placeholder="name" name="Name" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <p>Role:
                <input type="text" placeholder="Role" className="form-control small" list="browsers11" name="Role" id="n2" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
						<datalist id="browsers11">
							<option value="ADST"/>
							<option value="DDST"/>
						</datalist>
                </p>
                <p>ID:
                    <input type="number" placeholder="child" name="Id" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                    
                    <input type="number" placeholder="parent" name="Id1" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <p>Password:
                <input type="password" placeholder="password" name="Password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <button type="submit">Register</button>
            </form>
            <h1 id="sub"></h1>
        </div>
        )
        
}