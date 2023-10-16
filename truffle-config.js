const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "YOUR_INFURA_KEY"; // Infura key veya benzeri bir hizmet sağlayıcı
const mnemonic = "YOUR_MNEMONIC_PHRASE"; // Cüzdanınızın mnemonik ifadesi

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    camino: {  // Örnek olarak "camino" adını kullandık, değiştirilebilir
      provider: () => new HDWalletProvider(mnemonic, `https://camino.network/rpc_url`),
      network_id: "CAMINO_NETWORK_ID",
      gas: 4500000,
      gasPrice: 10000000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
