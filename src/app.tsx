import { useState } from "react";
import axios from "axios";

export default function App() {
  const [symbol, setSymbol] = useState("BTC");
  const [price, setPrice] = useState<string | null>(null);

  const fetchPrice = async () => {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`);
      setPrice(res.data[symbol.toLowerCase()].usd);
    } catch (e) {
      setPrice("error");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Crypto Price Checker</h1>
      <input 
        value={symbol} 
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="e.g. BTC"
      />
      <button onClick={fetchPrice}>Get Price</button>
      {price && <p>Price: {price} USD</p>}
    </div>
  );
}
