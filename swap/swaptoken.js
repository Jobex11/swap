// Load environment variables from .env file
require("dotenv").config();
const anchor = require("@project-serum/anchor");
const { PublicKey, Keypair } = require("@solana/web3.js");
const { Token, TOKEN_PROGRAM_ID } = require("@solana/spl-token");

// Your program ID
const programId = new PublicKey("72w7neBB7p3Bv7zRzGRiKNahQDCpJV4s78AWxVDw5k6m");

// Replace with your wallet (this is just a placeholder, replace with your actual wallet)
const wallet = Keypair.generate();

// Token mint addresses
const TOKEN1_MINT = new PublicKey(
  "CaGbBR2wQdmCPtBoqkDc7x1o1PCTjDQFRcgHVG3HQHNB"
);
const TOKEN2_MINT = new PublicKey(
  "5XDtS38pDWwnGo5K2jFmmJ9c5dpQP2vB3DMbkJXxicQ8"
);

// Replace with your token accounts
const fromTokenAccount = new PublicKey(
  "74K4JDiGopDvRE6rJSUBhp9XnXYa17DzjWn2d9X7mfSk"
);
const toTokenAccount = new PublicKey(
  "74K4JDiGopDvRE6rJSUBhp9XnXYa17DzjWn2d9X7mfSk"
);
const feeAccount = new PublicKey(
  "74K4JDiGopDvRE6rJSUBhp9XnXYa17DzjWn2d9X7mfSk"
);

// Load the IDL for the program (replace 'YourIDL' with the actual IDL)
const idl = require("./path/to/your/idl.json"); // Adjust the path to your IDL file

async function swapTokens(amount) {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = new anchor.Program(idl, programId);

  // Perform the token swap
  try {
    await program.rpc.swapTokens(new anchor.BN(amount), {
      accounts: {
        from: wallet.publicKey,
        fromTokenAccount: fromTokenAccount,
        fromTokenMint: TOKEN1_MINT,
        toTokenAccount: toTokenAccount,
        toTokenMint: TOKEN2_MINT,
        feeAccount: feeAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [wallet],
    });

    console.log("Tokens swapped successfully");
  } catch (error) {
    console.error("Error swapping tokens:", error);
  }
}

// Specify the amount to swap
swapTokens(100);

/*
const anchor = require("@project-serum/anchor")
const { TOKEN_PROGRAM_ID, Token } = require("@solana/spl-token");
const { PublicKey, SystemProgram } = require("@solana/web3.js");

async function swapTokens() {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const programId = new PublicKey(
    "72w7neBB7p3Bv7zRzGRiKNahQDCpJV4s78AWxVDw5k6m"
  );

  const idl = await anchor.Program.fetchIdl(programId, provider);
  const program = new anchor.Program(idl, programId, provider);

  const TOKEN1_MINT = new PublicKey(
    "CaGbBR2wQdmCPtBoqkDc7x1o1PCTjDQFRcgHVG3HQHNB"
  );
  const TOKEN2_MINT = new PublicKey(
    "5XDtS38pDWwnGo5K2jFmmJ9c5dpQP2vB3DMbkJXxicQ8"
  );

  const userPublicKey = provider.wallet.publicKey;

  const fromTokenAccount = new PublicKey(
    "5NrzCyz9C3v7ik9tnqMRWESPwrrZFMCCb6rtnTgBSubG"
  ); 
  const toTokenAccount = new PublicKey(
    "5NrzCyz9C3v7ik9tnqMRWESPwrrZFMCCb6rtnTgBSubG"
  ); 
  const feeAccount = new PublicKey(
    "5NrzCyz9C3v7ik9tnqMRWESPwrrZFMCCb6rtnTgBSubG"
  ); 

  const amount = new anchor.BN(1000000); 
  const tx = await program.methods
    .swapTokens(amount)
    .accounts({
      from: userPublicKey,
      fromTokenAccount: fromTokenAccount,
      fromTokenMint: TOKEN1_MINT,
      toTokenAccount: toTokenAccount,
      toTokenMint: TOKEN2_MINT,
      feeAccount: feeAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .rpc();

  console.log("Swap transaction signature:", tx);
}

swapTokens().catch((err) => {
  console.error("Transaction failed", err);
});

*/
