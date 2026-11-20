"""
IoT & Hardware project code template generator.
Includes ESP32/Arduino firmware .ino, FastAPI telemetry bridge, dashboard UI, and schema.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_iot_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates IoT & Embedded Systems source code files."""
    t = proj["title"]
    cat = proj["category"]
    tech = proj["techStack"]
    tech_str = ", ".join(tech)
    y_lbl = proj["yearLabel"]
    degs = ", ".join(proj["degrees"])

    files = [
        {
            "filename": "firmware/main.ino",
            "language": "cpp",
            "code": f'''/* ===================================================================
   {t} - Microcontroller Firmware (ESP32 / Arduino C++)
   Academic Level: {y_lbl} | Degrees: {degs}
   =================================================================== */

#include <Arduino.h>

#define SENSOR_PIN 34
#define RELAY_PIN 23
#define STATUS_LED 2
#define BUZZER_PIN 19

float sensorValue = 0.0;
bool relayState = false;
unsigned long lastTelemetryTime = 0;
const unsigned long telemetryInterval = 2000;

void setup() {{
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  digitalWrite(RELAY_PIN, LOW);
  digitalWrite(STATUS_LED, HIGH);
  Serial.println("[SYSTEM INIT] {t} Firmware Booted Successfully.");
}}

void loop() {{
  unsigned long now = millis();
  if (now - lastTelemetryTime >= telemetryInterval) {{
    lastTelemetryTime = now;
    
    // Read analog transducer value
    int raw = analogRead(SENSOR_PIN);
    sensorValue = (raw / 4095.0) * 100.0; // Scaled percentage
    
    // Safety Threshold Logic
    if (sensorValue > 75.0) {{
      relayState = true;
      digitalWrite(RELAY_PIN, HIGH);
      digitalWrite(BUZZER_PIN, HIGH);
      Serial.printf("[ALERT] Sensor Exceeded Threshold! Value: %.2f%% | Actuator: ON\\n", sensorValue);
    }} else {{
      relayState = false;
      digitalWrite(RELAY_PIN, LOW);
      digitalWrite(BUZZER_PIN, LOW);
      Serial.printf("[TELEMETRY] Sensor: %.2f%% | Relay: OFF\\n", sensorValue);
    }}
  }}
}}
'''
        },
        {
            "filename": "backend/telemetry_server.py",
            "language": "python",
            "code": f'''# ===================================================================
# {t} - IoT Telemetry & MQTT Bridge Service
# ===================================================================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time

app = FastAPI(title="{t} - Telemetry Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class TelemetryPayload(BaseModel):
    node_id: str = "NODE-ESP32-01"
    sensor_reading: float
    relay_status: bool
    battery_level: float

class RelayTogglePayload(BaseModel):
    state: bool = True

@app.get("/api/telemetry/live")
def get_live_telemetry():
    val = round(random.uniform(22.0, 85.0), 2)
    relay = val > 75.0
    return {{
        "project": "{t}",
        "timestamp": time.time(),
        "node_id": "NODE-ESP32-01",
        "sensor_reading": val,
        "unit": "PPM / °C / PSI",
        "relay_active": relay,
        "signal_strength": "-68 dBm (Strong)",
        "status": "CRITICAL" if relay else "NORMAL"
    }}

@app.post("/api/actuator/toggle")
def toggle_relay(payload: RelayTogglePayload = RelayTogglePayload()):
    return {{"command": "RELAY_OVERRIDE", "new_state": payload.state, "acknowledged": True}}


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
  <title>{t} - IoT Dashboard</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>⚡ {t}</h1>
      <p class="badge">{y_lbl} • {degs}</p>
      <p style="color: var(--text-muted); margin-top: 0.5rem;">Live Hardware Telemetry Stream & Actuator Remote Controller</p>
    </header>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
      <div class="card" style="text-align: center;">
        <h4 style="color: var(--text-muted); margin-bottom: 0.5rem;">Sensor Telemetry Dial</h4>
        <h1 id="sensorReading" style="font-size: 3rem; color: #f59e0b;">42.5</h1>
        <p id="sensorStatus" class="badge">NORMAL OPERATION</p>
      </div>

      <div class="card" style="text-align: center;">
        <h4 style="color: var(--text-muted); margin-bottom: 0.5rem;">Relay Actuator State</h4>
        <h1 id="relayStatus" style="font-size: 2.5rem; color: #10b981;">OFF</h1>
        <button id="toggleRelayBtn" class="btn" style="margin-top: 1rem;">Manual Override Switch</button>
      </div>
    </div>

    <div class="card">
      <h3 style="margin-bottom: 1rem; color: var(--theme-secondary);">Serial Monitor Telemetry Log</h3>
      <div id="serialConsole" class="output-box">[SYSTEM] Connected to virtual ESP32 hardware UART channel...</div>
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
  const sensorReading = document.getElementById("sensorReading");
  const sensorStatus = document.getElementById("sensorStatus");
  const relayStatus = document.getElementById("relayStatus");
  const toggleRelayBtn = document.getElementById("toggleRelayBtn");
  const serialConsole = document.getElementById("serialConsole");

  let isRelayOn = false;

  function updateTelemetry() {{
    const val = (Math.random() * 60 + 20).toFixed(1);
    sensorReading.innerText = val;

    if (val > 70.0 || isRelayOn) {{
      sensorStatus.innerText = "THRESHOLD ALERT";
      sensorStatus.style.borderColor = "#ef4444";
      sensorStatus.style.color = "#ef4444";
      relayStatus.innerText = "ON";
      relayStatus.style.color = "#ef4444";
      logSerial(`[WARN] Sensor Spike: ${{val}} units | Actuator Interlock Triggered!`);
    }} else {{
      sensorStatus.innerText = "NORMAL OPERATION";
      sensorStatus.style.borderColor = "#10b981";
      sensorStatus.style.color = "#10b981";
      relayStatus.innerText = "OFF";
      relayStatus.style.color = "#10b981";
      logSerial(`[INFO] Sensor Reading: ${{val}} units | Node Health: OK`);
    }}
  }}

  function logSerial(msg) {{
    const time = new Date().toLocaleTimeString();
    serialConsole.innerText = `[${{time}}] ${{msg}}\\n` + serialConsole.innerText.slice(0, 1000);
  }}

  toggleRelayBtn.addEventListener("click", () => {{
    isRelayOn = !isRelayOn;
    logSerial(`[USER COMMAND] Relay manual toggle -> ${{isRelayOn ? "ACTIVATED" : "DEACTIVATED"}}`);
    updateTelemetry();
  }});

  setInterval(updateTelemetry, 2500);
}});
'''
        },
        {
            "filename": "database/schema.sql",
            "language": "sql",
            "code": '''-- IoT Sensor Telemetry & Node Registration Schema
CREATE TABLE IF NOT EXISTS iot_devices (
    device_id VARCHAR(64) PRIMARY KEY,
    device_name VARCHAR(128) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    mac_address VARCHAR(17) NOT NULL,
    status VARCHAR(32) DEFAULT 'ONLINE',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telemetry_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id VARCHAR(64) NOT NULL,
    sensor_value FLOAT NOT NULL,
    relay_state BOOLEAN NOT NULL,
    alert_level VARCHAR(32) DEFAULT 'NORMAL',
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(device_id) REFERENCES iot_devices(device_id)
);
'''
        },
        {
            "filename": "requirements.txt",
            "language": "text",
            "code": "fastapi>=0.109.0\nuvicorn>=0.27.0\npydantic>=2.5.0\npaho-mqtt>=1.6.1\n"
        }
    ]

    return files
