import React, { useState } from "react";
import "./index.css";
import "./l.css";
import "./YourBackgroundImage.css";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
export default function Log(){
const navigate=useNavigate();
    const [values,setvalues]=useState({Id:"",Password:""}) 
    const generateError=(err)=>toast.error(err,{
        position:"bottom-right",
    });
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            console.log(values)
            const {data} =await axios.get(`http://localhost:4000/Login?param1=${values.Id}&param2=${values.Password}`,{...values},{withCredentials:true});
            console.log(data.Account);
            if(data){
                if(data.errors){
                    const {email,password}=data.errors;
                    if(email) generateError(email);
                    else if(password) generateError(password);
                }
                else{
                    // dispatch({type:"LOGIN_SUCCESS",payload:data.data});
                    if(data.Role==="ADST"){
                        navigate("/ADST",{state:{"DD":data.Role,"user":data.Name,"id":data.Id,"Account":data.Account}}) ;
                    }
                    else if(data.Role==="DDST"){
                        navigate("/DDST",{state:{"DD":data.Role,"user":data.Name,"id":data.Id,"Account":data.Account}}) ;
                    }
                    else if(data.Role==="DGST"){
                        navigate("/DGST",{state:{"DD":data.Role,"user":data.Name,"id":data.Id,"Account":data.Account}}) ;
                    }
                    else{
                        navigate("/md",{state:{"DD":data.Role,"user":data.Name,"id":data.Id,"Account":data.Account}}) ;
                    }
                }
            }
        }catch(err){
            console.log(err)};
        };
    // console.log(user);
    return(
        <div className="login-page YourBackgroundImage">
            
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="form-group">
          <input type="text" id="user_id" className="form-control form-control-lg"
                        placeholder="User Id" name="Id" onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})}/>
                    <label className="form-label" for="form3Example3">User-id</label>
          </div>
          <div className="form-group">
          <input type="password" id="n2" class="form-control form-control-lg"
                        placeholder="Password" name="Password" onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})}/>
                    <label className="form-label" for="form3Example4">Password</label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      
    </div>
  );
};
//         <section className="vh-100">
//             <div className="container-fluid h-custom">
//             <div className="row d-flex justify-content-center align-items-center h-100">
//                 {/* <div className="col-md-9 col-lg-6 col-xl-5">
                // <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                //      className="img-fluid" alt="Sample image"/>
                // </div> */}
//                 <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//                 <form  onSubmit={(e)=>handleSubmit(e)}>
//                     {/* Email input */}
//                     <div className="form-outline mb-4">

//                     </div>
//                     <div className="form-outline mb-4">
//                     <input type="text" id="user_id" className="form-control form-control-lg"
//                         placeholder="User Id" name="Id" onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})}/>
//                     <label className="form-label" for="form3Example3">User-id</label>
//                     </div>
//                 {/* Password input  */}
//                     <div className="form-outline mb-3">
//                     <input type="password" id="n2" class="form-control form-control-lg"
//                         placeholder="Password" name="Password" onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})}/>
//                     <label className="form-label" for="form3Example4">Password</label>
//                     </div>
//                     <div className="text-center text-lg-start mt-4 pt-2">
//                     <button type="submit" className="btn btn-primary btn-lg">Login</button>
//                         {/* style="padding-left: 2.5rem; padding-right: 2.5rem;"  */}
//                     </div>
        
//                 </form>
//                 </div>
//             </div>
//             </div>
//             {/* <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
//             <div className="text-white mb-3 mb-md-0">
//                 Copyright © 2020. All rights reserved.
//             </div>
//             </div> */}
//          </section>
//     )
    
// }