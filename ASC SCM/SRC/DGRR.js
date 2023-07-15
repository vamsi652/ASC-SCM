import React, { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import { ABI, Address } from './ABI1';
import { ABI1, Address1 } from './ABI2';
import { ABI2, Address2 } from './ABI3';
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery"
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import axios from "axios";
import './styles.css';

export default function DGRR(){
    let account;
    const [res, setRes] = useState([]);
    const {state} = useLocation();
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
    const x = state.user;
    console.log(state);
    useEffect(() => {
        get();
      }, [])
      const tableRef = useRef();
    useEffect(() => {
    if (res.length > 0) {
        $(tableRef.current).DataTable();
    }
    }, [res]);
      
    const transactionTime = new Date();
    const { ethereum } = window;
    
    const get = async () => {
        try{
            setRes([]);
            let update=[];
        if(window.ethereum !== "undefined"){
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            account = accounts[2];
        }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
        window.contract1 = await new window.web3.eth.Contract(ABI1, Address1);
        window.contract2 = await new window.web3.eth.Contract(ABI2, Address2);
        const y=await window.contract1.methods.get_data().call();
        const y1=await window.contract1.methods.get_divdata().call();
        const d1=await window.contract2.methods.getMyStructs().call();
        var tabledata = "";
        let l,c=1,n,count=0,m=0;
        for (let i = 0; i < data.length; i++) {
            if(data[i][5]!="Approved"){
            count=0;c=0;
            for(let j=0;j<y.length;j++){
                if(data[i][0]==y[j][1]){
                    l=y[j][0];
                }
            }
            for(let j=0;j<y1.length;j++){
                if(l==y1[j][0]){
                    l=y1[j][1];
                }
                if(x==y1[j][1]){
                    n=y1[j][0];
                }
            }
            for(let k=0;k<y.length;k++){
                if(y[k][0]!=n){
                    count++;
                }
            }
            count+=y1.length-2;
            console.log(d1)
            for(let j=0;j<y.length;j++){
                console.log(n,y[j][0])
                    for(let k=0;k<d1.length;k++){
                        console.log(d1[k][6],y[j][1] ,d1[k][5],data[i][6])
                        if(d1[k][6]==y[j][1] && d1[k][5]==data[i][6]){
                            c++;
                        }
                }
            }
            if(data[i][5]=="ASC"){
                c++;
            }
            console.log(c,count)
            if(c==1){
                console.log(l,x ,data[i][4],x && data[i][5],"Approved")
                if(data[i][4]==x && data[i][5]!="Approved" && data[i][5]!=x){
                    if (!res.includes(data[[i]])) {
                        var arr=new Array(8);
                        arr[0]=data[i][0]; arr[1]=data[i][1]; arr[2]=data[i][2]; arr[3]=data[i][3]; arr[4]=data[i][4]; arr[5]=data[i][5]; arr[6]=data[i][6]; arr[7]="1"; 
                        update.unshift( arr);
                        m++;
                        console.log(arr,arr[7]==1);
                    }
                }
            }
            else if(c==count){
                console.log("HIIIII",data[i][4],data[i][4]==="ASC"||(1 && data[i][4]==="manufacturer"))
                if(data[i][4]==="ASC"||(1 && data[i][4]!="manufacturer")){
                    if (!res.includes(data[[i]])) {
                        var arr=new Array(8);
                        arr[0]=data[i][0]; arr[1]=data[i][1]; arr[2]=data[i][2]; arr[3]=data[i][3]; arr[4]=data[i][4]; arr[5]=data[i][5]; arr[6]=data[i][6]; arr[7]="0"; 
                        update.unshift( arr);
                        m++;
                        console.log(arr,arr[7]==0);
                    }
                }
            }
        }
        }
        if(m==0){
            console.log("Hi")
            document.getElementById("Nodata").innerHTML = `<div style="text-align: center">

            <img src="https://yt3.ggpht.com/a/AATXAJw3ypajMnRllsQ3h3xDrZC2rXzXhT4a_kKYgQ=s900-c-k-c0xffffffff-no-rj-mo" class="img-fluid " alt="...">
            </div>`
        }
        else{
        setRes(update);
        }
    }catch (error) {
        console.error(error);
      }
    }
    const quote=async(j,k,l)=>{
        try{

        if(window.ethereum !== "undefined"){
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[2];
            }
        window.web3 = await new Web3(ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            const data = await window.contract.methods.getMyStructs().call();
            console.log(j,k,l,x);
            if(k==x && l!=x){
                await window.contract.methods.ASC(j,x) .send({ from: state.Account })
                .then(async(result)=>{
                    await axios.post("http://localhost:4000/TransactionHistory",{"userId":state.user,"ReqId":j,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Forwarded to divisions","gas":result.gasUsed.toString(),"transactionDate": transactionTime.toLocaleDateString(),
                    "transactionTime": transactionTime.toLocaleTimeString(),},{withCredentials:true});
                 })
            }
            else{
                await window.contract.methods.update(j,"manufacturer") .send({ from: state.Account })
                .then(async(result)=>{
                    await axios.post("http://localhost:4000/TransactionHistory",{"userId":state.user,"ReqId":j,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Forwarded to manufacturer","gas":result.gasUsed.toString(),"transactionDate": transactionTime.toLocaleDateString(),
                    "transactionTime": transactionTime.toLocaleTimeString(),},{withCredentials:true});
                 })
            }
            const d1 = await window.contract.methods.getMyStructs().call();
            console.log(d1);
            window.location.reload();
        }catch (error) {
            console.error(error);
          }
    }
    const Approve=async(i)=>{
        try{
        if(window.ethereum !== "undefined"){
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[2];
            }
        window.web3 = await new Web3(ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            const data = await window.contract.methods.getMyStructs().call();
            await window.contract.methods.Approve(i,x) .send({ from: state.Account })
            .then(async(result)=>{
                await axios.post("http://localhost:4000/TransactionHistory",{"userId":state.user,"ReqId":i,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Accepted","gas":result.gasUsed.toString(),"transactionDate": transactionTime.toLocaleDateString(),
                "transactionTime": transactionTime.toLocaleTimeString(),},{withCredentials:true});
             })
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
      <br/>
      <br/>
        <div id="Nodata" className="container">
        <table id="ex1" className="table" ref={tableRef}>
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
                        {data[7]==="1"?
                        <td>
                            <button type="button" className="btn btn-primary" style={{ fontWeight: 'bold',width: '100px', height: '40px'  }} onClick={() => Approve(data[6])}>
                                Accept
                            </button>

                            <button type="button" className="btn btn-primary" style={{ fontWeight: 'bold',width: '200px', height: '40px',marginLeft: '50px' }} onClick={() => quote(data[6],data[4],data[5])}>
                                Forward To Divisions
                            </button>
                        </td>:
                        <td>
                        <button type="button" className="btn btn-primary" style={{ fontWeight: 'bold',width: '250px', height: '40px'}} onClick={() => quote(data[6],data[4],data[5])}>
                                Forward To manufacturer
                        </button>
                        </td>}
                    </tr>
                    
                ))}
            </tbody>
        </table>
        </div>
    </div>
);
}