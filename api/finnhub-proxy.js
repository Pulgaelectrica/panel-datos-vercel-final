export default async function handler(req, res) {
  const { symbol } = req.query;
  const key = process.env.FINNHUB_API_KEY;

  if (!key) {
    return res.status(500).json({ error: "FINNHUB_API_KEY not configured" });
  }

  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`;
  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
