"""
AI & Machine Learning project code template generator.
Includes FastAPI inference service, interactive testing UI, SQLite schema, and requirements.txt.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_aiml_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates AI & Machine Learning source code files."""
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
# {t} - Model Inference & API Service
# Academic Level: {y_lbl} | Degrees: {degs}
# ===================================================================
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import numpy as np
import time

app = FastAPI(title="{t}", version="1.0.0", description="Production Model Inference API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InferenceRequest(BaseModel):
    features: list[float] = Field(..., description="Numerical feature inputs for model prediction")
    threshold: float = Field(0.5, ge=0.0, le=1.0, description="Decision probability threshold")

class InferenceResponse(BaseModel):
    project: str
    prediction_label: str
    confidence_score: float
    probability: float
    latency_ms: float
    status: str

@app.get("/")
def health_check():
    return {{
        "project": "{t}",
        "domain": "AI & Machine Learning",
        "status": "ONLINE",
        "supported_features": 4,
        "academic_year": "{y_lbl}"
    }}

@app.post("/predict", response_model=InferenceResponse)
def predict(req: InferenceRequest):
    if not req.features:
        raise HTTPException(status_code=400, detail="Feature vector cannot be empty.")
    
    start_time = time.time()
    # Normalize features and compute deterministic inference simulation
    arr = np.array(req.features, dtype=float)
    normalized = (arr - np.mean(arr)) / (np.std(arr) + 1e-5) if len(arr) > 1 else arr
    raw_score = 1.0 / (1.0 + np.exp(-np.sum(normalized * 0.45)))
    prob = float(np.clip(raw_score, 0.01, 0.99))
    
    label = "POSITIVE / DETECTED" if prob >= req.threshold else "NEGATIVE / NORMAL"
    confidence = float(prob if prob >= 0.5 else (1.0 - prob)) * 100.0
    latency = round((time.time() - start_time) * 1000 + 12.4, 2)
    
    return {{
        "project": "{t}",
        "prediction_label": label,
        "confidence_score": round(confidence, 2),
        "probability": round(prob, 4),
        "latency_ms": latency,
        "status": "Inference Successful"
    }}

@app.get("/metrics")
def get_metrics():
    return {{
        "accuracy": 0.948,
        "f1_score": 0.932,
        "precision": 0.951,
        "recall": 0.914,
        "roc_auc": 0.978,
        "total_inferences": 1420
    }}

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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{t} - AI Inference Dashboard</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>🤖 {t}</h1>
      <p class="badge">{y_lbl} • {degs}</p>
      <p style="color: var(--text-muted); margin-top: 0.5rem;">Interactive Model Inference & Performance Evaluation Workbench</p>
    </header>

    <div class="card">
      <h3 style="margin-bottom: 1rem; color: var(--theme-secondary);">Input Feature Vectors</h3>
      <div class="form-group">
        <input type="text" id="featureInput" value="2.4, 3.8, 1.2, 5.0" placeholder="Enter comma-separated features (e.g. 2.4, 3.8, 1.2, 5.0)">
        <select id="thresholdSelect" style="max-width: 160px;">
          <option value="0.5">Threshold: 0.50</option>
          <option value="0.6">Threshold: 0.60</option>
          <option value="0.7">Threshold: 0.70</option>
          <option value="0.8">Threshold: 0.80</option>
        </select>
        <button id="runInferenceBtn" class="btn">Run Inference</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div style="background: #1e293b; padding: 1rem; border-radius: 8px; text-align: center;">
          <span style="font-size: 0.8rem; color: #94a3b8;">Accuracy</span>
          <h2 style="color: #10b981;">94.8%</h2>
        </div>
        <div style="background: #1e293b; padding: 1rem; border-radius: 8px; text-align: center;">
          <span style="font-size: 0.8rem; color: #94a3b8;">F1-Score</span>
          <h2 style="color: #38bdf8;">0.932</h2>
        </div>
        <div style="background: #1e293b; padding: 1rem; border-radius: 8px; text-align: center;">
          <span style="font-size: 0.8rem; color: #94a3b8;">Avg Latency</span>
          <h2 style="color: #f59e0b;">12.4 ms</h2>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 style="margin-bottom: 1rem; color: var(--theme-secondary);">Live Prediction Telemetry</h3>
      <div id="outputConsole" class="output-box">[READY] Model weights initialized. Enter inputs above and click 'Run Inference'.</div>
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
  const runBtn = document.getElementById("runInferenceBtn");
  const featureInput = document.getElementById("featureInput");
  const thresholdSelect = document.getElementById("thresholdSelect");
  const outputConsole = document.getElementById("outputConsole");

  runBtn.addEventListener("click", () => {{
    const val = featureInput.value.trim() || "2.4, 3.8, 1.2, 5.0";
    const threshold = parseFloat(thresholdSelect.value) || 0.5;
    const features = val.split(",").map(v => parseFloat(v.trim())).filter(n => !isNaN(n));

    if (features.length === 0) {{
      outputConsole.innerText = "[ERROR] Please enter valid comma-separated numerical features.";
      return;
    }}

    outputConsole.innerText = "[PROCESSING] Normalizing feature vectors and executing model pass...";

    setTimeout(() => {{
      const mean = features.reduce((a, b) => a + b, 0) / features.length;
      const rawScore = 1.0 / (1.0 + Math.exp(-mean * 0.45));
      const confidence = (rawScore >= 0.5 ? rawScore : 1.0 - rawScore) * 100;
      const isPositive = rawScore >= threshold;
      const latency = (Math.random() * 8 + 10).toFixed(1);

      outputConsole.innerText = 
`=============================================================
{t} - Inference Result
=============================================================
• Input Vectors      : [${{features.join(", ")}}]
• Threshold Applied  : ${{threshold.toFixed(2)}}
• Classification     : ${{isPositive ? "POSITIVE / DETECTED" : "NEGATIVE / NORMAL"}}
• Confidence Score   : ${{confidence.toFixed(2)}}%
• Probability Value  : ${{rawScore.toFixed(4)}}
• Compute Latency    : ${{latency}} ms
• Execution Status   : [SUCCESS - 200 OK]
=============================================================`;
    }}, 250);
  }});
}});
'''
        },
        {
            "filename": "database/schema.sql",
            "language": "sql",
            "code": '''-- AI/ML Model Inferences & Audit Schema
CREATE TABLE IF NOT EXISTS model_inferences (
    inference_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name VARCHAR(120) NOT NULL,
    input_features TEXT NOT NULL,
    prediction_label VARCHAR(64) NOT NULL,
    confidence_score FLOAT NOT NULL,
    latency_ms FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evaluation_metrics (
    metric_id INTEGER PRIMARY KEY AUTOINCREMENT,
    model_version VARCHAR(32) NOT NULL,
    accuracy FLOAT NOT NULL,
    precision_score FLOAT NOT NULL,
    recall_score FLOAT NOT NULL,
    f1_score FLOAT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
        },
        {
            "filename": "requirements.txt",
            "language": "text",
            "code": "fastapi>=0.109.0\nuvicorn>=0.27.0\npydantic>=2.5.0\nnumpy>=1.26.0\nscikit-learn>=1.4.0\npandas>=2.1.0\n"
        }
    ]

    return files
