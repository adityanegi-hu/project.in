/**
 * ForgeProject Explorer - Directory Tree & Breadcrumbs Navigator
 * Clean folder navigation aesthetic exclusively for verified Academic Projects,
 * Runnable Source Code Kits, and 10-Slide PowerPoint (PPT) Presentation Decks.
 */

class ForgeExplorer {
  constructor() {
    this.currentPath = [];
    this.searchQuery = "";
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
    // Parse URL hash for initial route
    this.handleHashChange();
    window.addEventListener("hashchange", () => this.handleHashChange());
    window.addEventListener("popstate", () => this.handleHashChange());

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

    // Mode filter pills - direct navigation
    this.modePills.forEach(pill => {
      pill.addEventListener("click", () => {
        const mode = pill.getAttribute("data-mode") || "all";
        if (mode === "all") {
          this.navigateTo([]);
        } else if (mode === "btech") {
          this.navigateTo(["B.Tech"]);
        } else if (mode === "bca") {
          this.navigateTo(["BCA, B.Sc & Diploma"]);
        } else if (mode === "mca") {
          this.navigateTo(["MCA & M.Tech"]);
        } else if (mode === "favorites") {
          this.navigateTo(["Saved Library"]);
        }
      });
    });

    // Delegated click listener for folder items - handles any depth & special characters safely
    this.listElement?.addEventListener("click", (e) => {
      const folderEl = e.target.closest(".folder-item");
      if (folderEl) {
        e.preventDefault();
        const rawPath = folderEl.getAttribute("data-folder-path");
        if (rawPath) {
          try {
            const targetPath = JSON.parse(rawPath);
            this.navigateTo(targetPath);
          } catch (err) {
            console.error("Folder path JSON parse error:", err);
          }
        }
      }
    });

    // Keyboard accessibility for folder items
    this.listElement?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const folderEl = e.target.closest(".folder-item");
        if (folderEl) {
          e.preventDefault();
          folderEl.click();
        }
      }
    });

    this.syncActivePill();
    this.render();
  }

  handleHashChange() {
    const rawHash = window.location.hash.replace(/^#\/?/, "");
    if (!rawHash) {
      this.currentPath = [];
      // If at root and hash has # or #/, clean the address bar cleanly without page reload
      if (window.location.hash && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    } else {
      this.currentPath = rawHash.split("/").map(s => {
        try {
          return decodeURIComponent(s);
        } catch {
          return s;
        }
      }).filter(Boolean);
    }
    this.syncActivePill();
    this.render();
  }

  syncActivePill() {
    if (!this.modePills || this.modePills.length === 0) return;
    let activeMode = "all";

    if (this.currentPath.length === 0) {
      activeMode = "all";
    } else {
      const first = (this.currentPath[0] || "").toLowerCase();
      if (first.includes("b.tech")) {
        activeMode = "btech";
      } else if (first.includes("bca") || first.includes("b.sc") || first.includes("diploma")) {
        activeMode = "bca";
      } else if (first.includes("mca") || first.includes("m.tech")) {
        activeMode = "mca";
      } else if (first.includes("saved") || first.includes("favorite")) {
        activeMode = "favorites";
      } else {
        activeMode = "all";
      }
    }

    this.modePills.forEach(pill => {
      const mode = pill.getAttribute("data-mode");
      if (mode === activeMode) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
  }

  navigateTo(newPath) {
    this.searchQuery = "";
    if (this.searchInput) this.searchInput.value = "";
    if (this.searchClearBtn) this.searchClearBtn.style.display = "none";

    this.currentPath = [...newPath];
    const hashStr = this.currentPath.map(s => encodeURIComponent(s)).join("/");

    if (hashStr) {
      const targetHash = `#/${hashStr}`;
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      } else {
        this.syncActivePill();
        this.render();
      }
    } else {
      // At root: remove '#' / '#/' completely from the URL bar!
      if (window.location.hash) {
        if (window.history.pushState) {
          window.history.pushState(null, "", window.location.pathname + window.location.search);
        } else {
          window.location.hash = "";
        }
      }
      this.syncActivePill();
      this.render();
    }
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
        <a href="#" onclick="event.preventDefault(); window.explorer?.navigateTo([])" class="${this.currentPath.length === 0 && !this.searchQuery ? 'current' : ''}">forgeproject</a>
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

    // 2. Folder Navigation Mode
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

    // Favorites Mode
    if (firstSeg === "Saved Library" || firstSeg === "Favorites") {
      return {
        type: "favorites",
        items: []
      };
    }

    // Group Folder: "BCA, B.Sc & Diploma"
    if (/bca.*b\.?sc.*diploma/i.test(firstSeg) || firstSeg === "BCA, B.Sc & Diploma") {
      if (this.currentPath.length === 1) {
        return {
          type: "bca-group",
          items: this.getBcaGroupItems()
        };
      }
      if (this.currentPath.length === 2) {
        const subCourse = this.currentPath[1];
        return {
          type: "course-level",
          course: subCourse,
          items: this.getCourseItems(subCourse)
        };
      }
      if (this.currentPath.length >= 3) {
        const subCourse = this.currentPath[1];
        const yearOrCat = this.currentPath[2];
        return {
          type: "project-list",
          course: subCourse,
          categoryOrYear: yearOrCat,
          projects: this.getProjectsForCourseAndPath(subCourse, yearOrCat)
        };
      }
    }

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
    if (firstSeg === "Browse All 450 Projects" || firstSeg === "All Projects" || firstSeg === "All 450 Projects") {
      return {
        type: "project-list",
        folderName: "All 450 Academic Projects",
        projects: this.allProjects
      };
    }

    // Course Level: e.g. ["B.Tech"], ["BCA"], ["B.Sc"], ["Diploma"], ["MCA & M.Tech"]
    let normalizedCourse = firstSeg;
    if (/^b\.?tech/i.test(firstSeg)) {
      normalizedCourse = "B.Tech";
    }

    if (this.currentPath.length === 1) {
      return {
        type: "course-level",
        course: normalizedCourse,
        items: this.getCourseItems(normalizedCourse)
      };
    }

    // Subfolder Level: e.g. ["BCA", "1st Year Projects & PPTs"] or ["MCA & M.Tech", "1st Year Projects & PPTs"]
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
    return [
      { name: "B.Tech", courseKey: "B.Tech", desc: "Computer Science, AI/ML, IoT, ECE & Engineering Projects (450 Kits)", count: "450 Kits", targetPath: ["B.Tech"] },
      { name: "BCA", courseKey: "BCA", desc: "Bachelor of Computer Applications Final & Mini Projects (344 Kits)", count: "344 Kits", targetPath: ["BCA"] },
      { name: "B.Sc", courseKey: "B.Sc", desc: "CS, IT, Animation & Information Tech Academic Projects (344 Kits)", count: "344 Kits", targetPath: ["B.Sc"] },
      { name: "Diploma", courseKey: "Diploma", desc: "Polytechnic Engineering & Technical Practical Kits (344 Kits)", count: "344 Kits", targetPath: ["Diploma"] },
      { name: "MCA & M.Tech", courseKey: "MCA & M.Tech", desc: "Advanced Research, Systems & Capstone Projects (40 Kits)", count: "40 Kits", targetPath: ["MCA & M.Tech"] },
      { name: "Browse by Technology", courseKey: "tech", desc: "Filter by Stack: Python, AI/ML, FastAPI, React, Node.js, Flutter, Java, IoT, Web3, DevOps & 16 Stacks", count: "16 Stacks", targetPath: ["Browse by Technology"] }
    ];
  }

  getBcaGroupItems() {
    return [
      { name: "BCA", desc: "Bachelor of Computer Applications (1st, 2nd & 3rd Year Projects & PPTs)", count: "344 Kits", targetPath: ["BCA"] },
      { name: "B.Sc", desc: "Bachelor of Science in CS, IT & Software Systems (Working Code & PPTs)", count: "344 Kits", targetPath: ["B.Sc"] },
      { name: "Diploma", desc: "Polytechnic Engineering & Technical Labs (Working Code & PPTs)", count: "344 Kits", targetPath: ["Diploma"] }
    ];
  }

  // Exactly 20 Curated Projects for MCA & M.Tech 1st Year
  getMcaYear1() {
    const cats = ['ai-ml', 'web-dev', 'cybersecurity', 'python-data', 'java', 'mobile', 'blockchain'];
    let list = [];
    cats.forEach(c => {
      const count = (c === 'blockchain') ? 2 : 3;
      const filtered = this.allProjects.filter(p => p.category === c && (p.year === 2 || p.year === 3)).slice(0, count);
      list = list.concat(filtered);
    });
    return list.slice(0, 20);
  }

  // Exactly 20 Curated Capstone / Thesis Projects for MCA & M.Tech 2nd Year
  getMcaYear2() {
    const cats = ['ai-ml', 'web-dev', 'cybersecurity', 'blockchain', 'java', 'mobile', 'iot-embedded', 'python-data'];
    let list = [];
    cats.forEach(c => {
      const count = (c === 'blockchain' || c === 'iot-embedded' || c === 'python-data') ? 2 : 3;
      const filtered = this.allProjects.filter(p => p.category === c && p.year === 4).slice(0, count);
      list = list.concat(filtered);
    });
    return list.slice(0, 20);
  }

  getCourseItems(course) {
    // 1. MCA & M.Tech (Curated 40 Kits total: 20 in Year 1, 20 in Year 2)
    if (/mca|m\.?tech/i.test(course)) {
      return [
        { name: "1st Year Projects & PPTs", desc: "Foundational & Intermediate Systems: AI, Web, Security, Java & Mobile (20 Working Projects & PPTs)", count: "20 Kits", type: "year" },
        { name: "2nd Year Capstone & Dissertation", desc: "Advanced Capstones, Deep Learning, Cloud & Master Defense (20 Working Projects & PPTs)", count: "20 Kits", type: "year" },
        { name: "All MCA & M.Tech Projects & PPTs", desc: "Complete 40 Master-Level Project Packages with Working Code & Defense Slides", count: "40 Kits", type: "all" },
        // Domains
        { name: "AI & Machine Learning", desc: "Deep Learning, NLP & Computer Vision Kits (Working Code & PPT)", count: "6 Kits", type: "domain" },
        { name: "Web & Full Stack Development", desc: "Enterprise Full-Stack & Microservices Systems (Working Code & PPT)", count: "6 Kits", type: "domain" },
        { name: "Cybersecurity & Cloud", desc: "Threat Detection, Penetration Testing & Cryptography (Working Code & PPT)", count: "6 Kits", type: "domain" },
        { name: "Blockchain & Web3 DApps", desc: "Smart Contracts, Solidity & DApps (Working Code & PPT)", count: "4 Kits", type: "domain" }
      ];
    }

    // 2. B.Tech (4 Years - 450 Kits total)
    if (/b\.?tech/i.test(course)) {
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

    // 3. BCA (3 Years - 344 Kits total)
    if (/bca/i.test(course)) {
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

    // 4. B.Sc (3 Years - 344 Kits total)
    if (/b\.?sc/i.test(course)) {
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

    // 5. Diploma (3 Years - 344 Kits total)
    if (/diploma/i.test(course)) {
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

    return [];
  }

  getTechCategories() {
    return [
      { name: "Python & Automation", desc: "FastAPI, Flask, Scripting, Automation Bots & CLI Tools (Working Code & PPT)", count: "167 Kits" },
      { name: "AI, ML & Deep Learning", desc: "TensorFlow, PyTorch, Scikit-learn, Neural Nets & Predictive Models (Working Code & PPT)", count: "113 Kits" },
      { name: "FastAPI & REST Microservices", desc: "High-Performance Async Python, REST APIs & Swagger Documentation (Working Code & PPT)", count: "100 Kits" },
      { name: "React.js & Next.js Modern Frontend", desc: "React 18, Next.js, Hooks, State Management & Tailwind CSS (Working Code & PPT)", count: "73 Kits" },
      { name: "Java & Spring Boot Enterprise", desc: "Enterprise MVC, Microservices, Hibernate, MySQL & JDBC (Working Code & PPT)", count: "70 Kits" },
      { name: "MERN & Node.js Full-Stack", desc: "Node.js, Express, MongoDB, Full-Stack Architecture & REST APIs (Working Code & PPT)", count: "67 Kits" },
      { name: "Data Science, Pandas & Analytics", desc: "Pandas, NumPy, Matplotlib, Streamlit & Business Dashboards (Working Code & PPT)", count: "67 Kits" },
      { name: "C & C++ Core Systems & OS", desc: "System Programming, Memory Allocators, OS & Socket Simulation (Working Code & PPT)", count: "64 Kits" },
      { name: "Cybersecurity, WAF & Cryptography", desc: "Vulnerability Scanners, Threat Detection, Firewalls & Ciphers (Working Code & PPT)", count: "60 Kits" },
      { name: "Blockchain, Solidity & Web3 DApps", desc: "Ethereum, Hardhat, Web3.js, E-Voting & Smart Contracts (Working Code & PPT)", count: "53 Kits" },
      { name: "IoT, ESP32 & Arduino Embedded", desc: "ESP32, ESP8266, Arduino Uno, Sensors & MQTT Automation (Working Code & PPT)", count: "52 Kits" },
      { name: "Database Systems & SQL (PostgreSQL / MySQL)", desc: "Relational Database Modeling, Query Optimization & Transactions (Working Code & PPT)", count: "52 Kits" },
      { name: "Flutter & Dart Mobile Apps", desc: "Cross-Platform Android & iOS Applications with Offline Sync (Working Code & PPT)", count: "51 Kits" },
      { name: "WebSockets & Real-Time Communication", desc: "Socket.io, WebSockets, Real-time Chat & Live Streaming (Working Code & PPT)", count: "35 Kits" },
      { name: "Computer Vision & OpenCV", desc: "OpenCV, YOLO Object Tracking, Face Recognition & Image Filters (Working Code & PPT)", count: "35 Kits" },
      { name: "Docker, DevOps & Cloud Systems", desc: "Docker Containerization, Microservices, Redis Caching & Cloud APIs (Working Code & PPT)", count: "26 Kits" }
    ];
  }

  getProjectsByTech(techName) {
    const q = techName.toLowerCase();
    return this.allProjects.filter(p => {
      const stack = Array.isArray(p.techStack) ? p.techStack : [];
      const title = (p.title || "").toLowerCase();
      const cat = p.category || "";

      // 1. Blockchain, Solidity & Web3
      if (q.includes("blockchain") || q.includes("solidity") || q.includes("web3")) {
        return cat === "blockchain" || stack.some(t => /solidity|web3|blockchain|hardhat|ethers/i.test(t));
      }
      // 2. Computer Vision & OpenCV
      if (q.includes("vision") || q.includes("opencv") || q.includes("yolo")) {
        return stack.some(t => /opencv|vision|yolo|image|cnn/i.test(t)) || title.includes("vision") || title.includes("yolo") || title.includes("detection");
      }
      // 3. FastAPI & REST Microservices
      if (q.includes("fastapi") || q.includes("microservice")) {
        return stack.some(t => /fastapi|api|rest/i.test(t));
      }
      // 4. React.js & Next.js Frontend
      if (q.includes("react") || q.includes("next.js")) {
        return stack.some(t => /react|next\.?js/i.test(t));
      }
      // 5. MERN & Node.js Full-Stack
      if (q.includes("mern") || q.includes("node.js")) {
        return cat === "web-dev" || stack.some(t => /node|express|mongo|mern/i.test(t));
      }
      // 6. Data Science, Pandas & Analytics
      if (q.includes("data science") || q.includes("pandas") || q.includes("analytics")) {
        return cat === "python-data" || stack.some(t => /pandas|numpy|matplotlib|plotly|streamlit|data/i.test(t));
      }
      // 7. Python & Automation
      if (q.includes("python") && !q.includes("data science")) {
        return cat === "python-data" || stack.some(t => /python|flask/i.test(t));
      }
      // 8. AI, Machine Learning & Deep Learning
      if (/\b(ai|ml)\b/i.test(q) || q.includes("machine learning") || q.includes("deep learning")) {
        return cat === "ai-ml" || stack.some(t => /ai|ml|tensorflow|pytorch|scikit|model/i.test(t));
      }
      // 9. Flutter & Dart Mobile Apps
      if (q.includes("flutter") || q.includes("mobile") || q.includes("dart")) {
        return cat === "mobile" || stack.some(t => /flutter|dart|mobile|android|ios/i.test(t));
      }
      // 10. Java & Spring Boot Enterprise
      if (q.includes("java") || q.includes("spring")) {
        return cat === "java" || stack.some(t => /java|spring/i.test(t));
      }
      // 11. IoT, ESP32 & Arduino Embedded
      if (q.includes("iot") || q.includes("arduino") || q.includes("esp32") || q.includes("embedded")) {
        return cat === "iot-embedded" || stack.some(t => /iot|esp32|esp8266|arduino|raspberry|sensor/i.test(t));
      }
      // 12. Cybersecurity, WAF & Cryptography
      if (q.includes("cyber") || q.includes("security") || q.includes("cryptography") || q.includes("waf")) {
        return cat === "cybersecurity" || stack.some(t => /security|crypto|waf|scanner|cipher|sniff/i.test(t));
      }
      // 13. C & C++ Core Systems & OS
      if (q.includes("c & c++") || q.includes("c / c++") || q.includes("c++") || q.includes("systems & os")) {
        return cat === "c-cpp" || stack.some(t => /\bc\b|\bc\+\+/i.test(t));
      }
      // 14. Docker, DevOps & Cloud Systems
      if (q.includes("docker") || q.includes("devops") || q.includes("cloud")) {
        return stack.some(t => /docker|cloud|redis|microservice|kubernetes/i.test(t));
      }
      // 15. Database Systems & SQL
      if (q.includes("database") || q.includes("sql") || q.includes("postgres") || q.includes("mysql")) {
        return stack.some(t => /postgres|mysql|sqlite|sql|dbms/i.test(t));
      }
      // 16. WebSockets & Real-Time Communication
      if (q.includes("websocket") || q.includes("real-time") || q.includes("socket")) {
        return stack.some(t => /websocket|socket|real-time|chat/i.test(t)) || title.includes("real-time");
      }

      return stack.some(t => t.toLowerCase().includes(q)) || title.includes(q);
    });
  }

  getProjectsForCourseAndPath(course, yearOrCat) {
    const isMca = /mca|m\.?tech/i.test(course);

    // MCA & M.Tech Handling
    if (isMca) {
      if (/1st|year\s*1/i.test(yearOrCat)) {
        return this.getMcaYear1();
      }
      if (/2nd|year\s*2|capstone|dissertation/i.test(yearOrCat)) {
        return this.getMcaYear2();
      }
      if (/all/i.test(yearOrCat)) {
        return [...this.getMcaYear1(), ...this.getMcaYear2()];
      }

      // Domain filtering for MCA & M.Tech
      const mcaPool = [...this.getMcaYear1(), ...this.getMcaYear2()];
      return mcaPool.filter(p => {
        if (/ai|machine\s*learning/i.test(yearOrCat)) return p.category === "ai-ml";
        if (/web|full\s*stack/i.test(yearOrCat)) return p.category === "web-dev";
        if (/cyber|cloud/i.test(yearOrCat)) return p.category === "cybersecurity";
        if (/blockchain|web3/i.test(yearOrCat)) return p.category === "blockchain";
        if (/python|data/i.test(yearOrCat)) return p.category === "python-data";
        if (/java/i.test(yearOrCat)) return p.category === "java";
        if (/mobile/i.test(yearOrCat)) return p.category === "mobile";
        return true;
      });
    }

    // B.Tech, BCA, B.Sc, Diploma Handling
    return this.allProjects.filter(p => {
      // Diploma Scope: Practical and foundational levels (Year 1 to 3)
      if (/diploma/i.test(course) && p.year > 3) {
        return false;
      }

      // Year Matching
      if (yearOrCat.includes("1st Year") || /1st|year\s*1/i.test(yearOrCat)) return p.year === 1;
      if (yearOrCat.includes("2nd Year") || /2nd|year\s*2/i.test(yearOrCat)) return p.year === 2;
      if (yearOrCat.includes("3rd Year") || /3rd|year\s*3/i.test(yearOrCat)) return p.year === 3;
      if (yearOrCat.includes("4th Year") || /4th|year\s*4/i.test(yearOrCat)) return p.year === 4;

      if (yearOrCat.includes("All")) {
        // BCA, B.Sc, Diploma are 3-year degrees
        if (/bca|b\.?sc|diploma/i.test(course)) {
          return p.year <= 3;
        }
        return true;
      }

      // Category Matching
      if (/ai|machine\s*learning/i.test(yearOrCat)) return p.category === "ai-ml";
      if (/web|full\s*stack/i.test(yearOrCat)) return p.category === "web-dev";
      if (/iot|hardware/i.test(yearOrCat)) return p.category === "iot-embedded";
      if (/cyber|cloud/i.test(yearOrCat)) return p.category === "cybersecurity";
      if (/python|data/i.test(yearOrCat)) return p.category === "python-data";
      if (/blockchain|web3/i.test(yearOrCat)) return p.category === "blockchain";
      if (/mobile/i.test(yearOrCat)) return p.category === "mobile";
      if (/java/i.test(yearOrCat)) return p.category === "java";
      if (/c\s*\/\s*c\+\+|c\+\+/i.test(yearOrCat)) return p.category === "c-cpp";

      return true;
    });
  }

  renderDirectoryContents(dirData) {
    if (!dirData) return;
    let html = "";
    let count = 0;

    // 1. Virtual Root (All Course folders)
    if (dirData.type === "virtual-root") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          targetPath: item.targetPath || [item.name]
        });
      });
    }

    // 2. BCA Group (BCA, B.Sc, Diploma)
    else if (dirData.type === "bca-group") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          targetPath: item.targetPath || [item.name]
        });
      });
    }

    // 3. Course Level (Years & Categories inside selected course)
    else if (dirData.type === "course-level") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          targetPath: [dirData.course, item.name]
        });
      });
    }

    // 4. Tech Categories Level (e.g. /Browse by Technology)
    else if (dirData.type === "tech-category-list") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          targetPath: ['Browse by Technology', item.name]
        });
      });
    }

    // 5. Favorites Mode
    else if (dirData.type === "favorites") {
      this.renderFavorites();
      return;
    }

    // 6. Project List (Projects inside selected course + year/domain)
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
          <p>No verified project kits matched "<strong>${this.searchQuery}</strong>".</p>
          <span style="font-size:0.85rem; color:var(--text-muted);">Try searching for Python, AI/ML, YOLO, React, MERN, IoT, or Viva Prep.</span>
        </div>
      `;
    } else {
      matchingProjects.forEach(proj => {
        html += this.getProjectRowHtml(proj, true);
      });
    }

    this.listElement.innerHTML = html;
    if (this.folderCountBadge) {
      this.folderCountBadge.innerText = `${count} ${count === 1 ? 'match' : 'matches'}`;
    }
  }

  renderFavorites() {
    const savedIds = window.app?.bookmarkedIds || [];
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

  getFolderRowHtml({ title, desc, badge, targetPath }) {
    const jsonPath = JSON.stringify(targetPath).replace(/"/g, '&quot;');
    return `
      <div class="explorer-item folder-item" data-folder-path="${jsonPath}" role="button" tabindex="0" title="Open ${title} folder">
        <div class="item-media">
          <svg width="34" height="34" viewBox="0 0 16 16" class="folder-svg-icon">
            <path fill="#F5B800" d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
          </svg>
        </div>
        <div class="item-content">
          <div class="item-header">
            <span class="item-title font-excalifont">${title}</span>
            ${badge ? `<span class="item-badge font-mono">${badge}</span>` : ''}
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
