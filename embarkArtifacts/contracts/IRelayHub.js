import EmbarkJS from '../embarkjs';

const IRelayHubConfig = {"abiDefinition":[{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"dest","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"transactionFee","type":"uint256"},{"name":"url","type":"string"}],"name":"registerRelay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"relay","type":"address"},{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"encodedFunction","type":"bytes"},{"name":"transactionFee","type":"uint256"},{"name":"gasPrice","type":"uint256"},{"name":"gasLimit","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"signature","type":"bytes"},{"name":"approvalData","type":"bytes"}],"name":"canRelay","outputs":[{"name":"status","type":"uint256"},{"name":"recipientContext","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"from","type":"address"}],"name":"getNonce","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"unsignedTx","type":"bytes"},{"name":"signature","type":"bytes"}],"name":"penalizeIllegalTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"encodedFunction","type":"bytes"},{"name":"transactionFee","type":"uint256"},{"name":"gasPrice","type":"uint256"},{"name":"gasLimit","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"signature","type":"bytes"},{"name":"approvalData","type":"bytes"}],"name":"relayCall","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"relayedCallStipend","type":"uint256"}],"name":"requiredGas","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"relay","type":"address"}],"name":"getRelay","outputs":[{"name":"totalStake","type":"uint256"},{"name":"unstakeDelay","type":"uint256"},{"name":"unstakeTime","type":"uint256"},{"name":"owner","type":"address"},{"name":"state","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"relayedCallStipend","type":"uint256"},{"name":"gasPrice","type":"uint256"},{"name":"transactionFee","type":"uint256"}],"name":"maxPossibleCharge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"unsignedTx1","type":"bytes"},{"name":"signature1","type":"bytes"},{"name":"unsignedTx2","type":"bytes"},{"name":"signature2","type":"bytes"}],"name":"penalizeRepeatedNonce","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"}],"name":"depositFor","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"relayaddr","type":"address"},{"name":"unstakeDelay","type":"uint256"}],"name":"stake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"relay","type":"address"}],"name":"removeRelayByOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"relay","type":"address"}],"name":"unstake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"relay","type":"address"},{"indexed":false,"name":"stake","type":"uint256"},{"indexed":false,"name":"unstakeDelay","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"relay","type":"address"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"transactionFee","type":"uint256"},{"indexed":false,"name":"stake","type":"uint256"},{"indexed":false,"name":"unstakeDelay","type":"uint256"},{"indexed":false,"name":"url","type":"string"}],"name":"RelayAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"relay","type":"address"},{"indexed":false,"name":"unstakeTime","type":"uint256"}],"name":"RelayRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"relay","type":"address"},{"indexed":false,"name":"stake","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"recipient","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":true,"name":"dest","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"relay","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"selector","type":"bytes4"},{"indexed":false,"name":"reason","type":"uint256"}],"name":"CanRelayFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"relay","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"selector","type":"bytes4"},{"indexed":false,"name":"status","type":"uint8"},{"indexed":false,"name":"charge","type":"uint256"}],"name":"TransactionRelayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"relay","type":"address"},{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Penalized","type":"event"}],"className":"IRelayHub","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"","realArgs":[],"code":"","runtimeBytecode":"","linkReferences":{},"swarmHash":"","gasEstimates":null,"functionHashes":{"balanceOf(address)":"70a08231","canRelay(address,address,address,bytes,uint256,uint256,uint256,uint256,bytes,bytes)":"2b601747","depositFor(address)":"aa67c919","getNonce(address)":"2d0335ab","getRelay(address)":"8d851460","maxPossibleCharge(uint256,uint256,uint256)":"a863f8f9","penalizeIllegalTransaction(bytes,bytes)":"39002432","penalizeRepeatedNonce(bytes,bytes,bytes,bytes)":"a8cd9572","registerRelay(uint256,string)":"1166073a","relayCall(address,address,bytes,uint256,uint256,uint256,uint256,bytes,bytes)":"405cec67","removeRelayByOwner(address)":"c3e712f2","requiredGas(uint256)":"6a7d84a4","stake(address,uint256)":"adc9772e","unstake(address)":"f2888dbb","withdraw(uint256,address)":"00f714ce"},"filename":"/mnt/512-2/dfd/iou/.embark/contracts/GSN/IRelayHub.sol","originalFilename":"contracts/GSN/IRelayHub.sol","path":"/mnt/512-2/dfd/iou/contracts/GSN/IRelayHub.sol","type":"file","deploymentAccount":"0x132e2c063960e14eE62EC2dAC6AbA6bA4BB68552"};
const IRelayHub = new EmbarkJS.Blockchain.Contract(IRelayHubConfig);

export default IRelayHub;
