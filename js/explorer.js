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
    // Parse URL hash for initial route (e.g. #/B.Tech or #/B.Tech/1st%20Year%20Projects)
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
    // Root directory: Course Folders
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

    // "Browse All Projects" folder
    if (firstSeg === "Browse All 450 Projects" || firstSeg === "All Projects") {
      return {
        type: "project-list",
        folderName: "All 450 Academic Projects",
        projects: this.allProjects
      };
    }

    // Course Level: e.g. ["B.Tech"], ["BCA"], ["B.Sc"], ["Diploma"], ["MCA & M.Tech"]
    if (this.currentPath.length === 1) {
      return {
        type: "course-level",
        course: firstSeg,
        items: this.getCourseItems(firstSeg)
      };
    }

    // Subfolder Level: e.g. ["B.Tech", "1st Year Projects & PPTs"] or ["BCA", "AI & Machine Learning"]
    if (this.currentPath.length === 2) {
      const secondSeg = this.currentPath[1];
      return {
        type: "project-list",
        course: firstSeg,
        categoryOrYear: secondSeg,
        projects: this.getProjectsForCourseAndPath(firstSeg, secondSeg)
      };
    }

    return { type: "empty", items: [] };
  }

  getRootItems() {
    const courses = [
      { name: "B.Tech", courseKey: "B.Tech", desc: "Computer Science, AI/ML, IoT, ECE & Engineering Projects (450 Kits)", count: "300+ Kits" },
      { name: "BCA", courseKey: "BCA", desc: "Bachelor of Computer Applications Final & Mini Projects", count: "80+ Kits" },
      { name: "B.Sc", courseKey: "B.Sc", desc: "CS, IT, Animation & Information Tech Academic Projects", count: "50+ Kits" },
      { name: "Diploma", courseKey: "Diploma", desc: "Polytechnic Engineering & Technical Practical Kits", count: "35+ Kits" },
      { name: "MCA & M.Tech", courseKey: "MCA & M.Tech", desc: "Advanced Research, System & Capstone Enterprise Projects", count: "40+ Kits" },
      { name: "Browse by Technology", courseKey: "tech", desc: "Filter by Stack: Python, AI/ML, MERN, Java, IoT, Mobile, Blockchain, C++", count: "8 Stacks" }
    ];

    if (this.currentMode === "btech") {
      return courses.filter(c => c.courseKey === "B.Tech");
    }
    if (this.currentMode === "bca") {
      return courses.filter(c => c.courseKey === "BCA" || c.courseKey === "B.Sc" || c.courseKey === "Diploma");
    }
    if (this.currentMode === "mca") {
      return courses.filter(c => c.courseKey === "MCA & M.Tech");
    }

    return courses;
  }

  getCourseItems(course) {
    if (course === "B.Tech") {
      return [
        { name: "1st Year Projects & PPTs", desc: "Foundational Programming, Python, Web & Algorithms (Working Code & 10-Slide PPTs)", count: "111 Kits", type: "year" },
        { name: "2nd Year Projects & PPTs", desc: "Core OOP, DBMS, Web Development & Mini Projects (Working Code & 10-Slide PPTs)", count: "117 Kits", type: "year" },
        { name: "3rd Year Projects & PPTs", desc: "Advanced Full-Stack, Machine Learning & Systems (Working Code & 10-Slide PPTs)", count: "116 Kits", type: "year" },
        { name: "4th Year Major Capstone & PPTs", desc: "Comprehensive Capstone Systems, IEEE Defense Ready (Working Code & 10-Slide PPTs)", count: "106 Kits", type: "year" },
        { name: "All B.Tech Projects & PPTs", desc: "Complete 4-Year B.Tech Catalog Index with Source Code & Presentation Decks", count: "450 Kits", type: "all" },
        // Domains
        { name: "AI & Machine Learning", desc: "Computer Vision, NLP, Deep Learning & Predictive Models (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Web & Full Stack Development", desc: "MERN, Django, Spring Boot & React Applications (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "IoT & Hardware Embedded", desc: "ESP32, Arduino, Raspberry Pi & Smart Automation (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Cybersecurity & Cloud", desc: "Penetration Testing, Encryption & Cloud Infrastructure (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Python & Data Science", desc: "Scrapers, Bots, Dashboards & Data Analytics (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Blockchain & Web3 DApps", desc: "Smart Contracts, Solidity & Decentralized Systems (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Mobile App Development", desc: "Cross-Platform Flutter & React Native Applications (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Java & Enterprise Systems", desc: "Spring Boot, Microservices & Enterprise Architecture (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "C / C++ Core Systems", desc: "System Programming, OS, Compilers & Embedded Drivers (Working Code & PPT)", count: "50 Kits", type: "domain" }
      ];
    }

    if (course === "BCA") {
      return [
        { name: "1st Year Projects & PPTs", desc: "Web Basics, Python Automation & Logic Building (Working Code & 10-Slide PPTs)", count: "111 Kits", type: "year" },
        { name: "2nd Year Projects & PPTs", desc: "Full-Stack Web, DBMS, Mobile & Desktop Apps (Working Code & 10-Slide PPTs)", count: "117 Kits", type: "year" },
        { name: "3rd Year Final Projects & PPTs", desc: "Final Year Capstone, AI, Cloud & Defense Ready (Working Code & 10-Slide PPTs)", count: "116 Kits", type: "year" },
        { name: "All BCA Projects & PPTs", desc: "Complete BCA Catalog Index with Source Code & Presentation Decks", count: "344 Kits", type: "all" },
        // Domains
        { name: "Web & Full Stack Development", desc: "MERN, Django & React Web Applications (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Python & Data Science", desc: "Automation Bots, GUI Tools & Dashboards (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "AI & Machine Learning", desc: "Machine Learning & Smart Classification (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Mobile App Development", desc: "Flutter & Mobile Applications (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Java & Enterprise Systems", desc: "Java MVC & Database Systems (Working Code & PPT)", count: "50 Kits", type: "domain" }
      ];
    }

    if (course === "B.Sc") {
      return [
        { name: "1st Year Projects & PPTs", desc: "Foundations of Computing, Python & Interactive Tools (Working Code & 10-Slide PPTs)", count: "111 Kits", type: "year" },
        { name: "2nd Year Projects & PPTs", desc: "Data Analytics, Web Apps & Software Mini Projects (Working Code & 10-Slide PPTs)", count: "117 Kits", type: "year" },
        { name: "3rd Year Final Projects & PPTs", desc: "Final Year Software, Practical Systems & Capstones (Working Code & 10-Slide PPTs)", count: "116 Kits", type: "year" },
        { name: "All B.Sc Projects & PPTs", desc: "Complete B.Sc Catalog Index with Source Code & Presentation Decks", count: "344 Kits", type: "all" },
        // Domains
        { name: "Python & Data Science", desc: "Data Analysis, Scrapers & Automation (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Web & Full Stack Development", desc: "Full Stack & Web Applications (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "AI & Machine Learning", desc: "Machine Learning & Neural Nets (Working Code & PPT)", count: "50 Kits", type: "domain" }
      ];
    }

    if (course === "Diploma") {
      return [
        { name: "1st Year Projects & PPTs", desc: "Programming Foundations, Logic Building & Practical Labs (Working Code & 10-Slide PPTs)", count: "111 Kits", type: "year" },
        { name: "2nd Year Projects & PPTs", desc: "Embedded Systems, Microcontrollers, Sensors & Web Basics (Working Code & 10-Slide PPTs)", count: "117 Kits", type: "year" },
        { name: "3rd Year Final Projects & PPTs", desc: "Polytechnic Final Year Projects & IoT Automation (Working Code & 10-Slide PPTs)", count: "116 Kits", type: "year" },
        { name: "All Diploma Projects & PPTs", desc: "Complete Polytechnic Diploma Catalog Index with Source Code & Presentation Decks", count: "344 Kits", type: "all" },
        // Domains
        { name: "IoT & Hardware Embedded", desc: "ESP32, Arduino & Sensor Automation (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "C / C++ Core Systems", desc: "Microcontroller C, Systems & Drivers (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Web & Full Stack Development", desc: "Responsive Web Development (Working Code & PPT)", count: "50 Kits", type: "domain" }
      ];
    }

    if (course === "MCA & M.Tech" || course === "MCA") {
      return [
        { name: "1st Year Projects & PPTs", desc: "Advanced Systems, Distributed Architecture & Cloud (Working Code & 10-Slide PPTs)", count: "116 Kits", type: "year" },
        { name: "2nd Year Capstone & Dissertation", desc: "Deep Learning, Security Protocols & Master Thesis Capstones (Working Code & 10-Slide PPTs)", count: "106 Kits", type: "year" },
        { name: "All MCA & M.Tech Projects & PPTs", desc: "Complete Postgraduate Catalog Index with Source Code & Presentation Decks", count: "222 Kits", type: "all" },
        // Domains
        { name: "AI & Machine Learning", desc: "Advanced Deep Learning & NLP (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Cybersecurity & Cloud", desc: "Threat Detection & Cloud Security (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Blockchain & Web3 DApps", desc: "Enterprise DApps & Smart Contracts (Working Code & PPT)", count: "50 Kits", type: "domain" },
        { name: "Web & Full Stack Development", desc: "Microservices & Enterprise Full-Stack (Working Code & PPT)", count: "50 Kits", type: "domain" }
      ];
    }

    return [];
  }

  getTechCategories() {
    return [
      { name: "Python & Data Science", desc: "Flask, FastAPI, Pandas, NumPy, Scikit-learn, Automation Bots (Working Code & PPT)", count: "50 Kits" },
      { name: "AI, ML & Deep Learning", desc: "TensorFlow, PyTorch, OpenCV, YOLO, NLP Transformers & LLMs (Working Code & PPT)", count: "50 Kits" },
      { name: "Full-Stack Web (MERN / Django)", desc: "React.js, Node.js, Express, MongoDB, Django, REST APIs (Working Code & PPT)", count: "50 Kits" },
      { name: "Java & Spring Boot", desc: "Enterprise MVC, Microservices, Hibernate, MySQL, JSP / Servlets (Working Code & PPT)", count: "50 Kits" },
      { name: "IoT & Embedded Systems", desc: "ESP8266, ESP32, Arduino Uno, Raspberry Pi, Sensors, MQTT (Working Code & PPT)", count: "50 Kits" },
      { name: "Mobile App (Flutter & React Native)", desc: "Android, iOS, Firebase, State Management, Clean Architecture (Working Code & PPT)", count: "50 Kits" },
      { name: "Blockchain & Solidity", desc: "Ethereum, Hardhat, Web3.js, E-Voting, Supply Chain DApps (Working Code & PPT)", count: "50 Kits" },
      { name: "Cybersecurity & Cryptography", desc: "Network Sniffing, Threat Detection, Encryption Protocols (Working Code & PPT)", count: "50 Kits" },
      { name: "C / C++ Systems & OS", desc: "Memory Allocators, Kernel Simulation, Socket Programming (Working Code & PPT)", count: "50 Kits" }
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

  getProjectsForCourseAndPath(course, yearOrCat) {
    return this.allProjects.filter(p => {
      // 1. Course Scope
      let courseMatch = true;
      if (course === "Diploma") {
        courseMatch = p.year <= 3;
      } else if (course === "MCA & M.Tech" || course === "MCA") {
        courseMatch = p.year >= 3;
      }

      if (!courseMatch) return false;

      // 2. Year Matching
      if (course === "MCA & M.Tech") {
        if (yearOrCat.includes("1st Year")) return p.year === 3;
        if (yearOrCat.includes("2nd Year") || yearOrCat.includes("Capstone")) return p.year === 4;
      } else {
        if (yearOrCat.includes("1st Year")) return p.year === 1;
        if (yearOrCat.includes("2nd Year")) return p.year === 2;
        if (yearOrCat.includes("3rd Year")) return p.year === 3;
        if (yearOrCat.includes("4th Year")) return p.year === 4;
      }

      if (yearOrCat.includes("All")) return true;

      // 3. Category Matching
      if (yearOrCat.includes("AI & Machine Learning") || yearOrCat.includes("AI")) return p.category === "ai-ml";
      if (yearOrCat.includes("Web") || yearOrCat.includes("Full Stack")) return p.category === "web-dev";
      if (yearOrCat.includes("IoT") || yearOrCat.includes("Hardware")) return p.category === "iot-embedded";
      if (yearOrCat.includes("Cybersecurity") || yearOrCat.includes("Cloud")) return p.category === "cybersecurity";
      if (yearOrCat.includes("Python") || yearOrCat.includes("Data")) return p.category === "python-data";
      if (yearOrCat.includes("Blockchain") || yearOrCat.includes("Web3")) return p.category === "blockchain";
      if (yearOrCat.includes("Mobile")) return p.category === "mobile";
      if (yearOrCat.includes("Java")) return p.category === "java";
      if (yearOrCat.includes("C / C++") || yearOrCat.includes("C++")) return p.category === "c-cpp";

      return true;
    });
  }

  renderDirectoryContents(dirData) {
    if (!dirData) return;
    let html = "";
    let count = 0;

    // 1. Virtual Root (Course folders)
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

    // 2. Course Level (Years & Categories inside selected course)
    else if (dirData.type === "course-level") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          onClick: `window.explorer.navigateTo(['${dirData.course}', '${item.name}'])`
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

    // 4. Project List (Projects inside selected course + year/domain)
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
        <div class="item-media" onclick="window.app?.openProjectModal('${proj.id}')" title="Inspect working project & PPT">
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
              <span class="badge badge-working">⚡ Working Code</span>
              <span class="badge badge-ppt">📊 10-Slide PPT</span>
            </div>
          </div>
          <p class="item-desc">${proj.tagline || (proj.description ? proj.description.substring(0, 110) + '...' : '') || 'Complete working project with runnable source code, viva preparation, and 10-slide PPT deck.'}</p>
          <div class="item-tech-row">
            ${techChips}
          </div>
        </div>
        <div class="item-actions">
          <button class="action-btn download-btn" onclick="event.stopPropagation(); window.projectDownloader?.downloadProjectKit('${proj.id}', this)" title="Download Complete Working Source Code Kit (ZIP)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span class="action-btn-text">ZIP Kit</span>
          </button>
          <button class="action-btn ppt-btn" onclick="event.stopPropagation(); window.pptViewer?.openViewer('${proj.id}')" title="Preview 10-Slide PPT Presentation Deck">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span class="action-btn-text">PPT</span>
          </button>
          <button class="action-btn bookmark-btn ${isBookmarked ? 'saved' : ''}" onclick="event.stopPropagation(); window.app?.toggleBookmark('${proj.id}')" title="Save to Favorites">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
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
