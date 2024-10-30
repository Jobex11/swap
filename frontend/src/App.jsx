import { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import WalletIcon from "@mui/icons-material/Wallet";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        // Request wallet connection
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

  // Shorten the wallet address for display
  const getShortAddress = (address) => {
    return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
  };
  return (
    <div className="container">
      <div className="swap-box">
        {/* Swap box */}
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
