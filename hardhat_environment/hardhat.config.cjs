require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY_SEPOLIA],
      chainId: 11155111
    },
    base_sepolia: {
      url: process.env.BASE_SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY_BASE_SEPOLIA],
      chainId: 84532
    }
  }
};
