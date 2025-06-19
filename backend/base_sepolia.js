import { createWalletClient, http, parseEther, walletActions, encodeFunctionData } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'
import 'dotenv/config'

// eoa account from private key
const eoa = privateKeyToAccount(process.env.PRIVATE_KEY_UDA)

// deployed forwarder contract from private key
const contractAddress = process.env.FORWARDER_BASE_SEPOLIA_ADDR;
const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_usdc",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_relayer",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "ForwardDone",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "ForwardUSDC",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

// relayerAccount from private key
const relayerAccount = privateKeyToAccount(process.env.PRIVATE_KEY_BASE_SEPOLIA)

async function baseSepoliaTransferToReceiptent() {
    try{
        const walletClient = createWalletClient({
        account: relayerAccount,
        chain: baseSepolia,
        transport: http(process.env.BASE_SEPOLIA_RPC),
        });

        // 1. Authorize
        const authorization = await walletClient.signAuthorization({
        account: eoa,
        contractAddress,
        })
        
        // 2. Designate 
        const hash = await walletClient.sendTransaction({
        authorizationList: [authorization],
        data: encodeFunctionData({
            abi,
            functionName: 'ForwardUSDC',
        }),
        to: eoa.address,
        })

        console.log("Txn Hash: "+hash)
    } catch(error){
        console.log(error)
    }
    
}

export { baseSepoliaTransferToReceiptent };
