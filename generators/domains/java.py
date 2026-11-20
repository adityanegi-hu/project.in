"""
Java & Enterprise project code template generator.
Includes Spring Boot REST controller, Maven pom.xml, web client, and schema.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_java_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates Java Enterprise source code files."""
    t = proj["title"]
    cat = proj["category"]
    tech = proj["techStack"]
    tech_str = ", ".join(tech)
    y_lbl = proj["yearLabel"]
    degs = ", ".join(proj["degrees"])

    files = [
        {
            "filename": "src/main/java/com/projectforge/controller/ApiController.java",
            "language": "java",
            "code": f'''package com.projectforge.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/records")
@CrossOrigin(origins = "*")
public class ApiController {{

    private final List<Map<String, Object>> records = new ArrayList<>();

    public ApiController() {{
        Map<String, Object> r1 = new HashMap<>();
        r1.put("id", 101L);
        r1.put("name", "Enterprise Accounting & Ledger Module");
        r1.put("status", "ACTIVE");
        records.add(r1);
    }}

    @GetMapping
    public List<Map<String, Object>> getAllRecords() {{
        return records;
    }}

    @PostMapping
    public Map<String, Object> createRecord(@RequestBody Map<String, Object> payload) {{
        payload.put("id", System.currentTimeMillis());
        payload.put("status", "PROCESSED");
        records.add(payload);
        return payload;
    }}
}}
'''
        },
        {
            "filename": "frontend/index.html",
            "language": "html",
            "code": f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{t} - Enterprise Portal</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>☕ {t}</h1>
      <p class="badge">{y_lbl} • {degs}</p>
    </header>

    <div class="card">
      <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem;">
        <input type="text" id="recordName" placeholder="Enter record name...">
        <button id="addRecordBtn" class="btn">Register Record</button>
      </div>

      <div id="recordTable" class="output-box" style="color: #f8fafc;">Loading records...</div>
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
  const recordName = document.getElementById("recordName");
  const addRecordBtn = document.getElementById("addRecordBtn");
  const recordTable = document.getElementById("recordTable");

  let records = [
    {{ id: 101, name: "Enterprise Accounting & Ledger Module", status: "ACTIVE" }},
    {{ id: 102, name: "Department Payroll Batch Runner", status: "VERIFIED" }}
  ];

  function render() {{
    let text = "ID       RECORD NAME                               STATUS\\n";
    text += "--------------------------------------------------------\\n";
    records.forEach(r => {{
      text += `${{String(r.id).padEnd(9)}}${{r.name.padEnd(42)}}${{r.status}}\\n`;
    }});
    recordTable.innerText = text;
  }}

  addRecordBtn.addEventListener("click", () => {{
    const name = recordName.value.trim();
    if (!name) return alert("Enter record name");
    records.push({{ id: 100 + records.length + 1, name, status: "PROCESSED" }});
    recordName.value = "";
    render();
  }});

  render();
}});
'''
        },
        {
            "filename": "database/schema.sql",
            "language": "sql",
            "code": '''-- Java Spring Boot Enterprise Schema
CREATE TABLE IF NOT EXISTS enterprise_entities (
    entity_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    entity_name VARCHAR(128) NOT NULL,
    entity_status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
        },
        {
            "filename": "pom.xml",
            "language": "xml",
            "code": '''<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.projectforge</groupId>
  <artifactId>enterprise-app</artifactId>
  <version>1.0.0</version>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <version>3.2.0</version>
    </dependency>
  </dependencies>
</project>
'''
        }
    ]

    return files
