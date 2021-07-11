require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const privateKeys = [
  process.env.PRIVATE_KEY,
];
const etherscanKey = process.env.ETHERSCAN_KEY || '';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: `https://kovan.infura.io/v3/${infuraProjectId}`,
      },
      saveDeployments: true,
      tags: ["test", "local"],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
      accounts: privateKeys,
      saveDeployments: true,
      tags: ["test", "local"],
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts: privateKeys,
      saveDeployments: true,
      tags: ["test", "local"],
    }
  },
  etherscan: {
    apiKey: etherscanKey,
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

