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

function renderPage(title, items) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; background: #111; color: #eee; text-align: center; padding: 20px; }
        h1 { color: #ffcc00; }
        ul { list-style: none; padding: 0; }
        li { margin: 10px 0; background: #222; padding: 10px; border-radius: 5px; }
        .btn {
          background: #ffcc00; color: #111; padding: 10px 20px; margin: 15px auto;
          text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;
        }
        .btn:hover { background: #ffaa00; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <a href="/" class="btn">⬅ Back to Home</a>
      <ul>
        ${items.map(f => `<li>${f.name} - ${f.cost} - ${f.robux}</li>`).join("")}
      </ul>
    </body>
    </html>
  `;
}

app.get("/normal", (req, res) => {
  res.send(renderPage("Normal Stock", stock.normal));
});

app.get("/mirage", (req, res) => {
  res.send(renderPage("Mirage Stock", stock.mirage));
});

// =================== Server start ===================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API + Web running on port ${PORT}`));
