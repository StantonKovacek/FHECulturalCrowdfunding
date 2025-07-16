# Cultural Crowdfunding Platform

A privacy-preserving crowdfunding platform for cultural projects built on Fully Homomorphic Encryption (FHE) technology. This decentralized application enables creators to raise funds for cultural initiatives while maintaining complete anonymity for both project creators and contributors.

## Overview

The Cultural Crowdfunding Platform revolutionizes the way cultural projects are funded by leveraging cutting-edge FHE smart contracts. The platform ensures that contribution amounts remain encrypted on-chain, protecting the privacy of backers while maintaining full transparency of project operations.

## Core Concepts

### Fully Homomorphic Encryption (FHE)

This platform utilizes FHE technology to enable computations on encrypted data without ever decrypting it.

- **Private Contributions**: Donation amounts are encrypted end-to-end
- **Confidential Fundraising**: Project funding progress is calculated on encrypted values
- **Anonymous Backing**: Contributors can support projects without revealing their identity
- **Trustless Privacy**: No central authority can access private contribution data

### Cultural Project Categories

Support diverse cultural initiatives:
- Visual Arts, Music, Literature
- Film & Cinema, Theater & Performance
- Dance, Digital Art, Photography
- Traditional Crafts, Community Cultural Heritage

## Smart Contract

**Network**: Sepolia Testnet
**Contract Address**: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`
**Etherscan**: [View Contract](https://sepolia.etherscan.io/address/0x659b4d354550ADCf46cf1392148DE42C16E8E8Da)

## Technology Stack

- Solidity 0.8.24 with FHE libraries
- Hardhat development framework
- Ethers.js v6
- Zama FHE encryption
- Ethereum Sepolia Testnet

## Installation

```bash
npm install
cp .env.example .env
# Edit .env with your credentials
npm run compile
```

## Deployment

```bash
npm run deploy       # Deploy to Sepolia
npm run verify       # Verify on Etherscan
npm run interact     # Interact with contract
npm run simulate     # Run simulations
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## License

MIT License
