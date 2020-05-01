pragma solidity >=  0.5.0;

/**
configure SecurityDeposits parameter by ERC20 addresses
**/

contract SecurityDepositsTable {
    mapping (address=>uint) private SDT;// address of ERC20 => SecurityDepositPercent100
    address private owner ;

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setSDT (address _token, uint _sd100) public onlyOwner {
        SDT[_token] = _sd100;
    }

    function getSDT (address _token, uint _optionExpDays) public view returns (uint) {
        //todo add _optionExpDays to calculate security Deposite
        if (SDT[_token] > 0) {
        return SDT[_token];
        }
        else {
            return 100;  //100% security deposit if no information
        }
    }
}