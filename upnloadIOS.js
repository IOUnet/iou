const  Web3 = require('web3');
//const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/3362483b5eab409ea69e99f99aefd67a'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8555'));

const abiStore = [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"listIOUs","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_holder","type":"address"},{"name":"_IOUtoken","type":"address"}],"name":"addHolder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getIssuerstotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getIOUList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newIOU","type":"address"},{"name":"_socialProfile","type":"string"},{"name":"_keywords","type":"bytes32[]"}],"name":"addIOU2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"getIOUListKey","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allKeywords","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newIOU","type":"address"},{"name":"_emitent","type":"address"}],"name":"addIOU1","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newFact","type":"address"}],"name":"setFactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_holder","type":"address"}],"name":"getIOUListHold","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getKeystotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isIOU","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allIssuers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allIOU","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_profile","type":"string"}],"name":"getIOUListSoc","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getIOUstotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"listHoldersIOUs","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
const IOUs = require("./iouscorr.json");
const h2a = web3.utils.hexToAscii;
const a2h = web3.utils.asciiToHex;
const contr = require("./contr.json")
const addrStore = contr["addrStore"]; // add!
const addrMakeIOU = contr["addrMakeIOU"];
// StoreIOUs deployed at 0x0641670092f12fAf78968fD5246D87690b28c586 using 1161711 gas (txHash: 0x5e540d245e30a55c5d86d40dbfab1b7f986765f59c802486a6205a7486366923)
//MakeIOU deployed at 0xe11FF2A8354cDb9C48bdeA01b6EF57Db52647412 using 3985102 gas (txHash: 0x158eb02688f7528c24bd20a5a72918ccc58e4aa29c17afec2c59097c95764c13)

async function main() {
    const accs = await web3.eth.getAccounts();
    const StoreIOU =  new web3.eth.Contract(abiStore, addrStore);
    await StoreIOU.methods.setFactory(accs[0]).send({from: accs[0]});
    for (i of IOUs) {
        let keywords = i.keywords.split(",").map((e)=>{
            return a2h(e);
          });
        let gasam = await StoreIOU.methods.addIOU1(i.addr, i.from).estimateGas();
        await StoreIOU.methods.addIOU1(i.addr, i.from).send({from: accs[0], gas: gasam }); //, gas: gasam 
       gasam = await StoreIOU.methods.addIOU1(i.addr, i.from).estimateGas();

        await StoreIOU.methods.addIOU2(i.addr, i.socialProfile,keywords ).send({from: accs[0], gas: gasam });
        };
    await StoreIOU.methods.setFactory(addrMakeIOU).send({from: accs[0]});
}


 main().catch(function(err) {
    console.log("!> error");
    console.error(err);
  });

