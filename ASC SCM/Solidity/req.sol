// SPDX-Lisence-Identifier:MIT
pragma solidity >=0.4.0;

contract demoArray{
    struct l1{
        string id;
        string prod;
        int n;
        string date;
        string status;
        string status1;
        string prod_id;
    }
    l1[] public arr;
    uint i=0;
    function push_element(string memory u,string memory p,int n1,string memory x,string memory y,string memory z,string memory a) public {
        l1 memory s1;
        s1.id=u;
        s1.prod=p;
        s1.n=n1;
        s1.date=x;
        s1.status=y;
        s1.status1=z;
        s1.prod_id=a;
        arr.push(s1);
    }
    function update(string memory j,string memory x) public{
        for(i=0;i<arr.length;i++){
            if(keccak256(abi.encodePacked((arr[i].prod_id)))==keccak256(abi.encodePacked(j))){            
                arr[i].status=x;
            }
        }
    }
    function Approve(string memory j,string memory x) public{
        for(i=0;i<arr.length;i++){
            if(keccak256(abi.encodePacked((arr[i].prod_id)))==keccak256(abi.encodePacked(j))){            
                arr[i].status=x;
                arr[i].status1="Approved";
            }
        }
    }
    function ASC(string memory j,string memory x) public{
        for(i=0;i<arr.length;i++){
            if(keccak256(abi.encodePacked((arr[i].prod_id)))==keccak256(abi.encodePacked(j))){
            arr[i].status=x;
            arr[i].status1=x;
            }
        }
    }
    function getMyStructs() public view returns (l1[] memory) {
        return arr;
    }
    function len() public view returns(uint){
        return arr.length;
    }
}