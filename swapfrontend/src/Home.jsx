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
          <div className="bg-[#3d3b3b] rounded-lg mt-3 -mb-3 p-4 w-full flex-col sm:flex-row flex">
            <div className="w-full sm:w-1/2">
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
            <div className="w-full sm:w-1/2 flex flex-col items-start sm:items-end">
              <div>
                <Button
                  onClick={handlePayClickOpen}
                  variant="outlined"
                  endIcon={<ArrowDropDownIcon />}
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
          <div className="bg-[#3d3b3b] rounded-lg  -mt-3 mb-3 p-4 w-full flex flex-col sm:flex-row">
            <div className=" w-full sm:w-1/2">
              <h3 className="text-custom-teal  text-sm font-semibold">
                YOUR RECEIVE
              </h3>
              <h3 className="py-2 text-lg my-1 font-semibold">0</h3>
              <h3 className="text-sm  text-blue-400">
                {" "}
                <span>$ </span> <span>0.00</span>
              </h3>
            </div>
            <div className="w-full sm:w-1/2  flex-col flex items-start sm:items-end">
              <div>
                <Button
                  onClick={handlePayClickOpen}
                  variant="outlined"
                  endIcon={<ArrowDropDownIcon />}
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
