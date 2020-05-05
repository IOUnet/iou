pragma solidity >=  0.5.0;
pragma experimental ABIEncoderV2;
import "./IOUtoken.sol";


contract MakeIOU {
    mapping (address => address[]) listIOUs;
    mapping (bytes => address[]) listIOUsSoc;
    address[] allIOU;
    address private owner;

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }


    function makeIOU(bytes[256] memory _name, 
                 bytes[256] memory _symbol, 
                 bytes[256] memory _myName, //name of emitter
                 bytes memory _socialProfile, //profile  of emitter in social nets
                 bytes[256] memory _description, //description of bond IOU to  work
                 bytes[256] memory _location, //where is 
                 bytes[256] memory _units //units of deal
                        ) public returns (address) {

        IOUtoken newIOU = new IOUtoken(
                        _name, 
                        _symbol,                          
                        _myName, 
                        _socialProfile,  
                        _description,
                        _location,
                        _units, 
                        msg.sender
            );
        allIOU.push(address(newIOU));
        listIOUs[msg.sender].push(address(newIOU));
        listIOUsSoc[_socialProfile].push(address(newIOU));
        return address (newIOU);
        }

    function getIOUList (address _owner) public view returns (address[] memory) {
            return listIOUs[_owner];
        }

    function getIOUListSoc (bytes memory _profile) public view returns (address[] memory) {
            return listIOUsSoc[_profile];
                }

    function withdraw (address _baseActive, uint256 _amount) public  onlyOwner {
            IOUtoken  BA = IOUtoken (_baseActive);
            BA.transfer (owner, _amount);

    }
}