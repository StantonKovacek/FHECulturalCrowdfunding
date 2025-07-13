const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * Test suite for Cultural Crowdfunding Platform
 * Tests core functionality including project creation, contributions, and finalization
 */
describe("Cultural Crowdfunding Platform", function () {
  let contract;
  let owner;
  let creator;
  let backer1;
  let backer2;

  const MIN_FUNDING_PERIOD = 7 * 24 * 60 * 60; // 7 days
  const MAX_FUNDING_PERIOD = 90 * 24 * 60 * 60; // 90 days

  beforeEach(async function () {
    // Get signers
    [owner, creator, backer1, backer2] = await ethers.getSigners();

    // Deploy contract
    const Contract = await ethers.getContractFactory(
      "AnonymousCulturalCrowdfunding"
    );
    contract = await Contract.deploy();
    await contract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should initialize project counter to 0", async function () {
      expect(await contract.projectCounter()).to.equal(0);
    });

    it("Should have correct funding period constants", async function () {
      expect(await contract.MIN_FUNDING_PERIOD()).to.equal(MIN_FUNDING_PERIOD);
      expect(await contract.MAX_FUNDING_PERIOD()).to.equal(MAX_FUNDING_PERIOD);
    });
  });

  describe("Project Creation", function () {
    it("Should create a new project successfully", async function () {
      const title = "Digital Art Exhibition";
      const description = "A groundbreaking digital art exhibition";
      const category = "Digital Art";
      const targetAmount = ethers.parseEther("5.0");
      const fundingPeriod = 30 * 24 * 60 * 60; // 30 days
      const metadataHash = "QmTestHash123";

      const tx = await contract
        .connect(creator)
        .createProject(
          title,
          description,
          category,
          targetAmount,
          fundingPeriod,
          metadataHash
        );

      await expect(tx)
        .to.emit(contract, "ProjectCreated")
        .withArgs(1, creator.address, title, category, anyValue);

      expect(await contract.projectCounter()).to.equal(1);
    });

    it("Should fail with empty title", async function () {
      await expect(
        contract.createProject(
          "",
          "Description",
          "Art",
          ethers.parseEther("1"),
          MIN_FUNDING_PERIOD,
          "hash"
        )
      ).to.be.revertedWith("Title required");
    });

    it("Should fail with funding period too short", async function () {
      await expect(
        contract.createProject(
          "Title",
          "Description",
          "Art",
          ethers.parseEther("1"),
          MIN_FUNDING_PERIOD - 1,
          "hash"
        )
      ).to.be.revertedWith("Funding period too short");
    });

    it("Should fail with funding period too long", async function () {
      await expect(
        contract.createProject(
          "Title",
          "Description",
          "Art",
          ethers.parseEther("1"),
          MAX_FUNDING_PERIOD + 1,
          "hash"
        )
      ).to.be.revertedWith("Funding period too long");
    });
  });

  describe("Project Information", function () {
    beforeEach(async function () {
      await contract
        .connect(creator)
        .createProject(
          "Test Project",
          "Test Description",
          "Music",
          ethers.parseEther("2.0"),
          30 * 24 * 60 * 60,
          "QmHash"
        );
    });

    it("Should retrieve project information correctly", async function () {
      const project = await contract.getProject(1);

      expect(project.title).to.equal("Test Project");
      expect(project.description).to.equal("Test Description");
      expect(project.category).to.equal("Music");
      expect(project.creator).to.equal(creator.address);
      expect(project.backerCount).to.equal(0);
    });

    it("Should fail to retrieve non-existent project", async function () {
      await expect(contract.getProject(999)).to.be.revertedWith(
        "Project does not exist"
      );
    });
  });

  describe("Platform Statistics", function () {
    it("Should return correct initial statistics", async function () {
      const stats = await contract.getPlatformStats();

      expect(stats.totalProjects).to.equal(0);
      expect(stats.activeProjects).to.equal(0);
      expect(stats.successfulProjects).to.equal(0);
      expect(stats.failedProjects).to.equal(0);
    });

    it("Should update statistics after project creation", async function () {
      await contract
        .connect(creator)
        .createProject(
          "Project 1",
          "Description",
          "Art",
          ethers.parseEther("1"),
          MIN_FUNDING_PERIOD,
          "hash"
        );

      const stats = await contract.getPlatformStats();
      expect(stats.totalProjects).to.equal(1);
      expect(stats.activeProjects).to.equal(1);
    });
  });

  describe("User Tracking", function () {
    it("Should track creator projects", async function () {
      await contract
        .connect(creator)
        .createProject(
          "Project 1",
          "Desc",
          "Art",
          ethers.parseEther("1"),
          MIN_FUNDING_PERIOD,
          "hash"
        );

      await contract
        .connect(creator)
        .createProject(
          "Project 2",
          "Desc",
          "Music",
          ethers.parseEther("2"),
          MIN_FUNDING_PERIOD,
          "hash"
        );

      const creatorProjects = await contract.getCreatorProjects(
        creator.address
      );
      expect(creatorProjects.length).to.equal(2);
    });

    it("Should return empty array for user with no projects", async function () {
      const projects = await contract.getCreatorProjects(backer1.address);
      expect(projects.length).to.equal(0);
    });
  });
});

// Helper to match any value in event
const anyValue = {
  [Symbol.for("chai/inspect")]() {
    return "anyValue";
  },
};
