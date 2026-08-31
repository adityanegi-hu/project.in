/**
 * ProjectForge Interactive PPT Slide Deck Viewer
 * Renders slide presentations directly in the browser with live editing,
 * fullscreen presenter mode, slide navigation, and speaker notes.
 */

class PPTViewer {
  constructor() {
    this.currentProject = null;
    this.currentSlideIndex = 0;
    this.isFullscreen = false;
    this.customMetadata = {
      collegeName: "Engineering Institute of Technology",
      teamMembers: "Student Developer Team",
      guideName: "Faculty Project Supervisor"
    };

    this.initElements();
    this.initEventListeners();
  }

  initElements() {
    this.slideViewport = document.getElementById("pptSlideViewport");
    this.deckTitle = document.getElementById("pptDeckTitle");
    this.slideCounter = document.getElementById("slideCounter");
    this.prevBtn = document.getElementById("pptPrevBtn") || document.getElementById("prevSlideBtn");
    this.nextBtn = document.getElementById("pptNextBtn") || document.getElementById("nextSlideBtn");
    this.fullscreenBtn = document.getElementById("pptFullscreenBtn") || document.getElementById("fullscreenBtn");
    this.speakerNotesToggle = document.getElementById("pptNotesToggleBtn") || document.getElementById("speakerNotesToggle");
    this.speakerNotesContent = document.getElementById("speakerNotesText") || document.getElementById("speakerNotesContent");
    this.speakerNotesBox = document.getElementById("speakerNotesBox") || document.getElementById("speakerNotesPanel");
    this.slideProgressTrack = document.getElementById("slideProgressTrack");
    this.customizeBtn = document.getElementById("pptCustomizeBtn");
  }

  initEventListeners() {
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());
    this.fullscreenBtn?.addEventListener("click", () => this.toggleFullscreen());
    this.speakerNotesToggle?.addEventListener("click", () => this.toggleSpeakerNotes());
    this.customizeBtn?.addEventListener("click", () => {
      if (window.app) {
        window.app.closeProjectModal();
        window.app.openCustomizerModal(this.currentProject);
      }
    });

