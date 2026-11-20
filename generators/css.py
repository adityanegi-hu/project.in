"""
Project stylesheet generator.
Generates responsive glassmorphism styles with custom domain color palettes.
"""

from typing import Dict


THEME_PALETTES: Dict[str, Dict[str, str]] = {
    "ai-ml": {"primary": "#8b5cf6", "secondary": "#a78bfa", "glow": "rgba(139, 92, 246, 0.25)"},
    "web-dev": {"primary": "#6366f1", "secondary": "#818cf8", "glow": "rgba(99, 102, 241, 0.25)"},
    "c-cpp": {"primary": "#10b981", "secondary": "#34d399", "glow": "rgba(16, 185, 129, 0.25)"},
    "python-data": {"primary": "#3b82f6", "secondary": "#60a5fa", "glow": "rgba(59, 130, 246, 0.25)"},
    "iot-embedded": {"primary": "#f59e0b", "secondary": "#fbbf24", "glow": "rgba(245, 158, 11, 0.25)"},
    "java": {"primary": "#ea580c", "secondary": "#fb923c", "glow": "rgba(234, 88, 12, 0.25)"},
    "mobile": {"primary": "#ec4899", "secondary": "#f472b6", "glow": "rgba(236, 72, 153, 0.25)"},
    "blockchain": {"primary": "#a855f7", "secondary": "#c084fc", "glow": "rgba(168, 85, 247, 0.25)"},
    "cybersecurity": {"primary": "#ef4444", "secondary": "#f87171", "glow": "rgba(239, 68, 68, 0.25)"}
}

def generate_project_css(proj):
    t = proj["title"]
    cat = proj["category"]
    color = proj.get("color", "#6366f1")

    theme_palettes = {
        "ai-ml": {"primary": "#8b5cf6", "secondary": "#a78bfa", "glow": "rgba(139, 92, 246, 0.25)"},
        "web-dev": {"primary": "#6366f1", "secondary": "#818cf8", "glow": "rgba(99, 102, 241, 0.25)"},
        "c-cpp": {"primary": "#10b981", "secondary": "#34d399", "glow": "rgba(16, 185, 129, 0.25)"},
        "python-data": {"primary": "#3b82f6", "secondary": "#60a5fa", "glow": "rgba(59, 130, 246, 0.25)"},
        "iot-embedded": {"primary": "#f59e0b", "secondary": "#fbbf24", "glow": "rgba(245, 158, 11, 0.25)"},
        "java": {"primary": "#ea580c", "secondary": "#fb923c", "glow": "rgba(234, 88, 12, 0.25)"},
        "mobile": {"primary": "#ec4899", "secondary": "#f472b6", "glow": "rgba(236, 72, 153, 0.25)"},
        "blockchain": {"primary": "#a855f7", "secondary": "#c084fc", "glow": "rgba(168, 85, 247, 0.25)"},
        "cybersecurity": {"primary": "#ef4444", "secondary": "#f87171", "glow": "rgba(239, 68, 68, 0.25)"}
    }

    palette = theme_palettes.get(cat, {"primary": color, "secondary": color, "glow": "rgba(99, 102, 241, 0.25)"})
    p_col = palette["primary"]
    s_col = palette["secondary"]
    g_col = palette["glow"]

    return f"""/* ===================================================================
   {t} - Stylesheet
   Domain: {proj['categoryLabel']} | Academic Year: {proj['yearLabel']}
   =================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {{
  --theme-primary: {p_col};
  --theme-secondary: {s_col};
  --theme-glow: {g_col};
  --bg-main: #0a0e1a;
  --bg-card: rgba(17, 24, 39, 0.85);
  --border-color: rgba(255, 255, 255, 0.1);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}}

* {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}}

body {{
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: var(--bg-main);
  color: var(--text-main);
  line-height: 1.6;
  min-height: 100vh;
  padding: 2rem 1rem;
}}

.container {{
  max-width: 1000px;
  margin: 0 auto;
}}

header {{
  text-align: center;
  margin-bottom: 2rem;
}}

header h1, header h2 {{
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
}}

.badge {{
  display: inline-block;
  background: var(--theme-glow);
  color: var(--theme-secondary);
  border: 1px solid var(--theme-primary);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
}}

.card {{
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 1.5rem;
}}

.form-group {{
  margin-bottom: 1.25rem;
  display: flex;
  gap: 0.75rem;
}}

input, select, textarea {{
  flex: 1;
  background: #1e293b;
  border: 1px solid var(--border-color);
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
}}

input:focus, select:focus, textarea:focus {{
  outline: none;
  border-color: var(--theme-primary);
  box-shadow: 0 0 10px var(--theme-glow);
}}

.btn {{
  background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary));
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}}

.btn:hover {{
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--theme-glow);
}}

.output-box {{
  background: #0f172a;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  min-height: 80px;
  color: #38bdf8;
  white-space: pre-wrap;
  word-break: break-all;
}}
"""
