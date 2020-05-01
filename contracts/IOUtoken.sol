pragma solidity ^0.5.0;
import "./token/ERC20/ERC20Burnable";
import "./token/ERC20/ERC20Mintable";

contract IOUtoken is ERC20Mintable, ERC20Burnable {

    struct IOU {
        address receiver;
        uint time;
        string[256] IOUDescr; //what IOU is
    }

    struct FeedBack {
        address sender;
        uint time;
        uint8 rating; // estimation of skills in 255 grades
        string[256] text; //comment
    }
    struct DescriptionIOU {
        string[256] public myName ; //name of emitter
        string[256] public socialProfile ; //profile  of emitter in social nets
        string[256] public description ; //description of bond IOU to  work
        string[256] public location; //where is it 
    }

    DescriptionIOU thisIOU;

    FeedBack[] public allFeedbacks;
    mapping (address => FeedBack[]) public feedBacksbySender; // feedback from tokenholders

    IOU[] public allIOUs;
    mapping (address => IOU[]) public IOUbyReceiver; // feedback from tokenholders

    address owner;
    //mapping (address => uint) Tokenholders;

    constructor (string memory name, 
                 string memory symbol, 
                 uint8 decimals, 
                 string[256] _myName, //name of emitter
                 string[256] _socialProfile, //profile  of emitter in social nets
                 string[256] _description, //description of bond IOU to  work
                 string[256] _location, //where is 
                 address _actor
                ) public ERC223 (name,  symbol,  decimals)  {
        _removeMinter(msg.sender);
        _addMinter (_actor;)
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
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

    function mint (address _who, uint256 _amount, string[256] _bond) public onlyOwner { 
        IOU bond = IOU (_who, now, _bond);
        allIOUs.push(bond);
        IOUbyReceiver[_who].push(bond);
        super.mint(_who, _amount);
    }

    function burn (uint256 _amount, string[256] _feedback) public {

        FeedBack feedback = FeedBack(msg.sender,now, _balls, _text);
        allFeedbacks.push(feedback);
        feedBacksbySender[msg.sender].push(feedback);
        require (balanceOf(msg.sender) > _amount, "Too more to burn" )
        super.burn(_amount);

    }

}
