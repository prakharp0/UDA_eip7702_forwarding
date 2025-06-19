# Unified Deposit Address Assignment

## Overview
This project demonstrates a unified deposit address system across multiple blockchain testnets. A single externally-owned account (EOA) is upgraded to a smart contract wallet using EIP-7702, enabling automatic forwarding of USDC tokens to a predefined recipient address on any supported chain. The system includes:
- A smart contract for USDC forwarding, with relayer authorization.
- Backend services to monitor deposits and trigger forwarding.
- Deployment on at least two testnets.

## Features
- Unified deposit address
- Automatic USDC forwarding to a recipient address
- Whitelisted relayer for secure transfer initiation
- Multi-chain support (at least two testnets)

## Smart Contract
- Implements logic to allow a whitelisted relayer to forward USDC to a recipient address
- Deployable on multiple EVM-compatible testnets


## Backend Services
- Listens for USDC transfers to the unified deposit address on each chain
- Initiates forwarding of USDC to the recipient address via the relayer

## Setup & Local Testing
1. **Clone the repository**
   ```bash
   git clone https://github.com/prakharp0/enclaveMoney_assignment.git
   cd UDA_eip7702_forwarding
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure Environment**
   - Put the following in an .env file in both `backend` and `hardhat_environment` folders
    ```
    UDA_ADD = *put UDA here(you can create it using a private key)*
    PRIVATE_KEY_UDA = 
    PUBLIC_KEY_UDA = 

    PRIVATE_KEY_SEPOLIA = 
    PUBLIC_KEY_SEPOLIA = 
    RECIPIENT_SEPOLIA = 
    USDC_ADDR_SEPOLIA = 
    RELAYER_SEPOLIA = 

    PRIVATE_KEY_BASE_SEPOLIA = 
    PUBLIC_KEY_BASE_SEPOLIA = 
    RECIPIENT_BASE_SEPOLIA = 
    USDC_ADDR_BASE_SEPOLIA = 
    RELAYER_BASE_SEPOLIA = 


    FORWARDER_SEPOLIA_ADDR = 
    FORWARDER_BASE_SEPOLIA_ADDR = 


    SEPOLIA_RPC = 
    BASE_SEPOLIA_RPC = 
    ```
     
4. **Compile and Deploy Smart Contract**
   - Run the deployment script for each testnet:
     ```bash
     cd hardhat_environment
     npx hardhat compile

     npx hardhat run scripts/deploy_forwarder_base_sepolia.js --network base_sepolia
     
     npx hardhat run scripts/deploy_forwarder_sepolia.js --network sepolia
     ```
    - Put the addresses in the .env config file
5. **Run Backend Services Locally**
    Make sure you are in the backend folder
   ```bash
   node index.js
   ```
   The backend will listen for USDC transfers and automatically forward them to the recipient address.

## Testing
- Send USDC to the unified deposit address on any supported testnet.
- The backend service will detect the deposit and forward the funds to the recipient address.

