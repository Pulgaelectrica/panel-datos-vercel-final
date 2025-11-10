const symbols = {
  btc: 'BINANCE:BTCUSDT',
  eth: 'BINANCE:ETHUSDT',
  sp500: '^GSPC',
  nasdaq: '^IXIC',
  apple: 'AAPL',
  microsoft: 'MSFT',
  google: 'GOOGL',
  amazon: 'AMZN'
};

async function obtenerPrecio(symbol, id) {
  try {
    const res = await fetch(`/api/finnhub-proxy?symbol=${symbol}`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    const div = document.getElementById(id);
    const change = data.dp || 0;
    div.style.backgroundColor = change >= 0 ? '#008000' : '#b00000';
    div.textContent = `${symbol.split(':').pop()} ${data.c?.toFixed(2) || '—'}`;
  } catch (err) {
    console.error(err);
  }
}

function actualizarTodo() {
  for (const [id, symbol] of Object.entries(symbols)) {
    obtenerPrecio(symbol, id);
  }
}

setInterval(actualizarTodo, 30000);
actualizarTodo();
