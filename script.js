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
  try {
    const response = await fetch(`/api/finnhub-proxy?symbol=${encodeURIComponent(symbol)}`);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener ${symbol}:`, error);
    return null;
  }
}

async function updateAll() {
  for (const [id, symbol] of Object.entries(symbols)) {
    const box = document.getElementById(id);
    const data = await fetchData(symbol);

    if (data && data.c && data.pc) {
      const change = ((data.c - data.pc) / data.pc) * 100;
      const color = change >= 0 ? "#b6ffb0" : "#ffb6b6";
      const arrow = change >= 0 ? "▲" : "▼";

      box.style.background = color;
      box.innerHTML = `
        <div>${symbol.split(":")[1]}</div>
        <div>${arrow} ${change.toFixed(2)}%</div>
      `;
    } else {
      box.style.background = "#ddd";
      box.innerHTML = `<div>${symbol.split(":")[1]}</div><div>--</div>`;
    }
  }
}

updateAll();
setInterval(updateAll, 60000);
