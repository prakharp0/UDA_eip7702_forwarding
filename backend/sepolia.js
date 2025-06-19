import { createWalletClient, http, parseEther, walletActions, encodeFunctionData } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import 'dotenv/config'

const eoa = privateKeyToAccount(process.env.PRIVATE_KEY_UDA)

const contractAddress = process.env.FORWARDER_SEPOLIA_ADDR;
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

const relayerAccount = privateKeyToAccount(process.env.PRIVATE_KEY_SEPOLIA)

async function sepoliaTransferToReceiptent() {
    try{
        // 1. Authorize
        const walletClient = createWalletClient({
        account: relayerAccount,
        chain: sepolia,
        transport: http(process.env.SEPOLIA_RPC),
        });

        // 2. Designate 
        const authorization = await walletClient.signAuthorization({
        account: eoa,
        contractAddress,
        })
        
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

export { sepoliaTransferToReceiptent };
