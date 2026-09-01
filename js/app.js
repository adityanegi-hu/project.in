/**
 * ProjectForge - Main Application Controller
 * Handles 450 projects, 1st/2nd/3rd/4th Year filters, B.Tech/BCA/B.Sc stream matching,
 * search, progressive pagination, on-demand split loading, modals, and dynamic project previews.
 */

class ProjectForgeApp {
  constructor() {
    this.projects = typeof PROJECTS_DATA !== "undefined" ? PROJECTS_DATA : [];
    this.currentCategory = "all";
    this.currentDifficulty = "all";
    this.currentYear = "all";
    this.currentDegree = "all";
    this.searchQuery = "";
    this.isFavoritesOnly = false;
    this.currentUser = JSON.parse(localStorage.getItem("pf_user") || "null");
    this.bookmarkedIds = this.currentUser && Array.isArray(this.currentUser.saved_project_ids)
      ? this.currentUser.saved_project_ids
      : JSON.parse(localStorage.getItem("pf_bookmarks") || "[]");
    this.selectedProject = null;
    this.pendingAction = null;

    // Progressive Pagination & Dynamic Split-Loading
    this.batchSize = 10;
    this.displayedCount = 10;
    this.detailsCache = {};
    this.infiniteObserver = null;

    this.initElements();
    this.initEventListeners();
    this.initAuthListeners();
    this.initTheme();
    this.renderAuthNav();
    this.renderDegreeTabs();
    this.renderYearTabs();
    this.renderCategoryPills();
    this.renderProjectsGrid();
  }

  initElements() {
    this.projectsGrid = document.getElementById("projectsGrid");
    this.degreeTabsContainer = document.getElementById("degreeTabsContainer");
    this.yearTabsContainer = document.getElementById("yearTabsContainer");
    this.categoryPillsContainer = document.getElementById("categoryPillsContainer");
    this.searchInput = document.getElementById("searchInput");
    this.difficultySelect = document.getElementById("difficultySelect");
    this.yearSelect = document.getElementById("yearSelect");
    this.degreeSelect = document.getElementById("degreeSelect");
    this.resultsCountText = document.getElementById("resultsCountText");
    this.authNavContainer = document.getElementById("authNavContainer");
    this.navSavedBadge = document.getElementById("navSavedBadge");

    // Pagination & Infinite Scroll Elements
    this.loadMoreSection = document.getElementById("loadMoreSection");
    this.loadMoreBtn = document.getElementById("loadMoreBtn");
    this.loadMoreRemainingCount = document.getElementById("loadMoreRemainingCount");
    this.allLoadedMessage = document.getElementById("allLoadedMessage");

    // Project Detail Modal
    this.projectModal = document.getElementById("projectModal");
    this.modalCloseBtn = document.getElementById("modalCloseBtn");
    this.modalTabs = document.querySelectorAll(".modal-tab-btn");

    // Customizer Modal
    this.customizerModal = document.getElementById("customizerModal");
    this.customizerCloseBtn = document.getElementById("customizerCloseBtn");
    this.customizerForm = document.getElementById("customizerForm");

    // Viva Simulator Modal
    this.vivaModal = document.getElementById("vivaModal");
    this.vivaCloseBtn = document.getElementById("vivaCloseBtn");

    // Submit Project Modal
    this.submitModal = document.getElementById("submitModal");
    this.submitCloseBtn = document.getElementById("submitCloseBtn");
    this.submitForm = document.getElementById("submitProjectForm");

    // Auth Modal Elements
    this.authModal = document.getElementById("authModal");
    this.authCloseBtn = document.getElementById("authCloseBtn");
    this.authTabSignInBtn = document.getElementById("authTabSignInBtn");
    this.authTabSignUpBtn = document.getElementById("authTabSignUpBtn");
    this.signInForm = document.getElementById("signInForm");
    this.signUpForm = document.getElementById("signUpForm");
    this.linkToSignUp = document.getElementById("linkToSignUp");
    this.linkToSignIn = document.getElementById("linkToSignIn");
    this.authPromptBanner = document.getElementById("authPromptBanner");
    this.authPromptText = document.getElementById("authPromptText");

    // Mobile Drawer & Bottom Navigation Elements
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
    this.mobileDrawer = document.getElementById("mobileDrawer");
    this.mobileDrawerBackdrop = document.getElementById("mobileDrawerBackdrop");
    this.mobileDrawerCloseBtn = document.getElementById("mobileDrawerCloseBtn");
    this.mobileDrawerAuthContainer = document.getElementById("mobileDrawerAuthContainer");
    this.mobSavedDot = document.getElementById("mobSavedDot");

    // Toast Container
    this.toastContainer = document.getElementById("toastContainer");
  }

