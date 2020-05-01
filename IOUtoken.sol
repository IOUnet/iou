pragma solidity ^0.6.0;
import 'ERC223/token/ERC223/ERC223_token.sol';

contract IOUtoken is ERC223 {

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


    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
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
        owner = _actor;
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
    function feedback(uint8 _balls, bytes[256] _text) public onlyTokenholder {
        feedback = FeedBack(msk.sender,now, _balls, "","", _text);
        FeedBacksJournal.push(feedback);

    }

    function mintIOU (address _who, string[256] _bond) public onlyOwner { 

    }

    function burn (uint256 _amount, string[256] _feedback) onlyTokenholder {

    }

}
