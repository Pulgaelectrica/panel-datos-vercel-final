import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { symbol } = req.query;
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Falta FINNHUB_API_KEY en variables de entorno.' });
  }

  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al conectar con Finnhub');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
