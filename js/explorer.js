/**
 * ForgeProject Explorer - Minimalist Directory Tree & Breadcrumbs Navigator
 * Replicates the clean folder navigation and design of haldwani.gehu.in/pyqs
 */

class ForgeExplorer {
  constructor() {
    this.currentPath = [];
    this.searchQuery = "";
    this.currentMode = "all"; // 'all', 'projects', 'pyqs', 'favorites'
    this.allProjects = typeof PROJECTS_DATA !== "undefined" ? PROJECTS_DATA : [];
    this.pyqsTree = typeof GEHU_PYQS_DATA !== "undefined" ? GEHU_PYQS_DATA : null;

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
    // Parse URL hash for initial route (e.g. #btech/cse or #pyqs/btech)
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

    // Mode filter pills (All, Projects, PYQs, Favorites)
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
    // If inside "PYQs Archive"
    if (this.currentPath[0] === "PYQs Archive" && this.pyqsTree) {
      let node = this.pyqsTree;
      for (let i = 1; i < this.currentPath.length; i++) {
        const seg = this.currentPath[i];
        if (node && Array.isArray(node.children)) {
          node = node.children.find(c => c.name.toLowerCase() === seg.toLowerCase());
        } else {
          node = null;
          break;
        }
      }
      return {
        type: "pyqs-folder",
        node: node || { name: this.currentPath[this.currentPath.length - 1], children: [] }
      };
    }

    // Root directory
    if (this.currentPath.length === 0) {
      return {
        type: "virtual-root",
        items: this.getRootItems()
      };
    }

    // Degree Level: e.g. ["B.Tech"] or ["BCA"]
    const firstSeg = this.currentPath[0];
    if (this.currentPath.length === 1) {
      return {
        type: "degree-level",
        degree: firstSeg,
        items: this.getDegreeCategories(firstSeg)
      };
    }

    // Subfolder Level: e.g. ["B.Tech", "AI & Machine Learning"] or ["B.Tech", "3rd Year"]
    const secondSeg = this.currentPath[1];
    if (this.currentPath.length === 2) {
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
    const degrees = [
      { name: "B.Tech", desc: "Computer Science, AI/ML, IoT, ECE & Engineering Projects (450 Kits)", count: "300+ Kits", icon: "folder" },
      { name: "BCA", desc: "Bachelor of Computer Applications Final & Mini Projects", count: "80+ Kits", icon: "folder" },
      { name: "B.Sc", desc: "CS, IT, Animation & Information Tech Academic Projects", count: "50+ Kits", icon: "folder" },
      { name: "Diploma", desc: "Polytechnic Engineering & Technical Practical Kits", count: "35+ Kits", icon: "folder" },
      { name: "MCA & M.Tech", desc: "Advanced Research, System & Capstone Enterprise Projects", count: "40+ Kits", icon: "folder" },
      { name: "PYQs Archive", desc: "GEHU Previous Year Question Papers for All Branches & Semesters", count: "Archive", icon: "pyq-folder" }
    ];

    if (this.currentMode === "projects") {
      return degrees.filter(d => d.name !== "PYQs Archive");
    }
    if (this.currentMode === "pyqs") {
      return degrees.filter(d => d.name === "PYQs Archive");
    }
    return degrees;
  }

  getDegreeCategories(degree) {
    // Domains / Categories available for this degree
    const categories = [
      { name: "1st Year Projects", type: "year", year: 1, desc: "Introductory Programming, Python & Starter Kits" },
      { name: "2nd Year Projects", type: "year", year: 2, desc: "Core OOP, DBMS, Web & Algorithms Mini Projects" },
      { name: "3rd Year Projects", type: "year", year: 3, desc: "Advanced Full-Stack, Machine Learning & Systems" },
      { name: "4th Year Major Projects", type: "year", year: 4, desc: "Comprehensive Capstone & Defense Ready Kits" },
      { name: "AI & Machine Learning", type: "domain", category: "ai-ml", desc: "Computer Vision, NLP, Deep Learning & Predictive Models (50 Kits)" },
      { name: "Full Stack & Web Dev", type: "domain", category: "web", desc: "MERN, Django, Spring Boot & React Applications (50 Kits)" },
      { name: "IoT & Hardware", type: "domain", category: "iot", desc: "ESP32, Arduino, Raspberry Pi & Smart Automation (50 Kits)" },
      { name: "Cybersecurity & Cloud", type: "domain", category: "cybersecurity", desc: "Penetration Testing, Encryption & Cloud Infrastructure (50 Kits)" },
      { name: "Python & Automation", type: "domain", category: "python", desc: "Scrapers, Bots, Dashboards & Data Analytics (50 Kits)" },
      { name: "Blockchain & Web3", type: "domain", category: "blockchain", desc: "Smart Contracts, Solidity, DApps & Decentralized Systems (50 Kits)" },
      { name: "Mobile App Development", type: "domain", category: "mobile", desc: "Cross-Platform Flutter & React Native Applications (50 Kits)" }
    ];
    return categories;
  }

  getProjectsForPath(degree, categoryOrYear) {
    return this.allProjects.filter(p => {
      // Degree match
      const degreeMatch = degree === "All" || (Array.isArray(p.degrees) && p.degrees.some(d => d.toLowerCase().includes(degree.toLowerCase())));
      
      // Category / Year match
      if (categoryOrYear.includes("1st Year")) return degreeMatch && p.year === 1;
      if (categoryOrYear.includes("2nd Year")) return degreeMatch && p.year === 2;
      if (categoryOrYear.includes("3rd Year")) return degreeMatch && p.year === 3;
      if (categoryOrYear.includes("4th Year")) return degreeMatch && p.year === 4;

      if (categoryOrYear.includes("AI & Machine Learning")) return degreeMatch && p.category === "ai-ml";
      if (categoryOrYear.includes("Web")) return degreeMatch && (p.category === "web" || p.category === "full-stack");
      if (categoryOrYear.includes("IoT")) return degreeMatch && p.category === "iot";
      if (categoryOrYear.includes("Cybersecurity")) return degreeMatch && p.category === "cybersecurity";
      if (categoryOrYear.includes("Python")) return degreeMatch && p.category === "python";
      if (categoryOrYear.includes("Blockchain")) return degreeMatch && p.category === "blockchain";
      if (categoryOrYear.includes("Mobile")) return degreeMatch && p.category === "mobile";

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
        const isPyq = item.name === "PYQs Archive";
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          isPyq: isPyq,
          onClick: `window.explorer.navigateTo(['${item.name}'])`
        });
      });
    }

    // 2. Degree Level (e.g. /B.Tech)
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

    // 3. Project List (e.g. /B.Tech/AI & Machine Learning)
    else if (dirData.type === "project-list") {
      const projects = dirData.projects || [];
      count = projects.length;

      if (projects.length === 0) {
        html = `<div class="explorer-empty-state"><p>No projects found in this folder.</p></div>`;
      } else {
        projects.forEach(proj => {
          html += this.getProjectRowHtml(proj);
        });
      }
    }

    // 4. PYQs Folder from GEHU Tree
    else if (dirData.type === "pyqs-folder") {
      const node = dirData.node;
      const children = node?.children || [];
      count = children.length;

      if (children.length === 0) {
        html = `<div class="explorer-empty-state"><p>No papers or folders in this directory yet.</p></div>`;
      } else {
        children.forEach(child => {
          if (child.type === "folder") {
            const nextPath = [...this.currentPath, child.name];
            const pathParam = JSON.stringify(nextPath).replace(/"/g, '&quot;');
            html += this.getFolderRowHtml({
              title: child.name,
              desc: child.description || "Browse semester question papers",
              badge: "Folder",
              isPyq: true,
              onClick: `window.explorer.navigateTo(${pathParam})`
            });
          } else if (child.type === "pdf") {
            html += this.getPdfRowHtml(child);
          }
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
      p.title.toLowerCase().includes(q) || 
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      (Array.isArray(p.techStack) && p.techStack.some(t => t.toLowerCase().includes(q))) ||
      (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q))
    ).slice(0, 30);

    const matchingPyqs = this.searchPyqs(q).slice(0, 20);

    let count = matchingProjects.length + matchingPyqs.length;
    let html = "";

    if (count === 0) {
      html = `
        <div class="explorer-empty-state">
          <p>No projects or question papers matching <strong>"${q}"</strong></p>
          <button class="sw-button mt-2" onclick="window.explorer.navigateUp()">Clear Search</button>
        </div>
      `;
    } else {
      matchingProjects.forEach(proj => {
        html += this.getProjectRowHtml(proj, true);
      });
      matchingPyqs.forEach(pyq => {
        html += this.getPdfRowHtml(pyq, true);
      });
    }

    this.listElement.innerHTML = html;
    if (this.folderCountBadge) {
      this.folderCountBadge.innerText = `${count} matching ${count === 1 ? 'result' : 'results'}`;
    }
  }

  searchPyqs(query, node = this.pyqsTree, path = []) {
    if (!node) return [];
    let results = [];
    const currentPath = [...path, node.name];

    if (node.type === "pdf" && node.name.toLowerCase().includes(query)) {
      results.push({ ...node, path: currentPath.slice(0, -1).join(" / ") });
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(child => {
        results = results.concat(this.searchPyqs(query, child, currentPath));
      });
    }

    return results;
  }

  renderFavorites() {
    const savedIds = window.app ? window.app.bookmarkedIds : JSON.parse(localStorage.getItem("pf_bookmarks") || "[]");
    const favProjects = this.allProjects.filter(p => savedIds.includes(p.id));

    let html = "";
    if (favProjects.length === 0) {
      html = `
        <div class="explorer-empty-state">
          <p>You haven't saved any projects to your favorites yet.</p>
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

  // --- HTML Builders for List Rows matching GEHU PYQs ---

  getFolderRowHtml({ title, desc, badge, isPyq, onClick }) {
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

  getProjectRowHtml(proj, showPath = false) {
    const isBookmarked = window.app ? window.app.bookmarkedIds.includes(proj.id) : false;
    const techPills = (proj.techStack || []).slice(0, 3).map(t => `<span class="pill-badge">${t}</span>`).join("");

    return `
      <div class="explorer-item file-item project-item" data-id="${proj.id}">
        <div class="item-media">
          <div class="code-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        <div class="item-content" onclick="window.explorer.openProjectModal('${proj.id}')">
          <div class="item-header">
            <span class="item-title">${proj.title}</span>
            <span class="item-badge success">Verified Kit</span>
          </div>
          <p class="item-desc">${proj.tagline || ''}</p>
          <div class="item-meta-row">
            <span class="meta-tag">🎓 ${proj.yearLabel || 'Academic Project'}</span>
            ${techPills}
            <span class="meta-tag ppt-tag">📊 10-Slide PPT</span>
          </div>
        </div>

        <div class="item-actions">
          <button class="action-icon-btn ${isBookmarked ? 'active' : ''}" title="Bookmark" onclick="event.stopPropagation(); window.explorer.toggleBookmark('${proj.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button class="sw-button primary sm" title="Download Verified Project ZIP" onclick="event.stopPropagation(); window.explorer.downloadKit('${proj.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            ZIP Kit
          </button>
          <button class="sw-button outline sm" title="View 10-Slide Presentation" onclick="event.stopPropagation(); window.explorer.previewPpt('${proj.id}')">
            PPT
          </button>
        </div>
      </div>
      <div class="sw-separator"></div>
    `;
  }

  getPdfRowHtml(pyq, showPath = false) {
    const paperUrl = pyq.url || `https://haldwani.gehu.in/pyqs/`;
    return `
      <div class="explorer-item file-item pdf-item">
        <div class="item-media">
          <svg width="32" height="32" viewBox="0 0 16 16" class="pdf-svg-icon">
            <g fill="#ef4444">
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
              <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029"/>
            </g>
          </svg>
        </div>
        <div class="item-content" onclick="window.open('${paperUrl}', '_blank')">
          <div class="item-header">
            <span class="item-title font-medium">${pyq.name}</span>
            <span class="item-badge pdf-badge">GEHU PYQ</span>
          </div>
          <p class="item-desc">${pyq.date ? pyq.date : (pyq.path || 'Previous Year Examination Question Paper')}</p>
        </div>
        <div class="item-actions">
          <a class="sw-button outline sm" href="${paperUrl}" target="_blank">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            View Paper
          </a>
        </div>
      </div>
      <div class="sw-separator"></div>
    `;
  }

  // --- Action Bridges into app.js ---

  openProjectModal(id) {
    const proj = this.allProjects.find(p => p.id === id);
    if (proj && window.app) {
      window.app.openProjectModal(proj);
    }
  }

  downloadKit(id) {
    const proj = this.allProjects.find(p => p.id === id);
    if (proj && window.app && window.projectDownloader) {
      window.app.getProjectFullDetails(proj).then(fullProj => {
        const meta = window.pptViewer?.customMetadata || {};
        window.projectDownloader.downloadProjectKit(fullProj, meta);
      });
    }
  }

  previewPpt(id) {
    const proj = this.allProjects.find(p => p.id === id);
    if (proj && window.app) {
      window.app.openProjectModal(proj);
      setTimeout(() => {
        document.querySelector('[data-tab="ppt"]')?.click();
      }, 150);
    }
  }

  toggleBookmark(id) {
    if (window.app) {
      window.app.toggleBookmark(id);
      this.render();
    }
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.explorer = new ForgeExplorer();
});
