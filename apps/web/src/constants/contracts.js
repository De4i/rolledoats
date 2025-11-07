export const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
];

export const SWAP_ABI = [
  "function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut) external",
  "function swapETHForTokens(address tokenOut, uint256 minAmountOut) external payable",
  "function swapTokensForETH(address tokenIn, uint256 amountIn, uint256 minAmountOut) external",
  "function getAmountOut(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)",
  "function addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB) external",
  "function pools(address tokenA, address tokenB) view returns (uint256)",
];

export const SWAP_CONTRACT = process.env.NEXT_PUBLIC_SWAP_CONTRACT || "";

export const contracts = {
  OPN: {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "OPN",
    name: "IOPN Native",
    decimals: 18,
  },
  JKT: {
    address: process.env.NEXT_PUBLIC_JKT_TOKEN || "",
    symbol: "JKT",
    name: "Jakarta Token",
    decimals: 18,
  },
  SBY: {
    address: process.env.NEXT_PUBLIC_SBY_TOKEN || "",
    symbol: "SBY",
    name: "Surabaya Token",
    decimals: 18,
  },
  BALI: {
    address: process.env.NEXT_PUBLIC_BALI_TOKEN || "",
    symbol: "BALI",
    name: "Bali Token",
    decimals: 18,
  },
  BGR: {
    address: process.env.NEXT_PUBLIC_BGR_TOKEN || "",
    symbol: "BGR",
    name: "Bogor Token",
    decimals: 18,
  },
  IDN: {
    address: process.env.NEXT_PUBLIC_IDN_TOKEN || "",
    symbol: "IDN",
    name: "Indonesia Token",
    decimals: 18,
  },
  BDG: {
    address: process.env.NEXT_PUBLIC_BDG_TOKEN || "",
    symbol: "BDG",
    name: "Bandung Token",
    decimals: 18,
  },
  IDR: {
    address: process.env.NEXT_PUBLIC_IDR_TOKEN || "",
    symbol: "IDR",
    name: "Indonesian Rupiah",
    decimals: 18,
  },
};
