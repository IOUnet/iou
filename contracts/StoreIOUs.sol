pragma solidity >=  0.5.0;
pragma experimental ABIEncoderV2;



contract StoreIOUs {

    mapping (address => address[]) public listIOUs; // list of emitted IOUs from emitent
    mapping (bytes => address[])   listIOUsSoc; // list of emitted IOUs by social profile
    mapping (address => address[]) public listHoldersIOUs; //list of tokens by holder
    mapping (address => bool) public isIOU; //security check is token emitted 
    mapping (address => mapping (address => bool)) isHolderthisIOU; //  check list of tokens by holder
    mapping (bytes32 => address[]) listbyKeys; //list of IOUs by keyword
    bytes32[] public allKeywords;  //list all keywords
    address[] public allIOU; //list all emitted IOus

    address owner;

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

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }


    function addIOU (address _newIOU, 
                    string memory _socialProfile, 
                    address _emitent, 
                    bytes32[] _keywords) 
                    public onlyMake
        {
        
        allIOU.push(newIOU);
        isIOU[_newIOU] = true;
        listIOUs[_emitent].push(_newIOU);
        listIOUsSoc[_socialProfile].push(_newIOU);

        lenArr = _keywords.length > 5 ? 5: _keywords.length;
        let lenkey;
        for (uint k=0 ; k < lenArr ; k++){
        
            if (_keywords[k] > 0 ){
                if  (listbyKeys[_keywords[k]].length == 0 ) {
                    
                    allKeywords.push(_keywords[k]);
                }
                listbyKeys[_keywords[k]].push(address(newIOU));
            }
        } 
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