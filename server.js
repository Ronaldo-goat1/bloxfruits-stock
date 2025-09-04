import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let stock = { normal: [], mirage: [] };
let nextRefresh = Date.now() + 60 * 60 * 1000;

const fruits = [
  "Dragon", "Leopard", "Dough", "Venom", "Phoenix",
  "Buddha", "Magma", "Light", "Ice", "Flame",
  "Bomb", "Chop", "Spring", "Smoke", "Spin"
];

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

  nextRefresh = Date.now() + 60 * 60 * 1000;
}

generateStock();
setInterval(generateStock, 60 * 60 * 1000);

// =================== API endpoints ===================
app.get("/api/stock", (req, res) => res.json({ nextRefresh, stock }));
app.get("/api/normal", (req, res) => res.json({ nextRefresh, stock: stock.normal }));
app.get("/api/mirage", (req, res) => res.json({ nextRefresh, stock: stock.mirage }));

// =================== Webpages ===================
app.use(express.static(__dirname)); // serve index.html

app.get("/normal", (req, res) => {
  res.send(`
    <h1>Normal Stock</h1>
    <a href="/" style="display:inline-block;margin:10px;padding:8px 15px;background:#ffcc00;color:#111;font-weight:bold;border-radius:5px;text-decoration:none;">⬅ Back to Home</a>
    <ul>
      ${stock.normal.map(f => `<li>${f.name} - ${f.cost} - ${f.robux}</li>`).join("")}
    </ul>
  `);
});

app.get("/mirage", (req, res) => {
  res.send(`
    <h1>Mirage Stock</h1>
    <a href="/" style="display:inline-block;margin:10px;padding:8px 15px;background:#ffcc00;color:#111;font-weight:bold;border-radius:5px;text-decoration:none;">⬅ Back to Home</a>
    <ul>
      ${stock.mirage.map(f => `<li>${f.name} - ${f.cost} - ${f.robux}</li>`).join("")}
    </ul>
  `);
});

// =================== Server start ===================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API + Web running on port ${PORT}`));
