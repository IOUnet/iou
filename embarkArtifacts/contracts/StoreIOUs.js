import EmbarkJS from '../embarkjs';

const StoreIOUsConfig = {"abiDefinition":[{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"listIOUs","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_holder","type":"address"},{"name":"_IOUtoken","type":"address"}],"name":"addHolder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getIssuerstotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getIOUList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newIOU","type":"address"},{"name":"_socialProfile","type":"string"},{"name":"_keywords","type":"bytes32[]"}],"name":"addIOU2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"getIOUListKey","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allKeywords","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newIOU","type":"address"},{"name":"_emitent","type":"address"}],"name":"addIOU1","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newFact","type":"address"}],"name":"setFactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_holder","type":"address"}],"name":"getIOUListHold","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getKeystotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isIOU","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allIssuers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allIOU","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_profile","type":"string"}],"name":"getIOUListSoc","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getIOUstotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"listHoldersIOUs","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}],"deployedAddress":"0x696E6049Cda5F375e1ddd2f34EE944791e4e3e7b","className":"StoreIOUs","args":[],"gas":"auto","silent":false,"track":true,"deploy":true,"realRuntimeBytecode":"6080604052600436106100fa5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041662a50d8181146100ff57806313af40351461013557806323b3af891461015757806330b02b211461017757806331df37371461019957806338a10485146101c65780634f2c272a146101e657806352fae04e146102065780635899d142146102265780635bb47808146102465780636e01acb81461026657806376f7f6de14610286578063b21b44511461029b578063b442fc61146102c8578063c5ab1529146102e8578063e03e56a914610308578063f22c3bc314610328578063f466013d1461033d575b600080fd5b34801561010b57600080fd5b5061011f61011a366004610ccd565b61035d565b60405161012c9190610e88565b60405180910390f35b34801561014157600080fd5b50610155610150366004610bf0565b610394565b005b34801561016357600080fd5b50610155610172366004610c16565b6103ec565b34801561018357600080fd5b5061018c6104c8565b60405161012c9190610ebb565b3480156101a557600080fd5b506101b96101b4366004610bf0565b6104ce565b60405161012c9190610e9c565b3480156101d257600080fd5b506101556101e1366004610c50565b610542565b3480156101f257600080fd5b506101b9610201366004610cfd565b610731565b34801561021257600080fd5b5061018c610221366004610cfd565b61079b565b34801561023257600080fd5b50610155610241366004610c16565b6107ba565b34801561025257600080fd5b50610155610261366004610bf0565b610918565b34801561027257600080fd5b506101b9610281366004610bf0565b610967565b34801561029257600080fd5b5061018c6109db565b3480156102a757600080fd5b506102bb6102b6366004610bf0565b6109e1565b60405161012c9190610ead565b3480156102d457600080fd5b5061011f6102e3366004610cfd565b6109f6565b3480156102f457600080fd5b5061011f610303366004610cfd565b610a1e565b34801561031457600080fd5b506101b9610323366004610d1b565b610a2c565b34801561033457600080fd5b5061018c610ae2565b34801561034957600080fd5b5061011f610358366004610ccd565b610ae8565b60006020528160005260406000208181548110151561037857fe5b600091825260209091200154600160a060020a03169150829050565b600954600160a060020a031633146103ca5760405160e560020a62461bcd0281526004016103c190610ee9565b60405180910390fd5b60098054600160a060020a031916600160a060020a0392909216919091179055565b600a54600160a060020a031633148061041457503360009081526003602052604090205460ff165b15156104355760405160e560020a62461bcd0281526004016103c190610ec9565b600160a060020a0380831660009081526004602090815260408083209385168352929052205460ff1615156104c457600160a060020a038281166000818152600260209081526040808320805460018082018355918552838520018054600160a060020a03191696881696871790559383526004825280832094835293905291909120805460ff191690911790555b5050565b60085490565b600160a060020a0381166000908152602081815260409182902080548351818402810184019094528084526060939283018282801561053657602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610518575b50505050509050919050565b600a54600160a060020a031633148061056a57503360009081526003602052604090205460ff165b151561058b5760405160e560020a62461bcd0281526004016103c190610ec9565b6001826040518082805190602001908083835b602083106105bd5780518252601f19909201916020918201910161059e565b51815160209384036101000a6000190180199092169116179052920194855250604051938490038101909320805460018101825560009182529381209093018054600160a060020a031916600160a060020a0388161790555050815160051061062757815161062a565b60055b90506000805b828160ff161015610729578351600090859060ff841690811061064f57fe5b9060200190602002015111156107215760056000858360ff1681518110151561067457fe5b602090810290910181015182528101919091526040016000205415156106c6576006848260ff168151811015156106a757fe5b6020908102909101810151825460018101845560009384529190922001555b60056000858360ff168151811015156106db57fe5b60209081029190910181015182528181019290925260400160009081208054600181018255908252919020018054600160a060020a031916600160a060020a0388161790555b600101610630565b505050505050565b60008181526005602090815260409182902080548351818402810184019094528084526060939283018282801561053657602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105185750505050509050919050565b60068054829081106107a957fe5b600091825260209091200154905081565b600a54600160a060020a031615156107e75760405160e560020a62461bcd0281526004016103c190610ef9565b600a54600160a060020a031633146108145760405160e560020a62461bcd0281526004016103c190610ed9565b600160a060020a038083166000818152600360209081526040808320805460ff191660019081179091556007805491820190557fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c688018054600160a060020a03191690941790935592841681529182905290205415156108d957600880546001810182556000919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee3018054600160a060020a031916600160a060020a0383161790555b600160a060020a03908116600090815260208181526040822080546001810182559083529120018054600160a060020a03191692909116919091179055565b600954600160a060020a031633146109455760405160e560020a62461bcd0281526004016103c190610ee9565b600a8054600160a060020a031916600160a060020a0392909216919091179055565b600160a060020a03811660009081526002602090815260409182902080548351818402810184019094528084526060939283018282801561053657602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105185750505050509050919050565b60065490565b60036020526000908152604090205460ff1681565b6008805482908110610a0457fe5b600091825260209091200154600160a060020a0316905081565b6007805482908110610a0457fe5b60606001826040518082805190602001908083835b60208310610a605780518252601f199092019160209182019101610a41565b51815160209384036101000a60001901801990921691161790529201948552506040805194859003820185208054808402870184019092528186529350915083018282801561053657602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105185750505050509050919050565b60075490565b60026020528160005260406000208181548110151561037857fe5b6000610b0f8235610f83565b9392505050565b6000601f82018313610b2757600080fd5b8135610b3a610b3582610f30565b610f09565b91508181835260208401935060208101905083856020840282011115610b5f57600080fd5b60005b83811015610b8b5781610b758882610b95565b8452506020928301929190910190600101610b62565b5050505092915050565b6000610b0f8235610f93565b6000601f82018313610bb257600080fd5b8135610bc0610b3582610f51565b91508082526020830160208301858383011115610bdc57600080fd5b610be7838284610fa2565b50505092915050565b600060208284031215610c0257600080fd5b6000610c0e8484610b03565b949350505050565b60008060408385031215610c2957600080fd5b6000610c358585610b03565b9250506020610c4685828601610b03565b9150509250929050565b600080600060608486031215610c6557600080fd5b6000610c718686610b03565b935050602084013567ffffffffffffffff811115610c8e57600080fd5b610c9a86828701610ba1565b925050604084013567ffffffffffffffff811115610cb757600080fd5b610cc386828701610b16565b9150509250925092565b60008060408385031215610ce057600080fd5b6000610cec8585610b03565b9250506020610c4685828601610b95565b600060208284031215610d0f57600080fd5b6000610c0e8484610b95565b600060208284031215610d2d57600080fd5b813567ffffffffffffffff811115610d4457600080fd5b610c0e84828501610ba1565b610d5981610f83565b82525050565b6000610d6a82610f7f565b808452602084019350610d7c83610f79565b60005b82811015610dac57610d92868351610d50565b610d9b82610f79565b602096909601959150600101610d7f565b5093949350505050565b610d5981610f8e565b610d5981610f93565b601381527f4e6f7420494f5520746f6b656e2063616c6c7300000000000000000000000000602082015260400190565b601c81527f4f6e6c79206d616b65466163746f72792063616e20646f207468697300000000602082015260400190565b601681527f4f6e6c79206f776e65722063616e20646f207468697300000000000000000000602082015260400190565b601681527f4e6f206d616b65466163746f7279206164647265737300000000000000000000602082015260400190565b60208101610e968284610d50565b92915050565b60208082528101610b0f8184610d5f565b60208101610e968284610db6565b60208101610e968284610dbf565b60208082528101610e9681610dc8565b60208082528101610e9681610df8565b60208082528101610e9681610e28565b60208082528101610e9681610e58565b60405181810167ffffffffffffffff81118282101715610f2857600080fd5b604052919050565b600067ffffffffffffffff821115610f4757600080fd5b5060209081020190565b600067ffffffffffffffff821115610f6857600080fd5b506020601f91909101601f19160190565b60200190565b5190565b6000610e9682610f96565b151590565b90565b600160a060020a031690565b8281833750600091015256fea265627a7a723058201a3b84f2e6c4f6f1412fde192440","realArgs":[],"fromIndex":0,"code":"608060405234801561001057600080fd5b5060098054600160a060020a03191633179055610fe8806100326000396000f3fe6080604052600436106100fa5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041662a50d8181146100ff57806313af40351461013557806323b3af891461015757806330b02b211461017757806331df37371461019957806338a10485146101c65780634f2c272a146101e657806352fae04e146102065780635899d142146102265780635bb47808146102465780636e01acb81461026657806376f7f6de14610286578063b21b44511461029b578063b442fc61146102c8578063c5ab1529146102e8578063e03e56a914610308578063f22c3bc314610328578063f466013d1461033d575b600080fd5b34801561010b57600080fd5b5061011f61011a366004610ccd565b61035d565b60405161012c9190610e88565b60405180910390f35b34801561014157600080fd5b50610155610150366004610bf0565b610394565b005b34801561016357600080fd5b50610155610172366004610c16565b6103ec565b34801561018357600080fd5b5061018c6104c8565b60405161012c9190610ebb565b3480156101a557600080fd5b506101b96101b4366004610bf0565b6104ce565b60405161012c9190610e9c565b3480156101d257600080fd5b506101556101e1366004610c50565b610542565b3480156101f257600080fd5b506101b9610201366004610cfd565b610731565b34801561021257600080fd5b5061018c610221366004610cfd565b61079b565b34801561023257600080fd5b50610155610241366004610c16565b6107ba565b34801561025257600080fd5b50610155610261366004610bf0565b610918565b34801561027257600080fd5b506101b9610281366004610bf0565b610967565b34801561029257600080fd5b5061018c6109db565b3480156102a757600080fd5b506102bb6102b6366004610bf0565b6109e1565b60405161012c9190610ead565b3480156102d457600080fd5b5061011f6102e3366004610cfd565b6109f6565b3480156102f457600080fd5b5061011f610303366004610cfd565b610a1e565b34801561031457600080fd5b506101b9610323366004610d1b565b610a2c565b34801561033457600080fd5b5061018c610ae2565b34801561034957600080fd5b5061011f610358366004610ccd565b610ae8565b60006020528160005260406000208181548110151561037857fe5b600091825260209091200154600160a060020a03169150829050565b600954600160a060020a031633146103ca5760405160e560020a62461bcd0281526004016103c190610ee9565b60405180910390fd5b60098054600160a060020a031916600160a060020a0392909216919091179055565b600a54600160a060020a031633148061041457503360009081526003602052604090205460ff165b15156104355760405160e560020a62461bcd0281526004016103c190610ec9565b600160a060020a0380831660009081526004602090815260408083209385168352929052205460ff1615156104c457600160a060020a038281166000818152600260209081526040808320805460018082018355918552838520018054600160a060020a03191696881696871790559383526004825280832094835293905291909120805460ff191690911790555b5050565b60085490565b600160a060020a0381166000908152602081815260409182902080548351818402810184019094528084526060939283018282801561053657602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610518575b50505050509050919050565b600a54600160a060020a031633148061056a57503360009081526003602052604090205460ff165b151561058b5760405160e560020a62461bcd0281526004016103c190610ec9565b6001826040518082805190602001908083835b602083106105bd5780518252601f19909201916020918201910161059e565b51815160209384036101000a6000190180199092169116179052920194855250604051938490038101909320805460018101825560009182529381209093018054600160a060020a031916600160a060020a0388161790555050815160051061062757815161062a565b60055b90506000805b828160ff161015610729578351600090859060ff841690811061064f57fe5b9060200190602002015111156107215760056000858360ff1681518110151561067457fe5b602090810290910181015182528101919091526040016000205415156106c6576006848260ff168151811015156106a757fe5b6020908102909101810151825460018101845560009384529190922001555b60056000858360ff168151811015156106db57fe5b60209081029190910181015182528181019290925260400160009081208054600181018255908252919020018054600160a060020a031916600160a060020a0388161790555b600101610630565b505050505050565b60008181526005602090815260409182902080548351818402810184019094528084526060939283018282801561053657602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105185750505050509050919050565b60068054829081106107a957fe5b600091825260209091200154905081565b600a54600160a060020a031615156107e75760405160e560020a62461bcd0281526004016103c190610ef9565b600a54600160a060020a031633146108145760405160e560020a62461bcd0281526004016103c190610ed9565b600160a060020a038083166000818152600360209081526040808320805460ff191660019081179091556007805491820190557fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c688018054600160a060020a03191690941790935592841681529182905290205415156108d957600880546001810182556000919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee3018054600160a060020a031916600160a060020a0383161790555b600160a060020a03908116600090815260208181526040822080546001810182559083529120018054600160a060020a03191692909116919091179055565b600954600160a060020a031633146109455760405160e560020a62461bcd0281526004016103c190610ee9565b600a8054600160a060020a031916600160a060020a0392909216919091179055565b600160a060020a03811660009081526002602090815260409182902080548351818402810184019094528084526060939283018282801561053657602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105185750505050509050919050565b60065490565b60036020526000908152604090205460ff1681565b6008805482908110610a0457fe5b600091825260209091200154600160a060020a0316905081565b6007805482908110610a0457fe5b60606001826040518082805190602001908083835b60208310610a605780518252601f199092019160209182019101610a41565b51815160209384036101000a60001901801990921691161790529201948552506040805194859003820185208054808402870184019092528186529350915083018282801561053657602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105185750505050509050919050565b60075490565b60026020528160005260406000208181548110151561037857fe5b6000610b0f8235610f83565b9392505050565b6000601f82018313610b2757600080fd5b8135610b3a610b3582610f30565b610f09565b91508181835260208401935060208101905083856020840282011115610b5f57600080fd5b60005b83811015610b8b5781610b758882610b95565b8452506020928301929190910190600101610b62565b5050505092915050565b6000610b0f8235610f93565b6000601f82018313610bb257600080fd5b8135610bc0610b3582610f51565b91508082526020830160208301858383011115610bdc57600080fd5b610be7838284610fa2565b50505092915050565b600060208284031215610c0257600080fd5b6000610c0e8484610b03565b949350505050565b60008060408385031215610c2957600080fd5b6000610c358585610b03565b9250506020610c4685828601610b03565b9150509250929050565b600080600060608486031215610c6557600080fd5b6000610c718686610b03565b935050602084013567ffffffffffffffff811115610c8e57600080fd5b610c9a86828701610ba1565b925050604084013567ffffffffffffffff811115610cb757600080fd5b610cc386828701610b16565b9150509250925092565b60008060408385031215610ce057600080fd5b6000610cec8585610b03565b9250506020610c4685828601610b95565b600060208284031215610d0f57600080fd5b6000610c0e8484610b95565b600060208284031215610d2d57600080fd5b813567ffffffffffffffff811115610d4457600080fd5b610c0e84828501610ba1565b610d5981610f83565b82525050565b6000610d6a82610f7f565b808452602084019350610d7c83610f79565b60005b82811015610dac57610d92868351610d50565b610d9b82610f79565b602096909601959150600101610d7f565b5093949350505050565b610d5981610f8e565b610d5981610f93565b601381527f4e6f7420494f5520746f6b656e2063616c6c7300000000000000000000000000602082015260400190565b601c81527f4f6e6c79206d616b65466163746f72792063616e20646f207468697300000000602082015260400190565b601681527f4f6e6c79206f776e65722063616e20646f207468697300000000000000000000602082015260400190565b601681527f4e6f206d616b65466163746f7279206164647265737300000000000000000000602082015260400190565b60208101610e968284610d50565b92915050565b60208082528101610b0f8184610d5f565b60208101610e968284610db6565b60208101610e968284610dbf565b60208082528101610e9681610dc8565b60208082528101610e9681610df8565b60208082528101610e9681610e28565b60208082528101610e9681610e58565b60405181810167ffffffffffffffff81118282101715610f2857600080fd5b604052919050565b600067ffffffffffffffff821115610f4757600080fd5b5060209081020190565b600067ffffffffffffffff821115610f6857600080fd5b506020601f91909101601f19160190565b60200190565b5190565b6000610e9682610f96565b151590565b90565b600160a060020a031690565b8281833750600091015256fea265627a7a723058201a3b84f2e6c4f6f1412fde1924400172a7f3599df42fe56caab47658ade3bcac6c6578706572696d656e74616cf50037","runtimeBytecode":"6080604052600436106100fa5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041662a50d8181146100ff57806313af40351461013557806323b3af891461015757806330b02b211461017757806331df37371461019957806338a10485146101c65780634f2c272a146101e657806352fae04e146102065780635899d142146102265780635bb47808146102465780636e01acb81461026657806376f7f6de14610286578063b21b44511461029b578063b442fc61146102c8578063c5ab1529146102e8578063e03e56a914610308578063f22c3bc314610328578063f466013d1461033d575b600080fd5b34801561010b57600080fd5b5061011f61011a366004610ccd565b61035d565b60405161012c9190610e88565b60405180910390f35b34801561014157600080fd5b50610155610150366004610bf0565b610394565b005b34801561016357600080fd5b50610155610172366004610c16565b6103ec565b34801561018357600080fd5b5061018c6104c8565b60405161012c9190610ebb565b3480156101a557600080fd5b506101b96101b4366004610bf0565b6104ce565b60405161012c9190610e9c565b3480156101d257600080fd5b506101556101e1366004610c50565b610542565b3480156101f257600080fd5b506101b9610201366004610cfd565b610731565b34801561021257600080fd5b5061018c610221366004610cfd565b61079b565b34801561023257600080fd5b50610155610241366004610c16565b6107ba565b34801561025257600080fd5b50610155610261366004610bf0565b610918565b34801561027257600080fd5b506101b9610281366004610bf0565b610967565b34801561029257600080fd5b5061018c6109db565b3480156102a757600080fd5b506102bb6102b6366004610bf0565b6109e1565b60405161012c9190610ead565b3480156102d457600080fd5b5061011f6102e3366004610cfd565b6109f6565b3480156102f457600080fd5b5061011f610303366004610cfd565b610a1e565b34801561031457600080fd5b506101b9610323366004610d1b565b610a2c565b34801561033457600080fd5b5061018c610ae2565b34801561034957600080fd5b5061011f610358366004610ccd565b610ae8565b60006020528160005260406000208181548110151561037857fe5b600091825260209091200154600160a060020a03169150829050565b600954600160a060020a031633146103ca5760405160e560020a62461bcd0281526004016103c190610ee9565b60405180910390fd5b60098054600160a060020a031916600160a060020a0392909216919091179055565b600a54600160a060020a031633148061041457503360009081526003602052604090205460ff165b15156104355760405160e560020a62461bcd0281526004016103c190610ec9565b600160a060020a0380831660009081526004602090815260408083209385168352929052205460ff1615156104c457600160a060020a038281166000818152600260209081526040808320805460018082018355918552838520018054600160a060020a03191696881696871790559383526004825280832094835293905291909120805460ff191690911790555b5050565b60085490565b600160a060020a0381166000908152602081815260409182902080548351818402810184019094528084526060939283018282801561053657602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610518575b50505050509050919050565b600a54600160a060020a031633148061056a57503360009081526003602052604090205460ff165b151561058b5760405160e560020a62461bcd0281526004016103c190610ec9565b6001826040518082805190602001908083835b602083106105bd5780518252601f19909201916020918201910161059e565b51815160209384036101000a6000190180199092169116179052920194855250604051938490038101909320805460018101825560009182529381209093018054600160a060020a031916600160a060020a0388161790555050815160051061062757815161062a565b60055b90506000805b828160ff161015610729578351600090859060ff841690811061064f57fe5b9060200190602002015111156107215760056000858360ff1681518110151561067457fe5b602090810290910181015182528101919091526040016000205415156106c6576006848260ff168151811015156106a757fe5b6020908102909101810151825460018101845560009384529190922001555b60056000858360ff168151811015156106db57fe5b60209081029190910181015182528181019290925260400160009081208054600181018255908252919020018054600160a060020a031916600160a060020a0388161790555b600101610630565b505050505050565b60008181526005602090815260409182902080548351818402810184019094528084526060939283018282801561053657602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105185750505050509050919050565b60068054829081106107a957fe5b600091825260209091200154905081565b600a54600160a060020a031615156107e75760405160e560020a62461bcd0281526004016103c190610ef9565b600a54600160a060020a031633146108145760405160e560020a62461bcd0281526004016103c190610ed9565b600160a060020a038083166000818152600360209081526040808320805460ff191660019081179091556007805491820190557fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c688018054600160a060020a03191690941790935592841681529182905290205415156108d957600880546001810182556000919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee3018054600160a060020a031916600160a060020a0383161790555b600160a060020a03908116600090815260208181526040822080546001810182559083529120018054600160a060020a03191692909116919091179055565b600954600160a060020a031633146109455760405160e560020a62461bcd0281526004016103c190610ee9565b600a8054600160a060020a031916600160a060020a0392909216919091179055565b600160a060020a03811660009081526002602090815260409182902080548351818402810184019094528084526060939283018282801561053657602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105185750505050509050919050565b60065490565b60036020526000908152604090205460ff1681565b6008805482908110610a0457fe5b600091825260209091200154600160a060020a0316905081565b6007805482908110610a0457fe5b60606001826040518082805190602001908083835b60208310610a605780518252601f199092019160209182019101610a41565b51815160209384036101000a60001901801990921691161790529201948552506040805194859003820185208054808402870184019092528186529350915083018282801561053657602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105185750505050509050919050565b60075490565b60026020528160005260406000208181548110151561037857fe5b6000610b0f8235610f83565b9392505050565b6000601f82018313610b2757600080fd5b8135610b3a610b3582610f30565b610f09565b91508181835260208401935060208101905083856020840282011115610b5f57600080fd5b60005b83811015610b8b5781610b758882610b95565b8452506020928301929190910190600101610b62565b5050505092915050565b6000610b0f8235610f93565b6000601f82018313610bb257600080fd5b8135610bc0610b3582610f51565b91508082526020830160208301858383011115610bdc57600080fd5b610be7838284610fa2565b50505092915050565b600060208284031215610c0257600080fd5b6000610c0e8484610b03565b949350505050565b60008060408385031215610c2957600080fd5b6000610c358585610b03565b9250506020610c4685828601610b03565b9150509250929050565b600080600060608486031215610c6557600080fd5b6000610c718686610b03565b935050602084013567ffffffffffffffff811115610c8e57600080fd5b610c9a86828701610ba1565b925050604084013567ffffffffffffffff811115610cb757600080fd5b610cc386828701610b16565b9150509250925092565b60008060408385031215610ce057600080fd5b6000610cec8585610b03565b9250506020610c4685828601610b95565b600060208284031215610d0f57600080fd5b6000610c0e8484610b95565b600060208284031215610d2d57600080fd5b813567ffffffffffffffff811115610d4457600080fd5b610c0e84828501610ba1565b610d5981610f83565b82525050565b6000610d6a82610f7f565b808452602084019350610d7c83610f79565b60005b82811015610dac57610d92868351610d50565b610d9b82610f79565b602096909601959150600101610d7f565b5093949350505050565b610d5981610f8e565b610d5981610f93565b601381527f4e6f7420494f5520746f6b656e2063616c6c7300000000000000000000000000602082015260400190565b601c81527f4f6e6c79206d616b65466163746f72792063616e20646f207468697300000000602082015260400190565b601681527f4f6e6c79206f776e65722063616e20646f207468697300000000000000000000602082015260400190565b601681527f4e6f206d616b65466163746f7279206164647265737300000000000000000000602082015260400190565b60208101610e968284610d50565b92915050565b60208082528101610b0f8184610d5f565b60208101610e968284610db6565b60208101610e968284610dbf565b60208082528101610e9681610dc8565b60208082528101610e9681610df8565b60208082528101610e9681610e28565b60208082528101610e9681610e58565b60405181810167ffffffffffffffff81118282101715610f2857600080fd5b604052919050565b600067ffffffffffffffff821115610f4757600080fd5b5060209081020190565b600067ffffffffffffffff821115610f6857600080fd5b506020601f91909101601f19160190565b60200190565b5190565b6000610e9682610f96565b151590565b90565b600160a060020a031690565b8281833750600091015256fea265627a7a723058201a3b84f2e6c4f6f1412fde1924400172a7f3599df42fe56caab47658ade3bcac6c6578706572696d656e74616cf50037","linkReferences":{},"swarmHash":"0172a7f3599df42fe56caab47658ade3bcac6c6578706572696d656e74616cf5","gasEstimates":{"creation":{"codeDepositCost":"814400","executionCost":"21143","totalCost":"835543"},"external":{"addHolder(address,address)":"infinite","addIOU1(address,address)":"infinite","addIOU2(address,string,bytes32[])":"infinite","allIOU(uint256)":"infinite","allIssuers(uint256)":"infinite","allKeywords(uint256)":"infinite","getIOUList(address)":"infinite","getIOUListHold(address)":"infinite","getIOUListKey(bytes32)":"infinite","getIOUListSoc(string)":"infinite","getIOUstotal()":"837","getIssuerstotal()":"551","getKeystotal()":"727","isIOU(address)":"infinite","listHoldersIOUs(address,uint256)":"infinite","listIOUs(address,uint256)":"infinite","setFactory(address)":"infinite","setOwner(address)":"infinite"}},"functionHashes":{"addHolder(address,address)":"23b3af89","addIOU1(address,address)":"5899d142","addIOU2(address,string,bytes32[])":"38a10485","allIOU(uint256)":"c5ab1529","allIssuers(uint256)":"b442fc61","allKeywords(uint256)":"52fae04e","getIOUList(address)":"31df3737","getIOUListHold(address)":"6e01acb8","getIOUListKey(bytes32)":"4f2c272a","getIOUListSoc(string)":"e03e56a9","getIOUstotal()":"f22c3bc3","getIssuerstotal()":"30b02b21","getKeystotal()":"76f7f6de","isIOU(address)":"b21b4451","listHoldersIOUs(address,uint256)":"f466013d","listIOUs(address,uint256)":"00a50d81","setFactory(address)":"5bb47808","setOwner(address)":"13af4035"},"filename":"/mnt/512-2/dfd/iou/.embark/contracts/StoreIOUs.sol","originalFilename":"contracts/StoreIOUs.sol","path":"/mnt/512-2/dfd/iou/contracts/StoreIOUs.sol","type":"file","deploymentAccount":"0x05048CC945907bBB20947bbC243202cB9F7e8fDB"};
const StoreIOUs = new EmbarkJS.Blockchain.Contract(StoreIOUsConfig);

export default StoreIOUs;