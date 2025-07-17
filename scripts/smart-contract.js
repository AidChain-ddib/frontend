const {
  Client,
  PrivateKey,
  AccountId,
  ContractCreateFlow,
  ContractExecuteTransaction,
  ContractCallQuery,
  Hbar,
} = require("@hashgraph/sdk")

const contractSolidity = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AidChainProject {
    struct Milestone {
        string title;
        string description;
        uint256 amount;
        uint256 deadline;
        bool completed;
        bool verified;
        uint256 verifierCount;
        mapping(address => bool) verifiers;
        mapping(address => bool) hasVoted;
        uint256 approvalCount;
    }
    
    struct Project {
        string title;
        string description;
        address creator;
        uint256 fundingGoal;
        uint256 totalRaised;
        uint256 milestoneCount;
        bool active;
        mapping(uint256 => Milestone) milestones;
        mapping(address => uint256) donations;
    }
    
    mapping(uint256 => Project) public projects;
    mapping(address => uint256) public verifierStakes;
    mapping(address => uint256) public verifierReputations;
    
    uint256 public projectCounter;
    uint256 public constant MIN_VERIFIER_STAKE = 100 * 10**8; // 100 HBAR in tinybars
    uint256 public constant VERIFICATION_THRESHOLD = 67; // 67% consensus required
    
    event ProjectCreated(uint256 indexed projectId, address indexed creator, string title);
    event DonationReceived(uint256 indexed projectId, address indexed donor, uint256 amount);
    event MilestoneCompleted(uint256 indexed projectId, uint256 indexed milestoneId);
    event MilestoneVerified(uint256 indexed projectId, uint256 indexed milestoneId);
    event FundsReleased(uint256 indexed projectId, uint256 indexed milestoneId, uint256 amount);
    event VerifierStaked(address indexed verifier, uint256 amount);
    
    modifier onlyProjectCreator(uint256 projectId) {
        require(projects[projectId].creator == msg.sender, "Only project creator can call this");
        _;
    }
    
    modifier onlyVerifier() {
        require(verifierStakes[msg.sender] >= MIN_VERIFIER_STAKE, "Insufficient stake to verify");
        _;
    }
    
    function createProject(
        string memory title,
        string memory description,
        uint256 fundingGoal,
        string[] memory milestoneTitles,
        string[] memory milestoneDescriptions,
        uint256[] memory milestoneAmounts,
        uint256[] memory milestoneDeadlines
    ) external {
        require(milestoneTitles.length == milestoneDescriptions.length, "Milestone arrays length mismatch");
        require(milestoneTitles.length == milestoneAmounts.length, "Milestone arrays length mismatch");
        require(milestoneTitles.length == milestoneDeadlines.length, "Milestone arrays length mismatch");
        
        uint256 projectId = projectCounter++;
        Project storage project = projects[projectId];
        
        project.title = title;
        project.description = description;
        project.creator = msg.sender;
        project.fundingGoal = fundingGoal;
        project.totalRaised = 0;
        project.milestoneCount = milestoneTitles.length;
        project.active = true;
        
        for (uint256 i = 0; i < milestoneTitles.length; i++) {
            Milestone storage milestone = project.milestones[i];
            milestone.title = milestoneTitles[i];
            milestone.description = milestoneDescriptions[i];
            milestone.amount = milestoneAmounts[i];
            milestone.deadline = milestoneDeadlines[i];
            milestone.completed = false;
            milestone.verified = false;
            milestone.verifierCount = 0;
            milestone.approvalCount = 0;
        }
        
        emit ProjectCreated(projectId, msg.sender, title);
    }
    
    function donateToProject(uint256 projectId) external payable {
        require(projects[projectId].active, "Project is not active");
        require(msg.value > 0, "Donation must be greater than 0");
        
        Project storage project = projects[projectId];
        project.totalRaised += msg.value;
        project.donations[msg.sender] += msg.value;
        
        emit DonationReceived(projectId, msg.sender, msg.value);
    }
    
    function stakeAsVerifier() external payable {
        require(msg.value >= MIN_VERIFIER_STAKE, "Insufficient stake amount");
        
        verifierStakes[msg.sender] += msg.value;
        if (verifierReputations[msg.sender] == 0) {
            verifierReputations[msg.sender] = 100; // Initial reputation score
        }
        
        emit VerifierStaked(msg.sender, msg.value);
    }
    
    function submitMilestoneCompletion(uint256 projectId, uint256 milestoneId) 
        external 
        onlyProjectCreator(projectId) 
    {
        Project storage project = projects[projectId];
        require(milestoneId < project.milestoneCount, "Invalid milestone ID");
        
        Milestone storage milestone = project.milestones[milestoneId];
        require(!milestone.completed, "Milestone already completed");
        require(block.timestamp <= milestone.deadline, "Milestone deadline passed");
        
        milestone.completed = true;
        
        emit MilestoneCompleted(projectId, milestoneId);
    }
    
    function verifyMilestone(uint256 projectId, uint256 milestoneId, bool approve) 
        external 
        onlyVerifier 
    {
        Project storage project = projects[projectId];
        require(milestoneId < project.milestoneCount, "Invalid milestone ID");
        
        Milestone storage milestone = project.milestones[milestoneId];
        require(milestone.completed, "Milestone not completed yet");
        require(!milestone.verified, "Milestone already verified");
        require(!milestone.hasVoted[msg.sender], "Already voted on this milestone");
        
        milestone.hasVoted[msg.sender] = true;
        milestone.verifiers[msg.sender] = approve;
        milestone.verifierCount++;
        
        if (approve) {
            milestone.approvalCount++;
        }
        
        // Check if verification threshold is reached
        if (milestone.verifierCount >= 3) { // Minimum 3 verifiers
            uint256 approvalPercentage = (milestone.approvalCount * 100) / milestone.verifierCount;
            
            if (approvalPercentage >= VERIFICATION_THRESHOLD) {
                milestone.verified = true;
                
                // Release funds to project creator
                payable(project.creator).transfer(milestone.amount);
                
                emit MilestoneVerified(projectId, milestoneId);
                emit FundsReleased(projectId, milestoneId, milestone.amount);
                
                // Reward verifiers who voted correctly
                _rewardVerifiers(projectId, milestoneId, true);
            }
        }
    }
    
    function _rewardVerifiers(uint256 projectId, uint256 milestoneId, bool consensus) private {
        Project storage project = projects[projectId];
        Milestone storage milestone = project.milestones[milestoneId];
        
        uint256 rewardPerVerifier = milestone.amount / 100; // 1% of milestone amount as reward
        
        // Reward verifiers who voted with the consensus
        for (uint256 i = 0; i < milestone.verifierCount; i++) {
            // This is a simplified reward mechanism
            // In practice, you'd need to iterate through verifier addresses
        }
    }
    
    function getProjectDetails(uint256 projectId) 
        external 
        view 
        returns (
            string memory title,
            string memory description,
            address creator,
            uint256 fundingGoal,
            uint256 totalRaised,
            uint256 milestoneCount,
            bool active
        ) 
    {
        Project storage project = projects[projectId];
        return (
            project.title,
            project.description,
            project.creator,
            project.fundingGoal,
            project.totalRaised,
            project.milestoneCount,
            project.active
        );
    }
    
    function getMilestoneDetails(uint256 projectId, uint256 milestoneId)
        external
        view
        returns (
            string memory title,
            string memory description,
            uint256 amount,
            uint256 deadline,
            bool completed,
            bool verified,
            uint256 verifierCount,
            uint256 approvalCount
        )
    {
        Project storage project = projects[projectId];
        require(milestoneId < project.milestoneCount, "Invalid milestone ID");
        
        Milestone storage milestone = project.milestones[milestoneId];
        return (
            milestone.title,
            milestone.description,
            milestone.amount,
            milestone.deadline,
            milestone.completed,
            milestone.verified,
            milestone.verifierCount,
            milestone.approvalCount
        );
    }
    
    function refundDonors(uint256 projectId) external onlyProjectCreator(projectId) {
        Project storage project = projects[projectId];
        require(project.active, "Project already inactive");
        
        project.active = false;
        
        // In a real implementation, you'd need to track all donors
        // and refund them proportionally based on completed milestones
    }
}
`

async function deployContract() {
  const client = Client.forTestnet()

  // Set operator account (you'll need to replace with actual credentials)
  const operatorId = AccountId.fromString("0.0.123456")
  const operatorKey = PrivateKey.fromString("your-private-key-here")
  client.setOperator(operatorId, operatorKey)

  try {
    const contractCreate = new ContractCreateFlow().setGas(100000).setBytecode(contractSolidity)

    const contractCreateSubmit = await contractCreate.execute(client)
    const contractCreateRx = await contractCreateSubmit.getReceipt(client)
    const contractId = contractCreateRx.contractId

    console.log("Contract deployed successfully!")
    console.log("Contract ID:", contractId.toString())

    return contractId
  } catch (error) {
    console.error("Contract deployment failed:", error)
  }
}

async function createProject(contractId, projectData) {
  const client = Client.forTestnet()

  try {
    const contractExecTx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(100000)
      .setFunction("createProject", [
        projectData.title,
        projectData.description,
        projectData.fundingGoal,
        projectData.milestoneTitles,
        projectData.milestoneDescriptions,
        projectData.milestoneAmounts,
        projectData.milestoneDeadlines,
      ])

    const contractExecSubmit = await contractExecTx.execute(client)
    const contractExecRx = await contractExecSubmit.getReceipt(client)

    console.log("Project created successfully!")
    return contractExecRx
  } catch (error) {
    console.error("Project creation failed:", error)
  }
}

module.exports = {
  deployContract,
  createProject,
  contractSolidity,
}
