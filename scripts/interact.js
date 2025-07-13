const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

/**
 * Interactive script for the Cultural Crowdfunding Platform
 * Demonstrates key contract functions and interactions
 */
async function main() {
  console.log("========================================");
  console.log("Cultural Crowdfunding Platform - Interaction");
  console.log("========================================\n");

  // Get network and account information
  const network = await hre.ethers.provider.getNetwork();
  const [owner, creator, backer1, backer2] = await hre.ethers.getSigners();

  console.log(`Network: ${network.name} (Chain ID: ${network.chainId})`);
  console.log(`Interacting from account: ${owner.address}\n`);

  // Load deployment information
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  const latestDeploymentFile = path.join(
    deploymentsDir,
    `${network.name}-latest.json`
  );

  if (!fs.existsSync(latestDeploymentFile)) {
    console.error(`❌ Error: No deployment found for network ${network.name}`);
    console.log("\nPlease deploy the contract first:");
    console.log(`npm run deploy\n`);
    process.exit(1);
  }

  const deploymentInfo = JSON.parse(
    fs.readFileSync(latestDeploymentFile, "utf8")
  );

  console.log("----------------------------------------");
  console.log("Contract Information");
  console.log("----------------------------------------");
  console.log(`Address: ${deploymentInfo.contractAddress}`);
  console.log(`Deployed: ${deploymentInfo.deploymentTime}\n`);

  // Connect to the deployed contract
  const Contract = await hre.ethers.getContractFactory(
    "AnonymousCulturalCrowdfunding"
  );
  const contract = Contract.attach(deploymentInfo.contractAddress);

  console.log("========================================");
  console.log("1. Reading Platform Statistics");
  console.log("========================================\n");

  try {
    const stats = await contract.getPlatformStats();
    console.log("Platform Statistics:");
    console.log(`  Total Projects: ${stats.totalProjects}`);
    console.log(`  Active Projects: ${stats.activeProjects}`);
    console.log(`  Successful Projects: ${stats.successfulProjects}`);
    console.log(`  Failed Projects: ${stats.failedProjects}\n`);
  } catch (error) {
    console.error("Error reading platform stats:", error.message, "\n");
  }

  console.log("========================================");
  console.log("2. Creating a Sample Project");
  console.log("========================================\n");

  const projectTitle = "Digital Art Exhibition 2025";
  const projectDescription =
    "A groundbreaking digital art exhibition showcasing emerging artists from around the world";
  const projectCategory = "Digital Art";
  const targetAmount = hre.ethers.parseEther("5.0"); // 5 ETH
  const fundingPeriod = 30 * 24 * 60 * 60; // 30 days in seconds
  const metadataHash = "QmExampleIPFSHash123456789";

  try {
    console.log("Creating project with parameters:");
    console.log(`  Title: ${projectTitle}`);
    console.log(`  Category: ${projectCategory}`);
    console.log(`  Target: ${hre.ethers.formatEther(targetAmount)} ETH`);
    console.log(`  Duration: 30 days\n`);

    console.log("⏳ Sending transaction...");
    const tx = await contract
      .connect(creator)
      .createProject(
        projectTitle,
        projectDescription,
        projectCategory,
        targetAmount,
        fundingPeriod,
        metadataHash
      );

    console.log(`Transaction Hash: ${tx.hash}`);
    console.log("⏳ Waiting for confirmation...\n");

    const receipt = await tx.wait();
    console.log(`✅ Project created! (Block: ${receipt.blockNumber})`);

    // Extract project ID from events
    const projectCreatedEvent = receipt.logs.find(
      (log) => log.fragment && log.fragment.name === "ProjectCreated"
    );

    if (projectCreatedEvent) {
      const projectId = projectCreatedEvent.args.projectId;
      console.log(`Project ID: ${projectId}\n`);
    }
  } catch (error) {
    console.error("Error creating project:", error.message, "\n");
  }

  console.log("========================================");
  console.log("3. Retrieving Project Information");
  console.log("========================================\n");

  try {
    const projectCount = await contract.projectCounter();
    console.log(`Total Projects: ${projectCount}\n`);

    if (projectCount > 0) {
      console.log("Latest Project Details:");
      const project = await contract.getProject(projectCount);

      console.log(`  Title: ${project.title}`);
      console.log(`  Description: ${project.description}`);
      console.log(`  Category: ${project.category}`);
      console.log(`  Creator: ${project.creator}`);
      console.log(
        `  Deadline: ${new Date(Number(project.deadline) * 1000).toLocaleString()}`
      );
      console.log(`  Status: ${getStatusName(project.status)}`);
      console.log(`  Backers: ${project.backerCount}`);
      console.log(`  Metadata Hash: ${project.metadataHash}\n`);
    }
  } catch (error) {
    console.error("Error retrieving project:", error.message, "\n");
  }

  console.log("========================================");
  console.log("4. Making Anonymous Contributions");
  console.log("========================================\n");

  try {
    const projectCount = await contract.projectCounter();

    if (projectCount > 0) {
      const contributionAmount = hre.ethers.parseEther("0.5");
      const supportMessage = "Excited to support this amazing project!";

      console.log(`Contributing ${hre.ethers.formatEther(contributionAmount)} ETH`);
      console.log(`Support Message: "${supportMessage}"\n`);

      console.log("⏳ Sending contribution transaction...");
      const tx = await contract
        .connect(backer1)
        .contributeAnonymously(projectCount, supportMessage, {
          value: contributionAmount,
        });

      console.log(`Transaction Hash: ${tx.hash}`);
      console.log("⏳ Waiting for confirmation...\n");

      const receipt = await tx.wait();
      console.log(`✅ Contribution successful! (Block: ${receipt.blockNumber})\n`);
    }
  } catch (error) {
    console.error("Error making contribution:", error.message, "\n");
  }

  console.log("========================================");
  console.log("5. Checking Creator Projects");
  console.log("========================================\n");

  try {
    const creatorProjects = await contract.getCreatorProjects(creator.address);
    console.log(`${creator.address} has created:`);
    console.log(`  ${creatorProjects.length} project(s)\n`);

    if (creatorProjects.length > 0) {
      console.log("Project IDs:", creatorProjects.map((id) => id.toString()).join(", "));
      console.log();
    }
  } catch (error) {
    console.error("Error retrieving creator projects:", error.message, "\n");
  }

  console.log("========================================");
  console.log("6. Checking Backer Projects");
  console.log("========================================\n");

  try {
    const backerProjects = await contract.getBackerProjects(backer1.address);
    console.log(`${backer1.address} has backed:`);
    console.log(`  ${backerProjects.length} project(s)\n`);

    if (backerProjects.length > 0) {
      console.log("Project IDs:", backerProjects.map((id) => id.toString()).join(", "));
      console.log();
    }
  } catch (error) {
    console.error("Error retrieving backer projects:", error.message, "\n");
  }

  console.log("========================================");
  console.log("Interaction Complete");
  console.log("========================================\n");

  console.log("Additional Functions Available:");
  console.log("  - finalizeProject(projectId): Finalize project after deadline");
  console.log("  - withdrawFunds(projectId): Withdraw funds for successful projects");
  console.log("  - requestRefund(projectId): Request refund for failed projects");
  console.log("  - getProjectAmounts(projectId): View encrypted amounts (authorized only)");
  console.log("  - emergencyPause(projectId): Emergency pause (owner only)\n");
}

/**
 * Helper function to convert status enum to readable string
 */
function getStatusName(status) {
  const statuses = ["Active", "Successful", "Failed", "Withdrawn"];
  return statuses[status] || "Unknown";
}

// Execute interaction script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Interaction failed:\n");
    console.error(error);
    process.exit(1);
  });
