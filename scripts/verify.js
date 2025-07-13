const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

/**
 * Contract verification script for Etherscan
 * Automatically reads deployment info and verifies the contract
 */
async function main() {
  console.log("========================================");
  console.log("Contract Verification");
  console.log("========================================\n");

  // Get network information
  const network = await hre.ethers.provider.getNetwork();
  console.log(`Network: ${network.name}`);
  console.log(`Chain ID: ${network.chainId}\n`);

  // Check if Etherscan API key is configured
  if (!process.env.ETHERSCAN_API_KEY) {
    console.error("❌ Error: ETHERSCAN_API_KEY not found in .env file");
    console.log("\nPlease add your Etherscan API key to .env:");
    console.log("ETHERSCAN_API_KEY=your-api-key-here\n");
    process.exit(1);
  }

  // Load deployment information
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  const latestDeploymentFile = path.join(
    deploymentsDir,
    `${network.name}-latest.json`
  );

  if (!fs.existsSync(latestDeploymentFile)) {
    console.error(`❌ Error: No deployment found for network ${network.name}`);
    console.log("\nPlease deploy the contract first:");
    console.log(`npm run deploy --network ${network.name}\n`);
    process.exit(1);
  }

  const deploymentInfo = JSON.parse(
    fs.readFileSync(latestDeploymentFile, "utf8")
  );

  console.log("----------------------------------------");
  console.log("Deployment Information");
  console.log("----------------------------------------");
  console.log(`Contract: ${deploymentInfo.contractName}`);
  console.log(`Address: ${deploymentInfo.contractAddress}`);
  console.log(`Deployer: ${deploymentInfo.deployerAddress}`);
  console.log(`Deployed: ${deploymentInfo.deploymentTime}`);
  console.log(`Tx Hash: ${deploymentInfo.transactionHash}\n`);

  console.log("----------------------------------------");
  console.log("Starting Verification...");
  console.log("----------------------------------------\n");

  try {
    // Verify the contract on Etherscan
    console.log("⏳ Submitting contract for verification...\n");

    await hre.run("verify:verify", {
      address: deploymentInfo.contractAddress,
      constructorArguments: [],
    });

    console.log("\n✅ Contract verified successfully!\n");

    console.log("========================================");
    console.log("Verification Complete");
    console.log("========================================");
    console.log(`Contract Address: ${deploymentInfo.contractAddress}`);

    if (network.name === "sepolia") {
      console.log(
        `Etherscan URL: https://sepolia.etherscan.io/address/${deploymentInfo.contractAddress}#code`
      );
    } else if (network.name === "mainnet") {
      console.log(
        `Etherscan URL: https://etherscan.io/address/${deploymentInfo.contractAddress}#code`
      );
    }

    console.log("========================================\n");

    // Update deployment info with verification status
    deploymentInfo.verified = true;
    deploymentInfo.verifiedAt = new Date().toISOString();

    fs.writeFileSync(
      latestDeploymentFile,
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("📁 Deployment info updated with verification status\n");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ Contract is already verified on Etherscan!\n");

      if (network.name === "sepolia") {
        console.log(
          `View on Etherscan: https://sepolia.etherscan.io/address/${deploymentInfo.contractAddress}#code\n`
        );
      } else if (network.name === "mainnet") {
        console.log(
          `View on Etherscan: https://etherscan.io/address/${deploymentInfo.contractAddress}#code\n`
        );
      }
    } else {
      console.error("\n❌ Verification failed:\n");
      console.error(error.message);
      console.log("\nCommon issues:");
      console.log("1. Contract was just deployed - wait 1-2 minutes");
      console.log("2. Invalid Etherscan API key");
      console.log("3. Constructor arguments mismatch");
      console.log("4. Network configuration issue\n");
      throw error;
    }
  }
}

// Execute verification
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Verification process failed\n");
    process.exit(1);
  });
