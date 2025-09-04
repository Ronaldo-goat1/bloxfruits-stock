// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// ===== PRICE LIST 2025 =====
const priceList = {
  Rocket: { beli: 5000, robux: 50 },
  Spin: { beli: 7500, robux: 75 }
 Chop: { beli: 30000, robux: 100 },
  Spring: { beli: 60000, robux: 180 },
  Bomb: { beli: 80000, robux: 220 },
  Smoke: { beli: 100000, robux: 250 },
  Spike: { beli: 180000, robux: 380 },
  Flame: { beli: 250000, robux: 550 },
  Falcon: { beli: 300000, robux: 650 },
  Ice: { beli: 350000, robux: 750 },
  Sand: { beli: 420000, robux: 850 },
  Dark: { beli: 500000, robux: 950 },
  Diamond: { beli: 600000, robux: 1000 },
  Light: { beli: 650000, robux: 1100 },
  Rubber: { beli: 750000, robux: 1200 },
  Barrier: { beli: 1400000, robux: 1250 },
  Magma: { beli: 960000, robux: 1300 },
  Ghost: { beli: 940000, robux: 1275 },
  Quake: { beli: 1000000, robux: 1500 },
  Buddha: { beli: 1200000, robux: 1650 },
  Love: { beli: 1300000, robux: 1700 },
  Spider: { beli: 1500000, robux: 1800 },
  Sound: { beli: 1700000, robux: 1900 },
  Phoenix: { beli: 1800000, robux: 2000 },
  Portal: { beli: 1900000, robux: 2000 },
  Lightning: { beli: 2100000, robux: 2100 },
  Pain: { beli: 2300000, robux: 2200 },
  Blizzard: { beli: 2400000, robux: 2300 },
  Shadow: { beli: 2900000, robux: 2425 },
  Venom: { beli: 3000000, robux: 2450 },
  Control: { beli: 3200000, robux: 2500 },
  Spirit: { beli: 3400000, robux: 2550 },
  Dragon: { beli: 3500000, robux: 2600 },
  Leopard: { beli: 5000000, robux: 3000 },
  Kitsune: { beli: 8000000, robux: 4000 },
 Dragon: { beli: 15000000, robux: 5000 },
};

// ===== STOCK SYSTEM =====
let stock = { normal: [], mirage: [] };

function refreshStock() {
  const fruits = Object.keys(priceList);

  stock.normal = fruits
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map(name => ({
      name,
      beli: priceList[name].beli.toLocaleString() + " ₱",
      robux: priceList[name].robux + " R$",
    }));

  stock.mirage = fruits
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(name => ({
      name,
      beli: priceList[name].beli.toLocaleString() + " ₱",
      robux: priceList[name].robux + " R$",
    }));
}

// First stock + refresh every 4 hours
refreshStock();
setInterval(refreshStock, 4 * 60 * 60 * 1000);

// ===== FRONTEND =====
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Normal Shop Page
app.get("/normal", (req, res) => {
  let html = `<h1>Normal Stock</h1><ul>`;
  stock.normal.forEach(f => {
    html += `<li>${f.name} — ${f.beli} / ${f.robux}</li>`;
  });
  html += `</ul><a href="/">⬅ Back</a>`;
  res.send(html);
});

// Mirage Shop Page
app.get("/mirage", (req, res) => {
  let html = `<h1>Mirage Stock</h1><ul>`;
  stock.mirage.forEach(f => {
    html += `<li>${f.name} — ${f.beli} / ${f.robux}</li>`;
  });
  html += `</ul><a href="/">⬅ Back</a>`;
  res.send(html);
});

// API
app.get("/api/stock", (req, res) => {
  res.json(stock);
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
