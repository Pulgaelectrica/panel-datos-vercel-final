const symbols = {
  btc: "BINANCE:BTCUSDT",
  oro: "OANDA:XAU_EUR",
  sp500: "INDEX:SPX",
  nvda: "NASDAQ:NVDA",
  tsla: "NASDAQ:TSLA",
  aapl: "NASDAQ:AAPL",
  amzn: "NASDAQ:AMZN",
  googl: "NASDAQ:GOOGL"
};

async function fetchData(symbol) {
  const res = await fetch(`/api/finnhub-proxy?symbol=${encodeURIComponent(symbol)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function updateBox(id, symbol) {
  const el = document.getElementById(id);
  try {
    const data = await fetchData(symbol);
    const change = data.dp;
    el.textContent = `${id.toUpperCase()} ${change.toFixed(2)}%`;
    el.style.background = change >= 0 ? "green" : "red";
  } catch {
    el.textContent = `${id.toUpperCase()} ERROR`;
    el.style.background = "gray";
  }
}

function updateAll() {
  for (const [id, sym] of Object.entries(symbols)) updateBox(id, sym);
}
updateAll();
setInterval(updateAll, 60000);
