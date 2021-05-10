import EmbarkJS from '../embarkjs';

const ERC20CappedConfig = {"abiDefinition":[{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"cap","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}],"className":"ERC20Capped","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"6080604052600436106100c45763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663095ea7b381146100c957806318160ddd1461011657806323b872dd1461013d578063355274ea14610180578063395093511461019557806340c10f19146101ce57806370a0823114610207578063983b2d561461023a578063986502751461026f578063a457c2d714610284578063a9059cbb146102bd578063aa271e1a146102f6578063dd62ed3e14610329575b600080fd5b3480156100d557600080fd5b50610102600480360360408110156100ec57600080fd5b50600160a060020a038135169060200135610364565b604080519115158252519081900360200190f35b34801561012257600080fd5b5061012b610381565b60408051918252519081900360200190f35b34801561014957600080fd5b506101026004803603606081101561016057600080fd5b50600160a060020a03813581169160208101359091169060400135610387565b34801561018c57600080fd5b5061012b610466565b3480156101a157600080fd5b50610102600480360360408110156101b857600080fd5b50600160a060020a03813516906020013561046c565b3480156101da57600080fd5b50610102600480360360408110156101f157600080fd5b50600160a060020a0381351690602001356104c0565b34801561021357600080fd5b5061012b6004803603602081101561022a57600080fd5b5035600160a060020a0316610558565b34801561024657600080fd5b5061026d6004803603602081101561025d57600080fd5b5035600160a060020a0316610573565b005b34801561027b57600080fd5b5061026d610606565b34801561029057600080fd5b50610102600480360360408110156102a757600080fd5b50600160a060020a038135169060200135610618565b3480156102c957600080fd5b50610102600480360360408110156102e057600080fd5b50600160a060020a0381351690602001356106ca565b34801561030257600080fd5b506101026004803603602081101561031957600080fd5b5035600160a060020a03166106de565b34801561033557600080fd5b5061012b6004803603604081101561034c57600080fd5b50600160a060020a03813581169160200135166106f7565b6000610378610371610722565b8484610726565b50600192915050565b60025490565b6000610394848484610893565b61045c846103a0610722565b61045785606060405190810160405280602881526020017f45524332303a207472616e7366657220616d6f756e742065786365656473206181526020017f6c6c6f77616e6365000000000000000000000000000000000000000000000000815250600160008b600160a060020a0316600160a060020a031681526020019081526020016000206000610430610722565b600160a060020a03168152602081019190915260400160002054919063ffffffff610ab416565b610726565b5060019392505050565b60045490565b6000610378610479610722565b84610457856001600061048a610722565b600160a060020a03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610b4e16565b60006104d26104cd610722565b6106de565b151561054e576040805160e560020a62461bcd02815260206004820152603060248201527f4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766560448201527f20746865204d696e74657220726f6c6500000000000000000000000000000000606482015290519081900360840190fd5b6103788383610bb2565b600160a060020a031660009081526020819052604090205490565b61057e6104cd610722565b15156105fa576040805160e560020a62461bcd02815260206004820152603060248201527f4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766560448201527f20746865204d696e74657220726f6c6500000000000000000000000000000000606482015290519081900360840190fd5b61060381610c31565b50565b610616610611610722565b610c79565b565b6000610378610625610722565b8461045785606060405190810160405280602581526020017f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7781526020017f207a65726f00000000000000000000000000000000000000000000000000000081525060016000610693610722565b600160a060020a03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610ab416565b60006103786106d7610722565b8484610893565b60006106f160038363ffffffff610cc116565b92915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b3390565b600160a060020a03831615156107ab576040805160e560020a62461bcd028152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a0382161515610831576040805160e560020a62461bcd02815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600160a060020a0383161515610919576040805160e560020a62461bcd02815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a038216151561099f576040805160e560020a62461bcd02815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b60408051606081018252602681527f45524332303a207472616e7366657220616d6f756e74206578636565647320626020808301919091527f616c616e6365000000000000000000000000000000000000000000000000000082840152600160a060020a0386166000908152908190529190912054610a2591839063ffffffff610ab416565b600160a060020a038085166000908152602081905260408082209390935590841681522054610a5a908263ffffffff610b4e16565b600160a060020a038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610b465760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b0b578181015183820152602001610af3565b50505050905090810190601f168015610b385780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610bab576040805160e560020a62461bcd02815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b600454610bcd82610bc1610381565b9063ffffffff610b4e16565b1115610c23576040805160e560020a62461bcd02815260206004820152601960248201527f45524332304361707065643a2063617020657863656564656400000000000000604482015290519081900360640190fd5b610c2d8282610d69565b5050565b610c4260038263ffffffff610e5e16565b604051600160a060020a038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b610c8a60038263ffffffff610ee216565b604051600160a060020a038216907fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669290600090a250565b6000600160a060020a0382161515610d49576040805160e560020a62461bcd02815260206004820152602260248201527f526f6c65733a206163636f756e7420697320746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b50600160a060020a03166000908152602091909152604090205460ff1690565b600160a060020a0382161515610dc9576040805160e560020a62461bcd02815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b600254610ddc908263ffffffff610b4e16565b600255600160a060020a038216600090815260208190526040902054610e08908263ffffffff610b4e16565b600160a060020a0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b610e688282610cc1565b15610ebd576040805160e560020a62461bcd02815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b600160a060020a0316600090815260209190915260409020805460ff19166001179055565b610eec8282610cc1565b1515610f68576040805160e560020a62461bcd02815260206004820152602160248201527f526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c60448201527f6500000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a0316600090815260209190915260409020805460ff1916905556fea165627a7a72305820","realArgs":[],"code":"608060405234801561001057600080fd5b50604051602080620012488339810180604052602081101561003157600080fd5b50516100556100476401000000006100cc810204565b6401000000006100d0810204565b600081116100c457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f45524332304361707065643a2063617020697320300000000000000000000000604482015290519081900360640190fd5b600455610282565b3390565b6100e8600382640100000000610e5e61011f82021704565b604051600160a060020a038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b61013282826401000000006101c3810204565b1561019e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b600160a060020a0316600090815260209190915260409020805460ff19166001179055565b6000600160a060020a038216151561026257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f526f6c65733a206163636f756e7420697320746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b50600160a060020a03166000908152602091909152604090205460ff1690565b610fb680620002926000396000f3fe6080604052600436106100c45763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663095ea7b381146100c957806318160ddd1461011657806323b872dd1461013d578063355274ea14610180578063395093511461019557806340c10f19146101ce57806370a0823114610207578063983b2d561461023a578063986502751461026f578063a457c2d714610284578063a9059cbb146102bd578063aa271e1a146102f6578063dd62ed3e14610329575b600080fd5b3480156100d557600080fd5b50610102600480360360408110156100ec57600080fd5b50600160a060020a038135169060200135610364565b604080519115158252519081900360200190f35b34801561012257600080fd5b5061012b610381565b60408051918252519081900360200190f35b34801561014957600080fd5b506101026004803603606081101561016057600080fd5b50600160a060020a03813581169160208101359091169060400135610387565b34801561018c57600080fd5b5061012b610466565b3480156101a157600080fd5b50610102600480360360408110156101b857600080fd5b50600160a060020a03813516906020013561046c565b3480156101da57600080fd5b50610102600480360360408110156101f157600080fd5b50600160a060020a0381351690602001356104c0565b34801561021357600080fd5b5061012b6004803603602081101561022a57600080fd5b5035600160a060020a0316610558565b34801561024657600080fd5b5061026d6004803603602081101561025d57600080fd5b5035600160a060020a0316610573565b005b34801561027b57600080fd5b5061026d610606565b34801561029057600080fd5b50610102600480360360408110156102a757600080fd5b50600160a060020a038135169060200135610618565b3480156102c957600080fd5b50610102600480360360408110156102e057600080fd5b50600160a060020a0381351690602001356106ca565b34801561030257600080fd5b506101026004803603602081101561031957600080fd5b5035600160a060020a03166106de565b34801561033557600080fd5b5061012b6004803603604081101561034c57600080fd5b50600160a060020a03813581169160200135166106f7565b6000610378610371610722565b8484610726565b50600192915050565b60025490565b6000610394848484610893565b61045c846103a0610722565b61045785606060405190810160405280602881526020017f45524332303a207472616e7366657220616d6f756e742065786365656473206181526020017f6c6c6f77616e6365000000000000000000000000000000000000000000000000815250600160008b600160a060020a0316600160a060020a031681526020019081526020016000206000610430610722565b600160a060020a03168152602081019190915260400160002054919063ffffffff610ab416565b610726565b5060019392505050565b60045490565b6000610378610479610722565b84610457856001600061048a610722565b600160a060020a03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610b4e16565b60006104d26104cd610722565b6106de565b151561054e576040805160e560020a62461bcd02815260206004820152603060248201527f4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766560448201527f20746865204d696e74657220726f6c6500000000000000000000000000000000606482015290519081900360840190fd5b6103788383610bb2565b600160a060020a031660009081526020819052604090205490565b61057e6104cd610722565b15156105fa576040805160e560020a62461bcd02815260206004820152603060248201527f4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766560448201527f20746865204d696e74657220726f6c6500000000000000000000000000000000606482015290519081900360840190fd5b61060381610c31565b50565b610616610611610722565b610c79565b565b6000610378610625610722565b8461045785606060405190810160405280602581526020017f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7781526020017f207a65726f00000000000000000000000000000000000000000000000000000081525060016000610693610722565b600160a060020a03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610ab416565b60006103786106d7610722565b8484610893565b60006106f160038363ffffffff610cc116565b92915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b3390565b600160a060020a03831615156107ab576040805160e560020a62461bcd028152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a0382161515610831576040805160e560020a62461bcd02815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600160a060020a0383161515610919576040805160e560020a62461bcd02815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a038216151561099f576040805160e560020a62461bcd02815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b60408051606081018252602681527f45524332303a207472616e7366657220616d6f756e74206578636565647320626020808301919091527f616c616e6365000000000000000000000000000000000000000000000000000082840152600160a060020a0386166000908152908190529190912054610a2591839063ffffffff610ab416565b600160a060020a038085166000908152602081905260408082209390935590841681522054610a5a908263ffffffff610b4e16565b600160a060020a038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610b465760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b0b578181015183820152602001610af3565b50505050905090810190601f168015610b385780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610bab576040805160e560020a62461bcd02815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b600454610bcd82610bc1610381565b9063ffffffff610b4e16565b1115610c23576040805160e560020a62461bcd02815260206004820152601960248201527f45524332304361707065643a2063617020657863656564656400000000000000604482015290519081900360640190fd5b610c2d8282610d69565b5050565b610c4260038263ffffffff610e5e16565b604051600160a060020a038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b610c8a60038263ffffffff610ee216565b604051600160a060020a038216907fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669290600090a250565b6000600160a060020a0382161515610d49576040805160e560020a62461bcd02815260206004820152602260248201527f526f6c65733a206163636f756e7420697320746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b50600160a060020a03166000908152602091909152604090205460ff1690565b600160a060020a0382161515610dc9576040805160e560020a62461bcd02815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b600254610ddc908263ffffffff610b4e16565b600255600160a060020a038216600090815260208190526040902054610e08908263ffffffff610b4e16565b600160a060020a0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b610e688282610cc1565b15610ebd576040805160e560020a62461bcd02815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b600160a060020a0316600090815260209190915260409020805460ff19166001179055565b610eec8282610cc1565b1515610f68576040805160e560020a62461bcd02815260206004820152602160248201527f526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c60448201527f6500000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a0316600090815260209190915260409020805460ff1916905556fea165627a7a72305820e9c02634e0f3b1a9173f90876ae5b0440c59a06bb0642f671a72705ab8e311200029","runtimeBytecode":"6080604052600436106100c45763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663095ea7b381146100c957806318160ddd1461011657806323b872dd1461013d578063355274ea14610180578063395093511461019557806340c10f19146101ce57806370a0823114610207578063983b2d561461023a578063986502751461026f578063a457c2d714610284578063a9059cbb146102bd578063aa271e1a146102f6578063dd62ed3e14610329575b600080fd5b3480156100d557600080fd5b50610102600480360360408110156100ec57600080fd5b50600160a060020a038135169060200135610364565b604080519115158252519081900360200190f35b34801561012257600080fd5b5061012b610381565b60408051918252519081900360200190f35b34801561014957600080fd5b506101026004803603606081101561016057600080fd5b50600160a060020a03813581169160208101359091169060400135610387565b34801561018c57600080fd5b5061012b610466565b3480156101a157600080fd5b50610102600480360360408110156101b857600080fd5b50600160a060020a03813516906020013561046c565b3480156101da57600080fd5b50610102600480360360408110156101f157600080fd5b50600160a060020a0381351690602001356104c0565b34801561021357600080fd5b5061012b6004803603602081101561022a57600080fd5b5035600160a060020a0316610558565b34801561024657600080fd5b5061026d6004803603602081101561025d57600080fd5b5035600160a060020a0316610573565b005b34801561027b57600080fd5b5061026d610606565b34801561029057600080fd5b50610102600480360360408110156102a757600080fd5b50600160a060020a038135169060200135610618565b3480156102c957600080fd5b50610102600480360360408110156102e057600080fd5b50600160a060020a0381351690602001356106ca565b34801561030257600080fd5b506101026004803603602081101561031957600080fd5b5035600160a060020a03166106de565b34801561033557600080fd5b5061012b6004803603604081101561034c57600080fd5b50600160a060020a03813581169160200135166106f7565b6000610378610371610722565b8484610726565b50600192915050565b60025490565b6000610394848484610893565b61045c846103a0610722565b61045785606060405190810160405280602881526020017f45524332303a207472616e7366657220616d6f756e742065786365656473206181526020017f6c6c6f77616e6365000000000000000000000000000000000000000000000000815250600160008b600160a060020a0316600160a060020a031681526020019081526020016000206000610430610722565b600160a060020a03168152602081019190915260400160002054919063ffffffff610ab416565b610726565b5060019392505050565b60045490565b6000610378610479610722565b84610457856001600061048a610722565b600160a060020a03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610b4e16565b60006104d26104cd610722565b6106de565b151561054e576040805160e560020a62461bcd02815260206004820152603060248201527f4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766560448201527f20746865204d696e74657220726f6c6500000000000000000000000000000000606482015290519081900360840190fd5b6103788383610bb2565b600160a060020a031660009081526020819052604090205490565b61057e6104cd610722565b15156105fa576040805160e560020a62461bcd02815260206004820152603060248201527f4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766560448201527f20746865204d696e74657220726f6c6500000000000000000000000000000000606482015290519081900360840190fd5b61060381610c31565b50565b610616610611610722565b610c79565b565b6000610378610625610722565b8461045785606060405190810160405280602581526020017f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7781526020017f207a65726f00000000000000000000000000000000000000000000000000000081525060016000610693610722565b600160a060020a03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610ab416565b60006103786106d7610722565b8484610893565b60006106f160038363ffffffff610cc116565b92915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b3390565b600160a060020a03831615156107ab576040805160e560020a62461bcd028152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a0382161515610831576040805160e560020a62461bcd02815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600160a060020a0383161515610919576040805160e560020a62461bcd02815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a038216151561099f576040805160e560020a62461bcd02815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b60408051606081018252602681527f45524332303a207472616e7366657220616d6f756e74206578636565647320626020808301919091527f616c616e6365000000000000000000000000000000000000000000000000000082840152600160a060020a0386166000908152908190529190912054610a2591839063ffffffff610ab416565b600160a060020a038085166000908152602081905260408082209390935590841681522054610a5a908263ffffffff610b4e16565b600160a060020a038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610b465760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b0b578181015183820152602001610af3565b50505050905090810190601f168015610b385780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610bab576040805160e560020a62461bcd02815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b600454610bcd82610bc1610381565b9063ffffffff610b4e16565b1115610c23576040805160e560020a62461bcd02815260206004820152601960248201527f45524332304361707065643a2063617020657863656564656400000000000000604482015290519081900360640190fd5b610c2d8282610d69565b5050565b610c4260038263ffffffff610e5e16565b604051600160a060020a038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b610c8a60038263ffffffff610ee216565b604051600160a060020a038216907fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669290600090a250565b6000600160a060020a0382161515610d49576040805160e560020a62461bcd02815260206004820152602260248201527f526f6c65733a206163636f756e7420697320746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b50600160a060020a03166000908152602091909152604090205460ff1690565b600160a060020a0382161515610dc9576040805160e560020a62461bcd02815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b600254610ddc908263ffffffff610b4e16565b600255600160a060020a038216600090815260208190526040902054610e08908263ffffffff610b4e16565b600160a060020a0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b610e688282610cc1565b15610ebd576040805160e560020a62461bcd02815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b600160a060020a0316600090815260209190915260409020805460ff19166001179055565b610eec8282610cc1565b1515610f68576040805160e560020a62461bcd02815260206004820152602160248201527f526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c60448201527f6500000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a0316600090815260209190915260409020805460ff1916905556fea165627a7a72305820e9c02634e0f3b1a9173f90876ae5b0440c59a06bb0642f671a72705ab8e311200029","linkReferences":{},"swarmHash":"e9c02634e0f3b1a9173f90876ae5b0440c59a06bb0642f671a72705ab8e31120","gasEstimates":{"creation":{"codeDepositCost":"804400","executionCost":"infinite","totalCost":"infinite"},"external":{"addMinter(address)":"infinite","allowance(address,address)":"1014","approve(address,uint256)":"22642","balanceOf(address)":"777","cap()":"450","decreaseAllowance(address,uint256)":"infinite","increaseAllowance(address,uint256)":"infinite","isMinter(address)":"infinite","mint(address,uint256)":"infinite","renounceMinter()":"infinite","totalSupply()":"406","transfer(address,uint256)":"infinite","transferFrom(address,address,uint256)":"infinite"},"internal":{"_mint(address,uint256)":"infinite"}},"functionHashes":{"addMinter(address)":"983b2d56","allowance(address,address)":"dd62ed3e","approve(address,uint256)":"095ea7b3","balanceOf(address)":"70a08231","cap()":"355274ea","decreaseAllowance(address,uint256)":"a457c2d7","increaseAllowance(address,uint256)":"39509351","isMinter(address)":"aa271e1a","mint(address,uint256)":"40c10f19","renounceMinter()":"98650275","totalSupply()":"18160ddd","transfer(address,uint256)":"a9059cbb","transferFrom(address,address,uint256)":"23b872dd"},"filename":"/home/st/Desktop/iou/.embark/contracts/token/ERC20/ERC20Capped.sol","originalFilename":"contracts/token/ERC20/ERC20Capped.sol","path":"/home/st/Desktop/iou/contracts/token/ERC20/ERC20Capped.sol","type":"file","deploymentAccount":"0x69748533FeE28A6D6ee8dB3E9E5C6dAE6fDAc99a"};
const ERC20Capped = new EmbarkJS.Blockchain.Contract(ERC20CappedConfig);

export default ERC20Capped;
