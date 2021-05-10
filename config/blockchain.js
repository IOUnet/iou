// This file contains only the basic configuration you need to run Embark's node
// For additional configurations, see: https://embark.status.im/docs/blockchain_configuration.html
module.exports = {
  // default applies to all environments
  default: {
    enabled: true,
    client: "geth" // Can be geth or parity (default:geth)
  },

  development: {
    clientConfig: {
      miningMode: 'dev' // Mode in which the node mines. Options: dev, auto, always, off
    }
  },

  privatenet: {
    // Accounts to use as node accounts
    // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
    // For more account configurations, see: https://embark.status.im/docs/blockchain_accounts_configuration.html
    accounts: [
      {
        nodeAccounts: true, // Accounts use for the node
        numAddresses: "1", // Number of addresses/accounts (defaults to 1)
        password: "config/development/password" // Password file for the accounts
      }
    ],
    clientConfig: {
      datadir: ".embark/privatenet/datadir", // Data directory for the databases and keystore
      miningMode: 'auto',
      genesisBlock: "config/privatenet/genesis.json" // Genesis block to initiate on first creation of a development node
    }
  },

  privateparitynet: {
    client: "parity",
    genesisBlock: "config/privatenet/genesis-parity.json",
    datadir: ".embark/privatenet/datadir",
    miningMode: 'off'
  },

  externalnode: {
    endpoint: "https://ropsten.infura.io/v3/3362483b5eab409ea69e99f99aefd67a", // Endpoint of an node to connect to. Can be on localhost or on the internet
    accounts: [
      {
        //privateKeyFile: "./testnet/password",
        privateKey: "622306b68d3ad3e9c73a2f847f50f97caf1eb611ac2047624959663837c4e9bd",
        //mnemonic: "YOUR_MNEMONIC",
        //hdpath: "m/44'/60'/0'/0/",
        //numAddresses: "1"
      }
    ]
  },
  testnet: {
    networkType: "testnet", // Can be: testnet(ropsten), rinkeby, livenet or custom, in which case, it will use the specified networkId
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/testnet/password"
      }
    ]
  },

  livenet: {
    networkType: "livenet",
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/livenet/password"
      }
    ]
  },
  localnode: {
    networkType: "testnet", // Can be: testnet(ropsten), rinkeby, livenet or custom, in which case, it will use the specified networkId
    syncMode: "light",
    endpoint: "http://127.0.0.1:8545/", // Endpoint of an node to connect to. Can be on localhost or on the internet
    accounts: [
      {
    
        //privateKeyFile: "./testnet/password",
        privateKey: "622306b68d3ad3e9c73a2f847f50f97caf1eb611ac2047624959663837c4e9bd",
        
        //mnemonic: "YOUR_MNEMONIC",
        //hdpath: "m/44'/60'/0'/0/",
        //numAddresses: "1"
      }
    ]
  },
  alfajores: {
    // fork Celo mainnet
   
    // do:
    // npm install -g ganache-cli
    
    //  ganache-cli -f https://alfajores-forno.celo-testnet.org -m "sing bomb odor actress latin surround design squirrel engage swim illness daring office pumpkin critic room parrot pencil course gorilla thumb plate recycle hidden" -u 0x69748533FeE28A6D6ee8dB3E9E5C6dAE6fDAc99a --db ./alfajores
    // embark run --nodashboard  alfajores
  //  endpoint: "https://alfajores-forno.celo-testnet.org", // Endpoint of an node to connect to. Can be on localhost or on the internet
// http://127.0.0.1:8545/
    endpoint: "http://127.0.0.1:8545/", // Endpoint of an node to connect to. Can be on localhost or on the internet
    accounts: [
      {
        //privateKeyFile: "./testnet/password",
       // privateKey: "",// process.env.privKey,
     //  nodeAccounts: true,
      // numAddresses: "10",
     // addressIndex: "1",
        mnemonic: "sing bomb odor actress latin surround design squirrel engage swim illness daring office pumpkin critic room parrot pencil course gorilla thumb plate recycle hidden",
        hdpath: "m/44'/60'/0'/0/",
                   //m/44'/60'/0'/0/
 
      }
    ]
  },
  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
