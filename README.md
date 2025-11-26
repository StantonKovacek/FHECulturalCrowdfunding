# Anonymous Cultural Crowdfunding Platform

A privacy-preserving crowdfunding platform for cultural projects built on Fully Homomorphic Encryption (FHE) technology with advanced Gateway callback architecture. This decentralized application enables anonymous fundraising for cultural initiatives while protecting contributor privacy through encrypted on-chain contributions, featuring automatic refund mechanisms and timeout protection.

## 🌐 Live Demo

**Live Application**: https://fhe-cultural-crowdfunding.vercel.app/

**Demo Video**: Download and view `demo.mp4` file in this repository for a complete walkthrough

**GitHub Repository**: Contact maintainer for repository access

## 📖 Overview

The Anonymous Cultural Crowdfunding Platform revolutionizes cultural project funding by leveraging Zama's FHE smart contracts with innovative Gateway callback mode. Contributors can support cultural projects with complete privacy - all contribution amounts remain encrypted on-chain, ensuring donor anonymity while maintaining transparent project operations.

### 🆕 Advanced Features (Latest Update)

This platform now implements cutting-edge FHE patterns:

1. **Gateway Callback Mode**: Asynchronous decryption handling through Gateway callbacks
2. **Refund Mechanisms**: Multi-layered refund system for decryption failures
3. **Timeout Protection**: Prevents permanent fund locking with automatic retry logic
4. **Privacy-Preserving Division**: Random multiplier obfuscation to prevent information leakage
5. **Price Obfuscation**: Enhanced privacy for target amounts using multiplicative masking
6. **Gas Optimization**: Efficient HCU (Homomorphic Compute Unit) usage patterns

## 🏗️ Innovative Architecture

This repository implements an advanced Gateway callback architecture for privacy-preserving crowdfunding:

### Backend (Smart Contracts)
- **FHE Smart Contract**: `AnonymousCulturalCrowdfunding.sol` deployed on Sepolia
- **Gateway Callback Mode**: Asynchronous decryption with automatic callback handling
- **Encrypted State Management**: All contribution amounts stored as encrypted euint64
- **Privacy-Preserving Logic**: Funding calculations performed on encrypted data
- **Timeout Protection**: Multi-retry mechanism with emergency fallback
- **Access Control**: Role-based permissions with comprehensive security auditing

### Frontend (React Application)
- **Location**: `cultural-crowdfunding/` directory
- **Framework**: Next.js 14 with App Router and React 18
- **SDK Integration**: `@fhevm-toolkit/sdk` for FHE operations
- **Live Demos**:
  - https://fhe-cultural-crowdfunding.vercel.app/
  - https://anonymous-cultural-crowdfunding.vercel.app/

### Gateway Callback Workflow
```
┌─────────────────────────────────────────┐
│  User Action (Frontend)                 │
│  - Submit encrypted contribution        │
│  - Request project finalization         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│  Smart Contract Records Request          │
│  - Store encrypted data                  │
│  - Generate requestId                    │
│  - Emit DecryptionRequested event        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│  Gateway Decryption Service              │
│  - Receives decryption request           │
│  - Performs secure decryption            │
│  - Generates proof                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│  Callback to Smart Contract              │
│  - Verify Gateway signatures             │
│  - Process decrypted values              │
│  - Complete transaction                  │
│  - Handle refunds if needed              │
└──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│  Timeout Protection (if callback fails)  │
│  - Automatic retry (up to 3 attempts)    │
│  - Emergency refund after extended time  │
│  - Prevents permanent fund locking       │
└──────────────────────────────────────────┘
```

## 🔐 Core Concepts & Advanced Features

### FHE Contract - Anonymous Cultural Crowdfunding with Gateway Callbacks

**Privacy-Preserving Fundraising with Production-Ready Architecture**

This platform implements advanced FHE (Fully Homomorphic Encryption) patterns:

#### Privacy Features
- **Encrypted Contributions**: All donation amounts encrypted on-chain using FHE
- **Anonymous Donors**: Contributors remain completely anonymous - amounts never revealed
- **Private Calculations**: Funding progress computed on encrypted values without decryption
- **Trustless Privacy**: No central authority or contract owner can view contribution amounts
- **Obfuscated Targets**: Random multipliers prevent division-based privacy leakage
- **Price Masking**: Multiplicative obfuscation protects sensitive financial information

#### Gateway Callback Mode
- **Async Processing**: User submits encrypted request → Contract records → Gateway decrypts → Callback completes
- **Signature Verification**: Gateway provides cryptographic proofs verified on-chain
- **Request Tracking**: Each decryption request has unique ID and status monitoring
- **Event-Driven**: Comprehensive event emission for frontend monitoring

