import React from 'react';
const Address = "0x7Ac4678E1C6F9f61fCEb836B4f66f712a798375D";
const ABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "j",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			}
		],
		"name": "ASC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "j",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			}
		],
		"name": "Approve",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "arr",
		"outputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prod",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "n",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prod_id",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyStructs",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "prod",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "n",
						"type": "int256"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status1",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "prod_id",
						"type": "string"
					}
				],
				"internalType": "struct demoArray.l1[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "len",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "u",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "p",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "n1",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "y",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "z",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "a",
				"type": "string"
			}
		],
		"name": "push_element",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "j",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			}
		],
		"name": "update",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
export { ABI, Address };