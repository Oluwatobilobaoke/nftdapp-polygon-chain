const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // URL from where we can extract the metadata for a LW3Punks
  const metadataURL = "ipfs://QmYiVjgGUE3dc55tF2mhWcAyLiQ4XEgjdzfnCkXouyR818/";
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so lw3PunksContract here is a factory for instances of our LW3Punks contract.
  */
  const lw3PunksContract = await ethers.getContractFactory("LW3Punks");

  // deploy the contract
  const deployedLW3PunksContract = await lw3PunksContract.deploy(metadataURL);

  await deployedLW3PunksContract.deployed();

  // print the address of the deployed contract
  console.log("LW3Punks Contract Address:", deployedLW3PunksContract.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(60000);


  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedLW3PunksContract.address,
    constructorArguments: [metadataURL],
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });