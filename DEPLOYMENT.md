# Cultural Crowdfunding Platform - Deployment Guide

## Overview

This document provides comprehensive instructions for deploying, verifying, and interacting with the Cultural Crowdfunding Platform smart contract using Hardhat.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contract Verification](#contract-verification)
- [Interaction](#interaction)
- [Simulation Testing](#simulation-testing)
- [Network Information](#network-information)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying the contract, ensure you have the following:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Wallet**: MetaMask or similar Web3 wallet
- **Testnet ETH**: Sepolia testnet ETH for deployment (get from [Sepolia Faucet](https://sepoliafaucet.com/))
- **Etherscan API Key**: For contract verification ([Get API Key](https://etherscan.io/myapikey))
- **Alchemy/Infura Account**: For RPC endpoint access

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd cultural-crowdfunding-platform
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Hardhat development framework
- Ethers.js library
- FHE (Fully Homomorphic Encryption) libraries
- OpenZeppelin contracts
- Hardhat plugins

## Configuration

### Step 1: Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit the `.env` file with your credentials:

```env
# Private key for deployment (NEVER commit this file!)
PRIVATE_KEY=your_wallet_private_key_here

# RPC endpoints
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
ZAMA_RPC_URL=https://devnet.zama.ai

# Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Optional: Gas reporting
REPORT_GAS=true
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
```

### Step 3: Verify Configuration

Check your Hardhat configuration:

```bash
npx hardhat
```

You should see available Hardhat tasks listed.

## Deployment

### Compile Contracts

Before deployment, compile the smart contracts:

```bash
npm run compile
```

Expected output:
```
Compiling 1 file with 0.8.24
Compilation finished successfully
```

### Deploy to Sepolia Testnet

Deploy the contract to Sepolia testnet:

```bash
npm run deploy
```

**Sample Output:**

```
========================================
Cultural Crowdfunding Platform Deployment
========================================

Deploying to network: sepolia
Chain ID: 11155111

Deploying contracts with account: 0x1234...5678
Account balance: 1.5 ETH

----------------------------------------
Contract Deployment Starting...
----------------------------------------

⏳ Deploying contract...
✅ Contract deployed successfully!

========================================
Deployment Summary
========================================
Contract Name: AnonymousCulturalCrowdfunding
Contract Address: 0xABCD...EF01
Deployer Address: 0x1234...5678
Network: sepolia (Chain ID: 11155111)
Deployment Time: 15.32s
Block Number: 4567890
========================================

📁 Deployment info saved to: deployments/sepolia-deployment-1234567890.json

========================================
Next Steps
========================================
1. Verify contract on Etherscan:
   npm run verify

2. Interact with the contract:
   npm run interact

3. Run simulation tests:
   npm run simulate

4. View on Etherscan:
   https://sepolia.etherscan.io/address/0xABCD...EF01

========================================
```

### Deploy to Local Network

For local testing:

```bash
# Terminal 1: Start local node
npm run node

# Terminal 2: Deploy to local network
npm run deploy:local
```

## Contract Verification

After successful deployment, verify your contract on Etherscan:

```bash
npm run verify
```

**Sample Output:**

```
========================================
Contract Verification
========================================

Network: sepolia
Chain ID: 11155111

----------------------------------------
Deployment Information
----------------------------------------
Contract: AnonymousCulturalCrowdfunding
Address: 0xABCD...EF01
Deployer: 0x1234...5678
Deployed: 2025-01-15T10:30:00.000Z
Tx Hash: 0xabcdef...123456

----------------------------------------
Starting Verification...
----------------------------------------

⏳ Submitting contract for verification...

✅ Contract verified successfully!

========================================
Verification Complete
========================================
Contract Address: 0xABCD...EF01
Etherscan URL: https://sepolia.etherscan.io/address/0xABCD...EF01#code
========================================

📁 Deployment info updated with verification status
```

## Interaction

### Basic Contract Interaction

Use the interaction script to interact with the deployed contract:

```bash
npm run interact
```

This script demonstrates:
- Reading platform statistics
- Creating a sample project
- Making anonymous contributions
- Checking creator and backer projects

**Available Functions:**

```javascript
// Create a new project
await contract.createProject(
  title,
  description,
  category,
  targetAmount,
  fundingPeriod,
  metadataHash
);

// Contribute to a project
await contract.contributeAnonymously(projectId, supportMessage, {
  value: ethers.parseEther("1.0")
});

// Get platform statistics
await contract.getPlatformStats();

// Get project information
await contract.getProject(projectId);

// Finalize a project after deadline
await contract.finalizeProject(projectId);

// Withdraw funds (creator only)
await contract.withdrawFunds(projectId);

// Request refund (for failed projects)
await contract.requestRefund(projectId);
```

## Simulation Testing

Run comprehensive simulation tests:

```bash
npm run simulate
```

The simulation script tests:
1. **Successful Project Scenario**: Creating a project and reaching funding goal
2. **Multiple Projects**: Creating several projects with different parameters
3. **Platform Statistics**: Tracking overall platform metrics
4. **User Activity**: Testing creator and backer interactions

## Network Information

### Deployed Contract Information

**Network:** Sepolia Testnet
**Chain ID:** 11155111
**Contract Address:** `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`
**Etherscan Link:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x659b4d354550ADCf46cf1392148DE42C16E8E8Da)

### Network Details

| Network | Chain ID | RPC URL | Block Explorer |
|---------|----------|---------|----------------|
| Sepolia | 11155111 | https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY | https://sepolia.etherscan.io |
| Localhost | 31337 | http://127.0.0.1:8545 | N/A |
| Zama Testnet | 8009 | https://devnet.zama.ai | N/A |

## Contract Features

### For Project Creators

```javascript
// Create a cultural project
const tx = await contract.createProject(
  "Digital Art Exhibition 2025",
  "A groundbreaking digital art exhibition",
  "Digital Art",
  ethers.parseEther("5.0"), // 5 ETH target
  30 * 24 * 60 * 60, // 30 days
  "QmIPFSHash..."
);
```

### For Contributors

```javascript
// Make anonymous contribution
const tx = await contract.contributeAnonymously(
  1, // projectId
  "Supporting this amazing project!",
  { value: ethers.parseEther("0.5") }
);
```

### View Functions

```javascript
// Get all platform statistics
const stats = await contract.getPlatformStats();
console.log(`Total Projects: ${stats.totalProjects}`);
console.log(`Active Projects: ${stats.activeProjects}`);

// Get specific project details
const project = await contract.getProject(projectId);
console.log(`Title: ${project.title}`);
console.log(`Status: ${project.status}`);
console.log(`Backers: ${project.backerCount}`);

// Get user's created projects
const myProjects = await contract.getCreatorProjects(userAddress);

// Get user's backed projects
const backedProjects = await contract.getBackerProjects(userAddress);
```

## Deployment Artifacts

After deployment, the following files are created in the `deployments/` directory:

- `sepolia-latest.json` - Latest deployment information
- `sepolia-deployment-[timestamp].json` - Historical deployment records

**Example Deployment File:**

```json
{
  "contractName": "AnonymousCulturalCrowdfunding",
  "contractAddress": "0x659b4d354550ADCf46cf1392148DE42C16E8E8Da",
  "deployerAddress": "0x1234...5678",
  "network": "sepolia",
  "chainId": "11155111",
  "deploymentTime": "2025-01-15T10:30:00.000Z",
  "blockNumber": 4567890,
  "transactionHash": "0xabcdef...123456",
  "verified": true,
  "verifiedAt": "2025-01-15T10:35:00.000Z"
}
```

## Troubleshooting

### Common Issues

#### 1. Insufficient Funds

**Error:** `insufficient funds for intrinsic transaction cost`

**Solution:**
- Get testnet ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
- Check your wallet balance: `npx hardhat run scripts/check-balance.js`

#### 2. Invalid Private Key

**Error:** `invalid private key`

**Solution:**
- Verify your private key in `.env` file
- Ensure no spaces or quotes around the key
- Private key should be 64 characters (without 0x prefix)

#### 3. Network Connection Issues

**Error:** `network connection timeout`

**Solution:**
- Check your RPC URL in `.env`
- Try alternative RPC providers:
  - Alchemy: https://www.alchemy.com/
  - Infura: https://www.infura.io/
  - QuickNode: https://www.quicknode.com/

#### 4. Compilation Errors

**Error:** `Compilation failed`

**Solution:**
```bash
# Clean build artifacts
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try compilation again
npm run compile
```

#### 5. Verification Failed

**Error:** `Verification failed: Contract source code already verified`

**Solution:** The contract is already verified. View it on Etherscan using the contract address.

#### 6. Gas Estimation Failed

**Error:** `cannot estimate gas`

**Solution:**
- Check if the function call parameters are correct
- Ensure the contract state allows the transaction
- Try manually setting gas limit:
  ```javascript
  await contract.function({ gasLimit: 500000 })
  ```

### Debug Mode

Run scripts in debug mode for detailed logging:

```bash
# Enable Hardhat verbose logging
npx hardhat run scripts/deploy.js --network sepolia --verbose

# Check gas usage
REPORT_GAS=true npm run test
```

## Security Best Practices

### Private Key Management

- **NEVER** commit `.env` file to version control
- **NEVER** share your private key
- Use hardware wallets for mainnet deployments
- Consider using Hardhat's built-in account management

### Contract Security

- Audit smart contracts before mainnet deployment
- Test thoroughly on testnets
- Use OpenZeppelin's audited contracts
- Implement proper access controls
- Add reentrancy guards where necessary

## Additional Resources

### Documentation

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Zama FHE Documentation](https://docs.zama.ai/)

### Tools

- [Hardhat](https://hardhat.org/) - Development framework
- [Remix IDE](https://remix.ethereum.org/) - Online Solidity IDE
- [Tenderly](https://tenderly.co/) - Smart contract monitoring
- [Etherscan](https://etherscan.io/) - Blockchain explorer

### Community

- [Hardhat Discord](https://hardhat.org/discord)
- [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review [Hardhat documentation](https://hardhat.org/docs)
3. Open an issue on GitHub
4. Contact the development team

---

**Last Updated:** January 2025
**Version:** 1.0.0
**License:** MIT
