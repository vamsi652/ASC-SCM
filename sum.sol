//SPDX-License-Identifier: MIT
pragma solidity >=0.4.0;
contract helloWorld {
    int a=10;
    int b=12;
    function get()public view returns (int){
        return a+b;
    }
}