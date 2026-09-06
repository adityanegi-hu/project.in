/**
 * ForgeProject Explorer - Directory Tree & Breadcrumbs Navigator
 * Clean folder navigation aesthetic exclusively for verified Academic Projects,
 * Runnable Source Code Kits, and 10-Slide PowerPoint (PPT) Presentation Decks.
 */

class ForgeExplorer {
  constructor() {
    this.currentPath = [];
    this.searchQuery = "";
    this.currentMode = "all"; // 'all', 'btech', 'bca', 'mca', 'favorites'
    this.allProjects = typeof PROJECTS_DATA !== "undefined" ? PROJECTS_DATA : [];

    this.container = document.getElementById("explorerContainer");
    this.listElement = document.getElementById("explorerList");
    this.breadcrumbList = document.getElementById("breadcrumbList");
    this.upFolderBtn = document.getElementById("upFolderBtn");
    this.searchInput = document.getElementById("explorerSearchInput");
    this.searchClearBtn = document.getElementById("explorerSearchClear");
    this.modePills = document.querySelectorAll(".explorer-mode-pill");
    this.folderCountBadge = document.getElementById("explorerCountBadge");

    this.init();
  }

  init() {
    // Parse URL hash for initial route (e.g. #/B.Tech%20Projects or #/Browse%20by%20Technology)
    this.handleHashChange();
    window.addEventListener("hashchange", () => this.handleHashChange());

    // Up folder button listener
    this.upFolderBtn?.addEventListener("click", () => this.navigateUp());

    // Search input listener
    this.searchInput?.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      if (this.searchClearBtn) {
        this.searchClearBtn.style.display = this.searchQuery ? "inline-flex" : "none";
      }
      this.render();
    });

    this.searchClearBtn?.addEventListener("click", () => {
      if (this.searchInput) this.searchInput.value = "";
      this.searchQuery = "";
      if (this.searchClearBtn) this.searchClearBtn.style.display = "none";
      this.render();
    });

    // Mode filter pills
    this.modePills.forEach(pill => {
      pill.addEventListener("click", () => {
        this.modePills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.currentMode = pill.getAttribute("data-mode") || "all";
        this.render();
      });
    });

    this.render();
  }

  handleHashChange() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    if (!hash) {
      this.currentPath = [];
    } else {
      this.currentPath = hash.split("/").map(s => decodeURIComponent(s)).filter(Boolean);
    }
    this.render();
  }

  navigateTo(newPath) {
    this.searchQuery = "";
    if (this.searchInput) this.searchInput.value = "";
    if (this.searchClearBtn) this.searchClearBtn.style.display = "none";

    this.currentPath = [...newPath];
    const hashStr = this.currentPath.map(s => encodeURIComponent(s)).join("/");
    window.location.hash = hashStr ? `#/${hashStr}` : "#/";
  }

  navigateUp() {
    if (this.searchQuery) {
      this.searchQuery = "";
      if (this.searchInput) this.searchInput.value = "";
      if (this.searchClearBtn) this.searchClearBtn.style.display = "none";
      this.render();
      return;
    }
    if (this.currentPath.length > 0) {
      const nextPath = [...this.currentPath];
      nextPath.pop();
      this.navigateTo(nextPath);
    }
  }

  renderBreadcrumbs() {
    if (!this.breadcrumbList) return;

    if (this.upFolderBtn) {
      const canGoUp = this.currentPath.length > 0 || this.searchQuery.length > 0;
      this.upFolderBtn.disabled = !canGoUp;
      this.upFolderBtn.classList.toggle("disabled", !canGoUp);
    }

    let html = `
      <li class="breadcrumb-item">
        <a href="#/" class="${this.currentPath.length === 0 && !this.searchQuery ? 'current' : ''}">forgeproject</a>
      </li>
    `;

    if (this.searchQuery) {
      html += `
        <li class="breadcrumb-separator">/</li>
        <li class="breadcrumb-item current">search: "${this.searchQuery}"</li>
      `;
    } else {
      let accumulated = [];
      this.currentPath.forEach((segment, idx) => {
        accumulated.push(segment);
        const isLast = idx === this.currentPath.length - 1;
        const linkHash = accumulated.map(s => encodeURIComponent(s)).join("/");
        html += `
          <li class="breadcrumb-separator">/</li>
          <li class="breadcrumb-item ${isLast ? 'current' : ''}">
            ${isLast ? `<span>${segment}</span>` : `<a href="#/${linkHash}">${segment}</a>`}
          </li>
        `;
      });
    }

    this.breadcrumbList.innerHTML = html;
  }

  render() {
    this.renderBreadcrumbs();
    if (!this.listElement) return;

    // 1. Search Mode
    if (this.searchQuery) {
      this.renderSearchResults();
      return;
    }

    // 2. Favorites Mode
    if (this.currentMode === "favorites") {
      this.renderFavorites();
      return;
    }

    // 3. Folder Navigation Mode
    const current = this.resolveCurrentDirectory();
    this.renderDirectoryContents(current);
  }

  resolveCurrentDirectory() {
    // Root directory
    if (this.currentPath.length === 0) {
      return {
        type: "virtual-root",
        items: this.getRootItems()
      };
    }

    const firstSeg = this.currentPath[0];

    // "Browse by Technology" folder
    if (firstSeg === "Browse by Technology") {
      if (this.currentPath.length === 1) {
        return {
          type: "tech-category-list",
          items: this.getTechCategories()
        };
      }
      if (this.currentPath.length === 2) {
        const techName = this.currentPath[1];
        return {
          type: "project-list",
          folderName: techName,
          projects: this.getProjectsByTech(techName)
        };
      }
    }

    // "Browse by Year" folder
    if (firstSeg === "Browse by Year") {
      if (this.currentPath.length === 1) {
        return {
          type: "year-category-list",
          items: this.getYearCategories()
        };
      }
      if (this.currentPath.length === 2) {
        const yearName = this.currentPath[1];
        const yearNum = parseInt(yearName) || 1;
        return {
          type: "project-list",
          folderName: yearName,
          projects: this.allProjects.filter(p => p.year === yearNum)
        };
      }
    }

    // Degree Level: e.g. ["B.Tech Projects"], ["BCA Projects"], ["MCA Projects"], ["M.Tech Projects"], ["Diploma Projects"]
    if (this.currentPath.length === 1) {
      return {
        type: "degree-level",
        degree: firstSeg,
        items: this.getDegreeCategories(firstSeg)
      };
    }

    // Subfolder Level: e.g. ["B.Tech Projects", "AI & Machine Learning"] or ["B.Tech Projects", "3rd Year Projects"]
    if (this.currentPath.length === 2) {
      const secondSeg = this.currentPath[1];
      return {
        type: "project-list",
        degree: firstSeg,
        categoryOrYear: secondSeg,
        projects: this.getProjectsForPath(firstSeg, secondSeg)
      };
    }

    return { type: "empty", items: [] };
  }

  getRootItems() {
    const folders = [
      { name: "B.Tech Projects", degreeKey: "B.Tech", desc: "Computer Science, AI/ML, IoT, ECE & Engineering Major & Minor Projects with Working Code & PPTs", count: "300+ Kits" },
      { name: "BCA Projects", degreeKey: "BCA", desc: "Bachelor of Computer Applications Final & Mini Projects with Complete Code & Presentation Slides", count: "80+ Kits" },
      { name: "MCA Projects", degreeKey: "MCA", desc: "Master of Computer Applications Enterprise Systems & Deep Learning Capstone Projects", count: "45+ Kits" },
      { name: "M.Tech Projects", degreeKey: "M.Tech", desc: "Advanced Postgraduate Engineering, Neural Architectures & Research Project Kits", count: "30+ Kits" },
      { name: "Diploma Projects", degreeKey: "Diploma", desc: "Polytechnic Engineering, Practical Hardware, Embedded & Web Projects", count: "35+ Kits" },
      { name: "Browse by Technology", degreeKey: "tech", desc: "Find projects by Stack: Python, AI/ML, React, Java, Flutter, IoT, Solidity, C/C++", count: "8 Stacks" },
      { name: "Browse by Year", degreeKey: "year", desc: "Filter kits by Academic Year: 1st Year, 2nd Year, 3rd Year, 4th Year Capstone", count: "4 Years" }
    ];

    if (this.currentMode === "btech") {
      return folders.filter(f => f.degreeKey === "B.Tech");
    }
    if (this.currentMode === "bca") {
      return folders.filter(f => f.degreeKey === "BCA" || f.degreeKey === "Diploma");
    }
    if (this.currentMode === "mca") {
      return folders.filter(f => f.degreeKey === "MCA" || f.degreeKey === "M.Tech");
    }

    return folders;
  }

  getDegreeCategories(degree) {
    return [
      { name: "1st Year Projects", type: "year", year: 1, desc: "Introductory Programming, Logic Building, Python & Starter Kits" },
      { name: "2nd Year Projects", type: "year", year: 2, desc: "Core OOP, DBMS, Web Development & Algorithms Mini Projects" },
      { name: "3rd Year Projects", type: "year", year: 3, desc: "Advanced Full-Stack, Machine Learning & Distributed Systems" },
      { name: "4th Year Major Projects", type: "year", year: 4, desc: "Comprehensive Capstone, Industry Scale & Defense Ready Kits" },
      { name: "AI & Machine Learning", type: "domain", category: "ai-ml", desc: "Computer Vision, NLP, Deep Learning & Predictive Models (50 Kits)" },
      { name: "Web & Full Stack Development", type: "domain", category: "web-dev", desc: "MERN, Django, Spring Boot & React Applications (50 Kits)" },
      { name: "IoT & Embedded Systems", type: "domain", category: "iot-embedded", desc: "ESP32, Arduino, Raspberry Pi & Smart Automation (50 Kits)" },
      { name: "Cybersecurity & Cloud Security", type: "domain", category: "cybersecurity", desc: "Penetration Testing, Encryption & Cloud Infrastructure (50 Kits)" },
      { name: "Python & Data Science", type: "domain", category: "python-data", desc: "Scrapers, Bots, Dashboards & Data Analytics (50 Kits)" },
      { name: "Blockchain & Web3 DApps", type: "domain", category: "blockchain", desc: "Smart Contracts, Solidity, DApps & Decentralized Systems (50 Kits)" },
      { name: "Mobile App Development", type: "domain", category: "mobile", desc: "Cross-Platform Flutter & React Native Applications (50 Kits)" },
      { name: "Java & Enterprise Architecture", type: "domain", category: "java", desc: "Spring Boot, Microservices, Hibernate & Enterprise Systems (50 Kits)" },
      { name: "C / C++ Core Systems & Drivers", type: "domain", category: "c-cpp", desc: "System Programming, Compilers, OS & Embedded Drivers (50 Kits)" }
    ];
  }

  getTechCategories() {
    return [
      { name: "Python & Data Science", desc: "Flask, FastAPI, Pandas, NumPy, Scikit-learn, Automation Bots", count: "50 Kits" },
      { name: "AI, ML & Deep Learning", desc: "TensorFlow, PyTorch, OpenCV, YOLO, NLP Transformers & LLMs", count: "50 Kits" },
      { name: "Full-Stack Web (MERN / Django)", desc: "React.js, Node.js, Express, MongoDB, Django, REST APIs", count: "50 Kits" },
      { name: "Java & Spring Boot", desc: "Enterprise MVC, Microservices, Hibernate, MySQL, JSP / Servlets", count: "50 Kits" },
      { name: "IoT & Embedded Systems", desc: "ESP8266, ESP32, Arduino Uno, Raspberry Pi, Sensors, MQTT", count: "50 Kits" },
      { name: "Mobile App (Flutter & React Native)", desc: "Android, iOS, Firebase, State Management, Clean Architecture", count: "50 Kits" },
      { name: "Blockchain & Solidity", desc: "Ethereum, Hardhat, Web3.js, E-Voting, Supply Chain DApps", count: "50 Kits" },
      { name: "Cybersecurity & Cryptography", desc: "Network Sniffing, Threat Detection, Encryption Protocols", count: "50 Kits" },
      { name: "C / C++ Systems & OS", desc: "Memory Allocators, Kernel Simulation, Socket Programming", count: "50 Kits" }
    ];
  }

  getYearCategories() {
    return [
      { name: "1st Year", desc: "Beginner foundations, logic building, CLI tools, basic GUI applications", count: "90 Kits" },
      { name: "2nd Year", desc: "Database-driven applications, Object-Oriented design, Web basics", count: "110 Kits" },
      { name: "3rd Year", desc: "Complex domain applications, Machine Learning pipelines, RESTful services", count: "130 Kits" },
      { name: "4th Year", desc: "Industry-grade capstone systems, research projects, viva defense ready", count: "120 Kits" }
    ];
  }

  getProjectsByTech(techName) {
    const q = techName.toLowerCase();
    return this.allProjects.filter(p => {
      if (q.includes("python") && (p.category === "python-data" || (p.techStack && p.techStack.some(t => t.toLowerCase().includes("python"))))) return true;
      if (q.includes("ai") && (p.category === "ai-ml" || (p.techStack && p.techStack.some(t => /ai|ml|tensorflow|pytorch|opencv/i.test(t))))) return true;
      if (q.includes("full-stack") && (p.category === "web-dev" || (p.techStack && p.techStack.some(t => /react|node|django|mongo/i.test(t))))) return true;
      if (q.includes("java") && (p.category === "java" || (p.techStack && p.techStack.some(t => /java|spring/i.test(t))))) return true;
      if (q.includes("iot") && (p.category === "iot-embedded" || (p.techStack && p.techStack.some(t => /iot|arduino|esp32|raspberry/i.test(t))))) return true;
      if (q.includes("mobile") && (p.category === "mobile" || (p.techStack && p.techStack.some(t => /flutter|react native|android/i.test(t))))) return true;
      if (q.includes("blockchain") && (p.category === "blockchain" || (p.techStack && p.techStack.some(t => /solidity|web3|blockchain/i.test(t))))) return true;
      if (q.includes("cyber") && (p.category === "cybersecurity" || (p.techStack && p.techStack.some(t => /security|crypto|network/i.test(t))))) return true;
      if (q.includes("c / c++") || q.includes("c++")) return p.category === "c-cpp";
      return false;
    });
  }

  getProjectsForPath(degree, categoryOrYear) {
    const cleanDegree = degree.replace(" Projects", "").trim();
    return this.allProjects.filter(p => {
      // Degree match
      let degreeMatch = true;
      if (cleanDegree === "B.Tech") {
        degreeMatch = Array.isArray(p.degrees) && p.degrees.some(d => /b\.?tech/i.test(d));
      } else if (cleanDegree === "BCA") {
        degreeMatch = Array.isArray(p.degrees) && p.degrees.some(d => /bca/i.test(d));
      } else if (cleanDegree === "MCA") {
        degreeMatch = p.year >= 2;
      } else if (cleanDegree === "M.Tech") {
        degreeMatch = p.year === 4 || ["ai-ml", "cybersecurity", "blockchain", "iot-embedded"].includes(p.category);
      } else if (cleanDegree === "Diploma") {
        degreeMatch = p.year <= 3 || ["iot-embedded", "c-cpp", "python-data", "web-dev"].includes(p.category);
      }

      // Category / Year match
      if (categoryOrYear.includes("1st Year")) return degreeMatch && p.year === 1;
      if (categoryOrYear.includes("2nd Year")) return degreeMatch && p.year === 2;
      if (categoryOrYear.includes("3rd Year")) return degreeMatch && p.year === 3;
      if (categoryOrYear.includes("4th Year")) return degreeMatch && p.year === 4;

      if (categoryOrYear.includes("AI & Machine Learning") || categoryOrYear.includes("AI")) return degreeMatch && p.category === "ai-ml";
      if (categoryOrYear.includes("Web") || categoryOrYear.includes("Full Stack")) return degreeMatch && p.category === "web-dev";
      if (categoryOrYear.includes("IoT") || categoryOrYear.includes("Hardware")) return degreeMatch && p.category === "iot-embedded";
      if (categoryOrYear.includes("Cybersecurity")) return degreeMatch && p.category === "cybersecurity";
      if (categoryOrYear.includes("Python")) return degreeMatch && p.category === "python-data";
      if (categoryOrYear.includes("Blockchain")) return degreeMatch && p.category === "blockchain";
      if (categoryOrYear.includes("Mobile")) return degreeMatch && p.category === "mobile";
      if (categoryOrYear.includes("Java")) return degreeMatch && p.category === "java";
      if (categoryOrYear.includes("C / C++") || categoryOrYear.includes("C++")) return degreeMatch && p.category === "c-cpp";

      return degreeMatch;
    });
  }

  renderDirectoryContents(dirData) {
    if (!dirData) return;
    let html = "";
    let count = 0;

    // 1. Virtual Root
    if (dirData.type === "virtual-root") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          onClick: `window.explorer.navigateTo(['${item.name}'])`
        });
      });
    }

    // 2. Degree Level (e.g. /B.Tech Projects)
    else if (dirData.type === "degree-level") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: "Open Folder",
          onClick: `window.explorer.navigateTo(['${dirData.degree}', '${item.name}'])`
        });
      });
    }

    // 3. Tech Categories Level (e.g. /Browse by Technology)
    else if (dirData.type === "tech-category-list") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          onClick: `window.explorer.navigateTo(['Browse by Technology', '${item.name}'])`
        });
      });
    }

    // 4. Year Categories Level (e.g. /Browse by Year)
    else if (dirData.type === "year-category-list") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          onClick: `window.explorer.navigateTo(['Browse by Year', '${item.name}'])`
        });
      });
    }

    // 5. Project List (e.g. /B.Tech Projects/AI & Machine Learning)
    else if (dirData.type === "project-list") {
      const projects = dirData.projects || [];
      count = projects.length;

      if (projects.length === 0) {
        html = `
          <div class="explorer-empty-state">
            <p>No project kits found in this directory.</p>
            <button class="sw-button mt-2" onclick="window.explorer.navigateUp()">← Go Back</button>
          </div>
        `;
      } else {
        projects.forEach(proj => {
          html += this.getProjectRowHtml(proj);
        });
      }
    }

    this.listElement.innerHTML = html;
    if (this.folderCountBadge) {
      this.folderCountBadge.innerText = `${count} ${count === 1 ? 'item' : 'items'}`;
    }
  }

  renderSearchResults() {
    const q = this.searchQuery;
    const matchingProjects = this.allProjects.filter(p => 
      (p.title && p.title.toLowerCase().includes(q)) || 
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      (Array.isArray(p.techStack) && p.techStack.some(t => t.toLowerCase().includes(q))) ||
      (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q))
    ).slice(0, 40);

    let count = matchingProjects.length;
    let html = "";

    if (count === 0) {
      html = `
        <div class="explorer-empty-state">
          <p>No projects matching <strong>"${q}"</strong></p>
          <button class="sw-button mt-2" onclick="window.explorer.navigateUp()">Clear Search</button>
        </div>
      `;
    } else {
      matchingProjects.forEach(proj => {
        html += this.getProjectRowHtml(proj, true);
      });
    }

    this.listElement.innerHTML = html;
    if (this.folderCountBadge) {
      this.folderCountBadge.innerText = `${count} matching ${count === 1 ? 'project' : 'projects'}`;
    }
  }

  renderFavorites() {
    const savedIds = window.app ? window.app.bookmarkedIds : JSON.parse(localStorage.getItem("pf_bookmarks") || "[]");
    const favProjects = this.allProjects.filter(p => savedIds.includes(p.id));

    let html = "";
    if (favProjects.length === 0) {
      html = `
        <div class="explorer-empty-state">
          <p>You haven't saved any projects to your library yet.</p>
          <span style="font-size:0.85rem; color:var(--text-muted);">Click the bookmark icon on any project row to save it for quick defense review.</span>
        </div>
      `;
    } else {
      favProjects.forEach(proj => {
        html += this.getProjectRowHtml(proj);
      });
    }

    this.listElement.innerHTML = html;
    if (this.folderCountBadge) {
      this.folderCountBadge.innerText = `${favProjects.length} saved`;
    }
  }

  // --- HTML Builders for List Rows ---

  getFolderRowHtml({ title, desc, badge, onClick }) {
    return `
      <div class="explorer-item folder-item" onclick="${onClick}">
        <div class="item-media">
          <svg width="32" height="32" viewBox="0 0 16 16" class="folder-svg-icon">
            <path fill="#F5B800" d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
          </svg>
        </div>
        <div class="item-content">
          <div class="item-header">
            <span class="item-title font-excalifont">${title}</span>
            ${badge ? `<span class="item-badge">${badge}</span>` : ''}
          </div>
          ${desc ? `<p class="item-desc">${desc}</p>` : ''}
        </div>
        <div class="item-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
      <div class="sw-separator"></div>
    `;
  }

  getProjectRowHtml(proj, isSearchResult = false) {
    const isBookmarked = window.app?.bookmarkedIds?.includes(proj.id) || false;
    const techChips = Array.isArray(proj.techStack) ? proj.techStack.slice(0, 3).map(t => `<span class="tech-chip">${t}</span>`).join("") : "";
    const difficultyBadge = proj.difficulty ? `<span class="badge badge-${proj.difficulty.toLowerCase()}">${proj.difficulty}</span>` : "";

    return `
      <div class="explorer-item project-item" data-id="${proj.id}">
        <div class="item-media" onclick="window.app?.openProjectModal('${proj.id}')" title="Inspect project kit">
          <div class="code-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>
        <div class="item-content" onclick="window.app?.openProjectModal('${proj.id}')">
          <div class="item-header">
            <span class="item-title font-excalifont">${proj.title}</span>
            <div class="item-meta-tags">
              ${difficultyBadge}
              <span class="badge badge-year">Year ${proj.year || 3}</span>
              ${proj.hasHardware ? '<span class="badge badge-hw">Hardware</span>' : ''}
            </div>
          </div>
          <p class="item-desc">${proj.tagline || (proj.description ? proj.description.substring(0, 110) + '...' : '') || 'Complete project with working code, viva preparation, and PPT deck.'}</p>
          <div class="item-tech-row">
            ${techChips}
          </div>
        </div>
        <div class="item-actions">
          <button class="action-btn download-btn" onclick="event.stopPropagation(); window.projectDownloader?.downloadProjectKit('${proj.id}', this)" title="Download Complete Project Kit (ZIP)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span class="action-btn-text">ZIP Kit</span>
          </button>
          <button class="action-btn ppt-btn" onclick="event.stopPropagation(); window.pptViewer?.openViewer('${proj.id}')" title="Preview PPT Presentation Deck">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span class="action-btn-text">PPT</span>
          </button>
          <button class="action-btn bookmark-btn ${isBookmarked ? 'saved' : ''}" onclick="event.stopPropagation(); window.app?.toggleBookmark('${proj.id}')" title="Save to Favorites">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </button>
        </div>
      </div>
      <div class="sw-separator"></div>
    `;
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  window.explorer = new ForgeExplorer();
});
