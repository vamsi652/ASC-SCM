import React, { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import { ABI, Address } from './ABI1';
import { ABI1, Address1 } from './ABI2';
import { ABI2, Address2 } from './ABI3';
import { useLocation ,Link,Outlet, useNavigate} from "react-router-dom";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";

import axios from "axios";
import $ from "jquery"
import './styles.css';

export default function DDRR() {
    const [res, setRes] = useState([]);
    let account;
    let dt = 0;
    const {state} = useLocation();
    var list;
    if(state!=null){
      list=state.id;
    }
    console.log(state.Account);
    const navigate=useNavigate()
  const GoHome=()=>{
    navigate("/DDST",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
  }
    const TransactionsPage=()=>{
      navigate("/TransactionHistory",{state:{"DD":state.DD,"user":state.user,"id":state.id}})
    }

    const x = state.user;
    console.log(state);
    const { ethereum } = window;
    let m=0;
    const tableRef = useRef();
    useEffect(() => {
    if (res.length > 0) {
        $(tableRef.current).DataTable();
    }
    }, [res]);
    const transactionTime = new Date();
    async function get() {
        try{
        setRes([]);
        let update=[];
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[1];
        }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
        window.contract1 = await new window.web3.eth.Contract(ABI1, Address1);
        window.contract2 = await new window.web3.eth.Contract(ABI2, Address2);
        const y = await window.contract1.methods.get_data().call();
        const y1 = await window.contract1.methods.get_divdata().call();
        const d1 = await window.contract2.methods.getMyStructs().call();
        let l, c = 1, n, count = 0, f;
        for (let i = 0; i < data.length; i++) {
            c = 1;
            count = 0;
            f = 0;
            console.log(i, "m");
            if (data[i][5] !== "Approved") {
                for (let j = 0; j < y.length; j++) {
                    console.log(data[i][0], y[j][1], l, x)
                    if (data[i][0] === y[j][1]) {
                        l = y[j][0];
                    }
                }
                for (let j = 0; j < y1.length; j++) {
                    if (l === y1[j][0]) {
                        l = y1[j][1];
                    }
                    if (x === y1[j][1]) {
                        n = y1[j][0];
                    }
                }
                for (let j = 0; j < y.length; j++) {
                    if (n === y[j][0]) {
                        count++;

                    }
                }
                for (let j = 0; j < y.length; j++) {
                    if (n === y[j][0]) {
                        for (let k = 0; k < d1.length; k++) {

                            if (d1[k][6] === y[j][1] && d1[k][5] === data[i][6]) {
                                console.log(d1[k], i, k, d1[k][6] === y[j][1], d1[k][5] === data[i][6])
                                c++;
                                f = 1;
                            }
                        }
                    }
                }
                console.log(data[i])
                if (data[i][5] === "ASC") {
                    count += 1;
                }
                console.log(n, c, count, f);
                if (c !== count) {
                    if (((l === x && data[i][4] !== x && data[i][4] !== "Approved") || data[i][5] === "ASC") && f !== 1) {
                        
                        if (!res.includes(data[[i]])) {
                            var arr=new Array(8);
                            arr[0]=data[i][0]; arr[1]=data[i][1]; arr[2]=data[i][2]; arr[3]=data[i][3]; arr[4]=data[i][4]; arr[5]=data[i][5]; arr[6]=data[i][6]; arr[7]="1"; 
                            update.unshift( arr);
                            m++;
                            console.log(arr,arr[7]==1);
                        }

                        
                    }
                }
                else {
                    if ((((l === x) && (data[i][4] !== "ASC") && (data[i][5] !== "Approved")) || (data[i][5] === "ASC" && f !== 1))) {
                        
                        if (!res.includes(data[[i]])) {
                            var arr=new Array(8);
                            arr[0]=data[i][0]; arr[1]=data[i][1]; arr[2]=data[i][2]; arr[3]=data[i][3]; arr[4]=data[i][4]; arr[5]=data[i][5]; arr[6]=data[i][6]; arr[7]="0"; 
                            update.unshift( arr);
                            dt++;
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
        setRes(update)
        }
        console.log(res, "hello everyone",dt);

        }catch (error) {
            console.error(error);
          }
          
    }
    useEffect(() => {
        console.log("Heloo")
        
    
       
        get();
    }, []);

    const Approve = async (i) => {
        try{
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[1];
        }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);

        await window.contract.methods.Approve(i, x).send({ from: state.Account })
        .then(async(result)=>{
            await axios.post("http://localhost:4000/TransactionHistory", {
                "userId": state.user,
                "ReqId": i,
                "transactionhash": result.transactionHash,
                "from": result.from,
                "to": result.to,
                "purpose": "Approved",
                "gas": result.gasUsed.toString(), 
                "transactionDate": transactionTime.toLocaleDateString(),
                "transactionTime": transactionTime.toLocaleTimeString(),// Convert BigInt to string
              }, { withCredentials: true });         })

        
        get();
            }catch (error) {
                console.error(error);
              }
    }
    const quote = async (i,k) => {
        try{
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[1];
        }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
        if (k === x) {
            await window.contract.methods.update(i, "ASC").send({ from: state.Account })
            .then(async(result)=>{
                await axios.post("http://localhost:4000/TransactionHistory", {
                    "userId": state.user,
                    "ReqId": i,
                    "transactionhash": result.transactionHash,
                    "from": result.from,
                    "to": result.to,
                    "purpose": "Forwarded to ASC",
                    "gas": result.gasUsed.toString(),
                    "transactionDate": transactionTime.toLocaleDateString(),
                "transactionTime": transactionTime.toLocaleTimeString(), // Convert BigInt to string
                  }, { withCredentials: true });             })


        }
        else {
            await window.contract.methods.update(i, x).send({ from: state.Account })
            .then(async(result)=>{
                await axios.post("http://localhost:4000/TransactionHistory",{"userId":state.user,"ReqId":i,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Forwarded to units","gas":result.gasUsed.toString(),"transactionDate": transactionTime.toLocaleDateString(),
                "transactionTime": transactionTime.toLocaleTimeString(),},{withCredentials:true});
             })

        }
        get();
    }catch (error) {
        console.error(error);
      }
    }
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
            <h1 style={{ textAlign: 'center' }}>DDST dashboard</h1>
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
                <table id="ex1" className="table" ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Requested by</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Status</th>
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
                                    

                                    <button type="button" className="btn btn-primary" onClick={() => quote(data[6],data[4])}>
                                        Forward To Units
                                    </button>
                                </td>:
                                <td>
                                <button type="button" className="btn btn-primary" onClick={() => quote(data[6],data[4])}>
                                        Forward To DGST
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