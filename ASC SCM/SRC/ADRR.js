import React, { useEffect,useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Web3 from "web3";
import { ABI, Address } from './ABI1';
import { ABI1, Address1 } from './ABI2';
import { ABI2, Address2 } from './ABI3';
import { useLocation, useNavigate } from "react-router-dom";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import axios from "axios";
import $ from "jquery"
import './styles.css';
export default function ADRR(){
    const {state} = useLocation();
    const x = state.user;
    const [res, setRes] = useState([]);
    let account;
    const navigate=useNavigate()
  const GoHome=()=>{
    navigate("/ADST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
    console.log(state);
    let C=0;
    useEffect(() => {
        
        get();
      }, [])
      const transactionTime = new Date();
      const tableRef = useRef();
    useEffect(() => {
    if (res.length > 0) {
        $(tableRef.current).DataTable();
    }
    }, [res]);

    const { ethereum } = window;
    const get = async () => {
        try{
        console.log(x);
        console.log(state.Account);
        window.web3 = await new Web3(ethereum);
        if(typeof window.ethereum !== "undefined"){
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            account=accounts[0];
            console.log(accounts);
        }
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
        window.contract1 = await new window.web3.eth.Contract(ABI1, Address1);
        window.contract2 = await new window.web3.eth.Contract(ABI2, Address2);
        const y=await window.contract1.methods.get_data().call();
        const y1=await window.contract1.methods.get_divdata().call();
        const d1=await window.contract2.methods.getMyStructs().call();
        const z =await axios.get(`http://localhost:4000/Details?param1=ADST`,{withCredentials:true});
        const z1 =await axios.get(`http://localhost:4000/Details?param1=DDST`,{withCredentials:true});
        console.log(z.data);
        var tabledata = "";
        console.log(data,d1)
        let l,d,C=0;
            for(let j=0;j<y.length;j++){
                if(x==y[j][1]){
                    d=y[j][0];
                }
            } 
            for(let j=0;j<y1.length;j++){
                if(d==y1[j][0]){
                    d=y1[j][1];
                }
            }
            
        for (let i = 0; i < data.length; i++) {
            if(data[i][5]!=="Approved"){
            let f=0;
            for(let j=0;j<y.length;j++){
                if(data[i][0]==y[j][1]){
                    l=y[j][0];
                }
            }
            for(let j=0;j<y1.length;j++){
                if(l==y1[j][0]){
                    l=y1[j][1];
                }
            }
            console.log(d1.length,d1,data);
            for(let m=0;m<d1.length;m++){
                console.log(d1[i])
                console.log(d1[m][5],data[i][6],d1[m][6],x,"hi")
                if(d1[m][5]==data[i][6] && d1[m][6]==x){
                    f=1;
                }
            }
            console.log(data[i][0],x,d,l,f,data[i][4])
            if((data[i][0]!=x && d===l && f==0 && data[i][4]==d)|| data[i][5]=="ASC"&&data[i][0]!=x && d!=l&&f==0 ){
                if (!res.includes(data[[i]])) {
                    setRes((prev) => [ data[i],...prev]);
                    C++;
                }
                
            }}
        }
        if(C==0){
            console.log("Hi")
            document.getElementById("Nodata").innerHTML = `<div style="text-align: center">
    
            <img src="https://yt3.ggpht.com/a/AATXAJw3ypajMnRllsQ3h3xDrZC2rXzXhT4a_kKYgQ=s900-c-k-c0xffffffff-no-rj-mo" class="img-fluid " alt="...">
            </div>`
        }
        else{
      document.getElementById("tablebody").innerHTML = tabledata
        }
    }catch (error) {
        console.error(error);
      }
      
    }
    const quote=async(k)=>{
        try{
        if(typeof window.ethereum !== "undefined"){
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[0];
            }
        window.web3 = await new Web3(ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            const data = await window.contract.methods.getMyStructs().call();
            window.contract2=await new window.web3.eth.Contract(ABI2,Address2)
            var arr = new Array(7);
            for(let i=0;i<data.length;i++){
                if(data[i][6]===k){
                    arr[0]=data[i][0];
                    arr[1]=data[i][1];
                    arr[2]=data[i][2];
                    arr[3]=data[i][3];
                    arr[4]="Approved";
                    arr[5]=data[i][6];
                    arr[6]=x;
                }
            }
            await window.contract.methods.Approve(k,x) .send({ from: state.Account })
            .then(async(result)=>{
                await axios.post("http://localhost:4000/TransactionHistory",{"userId":state.user,"ReqId":arr[5],"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":arr[4],"gas":result.gasUsed.toString(),"transactionDate": transactionTime.toLocaleDateString(),
                "transactionTime": transactionTime.toLocaleTimeString(),},{withCredentials:true});
             })

            get();
            window.location.reload();
        }catch (error) {
            console.error(error);
          }
    }
    const reject=async(k)=>{
        try{
        if(typeof window.ethereum !== "undefined"){
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[0];
                
            }
            console.log(account);
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        window.contract2=await new window.web3.eth.Contract(ABI2,Address2)
        const data = await window.contract.methods.getMyStructs().call();
        var arr = new Array(7);
        console.log(data.length,await window.contract2.methods.getMyStructs().call());
        for(let i=0;i<data.length;i++){
                if(data[i][6]===k){
                arr[0]=data[i][0];
                arr[1]=data[i][1];
                arr[2]=data[i][2];
                arr[3]=data[i][3];
                arr[4]="Rejected";
                arr[5]=data[i][6];
                arr[6]=x;
                }
            }
            console.log("Rejected",arr)
            await window.contract2.methods.push_element(arr).send({ from: state.Account })
            
            .then(async(result)=>{
                console.log(result)
                await axios.post("http://localhost:4000/TransactionHistory",{"userId":state.user,"ReqId":arr[5],"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":arr[4],"gas":result.gasUsed.toString(),"transactionDate": transactionTime.toLocaleDateString(),
                "transactionTime": transactionTime.toLocaleTimeString(),},{withCredentials:true});
            })

           get();
           window.location.reload();
        }catch (error) {
            console.error(error);
          }
    }
    return(
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
            <h1 style={{ textAlign: 'center' }}>ADST dashboard</h1>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
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
      <div id="Nodata" className="container">
            <table class="table container" ref={tableRef}>
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
                                    <td>{data[4]}</td>
                                    <td>
                                        <button type="button" style={{ fontWeight: 'bold',width: '100px', height: '40px' }} className="btn bg-success" onClick={() => quote(data[6])}>
                                            Accept
                                        </button>
                                        <button type="button" style={{ fontWeight: 'bold',width: '100px', height: '40px',marginLeft: '50px' }} className="btn bg-danger" onClick={() => reject(data[6])}>
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                                
                            ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}