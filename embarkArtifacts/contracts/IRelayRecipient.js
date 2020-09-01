import EmbarkJS from '../embarkjs';

const IRelayRecipientConfig = {"abiDefinition":[{"constant":true,"inputs":[],"name":"getHubAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"context","type":"bytes"}],"name":"preRelayedCall","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"relay","type":"address"},{"name":"from","type":"address"},{"name":"encodedFunction","type":"bytes"},{"name":"transactionFee","type":"uint256"},{"name":"gasPrice","type":"uint256"},{"name":"gasLimit","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"approvalData","type":"bytes"},{"name":"maxPossibleCharge","type":"uint256"}],"name":"acceptRelayedCall","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"context","type":"bytes"},{"name":"success","type":"bool"},{"name":"actualCharge","type":"uint256"},{"name":"preRetVal","type":"bytes32"}],"name":"postRelayedCall","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],"className":"IRelayRecipient","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"","realArgs":[],"code":"","runtimeBytecode":"","linkReferences":{},"swarmHash":"","gasEstimates":null,"functionHashes":{"acceptRelayedCall(address,address,bytes,uint256,uint256,uint256,uint256,bytes,uint256)":"83947ea0","getHubAddr()":"74e861d6","postRelayedCall(bytes,bool,uint256,bytes32)":"e06e0e22","preRelayedCall(bytes)":"80274db7"},"filename":"/mnt/512-2/dfd/iou/.embark/contracts/GSN/IRelayRecipient.sol","originalFilename":"contracts/GSN/IRelayRecipient.sol","path":"/mnt/512-2/dfd/iou/contracts/GSN/IRelayRecipient.sol","type":"file","deploymentAccount":"0x05048CC945907bBB20947bbC243202cB9F7e8fDB"};
const IRelayRecipient = new EmbarkJS.Blockchain.Contract(IRelayRecipientConfig);

export default IRelayRecipient;
