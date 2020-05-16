pragma solidity >=  0.5.0;
pragma experimental ABIEncoderV2;
import "./IOUtoken.sol";


contract MakeIOU {
    mapping (address => address[]) public listIOUs; // list of emitted IOUs from emitent
    mapping (string => address[])   listIOUsSoc; // list of emitted IOUs by social profile
    mapping (address => address[]) public listHoldersIOUs; //list of tokens by holder
    mapping (address => bool) public isIOU; //security check is token emitted 
    mapping (address => mapping (address => bool)) isHolderthisIOU; //  check list of tokens by holder
    mapping (string => address[]) listbyKeys; //list of IOUs by keyword
    string[] public allKeywords;  //list all keywords
    address[] public allIOU; //list all emitted IOus
    
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
    modifier isIOUtoken () {
        require (isIOU[msg.sender], "Not IOU token calls" );
        _;
    }

    function makeIOU(string memory _name, 
                 string memory _symbol, 
                 string memory _myName, //name of emitter
                 string memory _socialProfile, //profile  of emitter in social nets
                 string memory _description, //description of bond IOU to  work
                 string memory _location, //where is                  
                 string memory _units, //units of deal
                 string[] memory _keywords
                        ) public returns (address) {

        IOUtoken newIOU = new IOUtoken(
                        _name, 
                        _symbol,                          
                        _myName, 
                        _socialProfile,  
                        _description,
                        _location,
                        _units, 
                        _keywords,
                        msg.sender
            );
        allIOU.push(address(newIOU));
        isIOU[address(newIOU)] = true;
        listIOUs[msg.sender].push(address(newIOU));
        listIOUsSoc[_socialProfile].push(address(newIOU));
        uint l= _keywords.length > 5 ? 5: _keywords.length;
        for (uint k=0 ; k <l ; k++){
        
            if (bytes(_keywords[k]).length  > 0 ){
                if  (listbyKeys[_keywords[k]].length == 0 ) {
                    allKeywords.push(_keywords[k]);
                }
                listbyKeys[_keywords[k]].push(address(newIOU));
            }
        } 
        return address (newIOU);
        }

    function getIOUList (address _owner) public view returns (address[] memory) {
            return listIOUs[_owner];
        }

    function getIOUListSoc (string memory _profile) public view returns (address[] memory) {
            return listIOUsSoc[_profile];
                }

    function getIOUListKey (string memory _key) public view returns (address[] memory) {
            return listbyKeys[_key];
                }

    function withdraw (address _baseActive, uint256 _amount) public  onlyOwner {
            IOUtoken  BA = IOUtoken (_baseActive);
            BA.transfer (owner, _amount);

    }

    function addHolder(address _holder, address _IOUtoken) public isIOUtoken {
        if (!isHolderthisIOU[_holder][_IOUtoken] ) {
            listHoldersIOUs [_holder].push(_IOUtoken);
            isHolderthisIOU[_holder][_IOUtoken] = true;
        }
    }

    function getIOUListHold (address _holder) public view returns (address[] memory) {
            return listHoldersIOUs [_holder];
        }

  
}