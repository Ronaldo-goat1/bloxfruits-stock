import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

let stock = { normal: [], mirage: [] };
let nextRefresh = Date.now() + 60 * 60 * 1000; // 1 hour from now

const fruits = [
  "Dragon", "Leopard", "Dough", "Venom", "Phoenix",
  "Buddha", "Magma", "Light", "Ice", "Flame",
  "Bomb", "Chop", "Spring", "Smoke", "Spin"
];

// Helper to generate random stock
function generateStock() {
  stock.normal = [];
  stock.mirage = [];

  for (let i = 0; i < 4; i++) {
    stock.normal.push({
      name: fruits[Math.floor(Math.random() * fruits.length)],
      cost: `${(Math.floor(Math.random() * 20) + 1) * 100000}$`,
      robux: `${Math.floor(Math.random() * 2700) + 50} R$`
    });
    stock.mirage.push({
      name: fruits[Math.floor(Math.random() * fruits.length)],
      cost: `${(Math.floor(Math.random() * 20) + 1) * 100000}$`,
      robux: `${Math.floor(Math.random() * 2700) + 50} R$`
    });
  }

  nextRefresh = Date.now() + 60 * 60 * 1000; // reset timer
}

generateStock(); // first run
setInterval(generateStock, 60 * 60 * 1000); // refresh every hour

// API endpoint
app.get("/api/stock", (req, res) => {
  res.json({
    nextRefresh,
    stock
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
