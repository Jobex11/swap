import { Buffer } from "buffer";
window.Buffer = Buffer;
import { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import WalletIcon from "@mui/icons-material/Wallet";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
/* src/index.css or src/App.css */

import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneIcon from "@mui/icons-material/Done";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";

import idl from "./idl.json";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";

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

const fetchSolanaTokens = async () => {
  // test token
  const mockTokens = [
    {
      name: "optimus",
      logo: "data:image/jpeg;base64,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",
      liquidity: "1.25b",
      address: "5XDtS38pDWwnGo5K2jFmmJ9c5dpQP2vB3DMbkJXxicQ8",
    },
    {
      name: "Goldsol",
      logo: "https://th.bing.com/th?id=OIP.IoP0ux90NWWnkDbZcvao9gHaH_&w=240&h=259&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      liquidity: "962m",
      address: "CaGbBR2wQdmCPtBoqkDc7x1o1PCTjDQFRcgHVG3HQHNB",
    },
    {
      name: "Finance",
      logo: "https://th.bing.com/th?q=Token+Coin+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=NG&setlang=en&adlt=moderate&t=1&mw=247",
      liquidity: "723m",
      address: "5XDtS38pDWwnGo5K2jFmmJ9c5dpQP2vB3DMbkJXxicQ8",
    },
    {
      name: "Diamond",
      logo: "https://th.bing.com/th?id=OIP._XrPK1eUGmtDHLCgbqKRPgAAAA&w=183&h=197&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      liquidity: "805m",
      address: "CaGbBR2wQdmCPtBoqkDc7x1o1PCTjDQFRcgHVG3HQHNB",
    },
    {
      name: "Olympus",
      logo: "https://th.bing.com/th?id=OIP.BVBjh_WIqFL2QAtmJ-cSjAHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      liquidity: "931m",
      address: "5XDtS38pDWwnGo5K2jFmmJ9c5dpQP2vB3DMbkJXxicQ8",
    },
    {
      name: "Taitken",
      logo: "https://th.bing.com/th?id=OIP.WjC0WH-106qE3aVSHVNCTwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      liquidity: "150,",
      address: "CaGbBR2wQdmCPtBoqkDc7x1o1PCTjDQFRcgHVG3HQHNB",
    },
    {
      name: "Brassline",
      logo: "https://th.bing.com/th/id/OIP.DNTSJfU5Kt4SQU5Skl4x1AHaHa?w=182&h=181&c=7&r=0&o=5&pid=1.7",
      liquidity: "940m",
      address: "BghBhVscpLyJQiYU27zgf9k6MemAj58RNHmJNi1DkyXz",
    },
    {
      name: "Bitman",
      logo: "https://th.bing.com/th/id/OIP.57949vOB3U4tsNuRFRviPQHaH_?w=167&h=185&c=7&r=0&o=5&pid=1.7",
      liquidity: "2.1b",
      address: "CaGbBR2wQdmCPtBoqkDc7x1o1PCTjDQFRcgHVG3HQHNB",
    },
    {
      name: "Opus",
      logo: "https://th.bing.com/th/id/OIP.6DepuAlJq6czLAntcBCwXgHaFj?w=247&h=185&c=7&r=0&o=5&pid=1.7",
      liquidity: "125.6m",
      address: "BghBhVscpLyJQiYU27zgf9k6MemAj58RNHmJNi1DkyXz",
    },

    // Add more tokens as needed
  ];

  return mockTokens.slice(0, 20); // Return only 20 tokens
};

// test token

function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amountToken1, setAmountToken1] = useState("");
  const [amountToken2, setAmountToken2] = useState("");
  const [userToken1Account, setUserToken1Account] = useState("");
  const [userToken2Account, setUserToken2Account] = useState("");
  const [token1Balance, setToken1Balance] = useState(null);
  const [token2Balance, setToken2Balance] = useState(null);

  // token popup starts
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  // Fetch tokens when the component mounts
  useEffect(() => {
    const loadTokens = async () => {
      const tokenList = await fetchSolanaTokens();
      setTokens(tokenList);
      setSelectedToken(tokenList[0]); // Set the first token as the default
    };

    loadTokens();
  }, []);

  // Handle token click to open the popup
  const handleTokenClick = (token) => {
    setSelectedToken(token);
  };

  // Open the token selection popup
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  // Close the token selection popup
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  // Handle selection of a token from the popup
  const handleSelectToken = (token) => {
    setSelectedToken(token);
    setOpenPopup(false); // Close the popup
  };

  // token popup ends

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

  const handleCopy = () => {
    const textToCopy = walletAddress ? walletAddress : "Not Connected";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Address copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="w-full md:w-[80%] lg:w-[70%] my-3">
      <div className="px-3">
        <div className="title ">
          <div className="font-semibold">
            <img src="/images/swap.svg" />
          </div>
          <div className="flex">
            <img src="/images/pro.svg" />
          </div>
        </div>
        <hr className="border-t border-gray-500 w-full my-3" />

        <div className="mt-5 ">
          <button
            className="w-full md:w-1/2 rounded-lg bg-custom-teal p-3 text-base cursor-pointer hover:bg-hover-tea relative z-10"
            onClick={connectWallet}
          >
            {walletAddress ? "Wallet Connected" : "Connect Wallet"}{" "}
            <WalletIcon />
          </button>
        </div>
        <div className="my-2 space-x-2">
          <span>Wallet Address:</span>
          <span className="font-semibold " onClick={handleCopy}>
            {walletAddress ? shortenAddress(walletAddress) : "Not Connected"}
          </span>
        </div>
        <div className="my-1 space-x-2">
          <Typography variant="body1">
            Swap Token: {selectedToken?.name}
          </Typography>
        </div>
      </div>
      <div className="mx-3 my-5 bg-custom-teal  p-10 w-full rounded-lg">
        <div className="swap-box p-5">
          <div
            className="flex w-full justify-center space-x-1"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <h3 className="text-2xl">SWAP</h3>
            <h3 className="bg-custom-teal rounded-md text-lg font-bold p-1 text-gray-800 flex items-center justify-center">
              PRO
            </h3>
          </div>
          <hr className="border-t border-gray-500 w-full my-3" />

          <div className="checker">
            <h5>mark checker</h5>
            <h3>Swapped!</h3>
          </div>
          <div className="bg-[#3d3b3b] rounded-lg mt-3 -mb-3 p-4 w-full flex-col xs:flex-row flex">
            <div className="w-full xs:w-1/2">
              <h4 className="text-gray-400 font-semibold text-base">YOU PAY</h4>
              <div className="">
                <input
                  placeholder="0"
                  className="bg-[#3d3b3b] py-2 text-lg my-1"
                />
              </div>
              <h4 className="text-base   text-gray-400">
                50K 100k 250k 1M Max
              </h4>
            </div>
            <div className="w-full xs:w-1/2 flex flex-col items-start xs:items-end">
              <div className="bg-[#605e5e] rounded-md">
                <div onClick={handleOpenPopup} style={{ cursor: "pointer" }}>
                  <Card
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      padding: 0,
                    }}
                  >
                    <CardContent sx={{ padding: "8px", paddingBottom: "8px" }}>
                      {" "}
                      {/* Consistent padding on all sides */}
                      <Grid container direction="column" alignItems="center">
                        <Avatar
                          src={selectedToken?.logo}
                          alt={selectedToken?.name}
                        />
                        <Typography
                          variant="h7"
                          sx={{ marginTop: 0.3, color: "rgb(214, 206, 206)" }}
                        >
                          {/* Reduced margin */}
                          {selectedToken?.name}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Dialog open={openPopup} onClose={handleClosePopup}>
                <DialogTitle>Select a Token</DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                    {tokens.map((token) => (
                      <Grid item xs={4} key={token.address}>
                        <Card
                          onClick={() => handleSelectToken(token)}
                          style={{ cursor: "pointer" }}
                        >
                          <CardContent>
                            <Grid
                              container
                              direction="column"
                              alignItems="center"
                            >
                              <Avatar src={token.logo} alt={token.name} />
                              <Typography variant="body1">
                                {token.name}
                              </Typography>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClosePopup} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>

              <div className="flex text-base text-gray-400 space-x-2">
                <h1>Liq:</h1>
                <h1>
                  <Typography variant="body1">
                    {selectedToken?.liquidity}
                  </Typography>
                </h1>
                <h1>img</h1>
              </div>
            </div>
          </div>

          <div className="swapicon">
            <SwapVerticalCircleIcon style={{ fontSize: "40px" }} />
          </div>
          <div className="bg-[#3d3b3b] rounded-lg  -mt-3 mb-3 p-4 w-full flex flex-col xs:flex-row">
            <div className=" w-full xs:w-1/2">
              <h3 className="text-gray-400  text-base font-semibold">
                YOUR RECEIVE
              </h3>
              <h3 className="py-2 text-lg my-1 font-semibold">0</h3>
              <h3 className="text-base  text-gray-400">
                {" "}
                <span>$ </span> <span>0.00</span>
              </h3>
            </div>
            <div className="w-full xs:w-1/2  flex-col flex items-start xs:items-end">
              <div className="bg-[#605e5e] rounded-md">
                <div onClick={handleOpenPopup} style={{ cursor: "pointer" }}>
                  <Card
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      padding: 0,
                    }}
                  >
                    <CardContent sx={{ padding: "8px", paddingBottom: "8px" }}>
                      {" "}
                      {/* Consistent padding on all sides */}
                      <Grid container direction="column" alignItems="center">
                        <Avatar
                          src={selectedToken?.logo}
                          alt={selectedToken?.name}
                        />
                        <Typography
                          variant="h7"
                          sx={{ marginTop: 0.3, color: "rgb(214, 206, 206)" }}
                        >
                          {/* Reduced margin */}
                          {selectedToken?.name}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-base text-gray-400 flex space-x-2">
                  <h3>Liq:</h3>
                  <h3>
                    <Typography variant="body1">
                      {selectedToken?.liquidity}
                    </Typography>
                  </h3>
                  <h3>img</h3>
                </h3>
              </div>
            </div>
          </div>
          <div className="hidden">View transaction</div>
          <div className="space-x-2 my-2 font-serif">
            <span>
              <input type="checkbox" className="custom-teal" />
            </span>
            <span>Price Protection</span>
            <span>[?]</span>
          </div>
          <div className="w-full">
            <button className="bg-custom-green hover:bg-hover-green p-3 font-semibold rounded-lg bg-[]  text-base w-full md:w-full space-x-3">
              <span>Swap</span>
              <SwapHorizIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

