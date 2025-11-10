import fetch from "node-fetch";

export default async function handler(req, res) {
  const { symbol } = req.query;
  const token = process.env.FINNHUB_API_KEY;

  if (!token) {
    return res.status(500).json({ error: "Falta la API key de Finnhub" });
  }

  try {
    const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`);
    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error proxy Finnhub:", err);
    res.status(500).json({ error: "Error al obtener datos de Finnhub" });
  }
}
