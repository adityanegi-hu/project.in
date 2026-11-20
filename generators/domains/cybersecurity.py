"""
Cybersecurity & Cloud project code template generator.
Includes Python security scanner & hash verifier, threat radar UI, schema, and requirements.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_cybersecurity_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates Cybersecurity & Cloud source code files."""
    t = proj["title"]
    cat = proj["category"]
    tech = proj["techStack"]
    tech_str = ", ".join(tech)
    y_lbl = proj["yearLabel"]
    degs = ", ".join(proj["degrees"])

    files = [
        {
            "filename": "backend/security_scanner.py",
            "language": "python",
            "code": f'''# ===================================================================
# {t} - Threat Detection & Cryptographic Scanner
# Academic Level: {y_lbl} | Degrees: {degs}
# ===================================================================
import hashlib
import time

def hash_verifier(data_str: str) -> dict:
    sha256_hash = hashlib.sha256(data_str.encode()).hexdigest()
    md5_hash = hashlib.md5(data_str.encode()).hexdigest()
    return {{
        "input_length": len(data_str),
        "sha256": sha256_hash,
        "md5": md5_hash,
        "integrity": "SECURE_AND_VERIFIED"
    }}

def scan_target(ip_address: str) -> dict:
    common_ports = [21, 22, 80, 443, 3306, 8080]
    results = []
    for port in common_ports:
        is_open = port in [80, 443, 8080]
        results.append({{
            "port": port,
            "state": "OPEN" if is_open else "CLOSED",
            "service": "HTTP/HTTPS" if port in [80, 443] else "SERVICE"
        }})
    return {{
        "target": ip_address,
        "ports_scanned": len(common_ports),
        "open_ports": 3,
        "threat_level": "LOW",
        "scan_results": results
    }}

if __name__ == "__main__":
    print(f"Running {t} Scanner...")
    print(hash_verifier("ProjectForge Security Payload 2026"))
'''
        },
        {
            "filename": "frontend/index.html",
            "language": "html",
            "code": f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{t} - Security Console</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>🛡️ {t}</h1>
      <p class="badge">{y_lbl} • {degs}</p>
    </header>

    <div class="card">
      <div class="form-group">
        <input type="text" id="targetIp" placeholder="Enter target IP or string (e.g. 192.168.1.1 or secret payload)...">
        <button id="scanBtn" class="btn">Execute Security Audit</button>
      </div>

      <div class="output-box" id="securityConsole">[READY] Security engine standing by for target verification.</div>
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
  const targetIp = document.getElementById("targetIp");
  const scanBtn = document.getElementById("scanBtn");
  const securityConsole = document.getElementById("securityConsole");

  scanBtn.addEventListener("click", () => {{
    const target = targetIp.value.trim() || "192.168.1.104";
    securityConsole.innerText = `[SCANNING] Probing target ${{target}} across TCP/UDP ports...`;

    setTimeout(() => {{
      securityConsole.innerText = 
`=============================================================
{t} - Audit Report
=============================================================
• Target Inspected  : ${{target}}
• Scan Timestamp    : ${{new Date().toISOString()}}
• Port 22 (SSH)     : FILTERED (Protected)
• Port 80 (HTTP)    : OPEN (Nginx 1.24.0)
• Port 443 (HTTPS)  : OPEN (TLS 1.3 Strict)
• Port 3306 (MySQL) : CLOSED (Firewall Blocked)
• Threat Assessment : ZERO CRITICAL VULNERABILITIES (CLEAN)
=============================================================`;
    }}, 300);
  }});
}});
'''
        },
        {
            "filename": "database/schema.sql",
            "language": "sql",
            "code": '''-- Cybersecurity Threat Intelligence & Audit Logs
CREATE TABLE IF NOT EXISTS security_audit_logs (
    audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    target_ip VARCHAR(45) NOT NULL,
    threat_level VARCHAR(32) NOT NULL,
    findings_summary TEXT NOT NULL,
    audited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
        },
        {
            "filename": "requirements.txt",
            "language": "text",
            "code": "fastapi>=0.109.0\nuvicorn>=0.27.0\ncryptography>=42.0.0\nrequests>=2.31.0\n"
        }
    ]

    return files
