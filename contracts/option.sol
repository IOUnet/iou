pragma solidity >=  0.5.0;
//pragma experimental ABIEncoderV2;

// C:/work/dfd/dfd/contracts/option.sol
// https://github.com/stanta/openzeppelin-contracts.gitvscode-solidity
// link to folder in project dir
import "./token/ERC20/ERC20Capped.sol";
import "./token/ERC20/ERC20.sol";


/*
1. Emitent emits ) option as smart contract:
BaseActive1,
BaseActive2,
OptionSumBA1
OptionSumBA2,
ExpireDAte
SecurityDepositPercent
NumberofTokens
1.1 Emitent pays  in BA1*SecurityDepositPercent =  security seposit  to contract as percent equal to sum of
 volatilities of Base Acives
2. Broker buy ERC20 tokens of emiting option as for same sum in BA2 * SecurityDepositPercent
(percent equal to sum of volatilities of Base Acives).
3. At the day of option expires, Emitent should put residual part  of OptionsSum to the contract .
4. After that, broker can pay residue of sum for his/her tokens in BA2 to contract and get proportional sum  of BA1
5. IF EMITENT escapes from paying residual sum of BA1, he/she lose SecurityDeposite and
5.1. Brokers have to send their option token to contract and
5.2  returns their broker's payments of SD + and get proportional part of  emitent's Security Deposite
as penalty for lose profit.
6. If allright, if emitent paied all sum of option to contract, after option expire,
emitent can withdraw unsold tokens and
 return un-exchanged part option.
*/
contract Options is ERC20Capped {
    struct Option {
        address addrBA1; // address of ERC20 of  BaseActive1;
        address addrBA2;// address of ERC20 of BaseActive2;
        uint amountBA1; // amount of BaseActive1
        uint amountBA2; //  amount of BaseActive2
        uint sd1; // security deposite percent of BaseActive1
        uint sd2; // security deposite percent  of BaseActive2
        uint expDays; //ExpireDays;
        bytes desctiption;
        bytes addrDFS; //address in distributed file system
        bytes32 typeDFS; //type of distributed file system
    }

    Option  public thisOpt ;
    address private owner ;
    uint private isDeposited;
    uint private  fullDeposited;
    mapping (address=>uint256) private purchases;
    mapping (address=>uint256) private options;
    address[] private listpurchases;
    uint private soldBA1;

    // 1. Emitent emits ) option as smart contract:
    constructor (address _addrBA1, // address of ERC20 of  BaseActive1;
                address _addrBA2,// address of ERC20 of BaseActive2;
                uint _amountBA1, //
                uint _amountBA2, //
                uint _sd1,
                uint _sd2,
                uint _expDays, //ExpireDays;
                bytes memory _description) ERC20Capped (_amountBA1) public  {

        thisOpt = Option (
                            _addrBA1, _addrBA2,
                            _amountBA1, _amountBA2,
                            _sd1, _sd2,
                            _expDays, _description,"","");
        owner = msg.sender;

    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    // 1.1 Emitent pays  in BA1*SecurityDepositPercent =  security seposit  to contract
    function makeDeposite () public onlyOwner  {
        uint coefSD = thisOpt.sd1;
        ERC20 ba1 = ERC20(thisOpt.addrBA1);
        ba1.transferFrom(msg.sender, address(this),
                        coefSD * thisOpt.amountBA1);
        isDeposited = now;
        if (coefSD >= 100 ) {
            fullDeposited = now;
        }

    }

    // 2. Broker buying  ERC20 tokens of emiting option as for same sum in BA2 * SecurityDepositPercent
    function initPurshinBA2 (uint _amountBA2) public { //buyOption
        ERC20 ba2 = ERC20(thisOpt.addrBA2);
        // uint depositedBA2 = ba2.balanceOf(address(this));
        require(isDeposited > 0, "No enought deposite allocated  emitent, wait a little.");
        require(isDeposited + thisOpt.expDays * 86400 > now,
                "Too late to buy this options");
        ba2.transferFrom(msg.sender, address(this),
                        _amountBA2 * thisOpt.sd2 / 100); //now transfer only secure deposite
        this.addMinter(msg.sender);
        uint optSum = _amountBA2 * thisOpt.amountBA1 / thisOpt.amountBA2;
        this.mint(msg.sender, optSum);
        purchases[msg.sender] = _amountBA2;
        options [msg.sender] = optSum;
        listpurchases.push(msg.sender);
    }

    function initPurshinBA1 (uint _amountBA1) public { //buyOption
        ERC20 ba2 = ERC20(thisOpt.addrBA2);
        // uint depositedBA2 = ba2.balanceOf(address(this));
        require(isDeposited > 0,
                "No enought deposite allocated  emitent, wait a little.");
        require(isDeposited + thisOpt.expDays * 86400 > now,
                "Too late to buy this options");
        uint amountBA2 = _amountBA1 * thisOpt.amountBA2 / thisOpt.amountBA1;
        ba2.transferFrom(msg.sender, address(this),
                        amountBA2 * thisOpt.sd2 / 100); //now transfer only secure deposite
        this.addMinter(msg.sender);
        uint optSum = _amountBA1;  // _amountBA2 * thisOpt.amountBA1 / thisOpt.amountBA2;
        this.mint(msg.sender, optSum);
        purchases[msg.sender] = amountBA2;
        options [msg.sender] = optSum;
        listpurchases.push(msg.sender);
    }

    // 3. At the day of option expires, Emitent should put residual part  of OptionsSum to the contract
    function finalFundOpt ()  public onlyOwner {
        uint coefSD = thisOpt.sd1;
        if (coefSD < 100 ) {
            require(isDeposited + thisOpt.expDays * 86400 > now,
                    "Too late to complete funding, option is broken");
            ERC20 ba1 = ERC20(thisOpt.addrBA1);
            ba1.transferFrom(msg.sender, address(this),
                         (100 - coefSD ) *
                        thisOpt.amountBA1 / 100) ;
        }
        fullDeposited = now;

    }

 //   4. After that, broker can pay residue of sum for his/her tokens in BA2 to contract and get proportional sum  of BA1
    function finPursh()  public onlyMinter { // if this broker get option from this contract
        require(isDeposited + thisOpt.expDays * 86400 < now,
                "Too early to cashout, wait until option ripens");
        require(fullDeposited > 0, "This option is broken, use getPenalty(optionsSum) function to withdraw");
        uint coefSD = thisOpt.sd2;
        if (coefSD < 100 ) {
            ERC20 ba2 = ERC20(thisOpt.addrBA2);
            //4.1 get rest of BA2
            ba2.transferFrom(msg.sender, address(this),
                         (100 - coefSD ) *
                         purchases[msg.sender] / 100);
        }
        // 4.2 return opt tokens
        this.transferFrom(msg.sender, address(this),
                             options[msg.sender]);
        //4.3 transfer BA1
        ERC20 ba1 = ERC20(thisOpt.addrBA1);
        ba1.transfer(msg.sender, options[msg.sender]);
        soldBA1 += options[msg.sender];

    }

    function cashPartOption(uint _optionSumBA1)  public  { // if this broker get option from exchange or other way or partially
        require(isDeposited + thisOpt.expDays * 86400 < now,
                "Too early to cashout, wait until option ripens");
        require(fullDeposited > 0, "This option is broken, use getPenalty(optionsSum) function to withdraw");
     //   uint coefSD = thisOpt.sd2;
        ERC20 ba2 = ERC20(thisOpt.addrBA2);
        //4.1 get rest of BA2
        uint amountBA2 = _optionSumBA1 * thisOpt.amountBA2 / thisOpt.amountBA1;
        ba2.transferFrom(msg.sender, address(this), amountBA2);

        // 4.2 return opt tokens
        this.transferFrom(msg.sender, address(this),
                             _optionSumBA1);
        //4.3 transfer BA1
        ERC20 ba1 = ERC20(thisOpt.addrBA1);
        ba1.transfer(msg.sender, _optionSumBA1);
        soldBA1 += options[msg.sender];


    }
/*
5.1. Brokers have to send their option token to contract and
5.2  returns their broker's payments of SD + and get proportional part of  emitent's Security Deposite
as penalty for lose profit.
*/
    function getPenalty (uint _optionSumBA1) public  {
        // 5.1. return opt tokens
        this.transferFrom(msg.sender, address(this), _optionSumBA1);
        // 5.2.1. return proportional  BA2
        ERC20 ba2 = ERC20(thisOpt.addrBA2);
        uint amountBA2 = _optionSumBA1 * thisOpt.amountBA2 * thisOpt.sd2 /
                        (thisOpt.amountBA1 * 100);
        ba2.transferFrom(msg.sender, address(this), amountBA2);
        // 5.2.2. return BA1 penalti
        ERC20 ba1 = ERC20(thisOpt.addrBA1);
        ba1.transfer(msg.sender, _optionSumBA1 * thisOpt.sd1 / 100);

    }
/*
6. If allright, if emitent paied all sum of option to contract, after option expire,
emitent can withdraw unsold tokens and
 return un-exchanged part option.
*/
    function returnDeposit () public onlyOwner {
        require(isDeposited + thisOpt.expDays * 86400 < now,
                "Too early to get back, wait until option ripens");
        require(fullDeposited > 0, "Sorry but no!");
        ERC20 ba1 = ERC20(thisOpt.addrBA1);
        ba1.transfer(msg.sender, thisOpt.amountBA1 - soldBA1);

    }


}