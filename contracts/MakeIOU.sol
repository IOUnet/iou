pragma solidity >=  0.5.0;
pragma experimental ABIEncoderV2;
import "./IOUtoken.sol";
import "./StoreIOUs.sol";

contract MakeIOU {

    
    address private owner;
    StoreIOUs store;

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setStore (address _newOwner) public onlyOwner {
        store = StoreIOUs(_newOwner);
        
    }   

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }


    function makeIOU(string memory _name, 
                 string memory _symbol, 
                 bytes[64] memory _myName, //name of emitter
                 string memory _socialProfile, //profile  of emitter in social nets
                 bytes[128] memory _description, //description of bond IOU to  work
                 bytes[128]  memory _location, //where is                  
                 bytes32  _units, //units of deal
                 bytes32[] memory _keywords
                        ) public returns (address) {

        IOUtoken newIOU = new IOUtoken();
        newIOU.setIOU(  _name, 
                        _symbol,                          
                        _myName, 
                        _socialProfile,  
                        _description,
                        _location,
                        _units, 
                        _keywords,
                        address(store),
                        msg.sender
            );
        //store.addIOU2(address(newIOU), _socialProfile, msg.sender, _keywords);
        
        store.addIOU1(address(newIOU));//, _socialProfile, msg.sender, _keywords);

        return address (newIOU);
        }

  
}