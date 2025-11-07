const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log(
    "Account balance:",
    (await deployer.provider.getBalance(deployer.address)).toString(),
  );

  // Token configurations
  const tokens = [
    { name: "Jakarta Token", symbol: "JKT", supply: 1000000000 }, // 1B
    { name: "Surabaya Token", symbol: "SBY", supply: 1000000000 }, // 1B
    { name: "Bali Token", symbol: "BALI", supply: 1000000000 }, // 1B
    { name: "Bogor Token", symbol: "BGR", supply: 1000000000 }, // 1B
    { name: "Indonesia Token", symbol: "IDN", supply: 5000000 }, // 5M
    { name: "Bandung Token", symbol: "BDG", supply: 1000000000 }, // 1B
    { name: "Indonesian Rupiah", symbol: "IDR", supply: 10000000000 }, // 10B
  ];

  // Deploy Token contract
  const Token = await ethers.getContractFactory("Token");

  const deployedTokens = {};

  // Deploy all tokens
  for (const tokenConfig of tokens) {
    console.log(`Deploying ${tokenConfig.name} (${tokenConfig.symbol})...`);
    const token = await Token.deploy(
      tokenConfig.name,
      tokenConfig.symbol,
      tokenConfig.supply,
    );
    await token.waitForDeployment();

    const address = await token.getAddress();
    deployedTokens[tokenConfig.symbol] = address;
    console.log(`${tokenConfig.symbol} deployed to:`, address);
  }

  // Deploy SimpleSwap contract
  console.log("Deploying SimpleSwap...");
  const SimpleSwap = await ethers.getContractFactory("SimpleSwap");
  const simpleSwap = await SimpleSwap.deploy();
  await simpleSwap.waitForDeployment();

  const swapAddress = await simpleSwap.getAddress();
  console.log("SimpleSwap deployed to:", swapAddress);

  // Add all tokens as supported tokens
  for (const [symbol, address] of Object.entries(deployedTokens)) {
    console.log(`Adding ${symbol} as supported token...`);
    await simpleSwap.addSupportedToken(address);
  }

  // Create contract addresses file
  const contractAddresses = {
    SimpleSwap: swapAddress,
    tokens: deployedTokens,
  };

  console.log("\n=== DEPLOYMENT SUMMARY ===");
  console.log("SimpleSwap Contract:", swapAddress);
  console.log("Token Contracts:");
  for (const [symbol, address] of Object.entries(deployedTokens)) {
    console.log(`  ${symbol}: ${address}`);
  }

  console.log("\n=== FRONTEND INTEGRATION ===");
  console.log("Copy this object to your frontend:");
  console.log(JSON.stringify(contractAddresses, null, 2));

  return contractAddresses;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
