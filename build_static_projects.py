"""
ForgeProject - Static SEO & AdSense Compliant Project Page Generator
Generates:
1. 450 static, fully readable HTML project pages in /projects/{id}.html
2. 1 master index directory in /projects/index.html
3. 1 complete sitemap.xml with all 456 URLs
"""

import json
import os
import html
import xml.etree.ElementTree as ET
from xml.dom import minidom

def load_data():
    summary_path = os.path.join("js", "data-summary.js")
    details_path = os.path.join("js", "data-details.json")

    with open(summary_path, "r", encoding="utf-8") as f:
        text = f.read()
    
    start = text.find("[")
    end = text.find("];\n\nconst DOMAINS_LIST") + 1
    projects = json.loads(text[start:end])

    with open(details_path, "r", encoding="utf-8") as f:
        details = json.load(f)

    return projects, details

def generate_project_page(p, d, all_projects):
    proj_id = p["id"]
    title = html.escape(p["title"])
    tagline = html.escape(p["tagline"])
    category = html.escape(p.get("category", "engineering"))
    cat_label = html.escape(p.get("categoryLabel", "Engineering"))
    difficulty = html.escape(p.get("difficulty", "Medium"))
    year_label = html.escape(p.get("yearLabel", "Year Capstone"))
    degrees = [html.escape(deg) for deg in p.get("degrees", [])]
    tech_stack = [html.escape(t) for t in p.get("techStack", [])]

    synopsis = d.get("synopsis", {})
    abstract = html.escape(synopsis.get("abstract", tagline))
    
    objectives = synopsis.get("objectives", [])
    if isinstance(objectives, list):
        objectives_html = "".join([f"<li>{html.escape(str(obj))}</li>" for obj in objectives])
    else:
        objectives_html = f"<li>{html.escape(str(objectives))}</li>"

    issues = synopsis.get("existingSystemIssues", "Legacy systems often lack real-time responsiveness, comprehensive architectural modularity, and reproducible automated workflows.")
    if isinstance(issues, list):
        issues_html = "".join([f"<li>{html.escape(str(iss))}</li>" for iss in issues])
    else:
        issues_html = f"<p>{html.escape(str(issues))}</p>"

    advantages = synopsis.get("proposedSystemAdvantages", "Provides a modular, production-ready blueprint with modern library dependencies, clean separation of concerns, and robust unit-testable components.")
    if isinstance(advantages, list):
        advantages_html = "".join([f"<li>{html.escape(str(adv))}</li>" for adv in advantages])
    else:
        advantages_html = f"<p>{html.escape(str(advantages))}</p>"

    sys_reqs = synopsis.get("systemRequirements", {})
    hw_req = html.escape(sys_reqs.get("hardware", "Standard PC / Laptop with 4GB+ RAM (8GB recommended for ML/IoT)"))
    sw_req = html.escape(sys_reqs.get("software", f"{', '.join(tech_stack)} runtime environment with modern web browser / terminal IDE"))

    # Code Files
    code_files = d.get("codeFiles", [])
    manifest_items = []
    primary_code_snippet = ""
    primary_file_name = ""
    for idx, cf in enumerate(code_files):
        cf_name = html.escape(cf.get("filename", f"file_{idx}"))
        cf_lang = html.escape(cf.get("language", "text"))
        manifest_items.append(f"""
        <div class="file-manifest-item">
          <div class="file-name-group">
            <i data-lucide="file-code" style="width: 16px; height: 16px; color: var(--accent-secondary);"></i>
            <span>{cf_name}</span>
          </div>
          <span class="file-lang-badge">{cf_lang}</span>
        </div>
        """)
        if idx == 0:
            primary_file_name = cf_name
            code_text = cf.get("code", "")
            # Take up to first 80 lines for preview
            lines = code_text.splitlines()[:80]
            primary_code_snippet = html.escape("\n".join(lines))
    manifest_html = "".join(manifest_items)

    # Viva Questions
    viva_questions = d.get("vivaQuestions", [])
    viva_cards = []
    for idx, vq in enumerate(viva_questions, 1):
        q_text = html.escape(vq.get("question", ""))
        a_text = html.escape(vq.get("answer", ""))
        viva_cards.append(f"""
        <div class="viva-card">
          <div class="viva-question">
            <span class="viva-question-num">Q{idx}.</span>
            <span>{q_text}</span>
          </div>
          <p class="viva-answer">{a_text}</p>
        </div>
        """)
    viva_html = "".join(viva_cards)

    # Slides Outline
    slides = d.get("slides", [])
    slide_cards = []
    for idx, s in enumerate(slides, 1):
        s_title = html.escape(s.get("title", f"Slide {idx}"))
        s_notes = html.escape(s.get("notes", ""))
        s_points = s.get("points", [])
        points_summary = html.escape(", ".join(s_points[:2])) if s_points else s_notes[:100]
        slide_cards.append(f"""
        <div class="slide-mini-card">
          <div class="slide-mini-header">
            <span>SLIDE {idx:02d}</span>
            <i data-lucide="monitor" style="width: 14px; height: 14px;"></i>
          </div>
          <div class="slide-mini-title">{s_title}</div>
          <p class="slide-mini-desc">{points_summary}</p>
        </div>
        """)
    slides_html = "".join(slide_cards)

    # Related Projects (same category, different id)
    cat_projs = [proj for proj in all_projects if proj.get("category") == p.get("category") and proj["id"] != proj_id][:3]
    related_cards = []
    for rp in cat_projs:
        rp_title = html.escape(rp["title"])
        rp_tag = html.escape(rp["tagline"])
        rp_diff = html.escape(rp.get("difficulty", "Medium"))
        related_cards.append(f"""
        <a href="{rp['id']}.html" class="related-card">
          <div>
            <div class="related-title">{rp_title}</div>
            <p class="related-tagline">{rp_tag}</p>
          </div>
          <div class="related-footer">
            <span>{rp_diff}</span>
            <span>Explore Blueprint →</span>
          </div>
        </a>
        """)
    related_html = "".join(related_cards)

    # JSON-LD Schema
    schema_json = json.dumps({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "TechArticle",
                "@id": f"https://forgeproject.tech/projects/{proj_id}.html#article",
                "headline": p["title"],
                "description": p["tagline"],
                "inLanguage": "en",
                "url": f"https://forgeproject.tech/projects/{proj_id}.html",
                "publisher": {
                    "@type": "Organization",
                    "name": "ForgeProject",
                    "url": "https://forgeproject.tech/",
                    "logo": "https://forgeproject.tech/og-banner.png"
                },
                "author": {
                    "@type": "Organization",
                    "name": "ForgeProject Engineering Research Lab"
                },
                "proficiencyLevel": difficulty,
                "keywords": ", ".join(p.get("techStack", []) + [p.get("categoryLabel", "")]),
                "articleBody": abstract
            },
            {
                "@type": "SoftwareSourceCode",
                "@id": f"https://forgeproject.tech/projects/{proj_id}.html#software",
                "name": p["title"],
                "programmingLanguage": p.get("techStack", ["General"])[0],
                "description": p["tagline"],
                "codeRepository": "https://github.com/adityanegi-hu/project.in"
            }
        ]
    }, indent=2)

    page_html = f"""<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <meta name="theme-color" content="#0a0e1a">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-CZX1KYVMT3"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-CZX1KYVMT3');
  </script>

  <title>{title} - Architecture, Source Code & Viva Defense | ForgeProject</title>
  <meta name="description"
    content="{tagline} Complete verified open-source engineering blueprint including architecture overview, tech stack, system requirements, and viva defense Q&A.">
  <link rel="canonical" href="https://forgeproject.tech/projects/{proj_id}.html">
  <meta name="robots" content="index, follow">
  <meta name="google-adsense-account" content="ca-pub-7748523184523238">
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7748523184523238"
    crossorigin="anonymous"></script>

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="{title} - Engineering Architecture | ForgeProject">
  <meta property="og:description" content="{tagline}">
  <meta property="og:url" content="https://forgeproject.tech/projects/{proj_id}.html">
  <meta property="og:site_name" content="ForgeProject">
  <meta property="og:image" content="https://forgeproject.tech/og-banner.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title} - Architecture Blueprint">
  <meta name="twitter:description" content="{tagline}">
  <meta name="twitter:image" content="https://forgeproject.tech/og-banner.png">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
{schema_json}
  </script>

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml"
    href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'%3E%3Cpolygon points='12 2 2 7 12 12 22 7 12 2'/%3E%3Cpolyline points='2 17 12 22 22 17'/%3E%3Cpolyline points='2 12 12 17 22 12'/%3E%3C/svg%3E">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="../css/styles.css?v=34.2">
  <link rel="stylesheet" href="../css/legal.css?v=34.2">
  <link rel="stylesheet" href="../css/project-page.css?v=1.0">

  <!-- Lucide Icons -->
  <script defer src="https://unpkg.com/lucide@latest"></script>
</head>

<body>
  <!-- Header -->
  <header class="pyq-header font-excalifont">
    <div class="pyq-header-inner">
      <div class="pyq-logo-group">
        <a href="../index.html" class="pyq-logo-link">
          <span class="pyq-logo-title">Forge<span class="pyq-logo-accent">Project</span></span>
          <span class="pyq-logo-sub">Engineering Reference Architectures & Open-Source Code</span>
        </a>
      </div>

      <div class="pyq-header-right">
        <nav class="pyq-nav-links">
          <a href="../index.html" class="pyq-nav-link">Catalog Explorer</a>
          <a href="index.html" class="pyq-nav-link" style="color: var(--accent-secondary); font-weight: 600;">HTML Index</a>
          <a href="../about.html" class="pyq-nav-link">About</a>
          <a href="../contact.html" class="pyq-nav-link">Contact</a>
          <a href="../terms.html" class="pyq-nav-link">Honor Code</a>
        </nav>
      </div>
    </div>
  </header>

  <!-- Main Content Container -->
  <main class="project-page-container">
    <!-- Breadcrumb Navigation -->
    <nav class="project-breadcrumb" aria-label="breadcrumb">
      <a href="../index.html"><i data-lucide="home" style="width: 14px; height: 14px; vertical-align: middle;"></i> Home</a>
      <span class="crumb-sep">/</span>
      <a href="index.html">Projects</a>
      <span class="crumb-sep">/</span>
      <a href="../index.html#/{category}">{cat_label}</a>
      <span class="crumb-sep">/</span>
      <span class="current">{title}</span>
    </nav>

    <!-- Project Hero Header Card -->
    <header class="project-hero">
      <div class="project-meta-badges">
        <span class="p-badge p-badge-domain"><i data-lucide="layers" style="width: 13px; height: 13px;"></i> {cat_label}</span>
        <span class="p-badge p-badge-difficulty {difficulty}"><i data-lucide="gauge" style="width: 13px; height: 13px;"></i> {difficulty}</span>
        <span class="p-badge"><i data-lucide="calendar" style="width: 13px; height: 13px;"></i> {year_label}</span>
        <span class="p-badge"><i data-lucide="graduation-cap" style="width: 13px; height: 13px;"></i> {', '.join(degrees)}</span>
      </div>

      <h1 class="project-hero-title">{title}</h1>
      <p class="project-hero-tagline">{tagline}</p>

      <div class="project-tech-pills">
        {''.join([f'<span class="tech-pill">{t}</span>' for t in tech_stack])}
      </div>

      <div class="project-action-bar">
        <a href="../index.html#/{proj_id}" class="btn-launch">
          <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i> Launch Interactive Studio & Viewer
        </a>
        <a href="#architecture" class="btn-anchor">
          <i data-lucide="book-open" style="width: 16px; height: 16px;"></i> Architecture
        </a>
        <a href="#specs" class="btn-anchor">
          <i data-lucide="cpu" style="width: 16px; height: 16px;"></i> Specifications
        </a>
        <a href="#code" class="btn-anchor">
          <i data-lucide="code" style="width: 16px; height: 16px;"></i> Source Code
        </a>
        <a href="#viva" class="btn-anchor">
          <i data-lucide="help-circle" style="width: 16px; height: 16px;"></i> Viva Defense
        </a>
      </div>
    </header>

    <!-- Section 1: Executive Summary & Abstract -->
    <section class="project-section" id="architecture">
      <h2><i data-lucide="file-text" style="color: var(--accent-primary);"></i> 1. Executive Summary & Architecture Overview</h2>
      <p>{abstract}</p>
    </section>

    <!-- Section 2: Key Engineering Objectives -->
    <section class="project-section">
      <h2><i data-lucide="target" style="color: var(--accent-secondary);"></i> 2. Core Technical Objectives</h2>
      <ul>
        {objectives_html}
      </ul>
    </section>

    <!-- Section 3: Problem Statement & Existing System Challenges -->
    <section class="project-section">
      <h2><i data-lucide="alert-circle" style="color: var(--accent-rose);"></i> 3. Problem Statement & Bottlenecks in Prior Art</h2>
      {issues_html if isinstance(synopsis.get("existingSystemIssues"), str) else f"<ul>{issues_html}</ul>"}
    </section>

    <!-- Section 4: Proposed Architecture & Key Technical Advantages -->
    <section class="project-section">
      <h2><i data-lucide="check-circle-2" style="color: var(--accent-emerald);"></i> 4. Proposed Architecture & Engineering Advantages</h2>
      {advantages_html if isinstance(synopsis.get("proposedSystemAdvantages"), str) else f"<ul>{advantages_html}</ul>"}
    </section>

    <!-- Section 5: System Specifications & Environment Requirements -->
    <section class="project-section" id="specs">
      <h2><i data-lucide="hard-drive" style="color: var(--accent-amber);"></i> 5. System Specifications & Deployment Requirements</h2>
      <div class="specs-grid">
        <div class="spec-box">
          <h4><i data-lucide="cpu" style="width: 16px; height: 16px;"></i> Hardware Configuration</h4>
          <p>{hw_req}</p>
        </div>
        <div class="spec-box">
          <h4><i data-lucide="terminal" style="width: 16px; height: 16px;"></i> Software & Runtime Environment</h4>
          <p>{sw_req}</p>
        </div>
        <div class="spec-box">
          <h4><i data-lucide="book-open" style="width: 16px; height: 16px;"></i> Target Engineering Disciplines</h4>
          <p>{', '.join(degrees)} • {year_label}</p>
        </div>
        <div class="spec-box">
          <h4><i data-lucide="activity" style="width: 16px; height: 16px;"></i> Implementation Complexity</h4>
          <p>{difficulty} Level Implementation</p>
        </div>
      </div>
    </section>

    <!-- Section 6: Source Code Architecture & File Manifest -->
    <section class="project-section" id="code">
      <h2><i data-lucide="folder-code" style="color: var(--accent-purple);"></i> 6. Source Code Architecture & Module Manifest</h2>
      <p>This project repository is organized into modular files designed for clean separation of concerns, high readability, and rapid local execution:</p>
      
      <div class="file-manifest-list">
        {manifest_html}
      </div>

      {"<!-- Primary Source Code Preview Block -->" if primary_code_snippet else ""}
      {f'''
      <div class="code-preview-block">
        <div class="code-header">
          <span>Primary Module: <strong>{primary_file_name}</strong></span>
          <span>Open-Source Implementation</span>
        </div>
        <pre><code>{primary_code_snippet}</code></pre>
      </div>
      ''' if primary_code_snippet else ""}
    </section>

    <!-- Section 7: Viva-Voce Technical Defense & Interview Preparation -->
    <section class="project-section" id="viva">
      <h2><i data-lucide="help-circle" style="color: var(--accent-secondary);"></i> 7. Viva-Voce Defense Q&A & Technical Discussion</h2>
      <p>Prepare for comprehensive technical reviews, capstone defenses, and engineering viva examinations with these examiner-curated questions and authoritative architectural answers:</p>
      
      <div class="viva-card-list">
        {viva_html}
      </div>
    </section>

    <!-- Section 8: Presentation Deck Outline -->
    <section class="project-section">
      <h2><i data-lucide="presentation" style="color: var(--accent-primary);"></i> 8. 10-Slide Architectural Presentation Outline</h2>
      <p>This project features a structured 10-slide architectural deck ready for interactive walkthroughs in the in-browser presentation studio:</p>
      <div class="slides-grid">
        {slides_html}
      </div>
    </section>

    <!-- Section 9: Academic Integrity & Fair-Use Notice -->
    <section class="project-section">
      <h2><i data-lucide="shield-check" style="color: var(--accent-emerald);"></i> 9. Academic Integrity & Educational Fair-Use Policy</h2>
      <div class="legal-callout-box callout-amber" style="margin-top: 0.5rem;">
        <div class="legal-callout-title">
          <i data-lucide="alert-triangle" style="width: 18px; height: 18px; color: var(--accent-amber);"></i>
          Educational Resource & Honor Code Notice
        </div>
        <p>
          This project architecture blueprint and its accompanying source implementations are provided strictly as <strong>open educational resources</strong> under the MIT License. They are intended for self-study, reference implementation, and viva interview rehearsal.
          <br><br>
          <strong>Notice:</strong> ForgeProject prohibits the uncredited or direct submission of these materials as original student coursework. Users are expected to study the architectural patterns, experiment with algorithms, and build original, independent solutions in accordance with institutional academic integrity policies.
        </p>
      </div>
    </section>

    <!-- Section 10: Related Projects in Same Domain -->
    <section class="project-section">
      <h2><i data-lucide="grid" style="color: var(--accent-secondary);"></i> 10. Related {cat_label} Project Blueprints</h2>
      <p>Explore other verified open-source engineering implementations in the same domain:</p>
      <div class="related-grid">
        {related_html}
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="pyq-footer">
    <div class="pyq-footer-inner">
      <div class="pyq-footer-grid">
        <div class="pyq-footer-col">
          <p class="footer-title">
            Maintained by <span class="font-excalifont footer-author">Aditya Negi</span>
          </p>
          <p class="footer-support">
            <a class="font-excalifont support-link" href="https://github.com/adityanegi-hu/project.in" target="_blank" rel="noopener noreferrer">
              Support our work 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          </p>
          <p class="footer-meta-desc">
            An open-source educational repository providing 450+ verified engineering reference architectures, technical presentation slides, system design case studies, and viva defense interview preparation.
          </p>
        </div>

        <div class="pyq-footer-col">
          <p class="footer-links-heading">Engineering Resources</p>
          <ul class="footer-links-list font-excalifont">
            <li><a href="index.html" class="footer-link">📚 All 450 Project Blueprints (HTML Index)</a></li>
            <li><a href="../index.html" class="footer-link">📦 Catalog Explorer</a></li>
            <li><a href="../about.html" class="footer-link">ℹ️ About ForgeProject</a></li>
            <li><a href="https://github.com/adityanegi-hu/project.in" target="_blank" rel="noopener noreferrer" class="footer-link">⭐ Star on GitHub</a></li>
          </ul>
        </div>

        <div class="pyq-footer-col">
          <p class="footer-links-heading">About & Policies</p>
          <ul class="footer-links-list font-excalifont">
            <li><a href="../about.html" class="footer-link">ℹ️ About Us</a></li>
            <li><a href="../contact.html" class="footer-link">📩 Contact Support</a></li>
            <li><a href="../privacy.html" class="footer-link">🔒 Privacy Policy</a></li>
            <li><a href="../terms.html" class="footer-link">📜 Terms of Service & Honor Code</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom-row">
        <p>Built for <span class="font-excalifont">Students & Engineers</span> • Academic Project Hub</p>
        <div class="footer-legal-links">
          <a href="../about.html">About Us</a>
          <span class="footer-legal-divider">•</span>
          <a href="../contact.html">Contact</a>
          <span class="footer-legal-divider">•</span>
          <a href="../privacy.html">Privacy Policy</a>
          <span class="footer-legal-divider">•</span>
          <a href="../terms.html">Terms</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener("DOMContentLoaded", () => {{
      if (window.lucide) {{
        window.lucide.createIcons();
      }}
    }});
  </script>
</body>

</html>"""
    return page_html

