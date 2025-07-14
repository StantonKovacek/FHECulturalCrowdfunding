# Cultural Crowdfunding Platform - Project Overview

## Project Summary

A comprehensive Hardhat-based development framework for a privacy-preserving crowdfunding platform for cultural projects, utilizing Fully Homomorphic Encryption (FHE) technology on Ethereum Sepolia testnet.

## Key Features

### Smart Contract
- **Contract Name**: AnonymousCulturalCrowdfunding
- **Solidity Version**: 0.8.24
- **Network**: Sepolia Testnet (Chain ID: 11155111)
- **Contract Address**: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`
- **FHE Integration**: Zama FHE library for encrypted contributions

### Development Framework
- **Framework**: Hardhat 2.22.0
- **Language**: JavaScript
- **Testing**: Mocha/Chai
- **Coverage**: Solidity Coverage
- **Linting**: Solhint
- **Formatting**: Prettier

## Project Structure

```
cultural-crowdfunding-platform/
├── .github/
│   └── workflows/
│       ├── test.yml              # CI/CD testing pipeline
│       └── deploy.yml            # Deployment workflow
├── contracts/
│   └── AnonymousCulturalCrowdfunding.sol
├── scripts/
│   ├── deploy.js                 # Deployment script
│   ├── verify.js                 # Contract verification
│   ├── interact.js               # Contract interaction
│   └── simulate.js               # Simulation testing
├── test/
│   └── CulturalCrowdfunding.test.js
├── deployments/                  # Deployment records
├── .solhint.json                 # Solidity linter config
├── .prettierrc.json              # Code formatter config
├── hardhat.config.js             # Hardhat configuration
├── package.json                  # Dependencies & scripts
├── LICENSE                       # MIT License
├── README.md                     # Project documentation
├── DEPLOYMENT.md                 # Deployment guide
└── CI-CD.md                      # CI/CD documentation
```

## Available Scripts

### Development
```bash
npm install              # Install dependencies
npm run compile          # Compile smart contracts
npm run clean            # Clean build artifacts
```

### Testing
```bash
npm test                 # Run test suite
npm run coverage         # Generate coverage report
```

### Deployment
```bash
npm run deploy           # Deploy to Sepolia
npm run deploy:local     # Deploy to local network
npm run verify           # Verify on Etherscan
npm run interact         # Interact with contract
npm run simulate         # Run simulations
```

### Code Quality
```bash
npm run lint             # Run all linters
npm run lint:sol         # Lint Solidity code
npm run lint:fix         # Auto-fix linting issues
npm run prettier:check   # Check code formatting
npm run prettier:write   # Format all code
```

## CI/CD Pipeline

### Automated Workflows

**Test Workflow** (`.github/workflows/test.yml`)
- Triggers: Push to main/develop, Pull requests
- Matrix testing: Node.js 18.x and 20.x
- Steps:
  1. Solidity linting (Solhint)
  2. Code formatting check (Prettier)
  3. Contract compilation
  4. Test execution
  5. Coverage generation
  6. Codecov upload
  7. Security audit

**Deploy Workflow** (`.github/workflows/deploy.yml`)
- Trigger: Manual dispatch
- Supports: Sepolia testnet, Localhost
- Uploads deployment artifacts

### Code Quality Tools

1. **Solhint**
   - Enforces Solidity best practices
   - Code complexity limit: 10
   - Compiler version check: >=0.8.24
   - Naming conventions enforcement

2. **Prettier**
   - Consistent code formatting
   - Automatic formatting for JS, JSON, MD, SOL
   - Configurable rules per file type

3. **Solidity Coverage**
   - Test coverage reporting
   - Codecov integration
   - Coverage threshold enforcement

## Required Environment Variables

Create `.env` file with:

```env
PRIVATE_KEY=your_wallet_private_key
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key
ZAMA_RPC_URL=https://devnet.zama.ai
REPORT_GAS=true
COINMARKETCAP_API_KEY=your_coinmarketcap_key
```

## GitHub Secrets Configuration

For CI/CD workflows:

### Deployment Secrets
- `PRIVATE_KEY` - Wallet private key
- `SEPOLIA_RPC_URL` - RPC endpoint
- `ETHERSCAN_API_KEY` - Verification key

### Optional Secrets
- `CODECOV_TOKEN` - Coverage upload token

## Deployment Information

### Current Deployment
- **Network**: Sepolia Testnet
- **Contract**: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`
- **Etherscan**: [View Contract](https://sepolia.etherscan.io/address/0x659b4d354550ADCf46cf1392148DE42C16E8E8Da)

### Deployment Records
- Location: `deployments/` directory
- Format: JSON files with full deployment details
- Includes: Address, transaction hash, deployer, timestamp

## Smart Contract Features

### For Project Creators
- Create cultural crowdfunding projects
- Set funding goals and deadlines (7-90 days)
- Support 10+ cultural categories
- Automatic fund distribution on success
- Track project progress and backers

### For Contributors
- Make anonymous encrypted contributions
- Support messages for creators
- Automatic refunds for failed projects
- Privacy-preserving donation amounts
- Multi-project backing

### Platform Functions
- Platform-wide statistics tracking
- User project history (creator & backer)
- FHE-encrypted amount storage
- Emergency pause mechanism (owner only)
- Project status management

## Testing

### Test Coverage
- Contract deployment tests
- Project creation validation
- Contribution workflow
- Platform statistics
- User tracking
- Error handling

### Running Tests
```bash
# Local testing
npm test

# With coverage
npm run coverage

# Continuous integration
# Tests run automatically on push/PR
```

## Documentation

1. **README.md** - Quick start guide and overview
2. **DEPLOYMENT.md** - Complete deployment instructions
3. **CI-CD.md** - CI/CD pipeline documentation
4. **PROJECT-OVERVIEW.md** - This file

## Best Practices

### Before Committing
1. Format code: `npm run prettier:write`
2. Lint Solidity: `npm run lint:sol`
3. Run tests: `npm test`
4. Check coverage: `npm run coverage`

### Commit Messages
Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `test:` Test changes
- `chore:` Maintenance

### Pull Requests
- All CI checks must pass
- Maintain or improve test coverage
- Update documentation as needed
- No debugging code or console.logs

## Technology Stack

### Core Technologies
- Solidity 0.8.24
- Hardhat 2.22.0
- Ethers.js 6.11.0
- Node.js 18.x / 20.x

### FHE Libraries
- @fhevm/solidity 0.5.0
- Zama FHE integration

### Development Tools
- Solhint 5.0.0
- Prettier 3.2.0
- Solidity Coverage 0.8.0
- Mocha/Chai testing

### CI/CD
- GitHub Actions
- Codecov integration
- Multi-node testing matrix

## Security Considerations

1. **Private Key Management**
   - Never commit `.env` file
   - Use GitHub Secrets for CI/CD
   - Hardware wallets for production

2. **Smart Contract Security**
   - Reentrancy protection
   - Input validation
   - Access control modifiers
   - Emergency pause functionality

3. **Code Quality**
   - Automated linting
   - Test coverage requirements
   - Security auditing via npm audit

## Support & Resources

### Documentation
- [Hardhat Docs](https://hardhat.org/docs)
- [Ethers.js Docs](https://docs.ethers.org/)
- [Zama FHE Docs](https://docs.zama.ai/)
- [Solhint Rules](https://github.com/protofire/solhint)

### Getting Help
1. Check documentation files
2. Review CI/CD logs
3. Consult Hardhat documentation
4. Open GitHub issue with details

## License

MIT License - See LICENSE file for details

## Project Status

✅ Complete Hardhat development framework
✅ Deployment scripts and automation
✅ Comprehensive testing suite
✅ CI/CD pipeline with GitHub Actions
✅ Code quality tools (Solhint, Prettier)
✅ Full documentation
✅ Sepolia testnet deployment
✅ Contract verification support

---

**Version**: 1.0.0
**Last Updated**: January 2025
**Framework**: Hardhat-based FHE Cultural Crowdfunding Platform
