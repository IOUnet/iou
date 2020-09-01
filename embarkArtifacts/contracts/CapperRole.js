import EmbarkJS from '../embarkjs';

const CapperRoleConfig = {"abiDefinition":[{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isCapper","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceCapper","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addCapper","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"CapperAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"CapperRemoved","type":"event"}],"className":"CapperRole","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"","realArgs":[],"code":"","runtimeBytecode":"","linkReferences":{},"swarmHash":"","gasEstimates":null,"functionHashes":{"addCapper(address)":"8dfbcf36","isCapper(address)":"39564561","renounceCapper()":"5d5576f8"},"filename":"/mnt/512-2/dfd/iou/.embark/contracts/access/roles/CapperRole.sol","originalFilename":"contracts/access/roles/CapperRole.sol","path":"/mnt/512-2/dfd/iou/contracts/access/roles/CapperRole.sol","type":"file","deploymentAccount":"0x05048CC945907bBB20947bbC243202cB9F7e8fDB"};
const CapperRole = new EmbarkJS.Blockchain.Contract(CapperRoleConfig);

export default CapperRole;
