const hre = require("hardhat");

/**
 * Main deployment script for Cultural Crowdfunding Platform
 * Deploys the main contract with FHE capabilities
 */
async function main() {
  console.log("========================================");
  console.log("Cultural Crowdfunding Platform Deployment");
  console.log("========================================\n");

  // Get network information
  const network = await hre.ethers.provider.getNetwork();
  console.log(`Deploying to network: ${network.name}`);
  console.log(`Chain ID: ${network.chainId}\n`);

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Check minimum balance
  const minBalance = hre.ethers.parseEther("0.1");
  if (balance < minBalance) {
    console.warn("⚠️  Warning: Account balance is low. Deployment may fail.\n");
  }

  console.log("----------------------------------------");
  console.log("Contract Deployment Starting...");
  console.log("----------------------------------------\n");

  // Deploy the main contract
  const ContractFactory = await hre.ethers.getContractFactory(
    "AnonymousCulturalCrowdfunding"
  );

  console.log("⏳ Deploying contract...");
  const startTime = Date.now();

  const contract = await ContractFactory.deploy();
  await contract.waitForDeployment();

  const deployTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const contractAddress = await contract.getAddress();

  console.log("✅ Contract deployed successfully!\n");

  console.log("========================================");
  console.log("Deployment Summary");
  console.log("========================================");
  console.log(`Contract Name: AnonymousCulturalCrowdfunding`);
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Deployer Address: ${deployer.address}`);
  console.log(`Network: ${network.name} (Chain ID: ${network.chainId})`);
  console.log(`Deployment Time: ${deployTime}s`);
  console.log(`Block Number: ${await hre.ethers.provider.getBlockNumber()}`);
  console.log("========================================\n");

  // Save deployment information
  const deploymentInfo = {
    contractName: "AnonymousCulturalCrowdfunding",
    contractAddress: contractAddress,
    deployerAddress: deployer.address,
    network: network.name,
    chainId: network.chainId.toString(),
    deploymentTime: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
    transactionHash: contract.deploymentTransaction().hash,
  };

  const fs = require("fs");
  const path = require("path");
  const deploymentsDir = path.join(__dirname, "..", "deployments");

  // Create deployments directory if it doesn't exist
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  // Save deployment info
  const filename = `${network.name}-deployment-${Date.now()}.json`;
  fs.writeFileSync(
    path.join(deploymentsDir, filename),
    JSON.stringify(deploymentInfo, null, 2)
  );

  // Also save latest deployment
  fs.writeFileSync(
    path.join(deploymentsDir, `${network.name}-latest.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(`📁 Deployment info saved to: deployments/${filename}\n`);

  // Display next steps
  console.log("========================================");
  console.log("Next Steps");
  console.log("========================================");
  console.log("1. Verify contract on Etherscan:");
  console.log(`   npm run verify\n`);
  console.log("2. Interact with the contract:");
  console.log(`   npm run interact\n`);
  console.log("3. Run simulation tests:");
  console.log(`   npm run simulate\n`);

  if (network.name === "sepolia") {
    console.log("4. View on Etherscan:");
    console.log(`   https://sepolia.etherscan.io/address/${contractAddress}\n`);
  }

  console.log("========================================\n");

  // Wait for confirmations on live networks
  if (network.name !== "localhost" && network.name !== "hardhat") {
    console.log("⏳ Waiting for block confirmations...");
    await contract.deploymentTransaction().wait(5);
    console.log("✅ 5 block confirmations received\n");
  }

  return deploymentInfo;
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed with error:\n");
    console.error(error);
    process.exit(1);
  });
