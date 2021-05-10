import EmbarkJS from '../embarkjs';

const WhitelistedRoleConfig = {"abiDefinition":[{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addWhitelisted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"removeWhitelisted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceWhitelistAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addWhitelistAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isWhitelistAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceWhitelisted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"WhitelistedAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"WhitelistedRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"WhitelistAdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"WhitelistAdminRemoved","type":"event"}],"className":"WhitelistedRole","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"6080604052600436106100825763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166310154bad8114610087578063291d9549146100bc5780633af32abf146100ef5780634c5a628c146101365780637362d9c81461014b578063bb5f747b1461017e578063d6cd9473146101b1575b600080fd5b34801561009357600080fd5b506100ba600480360360208110156100aa57600080fd5b5035600160a060020a03166101c6565b005b3480156100c857600080fd5b506100ba600480360360208110156100df57600080fd5b5035600160a060020a031661025e565b3480156100fb57600080fd5b506101226004803603602081101561011257600080fd5b5035600160a060020a03166102ee565b604080519115158252519081900360200190f35b34801561014257600080fd5b506100ba610307565b34801561015757600080fd5b506100ba6004803603602081101561016e57600080fd5b5035600160a060020a0316610319565b34801561018a57600080fd5b50610122600480360360208110156101a157600080fd5b5035600160a060020a03166103a9565b3480156101bd57600080fd5b506100ba6103bb565b6101d66101d16103cb565b6103a9565b1515610252576040805160e560020a62461bcd02815260206004820152602481018290527f57686974656c69737441646d696e526f6c653a2063616c6c657220646f65732060448201527f6e6f742068617665207468652057686974656c69737441646d696e20726f6c65606482015290519081900360840190fd5b61025b816103cf565b50565b6102696101d16103cb565b15156102e5576040805160e560020a62461bcd02815260206004820152602481018290527f57686974656c69737441646d696e526f6c653a2063616c6c657220646f65732060448201527f6e6f742068617665207468652057686974656c69737441646d696e20726f6c65606482015290519081900360840190fd5b61025b81610417565b600061030160018363ffffffff61045f16565b92915050565b6103176103126103cb565b610507565b565b6103246101d16103cb565b15156103a0576040805160e560020a62461bcd02815260206004820152602481018290527f57686974656c69737441646d696e526f6c653a2063616c6c657220646f65732060448201527f6e6f742068617665207468652057686974656c69737441646d696e20726f6c65606482015290519081900360840190fd5b61025b8161054f565b6000610301818363ffffffff61045f16565b6103176103c66103cb565b610417565b3390565b6103e060018263ffffffff61059716565b604051600160a060020a038216907fee1504a83b6d4a361f4c1dc78ab59bfa30d6a3b6612c403e86bb01ef2984295f90600090a250565b61042860018263ffffffff61061b16565b604051600160a060020a038216907f270d9b30cf5b0793bbfd54c9d5b94aeb49462b8148399000265144a8722da6b690600090a250565b6000600160a060020a03821615156104e7576040805160e560020a62461bcd02815260206004820152602260248201527f526f6c65733a206163636f756e7420697320746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b50600160a060020a03166000908152602091909152604090205460ff1690565b61051860008263ffffffff61061b16565b604051600160a060020a038216907f0a8eb35e5ca14b3d6f28e4abf2f128dbab231a58b56e89beb5d636115001e16590600090a250565b61056060008263ffffffff61059716565b604051600160a060020a038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b6105a1828261045f565b156105f6576040805160e560020a62461bcd02815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b600160a060020a0316600090815260209190915260409020805460ff19166001179055565b610625828261045f565b15156106a1576040805160e560020a62461bcd02815260206004820152602160248201527f526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c60448201527f6500000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a0316600090815260209190915260409020805460ff1916905556fea165627a7a72305820","realArgs":[],"code":"608060405261002661001864010000000061002b810204565b64010000000061002f810204565b6101e1565b3390565b61004760008264010000000061059761007e82021704565b604051600160a060020a038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b6100918282640100000000610122810204565b156100fd57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b600160a060020a0316600090815260209190915260409020805460ff19166001179055565b6000600160a060020a03821615156101c157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f526f6c65733a206163636f756e7420697320746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b50600160a060020a03166000908152602091909152604090205460ff1690565b6106ef806101f06000396000f3fe6080604052600436106100825763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166310154bad8114610087578063291d9549146100bc5780633af32abf146100ef5780634c5a628c146101365780637362d9c81461014b578063bb5f747b1461017e578063d6cd9473146101b1575b600080fd5b34801561009357600080fd5b506100ba600480360360208110156100aa57600080fd5b5035600160a060020a03166101c6565b005b3480156100c857600080fd5b506100ba600480360360208110156100df57600080fd5b5035600160a060020a031661025e565b3480156100fb57600080fd5b506101226004803603602081101561011257600080fd5b5035600160a060020a03166102ee565b604080519115158252519081900360200190f35b34801561014257600080fd5b506100ba610307565b34801561015757600080fd5b506100ba6004803603602081101561016e57600080fd5b5035600160a060020a0316610319565b34801561018a57600080fd5b50610122600480360360208110156101a157600080fd5b5035600160a060020a03166103a9565b3480156101bd57600080fd5b506100ba6103bb565b6101d66101d16103cb565b6103a9565b1515610252576040805160e560020a62461bcd02815260206004820152602481018290527f57686974656c69737441646d696e526f6c653a2063616c6c657220646f65732060448201527f6e6f742068617665207468652057686974656c69737441646d696e20726f6c65606482015290519081900360840190fd5b61025b816103cf565b50565b6102696101d16103cb565b15156102e5576040805160e560020a62461bcd02815260206004820152602481018290527f57686974656c69737441646d696e526f6c653a2063616c6c657220646f65732060448201527f6e6f742068617665207468652057686974656c69737441646d696e20726f6c65606482015290519081900360840190fd5b61025b81610417565b600061030160018363ffffffff61045f16565b92915050565b6103176103126103cb565b610507565b565b6103246101d16103cb565b15156103a0576040805160e560020a62461bcd02815260206004820152602481018290527f57686974656c69737441646d696e526f6c653a2063616c6c657220646f65732060448201527f6e6f742068617665207468652057686974656c69737441646d696e20726f6c65606482015290519081900360840190fd5b61025b8161054f565b6000610301818363ffffffff61045f16565b6103176103c66103cb565b610417565b3390565b6103e060018263ffffffff61059716565b604051600160a060020a038216907fee1504a83b6d4a361f4c1dc78ab59bfa30d6a3b6612c403e86bb01ef2984295f90600090a250565b61042860018263ffffffff61061b16565b604051600160a060020a038216907f270d9b30cf5b0793bbfd54c9d5b94aeb49462b8148399000265144a8722da6b690600090a250565b6000600160a060020a03821615156104e7576040805160e560020a62461bcd02815260206004820152602260248201527f526f6c65733a206163636f756e7420697320746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b50600160a060020a03166000908152602091909152604090205460ff1690565b61051860008263ffffffff61061b16565b604051600160a060020a038216907f0a8eb35e5ca14b3d6f28e4abf2f128dbab231a58b56e89beb5d636115001e16590600090a250565b61056060008263ffffffff61059716565b604051600160a060020a038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b6105a1828261045f565b156105f6576040805160e560020a62461bcd02815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b600160a060020a0316600090815260209190915260409020805460ff19166001179055565b610625828261045f565b15156106a1576040805160e560020a62461bcd02815260206004820152602160248201527f526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c60448201527f6500000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a0316600090815260209190915260409020805460ff1916905556fea165627a7a7230582035adc046d07778b96683c1a134f0cd55bd8bc001a1d11d475dc7e0be51cd381c0029","runtimeBytecode":"6080604052600436106100825763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166310154bad8114610087578063291d9549146100bc5780633af32abf146100ef5780634c5a628c146101365780637362d9c81461014b578063bb5f747b1461017e578063d6cd9473146101b1575b600080fd5b34801561009357600080fd5b506100ba600480360360208110156100aa57600080fd5b5035600160a060020a03166101c6565b005b3480156100c857600080fd5b506100ba600480360360208110156100df57600080fd5b5035600160a060020a031661025e565b3480156100fb57600080fd5b506101226004803603602081101561011257600080fd5b5035600160a060020a03166102ee565b604080519115158252519081900360200190f35b34801561014257600080fd5b506100ba610307565b34801561015757600080fd5b506100ba6004803603602081101561016e57600080fd5b5035600160a060020a0316610319565b34801561018a57600080fd5b50610122600480360360208110156101a157600080fd5b5035600160a060020a03166103a9565b3480156101bd57600080fd5b506100ba6103bb565b6101d66101d16103cb565b6103a9565b1515610252576040805160e560020a62461bcd02815260206004820152602481018290527f57686974656c69737441646d696e526f6c653a2063616c6c657220646f65732060448201527f6e6f742068617665207468652057686974656c69737441646d696e20726f6c65606482015290519081900360840190fd5b61025b816103cf565b50565b6102696101d16103cb565b15156102e5576040805160e560020a62461bcd02815260206004820152602481018290527f57686974656c69737441646d696e526f6c653a2063616c6c657220646f65732060448201527f6e6f742068617665207468652057686974656c69737441646d696e20726f6c65606482015290519081900360840190fd5b61025b81610417565b600061030160018363ffffffff61045f16565b92915050565b6103176103126103cb565b610507565b565b6103246101d16103cb565b15156103a0576040805160e560020a62461bcd02815260206004820152602481018290527f57686974656c69737441646d696e526f6c653a2063616c6c657220646f65732060448201527f6e6f742068617665207468652057686974656c69737441646d696e20726f6c65606482015290519081900360840190fd5b61025b8161054f565b6000610301818363ffffffff61045f16565b6103176103c66103cb565b610417565b3390565b6103e060018263ffffffff61059716565b604051600160a060020a038216907fee1504a83b6d4a361f4c1dc78ab59bfa30d6a3b6612c403e86bb01ef2984295f90600090a250565b61042860018263ffffffff61061b16565b604051600160a060020a038216907f270d9b30cf5b0793bbfd54c9d5b94aeb49462b8148399000265144a8722da6b690600090a250565b6000600160a060020a03821615156104e7576040805160e560020a62461bcd02815260206004820152602260248201527f526f6c65733a206163636f756e7420697320746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b50600160a060020a03166000908152602091909152604090205460ff1690565b61051860008263ffffffff61061b16565b604051600160a060020a038216907f0a8eb35e5ca14b3d6f28e4abf2f128dbab231a58b56e89beb5d636115001e16590600090a250565b61056060008263ffffffff61059716565b604051600160a060020a038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b6105a1828261045f565b156105f6576040805160e560020a62461bcd02815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b600160a060020a0316600090815260209190915260409020805460ff19166001179055565b610625828261045f565b15156106a1576040805160e560020a62461bcd02815260206004820152602160248201527f526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c60448201527f6500000000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b600160a060020a0316600090815260209190915260409020805460ff1916905556fea165627a7a7230582035adc046d07778b96683c1a134f0cd55bd8bc001a1d11d475dc7e0be51cd381c0029","linkReferences":{},"swarmHash":"35adc046d07778b96683c1a134f0cd55bd8bc001a1d11d475dc7e0be51cd381c","gasEstimates":{"creation":{"codeDepositCost":"355000","executionCost":"infinite","totalCost":"infinite"},"external":{"addWhitelistAdmin(address)":"infinite","addWhitelisted(address)":"infinite","isWhitelistAdmin(address)":"infinite","isWhitelisted(address)":"infinite","removeWhitelisted(address)":"infinite","renounceWhitelistAdmin()":"infinite","renounceWhitelisted()":"infinite"},"internal":{"_addWhitelisted(address)":"infinite","_removeWhitelisted(address)":"infinite"}},"functionHashes":{"addWhitelistAdmin(address)":"7362d9c8","addWhitelisted(address)":"10154bad","isWhitelistAdmin(address)":"bb5f747b","isWhitelisted(address)":"3af32abf","removeWhitelisted(address)":"291d9549","renounceWhitelistAdmin()":"4c5a628c","renounceWhitelisted()":"d6cd9473"},"filename":"/home/st/Desktop/iou/.embark/contracts/access/roles/WhitelistedRole.sol","originalFilename":"contracts/access/roles/WhitelistedRole.sol","path":"/home/st/Desktop/iou/contracts/access/roles/WhitelistedRole.sol","type":"file","deploymentAccount":"0x69748533FeE28A6D6ee8dB3E9E5C6dAE6fDAc99a"};
const WhitelistedRole = new EmbarkJS.Blockchain.Contract(WhitelistedRoleConfig);

export default WhitelistedRole;
