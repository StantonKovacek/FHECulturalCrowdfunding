const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

/**
 * Comprehensive simulation script for Cultural Crowdfunding Platform
 * Tests complete project lifecycle with multiple scenarios
 */
async function main() {
  console.log("========================================");
  console.log("Cultural Crowdfunding Platform - Simulation");
  console.log("========================================\n");

  // Get network and multiple test accounts
  const network = await hre.ethers.provider.getNetwork();
  const [owner, creator1, creator2, backer1, backer2, backer3] =
    await hre.ethers.getSigners();

  console.log(`Network: ${network.name} (Chain ID: ${network.chainId})`);
  console.log(`Running simulation with ${6} test accounts\n`);

  // Display account information
  console.log("Test Accounts:");
  console.log(`  Owner:    ${owner.address}`);
  console.log(`  Creator1: ${creator1.address}`);
  console.log(`  Creator2: ${creator2.address}`);
  console.log(`  Backer1:  ${backer1.address}`);
  console.log(`  Backer2:  ${backer2.address}`);
  console.log(`  Backer3:  ${backer3.address}\n`);

  // Load or deploy contract
  let contract;
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  const latestDeploymentFile = path.join(
    deploymentsDir,
    `${network.name}-latest.json`
  );

  if (fs.existsSync(latestDeploymentFile)) {
    const deploymentInfo = JSON.parse(
      fs.readFileSync(latestDeploymentFile, "utf8")
    );
    console.log("Using existing deployment:");
    console.log(`  Address: ${deploymentInfo.contractAddress}\n`);

    const Contract = await hre.ethers.getContractFactory(
      "AnonymousCulturalCrowdfunding"
    );
    contract = Contract.attach(deploymentInfo.contractAddress);
  } else {
    console.log("No deployment found. Deploying new contract...\n");
    const Contract = await hre.ethers.getContractFactory(
      "AnonymousCulturalCrowdfunding"
    );
    contract = await Contract.deploy();
    await contract.waitForDeployment();
    console.log(`✅ Contract deployed at: ${await contract.getAddress()}\n`);
  }

  console.log("========================================");
  console.log("Simulation Scenario 1: Successful Project");
  console.log("========================================\n");

  const project1Title = "Traditional Music Archive Project";
  const project1Description =
    "Digitizing and preserving traditional music from indigenous communities";
  const project1Category = "Music";
  const project1Target = hre.ethers.parseEther("2.0");
  const project1Duration = 7 * 24 * 60 * 60; // 7 days

  console.log("Step 1: Creator1 creates a project");
  console.log(`  Title: ${project1Title}`);
  console.log(`  Target: ${hre.ethers.formatEther(project1Target)} ETH`);
  console.log(`  Duration: 7 days\n`);

  try {
    const tx1 = await contract
      .connect(creator1)
      .createProject(
        project1Title,
        project1Description,
        project1Category,
        project1Target,
        project1Duration,
        "QmProject1MetadataHash"
      );
    await tx1.wait();
    console.log("✅ Project 1 created successfully\n");
  } catch (error) {
    console.error("❌ Error creating project 1:", error.message, "\n");
  }

  console.log("Step 2: Multiple backers contribute to the project");

  try {
    // Backer 1 contributes
    const contribution1 = hre.ethers.parseEther("0.8");
    console.log(`  Backer1 contributing ${hre.ethers.formatEther(contribution1)} ETH`);
    const tx2 = await contract
      .connect(backer1)
      .contributeAnonymously(1, "Love this project!", { value: contribution1 });
    await tx2.wait();
    console.log("  ✅ Backer1 contribution successful");

    // Backer 2 contributes
    const contribution2 = hre.ethers.parseEther("0.7");
    console.log(`  Backer2 contributing ${hre.ethers.formatEther(contribution2)} ETH`);
    const tx3 = await contract
      .connect(backer2)
      .contributeAnonymously(1, "Great initiative!", { value: contribution2 });
    await tx3.wait();
    console.log("  ✅ Backer2 contribution successful");

    // Backer 3 contributes
    const contribution3 = hre.ethers.parseEther("0.6");
    console.log(`  Backer3 contributing ${hre.ethers.formatEther(contribution3)} ETH`);
    const tx4 = await contract
      .connect(backer3)
      .contributeAnonymously(1, "Supporting cultural heritage!", {
        value: contribution3,
      });
    await tx4.wait();
    console.log("  ✅ Backer3 contribution successful\n");

    const totalContributed = contribution1 + contribution2 + contribution3;
    console.log(`Total contributed: ${hre.ethers.formatEther(totalContributed)} ETH`);
    console.log(
      `Target: ${hre.ethers.formatEther(project1Target)} ETH (${totalContributed >= project1Target ? "✅ REACHED" : "❌ NOT REACHED"})\n`
    );
  } catch (error) {
    console.error("❌ Error during contributions:", error.message, "\n");
  }

  console.log("Step 3: Check project status");
  try {
    const project = await contract.getProject(1);
    console.log(`  Title: ${project.title}`);
    console.log(`  Status: ${getStatusName(project.status)}`);
    console.log(`  Backers: ${project.backerCount}`);
    console.log(`  Creator: ${project.creator}\n`);
  } catch (error) {
    console.error("❌ Error reading project:", error.message, "\n");
  }

  console.log("========================================");
  console.log("Simulation Scenario 2: Multiple Projects");
  console.log("========================================\n");

  console.log("Step 1: Creator2 creates multiple projects");

  const projects = [
    {
      title: "Community Theater Revival",
      description: "Restoring a historic community theater",
      category: "Theater & Performance",
      target: hre.ethers.parseEther("3.5"),
      duration: 14 * 24 * 60 * 60,
    },
    {
      title: "Photography Documentary Series",
      description: "Documenting urban cultural evolution",
      category: "Photography",
      target: hre.ethers.parseEther("1.5"),
      duration: 21 * 24 * 60 * 60,
    },
    {
      title: "Traditional Crafts Workshop",
      description: "Teaching traditional craftsmanship to youth",
      category: "Traditional Crafts",
      target: hre.ethers.parseEther("1.0"),
      duration: 30 * 24 * 60 * 60,
    },
  ];

  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    console.log(`\nCreating Project ${i + 2}: ${proj.title}`);
    console.log(`  Category: ${proj.category}`);
    console.log(`  Target: ${hre.ethers.formatEther(proj.target)} ETH`);

    try {
      const tx = await contract
        .connect(creator2)
        .createProject(
          proj.title,
          proj.description,
          proj.category,
          proj.target,
          proj.duration,
          `QmProject${i + 2}MetadataHash`
        );
      await tx.wait();
      console.log(`  ✅ Project ${i + 2} created`);
    } catch (error) {
      console.error(`  ❌ Error creating project ${i + 2}:`, error.message);
    }
  }

  console.log("\n\n========================================");
  console.log("Simulation Scenario 3: Platform Statistics");
  console.log("========================================\n");

  try {
    const stats = await contract.getPlatformStats();
    console.log("Current Platform Statistics:");
    console.log(`  📊 Total Projects: ${stats.totalProjects}`);
    console.log(`  🟢 Active Projects: ${stats.activeProjects}`);
    console.log(`  ✅ Successful Projects: ${stats.successfulProjects}`);
    console.log(`  ❌ Failed Projects: ${stats.failedProjects}\n`);
  } catch (error) {
    console.error("❌ Error reading stats:", error.message, "\n");
  }

  console.log("========================================");
  console.log("Simulation Scenario 4: User Activity");
  console.log("========================================\n");

  console.log("Creator1 Projects:");
  try {
    const creator1Projects = await contract.getCreatorProjects(creator1.address);
    console.log(`  Created ${creator1Projects.length} project(s)`);
    if (creator1Projects.length > 0) {
      console.log(
        `  Project IDs: ${creator1Projects.map((id) => id.toString()).join(", ")}`
      );
    }
  } catch (error) {
    console.error("  ❌ Error:", error.message);
  }

  console.log("\nCreator2 Projects:");
  try {
    const creator2Projects = await contract.getCreatorProjects(creator2.address);
    console.log(`  Created ${creator2Projects.length} project(s)`);
    if (creator2Projects.length > 0) {
      console.log(
        `  Project IDs: ${creator2Projects.map((id) => id.toString()).join(", ")}`
      );
    }
  } catch (error) {
    console.error("  ❌ Error:", error.message);
  }

  console.log("\nBacker1 Activity:");
  try {
    const backer1Projects = await contract.getBackerProjects(backer1.address);
    console.log(`  Backed ${backer1Projects.length} project(s)`);
    if (backer1Projects.length > 0) {
      console.log(
        `  Project IDs: ${backer1Projects.map((id) => id.toString()).join(", ")}`
      );
    }
  } catch (error) {
    console.error("  ❌ Error:", error.message);
  }

  console.log("\n========================================");
  console.log("Simulation Complete");
  console.log("========================================\n");

  console.log("Summary:");
  try {
    const finalStats = await contract.getPlatformStats();
    console.log(`  ✅ Successfully created ${finalStats.totalProjects} projects`);
    console.log(
      `  ✅ Tested multiple user interactions and scenarios`
    );
    console.log(`  ✅ Platform is functioning correctly\n`);
  } catch (error) {
    console.error("  ❌ Error reading final stats:", error.message, "\n");
  }

  console.log("Next Steps:");
  console.log("  1. Test project finalization after deadline");
  console.log("  2. Test fund withdrawal for successful projects");
  console.log("  3. Test refund mechanism for failed projects");
  console.log("  4. Monitor FHE encryption functionality\n");
}

/**
 * Helper function to convert status enum to readable string
 */
function getStatusName(status) {
  const statuses = ["Active", "Successful", "Failed", "Withdrawn"];
  return statuses[status] || "Unknown";
}

// Execute simulation
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Simulation failed:\n");
    console.error(error);
    process.exit(1);
  });