def generate_master_index(projects):
    # Group projects by category
    cats = {}
    for p in projects:
        c_label = p.get("categoryLabel", "Other")
        if c_label not in cats:
            cats[c_label] = []
        cats[c_label].append(p)

    cat_sections = []
    for c_label, projs in cats.items():
        proj_items = []
        for p in projs:
            p_id = p["id"]
            p_title = html.escape(p["title"])
            p_tag = html.escape(p["tagline"])
            p_diff = html.escape(p.get("difficulty", "Medium"))
            p_year = html.escape(p.get("yearLabel", "Year Capstone"))
            p_tech = ", ".join(p.get("techStack", []))
            proj_items.append(f"""
            <div class="file-manifest-item" style="padding: 1.2rem; display: block;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem; gap: 1rem;">
                <a href="{p_id}.html" style="font-size: 1.05rem; font-weight: 600; color: var(--text-primary); text-decoration: none;">{p_title}</a>
                <span class="p-badge p-badge-difficulty {p_diff}">{p_diff}</span>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.6rem; line-height: 1.5;">{p_tag}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); flex-wrap: wrap; gap: 0.5rem;">
                <span><strong>Stack:</strong> {p_tech}</span>
                <a href="{p_id}.html" style="color: var(--accent-secondary); font-weight: 500; text-decoration: none;">View Architecture & Viva Q&A →</a>
              </div>
            </div>
            """)
        cat_sections.append(f"""
        <section class="project-section" id="{projs[0].get('category', 'category')}">
          <h2><i data-lucide="folder" style="color: var(--folder-color);"></i> {html.escape(c_label)} ({len(projs)} Projects)</h2>
          <div class="file-manifest-list">
            {"".join(proj_items)}
          </div>
        </section>
        """)

    index_html = f"""<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <meta name="theme-color" content="#0a0e1a">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-CZX1KYVMT3"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-CZX1KYVMT3');
  </script>

  <title>All 450 Verified Engineering Projects & Architecture Blueprints | ForgeProject</title>
  <meta name="description"
    content="Complete directory of 450 verified open-source engineering projects, system architectures, source codes, and viva defense guides across 9 computer science and engineering disciplines.">
  <link rel="canonical" href="https://forgeproject.tech/projects/">
  <meta name="robots" content="index, follow">
  <meta name="google-adsense-account" content="ca-pub-7748523184523238">
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7748523184523238"
    crossorigin="anonymous"></script>

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="All 450 Verified Engineering Projects | ForgeProject">
  <meta property="og:description" content="Browse the complete index of 450 verified open-source engineering projects, system architectures, and viva defense guides across 9 domains.">
  <meta property="og:url" content="https://forgeproject.tech/projects/">
  <meta property="og:site_name" content="ForgeProject">
  <meta property="og:image" content="https://forgeproject.tech/og-banner.png">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml"
    href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'%3E%3Cpolygon points='12 2 2 7 12 12 22 7 12 2'/%3E%3Cpolyline points='2 17 12 22 22 17'/%3E%3Cpolyline points='2 12 12 17 22 12'/%3E%3C/svg%3E">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="../css/styles.css?v=34.2">
  <link rel="stylesheet" href="../css/legal.css?v=34.2">
  <link rel="stylesheet" href="../css/project-page.css?v=1.0">

  <!-- Lucide Icons -->
  <script defer src="https://unpkg.com/lucide@latest"></script>
</head>

<body>
  <!-- Header -->
  <header class="pyq-header font-excalifont">
    <div class="pyq-header-inner">
      <div class="pyq-logo-group">
        <a href="../index.html" class="pyq-logo-link">
          <span class="pyq-logo-title">Forge<span class="pyq-logo-accent">Project</span></span>
          <span class="pyq-logo-sub">Engineering Reference Architectures & Open-Source Code</span>
        </a>
      </div>

      <div class="pyq-header-right">
        <nav class="pyq-nav-links">
          <a href="../index.html" class="pyq-nav-link">Catalog Explorer</a>
          <a href="index.html" class="pyq-nav-link active" style="color: var(--accent-secondary); font-weight: 600;">HTML Index</a>
          <a href="../about.html" class="pyq-nav-link">About</a>
          <a href="../contact.html" class="pyq-nav-link">Contact</a>
          <a href="../terms.html" class="pyq-nav-link">Honor Code</a>
        </nav>
      </div>
    </div>
  </header>

  <main class="project-page-container">
    <div class="legal-header-hero" style="margin-bottom: 2rem;">
      <div class="legal-badge-pill">
        <i data-lucide="sparkles" style="width: 15px; height: 15px;"></i> Comprehensive Directory
      </div>
      <h1 class="legal-page-title">All 450 Verified Engineering Project Blueprints</h1>
      <p class="legal-page-subtitle">
        Explore complete architectural specifications, verified source code manifests, system requirements, and viva defense questions across 9 core engineering domains.
      </p>
      <div class="legal-meta-bar">
        <div class="legal-meta-item"><i data-lucide="code" style="width: 16px; height: 16px;"></i> 450 Projects</div>
        <div class="legal-meta-item"><i data-lucide="layers" style="width: 16px; height: 16px;"></i> 9 Technical Domains</div>
        <div class="legal-meta-item"><i data-lucide="shield-check" style="width: 16px; height: 16px;"></i> Open Educational Resources</div>
      </div>
    </div>

    <!-- Domain Sections -->
    {''.join(cat_sections)}
  </main>

  <!-- Footer -->
  <footer class="pyq-footer">
    <div class="pyq-footer-inner">
      <div class="pyq-footer-grid">
        <div class="pyq-footer-col">
          <p class="footer-title">Maintained by <span class="font-excalifont footer-author">Aditya Negi</span></p>
          <p class="footer-meta-desc">
            An open-source educational repository providing 450+ verified engineering reference architectures, technical presentation slides, system design case studies, and viva defense interview preparation.
          </p>
        </div>
        <div class="pyq-footer-col">
          <p class="footer-links-heading">Quick Links</p>
          <ul class="footer-links-list font-excalifont">
            <li><a href="../index.html" class="footer-link">🏠 Home Catalog</a></li>
            <li><a href="../about.html" class="footer-link">ℹ️ About Us</a></li>
            <li><a href="../contact.html" class="footer-link">📩 Contact</a></li>
            <li><a href="../terms.html" class="footer-link">📜 Terms & Honor Code</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener("DOMContentLoaded", () => {{
      if (window.lucide) {{
        window.lucide.createIcons();
      }}
    }});
  </script>
</body>

</html>"""
    return index_html

