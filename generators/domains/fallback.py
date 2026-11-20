"""
Default fallback project code template generator.
Provides starter FastAPI backend and basic HTML5 client for generic projects.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_fallback_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates default starter files when no domain-specific generator matches."""
    t = proj["title"]
    cat = proj.get("category", "general")
    tech = proj.get("techStack", ["Python", "Web"])
    tech_str = ", ".join(tech)
    y_lbl = proj.get("yearLabel", "Capstone")
    degs = ", ".join(proj.get("degrees", ["B.Tech"]))

    files = [
        {
            "filename": "backend/app.py",
            "language": "python",
            "code": f"from fastapi import FastAPI\napp = FastAPI(title='{t}')\n@app.get('/')\ndef index(): return {{'status': 'online', 'project': '{t}'}}"
        },
        {
            "filename": "frontend/index.html",
            "language": "html",
            "code": f"<!DOCTYPE html><html><head><title>{t}</title><link rel='stylesheet' href='styles.css'></head><body><h1>{t}</h1><script src='app.js'></script></body></html>"
        },
        {
            "filename": "frontend/app.js",
            "language": "javascript",
            "code": "console.log('Project loaded');"
        }
    ]

    return files
