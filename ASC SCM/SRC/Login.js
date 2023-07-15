import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Web3 from 'web3';

export default function LoginPage() {
  let account;
  const {state}=useLocation();
  const navigate=useNavigate();
  const ABI = [
    {
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "division_name",
						"type": "string"
					}
				],
				"internalType": "struct data.l2",
				"name": "x",
				"type": "tuple"
			}
		],
		"name": "Register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "division",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "unit_name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "details",
						"type": "uint256"
					}
				],
				"internalType": "struct data.l1",
				"name": "x",
				"type": "tuple"
			}
		],
		"name": "Register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "division_name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arr1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "division",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "unit_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "details",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arr2",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arr3",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "man",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ASC",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					}
				],
				"internalType": "struct data.l3[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_data",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "division",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "unit_name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "details",
						"type": "uint256"
					}
				],
				"internalType": "struct data.l1[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_divdata",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "division_name",
						"type": "string"
					}
				],
				"internalType": "struct data.l2[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manu",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "man",
						"type": "string"
					}
				],
				"internalType": "struct data.l4[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
  ];
  const Address = "0xd82A15374302c0e7A386d927f930B12c5f1dad4C";
  
    // const get = async () => {
	// 	console.log("hi");
    //   if (window.ethereum !== undefined) {
    //     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    //     account = accounts[0];
    //   }
	  
    //   window.web3 = await new Web3(window.ethereum);
    //   window.contract = await new window.web3.eth.Contract(ABI, Address);
    //   const x = await window.contract.methods.get_data().call();
    //   const x1 = await window.contract.methods.get_divdata().call();
    //   const x2 = await window.contract.methods.ASC().call();
    //   const x3 = await window.contract.methods.manu().call();
	//   console.log(x);
	//   navigate("/ADST",{state:{"user":"vamsi","id":"25"}});
    //     for (let i = 0; i < x.length; i++) {
	// 		console.log(x[i][2], document.getElementById("user_id").value)
    //         if (x[i][2] === document.getElementById("user_id").value) {
    //           localStorage["user"] = x[i][1];
    //           localStorage["id"] = x[i][0];
			  
              
    //         }
    //       }

      
    //   for (let i = 0; i < x1.length; i++) {
    //     if (x1[i][0] === document.getElementById("user_id").value) {
    //       localStorage["user"] = x1[i][1];
    //       navigate("/ADST",{state:{"user":"vamsi","id":"25"}});
    //     }
    //   }
    //   for (let i = 0; i < x2.length; i++) {
    //     if (x2[i][0] === document.getElementById("user_id").value) {
    //       localStorage["user"] = x2[i][1];
    //       document.location.href = "http://127.0.0.1:5500/DGST.html";
    //     }
    //   }
    //   for (let i = 0; i < x3.length; i++) {
    //     if (x3[i][0] === document.getElementById("user_id").value) {
    //       localStorage["user"] = x3[i][1];
    //       document.location.href = "http://127.0.0.1:5500/Manufacturer.html";
    //     }
    //   }
    // }
	const Login=async()=>{
		console.log("Hi");
		const {ethereum} = window;
		if (ethereum !== undefined) {
			    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			    account = accounts[0];
			  }
			  
			  window.web3 = await new Web3(ethereum);
			  window.contract = await new window.web3.eth.Contract(ABI, Address);
			  const x = await window.contract.methods.get_data().call();
			  const x1 = await window.contract.methods.get_divdata().call();
			  const x2 = await window.contract.methods.ASC().call();
			  const x3 = await window.contract.methods.manu().call();
			    for (let i = 0; i < x.length; i++) {
					console.log(""+x[i][2],""+document.getElementById("user_id").value,""+x[i][2] === ""+document.getElementById("user_id").value)
			        if (""+x[i][2] ===""+document.getElementById("user_id").value) {
			          localStorage["user"] = x[i][1];
			          localStorage["id"] = x[i][0];
					  navigate("/ADST",{state:{"user":"vamsi","id":"25"}});
					  
			        }
			      }
				  for (let i = 0; i < x1.length; i++) {

					    if (""+x1[i][0] === ""+document.getElementById("user_id").value) {
					      localStorage["user"] = x1[i][1];
					      navigate("/DDRR",{state:{"user":"vamsi","id":"25"}});
					    }
					  }
					  for (let i = 0; i < x2.length; i++) {
					    if (""+x2[i][0] === ""+document.getElementById("user_id").value) {
					      localStorage["user"] = x2[i][1];
					      navigate("/DGST",{state:{"user":"vamsi","id":"25"}});
					    }
					  }
					  for (let i = 0; i < x3.length; i++) {
					    if (""+x3[i][0] ===""+ document.getElementById("user_id").value) {
					      localStorage["user"] = x3[i][1];
						  navigate("/Manufac",{state:{"user":"vamsi","id":"25"}});					    }
					  }
	}
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="form-outline mb-4">
                <input type="text" id="user_id" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="user_id">User ID</label>
              </div>
              <button type='button' className="btn btn-primary btn-lg" onClick={Login}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