/*
import { Buffer } from "buffer";
window.Buffer = Buffer;
import { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import WalletIcon from "@mui/icons-material/Wallet";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneIcon from "@mui/icons-material/Done";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  Grid,
  ListItem,
  ListItemText,
} from "@mui/material";

import idl from "./idl.json";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";

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

function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amountToken1, setAmountToken1] = useState("");
  const [amountToken2, setAmountToken2] = useState("");
  const [userToken1Account, setUserToken1Account] = useState("");
  const [userToken2Account, setUserToken2Account] = useState("");
  const [token1Balance, setToken1Balance] = useState(null);
  const [token2Balance, setToken2Balance] = useState(null);

  const [openPay, setOpenPay] = useState(false);
  const [selectedPayToken, setSelectedPayToken] = useState("Token1");
  const [openReceive, setOpenReceive] = useState(false);
  const [selectedReceiveToken, setSelectedReceiveToken] = useState("Token1");

  const tokens = Array.from({ length: 20 }, (_, i) => `Token${i + 1}`);
  const handlePayClickOpen = () => {
    setOpenPay(true);
  };
  const handlePayClose = (token) => {
    setSelectedPayToken(token);
    setOpenPay(false);
  };

  const handleReceiveClickOpen = () => {
    setOpenReceive(true);
  };

  const handleReceiveClose = (token) => {
    setSelectedReceiveToken(token);
    setOpenReceive(false);
  };

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

  const handleCopy = () => {
    const textToCopy = walletAddress ? walletAddress : "Not Connected";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Address copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="w-full md:w-[80%] lg:w-[70%] my-3">
      <div className="px-3">
        <div className="title ">
          <div className="font-semibold">
            <img src="/images/swap.svg" />
          </div>
          <div className="flex">
            <img src="/images/pro.svg" />
          </div>
        </div>
        <hr className="border-t border-gray-500 w-full my-3" />

        <div className="mt-5 ">
          <button
            className="w-full md:w-1/2 rounded-lg bg-custom-teal p-3 text-base cursor-pointer hover:bg-hover-tea relative z-10"
            onClick={connectWallet}
          >
            {walletAddress ? "Wallet Connected" : "Connect Wallet"}{" "}
            <WalletIcon />
          </button>
        </div>
        <div className="my-2 space-x-2">
          <span>Wallet Address:</span>
          <span className="font-semibold " onClick={handleCopy}>
            {walletAddress ? shortenAddress(walletAddress) : "Not Connected"}
          </span>
        </div>
        <div className="my-1 space-x-2">
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
        </div>
      </div>
      <div className="my-5 px-3">
        <div className="swap-box">
          <hr className="border-t border-gray-500 w-full my-3" />
          <div className="checker">
            <h5>mark checker</h5>
            <h3>Swapped!</h3>
          </div>
          <div className="bg-[#3d3b3b] rounded-lg mt-3 -mb-3 p-4 w-full flex-col xs:flex-row flex">
            <div className="w-full xs:w-1/2">
              <h4 className="text-custom-teal font-semibold text-sm">
                YOU PAY
              </h4>
              <div className="">
                <input
                  placeholder="0"
                  className="bg-[#3d3b3b] py-2 text-lg my-1"
                />
              </div>
              <h4 className="text-sm   text-yellow-400">
                50K 100k 250k 1M Max
              </h4>
            </div>
            <div className="w-full xs:w-1/2 flex flex-col items-start xs:items-end">
              <div>
                <Button
                  onClick={handlePayClickOpen}
                  variant="outlined"
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    color: "rgb(26, 147, 147)",
                    borderColor: "rgb(26, 147, 147)",
                  }}
                >
                  Select tokens
                </Button>
              </div>

              <Dialog open={openPay} onClose={() => setOpenPay(false)}>
                <DialogTitle>Select a Token</DialogTitle>
                <Grid container spacing={2} padding={2}>
                  {tokens.map((token, index) => (
                    <Grid item xs={3} key={index}>
                      <ListItem button onClick={() => handlePayClose(token)}>
                        <ListItemText primary={token} />
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              </Dialog>

              <div>
                <h1>{selectedPayToken} img</h1>
                <h5>{selectedPayToken} name</h5>
              </div>
              <div className="flex text-sm text-pink-500 space-x-2">
                <h1>liquidity:</h1>
                <h1>68.68m</h1>
                <h1>img</h1>
              </div>
            </div>
          </div>

          <div className="swapicon">
            <SwapVerticalCircleIcon style={{ fontSize: "40px" }} />
          </div>
          <div className="bg-[#3d3b3b] rounded-lg  -mt-3 mb-3 p-4 w-full flex flex-col xs:flex-row">
            <div className=" w-full xs:w-1/2">
              <h3 className="text-custom-teal  text-sm font-semibold">
                YOUR RECEIVE
              </h3>
              <h3 className="py-2 text-lg my-1 font-semibold">0</h3>
              <h3 className="text-sm  text-blue-400">
                {" "}
                <span>$ </span> <span>0.00</span>
              </h3>
            </div>
            <div className="w-full xs:w-1/2  flex-col flex items-start xs:items-end">
              <div>
                <Button
                  onClick={handlePayClickOpen}
                  variant="outlined"
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    color: "rgb(26, 147, 147)",
                    borderColor: "rgb(26, 147, 147)",
                  }}
                >
                  Select tokens
                </Button>
              </div>

              <Dialog open={openPay} onClose={() => setOpenPay(false)}>
                <DialogTitle className="text-custom-teal">
                  Select a Token
                </DialogTitle>
                <Grid container spacing={2} padding={2}>
                  {tokens.map((token, index) => (
                    <Grid item xs={3} key={index}>
                      <ListItem button onClick={() => handlePayClose(token)}>
                        <ListItemText primary={token} />
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              </Dialog>

              <div>
                <h1>{selectedPayToken} img</h1>
                <h5>{selectedPayToken} name</h5>
                <h3 className="text-sm text-pink-500 flex space-x-2">
                  <h3>liquidity:</h3>
                  <h3>1.23b</h3>
                  <h3>img</h3>
                </h3>
              </div>
            </div>
          </div>
          <div className="hidden">View transaction</div>
          <div className="space-x-2 my-2 font-serif">
            <span>
              <input type="checkbox" className="custom-teal" />
            </span>
            <span>Price Protection</span>
            <span>[?]</span>
          </div>
          <div className="w-full">
            <button className="bg-custom-teal hover:bg-hover-teal p-2 rounded-lg bg-[]  text-base w-full md:w-1/2 space-x-3">
              <span>Swap</span>
              <SwapHorizIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

*/
