import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import cheerio from "cheerio";

const app = express();
app.use(cors());

let stockData = { normal: [], mirage: [], lastUpdated: new Date(), nextRefresh: {} };

async function fetchStock() {
  try {
    const res = await fetch("https://fruityblox.com/stock");
    const html = await res.text();
    const $ = cheerio.load(html);

    const normal = [];
    const mirage = [];

    $("#normal-selector .stock-item").each((_, el) => {
      normal.push({
        name: $(el).find(".fruit-name").text().trim(),
        cost: $(el).find(".money").text().trim(),
        robux: $(el).find(".robux").text().trim(),
      });
    });

    $("#mirage-selector .stock-item").each((_, el) => {
      mirage.push({
        name: $(el).find(".fruit-name").text().trim(),
        cost: $(el).find(".money").text().trim(),
        robux: $(el).find(".robux").text().trim(),
      });
    });

    const now = new Date();
    stockData = {
      normal,
      mirage,
      lastUpdated: now,
      nextRefresh: {
        normal: new Date(now.getTime() + 4 * 60 * 60 * 1000),
        mirage: new Date(now.getTime() + 2 * 60 * 60 * 1000),
      },
    };

    console.log("✅ Stock updated:", stockData.lastUpdated.toLocaleTimeString());
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

fetchStock();
setInterval(fetchStock, 5 * 60 * 1000);

app.get("/api/stock", (req, res) => res.json(stockData));

app.listen(3000, () => console.log("🚀 API running on http://localhost:3000/api/stock"));
