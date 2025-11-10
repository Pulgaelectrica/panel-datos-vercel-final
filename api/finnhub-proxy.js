import fetch from 'node-fetch';

export default async function handler(req, res) {
    const symbol = req.query.symbol;
    const API_KEY = process.env.FINNHUB_API_KEY;

    if (!symbol) {
        res.status(400).json({ error: 'Símbolo no proporcionado' });
        return;
    }

    try {
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error Finnhub API');
        const data = await response.json();

        res.status(200).json({
            last: data.c,
            change: data.d,
            history: [data.pc, data.c] // simple ejemplo, reemplaza con tus valores históricos
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en la API' });
    }
}
