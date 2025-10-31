# Anonymous Cultural Crowdfunding Platform

A privacy-preserving crowdfunding platform for cultural projects built on Fully Homomorphic Encryption (FHE) technology. This decentralized application enables anonymous fundraising for cultural initiatives while protecting contributor privacy through encrypted on-chain contributions.

## 🌐 Live Demo

**Live Application**: https://fhe-cultural-crowdfunding.vercel.app/

**Demo Video**: Download and view `demo.mp4` file in this repository for a complete walkthrough

**GitHub Repository**: https://github.com/your-username/fhevm-react-template

## 📖 Overview

The Anonymous Cultural Crowdfunding Platform revolutionizes cultural project funding by leveraging Zama's FHE smart contracts. Contributors can support cultural projects with complete privacy - all contribution amounts remain encrypted on-chain, ensuring donor anonymity while maintaining transparent project operations.

## 🏗️ Project Architecture

This repository contains a complete full-stack privacy-preserving crowdfunding solution:

### Backend (Smart Contracts)
- **FHE Smart Contract**: `AnonymousCulturalCrowdfunding.sol` deployed on Sepolia
- **Encrypted State Management**: All contribution amounts stored as encrypted euint64
- **Privacy-Preserving Logic**: Funding calculations performed on encrypted data
- **Access Control**: Role-based permissions for contract management

### Frontend (React Application)
- **Location**: `cultural-crowdfunding/` directory
- **Framework**: Next.js 14 with App Router and React 18
- **SDK Integration**: `@fhevm-toolkit/sdk` for FHE operations
- **Live Demos**:
  - https://fhe-cultural-crowdfunding.vercel.app/
  - https://anonymous-cultural-crowdfunding.vercel.app/

### Development Workflow
```
┌─────────────────────────────────────────┐
│  Frontend (Next.js + React)             │
│  - FhevmProvider integration            │
│  - React hooks for FHE operations       │
│  - Wallet connection & UI               │
└──────────────┬──────────────────────────┘
               │
               │ @fhevm-toolkit/sdk
               │
┌──────────────▼──────────────────────────┐
│  Smart Contract (Solidity)              │
│  - FHE encrypted contributions          │
│  - Privacy-preserving calculations      │
│  - Automated fund management            │
└─────────────────────────────────────────┘
```

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

**Smart Contract Features:**
- ✅ Anonymous contribution amounts via FHE encryption
- ✅ Multiple project category support (10+ cultural categories)
- ✅ Flexible funding periods (7-90 days)
- ✅ On-chain metadata storage (IPFS integration ready)
- ✅ Access control with role-based permissions
- ✅ Emergency pause mechanism
- ✅ Gas-optimized operations
- ✅ Automatic refund mechanism for unsuccessful projects
- ✅ Privacy-preserving funding calculations

**Frontend Features:**
- ✅ Seamless wallet integration (MetaMask, WalletConnect)
- ✅ One-click FHE initialization with `@fhevm-toolkit/sdk`
- ✅ Interactive project creation wizard
- ✅ Real-time project browsing and filtering
- ✅ Anonymous encrypted contribution interface
- ✅ Responsive mobile-first design
- ✅ TypeScript type safety throughout
- ✅ Optimistic UI updates for better UX
- ✅ Comprehensive error handling and validation

## 🛠 Technology Stack

### Smart Contracts Layer
- **Solidity 0.8.24**: Core contract programming language
- **Zama FHEVM Libraries**: Fully Homomorphic Encryption implementation
  - `TFHE.sol`: FHE type library for encrypted computations
  - Access control for encrypted data
  - Privacy-preserving arithmetic operations
- **Hardhat Development Framework**: Contract compilation, testing, and deployment
- **OpenZeppelin Contracts**: Security-audited contract standards
  - `Ownable2Step`: Safe ownership transfer
  - `Pausable`: Emergency circuit breaker
  - `ReentrancyGuard`: Protection against reentrancy attacks

### Frontend Integration (cultural-crowdfunding)
- **Next.js 14**: React framework with App Router
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling framework
- **Ethers.js v6**: Ethereum blockchain interaction
- **fhevmjs**: Client-side FHE encryption library
- **@fhevm-toolkit/sdk**: Universal FHEVM SDK with React hooks

### Development Tools
- **Hardhat Task Runner**: Automated contract tasks
- **Ethers.js v6**: Blockchain interaction and provider management
- **Gas Reporter**: Transaction cost analysis
- **Contract Size Analyzer**: Deployment size optimization
- **Solhint**: Solidity linting for best practices
- **ESLint**: JavaScript/TypeScript code quality
- **Husky**: Git pre-commit hooks
- **Prettier**: Code formatting

### Deployment & Infrastructure
- **Ethereum Sepolia Testnet**: Development blockchain network
- **Etherscan Verification**: Contract source code verification
- **Automated Deployment Scripts**: Hardhat deployment automation
- **Vercel**: Frontend hosting and CDN
- **IPFS Integration**: Decentralized metadata storage (ready)

## 📦 Installation

### Smart Contract Development

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

### Frontend Application Setup

```bash
# Navigate to frontend directory
cd cultural-crowdfunding

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with:
# - NEXT_PUBLIC_GATEWAY_URL
# - NEXT_PUBLIC_ACL_ADDRESS
# - NEXT_PUBLIC_KMS_ADDRESS
# - NEXT_PUBLIC_RPC_URL

# Run development server
npm run dev
```

Access the application at `http://localhost:3000`

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

## 🌐 Frontend Application

The cultural-crowdfunding platform includes a complete Next.js 14 frontend application located in `cultural-crowdfunding/`:

### Features
- **FHE SDK Integration**: Uses `@fhevm-toolkit/sdk` for seamless FHE operations
- **React Hooks Architecture**: Custom hooks (`useFhevmClient`, `useEncrypt`, `useDecrypt`)
- **Wallet Integration**: MetaMask and Web3 wallet connection
- **Real-time Updates**: Live project status and contribution tracking
- **Responsive Design**: Mobile-first Tailwind CSS implementation
- **Type-Safe**: Full TypeScript support with strict mode

### Components
- `ConnectWallet.tsx`: Web3 wallet connection component
- `ProjectList.tsx`: Display and browse cultural projects
- `CreateProject.tsx`: Project creation interface with FHE integration
- `ContributeForm.tsx`: Anonymous contribution with encrypted amounts

### Running the Frontend
```bash
cd cultural-crowdfunding
npm install
npm run dev
```

Visit `http://localhost:3000` to access the application.

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide with contract addresses
- [SECURITY.md](./SECURITY.md) - Security audit and best practices
- [cultural-crowdfunding/README.md](./cultural-crowdfunding/README.md) - Frontend application guide
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

### Live Deployments
- **Frontend Application**: https://fhe-cultural-crowdfunding.vercel.app/
- **Alternative Demo**: https://anonymous-cultural-crowdfunding.vercel.app/

### Contract & Repository
- **Smart Contract Address**: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`
- **Etherscan (Sepolia)**: https://sepolia.etherscan.io/address/0x659b4d354550ADCf46cf1392148DE42C16E8E8Da
- **GitHub Repository**: https://github.com/your-username/fhevm-react-template

### Documentation
- **Zama Documentation**: https://docs.zama.ai/
- **FHEVM GitHub**: https://github.com/zama-ai/fhevm
- **Project Documentation**: See `/cultural-crowdfunding` directory

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
