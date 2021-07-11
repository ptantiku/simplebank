const { ethers } = require("hardhat");

async function main() {
  // deploy token
  const SimpleToken = await ethers.getContractFactory('SimpleToken');
  const token = await SimpleToken.deploy();
  await token.deployed();
  console.log(`SimpleToken deployed to: ${token.address}`);

  // premine to deployer
  const premineAmount = '1000000';
  await token.mint(ethers.utils.parseEther(premineAmount, 'ether'));
  console.log(`Minted to deployer for ${premineAmount}`);

  // deploy bank
  const SimpleBankERC20 = await ethers.getContractFactory('SimpleBankERC20');
  const bank = await SimpleBankERC20.deploy(token.address);
  console.log(`SimpleBankERC20 deployed to: ${bank.address}`);

  // transfer owner
  await token.transferOwnership(bank.address);
  console.log(`Ownership of token is transfered to bank`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
