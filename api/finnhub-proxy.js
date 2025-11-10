import fetch from "node-fetch";

export default async function handler(req, res) {
  const { symbol } = req.query;
  if(!symbol) return res.status(400).json({error: "No symbol"});
  
  try{
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=YOUR_API_KEY`);
      const data = await response.json();
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json({
          last: data.c,
          prevClose: data.pc,
          high: data.h,
          low: data.l
      });
  } catch(e){
      res.status(500).json({error: e.message});
  }
}
