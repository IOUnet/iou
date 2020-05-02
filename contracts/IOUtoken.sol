pragma solidity ^0.6.0;
import "./token/ERC20/ERC20Burnable";
import "./token/ERC20/ERC20Mintable";

contract IOUtoken is ERC20Mintable, ERC20Burnable {

    struct IOU {
        address receiver;
        uint time;
        string IOUDescr; //what IOU is
    }

    struct FeedBack {
        address sender;
        uint time;
        uint8 rating; // estimation of skills in 255 grades
        string text; //comment
    }
    struct DescriptionIOU {
        string public myName ; //name of emitter
        string public socialProfile ; //profile  of emitter in social nets
        string public description ; //description of bond IOU to  work
        string public location; //where is it 
    }

    string memory _name, 
    string memory _symbol, 
    uint8 _decimals, 
    DescriptionIOU thisIOU;

    FeedBack[] public allFeedbacks;
    mapping (address => FeedBack[]) public feedBacksbySender; // feedback from tokenholders

    IOU[] public allIOUs;
    mapping (address => IOU[]) public IOUbyReceiver; // feedback from tokenholders

    address owner;
    //mapping (address => uint) Tokenholders;

    constructor (string memory _name, 
                 string memory _symbol, 
                 uint8 _decimals, 
                 string _myName, //name of emitter
                 string _socialProfile, //profile  of emitter in social nets
                 string _description, //description of bond IOU to  work
                 string _location, //where is 
                 address _actor
                ) public  {
        _removeMinter(msg.sender);
        _addMinter (_actor);
        require (_name.length < 13, "Too long name, must be < 12 chr" );
        name = _name;
        require (_symbol.length < 5, "Too long symbol, must be < 4 chr" );
        symbol = _symbol;
        decimals = _decimals;
        require (_myName.length < 257, "Too long Name, must be < 256 chr" );
        require (_socialProfile.length < 257, "Too long  Social Profile, must be < 256 chr" );
        require (_description.length < 257, "Too long description, must be < 256 chr" );
        require (_location.length < 257, "Too long location, must be < 256 chr" );
        
        thisIOU = new DescriptionIOU (
            _myName,
            _socialProfile,
            _description,
            _location
        );
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

    function setOwner (address _newOwner) public onlyOwner {
        _removeMinter(owner);
        owner = _newOwner;
        _addMinter(_newOwner);
    }

    function mint (address _who, uint256 _amount, string _bond) public onlyOwner { 
        IOU bond = IOU (_who, now, _bond);
        allIOUs.push(bond);
        IOUbyReceiver[_who].push(bond);
        super.mint(_who, _amount);
    }

    function burn (uint256 _amount, string _feedback) public {

        FeedBack feedback = FeedBack(msg.sender,now, _balls, _text);
        allFeedbacks.push(feedback);
        feedBacksbySender[msg.sender].push(feedback);
        require (balanceOf(msg.sender) > _amount, "Too more to burn" )
        super.burn(_amount);

    }

}
