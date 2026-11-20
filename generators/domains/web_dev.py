"""
Web & Full Stack project code template generator.
Includes Node.js Express API server, responsive web client, schema, and package.json.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_web_dev_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates Web & Full Stack source code files."""
    t = proj["title"]
    cat = proj["category"]
    tech = proj["techStack"]
    tech_str = ", ".join(tech)
    y_lbl = proj["yearLabel"]
    degs = ", ".join(proj["degrees"])

    files = [
        {
            "filename": "backend/server.js",
            "language": "javascript",
            "code": f'''// ===================================================================
// {t} - Express.js REST API Server
// ===================================================================
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let items = [
  {{ id: 1, title: "Standard Package / Core Service", price: 49.99, inStock: true }},
  {{ id: 2, title: "Enterprise Tier / Cloud Module", price: 149.99, inStock: true }},
  {{ id: 3, title: "Custom Integration Extension", price: 89.99, inStock: true }}
];

app.get('/api/items', (req, res) => {{
  res.json({{ project: "{t}", items, count: items.length }});
}});

app.post('/api/items', (req, res) => {{
  const {{ title, price }} = req.body;
  if (!title || !price) return res.status(400).json({{ error: "Title and price required" }});
  const newItem = {{ id: items.length + 1, title, price: parseFloat(price), inStock: true }};
  items.push(newItem);
  res.status(201).json(newItem);
}});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[SERVER] {t} running on port ${{PORT}}`));
'''
        },
        {
            "filename": "frontend/index.html",
            "language": "html",
            "code": f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{t} - Full Stack App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>🌐 {t}</h1>
      <p class="badge">{y_lbl} • {degs}</p>
    </header>

    <div class="card">
      <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem;">
        <input type="text" id="itemTitle" placeholder="Item name / title...">
        <input type="number" id="itemPrice" placeholder="Price ($)" style="max-width: 120px;">
        <button id="addItemBtn" class="btn">Add Item</button>
      </div>

      <div id="itemList" style="display: grid; gap: 0.75rem;">
        <!-- Dynamic items loaded here -->
      </div>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>
'''
        },
        {
            "filename": "frontend/app.js",
            "language": "javascript",
            "code": f'''document.addEventListener("DOMContentLoaded", () => {{
  const itemTitle = document.getElementById("itemTitle");
  const itemPrice = document.getElementById("itemPrice");
  const addItemBtn = document.getElementById("addItemBtn");
  const itemList = document.getElementById("itemList");

  let items = [
    {{ id: 1, title: "Standard Package / Core Service", price: 49.99 }},
    {{ id: 2, title: "Enterprise Tier / Cloud Module", price: 149.99 }}
  ];

  function render() {{
    itemList.innerHTML = "";
    items.forEach(it => {{
      const div = document.createElement("div");
      div.style.cssText = "display: flex; justify-content: space-between; background: #1e293b; padding: 1rem; border-radius: 8px;";
      div.innerHTML = `<span><strong>${{it.title}}</strong></span><span style="color: #38bdf8; font-weight: 700;">$${{it.price.toFixed(2)}}</span>`;
      itemList.appendChild(div);
    }});
  }}

  addItemBtn.addEventListener("click", () => {{
    const title = itemTitle.value.trim();
    const price = parseFloat(itemPrice.value);
    if (!title || isNaN(price)) return alert("Please enter valid item details.");
    items.push({{ id: items.length + 1, title, price }});
    itemTitle.value = "";
    itemPrice.value = "";
    render();
  }});

  render();
}});
'''
        },
        {
            "filename": "database/schema.sql",
            "language": "sql",
            "code": '''-- Web Dev Full-Stack Database Schema
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(128) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    in_stock BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
        },
        {
            "filename": "package.json",
            "language": "json",
            "code": '''{
  "name": "fullstack-project",
  "version": "1.0.0",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
'''
        }
    ]

    return files
