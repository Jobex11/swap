const {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
} = require("@solana/web3.js");
const { Token, TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const raydium = require("@raydium-io/raydium-sdk");

// Initialize Solana connection
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Initialize wallet (using Keypair here for demo; replace with your wallet)
const wallet = Keypair.generate("");

// Replace these with actual addresses
const POOL_ID = new PublicKey("POOL_PUBLIC_KEY_HERE"); // Raydium pool for the token pair (e.g., SOL/USDC)
const SOURCE_TOKEN_ACCOUNT = new PublicKey("SOURCE_TOKEN_ACCOUNT_HERE"); // User's source token account
const DESTINATION_TOKEN_ACCOUNT = new PublicKey(
  "DESTINATION_TOKEN_ACCOUNT_HERE"
); // User's destination token account

// Amount to swap and minimum amount expected (in smallest units, e.g., lamports for SOL)
const swapAmount = 1000000; // Amount in smallest units to swap from source to destination
const minOutAmount = 950000; // Minimum amount expected to prevent slippage losses

// Load Raydium pool
async function loadPool() {
  console.log("Loading Raydium pool...");
  const pool = await raydium.loadPool(connection, POOL_ID);
  return pool;
}

// Perform the swap transaction
async function swapTokens() {
  const pool = await loadPool();
  const transaction = new Transaction();

  // Create the swap instruction using Raydium SDK
  const swapInstruction = raydium.makeSwapInstruction({
    pool,
    userSourceTokenAccount: SOURCE_TOKEN_ACCOUNT,
    userDestinationTokenAccount: DESTINATION_TOKEN_ACCOUNT,
    amountIn: swapAmount,
    minAmountOut: minOutAmount,
    user: wallet.publicKey,
  });

  transaction.add(swapInstruction);

  console.log("Signing and sending transaction...");
  const signature = await connection.sendTransaction(transaction, [wallet]);
  await connection.confirmTransaction(signature, "confirmed");
  console.log(`Swap transaction confirmed: ${signature}`);
}

// Check balance of a token account
async function checkBalance(account) {
  const balance = await connection.getTokenAccountBalance(account);
  console.log(`Balance for ${account.toString()}: ${balance.value.uiAmount}`);
}

// Main function to run the swap
async function main() {
  console.log("Checking initial balances...");
  await checkBalance(SOURCE_TOKEN_ACCOUNT);
  await checkBalance(DESTINATION_TOKEN_ACCOUNT);

  console.log("Starting swap...");
  await swapTokens();

  console.log("Checking final balances...");
  await checkBalance(SOURCE_TOKEN_ACCOUNT);
  await checkBalance(DESTINATION_TOKEN_ACCOUNT);
}

main().catch(console.error);
