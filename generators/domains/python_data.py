"""
Python & Data Science project code template generator.
Includes FastAPI data processing pipeline, interactive analytics UI, schema, and requirements.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_python_data_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates Python & Data Science source code files."""
    t = proj["title"]
    cat = proj["category"]
    tech = proj["techStack"]
    tech_str = ", ".join(tech)
    y_lbl = proj["yearLabel"]
    degs = ", ".join(proj["degrees"])

    files = [
        {
            "filename": "backend/app.py",
            "language": "python",
            "code": f'''# ===================================================================
# {t} - Data Analytics & Statistics Service
# ===================================================================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np

app = FastAPI(title="{t}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Simulated Dataset
df = pd.DataFrame({{
    "CustomerID": range(1001, 1011),
    "TransactionAmount": [120.5, 450.0, 89.2, 1200.0, 310.5, 670.0, 95.0, 540.0, 890.0, 410.0],
    "Frequency": [2, 8, 1, 15, 5, 9, 2, 7, 12, 6],
    "SatisfactionScore": [4.5, 4.8, 3.2, 4.9, 4.1, 4.6, 3.8, 4.7, 4.9, 4.3]
}})

@app.get("/api/data/summary")
def get_summary():
    return {{
        "project": "{t}",
        "rows": len(df),
        "columns": list(df.columns),
        "mean_transaction": float(df["TransactionAmount"].mean()),
        "median_transaction": float(df["TransactionAmount"].median()),
        "std_dev": float(df["TransactionAmount"].std()),
        "correlation_amount_freq": float(df["TransactionAmount"].corr(df["Frequency"]))
    }}

@app.get("/api/data/records")
def get_records():
    return df.to_dict(orient="records")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
'''
        },
        {
            "filename": "frontend/index.html",
            "language": "html",
            "code": f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{t} - Data Analytics</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>📊 {t}</h1>
      <p class="badge">{y_lbl} • {degs}</p>
      <p style="color: var(--text-muted); margin-top: 0.5rem;">Interactive Statistical Exploration & Data Mining Dashboard</p>
    </header>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div class="card" style="text-align: center;">
        <span style="font-size: 0.8rem; color: #94a3b8;">Mean Value</span>
        <h2 id="meanVal" style="color: #38bdf8;">$477.52</h2>
      </div>
      <div class="card" style="text-align: center;">
        <span style="font-size: 0.8rem; color: #94a3b8;">Median Value</span>
        <h2 id="medianVal" style="color: #10b981;">$430.00</h2>
      </div>
      <div class="card" style="text-align: center;">
        <span style="font-size: 0.8rem; color: #94a3b8;">Correlation</span>
        <h2 id="corrVal" style="color: #f59e0b;">+0.912</h2>
      </div>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="color: var(--theme-secondary);">Dataset Records</h3>
        <button id="exportCsvBtn" class="btn">Export Cleaned CSV</button>
      </div>
      <div id="tableOutput" class="output-box" style="color: #f8fafc;">Loading dataset table...</div>
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
  const tableOutput = document.getElementById("tableOutput");
  const exportCsvBtn = document.getElementById("exportCsvBtn");

  const sampleData = [
    {{ id: 1001, amount: 120.5, freq: 2, score: 4.5 }},
    {{ id: 1002, amount: 450.0, freq: 8, score: 4.8 }},
    {{ id: 1003, amount: 89.2, freq: 1, score: 3.2 }},
    {{ id: 1004, amount: 1200.0, freq: 15, score: 4.9 }},
    {{ id: 1005, amount: 310.5, freq: 5, score: 4.1 }},
    {{ id: 1006, amount: 670.0, freq: 9, score: 4.6 }}
  ];

  function renderTable() {{
    let rows = "ID       TRANSACTION     FREQUENCY    SATISFACTION\\n";
    rows += "---------------------------------------------------\\n";
    sampleData.forEach(d => {{
      rows += `${{String(d.id).padEnd(9)}}${{("$" + d.amount.toFixed(2)).padEnd(16)}}${{String(d.freq).padEnd(13)}}${{d.score.toFixed(1)}} / 5.0\\n`;
    }});
    tableOutput.innerText = rows;
  }}

  exportCsvBtn.addEventListener("click", () => {{
    let csv = "CustomerID,TransactionAmount,Frequency,SatisfactionScore\\n";
    sampleData.forEach(d => {{
      csv += `${{d.id}},${{d.amount}},${{d.freq}},${{d.score}}\\n`;
    }});
    const blob = new Blob([csv], {{ type: "text/csv" }});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "{t.replace(' ', '_').lower()}_data.csv";
    a.click();
  }});

  renderTable();
}});
'''
        },
        {
            "filename": "database/schema.sql",
            "language": "sql",
            "code": '''-- Python Data Science Dataset & Query Schema
CREATE TABLE IF NOT EXISTS analytics_datasets (
    dataset_id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataset_name VARCHAR(128) NOT NULL,
    total_records INTEGER NOT NULL,
    total_features INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
        },
        {
            "filename": "requirements.txt",
            "language": "text",
            "code": "fastapi>=0.109.0\nuvicorn>=0.27.0\npandas>=2.1.0\nnumpy>=1.26.0\nscipy>=1.11.0\nmatplotlib>=3.8.0\n"
        }
    ]

    return files
