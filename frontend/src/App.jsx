import { Buffer } from "buffer";
window.Buffer = Buffer;
import { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import WalletIcon from "@mui/icons-material/Wallet";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import idl from "./idl.json";
import "./index.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const programId = new PublicKey("2seCkRoLJbdPK8EL7Ae4HsG4B9yQTuu9TY9Tbym3QKME");
const contractToken1Account = new PublicKey(
  "3a6Sx6uHCMorkkqJL1jQ7APh2FqDgHqu2cyQPWNmB9N7"
);
const contractToken2Account = new PublicKey(
  "8QbFDWpwaLtQLshFnePA3erUyVuT7Lr8bNoWBTVANYjL"
);
const token1Mint = new PublicKey(
  "5XDtS38pDWwnGo5K2jFmmJ9c5dpQP2vB3DMbkJXxicQ8"
);
const token2Mint = new PublicKey(
  "CaGbBR2wQdmCPtBoqkDc7x1o1PCTjDQFRcgHVG3HQHNB"
);

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amountToken1, setAmountToken1] = useState("");
  const [amountToken2, setAmountToken2] = useState("");
  const [userToken1Account, setUserToken1Account] = useState("");
  const [userToken2Account, setUserToken2Account] = useState("");
  const [token1Balance, setToken1Balance] = useState(null);
  const [token2Balance, setToken2Balance] = useState(null);

  const connection = new Connection("https://api.devnet.solana.com");

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        fetchBalances(response.publicKey.toString());
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert(
        "Phantom Wallet not found! Please install it from https://phantom.app"
      );
    }
  };

  const handleAmountChange = (setAmount) => (e) => {
    setAmount(e.target.value);
  };

  const handleAccountChange = (setAccount) => (e) => {
    setAccount(e.target.value);
  };

  const fetchBalances = async (publicKey) => {
    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(publicKey),
        { programId: anchor.utils.token.TOKEN_PROGRAM_ID }
      );

      tokenAccounts.value.forEach((accountInfo) => {
        const { account } = accountInfo;
        const mint = account.data.parsed.info.mint;
        const balance = account.data.parsed.info.tokenAmount.uiAmount;

        if (mint === token1Mint.toString()) {
          setToken1Balance(balance);
        } else if (mint === token2Mint.toString()) {
          setToken2Balance(balance);
        }
      });
    } catch (error) {
      console.error("Failed to fetch token balances:", error);
    }
  };

  const swapToken = async (amount, userTokenAccount, fundInstruction) => {
    if (!walletAddress) {
      alert("Connect your wallet first.");
      return;
    }

    const provider = new anchor.AnchorProvider(
      connection,
      window.solana,
      anchor.AnchorProvider.defaultOptions()
    );

    const program = new anchor.Program(idl, programId, provider);

    try {
      const amountBN = new anchor.BN(parseInt(amount));

      const tx = await program.methods[fundInstruction](amountBN)
        .accounts({
          user: provider.wallet.publicKey,
          userToken1Account:
            fundInstruction === "fundToken1"
              ? new PublicKey(userToken1Account)
              : undefined,
          userToken2Account:
            fundInstruction === "fundToken2"
              ? new PublicKey(userToken2Account)
              : undefined,
          contractToken1Account:
            fundInstruction === "fundToken1"
              ? contractToken1Account
              : undefined,
          contractToken2Account:
            fundInstruction === "fundToken2"
              ? contractToken2Account
              : undefined,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        })
        .rpc();

      console.log("Transaction successful:", tx);
      alert("Tokens swapped successfully!");
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Failed to swap tokens.");
    }
  };

  const shortenAddress = (address) => {
    return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
  };

  return (
    <div className="container">
      <div className="swap-box">
        <h2>Optimus Swap</h2>
        <h5>Swapping Solana tokens with ease</h5>
        <button onClick={connectWallet}>
          {walletAddress ? "Wallet Connected" : "Connect Wallet"} <WalletIcon />
        </button>

        <h3>
          Swapping Address:{" "}
          <span>
            {walletAddress ? shortenAddress(walletAddress) : "Not Connected"}
          </span>
        </h3>
        <div className="warning">
          Warning: Your swapping address must hold the token to be swapped
        </div>
        {walletAddress && (
          <div>
            <h3>
              Token1 Balance (5XDtS38...) :{" "}
              {token1Balance !== null ? token1Balance : "Loading..."}
            </h3>
            <h3>
              Token2 Balance (CaGbBR...) :{" "}
              {token2Balance !== null ? token2Balance : "Loading..."}
            </h3>
          </div>
        )}

        <div>
          <h4>User Token1 Account:</h4>

          <div className="warning">
            To get your token account. paste your wallet address in {"   "}
            <a href="https://solscan.io/">solscan</a>. then navigate to
            portfolio to see your token accounts.
          </div>
          <input
            placeholder="Enter Token1 account"
            value={userToken1Account}
            onChange={handleAccountChange(setUserToken1Account)}
          />
          <h4>
            Token1 <SwapHorizIcon /> Token2
          </h4>
          <input
            placeholder="Enter amount of token1 to swap"
            value={amountToken1}
            onChange={handleAmountChange(setAmountToken1)}
          />
          <button
            onClick={() =>
              swapToken(amountToken1, userToken1Account, "fundToken1")
            }
          >
            Swap Token1 <SendAndArchiveIcon />
          </button>
        </div>

        <div className="line">
          <hr />
        </div>
        <div>
          <h4>User Token2 Account:</h4>
          <div className="warning">
            To get your token account. paste your wallet address in {"   "}
            <a href="https://solscan.io/">solscan</a>. then navigate to
            portfolio to see your token accounts.
          </div>
          <input
            placeholder="Enter Token2 account"
            value={userToken2Account}
            onChange={handleAccountChange(setUserToken2Account)}
          />
          <h4>
            Token2 <SwapHorizIcon /> Token1
          </h4>
          <input
            placeholder="Enter amount of token2 to swap"
            value={amountToken2}
            onChange={handleAmountChange(setAmountToken2)}
          />
          <button
            onClick={() =>
              swapToken(amountToken2, userToken2Account, "fundToken2")
            }
          >
            Swap Token2 <SendAndArchiveIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

/*

import "./app.css";
import { Buffer } from "buffer";
window.Buffer = Buffer;
import { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import WalletIcon from "@mui/icons-material/Wallet";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import idl from "./idl.json";

const programId = new PublicKey("2seCkRoLJbdPK8EL7Ae4HsG4B9yQTuu9TY9Tbym3QKME");
const vaultAccount = new PublicKey(
  "DPdjqCCi8EmyUX2NNiXbgp5vyc8y9g9jQuZsHQ36kXvW"
);
const contractToken1Account = new PublicKey(
  "3a6Sx6uHCMorkkqJL1jQ7APh2FqDgHqu2cyQPWNmB9N7"
);
const contractToken2Account = new PublicKey(
  "8QbFDWpwaLtQLshFnePA3erUyVuT7Lr8bNoWBTVANYjL"
);

const token1Mint = new PublicKey(
  "5XDtS38pDWwnGo5K2jFmmJ9c5dpQP2vB3DMbkJXxicQ8"
);
const token2Mint = new PublicKey(
  "CaGbBR2wQdmCPtBoqkDc7x1o1PCTjDQFRcgHVG3HQHNB"
);

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amountToken1, setAmountToken1] = useState("");
  const [amountToken2, setAmountToken2] = useState("");
  const [token1Balance, setToken1Balance] = useState(null);
  const [token2Balance, setToken2Balance] = useState(null);

  const connection = new Connection("https://api.devnet.solana.com");

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        fetchBalances(response.publicKey.toString());
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert(
        "Phantom Wallet not found! Please install it from https://phantom.app"
      );
    }
  };

  const handleAmountChange = (setAmount) => (e) => {
    setAmount(e.target.value);
  };

  const fetchBalances = async (publicKey) => {
    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(publicKey),
        { programId: anchor.utils.token.TOKEN_PROGRAM_ID }
      );

      tokenAccounts.value.forEach((accountInfo) => {
        const { account } = accountInfo;
        const mint = account.data.parsed.info.mint;
        const balance = account.data.parsed.info.tokenAmount.uiAmount;

        if (mint === token1Mint.toString()) {
          setToken1Balance(balance);
        } else if (mint === token2Mint.toString()) {
          setToken2Balance(balance);
        }
      });
    } catch (error) {
      console.error("Failed to fetch token balances:", error);
    }
  };

  const swapToken = async (amount, userTokenAccount, fundInstruction) => {
    if (!walletAddress) {
      alert("Connect your wallet first.");
      return;
    }

    const provider = new anchor.AnchorProvider(
      connection,
      window.solana,
      anchor.AnchorProvider.defaultOptions()
    );

    const program = new anchor.Program(idl, programId, provider);

    try {
      const amountBN = new anchor.BN(parseInt(amount));

      const tx = await program.methods[fundInstruction](amountBN)
        .accounts({
          user: provider.wallet.publicKey,
          userToken1Account:
            fundInstruction === "fundToken1"
              ? new PublicKey(userTokenAccount)
              : undefined,
          userToken2Account:
            fundInstruction === "fundToken2"
              ? new PublicKey(userTokenAccount)
              : undefined,
          contractToken1Account:
            fundInstruction === "fundToken1"
              ? contractToken1Account
              : undefined,
          contractToken2Account:
            fundInstruction === "fundToken2"
              ? contractToken2Account
              : undefined,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        })
        .rpc();

      console.log("Transaction successful:", tx);
      alert("Tokens swapped successfully!");
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Failed to swap tokens.");
    }
  };

  const shortenAddress = (address) => {
    return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
  };

  return (
    <div className="container">
      <div className="swap-box">
        <h2>Optimus Swap</h2>
        <h5>Swapping Solana tokens with ease</h5>
        <button onClick={connectWallet}>
          {walletAddress ? "Wallet Connected" : "Connect Wallet"} <WalletIcon />
        </button>

        <h3>
          Swapping Address:{" "}
          {walletAddress ? shortenAddress(walletAddress) : "Not Connected"}
        </h3>

        {walletAddress && (
          <div>
            <p>
              Token1 Balance:{" "}
              {token1Balance !== null ? token1Balance : "Loading..."}
            </p>
            <p>
              Token2 Balance:{" "}
              {token2Balance !== null ? token2Balance : "Loading..."}
            </p>
          </div>
        )}
        <div>
          <h4>Token1 (Optimus token):</h4>
          <input
            placeholder="Enter amount of token1"
            value={amountToken1}
            onChange={handleAmountChange(setAmountToken1)}
          />
          <button
            onClick={() => swapToken(amountToken1, walletAddress, "fundToken1")}
          >
            Swap Token1 <SendAndArchiveIcon />
          </button>
        </div>

        <div>
          <h4>Token2 (Prime token):</h4>
          <input
            placeholder="Enter amount of token2"
            value={amountToken2}
            onChange={handleAmountChange(setAmountToken2)}
          />
          <button
            onClick={() => swapToken(amountToken2, walletAddress, "fundToken2")}
          >
            Swap Token2 <SendAndArchiveIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
*/

/*
import "./app.css";
import { Buffer } from "buffer";
window.Buffer = Buffer;
import { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import WalletIcon from "@mui/icons-material/Wallet";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import idl from "./idl.json";

const programId = new PublicKey("2seCkRoLJbdPK8EL7Ae4HsG4B9yQTuu9TY9Tbym3QKME");
const vaultAccount = new PublicKey(
  "DPdjqCCi8EmyUX2NNiXbgp5vyc8y9g9jQuZsHQ36kXvW"
);
const contractToken1Account = new PublicKey(
  "3a6Sx6uHCMorkkqJL1jQ7APh2FqDgHqu2cyQPWNmB9N7"
);
const contractToken2Account = new PublicKey(
  "8QbFDWpwaLtQLshFnePA3erUyVuT7Lr8bNoWBTVANYjL"
);

const token1Mint = new PublicKey(
  "5XDtS38pDWwnGo5K2jFmmJ9c5dpQP2vB3DMbkJXxicQ8"
);
const token2Mint = new PublicKey(
  "CaGbBR2wQdmCPtBoqkDc7x1o1PCTjDQFRcgHVG3HQHNB"
);
const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amountToken1, setAmountToken1] = useState("");
  const [amountToken2, setAmountToken2] = useState("");
  const [token1Balance, setToken1Balance] = useState(null);
  const [token2Balance, setToken2Balance] = useState(null);

  const connection = new Connection("https://api.devnet.solana.com");

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        fetchBalances(response.publicKey.toString());
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert(
        "Phantom Wallet not found! Please install it from https://phantom.app"
      );
    }
  };

  const handleAmountChange = (setAmount) => (e) => {
    setAmount(e.target.value);
  };

  const fetchBalances = async (publicKey) => {
    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(publicKey),
        { programId: anchor.utils.token.TOKEN_PROGRAM_ID }
      );

      tokenAccounts.value.forEach((accountInfo) => {
        const { account } = accountInfo;
        const mint = account.data.parsed.info.mint;
        const balance = account.data.parsed.info.tokenAmount.uiAmount;

        if (mint === token1Mint.toString()) {
          setToken1Balance(balance);
        } else if (mint === token2Mint.toString()) {
          setToken2Balance(balance);
        }
      });
    } catch (error) {
      console.error("Failed to fetch token balances:", error);
    }
  };

  const swapToken = async (amount, tokenAccount, fundInstruction) => {
    if (!walletAddress) {
      alert("Connect your wallet first.");
      return;
    }

    const provider = new anchor.AnchorProvider(
      connection,
      window.solana,
      anchor.AnchorProvider.defaultOptions()
    );

    const program = new anchor.Program(idl, programId, provider);

    try {
      const amountBN = new anchor.BN(parseInt(amount));

      const tx = await program.methods[fundInstruction](amountBN)
        .accounts({
          user: provider.wallet.publicKey,
          userToken1Account: new PublicKey(tokenAccount),
          contractToken1Account:
            fundInstruction === "fundToken1"
              ? contractToken1Account
              : contractToken2Account,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        })
        .rpc();

      console.log("Transaction successful:", tx);
      alert("Tokens swapped successfully!");
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Failed to swap tokens.");
    }
  };

  const shortenAddress = (address) => {
    return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
  };

  return (
    <div className="container">
      <div className="swap-box">
        <h2>Optimus Swap</h2>
        <h5>Swapping Solana tokens with ease</h5>
        <button onClick={connectWallet}>
          {walletAddress ? "Wallet Connected" : "Connect Wallet"} <WalletIcon />
        </button>

        <h3>
          Swapping Address:{" "}
          {walletAddress ? shortenAddress(walletAddress) : "Not Connected"}
        </h3>

        {walletAddress && (
          <div>
            <p>
              Token1 Balance:{" "}
              {token1Balance !== null ? token1Balance : "Loading..."}
            </p>
            <p>
              Token2 Balance:{" "}
              {token2Balance !== null ? token2Balance : "Loading..."}
            </p>
          </div>
        )}
        <div>
          <h4>Token1 (Optimus token):</h4>
          <input
            placeholder="Enter amount of token1"
            value={amountToken1}
            onChange={handleAmountChange(setAmountToken1)}
          />
          <button
            onClick={() => swapToken(amountToken1, walletAddress, "fundToken1")}
          >
            Swap Token1 <SendAndArchiveIcon />
          </button>
        </div>

        <div>
          <h4>Token2 (Prime token):</h4>
          <input
            placeholder="Enter amount of token2"
            value={amountToken2}
            onChange={handleAmountChange(setAmountToken2)}
          />
          <button
            onClick={() => swapToken(amountToken2, walletAddress, "fundToken2")}
          >
            Swap Token2 <SendAndArchiveIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;


/*
import { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import WalletIcon from "@mui/icons-material/Wallet";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert(
        "Phantom Wallet not found! Please install it from https://phantom.app"
      );
    }
  };

  const getShortAddress = (address) => {
    return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
  };
  return (
    <div className="container">
      <div className="swap-box">
        <h2>Optimus Swap</h2>
        <h5>swapping Solana tokens with ease</h5>
        <div>
          <button onClick={connectWallet}>
            {walletAddress ? "Wallet Connected" : "Connect Wallet"}{" "}
            <WalletIcon />
          </button>
        </div>
        <div>
          <h3>
            Swapping Address:{" "}
            {walletAddress ? getShortAddress(walletAddress) : "Not Connected"}
          </h3>
          <h4>token1 (Optimus token): </h4>
          <h4>token2 (prime token): </h4>
          <div className="warning">
            Warning: Your swapping address must hold the token to be swapped
          </div>
        </div>
        <div>
          Swap token1 <SwapHorizIcon /> token2
          <input placeholder="enter amount of token1"></input>
          <div>
            <span>transaction fee of 3% applies</span>
          </div>
          <div>
            <button>
              swap token1
              <SendAndArchiveIcon />
            </button>
          </div>
        </div>
        <div>
          Swap Token2 <SwapHorizIcon /> Token1
          <input placeholder="enter amount of token2"></input>
          <div>
            <span>transaction fee of 3% applies</span>
          </div>
          <div>
            <button>
              swap token2
              <SendAndArchiveIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

*/
