const symbols = ["BINANCE:BTCUSDT", "OANDA:XAU_EUR", "INDEX:SPX", "NASDAQ:NVDA", "NASDAQ:TSLA", "NASDAQ:AAPL", "NASDAQ:AMZN", "NASDAQ:GOOGL"];

async function fetchData(symbol) {
    try {
        const response = await fetch(`/api/finnhub-proxy?symbol=${encodeURIComponent(symbol)}`);
        if (!response.ok) throw new Error("Error en la API");
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`fetchData error for ${symbol}:`, err);
        return null;
    }
}

function updateCard(symbol, price, change) {
    const priceEl = document.getElementById(`price-${symbol.split(':')[1]}`);
    if (!priceEl) return;
    priceEl.textContent = price;

    const card = document.getElementById(symbol.split(':')[1]);
    if (!card) return;
    card.style.backgroundColor = change >= 0 ? '#d4f4dd' : '#f4d4d4';
}

async function updateAll() {
    for (let symbol of symbols) {
        const data = await fetchData(symbol);
        if (!data) continue;
        const lastPrice = data.last || 0;
        const change = data.change || 0;
        updateCard(symbol, lastPrice, change);
        drawChart(symbol.split(':')[1], data.history || []);
    }
}

function drawChart(symbol, history) {
    const canvas = document.getElementById(`chart-${symbol}`);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!history.length) return;

    const max = Math.max(...history);
    const min = Math.min(...history);

    ctx.beginPath();
    history.forEach((price, i) => {
        const x = (i / (history.length - 1)) * canvas.width;
        const y = canvas.height - ((price - min) / (max - min)) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#007700';
    ctx.lineWidth = 2;
    ctx.stroke();
}

updateAll();
setInterval(updateAll, 30000);
