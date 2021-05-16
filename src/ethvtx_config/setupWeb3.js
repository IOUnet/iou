import { VtxContract } from 'ethvtx/lib/contracts/VtxContract';
import { loadContractSpec, loadContractInstance, addAccount } from 'ethvtx/lib/dispatchers';
import Web3 from 'web3';
import  EmbarkJs  from 'embarkjs';
import { start, setWeb3, authorizeAndSetWeb3 } from 'ethvtx/lib/dispatchers';
import { embark } from 'ethvtx/lib/utils';

import {IOUToken, MakeIOU, StoreIOUs } from "../embarkArtifacts/contracts"

export const setupWeb3 = async (store) => {
    try {
      await EmbarkJs.enableEthereum ();
  
      return new Promise((ok, ko) => {

        EmbarkJs.onReady(async () => {
            
          
            if (EmbarkJs.enableEthereum ) {
              
                const web3_getter = () => {

                    const web3 = new Web3(EmbarkJs.Blockchain.Providers.web3.getCurrentProvider());

                    return web3;

                };

                await authorizeAndSetWeb3(store.dispatch, {
                    enable: EmbarkJs.enableEthereum,
                    web3: web3_getter
                });

            } else {
                // Recover the Web3 instance created by Embark
                const embark_web3 = EmbarkJs.Blockchain.Providers.web3.web3;

                // Extract the provider to build a very specific version of web3 (in our case web3@1.0.0-beta.32 is the best working version)
                const provider = embark_web3.currentProvider;
                const web3 = new Web3(provider);
                // Set the web3 instance in the store
                setWeb3(store.dispatch, web3);
            }

            // Initialize the Store's contract manager
            VtxContract.init(store);
            try {
            // Loading a spec si made easy with the embark.loadSpec helper
            loadContractSpec(store.dispatch, ...embark.loadSpec(IOUToken, 'IOUToken', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(MakeIOU, 'MakeIOU', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(StoreIOUs, 'StoreIOUs', true, true));
         
            // Loading an instance BEFORE starting the store will check on the chain if the correct bytecode is found, and if not, the WrongNet status is applied

            loadContractInstance(store.dispatch, 'MakeIOU', MakeIOU.address, {
                alias: '@makeiou',
                permanent: true,
                balance: true
            });

            loadContractInstance(store.dispatch, 'StoreIOUs', StoreIOUs.address, {
                alias: '@storeious',
                permanent: true,
                balance: true
            });
        
            
            await StoreIOUs.methods.getIOUstotal().call().then(_value => 
                {   
                    for (let i=0; i<_value; i++) {
                        StoreIOUs.methods.allIOU[i].call().then(IOUaddr => 
                        {  
                        loadContractInstance(store.dispatch, 'IOUtoken', IOUaddr, {
                                //      address: item.addr,
                                    permanent: true,
                                    balance: true
                                });
                 /*       const curIOU =  EmbarkJs.Blockchain.Contract({
                            abi: IOUToken.options.jsonInterface,
                            address:  item.addr}); */

                        });
                    }
                });
            }
            catch {
                alert ("Can't connect to smart contract. Check type of Ethereum  network you connected and reload dApp.")
            }
            /* Loading a permanent account before starting the store will keep it even after resets
            web3.eth.getAccounts().then(e => {    
                addAccount(store.dispatch, e[0], {
                    alias: '@mainacc',
                    permanent: true
                });
            }); */
            // Starts the store, will update the vtxconfig.status depending on the environment. Will also call the enable callback if available
            start(store.dispatch, EmbarkJs.enableEthereum ? EmbarkJs.enableEthereum : undefined);

            window.DEBUG_STORE = store;

            ok();
        });

    });

    }  catch (e) {
        const text = 'Something went wrong connecting to Ethereum. Please make sure you have a node running, installed ethereum wallet (like Metamask or StatusIM or same)  and  connect to the Ethereum network';
        alert (text);
    
    };
}