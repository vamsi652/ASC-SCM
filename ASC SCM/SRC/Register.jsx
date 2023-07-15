import React,{useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import  {toast} from "react-toastify";
export default function Register(){
    // const MongoRegister=async()=>{
    //     console.log(Name,Id,Id1,Password)
    // }
    let c=0;
    const navigate=useNavigate();
    const [values,setValues]=useState({Name:"",Id:"",Id1:"",Password:"",Role:""})
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
                    
                }
            }
        }catch(err){console.log(err)};
    };
    return(
        <div>
            <form className="container" onSubmit={(e)=>handleSubmit(e)}>
                <p>Name:
                    <input type="text" placeholder="name" name="Name" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <p>Role:
                <input type="text" className="form-control small" list="browsers11" name="Role" id="n2" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
						<datalist id="browsers11">
							<option value="ADST"/>
							<option value="DDST"/>
							<option value="MANUFACTURER"/>
						</datalist>
                </p>
                <p>ID:
                    <input type="number" placeholder="child" name="Id" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                    {values.Role==="ADST"?
                    <input type="number" placeholder="parent" name="Id1" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>:""}
                </p>
                <p>Password:
                <input type="password" placeholder="password" name="Password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <button type="submit">Register</button>
            </form>
        </div>
        )
        
} 