  initEventListeners() {
    // Theme Toggle
    document.getElementById("themeToggleBtn")?.addEventListener("click", () => this.toggleTheme());

    // Search Input
    this.searchInput?.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.displayedCount = this.batchSize;
      this.renderProjectsGrid();
    });

    // Degree Dropdown Filter in Toolbar
    this.degreeSelect?.addEventListener("change", (e) => {
      this.setDegreeFilter(e.target.value);
    });

    // Year Dropdown Filter in Toolbar
    this.yearSelect?.addEventListener("change", (e) => {
      this.setYearFilter(e.target.value);
    });

    // Difficulty Filter
    this.difficultySelect?.addEventListener("change", (e) => {
      this.currentDifficulty = e.target.value;
      this.displayedCount = this.batchSize;
      this.renderProjectsGrid();
    });

    // Quick Search Tags
    document.querySelectorAll(".tag-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const query = pill.getAttribute("data-tag") || pill.innerText.replace("#", "").trim();
        if (this.searchInput) {
          this.searchInput.value = query;
          this.searchQuery = query.toLowerCase();
          this.displayedCount = this.batchSize;
          this.renderProjectsGrid();
        }
      });
    });

    // Load More Button
    this.loadMoreBtn?.addEventListener("click", () => this.loadMoreProjects());

    // Setup Automated Infinite Scroll
    this.initInfiniteScroll();

    // Mobile Drawer & Slide Navigation Listeners
    this.mobileMenuBtn?.addEventListener("click", () => this.openMobileDrawer());
    this.mobileDrawerBackdrop?.addEventListener("click", () => this.closeMobileDrawer());
    this.mobileDrawerCloseBtn?.addEventListener("click", () => this.closeMobileDrawer());

    document.getElementById("mobNavExplore")?.addEventListener("click", () => {
      this.closeMobileDrawer();
    });
    document.getElementById("mobNavCustomizer")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeMobileDrawer();
      this.openCustomizerModal();
    });
    document.getElementById("mobNavViva")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeMobileDrawer();
      this.openVivaModal();
    });
    document.getElementById("mobNavSubmit")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeMobileDrawer();
      this.openSubmitModal();
    });
    document.getElementById("mobNavBookmarks")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeMobileDrawer();
      this.toggleFavoritesFilter();
    });

    // Mobile Bottom Quick Navigation Bar
    document.getElementById("mobBottomExplore")?.addEventListener("click", () => {
      if (this.isFavoritesOnly) {
        this.toggleFavoritesFilter();
      }
    });
    document.getElementById("mobBottomSearch")?.addEventListener("click", () => {
      if (this.searchInput) {
        this.searchInput.focus();
        this.searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
    document.getElementById("mobBottomCustomizer")?.addEventListener("click", () => {
      this.openCustomizerModal();
    });
    document.getElementById("mobBottomViva")?.addEventListener("click", () => {
      this.openVivaModal();
    });
    document.getElementById("mobBottomSaved")?.addEventListener("click", () => {
      this.toggleFavoritesFilter();
    });

    // Global Escape Key Listener to Close All Modals & Drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAllModals();
        this.closeMobileDrawer();
      }
    });

    // Modal Close buttons
    this.modalCloseBtn?.addEventListener("click", () => this.closeProjectModal());
    this.customizerCloseBtn?.addEventListener("click", () => this.closeCustomizerModal());
    this.vivaCloseBtn?.addEventListener("click", () => this.closeVivaModal());
    this.submitCloseBtn?.addEventListener("click", () => this.closeSubmitModal());

    // Close on backdrop click (including authModal)
    [this.projectModal, this.customizerModal, this.vivaModal, this.submitModal, this.authModal].forEach(modal => {
      modal?.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
        }
      });
    });

    // Nav actions
    document.getElementById("navVivaBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.openVivaModal();
    });

    document.getElementById("navCustomizerBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.openCustomizerModal();
    });

    document.getElementById("navSubmitBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.openSubmitModal();
    });

    document.getElementById("favoritesFilterBtn")?.addEventListener("click", () => {
      this.toggleFavoritesFilter();
    });

    // Modal Tabs Navigation
    this.modalTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetTab = tab.getAttribute("data-tab");
        this.switchModalTab(targetTab);
      });
    });

    // PPT Live Customizer Form Submission (Apply & Preview in Slides)
    this.customizerForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const collegeName = document.getElementById("custCollegeName")?.value.trim() || "Engineering Institute of Technology";
      const teamMembers = document.getElementById("custTeamMembers")?.value.trim() || "Student Developer Team";
      const guideName = document.getElementById("custGuideName")?.value.trim() || "Faculty Supervisor";

      if (window.pptViewer) {
        window.pptViewer.setCustomMetadata({ collegeName, teamMembers, guideName });
      }

      this.closeCustomizerModal();

      const proj = this.selectedProject || this.projects[0];
      if (proj) {
        await this.openProjectModal(proj);
        this.switchModalTab("ppt");
        this.showToast("🎨 PPT Slide Deck personalized with your college credentials!", "success");
      }
    });

    // Customizer Direct Download Trigger (Download Customized ZIP Kit)
    document.getElementById("custDownloadBtn")?.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const collegeName = document.getElementById("custCollegeName")?.value.trim() || "Engineering Institute of Technology";
      const teamMembers = document.getElementById("custTeamMembers")?.value.trim() || "Student Developer Team";
      const guideName = document.getElementById("custGuideName")?.value.trim() || "Faculty Supervisor";

      const proj = this.selectedProject || this.projects[0];
      if (window.projectDownloader && proj) {
        const fullProj = await this.getProjectFullDetails(proj);
        window.projectDownloader.downloadProjectKit(fullProj, { collegeName, teamMembers, guideName });
      }
      this.closeCustomizerModal();
    });

    // Submit Project Form Submission (MongoDB Cloud Sync)
    this.submitForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.handleProjectSubmission();
    });
  }

  // --- Theme Toggle ---
  initTheme() {
    const savedTheme = localStorage.getItem("pf_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("pf_theme", newTheme);
    this.updateThemeIcon(newTheme);
  }

  updateThemeIcon(theme) {
    const iconContainer = document.getElementById("themeIcon");
    if (iconContainer) {
      iconContainer.setAttribute?.("data-lucide", theme === "dark" ? "sun" : "moon");
      if (window.lucide) window.lucide.createIcons();
    }
  }

  // --- Degree Tabs Rendering (B.Tech, BCA, B.Sc) ---
  renderDegreeTabs() {
    if (!this.degreeTabsContainer) return;
    this.degreeTabsContainer.innerHTML = "";

    const streams = typeof DEGREE_STREAMS !== "undefined" ? DEGREE_STREAMS : [
      { id: "all", name: "All Degree Streams", icon: "graduation-cap", count: 450, label: "All Streams" },
      { id: "B.Tech", name: "B.Tech Projects", icon: "cpu", count: 450, label: "B.Tech (CSE / IT / AI / ECE)" },
      { id: "BCA", name: "BCA Projects", icon: "monitor", count: 320, label: "BCA (Software & Web Apps)" },
      { id: "B.Sc", name: "B.Sc Projects", icon: "atom", count: 280, label: "B.Sc (Computer Science / IT)" }
    ];

    streams.forEach(stream => {
      const btn = document.createElement("button");
      const streamClass = stream.id === "B.Tech" ? "btech" : (stream.id === "BCA" ? "bca" : (stream.id === "B.Sc" ? "bsc" : ""));
      btn.className = `degree-tab-btn ${streamClass} ${this.currentDegree === stream.id ? "active" : ""}`;
      const title = stream.label || stream.name || stream.id;
      const count = stream.count ? `<span class="stream-count-badge">${stream.count}</span>` : "";
      btn.innerHTML = `
        <i data-lucide="${stream.icon || 'layers'}" style="width: 18px; height: 18px;"></i>
        <span>${title}</span>
        ${count}
      `;

      btn.addEventListener("click", () => {
        this.setDegreeFilter(stream.id);
      });

      this.degreeTabsContainer.appendChild(btn);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  setDegreeFilter(degreeId) {
    this.currentDegree = degreeId;
    this.displayedCount = this.batchSize;
    if (this.degreeSelect) this.degreeSelect.value = degreeId;
    this.renderDegreeTabs();
    this.renderProjectsGrid();
  }

  // --- Academic Year Tabs Rendering (1st, 2nd, 3rd, 4th Year) ---
  renderYearTabs() {
    if (!this.yearTabsContainer) return;
    this.yearTabsContainer.innerHTML = "";

    const years = typeof ACADEMIC_YEARS !== "undefined" ? ACADEMIC_YEARS : [
      { id: "all", name: "All Years (1st - 4th)", icon: "graduation-cap", count: 450 },
      { id: "1", name: "1st Year (Beginner)", icon: "sparkles", count: 90 },
      { id: "2", name: "2nd Year (Intermediate)", icon: "book-open", count: 110 },
      { id: "3", name: "3rd Year (Pre-Final)", icon: "rocket", count: 130 },
      { id: "4", name: "4th Year (Major Capstone)", icon: "trophy", count: 120 }
    ];

    years.forEach(yr => {
      const pill = document.createElement("button");
      pill.className = `year-tab-btn ${this.currentYear === yr.id ? "active" : ""}`;
      const title = yr.name || yr.label || `Year ${yr.id}`;
      const count = yr.count ? `<span class="year-count-badge">${yr.count}</span>` : "";
      pill.innerHTML = `
        <i data-lucide="${yr.icon || 'calendar'}" style="width: 15px; height: 15px;"></i>
        <span>${title}</span>
        ${count}
      `;

      pill.addEventListener("click", () => {
        this.setYearFilter(yr.id);
      });

      this.yearTabsContainer.appendChild(pill);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  setYearFilter(yearId) {
    this.currentYear = yearId;
    this.displayedCount = this.batchSize;
    if (this.yearSelect) this.yearSelect.value = yearId;
    this.renderYearTabs();
    this.renderProjectsGrid();
  }

  // --- Category Pills (9 Domains) ---
  renderCategoryPills() {
    if (!this.categoryPillsContainer) return;
    this.categoryPillsContainer.innerHTML = "";

    const domains = typeof DOMAINS_LIST !== "undefined" ? DOMAINS_LIST : [
      { id: "all", name: "All 450 Projects", icon: "sparkles" },
      { id: "ai-ml", name: "AI & Machine Learning", icon: "brain" },
      { id: "fullstack", name: "Full Stack & Web Dev", icon: "layout" },
      { id: "iot-embedded", name: "IoT & Smart Hardware", icon: "cpu" },
      { id: "cloud-devops", name: "Cloud & Microservices", icon: "cloud" },
      { id: "blockchain", name: "Blockchain & Web3", icon: "shield-check" },
      { id: "cybersecurity", name: "Cybersecurity & Forensic", icon: "lock" },
      { id: "mobile-app", name: "Mobile Applications", icon: "smartphone" },
      { id: "datascience", name: "Data Science & Analytics", icon: "bar-chart-2" },
      { id: "computer-vision", name: "Computer Vision & AR", icon: "camera" }
    ];

    domains.forEach(domain => {
      const pill = document.createElement("button");
      pill.className = `cat-pill ${this.currentCategory === domain.id ? "active" : ""}`;
      pill.innerHTML = `
        <i data-lucide="${domain.icon}" style="width: 15px; height: 15px;"></i>
        <span>${domain.name}</span>
      `;

      pill.addEventListener("click", () => {
        this.currentCategory = domain.id;
        this.displayedCount = this.batchSize;
        document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.renderProjectsGrid();
      });
      this.categoryPillsContainer.appendChild(pill);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  setCategoryFilter(categoryId) {
    this.currentCategory = categoryId;
    this.displayedCount = this.batchSize;
    this.renderCategoryPills();
    this.renderProjectsGrid();
    const targetElem = document.getElementById("explore-section");
    targetElem?.scrollIntoView?.({ behavior: "smooth" });
  }

  getFilteredProjects() {
    return this.projects.filter(proj => {
      // Favorites Only Filter
      const matchesFavorites = !this.isFavoritesOnly || this.bookmarkedIds.includes(proj.id);

      // Degree Filter (B.Tech, BCA, B.Sc)
      const matchesDegree = this.currentDegree === "all" || (proj.degrees && proj.degrees.includes(this.currentDegree));

      // Year Filter (1, 2, 3, 4)
      const matchesYear = this.currentYear === "all" || proj.year.toString() === this.currentYear;

      // Category Filter
      const matchesCategory = this.currentCategory === "all" || proj.category === this.currentCategory;

      // Difficulty Filter
      const matchesDifficulty = this.currentDifficulty === "all" || (proj.difficulty && proj.difficulty.toLowerCase() === this.currentDifficulty.toLowerCase());

      // Search Query
      const searchMatch = !this.searchQuery ||
        (proj.title && proj.title.toLowerCase().includes(this.searchQuery)) ||
        (proj.tagline && proj.tagline.toLowerCase().includes(this.searchQuery)) ||
        (proj.categoryLabel && proj.categoryLabel.toLowerCase().includes(this.searchQuery)) ||
        (proj.techStack && proj.techStack.some(t => t.toLowerCase().includes(this.searchQuery)));

      return matchesFavorites && matchesDegree && matchesYear && matchesCategory && matchesDifficulty && searchMatch;
    });
  }

  renderProjectsGrid() {
    if (!this.projectsGrid) return;
    const filtered = this.getFilteredProjects();
    this.projectsGrid.innerHTML = "";

    // Dynamic Result Label with progressive count
    const degreeLabel = this.currentDegree === "all" ? "" : ` ${this.currentDegree}`;
    const yearLabel = this.currentYear === "all" ? "" : ` (${this.currentYear === "1" ? "1st" : (this.currentYear === "2" ? "2nd" : (this.currentYear === "3" ? "3rd" : "4th"))} Year)`;
    const displayedSlice = filtered.slice(0, this.displayedCount);

    if (this.resultsCountText) {
      const shownCount = displayedSlice.length;
      this.resultsCountText.innerText = `Showing ${shownCount} of ${filtered.length}${degreeLabel}${yearLabel} Projects`;
    }

    // Update Load More Controls
    const remaining = filtered.length - displayedSlice.length;
    if (remaining > 0) {
      if (this.loadMoreBtn) {
        this.loadMoreBtn.style.display = "inline-flex";
        if (this.loadMoreRemainingCount) {
          this.loadMoreRemainingCount.innerText = Math.min(remaining, this.batchSize);
        }
      }
      if (this.allLoadedMessage) this.allLoadedMessage.style.display = "none";
    } else {
      if (this.loadMoreBtn) this.loadMoreBtn.style.display = "none";
      if (this.allLoadedMessage) {
        this.allLoadedMessage.style.display = filtered.length > 0 ? "block" : "none";
      }
    }

    if (filtered.length === 0) {
      if (this.loadMoreSection) this.loadMoreSection.style.display = "none";
      this.projectsGrid.innerHTML = `
        <div class="empty-state">
          <i data-lucide="search-x" class="empty-icon"></i>
          <h3 style="color: var(--text-heading); font-size: 1.2rem; margin-bottom: 0.5rem;">No Projects Found</h3>
          <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto 1.5rem;">
            We couldn't find any project matching <strong>${this.currentDegree !== 'all' ? this.currentDegree : ''}</strong> ${this.currentYear !== 'all' ? 'Year ' + this.currentYear : ''}. Try selecting "All Degrees" or "All Years".
          </p>
          <button class="btn btn-secondary" onclick="app.resetFilters()">Clear All Filters</button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    } else {
      if (this.loadMoreSection) this.loadMoreSection.style.display = "flex";
    }

    displayedSlice.forEach(proj => {
      const isBookmarked = this.bookmarkedIds.includes(proj.id);
      const card = document.createElement("div");
      card.className = "project-card";
      card.style.setProperty("--card-gradient", proj.gradient || "var(--grad-primary)");

      card.innerHTML = `
        <div class="project-card-banner">
          <div class="banner-pattern"></div>
          <div class="banner-top">
            <span class="year-indicator-pill yr-${proj.year}">🎓 ${proj.yearLabel || 'Project'}</span>
            <button class="bookmark-btn ${isBookmarked ? "active" : ""}" title="Save to Favorites" data-id="${proj.id}">
              <i data-lucide="bookmark" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
          <div class="banner-bottom">
            <div class="banner-icon-box">
              <i data-lucide="${proj.icon || 'code-2'}"></i>
            </div>
            <div>
              <div class="banner-cat-title">${proj.categoryLabel || 'Engineering'}</div>
              <div style="font-size: 0.72rem; color: rgba(255,255,255,0.85);">${proj.difficulty || 'Medium'} • ${proj.badge || 'Verified'}</div>
            </div>
          </div>
        </div>

        <div class="project-card-body">
          <div class="degree-tags-row">
            ${proj.degrees ? proj.degrees.map(d => `<span class="degree-badge ${d.toLowerCase().replace('.', '')}" data-degree="${d}" title="Click to filter only ${d} projects">${d}</span>`).join("") : '<span class="degree-badge">B.Tech</span>'}
          </div>

          <h3 class="project-title" title="${proj.title}">${proj.title}</h3>
          <p class="project-tagline">${proj.tagline || ''}</p>

          <div class="tech-tags-list">
            ${(proj.techStack || []).map(tech => `<span class="tech-tag">${tech}</span>`).join("")}
          </div>

          <div class="kit-features-pills">
            <div class="kit-pill-item"><i data-lucide="presentation"></i> 10-Slide PPT Deck</div>
            <div class="kit-pill-item"><i data-lucide="file-code"></i> Working Source Code</div>
            <div class="kit-pill-item"><i data-lucide="file-text"></i> IEEE Synopsis Report</div>
            <div class="kit-pill-item"><i data-lucide="help-circle"></i> Viva Q&A Guide</div>
          </div>

          <div class="card-meta-footer">
            <div class="meta-stats">
              <div class="meta-stat-item rating"><i data-lucide="star" style="width: 14px; height: 14px; fill: #fbbf24;"></i> ${proj.rating || '4.9'}</div>
              <div class="meta-stat-item"><i data-lucide="download" style="width: 14px; height: 14px;"></i> ${proj.downloads || '1.2k'}</div>
            </div>
            <div class="card-action-btns">
              <button class="btn btn-secondary btn-sm quick-view-btn" data-id="${proj.id}">
                <i data-lucide="eye" style="width: 14px; height: 14px;"></i> Details & PPT
              </button>
              <button class="btn btn-primary btn-sm direct-download-btn" data-id="${proj.id}" title="1-Click Instant Kit Download">
                <i data-lucide="download" style="width: 14px; height: 14px;"></i> ZIP Kit
              </button>
            </div>
          </div>
        </div>
      `;

      // Degree Badge Click Handler
      card.querySelectorAll(".degree-badge").forEach(badge => {
        badge.addEventListener("click", (e) => {
          e.stopPropagation();
          const targetDegree = badge.getAttribute("data-degree");
          if (targetDegree) {
            this.setDegreeFilter(targetDegree);
          }
        });
      });

      // Bookmark Click Handler
      card.querySelector(".bookmark-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleBookmark(proj.id);
      });

      // Details View
      card.querySelector(".quick-view-btn")?.addEventListener("click", () => {
        this.openProjectModal(proj);
      });

      // Direct Download
      card.querySelector(".direct-download-btn")?.addEventListener("click", async (e) => {
        e.stopPropagation();
        if (window.projectDownloader) {
          const fullProj = await this.getProjectFullDetails(proj);
          window.projectDownloader.downloadProjectKit(fullProj);
        }
      });

      this.projectsGrid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  resetFilters() {
    this.currentCategory = "all";
    this.currentDifficulty = "all";
    this.currentYear = "all";
    this.currentDegree = "all";
    this.searchQuery = "";
    this.isFavoritesOnly = false;
    this.displayedCount = this.batchSize;
    document.getElementById("favoritesFilterBtn")?.classList.remove("active");
    if (this.searchInput) this.searchInput.value = "";
    if (this.difficultySelect) this.difficultySelect.value = "all";
    if (this.yearSelect) this.yearSelect.value = "all";
    if (this.degreeSelect) this.degreeSelect.value = "all";
    this.renderDegreeTabs();
    this.renderYearTabs();
    this.renderCategoryPills();
    this.renderProjectsGrid();
  }

  // --- Favorites / Bookmarks ---
  async toggleBookmark(projId) {
    if (!this.currentUser) {
      this.pendingAction = { type: "bookmark", projectId: projId };
      this.openAuthModal("⭐ Please sign in or create an account to save projects to your cloud library!");
      this.showToast("Please sign in to save projects to your account!", "info");
      return;
    }

    let isSaved = false;
    if (this.bookmarkedIds.includes(projId)) {
      this.bookmarkedIds = this.bookmarkedIds.filter(id => id !== projId);
      isSaved = false;
      this.showToast("Removed from saved projects", "info");
    } else {
      this.bookmarkedIds.push(projId);
      isSaved = true;
      this.showToast("⭐ Saved to your library!", "success");
    }

    if (this.currentUser) {
      this.currentUser.saved_project_ids = this.bookmarkedIds;
      localStorage.setItem("pf_user", JSON.stringify(this.currentUser));

      const users = this.getRegisteredUsers();
      const uIdx = users.findIndex(u => u.email.toLowerCase() === (this.currentUser.email || "").toLowerCase());
      if (uIdx >= 0) {
        users[uIdx].saved_project_ids = this.bookmarkedIds;
        this.saveRegisteredUsers(users);
      }
    }
    localStorage.setItem("pf_bookmarks", JSON.stringify(this.bookmarkedIds));

    // Sync to MongoDB asynchronously if server exists
    try {
      fetch("/api/user/toggle-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.currentUser?.email, projectId: projId })
      }).catch(() => {});
    } catch (e) {}

    this.renderAuthNav();
    this.renderProjectsGrid();
  }

  toggleFavoritesFilter() {
    if (!this.currentUser) {
      this.openAuthModal("⭐ Please sign in to view your saved projects!");
      this.showToast("Please sign in to view your saved projects!", "info");
      return;
    }

    if (this.bookmarkedIds.length === 0 && !this.isFavoritesOnly) {
      this.showToast("You haven't saved any projects yet. Click the bookmark icon on any card to save it!", "info");
      return;
    }

    this.isFavoritesOnly = !this.isFavoritesOnly;
    this.displayedCount = this.batchSize;
    const favBtn = document.getElementById("favoritesFilterBtn");
    const mobBottomSaved = document.getElementById("mobBottomSaved");
    const mobBottomExplore = document.getElementById("mobBottomExplore");

    if (this.isFavoritesOnly) {
      favBtn?.classList.add("active");
      mobBottomSaved?.classList.add("active");
      mobBottomExplore?.classList.remove("active");
      this.showToast(`⭐ Showing ${this.bookmarkedIds.length} Saved Projects for ${this.currentUser.name}`, "info");
    } else {
      favBtn?.classList.remove("active");
      mobBottomSaved?.classList.remove("active");
      mobBottomExplore?.classList.add("active");
      this.showToast("Showing All Projects", "info");
    }
    this.renderProjectsGrid();
  }

  // --- Project Modal Management ---
  async openProjectModal(project) {
    const targetProj = (project && project.id) ? project : (this.selectedProject || this.projects[0]);
    if (!targetProj) return;

    this.selectedProject = targetProj;

    const modalTitle = document.getElementById("modalTitle");
    const modalBadge = document.getElementById("modalCategoryBadge");
    if (modalTitle) modalTitle.innerText = targetProj.title;
    if (modalBadge) modalBadge.innerText = `${targetProj.yearLabel || ''} • ${targetProj.categoryLabel || 'Engineering'} (${targetProj.difficulty || 'Medium'})`;

    // Header Download Action
    const modalDownloadBtn = document.getElementById("modalDownloadBtn");
    if (modalDownloadBtn) {
      modalDownloadBtn.onclick = async () => {
        if (window.projectDownloader) {
          const fullProj = await this.getProjectFullDetails(targetProj);
          window.projectDownloader.downloadProjectKit(fullProj);
        }
      };
    }

    // Open modal immediately
    this.projectModal?.classList.add("open");
    this.switchModalTab("ppt");

    // Fetch full project details on-demand
    const fullProject = await this.getProjectFullDetails(targetProj);

    // Populate Overview Tab
    this.renderOverviewTab(fullProject);

    // Populate Code Viewer Tab
    this.renderCodeTab(fullProject);

    // Populate Viva Tab
    this.renderVivaTab(fullProject);

    // Initialize PPT Viewer
    if (window.pptViewer) {
      window.pptViewer.loadProject(fullProject);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  closeProjectModal() {
    this.projectModal?.classList.remove("open");
  }

  switchModalTab(tabId) {
    this.modalTabs?.forEach(t => {
      if (t.getAttribute("data-tab") === tabId) {
        t.classList.add("active");
      } else {
        t.classList.remove("active");
      }
    });

    document.querySelectorAll(".tab-pane").forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add("active");
      } else {
        pane.classList.remove("active");
      }
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderOverviewTab(project) {
    const container = document.getElementById("overviewContent");
    if (!container) return;

    const synopsis = project.synopsis || {};
    const abstractText = synopsis.abstract || project.tagline || "Comprehensive academic engineering project package.";
    const issues = synopsis.existingSystemIssues || ["Manual processing latency", "Lack of automated verification"];
    const advantages = synopsis.proposedSystemAdvantages || ["Automated workflow architecture", "Verified IEEE documentation standard"];
    const sysReqs = synopsis.systemRequirements || { hardware: "Standard PC / 8GB RAM", software: (project.techStack || []).join(", ") || "Modern Environment" };

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.75rem;">
        <div style="background: var(--bg-card); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
            <span class="year-indicator-pill yr-${project.year}">🎓 ${project.yearLabel || ''}</span>
            ${project.degrees ? project.degrees.map(d => `<span class="degree-badge">${d}</span>`).join("") : ''}
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="file-text" style="color: var(--accent-primary);"></i> Abstract & Project Synopsis
          </h3>
          <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${abstractText}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem;">
          <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-rose); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
              <i data-lucide="alert-circle"></i> Identified Problem Statement
            </h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
              ${issues.map(i => `<li>• ${i}</li>`).join("")}
            </ul>
          </div>

          <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-emerald); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
              <i data-lucide="check-circle"></i> Proposed System Advantages
            </h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
              ${advantages.map(a => `<li>• ${a}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
            <i data-lucide="cpu"></i> System Environment Requirements
          </h4>
          <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            <div><strong>Hardware:</strong> ${sysReqs.hardware}</div>
            <div style="margin-top: 0.35rem;"><strong>Software & Dependencies:</strong> ${sysReqs.software}</div>
          </div>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  renderCodeTab(project) {
    const tabList = document.getElementById("codeTabsList");
    const codePre = document.getElementById("codeDisplayBox");
    if (!tabList || !codePre) return;

    tabList.innerHTML = "";
    if (!project.codeFiles || project.codeFiles.length === 0) {
      codePre.innerText = "// Loading project source code files...";
      return;
    }

    project.codeFiles.forEach((file, index) => {
      const tabBtn = document.createElement("div");
      tabBtn.className = `code-tab-item ${index === 0 ? "active" : ""}`;
      tabBtn.innerHTML = `<i data-lucide="file-code"></i> <span>${file.filename}</span>`;

      tabBtn.addEventListener("click", () => {
        document.querySelectorAll(".code-tab-item").forEach(t => t.classList.remove("active"));
        tabBtn.classList.add("active");
        codePre.innerText = file.code;
      });

      tabList.appendChild(tabBtn);
    });

    codePre.innerText = project.codeFiles[0]?.code || "";
    if (window.lucide) window.lucide.createIcons();
  }

  renderVivaTab(project) {
    const list = document.getElementById("vivaQuestionsList");
    if (!list) return;
    list.innerHTML = "";

    const questions = project.vivaQuestions || [
      { question: `What is the primary motivation for ${project.title}?`, answer: `The solution automates core workflows using ${(project.techStack || []).join(', ')}.` }
    ];

    questions.forEach((q, i) => {
      const item = document.createElement("div");
      item.className = "viva-qa-item";
      item.innerHTML = `
        <div class="viva-question-header" onclick="this.parentElement.classList.toggle('open')">
          <div class="viva-q-title"><span class="viva-q-badge">Q${i + 1}</span> ${q.question}</div>
          <i data-lucide="chevron-down" class="viva-chevron"></i>
        </div>
        <div class="viva-answer-body">
          <div class="viva-ans-label"><i data-lucide="check-circle"></i> Recommended Defense Answer:</div>
          <p>${q.answer}</p>
        </div>
      `;
      list.appendChild(item);
    });

    document.getElementById("launchMockVivaBtn")?.addEventListener("click", () => {
      this.closeProjectModal();
      this.openVivaModal(project);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // --- AI PPT Customizer Studio Modal ---
  async openCustomizerModal(project) {
    const targetProj = (project && project.id) ? project : (this.selectedProject || this.projects[0]);
    if (!targetProj) return;

    this.selectedProject = await this.getProjectFullDetails(targetProj);
    if (this.customizerModal) {
      this.customizerModal.classList.add("open");
    }
  }

  closeCustomizerModal() {
    this.customizerModal?.classList.remove("open");
  }

  // --- Viva Examiner Modal ---
  async openVivaModal(project) {
    const targetProj = (project && project.id) ? project : (this.selectedProject || this.projects[0]);
    if (!targetProj) return;

    const select = document.getElementById("vivaProjectSelect");
    if (select) {
      select.innerHTML = this.projects.map(p => `
        <option value="${p.id}" ${p.id === targetProj.id ? 'selected' : ''}>[${p.yearLabel || ''}] ${p.title}</option>
      `).join("");
    }

    this.vivaModal?.classList.add("open");

    const fullProj = await this.getProjectFullDetails(targetProj);
    if (window.vivaSimulator) {
      window.vivaSimulator.startSession(fullProj);
    }
  }

  closeVivaModal() {
    this.vivaModal?.classList.remove("open");
  }

  // --- Submit Project Modal ---
  openSubmitModal() {
    if (!this.currentUser) {
      this.pendingAction = "openSubmitModal";
      this.openAuthModal("🚀 Please sign in or create an account to share & submit your college project with the community!");
      this.showToast("Please sign in or create an account to share your project!", "info");
      return;
    }

    const authorNameElem = document.getElementById("submitAuthorName");
    const authorMetaElem = document.getElementById("submitAuthorMeta");
    if (authorNameElem) authorNameElem.innerText = this.currentUser.name || "Student Contributor";
    if (authorMetaElem) authorMetaElem.innerText = `${this.currentUser.degree || "B.Tech"} • Year ${this.currentUser.year || "3"}`;

    this.submitModal?.classList.add("open");
    if (window.lucide) window.lucide.createIcons();
  }

  closeSubmitModal() {
    this.submitModal?.classList.remove("open");
  }

  async handleProjectSubmission() {
    const title = (document.getElementById("shareTitle") || document.getElementById("subTitle"))?.value.trim();
    const domain = (document.getElementById("shareCategory") || document.getElementById("subDomain"))?.value || "ai-ml";
    const year = parseInt(this.currentUser?.year || "3");
    const difficulty = "Intermediate";
    const degreesSelected = [this.currentUser?.degree || "B.Tech"];
    const techStackInput = (document.getElementById("shareTechStack") || document.getElementById("subTechStack"))?.value || "";
    const techStack = techStackInput.split(",").map(t => t.trim()).filter(Boolean);
    const githubUrl = (document.getElementById("shareRepoUrl") || document.getElementById("subGithubUrl"))?.value.trim() || "";
    const description = (document.getElementById("shareAbstract") || document.getElementById("subDescription"))?.value.trim();

    if (!title || !description || techStack.length === 0) {
      this.showToast("Please fill out all required project fields.", "error");
      return;
    }

    const newProject = {
      id: `shared-${Date.now()}`,

      title,
      category: domain,
      categoryLabel: domain.toUpperCase(),
      year,
      yearLabel: `${year === 1 ? "1st" : (year === 2 ? "2nd" : (year === 3 ? "3rd" : "4th"))} Year Project`,
      difficulty,
      badge: "Community Submitted",
      degrees: degreesSelected,
      techStack,
      tagline: description,
      rating: "5.0",
      downloads: "1",
      icon: "share-2",
      gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
      githubUrl,
      author: {
        name: this.currentUser?.name || "Student Contributor",
        email: this.currentUser?.email || "",
        degree: this.currentUser?.degree || "B.Tech",
        year: this.currentUser?.year || "3"
      },
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch("/api/share-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject)
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || "Failed to submit project");

      this.projects.unshift(newProject);
      this.renderProjectsGrid();

      this.closeSubmitModal();
      this.submitForm?.reset();

      this.showToast("🚀 Project successfully published to MongoDB & live community catalogue!", "success");

      if (typeof confetti === "function") {
        confetti({ particleCount: 70, spread: 60 });
      }
    } catch (err) {
      console.warn("MongoDB API offline. Storing in local session...", err);
      this.projects.unshift(newProject);
      this.renderProjectsGrid();
      this.closeSubmitModal();
      this.submitForm?.reset();
      this.showToast("Project added locally to current session!", "success");
    }
  }

  getRegisteredUsers() {
    try {
      return JSON.parse(localStorage.getItem("pf_registered_users") || "[]");
    } catch (e) {
      return [];
    }
  }

  saveRegisteredUsers(users) {
    try {
      localStorage.setItem("pf_registered_users", JSON.stringify(users));
    } catch (e) {}
  }

  // --- Auth Modal & User Management ---
  initAuthListeners() {
    this.authCloseBtn?.addEventListener("click", () => this.closeAuthModal());
    this.authTabSignInBtn?.addEventListener("click", () => this.switchAuthTab("signin"));
    this.authTabSignUpBtn?.addEventListener("click", () => this.switchAuthTab("signup"));
    this.linkToSignUp?.addEventListener("click", (e) => { e.preventDefault(); this.switchAuthTab("signup"); });
    this.linkToSignIn?.addEventListener("click", (e) => { e.preventDefault(); this.switchAuthTab("signin"); });

    this.signInForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("signInEmail")?.value.trim();
      const passwordInput = document.getElementById("signInPassword")?.value.trim();
      if (!emailInput || !passwordInput) return;

      const email = emailInput.toLowerCase();
      const password = passwordInput;

      let authSuccess = false;
      let userData = null;

      // 1. Try REST API if server is reachable
      try {
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }).catch(() => null);

        if (res) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            if (res.ok && data.success && data.user) {
              authSuccess = true;
              userData = data.user;
            } else if (!res.ok && data.error && !data.error.includes("404")) {
              throw new Error(data.error);
            }
          }
        }
      } catch (err) {
        if (err.message && !err.message.includes("<") && !err.message.includes("fetch") && !err.message.includes("JSON")) {
          this.showToast(err.message, "error");
          return;
        }
      }

      // 2. Client-Side Seamless Local Storage Auth (for GitHub Pages / static hosting)
      if (!authSuccess) {
        const users = this.getRegisteredUsers();
        const existingUser = users.find(u => u.email.toLowerCase() === email);

        if (existingUser) {
          if (existingUser.password && existingUser.password !== password) {
            this.showToast("Incorrect password. Please verify and try again.", "error");
            return;
          }
          userData = {
            name: existingUser.name,
            email: existingUser.email,
            degree: existingUser.degree || "B.Tech",
            year: existingUser.year || "3",
            saved_project_ids: Array.isArray(existingUser.saved_project_ids) ? existingUser.saved_project_ids : []
          };
        } else {
          // Instant student session for newly entered credentials
          const generatedName = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ").trim();
          const formattedName = generatedName ? generatedName.charAt(0).toUpperCase() + generatedName.slice(1) : "Student Developer";
          
          const newUser = {
            name: formattedName,
            email: email,
            password: password,
            degree: "B.Tech",
            year: "3",
            saved_project_ids: JSON.parse(localStorage.getItem("pf_bookmarks") || "[]")
          };
          users.push(newUser);
          this.saveRegisteredUsers(users);

          userData = {
            name: newUser.name,
            email: newUser.email,
            degree: newUser.degree,
            year: newUser.year,
            saved_project_ids: newUser.saved_project_ids
          };
        }
      }

      this.currentUser = userData;
      this.bookmarkedIds = Array.isArray(userData.saved_project_ids) ? userData.saved_project_ids : [];
      localStorage.setItem("pf_user", JSON.stringify(this.currentUser));
      localStorage.setItem("pf_bookmarks", JSON.stringify(this.bookmarkedIds));

      this.closeAuthModal();
      this.renderAuthNav();
      this.renderProjectsGrid();
      this.showToast(`Welcome back, ${this.currentUser.name}! 👋`, "success");
      this.handlePendingAction();
    });

    this.signUpForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("signUpName")?.value.trim();
      const emailInput = document.getElementById("signUpEmail")?.value.trim();
      const password = document.getElementById("signUpPassword")?.value.trim();
      const degree = document.getElementById("signUpDegree")?.value || "B.Tech";
      const year = document.getElementById("signUpYear")?.value || "3";

      if (!name || !emailInput || !password) {
        this.showToast("Please fill in all required fields.", "error");
        return;
      }

      if (password.length < 6) {
        this.showToast("Password must be at least 6 characters.", "error");
        return;
      }

      const email = emailInput.toLowerCase();
      let authSuccess = false;
      let userData = null;

      // 1. Try REST API if server is reachable
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, degree, year })
        }).catch(() => null);

        if (res) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            if (res.ok && data.success && data.user) {
              authSuccess = true;
              userData = data.user;
            } else if (!res.ok && data.error && !data.error.includes("404")) {
              throw new Error(data.error);
            }
          }
        }
      } catch (err) {
        if (err.message && !err.message.includes("<") && !err.message.includes("fetch") && !err.message.includes("JSON")) {
          this.showToast(err.message, "error");
          return;
        }
      }

      // 2. Client-Side Seamless Local Storage Auth (for GitHub Pages / static hosting)
      if (!authSuccess) {
        const users = this.getRegisteredUsers();
        const existingIndex = users.findIndex(u => u.email.toLowerCase() === email);
        const existingBookmarks = JSON.parse(localStorage.getItem("pf_bookmarks") || "[]");

        if (existingIndex >= 0) {
          users[existingIndex] = {
            ...users[existingIndex],
            name,
            password,
            degree,
            year,
            saved_project_ids: users[existingIndex].saved_project_ids || existingBookmarks
          };
          userData = {
            name,
            email,
            degree,
            year,
            saved_project_ids: users[existingIndex].saved_project_ids || existingBookmarks
          };
        } else {
          const newUser = {
            name,
            email,
            password,
            degree,
            year,
            saved_project_ids: existingBookmarks
          };
          users.push(newUser);
          userData = {
            name,
            email,
            degree,
            year,
            saved_project_ids: existingBookmarks
          };
        }
        this.saveRegisteredUsers(users);
      }

      this.currentUser = userData;
      this.bookmarkedIds = Array.isArray(userData.saved_project_ids) ? userData.saved_project_ids : [];
      localStorage.setItem("pf_user", JSON.stringify(this.currentUser));
      localStorage.setItem("pf_bookmarks", JSON.stringify(this.bookmarkedIds));

      this.closeAuthModal();
      this.renderAuthNav();
      this.renderProjectsGrid();
      this.showToast(`Account created successfully! Welcome, ${this.currentUser.name} 🎉`, "success");
      this.handlePendingAction();
    });
  }

  openAuthModal(promptText = null) {
    if (this.authPromptBanner && this.authPromptText) {
      if (promptText) {
        this.authPromptText.innerText = promptText;
        this.authPromptBanner.style.display = "block";
      } else {
        this.authPromptBanner.style.display = "none";
      }
    }
    this.switchAuthTab("signin");
    this.authModal?.classList.add("open");
    if (window.lucide) window.lucide.createIcons();
  }

  closeAuthModal() {
    this.authModal?.classList.remove("open");
    if (this.authPromptBanner) this.authPromptBanner.style.display = "none";
  }

  switchAuthTab(tab) {
    if (tab === "signin") {
      this.authTabSignInBtn?.classList.add("active");
      this.authTabSignUpBtn?.classList.remove("active");
      if (this.signInForm) this.signInForm.style.display = "flex";
      if (this.signUpForm) this.signUpForm.style.display = "none";
    } else {
      this.authTabSignInBtn?.classList.remove("active");
      this.authTabSignUpBtn?.classList.add("active");
      if (this.signInForm) this.signInForm.style.display = "none";
      if (this.signUpForm) this.signUpForm.style.display = "flex";
    }
    if (window.lucide) window.lucide.createIcons();
  }

  openMobileDrawer() {
    this.mobileDrawer?.classList.add("open");
    this.mobileDrawerBackdrop?.classList.add("open");
    document.body.style.overflow = "hidden";
    if (window.lucide) window.lucide.createIcons();
  }

  closeMobileDrawer() {
    this.mobileDrawer?.classList.remove("open");
    this.mobileDrawerBackdrop?.classList.remove("open");
    document.body.style.overflow = "";
  }

  renderAuthNav() {
    const savedCount = this.bookmarkedIds.length;

    // 1. Desktop / Header Nav
    if (this.authNavContainer) {
      if (this.currentUser) {
        this.authNavContainer.innerHTML = `
          <div class="user-profile-badge">
            <div class="user-avatar">${this.currentUser.name ? this.currentUser.name.charAt(0).toUpperCase() : 'U'}</div>
            <div class="user-info-text">
              <span class="user-name">${this.currentUser.name}</span>
              <span class="user-sub">${this.currentUser.degree || "B.Tech"} • Yr ${this.currentUser.year || "3"}</span>
            </div>
            <button class="btn btn-outline btn-sm logout-btn" onclick="app.handleSignOut()" title="Sign Out">
              <i data-lucide="log-out" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        `;
        if (this.navSavedBadge) {
          this.navSavedBadge.innerText = savedCount;
          this.navSavedBadge.style.display = savedCount > 0 ? "inline-flex" : "none";
        }
      } else {
        this.authNavContainer.innerHTML = `
          <button class="btn btn-secondary btn-sm" onclick="app.openAuthModal()">
            <i data-lucide="log-in" style="width: 14px; height: 14px;"></i> Sign In
          </button>
        `;
        if (this.navSavedBadge) {
          this.navSavedBadge.style.display = "none";
        }
      }
    }

    // 2. Mobile Drawer Auth Footer
    if (this.mobileDrawerAuthContainer) {
      if (this.currentUser) {
        this.mobileDrawerAuthContainer.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <div class="user-avatar" style="width: 36px; height: 36px; font-size: 0.9rem;">
                ${this.currentUser.name ? this.currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-heading);">${this.currentUser.name}</div>
                <div style="font-size: 0.76rem; color: var(--text-muted);">${this.currentUser.degree || "B.Tech"} • Year ${this.currentUser.year || "3"}</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="app.closeMobileDrawer(); app.handleSignOut();" title="Sign Out">
              <i data-lucide="log-out" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        `;
      } else {
        this.mobileDrawerAuthContainer.innerHTML = `
          <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="app.closeMobileDrawer(); app.openAuthModal();">
            <i data-lucide="user" style="width: 16px; height: 16px;"></i> Sign In / Create Account
          </button>
        `;
      }
    }

    // 3. Mobile Bottom Nav & Badges
    if (this.mobSavedDot) {
      this.mobSavedDot.style.display = savedCount > 0 ? "block" : "none";
    }
    const mobSavedSub = document.getElementById("mobSavedSub");
    if (mobSavedSub) {
      mobSavedSub.innerText = `${savedCount} Saved Project${savedCount === 1 ? '' : 's'}`;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  handleSignOut() {
    this.currentUser = null;
    this.bookmarkedIds = [];
    localStorage.removeItem("pf_user");
    localStorage.removeItem("pf_bookmarks");
    this.isFavoritesOnly = false;
    document.getElementById("favoritesFilterBtn")?.classList.remove("active");
    document.getElementById("mobBottomSaved")?.classList.remove("active");
    this.renderAuthNav();
    this.renderProjectsGrid();
    this.showToast("Signed out successfully.", "info");
  }

  handlePendingAction() {
    if (!this.pendingAction) return;

    if (this.pendingAction === "openSubmitModal") {
      this.openSubmitModal();
    } else if (typeof this.pendingAction === "object" && this.pendingAction.type === "bookmark") {
      this.toggleBookmark(this.pendingAction.projectId);
    }
    this.pendingAction = null;
  }

  // --- Pagination & Infinite Scrolling ---
  loadMoreProjects() {
    const filtered = this.getFilteredProjects();
    if (this.displayedCount >= filtered.length) return;

    this.displayedCount += this.batchSize;
    this.renderProjectsGrid();
  }

  initInfiniteScroll() {
    // Manual "Show More" button control as requested
  }

  // --- Global Modal Close Handler ---
  closeAllModals() {
    this.closeProjectModal();
    this.closeCustomizerModal();
    this.closeVivaModal();
    this.closeSubmitModal();
    this.closeAuthModal();
  }

  // --- On-Demand Project Details Resolver ---
  async getProjectFullDetails(project) {
    if (!project || !project.id) return project || null;
    if (project.slides && project.codeFiles && project.codeFiles.length > 0 && project.vivaQuestions) {
      return project;
    }

    if (this.detailsCache[project.id]) {
      Object.assign(project, this.detailsCache[project.id]);
      return project;
    }

    try {
      // 1. Static details dictionary (cached once in memory for all 450 projects)
      if (!window._dataDetailsCache) {
        const detailsRes = await fetch("js/data-details.json?v=3.0").catch(() => null);
        if (detailsRes && detailsRes.ok) {
          window._dataDetailsCache = await detailsRes.json();
        }
      }

      if (window._dataDetailsCache && window._dataDetailsCache[project.id]) {
        const details = window._dataDetailsCache[project.id];
        this.detailsCache[project.id] = details;
        Object.assign(project, details);
        return project;
      }

      // 2. Fallback: Server REST API
      const apiBase = (typeof window !== "undefined" && window.location && window.location.origin && window.location.origin !== "null" && window.location.protocol?.startsWith("http"))
        ? window.location.origin
        : "";
      if (apiBase) {
        const res = await fetch(`${apiBase}/api/project/${project.id}`).catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          if (data.success && data.project) {
            const details = {
              synopsis: data.project.synopsis,
              slides: data.project.slides,
              codeFiles: data.project.codeFiles,
              vivaQuestions: data.project.vivaQuestions
            };
            this.detailsCache[project.id] = details;
            Object.assign(project, details);
            return project;
          }
        }
      }
    } catch (err) {
      console.warn("Project details fetch notice:", err);
    }

    // 3. Fallback Mock Generator
    const techStr = Array.isArray(project.techStack) ? project.techStack.join(", ") : "Python, Modern Web";
    const fallbackDetails = {
      synopsis: project.synopsis || {
        abstract: `${project.title} is an academic project engineered for ${project.yearLabel || ''} students in ${project.degrees?.join(', ') || 'Engineering'}.`,
        objectives: ["Implement core system logic", "Test and validate modules", "Deliver defense presentation"],
        existingSystemIssues: ["Manual latency", "Lack of automation"],
        proposedSystemAdvantages: ["Automated workflow", "Verified architecture"],
        systemRequirements: { hardware: "Standard PC / 8GB RAM", software: `${techStr} environment` }
      },
      slides: [
        { slideNumber: 1, type: "title", title: project.title, subtitle: `Academic Defense Presentation - ${project.yearLabel || ''}`, bullets: [], speakerNotes: "Introduce title and team." },
        { slideNumber: 2, type: "problem", title: "Problem Statement", subtitle: "Identified Bottlenecks", bullets: ["Manual latency", "Lack of automation"], speakerNotes: "Explain legacy drawbacks." },
        { slideNumber: 3, type: "solution", title: "Proposed System", subtitle: "Core Methodology", bullets: [project.tagline || "Automated modular architecture", `Built with ${techStr}`], speakerNotes: "Highlight solution advantages." }
      ],
      codeFiles: [
        { filename: "README.md", language: "markdown", code: `# ${project.title}\n\n${project.tagline || ''}\n\nTech Stack: ${techStr}` },
        { filename: "main.py", language: "python", code: `# ${project.title}\nprint("Project initialized successfully.")\n` }
      ],
      vivaQuestions: [
        { question: `What is the core motivation of ${project.title}?`, answer: `The goal is to automate legacy workflows using ${techStr}.` },
        { question: "How did you test and validate edge cases?", answer: "We performed rigorous unit and integration testing across core modules." }
      ]
    };
    this.detailsCache[project.id] = fallbackDetails;
    Object.assign(project, fallbackDetails);
    return project;
  }

  // --- Toast Notification System ---
  showToast(message, type = "info") {
    if (!this.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = "info";
    if (type === "success") icon = "check-circle";
    if (type === "error") icon = "alert-triangle";

    toast.innerHTML = `
      <i data-lucide="${icon}"></i>
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.animation = "slideInRight 0.3s ease reverse";
      setTimeout(() => toast.remove?.(), 300);
    }, 3500);
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new ProjectForgeApp();
});
