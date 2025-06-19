import { createPublicClient, http, parseAbiItem } from 'viem';
import { sepolia, baseSepolia } from 'viem/chains';
import { sepoliaTransferToReceiptent } from './sepolia.js'
import { baseSepoliaTransferToReceiptent } from './base_sepolia.js'



const client = createPublicClient({
  chain: sepolia,
  transport: http(process.env.SEPOLIA_RPC),
});

const client2 = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.BASE_SEPOLIA_RPC),
});

// ERC-20 Transfer event signature
const TRANSFER_EVENT = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)'
);

try{
    await client.watchEvent({
  address: process.env.USDC_ADDR_SEPOLIA,
  event: TRANSFER_EVENT,
  onLogs: (logs) => {
    logs.forEach(async (log) => {
      const { from, to, value } = log.args;
      if(to == '0xD3bc96147c44839f71F28d3491085844481fFF18'){
        console.log("ETH SEPOLIA USDC txn of :" + value)
        await sepoliaTransferToReceiptent();
      }
    });
  },
});

await client2.watchEvent({
  address: process.env.USDC_ADDR_BASE_SEPOLIA,
  event: TRANSFER_EVENT,
  onLogs: (logs) => {
    logs.forEach(async (log) => {
      const { from, to, value } = log.args;
      if(to == '0xD3bc96147c44839f71F28d3491085844481fFF18'){
        console.log("BASE SEPOLIA USDC txn of :" + value)
        await baseSepoliaTransferToReceiptent();
      }
    });
  },
});
} catch(err){
    console.log(err);
}
