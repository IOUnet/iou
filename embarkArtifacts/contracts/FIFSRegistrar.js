import EmbarkJS from '../embarkjs';

const FIFSRegistrarConfig = {"abiDefinition":[{"constant":false,"inputs":[{"name":"subnode","type":"bytes32"},{"name":"owner","type":"address"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xd22057a9"},{"inputs":[{"name":"ensAddr","type":"address"},{"name":"node","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}],"className":"FIFSRegistrar","args":["0x68002eaF6bC3FA5C45157dB51FaFA02f7b42CaE0","0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae"],"gas":"auto","silent":true,"track":true,"deploy":false,"realRuntimeBytecode":"6080604052600436106100405763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663d22057a98114610045575b600080fd5b34801561005157600080fd5b5061007660043573ffffffffffffffffffffffffffffffffffffffff60243516610078565b005b600154604080516020808201939093528082018590528151808203830181526060909101918290528051859360009384939290918291908401908083835b602083106100d55780518252601f1990920191602091820191016100b6565b51815160209384036101000a600019018019909216911617905260408051929094018290038220600080547f02571be300000000000000000000000000000000000000000000000000000000855260048501839052955191995073ffffffffffffffffffffffffffffffffffffffff90951696506302571be3955060248084019592945090928390030190829087803b15801561017157600080fd5b505af1158015610185573d6000803e3d6000fd5b505050506040513d602081101561019b57600080fd5b5051905073ffffffffffffffffffffffffffffffffffffffff811615806101d7575073ffffffffffffffffffffffffffffffffffffffff811633145b15156101e257600080fd5b60008054600154604080517f06ab592300000000000000000000000000000000000000000000000000000000815260048101929092526024820189905273ffffffffffffffffffffffffffffffffffffffff888116604484015290519216926306ab59239260648084019382900301818387803b15801561026257600080fd5b505af1158015610276573d6000803e3d6000fd5b5050505050505050505600a165627a7a72305820","realArgs":[],"code":"608060405234801561001057600080fd5b5060405160408061030883398101604052805160209091015160008054600160a060020a031916600160a060020a039093169290921782556001556102ad90819061005b90396000f3006080604052600436106100405763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663d22057a98114610045575b600080fd5b34801561005157600080fd5b5061007660043573ffffffffffffffffffffffffffffffffffffffff60243516610078565b005b600154604080516020808201939093528082018590528151808203830181526060909101918290528051859360009384939290918291908401908083835b602083106100d55780518252601f1990920191602091820191016100b6565b51815160209384036101000a600019018019909216911617905260408051929094018290038220600080547f02571be300000000000000000000000000000000000000000000000000000000855260048501839052955191995073ffffffffffffffffffffffffffffffffffffffff90951696506302571be3955060248084019592945090928390030190829087803b15801561017157600080fd5b505af1158015610185573d6000803e3d6000fd5b505050506040513d602081101561019b57600080fd5b5051905073ffffffffffffffffffffffffffffffffffffffff811615806101d7575073ffffffffffffffffffffffffffffffffffffffff811633145b15156101e257600080fd5b60008054600154604080517f06ab592300000000000000000000000000000000000000000000000000000000815260048101929092526024820189905273ffffffffffffffffffffffffffffffffffffffff888116604484015290519216926306ab59239260648084019382900301818387803b15801561026257600080fd5b505af1158015610276573d6000803e3d6000fd5b5050505050505050505600a165627a7a72305820ebb89ba93428b8bd5b039b76284cd01bc18764cffcb64cfd58163125d169441a0029","runtimeBytecode":"6080604052600436106100405763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663d22057a98114610045575b600080fd5b34801561005157600080fd5b5061007660043573ffffffffffffffffffffffffffffffffffffffff60243516610078565b005b600154604080516020808201939093528082018590528151808203830181526060909101918290528051859360009384939290918291908401908083835b602083106100d55780518252601f1990920191602091820191016100b6565b51815160209384036101000a600019018019909216911617905260408051929094018290038220600080547f02571be300000000000000000000000000000000000000000000000000000000855260048501839052955191995073ffffffffffffffffffffffffffffffffffffffff90951696506302571be3955060248084019592945090928390030190829087803b15801561017157600080fd5b505af1158015610185573d6000803e3d6000fd5b505050506040513d602081101561019b57600080fd5b5051905073ffffffffffffffffffffffffffffffffffffffff811615806101d7575073ffffffffffffffffffffffffffffffffffffffff811633145b15156101e257600080fd5b60008054600154604080517f06ab592300000000000000000000000000000000000000000000000000000000815260048101929092526024820189905273ffffffffffffffffffffffffffffffffffffffff888116604484015290519216926306ab59239260648084019382900301818387803b15801561026257600080fd5b505af1158015610276573d6000803e3d6000fd5b5050505050505050505600a165627a7a72305820ebb89ba93428b8bd5b039b76284cd01bc18764cffcb64cfd58163125d169441a0029","swarmHash":"ebb89ba93428b8bd5b039b76284cd01bc18764cffcb64cfd58163125d169441a","gasEstimates":{"creation":{"codeDepositCost":"137000","executionCost":"40632","totalCost":"177632"},"external":{"register(bytes32,address)":"infinite"}},"functionHashes":{"register(bytes32,address)":"d22057a9"},"filename":"C:/dev/embark/lib/modules/ens/contracts/FIFSRegistrar.sol","type":"file","_gasLimit":false,"deploymentAccount":"0x05048CC945907bBB20947bbC243202cB9F7e8fDB"};
const FIFSRegistrar = new EmbarkJS.Blockchain.Contract(FIFSRegistrarConfig);

export default FIFSRegistrar;
