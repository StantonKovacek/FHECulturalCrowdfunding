// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint64, euint32, ebool } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

contract AnonymousCulturalCrowdfunding is SepoliaConfig {

    address public owner;
    uint32 public projectCounter;
    uint256 public constant MIN_FUNDING_PERIOD = 7 days;
    uint256 public constant MAX_FUNDING_PERIOD = 90 days;

    enum ProjectStatus {
        Active,
        Successful,
        Failed,
        Withdrawn
    }

    struct CulturalProject {
        string title;
        string description;
        string category; // Art, Music, Literature, Film, etc.
        address creator;
        euint64 targetAmount; // Encrypted target amount
        euint64 currentAmount; // Encrypted current raised amount
        uint256 deadline;
        ProjectStatus status;
        bool fundsWithdrawn;
        uint256 createdAt;
        uint32 backerCount;
        string metadataHash; // IPFS hash for additional project data
    }

    struct AnonymousContribution {
        euint64 amount; // Encrypted contribution amount
        uint256 timestamp;
        bool refunded;
        string supportMessage; // Optional encrypted support message
    }

    // Mappings
    mapping(uint32 => CulturalProject) public projects;
    mapping(uint32 => mapping(address => AnonymousContribution)) public contributions;
    mapping(uint32 => address[]) public projectBackers;
    mapping(address => uint32[]) public creatorProjects;
    mapping(address => uint32[]) public backerProjects;

    // Events
    event ProjectCreated(
        uint32 indexed projectId,
        address indexed creator,
        string title,
        string category,
        uint256 deadline
    );

    event AnonymousContributionMade(
        uint32 indexed projectId,
        address indexed backer,
        uint256 timestamp
    );

    event ProjectFunded(
        uint32 indexed projectId,
        address indexed creator
    );

    event ProjectFailed(
        uint32 indexed projectId
    );

    event RefundProcessed(
        uint32 indexed projectId,
        address indexed backer
    );

    event FundsWithdrawn(
        uint32 indexed projectId,
        address indexed creator
    );

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier projectExists(uint32 _projectId) {
        require(_projectId > 0 && _projectId <= projectCounter, "Project does not exist");
        _;
    }

    modifier onlyCreator(uint32 _projectId) {
        require(projects[_projectId].creator == msg.sender, "Not project creator");
        _;
    }

    modifier projectActive(uint32 _projectId) {
        require(projects[_projectId].status == ProjectStatus.Active, "Project not active");
        require(block.timestamp < projects[_projectId].deadline, "Project deadline passed");
        _;
    }

    constructor() {
        owner = msg.sender;
        projectCounter = 0;
    }

    // Create a new cultural project
    function createProject(
        string calldata _title,
        string calldata _description,
        string calldata _category,
        uint64 _targetAmount,
        uint256 _fundingPeriod,
        string calldata _metadataHash
    ) external returns (uint32 projectId) {
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_description).length > 0, "Description required");
        require(bytes(_category).length > 0, "Category required");
        require(_fundingPeriod >= MIN_FUNDING_PERIOD, "Funding period too short");
        require(_fundingPeriod <= MAX_FUNDING_PERIOD, "Funding period too long");
        require(_targetAmount > 0, "Target amount must be greater than 0");

        // Encrypt target amount
        euint64 targetAmount = FHE.asEuint64(_targetAmount);

        projectCounter++;
        projectId = projectCounter;

        projects[projectId] = CulturalProject({
            title: _title,
            description: _description,
            category: _category,
            creator: msg.sender,
            targetAmount: targetAmount,
            currentAmount: FHE.asEuint64(0),
            deadline: block.timestamp + _fundingPeriod,
            status: ProjectStatus.Active,
            fundsWithdrawn: false,
            createdAt: block.timestamp,
            backerCount: 0,
            metadataHash: _metadataHash
        });

        creatorProjects[msg.sender].push(projectId);

        // Set FHE permissions
        FHE.allowThis(targetAmount);
        FHE.allowThis(projects[projectId].currentAmount);
        FHE.allow(targetAmount, msg.sender);

        emit ProjectCreated(
            projectId,
            msg.sender,
            _title,
            _category,
            projects[projectId].deadline
        );

        return projectId;
    }

    // Make an anonymous contribution to a project
    function contributeAnonymously(
        uint32 _projectId,
        string calldata _supportMessage
    ) external payable projectExists(_projectId) projectActive(_projectId) {
        require(msg.value > 0, "Contribution must be greater than 0");

        // Encrypt contribution amount using msg.value
        euint64 encryptedAmount = FHE.asEuint64(uint64(msg.value));

        CulturalProject storage project = projects[_projectId];

        // Check if this is a first-time backer
        if (contributions[_projectId][msg.sender].timestamp == 0) {
            project.backerCount++;
            projectBackers[_projectId].push(msg.sender);
            backerProjects[msg.sender].push(_projectId);
        }

        // Record anonymous contribution
        contributions[_projectId][msg.sender] = AnonymousContribution({
            amount: encryptedAmount,
            timestamp: block.timestamp,
            refunded: false,
            supportMessage: _supportMessage
        });

        // Update project's current amount (encrypted)
        euint64 newCurrentAmount = FHE.add(project.currentAmount, encryptedAmount);
        project.currentAmount = newCurrentAmount;

        // Set FHE permissions
        FHE.allowThis(encryptedAmount);
        FHE.allowThis(newCurrentAmount);
        FHE.allow(encryptedAmount, msg.sender);
        FHE.allow(newCurrentAmount, project.creator);

        emit AnonymousContributionMade(_projectId, msg.sender, block.timestamp);

        // Check if project reached its goal (this would need FHE comparison in practice)
        _checkProjectGoal(_projectId);
    }

    // Internal function to check if project reached its goal
    function _checkProjectGoal(uint32 _projectId) internal {
        CulturalProject storage project = projects[_projectId];

        // In a real FHE implementation, this would use encrypted comparison
        // For now, we'll use a simplified approach
        bytes32[] memory cts = new bytes32[](2);
        cts[0] = FHE.toBytes32(project.currentAmount);
        cts[1] = FHE.toBytes32(project.targetAmount);
        FHE.requestDecryption(cts, this.processGoalCheck.selector);
    }

    // Callback function to process goal achievement check
    function processGoalCheck(
        uint256 requestId,
        uint64 currentAmount,
        uint64 targetAmount
    ) external {
        require(requestId > 0, "Invalid request ID");

        // Find which project this belongs to (simplified lookup)
        for (uint32 i = 1; i <= projectCounter; i++) {
            if (projects[i].status == ProjectStatus.Active) {
                if (currentAmount >= targetAmount) {
                    projects[i].status = ProjectStatus.Successful;
                    emit ProjectFunded(i, projects[i].creator);
                    break;
                }
            }
        }
    }

    // Finalize project when deadline is reached
    function finalizeProject(uint32 _projectId) external projectExists(_projectId) {
        CulturalProject storage project = projects[_projectId];
        require(block.timestamp >= project.deadline, "Project deadline not reached");
        require(project.status == ProjectStatus.Active, "Project already finalized");

        // Request decryption to check if goal was met
        bytes32[] memory cts = new bytes32[](2);
        cts[0] = FHE.toBytes32(project.currentAmount);
        cts[1] = FHE.toBytes32(project.targetAmount);
        FHE.requestDecryption(cts, this.processFinalization.selector);
    }

    // Process project finalization
    function processFinalization(
        uint256 requestId,
        uint64 currentAmount,
        uint64 targetAmount
    ) external {
        require(requestId > 0, "Invalid request ID");

        // Find the project to finalize (simplified)
        for (uint32 i = 1; i <= projectCounter; i++) {
            CulturalProject storage project = projects[i];
            if (project.status == ProjectStatus.Active &&
                block.timestamp >= project.deadline) {

                if (currentAmount >= targetAmount) {
                    project.status = ProjectStatus.Successful;
                    emit ProjectFunded(i, project.creator);
                } else {
                    project.status = ProjectStatus.Failed;
                    emit ProjectFailed(i);
                }
                break;
            }
        }
    }

    // Withdraw funds for successful project
    function withdrawFunds(uint32 _projectId)
        external
        projectExists(_projectId)
        onlyCreator(_projectId)
    {
        CulturalProject storage project = projects[_projectId];
        require(project.status == ProjectStatus.Successful, "Project not successful");
        require(!project.fundsWithdrawn, "Funds already withdrawn");

        project.fundsWithdrawn = true;
        project.status = ProjectStatus.Withdrawn;

        // Transfer funds to creator
        uint256 amount = address(this).balance; // Simplified for demo
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(_projectId, msg.sender);
    }

    // Request refund for failed project
    function requestRefund(uint32 _projectId) external projectExists(_projectId) {
        CulturalProject storage project = projects[_projectId];
        require(project.status == ProjectStatus.Failed, "Project not failed");

        AnonymousContribution storage contribution = contributions[_projectId][msg.sender];
        require(contribution.timestamp > 0, "No contribution found");
        require(!contribution.refunded, "Already refunded");

        contribution.refunded = true;

        // In practice, would decrypt the contribution amount for refund
        // For demo, using simplified refund logic
        bytes32[] memory cts = new bytes32[](1);
        cts[0] = FHE.toBytes32(contribution.amount);
        FHE.requestDecryption(cts, this.processRefund.selector);

        emit RefundProcessed(_projectId, msg.sender);
    }

    // Process refund callback
    function processRefund(
        uint256 requestId,
        uint64 refundAmount
    ) external {
        require(requestId > 0, "Invalid request ID");

        // Transfer refund (simplified)
        (bool success, ) = payable(msg.sender).call{value: refundAmount}("");
        require(success, "Refund failed");
    }

    // Get project information (public data only)
    function getProject(uint32 _projectId) external view projectExists(_projectId) returns (
        string memory title,
        string memory description,
        string memory category,
        address creator,
        uint256 deadline,
        ProjectStatus status,
        uint256 createdAt,
        uint32 backerCount,
        string memory metadataHash
    ) {
        CulturalProject storage project = projects[_projectId];
        return (
            project.title,
            project.description,
            project.category,
            project.creator,
            project.deadline,
            project.status,
            project.createdAt,
            project.backerCount,
            project.metadataHash
        );
    }

    // Get encrypted project amounts (only for authorized users)
    function getProjectAmounts(uint32 _projectId) external view projectExists(_projectId) returns (
        bytes32 encryptedTarget,
        bytes32 encryptedCurrent
    ) {
        CulturalProject storage project = projects[_projectId];
        require(
            msg.sender == project.creator ||
            contributions[_projectId][msg.sender].timestamp > 0,
            "Not authorized to view amounts"
        );

        return (
            FHE.toBytes32(project.targetAmount),
            FHE.toBytes32(project.currentAmount)
        );
    }

    // Get user's projects as creator
    function getCreatorProjects(address _creator) external view returns (uint32[] memory) {
        return creatorProjects[_creator];
    }

    // Get user's backed projects
    function getBackerProjects(address _backer) external view returns (uint32[] memory) {
        return backerProjects[_backer];
    }

    // Get contribution details (encrypted)
    function getContribution(uint32 _projectId, address _backer) external view returns (
        bytes32 encryptedAmount,
        uint256 timestamp,
        bool refunded,
        string memory supportMessage
    ) {
        require(
            msg.sender == _backer ||
            msg.sender == projects[_projectId].creator ||
            msg.sender == owner,
            "Not authorized"
        );

        AnonymousContribution storage contribution = contributions[_projectId][_backer];
        return (
            FHE.toBytes32(contribution.amount),
            contribution.timestamp,
            contribution.refunded,
            contribution.supportMessage
        );
    }

    // Emergency functions for owner
    function emergencyPause(uint32 _projectId) external onlyOwner projectExists(_projectId) {
        projects[_projectId].status = ProjectStatus.Failed;
    }

    // Get platform statistics
    function getPlatformStats() external view returns (
        uint32 totalProjects,
        uint32 activeProjects,
        uint32 successfulProjects,
        uint32 failedProjects
    ) {
        uint32 active = 0;
        uint32 successful = 0;
        uint32 failed = 0;

        for (uint32 i = 1; i <= projectCounter; i++) {
            ProjectStatus status = projects[i].status;
            if (status == ProjectStatus.Active) active++;
            else if (status == ProjectStatus.Successful || status == ProjectStatus.Withdrawn) successful++;
            else if (status == ProjectStatus.Failed) failed++;
        }

        return (projectCounter, active, successful, failed);
    }
}