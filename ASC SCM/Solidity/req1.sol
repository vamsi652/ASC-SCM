pragma solidity >=0.4.0;

contract demoArray{
    struct l1{
        string id;
        string prod;
        int n;
        string date;
        string status;
        string prod_id;
        string uid;
    }
     l1[] public arr;
    uint i=0;
    function push_element(l1 memory x) public {
        l1 memory s1;
        s1.id=x.id;
        s1.prod=x.prod;
        s1.n=x.n;
        s1.date=x.date;
        s1.status=x.status;
        s1.prod_id=x.prod_id;
        s1.uid=x.uid;
        arr.push(s1);
    }
    function getMyStructs() public view returns (l1[] memory) {
        return arr;
    }
    function len() public view returns(uint){
        return arr.length;
    }
}