def update_sitemap(projects):
    root = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    # Static core pages
    core_pages = [
        ("https://forgeproject.tech/", "2026-09-16", "daily", "1.0"),
        ("https://forgeproject.tech/projects/", "2026-09-16", "daily", "0.9"),
        ("https://forgeproject.tech/about.html", "2026-09-16", "monthly", "0.8"),
        ("https://forgeproject.tech/contact.html", "2026-09-16", "monthly", "0.8"),
        ("https://forgeproject.tech/privacy.html", "2026-09-16", "monthly", "0.7"),
        ("https://forgeproject.tech/terms.html", "2026-09-16", "monthly", "0.7"),
    ]

    for loc_url, lastmod, changefreq, priority in core_pages:
        url_elem = ET.SubElement(root, "url")
        ET.SubElement(url_elem, "loc").text = loc_url
        ET.SubElement(url_elem, "lastmod").text = lastmod
        ET.SubElement(url_elem, "changefreq").text = changefreq
        ET.SubElement(url_elem, "priority").text = priority

    # All 450 projects
    for p in projects:
        url_elem = ET.SubElement(root, "url")
        ET.SubElement(url_elem, "loc").text = f"https://forgeproject.tech/projects/{p['id']}.html"
        ET.SubElement(url_elem, "lastmod").text = "2026-09-16"
        ET.SubElement(url_elem, "changefreq").text = "weekly"
        ET.SubElement(url_elem, "priority").text = "0.8"

    xml_bytes = ET.tostring(root, encoding="utf-8")
    parsed = minidom.parseString(xml_bytes)
    pretty_xml = parsed.toprettyxml(indent="  ", encoding="utf-8")

    with open("sitemap.xml", "wb") as f:
        f.write(pretty_xml)

def main():
    print("Loading project catalog data...")
    projects, details = load_data()
    print(f"Loaded {len(projects)} projects from summary and {len(details)} details.")

    projects_dir = "projects"
    os.makedirs(projects_dir, exist_ok=True)

    print("Generating 450 static project pages...")
    for idx, p in enumerate(projects, 1):
        p_id = p["id"]
        d = details.get(p_id, {})
        page_html = generate_project_page(p, d, projects)
        file_path = os.path.join(projects_dir, f"{p_id}.html")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(page_html)
        if idx % 50 == 0:
            print(f"Generated {idx}/{len(projects)} pages...")

    print("Generating master HTML directory index...")
    index_html = generate_master_index(projects)
    with open(os.path.join(projects_dir, "index.html"), "w", encoding="utf-8") as f:
        f.write(index_html)

    print("Updating sitemap.xml with all 456 URLs...")
    update_sitemap(projects)

    print("Static build completed successfully!")

if __name__ == "__main__":
    main()