#### Refund Mechanisms
1. **Normal Refund**: For failed projects with successful decryption
2. **Callback-Based Refund**: Gateway decrypts contribution amount for accurate refund
3. **Emergency Refund**: Proportional refund if decryption permanently fails
4. **Timeout Protection**: Automatic retry logic (up to 3 attempts)
5. **Permanent Safeguard**: Emergency mode after extended timeout period

#### How It Works

1. **Project Creation**:
   - Creator submits proposal with encrypted target amount
   - System generates random multiplier for privacy obfuscation
   - Target amount masked to prevent division analysis

2. **Anonymous Contributions**:
   - Donors contribute using FHE-encrypted amounts
   - Multiple contributions from same address are aggregated (encrypted)
   - Input validation prevents overflow attacks

3. **Finalization Request**:
   - After deadline, creator requests finalization
   - Contract initiates Gateway decryption request
   - System tracks requestId and timestamp

4. **Gateway Processing**:
   - Gateway receives decryption request
   - Performs secure decryption with proof generation
   - Calls back contract with decrypted values + proof

5. **Callback Completion**:
   - Contract verifies Gateway signatures
   - Determines project success/failure
   - Enables fund withdrawal or refunds

6. **Timeout Handling**:
   - If callback doesn't arrive within 1 hour, retry available
   - Up to 3 retry attempts with fresh decryption requests
   - After max retries, emergency refund mode activated

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

**Smart Contract Features (Enhanced):**
- ✅ Anonymous contribution amounts via FHE encryption
- ✅ **Gateway callback mode** for async decryption handling
- ✅ **Multi-layered refund mechanisms** (normal, callback-based, emergency)
- ✅ **Timeout protection** with automatic retry (3 attempts max)
- ✅ **Privacy-preserving division** using random multipliers
- ✅ **Price obfuscation** to prevent information leakage
- ✅ **HCU-optimized** FHE operations for gas efficiency
- ✅ Multiple project category support (10+ cultural categories)
- ✅ Flexible funding periods (7-90 days)
- ✅ On-chain metadata storage (IPFS integration ready)
- ✅ **Enhanced access control** with comprehensive validation
- ✅ Emergency pause mechanism
- ✅ **Reentrancy protection** with Checks-Effects-Interactions pattern
- ✅ **Overflow protection** with explicit bounds checking
- ✅ **Decryption status monitoring** for frontend integration

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

## 🔬 Technical Innovations

### 1. Division Problem Solution: Random Multiplier Protection
**Challenge**: FHE division operations can leak information through remainder analysis.

**Solution**:
```solidity
// Generate random multiplier (1000-1999 range)
uint256 randomMultiplier = uint256(keccak256(abi.encodePacked(
    block.timestamp, block.prevrandao, msg.sender, projectCounter
))) % 1000 + 1000;

// Create obfuscated target
euint64 obfuscatedTarget = FHE.mul(targetAmount, FHE.asEuint64(randomMultiplier));
```
This prevents attackers from inferring target amounts through division analysis.

### 2. Price Leakage Prevention: Multiplicative Masking
**Challenge**: Repeated queries or patterns could reveal price information.

**Solution**: Store both encrypted target and obfuscated target with random multiplier, making statistical analysis infeasible.

### 3. Async Processing: Gateway Callback Architecture
**Challenge**: On-chain decryption is impossible; synchronous waiting causes UX issues.

**Solution**:
```solidity
// Step 1: User requests decryption
uint256 requestId = FHE.requestDecryption(cts, this.callbackFunction.selector);

// Step 2: Gateway processes and calls back
function callbackFunction(uint256 requestId, bytes memory cleartexts, bytes memory proof) external {
    FHE.checkSignatures(requestId, cleartexts, proof);
    // Process decrypted values
}
```

### 4. Gas Optimization: Efficient HCU Usage
**Best Practices Implemented**:
- Batch FHE permission settings to reduce HCU costs
- Single-loop statistics gathering
- Efficient storage patterns for encrypted data
- Minimal on-chain computations

## 🛠 Technology Stack

### Smart Contracts Layer
- **Solidity 0.8.24**: Core contract programming language with implicit overflow protection
- **Zama FHEVM Libraries**: Fully Homomorphic Encryption implementation
  - `FHE.sol`: FHE type library for encrypted computations
  - Gateway callback support with signature verification
  - Access control for encrypted data
  - Privacy-preserving arithmetic operations
- **Hardhat Development Framework**: Contract compilation, testing, and deployment
- **Security Patterns Implemented**:
  - Checks-Effects-Interactions (reentrancy protection)
  - Input validation at all entry points
  - Access control with role-based permissions
  - Timeout-based safety mechanisms

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
- **GitHub Repository**: Contact maintainer for repository access

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
