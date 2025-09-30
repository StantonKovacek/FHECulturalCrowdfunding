# Anonymous Cultural Crowdfunding Platform

A privacy-preserving crowdfunding platform for cultural projects built on Fully Homomorphic Encryption (FHE) technology. This decentralized application enables anonymous fundraising for cultural initiatives while protecting contributor privacy through encrypted on-chain contributions.

## 🌐 Live Demo

**Live Application**: https://anonymous-cultural-crowdfunding.vercel.app/

**Demo Video**: Download and view `demo.mp4` file in this repository for a complete walkthrough

**GitHub Repository**: https://github.com/StantonKovacek/FHECulturalCrowdfunding

## 📖 Overview

The Anonymous Cultural Crowdfunding Platform revolutionizes cultural project funding by leveraging Zama's FHE smart contracts. Contributors can support cultural projects with complete privacy - all contribution amounts remain encrypted on-chain, ensuring donor anonymity while maintaining transparent project operations.

## 🔐 Core Concepts

### FHE Contract - Anonymous Cultural Crowdfunding

**Privacy-Preserving Fundraising for Cultural Projects**

This platform implements FHE (Fully Homomorphic Encryption) technology to enable truly anonymous crowdfunding:

- **Encrypted Contributions**: All donation amounts are encrypted on-chain using FHE
- **Anonymous Donors**: Contributors remain completely anonymous - amounts are never revealed
- **Private Calculations**: Funding progress computed on encrypted values without decryption
- **Trustless Privacy**: No central authority or contract owner can view contribution amounts
- **Transparent Operations**: Project details and milestones remain public while preserving donor privacy

### How It Works

1. **Project Creation**: Creators submit cultural project proposals with funding goals
2. **Anonymous Contributions**: Donors contribute using FHE-encrypted amounts
3. **Private Aggregation**: Smart contract sums encrypted contributions without revealing individual amounts
4. **Milestone Tracking**: Project progress tracked while maintaining contributor privacy
5. **Fund Distribution**: Projects receive funds upon reaching goals, with full donor anonymity preserved

### Cultural Project Categories

Support diverse cultural initiatives across:
- Visual Arts, Music, Literature
- Film & Cinema, Theater & Performance
- Dance, Digital Art, Photography
- Traditional Crafts, Community Cultural Heritage

## 🚀 Smart Contract

**Network**: Sepolia Testnet
**Contract Address**: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`
**Etherscan**: [View Contract](https://sepolia.etherscan.io/address/0x659b4d354550ADCf46cf1392148DE42C16E8E8Da)

### Key Features

- ✅ Anonymous contribution amounts via FHE encryption
- ✅ Multiple project category support
- ✅ Flexible funding periods (7-90 days)
- ✅ On-chain metadata storage (IPFS integration ready)
- ✅ Access control with role-based permissions
- ✅ Emergency pause mechanism
- ✅ Gas-optimized operations

## 🛠 Technology Stack

**Smart Contracts:**
- Solidity 0.8.24
- Zama FHEVM libraries
- Hardhat development framework
- OpenZeppelin contracts

**Development Tools:**
- Hardhat task runner
- Ethers.js v6 for blockchain interaction
- Gas reporter and contract size analyzer
- Solhint and ESLint for code quality
- Husky for pre-commit hooks

**Deployment:**
- Ethereum Sepolia Testnet
- Etherscan verification
- Automated deployment scripts

## 📦 Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials:
# - SEPOLIA_RPC_URL
# - PRIVATE_KEY
# - ETHERSCAN_API_KEY
# - GATEWAY_URL (Zama Gateway)

# Compile contracts
npm run compile
```

## 🚀 Deployment

```bash
# Deploy to Sepolia testnet
npm run deploy

# Verify contract on Etherscan
npm run verify

# Interact with deployed contract
npm run interact

# Run simulations
npm run simulate
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions and configuration.

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide with contract addresses
- [SECURITY.md](./SECURITY.md) - Security audit and best practices
- [.env.example](./.env.example) - Environment configuration template

## 🎥 Demo Video

**File**: `demo.mp4` (included in repository)

The demo video demonstrates:
- Creating anonymous cultural crowdfunding projects
- Making encrypted contributions
- Viewing project status while preserving privacy
- Complete end-to-end user flow

**Note**: Please download the `demo.mp4` file to view the demonstration.

## 🔗 Links

**Live Application**: https://anonymous-cultural-crowdfunding.vercel.app/

**GitHub Repository**: https://github.com/StantonKovacek/FHECulturalCrowdfunding

**Etherscan Contract**: https://sepolia.etherscan.io/address/0x659b4d354550ADCf46cf1392148DE42C16E8E8Da

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - See [LICENSE](./LICENSE) for details

---

**Built with Zama FHEVM for privacy-preserving smart contracts**
