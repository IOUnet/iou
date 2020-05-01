pragma solidity >=  0.5.0;
import "./option.sol";


contract MakeOption {
    function makeOption(address _addrBA1, // address of ERC20 of  BaseActive1;
                        address _addrBA2,// address of ERC20 of BaseActive2;
                        uint _amountBA1, //  security deposite percent of BaseActive1
                        uint _amountBA2, //  security deposite percent of BaseActive1
                        uint _sd1, //  security deposite percent of BaseActive1
                        uint _sd2, //  security deposite percent of BaseActive1
                        uint _expDays, //ExpireDays;
                        bytes memory _description
                        ) public returns (address) {

        Options newOption = new Options(//_nameBA1, _nameBA2,
                                        _addrBA1, _addrBA2,
                                        _amountBA1, _amountBA2,
                                        _sd1, _sd2,
                                        _expDays, _description);
        return address (newOption);

    }
}