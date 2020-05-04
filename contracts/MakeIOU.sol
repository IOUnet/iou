pragma solidity >=  0.6.0;
import "./IOUtoken.sol";


contract MakeIOU {
    mapping (address => address[]) listIOUs;
    mapping (string => address[]) listIOUsSoc;
    address[] allIOU;
    function makeIOU(string memory _name, 
                 string memory _symbol, 
                 uint8 _decimals, 
                 string _myName, //name of emitter
                 string _socialProfile, //profile  of emitter in social nets
                 string _description, //description of bond IOU to  work
                 string _location, //where is 
                 string _units //units of deal
                        ) public returns (address) {

        IOUtoken newIOU = new IOUtoken(_name, _symbol, _decimals, _myName, _socialProfile,  _description, _location, _units, msg.sender
        );
        allIOU.push(address(newIOU));
        listIOUs[msg.sender].push(address(newIOU));
        listIOUsSoc[_socialProfile].push(address(newIOU));
        }

    function getIOUList (address _owner) public view returns (address[] memory) {
            return listIOUs[_owner];
        }

    function getIOUListSoc (string _profile) public view returns (address[] memory) {
            return listIOUsSoc[_owner];
                }

    function withdraw (address _baseActive, uint256 _amount) public  onlyOwner {
            IOUtoken  BA = IOUtoken (_baseActive);
            BA.transfer (owner, _amount);
        }
        return address (newOption);

    }
}