import EmbarkJS from '../embarkjs';

const MinterRoleConfig = {"abiDefinition":[{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"}],"className":"MinterRole","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"","realArgs":[],"code":"","runtimeBytecode":"","linkReferences":{},"swarmHash":"","gasEstimates":null,"functionHashes":{"addMinter(address)":"983b2d56","isMinter(address)":"aa271e1a","renounceMinter()":"98650275"},"filename":"/mnt/512-2/dfd/iou/.embark/contracts/access/roles/MinterRole.sol","originalFilename":"contracts/access/roles/MinterRole.sol","path":"/mnt/512-2/dfd/iou/contracts/access/roles/MinterRole.sol","type":"file","deploymentAccount":"0x05048CC945907bBB20947bbC243202cB9F7e8fDB"};
const MinterRole = new EmbarkJS.Blockchain.Contract(MinterRoleConfig);

export default MinterRole;