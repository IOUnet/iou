pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import "./token/ERC20/ERC20Burnable.sol";
import "./token/ERC20/ERC20Mintable.sol";

/*** IOU ecosystem
*   The aim of IOU ecosystem is to give people proved fiat-free mutual settlements by issuing personal IOU tokens on Ethereum.
*   
*   1.Alice, the artist,  wants to get service from Bob, the barber but has no money. But she can issue ERC20 compatible IOU token  and fill this:
*   name of the token (Alice Artist 2020)
*   symbol of the token (AA01)
*   description of service (Artist: logos, infographic, cartoons)
*   location (New York)
*   social profile in LinkedIn (or Facebook or  smth else)
*   units (dollars, euros, hours, pictures…)
*   2. Alice negotiated the sum of her AA01 tokens,  transfers this to Bob, and get the beautiful hairstyle. And this deal fixes in the blockchain forever.
*   3. Two-month later Bob asked her later for a cartoon about his hairdressing salon.
*   4. After Alice made her job, Bob burns a part of  Alice’s IOU tokens and puts feedback, adding a rating of results.
*   5. Later Bob pays with Alice’s AA01 tokens to Peter, the webmaster, who supports Bob’s salon website. Peter looks for a fresh infographic for another project.
*   6. Peter doesn’t know Alice personally and he wants to check Alice’s reputation. He gets the history of Alice’s deals and looks feedbacks and rates, given to Alice. From another user s of IOU tokens, number of transactions and supply amount.
*   7. If he decides that all ok, he approve the deal in Alice's IOU tokens.
*   8. After Piter receives results, hi burned tokens and gives his feedback too.
*/
/// @author stanta
/// @title IOUtoken
contract IOUtoken is ERC20Mintable, ERC20Burnable {

    struct IOU {
        address receiver;
        uint time;
        bytes[256] IOUDescr; //what IOU is
    }

    struct FeedBack {
        address sender;
        uint time;
        uint8 rating; // estimation of skills in 255 grades
        bytes[256] text; //comment
    }
    struct DescriptionIOU {
        bytes[256]  myName ; //name of emitter
        bytes socialProfile ; //profile  of emitter in social nets
        bytes[256]  description ; //description of bond IOU to  work
        bytes[256]  location; //where is it 
        bytes[256] units;
    }

    bytes[256] public name;
    bytes[256] public  symbol;
    uint8 public decimals;
    uint256 public totalMinted;
    uint256 public totalBurned;
    DescriptionIOU thisIOU;

    FeedBack[] public allFeedbacks;
    mapping (address => uint256[]) public feedBacksbySender; // feedback from tokenholders

    IOU[] public allIOUs;
    mapping (address => uint256[]) public IOUbyReceiver; // feedback from tokenholders

    address owner;
    //mapping (address => uint) Tokenholders;

    constructor (bytes[256] memory _name, 
                 bytes[256] memory _symbol, 
                 bytes[256] memory _myName, //name of emitter
                 bytes memory _socialProfile, //profile  of emitter in social nets
                 bytes[256] memory _description, //description of bond IOU to  work
                 bytes[256] memory _location, //where is 
                 bytes[256] memory _units, //units of deal
                 address _actor
                ) public  {
        _removeMinter(msg.sender);
        _addMinter (_actor);
        require (_name.length < 13, "Too long name, must be < 12 chr" );
        name = _name;
        require (_symbol.length < 5, "Too long symbol, must be < 4 chr" );
        symbol = _symbol;
        decimals = 18;
        require (_myName.length < 257, "Too long Name, must be < 256 chr" );
        require (_socialProfile.length < 257, "Too long  Social Profile, must be < 256 chr" );
        require (_description.length < 257, "Too long description, must be < 256 chr" );
        require (_location.length < 257, "Too long location, must be < 256 chr" );
        require (_units.length < 10, "Too long units, must be < 10 chr" );
        
        thisIOU = DescriptionIOU (
            _myName,
            _socialProfile,
            _description,
            _location,
            _units
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
    
    modifier onlyHolder (uint256 _amount) {
        require (balanceOf(msg.sender) > _amount, "Not enougth amount for token holder" );
    _;
    }

    function mint (address _who, uint256 _amount, bytes[256] memory _descr) public onlyOwner { 
        require (_descr.length <256, "Description of IOU is too long, muust be < 256");
        IOU memory bond = IOU (_who, now, _descr);
        allIOUs.push(bond);
        IOUbyReceiver[_who].push(IOUbyReceiver[_who].length-1);
        super.mint(_who, _amount);
        totalMinted += _amount;
    }

    function burn (uint256 _amount, uint8 _rating, bytes[256] memory _feedback) public onlyHolder (_amount) {
        require (_feedback.length <256, "Feedback is too long, muust be < 256");

        FeedBack memory feedback = FeedBack(msg.sender,now, _rating, _feedback);
        allFeedbacks.push(feedback);
        feedBacksbySender[msg.sender].push(allFeedbacks.length-1);
        super.burn(_amount);
        totalBurned += _amount;

    }
/*
    function getTotalDebt() public pure returns (uint256) {
        return (_totalMinted - _totalBurned);
    }

    function getTotalMinted() public pure returns (uint256) {
        return _totalMinted;
    }

    function getTotalBurned() public pure returns (uint256) {
        return _totalBurned;
    }

    function getIOUslen ()  public pure returns (uint256) {
        return allIOUs.length;

    
    function getIOUid (uint256 _id)  public pure returns (address, uint256, bytes[256]) {
        return (allIOUs[_id].receiver,
                allIOUs[_id].time,
                allIOUs[_id].IOUDescr
            );

    
    function getFeedbackslen ()  public pure returns (uint256) {
        return allFeedbacks.length;

    
    function getFeedbackid (uint256 _id)  public pure returns (address, uint256, bytes[256]) {
        return (allFeedbacks[_id].receivsenderer,
                allFeedbacks[_id].time,
                allFeedbacks[_id].FeedbackDescr
            );
            */
}
