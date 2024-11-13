// src/App.js
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    // Fetch the token list JSON from Solana Labs
    const fetchTokens = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"
        );

        // Get tokens data from the response
        setTokens(response.data.tokens);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div>
      <h1>Solana Tokens</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tokens.slice(0, 20).map((token) => (
          <div
            key={token.address}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              margin: "10px",
              textAlign: "center",
              width: "120px",
            }}
          >
            <img
              src={token.logoURI}
              alt={token.name}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <h3 style={{ fontSize: "1em" }}>{token.name}</h3>
            <p style={{ fontSize: "0.8em", color: "#666" }}>{token.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
