import 'dotenv/config'
import hre from 'hardhat'

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Using :" + deployer.address + " to deploy");

    const receipent = process.env.RECIPIENT_BASE_SEPOLIA;
    const usdc = process.env.USDC_ADDR_BASE_SEPOLIA;
    const relayer = process.env.RELAYER_BASE_SEPOLIA;

    if(!receipent || !usdc || !relayer) {
        throw new Error("Please set correct receipent, usdc, relayer addresses");
    }

    const ForwarderUSDC = await hre.ethers.getContractFactory("ForwarderUSDC");
    const forwarderUSDC = await ForwarderUSDC.deploy(receipent, usdc, relayer);
    await forwarderUSDC.waitForDeployment();

    console.log("Forwarder is deployed at \n" + forwarderUSDC.target);

}

main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
})
