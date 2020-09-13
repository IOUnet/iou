import EmbarkJS from '../embarkjs';

const MathConfig = {"abiDefinition":[],"className":"Math","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a72305820","realArgs":[],"code":"604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a72305820cbe4593cb2b8a1d4a969ede932d45418a8020ef8ba1ab705fc03f30b236f5c860029","runtimeBytecode":"73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a72305820cbe4593cb2b8a1d4a969ede932d45418a8020ef8ba1ab705fc03f30b236f5c860029","linkReferences":{},"swarmHash":"cbe4593cb2b8a1d4a969ede932d45418a8020ef8ba1ab705fc03f30b236f5c86","gasEstimates":{"creation":{"codeDepositCost":"15200","executionCost":"116","totalCost":"15316"},"internal":{"average(uint256,uint256)":"infinite","max(uint256,uint256)":"infinite","min(uint256,uint256)":"infinite"}},"functionHashes":{},"filename":"/mnt/512-2/dfd/iou/.embark/contracts/math/Math.sol","originalFilename":"contracts/math/Math.sol","path":"/mnt/512-2/dfd/iou/contracts/math/Math.sol","type":"file","deploymentAccount":"0x05048CC945907bBB20947bbC243202cB9F7e8fDB"};
const Math = new EmbarkJS.Blockchain.Contract(MathConfig);

export default Math;