module.exports = {
  // default applies to all environments
  default: {
    enabled: true,
    provider: "whisper", // Communication provider. Currently, Embark only supports whisper
    available_providers: ["whisper"], // Array of available providers
    client: "geth"
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    connection: {
      host: "localhost", // Host of the provider node
      port: 8547, // Port of the provider node
      type: "ws" // Type of connection (ws or rpc)
    }
  },

  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {
  },


  // merges with the settings in default
  // used with "embark run testnet"
  testnet: {
  },

  // merges with the settings in default
  // used with "embark run livenet"
  livenet: {
  },

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name"
  //custom_name: {
  //}
  // Use this section when you need a specific symmetric or private keys in whisper
  /*
  ,keys: {
    symmetricKey: "your_symmetric_key",// Symmetric key for message decryption
    privateKey: "your_private_key" // Private Key to be used as a signing key and for message decryption
  }
  */
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
  ],
  enabled: true,
    networkType: "testnet", // Can be: testnet(ropsten), rinkeby, livenet or custom, in which case, it will use the specified networkId
    syncMode: "light",
    provider: "whisper", // Communication provider. Currently, Embark only supports whisper
    available_providers: ["whisper"], // Array of available providers
    client: "geth"
  },
  localnode: {
    endpoint: "http://127.0.0.1:8545/", // Endpoint of an node to connect to. Can be on localhost or on the internet
    accounts: [
      {
      //privateKeyFile: "./testnet/password",
      privateKey: "622306b68d3ad3e9c73a2f847f50f97caf1eb611ac2047624959663837c4e9bd"
      //mnemonic: "YOUR_MNEMONIC",
      //hdpath: "m/44'/60'/0'/0/",
      //numAddresses: "1"
    }
  ],
  enabled: true,
  provider: "whisper", // Communication provider. Currently, Embark only supports whisper
  available_providers: ["whisper"], // Array of available providers
  client: "geth"
 },

};
