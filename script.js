const symbols = ["BINANCE:BTCUSDT","OANDA:XAU_EUR"];
async function fetchData(symbol){
    try {
        const res = await fetch(`/api/finnhub-proxy?symbol=${symbol}`);
        if(!res.ok) throw new Error('Error');
        return await res.json();
    } catch(e){
        console.error(`fetchData error for ${symbol}:`, e);
        return null;
    }
}

function updateCard(symbol, data){
    const priceEl = document.getElementById(`price-${symbol.split(':')[1]}`);
    if(!data || !priceEl) return;
    const lastPrice = data.last || 0;
    const prevPrice = data.prevClose || 0;
    priceEl.textContent = lastPrice.toFixed(2);
    if(lastPrice > prevPrice){
        priceEl.className = "price up";
    } else if(lastPrice < prevPrice){
        priceEl.className = "price down";
    } else {
        priceEl.className = "price";
    }
    // Aquí podrías dibujar la gráfica suavizada en el canvas correspondiente
}

async function updateAll(){
    for(const symbol of symbols){
        const data = await fetchData(symbol);
        updateCard(symbol, data);
    }
}

updateAll();
setInterval(updateAll, 60*1000); // Actualiza cada minuto
