/**
 * ProjectForge 1-Click Project Bundle Generator
 * Uses JSZip & FileSaver to package complete working source code, documentation,
 * customized PPT presentations, setup README, and viva cheat sheets into a single ZIP.
 */

class ProjectDownloader {
  constructor() {
    this.isGenerating = false;
  }

  async downloadProjectKit(project, customMeta = {}) {
    if (this.isGenerating) return;
    this.isGenerating = true;

    const collegeName = customMeta.collegeName || "Engineering Institute of Technology";
    const teamMembers = customMeta.teamMembers || "Student Developer Team";
    const guideName = customMeta.guideName || "Faculty Supervisor";

    window.app?.showToast(`Preparing ${project.title} package...`, "info");

    try {
      if (window.app && typeof window.app.getProjectFullDetails === "function") {
        project = await window.app.getProjectFullDetails(project);
      }

      if (typeof JSZip === "undefined") {
        throw new Error("JSZip library not loaded.");
      }

      const zip = new JSZip();
      const folderName = `${project.id}-${project.title.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}`;
      const root = zip.folder(folderName);

      // 1. Add Source Code Files
      const srcFolder = root.folder("src");
      if (project.codeFiles && project.codeFiles.length > 0) {
        project.codeFiles.forEach(file => {
          srcFolder.file(file.filename, file.code);
        });
      } else {
        srcFolder.file("main.py", "# Working source code entrypoint\nprint('Project initialized successfully')\n");
      }

      // 2. Add Project Synopsis & IEEE Documentation
      const docFolder = root.folder("documentation");
      const synopsisContent = this.generateSynopsisMarkdown(project, { collegeName, teamMembers, guideName });
      docFolder.file("Project_Synopsis_and_Report.md", synopsisContent);
      docFolder.file("System_Architecture_Specifications.txt", this.generateSpecsDoc(project));

      // 3. Add Viva Voce Defense Prep Cheat Sheet
      const vivaFolder = root.folder("viva_defense_prep");
      vivaFolder.file("Viva_Voce_Questions_and_Answers.md", this.generateVivaMarkdown(project));

      // 4. Add Interactive HTML Presentation Slides (Open in Browser / Print to PDF / PPT)
      const presentationFolder = root.folder("presentation");
      const slidesHTML = this.generateSlidesHTML(project, { collegeName, teamMembers, guideName });
      presentationFolder.file("Project_Defense_Presentation.html", slidesHTML);
      presentationFolder.file("Slide_Deck_Speaker_Notes.txt", this.generateSpeakerNotes(project));

      // 5. Add Root README.md
      const readmeContent = this.generateReadme(project, { collegeName, teamMembers, guideName });
      root.file("README.md", readmeContent);

      // Generate the ZIP blob
      const content = await zip.generateAsync({ type: "blob" });
      const filename = `${project.title.substring(0, 30).replace(/[^a-zA-Z0-9]/g, "_")}_Full_Kit.zip`;

      if (typeof saveAs !== "undefined") {
        saveAs(content, filename);
      } else {
        const downloadUrl = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      }

      // Trigger Confetti Celebration!
      this.triggerConfetti();

      window.app?.showToast(`🎉 Download Complete: ${project.title} Full Kit!`, "success");
    } catch (err) {
      console.error("Failed to generate zip:", err);
      window.app?.showToast(`Download failed: ${err.message}`, "error");
    } finally {
      this.isGenerating = false;
    }
  }

  generateSynopsisMarkdown(project, meta) {
    const syn = project.synopsis || {};
    const objectives = syn.objectives || ["Implement core system logic", "Test and validate modules"];
    const issues = syn.existingSystemIssues || ["Manual latency", "Lack of automated reporting"];
    const advs = syn.proposedSystemAdvantages || ["Automated workflow", "Verified IEEE documentation"];
    const reqs = syn.systemRequirements || { hardware: "Standard PC / 8GB RAM", software: "Modern Web/IDE" };
    const techStr = Array.isArray(project.techStack) ? project.techStack.join(", ") : "Modern Technologies";

    return `# PROJECT SYNOPSIS & ACADEMIC REPORT
## ${project.title.toUpperCase()}

---
**Institution:** ${meta.collegeName}  
**Submitted By:** ${meta.teamMembers}  
**Project Guide / Supervisor:** ${meta.guideName}  
**Academic Category:** ${project.categoryLabel || 'Engineering'} (${project.yearLabel || ''} • ${project.difficulty || 'Medium'})  
**Tech Stack:** ${techStr}  
**Date of Submission:** ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}  

---

### 1. ABSTRACT
${syn.abstract || project.tagline || 'Academic project report.'}

### 2. OBJECTIVES & SCOPE
${objectives.map((obj, i) => `${i + 1}. ${obj}`).join("\n")}

### 3. EXISTING SYSTEM & IDENTIFIED DRAWBACKS
${issues.map(issue => `- ${issue}`).join("\n")}

### 4. PROPOSED SYSTEM & NOVEL CONTRIBUTIONS
${advs.map(adv => `+ ${adv}`).join("\n")}

### 5. HARDWARE & SOFTWARE REQUIREMENTS
- **Hardware:** ${reqs.hardware}
- **Software:** ${reqs.software}

### 6. METHODOLOGY & MODULES BREAKDOWN
The solution is developed across modular phases:
1. Data Ingestion & Sanitization Layer
2. Core Processing / Machine Learning Model Pipeline
3. API Routing and Controller Endpoints
4. Frontend Dashboard and Presentation View

---
*Report generated via ProjectForge Student Hub.*
`;
  }