    // Keyboard Shortcuts (Arrow Left/Right, Space, Escape, F for Fullscreen)
    document.addEventListener("keydown", (e) => {
      const modal = document.getElementById("projectModal");
      if (!modal || !modal.classList.contains("open")) return;

      const activeTab = document.querySelector(".modal-tab-btn.active");
      if (activeTab && activeTab.getAttribute("data-tab") !== "ppt") return;

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        this.toggleFullscreen();
      }
    });
  }

  async loadProject(project) {
    if (!project) return;
    if (!project.slides && window.app && typeof window.app.getProjectFullDetails === "function") {
      project = await window.app.getProjectFullDetails(project);
    }
    this.currentProject = project;
    this.currentSlideIndex = 0;
    if (this.deckTitle) {
      this.deckTitle.innerHTML = `<i data-lucide="presentation"></i> ${project.title} - Defense Slides`;
    }
    this.renderSlide();
    this.renderProgressDots();
    if (window.lucide) window.lucide.createIcons();
  }

  setCustomMetadata(data) {
    this.customMetadata = { ...this.customMetadata, ...data };
    this.renderSlide();
  }

  renderProgressDots() {
    if (!this.currentProject || !this.slideProgressTrack) return;
    const slides = (this.currentProject.slides && this.currentProject.slides.length > 0)
      ? this.currentProject.slides
      : [{ title: "Title Slide" }];
    const totalSlides = slides.length;
    this.slideProgressTrack.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = `progress-dot ${i === this.currentSlideIndex ? "active" : ""}`;
      dot.title = `Slide ${i + 1}: ${slides[i]?.title || 'Slide'}`;
      dot.addEventListener("click", () => this.goToSlide(i));
      this.slideProgressTrack.appendChild(dot);
    }
  }

  renderSlide() {
    if (!this.currentProject || !this.slideViewport) return;
    const slides = (this.currentProject.slides && this.currentProject.slides.length > 0)
      ? this.currentProject.slides
      : [{
          slideNumber: 1,
          type: "title",
          title: this.currentProject.title || "Project Defense",
          subtitle: `Academic Defense - ${this.currentProject.yearLabel || ''}`,
          bullets: [this.currentProject.tagline || "Working Architecture"],
          speakerNotes: "Introduce the project team and objectives."
        }];

    if (this.currentSlideIndex >= slides.length) this.currentSlideIndex = 0;
    if (this.currentSlideIndex < 0) this.currentSlideIndex = 0;
    const slide = slides[this.currentSlideIndex] || slides[0];

    if (this.slideCounter) {
      this.slideCounter.innerText = `Slide ${this.currentSlideIndex + 1} / ${slides.length}`;
    }

    let slideHTML = "";

    // Render Slide based on type
    if (slide.type === "title") {
      slideHTML = `
        <div class="slide-canvas" style="border-top: 4px solid var(--accent-primary);">
          <div class="slide-badge-tag">SLIDE ${slide.slideNumber} • TITLE & DEFENSE</div>
          <div class="slide-header" style="margin-top: 1rem;">
            <div style="font-size: 0.85rem; text-transform: uppercase; color: var(--accent-secondary); font-weight: 700; margin-bottom: 0.4rem;">
              ${this.customMetadata.collegeName || "Engineering & Technology Institute"}
            </div>
            <h2 class="slide-heading">${slide.title}</h2>
            <p class="slide-subheading">${slide.subtitle || ''}</p>
          </div>
          <div class="slide-content-area">
            <div style="background: rgba(30, 41, 59, 0.6); padding: 1rem 1.25rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 1.25rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.88rem;">
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.75rem; text-transform: uppercase;">Team Members:</span>
                  <strong style="color: #f8fafc;">${this.customMetadata.teamMembers || "Student Team"}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.75rem; text-transform: uppercase;">Project Guide:</span>
                  <strong style="color: #f8fafc;">${this.customMetadata.guideName || "Project Supervisor"}</strong>
                </div>
              </div>
            </div>
            <ul class="slide-bullet-list">
              ${(slide.bullets || []).map(b => `
                <li class="slide-bullet-item">
                  <i data-lucide="check-circle-2" class="slide-bullet-icon"></i>
                  <span>${b}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      `;
    } else if (slide.type === "architecture" && slide.diagramSteps) {
      slideHTML = `
        <div class="slide-canvas" style="border-top: 4px solid var(--accent-secondary);">
          <div class="slide-badge-tag">SLIDE ${slide.slideNumber} • SYSTEM PIPELINE</div>
          <div class="slide-header">
            <h2 class="slide-heading">${slide.title}</h2>
            <p class="slide-subheading">${slide.subtitle || ''}</p>
          </div>
          <div class="slide-content-area">
            <div class="slide-flow-container">
              ${slide.diagramSteps.map((step, idx) => `
                <div class="slide-flow-node">
                  <div style="font-size: 0.7rem; color: var(--accent-secondary); margin-bottom: 0.2rem;">STAGE 0${idx + 1}</div>
                  <div>${step}</div>
                </div>
                ${idx < slide.diagramSteps.length - 1 ? `<div class="slide-flow-arrow">➔</div>` : ""}
              `).join("")}
            </div>
            <ul class="slide-bullet-list" style="margin-top: 1.5rem;">
              ${(slide.bullets || []).map(b => `
                <li class="slide-bullet-item">
                  <i data-lucide="chevron-right" class="slide-bullet-icon"></i>
                  <span>${b}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      `;
    } else {
      // Standard Bulleted Slide
      slideHTML = `
        <div class="slide-canvas" style="border-top: 4px solid ${this.currentProject.color || "var(--accent-primary)"};">
          <div class="slide-badge-tag">SLIDE ${slide.slideNumber} • ${(slide.type || "DETAILS").toUpperCase()}</div>
          <div class="slide-header">
            <h2 class="slide-heading">${slide.title}</h2>
            <p class="slide-subheading">${slide.subtitle || ''}</p>
          </div>
          <div class="slide-content-area">
            <ul class="slide-bullet-list">
              ${(slide.bullets || []).map(b => `
                <li class="slide-bullet-item">
                  <i data-lucide="arrow-right-circle" class="slide-bullet-icon"></i>
                  <span>${b}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      `;
    }

    this.slideViewport.innerHTML = slideHTML;

    // Update Speaker Notes
    if (this.speakerNotesContent) {
      this.speakerNotesContent.innerText = slide.speakerNotes || slide.notes || "Explain key takeaways and methodology for this slide during your defense.";
    }

    this.renderProgressDots();
    if (window.lucide) window.lucide.createIcons();
  }

  nextSlide() {
    if (!this.currentProject || !this.currentProject.slides) return;
    if (this.currentSlideIndex < this.currentProject.slides.length - 1) {
      this.currentSlideIndex++;
      this.renderSlide();
    }
  }

  prevSlide() {
    if (!this.currentProject || !this.currentProject.slides) return;
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.renderSlide();
    }
  }

  goToSlide(index) {
    if (!this.currentProject || !this.currentProject.slides) return;
    if (index >= 0 && index < this.currentProject.slides.length) {
      this.currentSlideIndex = index;
      this.renderSlide();
    }
  }

  toggleSpeakerNotes() {
    const box = this.speakerNotesBox || document.getElementById("speakerNotesBox");
    if (box) {
      box.style.display = box.style.display === "none" ? "block" : "none";
    }
  }

  toggleFullscreen() {
    const container = document.getElementById("pptPlayerContainer") || document.getElementById("pptViewerContainer") || this.slideViewport;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        container.classList.add("fullscreen-mode");
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        container.classList.remove("fullscreen-mode");
      }).catch(() => {});
    }
  }
}

// Global PPT Viewer Instance
window.pptViewer = new PPTViewer();
