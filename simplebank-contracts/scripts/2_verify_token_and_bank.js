const hre = require("hardhat");

async function main() {
  const tokenAddress = '0x60bf3AF1Ea6653A0779E4738319Ea0981CEA802a';
  const bankAddress = '0x2E75F1C09C7327C64607095B21940a950FefB741';

  await hre.run("verify:verify", {
    address: tokenAddress,
  });
  console.log('Token verified');

  await hre.run("verify:verify", {
    address: bankAddress,
    constructorArguments: [ tokenAddress ],
  });
  console.log('Bank verified');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
