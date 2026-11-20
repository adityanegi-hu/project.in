"""
Mobile Flutter project code template generator.
Includes Flutter Dart cross-platform mobile client, pubspec.yaml, preview dashboard, and schema.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_mobile_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates Mobile Flutter source code files."""
    t = proj["title"]
    cat = proj["category"]
    tech = proj["techStack"]
    tech_str = ", ".join(tech)
    y_lbl = proj["yearLabel"]
    degs = ", ".join(proj["degrees"])

    files = [
        {
            "filename": "lib/main.dart",
            "language": "dart",
            "code": f'''// ===================================================================
// {t} - Flutter Application
// ===================================================================
import 'package:flutter/material.dart';

void main() => runApp(const MobileProjectApp());

class MobileProjectApp extends StatelessWidget {{
  const MobileProjectApp({{super.key}});

  @override
  Widget build(BuildContext context) {{
    return MaterialApp(
      title: "{t}",
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.pink, brightness: Brightness.dark),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }}
}}

class HomeScreen extends StatefulWidget {{
  const HomeScreen({{super.key}});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}}

class _HomeScreenState extends State<HomeScreen> {{
  int _counter = 0;

  @override
  Widget build(BuildContext context) {{
    return Scaffold(
      appBar: AppBar(title: const Text("{t}")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text("Interactive Mobile State Counter", style: TextStyle(fontSize: 18)),
            Text("$_counter", style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => _counter++),
        child: const Icon(Icons.add),
      ),
    );
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
  <title>{t} - Flutter Preview</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>📱 {t}</h1>
      <p class="badge">{y_lbl} • {degs}</p>
    </header>

    <div class="card" style="max-width: 400px; margin: 0 auto; text-align: center;">
      <h3 style="margin-bottom: 1rem;">Mobile App Simulator</h3>
      <div style="background: #0f172a; padding: 2rem; border-radius: 24px; border: 2px solid var(--border-color);">
        <p style="color: var(--text-muted);">Active Counter Value</p>
        <h1 id="mobileCounter" style="font-size: 3.5rem; color: #ec4899; margin: 1rem 0;">0</h1>
        <button id="incrementMobileBtn" class="btn" style="width: 100%;">Tap to Increment (+)</button>
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
  let count = 0;
  const mobileCounter = document.getElementById("mobileCounter");
  const incrementMobileBtn = document.getElementById("incrementMobileBtn");

  incrementMobileBtn.addEventListener("click", () => {{
    count++;
    mobileCounter.innerText = count;
  }});
}});
'''
        },
        {
            "filename": "database/schema.sql",
            "language": "sql",
            "code": '''-- Flutter Mobile Local SQLite Schema
CREATE TABLE IF NOT EXISTS local_cache (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    key_name VARCHAR(64) UNIQUE NOT NULL,
    json_value TEXT NOT NULL,
    synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
        },
        {
            "filename": "pubspec.yaml",
            "language": "yaml",
            "code": f'''name: mobile_project
description: "{t}"
version: 1.0.0+1
environment:
  sdk: '>=3.0.0 <4.0.0'
dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.1
'''
        }
    ]

    return files
