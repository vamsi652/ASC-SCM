import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import { ABI, Address } from './ABI1';
import $ from "jquery"
import "datatables.net"
export default function Transportation(){
    const navigate=useNavigate();
    console.log("Hi");
    const {state} = useLocation();
    const x = state.user;
    const [res, setRes] = useState([]);
    const tableRef = useRef();
    useEffect(() => {
    if (res.length > 0) {
        $(tableRef.current).DataTable();
    }
    }, [res]);
    
    const HandleTransportation=(i)=>{
        navigate("./"+i,{state:{"DD":state.DD,"user":state.user,"id":state.id}})
    }

        let account;
    const get = async () => {
        let update=[];
        document.getElementById("user_name").innerHTML=`${x}`;
        console.log(x);
        
        
        if(window.ethereum !== "undefined"){
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            account = accounts[0];
        }
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        
        if(x===data[i][0]  & data[i][5]==="Approved"){
            if (!res.includes(data[[i]])) {
                var arr=new Array(8);
                        arr[0]=data[i][0]; arr[1]=data[i][1]; arr[2]=data[i][2]; arr[3]=data[i][3]; arr[4]=data[i][4]; arr[5]=data[i][5]; arr[6]=data[i][6]; arr[7]="1"; 
                        update.unshift( arr);
                        
                        console.log(arr,arr[7]==1);
            }
        }
        setRes(update);
    }
    }
    
    
       
    return(
        <div className="container">
            <h6>Requests Sent</h6>
            <table className="table" ref={tableRef}> 
                <thead>
                    <tr>
                        <th>Request Id</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Approved by</th>
						<th>Status</th>
                    </tr>
                </thead>
                <tbody id="tablebody">
				{res.map((data, index) => (
                                
                                <tr key={index}>
                                    <td>{data[0]}</td>
                                    <td>{data[1]}</td>
                                    <td>{data[2]}</td>
                                    <td>{data[3]}</td>
                                    <td>{data[4]}</td>
                                    <td>
                                        <button type="button" onClick={(e)=>{HandleTransportation(data[6])}}>
                                        checkStatus
                                        </button>
                                    </td>
                                </tr>
                                
                            ))}	
                </tbody>
            </table>
    </div>
    )


}