  generateSpecsDoc(project) {
    const syn = project.synopsis || {};
    const reqs = syn.systemRequirements || { hardware: "Standard PC / 8GB RAM", software: "Modern Web" };
    return `PROJECT ARCHITECTURE & SPECIFICATIONS
Project ID: ${project.id}
Title: ${project.title}
Difficulty: ${project.difficulty || 'Medium'}

Hardware Requirement: ${reqs.hardware}
Software Stack: ${reqs.software}

Modules:
- Frontend UI / Presentation
- Backend Processing / Model Engine
- Database / Data Pipeline
`;
  }

  generateVivaMarkdown(project) {
    const questions = project.vivaQuestions || [
      { question: `What is the primary motivation behind ${project.title}?`, answer: `The goal is to provide a clean automated solution.` }
    ];
    return `# VIVA-VOCE DEFENSE CHEAT SHEET
## Key External Examiner Questions & Model Answers for ${project.title}

${questions.map((q, idx) => `
### Q${idx + 1}. ${q.question}
**Model Answer:**
> ${q.answer}
`).join("\n---\n")}

### General Examiner Defense Tips:
1. Clearly explain why your chosen algorithm/framework is superior to existing traditional approaches.
2. If asked about model limitations, acknowledge real-world constraints (e.g. edge compute or dataset bias) and explain your future scope mitigation plan.
3. Be ready to explain the mathematical loss function or database schema choices.
`;
  }

  generateSpeakerNotes(project) {
    const slides = project.slides || [];
    return slides.map(s => `SLIDE ${s.slideNumber}: ${s.title}\nSpeaker Notes:\n${s.speakerNotes || s.notes || "Explain slide objectives and core technical decisions."}\n----------------------------------------\n`).join("\n");
  }

  generateSlidesHTML(project, meta) {
    const slides = project.slides || [
      { slideNumber: 1, type: "title", title: project.title, subtitle: `Academic Defense - ${project.yearLabel || ''}`, bullets: [] }
    ];
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${project.title} - Defense Presentation</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b0f19; color: #f8fafc; margin: 0; padding: 2rem; }
    .slide-page { background: #111827; border: 1px solid #374151; border-radius: 12px; max-width: 900px; margin: 0 auto 2rem; padding: 2.5rem; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .slide-num { font-size: 0.75rem; color: #818cf8; font-weight: bold; text-transform: uppercase; margin-bottom: 0.5rem; }
    h1, h2 { color: #ffffff; margin-top: 0; }
    h2 { font-size: 1.6rem; border-bottom: 2px solid #4f46e5; padding-bottom: 0.5rem; }
    ul { font-size: 1.1rem; line-height: 1.8; color: #e5e7eb; }
    .meta-box { background: #1e293b; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; }
    .notes-box { margin-top: 1.5rem; padding: 0.8rem; background: #27272a; border-left: 4px solid #f59e0b; font-size: 0.85rem; color: #d4d4d8; }
    @media print { body { background: #fff; color: #000; padding: 0; } .slide-page { page-break-after: always; border: none; box-shadow: none; } }
  </style>
</head>
<body>
  ${slides.map(s => `
    <div class="slide-page">
      <div class="slide-num">Slide ${s.slideNumber} of ${slides.length}</div>
      <h2>${s.title}</h2>
      <p style="color: #9ca3af; font-size: 1rem; margin-top: -0.25rem;">${s.subtitle || ""}</p>
      ${s.type === 'title' ? `
        <div class="meta-box">
          <div><strong>Institution:</strong> ${meta.collegeName}</div>
          <div><strong>Team Members:</strong> ${meta.teamMembers}</div>
          <div><strong>Guide:</strong> ${meta.guideName}</div>
        </div>
      ` : ''}
      <ul>
        ${(s.bullets || []).map(b => `<li>${b}</li>`).join("")}
      </ul>
      <div class="notes-box">
        <strong>💡 Examiner Defense Note:</strong> ${s.speakerNotes || s.notes || "Be prepared to answer examiner defense queries on this section."}
      </div>
    </div>
  `).join("")}
</body>
</html>`;
  }

  generateReadme(project, meta) {
    const syn = project.synopsis || {};
    const reqs = syn.systemRequirements || { hardware: "Standard PC / 8GB RAM", software: "Modern Web/IDE" };
    return `# ${project.title}

> **Academic Project Submission Kit**  
> Prepared for: **${meta.collegeName}**  
> Team: **${meta.teamMembers}** | Guide: **${meta.guideName}**  

---

## 📦 What's Included in this Bundle
- 📁 \`src/\`: Complete working source code.
- 📄 \`documentation/\`: Full Project Synopsis & IEEE-format Report.
- 📊 \`presentation/\`: Interactive Presentation Slides (.html) ready for screen sharing or printing.
- 🎓 \`viva_defense_prep/\`: Top examiner viva questions with model answers.

---

## 🚀 Step-by-Step Setup & Execution

### Prerequisites
- ${reqs.software}
- Hardware: ${reqs.hardware}

### Installation Steps
1. Navigate to \`src/\` folder.
2. Install necessary project packages according to \`requirements.txt\` or \`package.json\`.
3. Launch the project according to the specific framework instructions in \`src/\`.

---
© ${new Date().getFullYear()} ProjectForge Academic Repository. All rights reserved.
`;
  }

  triggerConfetti() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }
}

// Global Downloader Instance
window.projectDownloader = new ProjectDownloader();
