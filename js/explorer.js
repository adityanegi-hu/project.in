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

    // Search input listener (Debounced 150ms)
    let expSearchDebounce = null;
    this.searchInput?.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (this.searchClearBtn) {
        this.searchClearBtn.style.display = q ? "inline-flex" : "none";
      }
      clearTimeout(expSearchDebounce);
      expSearchDebounce = setTimeout(() => {
        this.searchQuery = q;
        this.render();
      }, 150);
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

    // "Browse by Technology" or "Browse by Programming Languages & Technologies" folder
    if (firstSeg === "Browse by Technology" || firstSeg === "Browse by Programming Languages & Technologies" || firstSeg.includes("Browse by") || firstSeg.includes("Languages")) {
      if (this.currentPath.length === 1) {
        return {
          type: "tech-category-list",
          items: this.getTechCategories()
        };
      }
      if (this.currentPath.length === 2) {
        const secondSeg = this.currentPath[1];

        // 1. Top 25 Core University Curriculum Languages
        if (/top\s*25/i.test(secondSeg)) {
          return {
            type: "language-list",
            categoryName: secondSeg,
            items: this.getTop25Languages()
          };
        }

        // 2. All 140 Languages A-Z Directory
        if (/140|all languages|a to z|a-z/i.test(secondSeg)) {
          return {
            type: "language-list",
            categoryName: secondSeg,
            items: this.getAll140LanguagesList()
          };
        }

        // 3. Language Families with sub-languages
        const familyLanguages = this.getLanguagesForFamily(secondSeg);
        if (familyLanguages && familyLanguages.length > 0) {
          return {
            type: "language-list",
            categoryName: secondSeg,
            items: familyLanguages
          };
        }

        return {
          type: "project-list",
          folderName: secondSeg,
          projects: this.getProjectsByTech(secondSeg)
        };
      }

      if (this.currentPath.length >= 3) {
        const targetLang = this.currentPath[this.currentPath.length - 1];
        return {
          type: "project-list",
          folderName: targetLang,
          projects: this.getProjectsByTech(targetLang)
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
      { name: "Browse All 450 Academic Projects", courseKey: "all", desc: "Instantly Explore All 450 Verified Project Packages with Code, PPT Decks, & Defense Kits", count: "450 Kits", targetPath: ["Browse All 450 Projects"] },
      { name: "B.Tech", courseKey: "B.Tech", desc: "Computer Science, AI/ML, IoT, ECE & Engineering (C, Python, C++, Java, Rust, Go, Assembly, Verilog, Solidity - 450 Kits)", count: "450 Kits", targetPath: ["B.Tech"] },
      { name: "BCA", courseKey: "BCA", desc: "Bachelor of Computer Applications (C, Python, C++, Java, PHP, SQL, C#, VB.NET, Flutter, MERN - 344 Kits)", count: "344 Kits", targetPath: ["BCA"] },
      { name: "B.Sc", courseKey: "B.Sc", desc: "Computer Science, IT & Software Systems (C, Python, C++, Java, R, SQL, Linux Bash, Data Analytics - 344 Kits)", count: "344 Kits", targetPath: ["B.Sc"] },
      { name: "Diploma", courseKey: "Diploma", desc: "Polytechnic Engineering & Technical Practical Labs (C, C++, Python, Java, PHP, Arduino Labs - 344 Kits)", count: "344 Kits", targetPath: ["Diploma"] },
      { name: "MCA & M.Tech", courseKey: "MCA & M.Tech", desc: "Advanced Research, Distributed Systems & Capstone Defense (Python AI, Go, Rust, Java Spring, Solidity - 40 Kits)", count: "40 Kits", targetPath: ["MCA & M.Tech"] },
      { name: "Browse by Programming Languages & Technologies", courseKey: "tech", desc: "Full Academic Taxonomy Across 140 Programming Languages in 10 Core Academic Families", count: "140 Languages", targetPath: ["Browse by Technology"] }
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
        { name: "1st Year Projects & PPTs", desc: "Master Foundations: Advanced Algorithms (C++, Python), Distributed Systems (Java/Spring, C#/.NET) & Cloud (20 Kits)", count: "20 Kits", type: "year" },
        { name: "2nd Year Capstone & Dissertation", desc: "Capstone & Dissertation: Deep Learning (PyTorch), Systems Engineering (Rust, Go), Web3 (Solidity) & Defense (20 Kits)", count: "20 Kits", type: "year" },
        { name: "All MCA & M.Tech Projects & PPTs", desc: "Complete 40 Master-Level Project Packages with Working Code & Defense Slides", count: "40 Kits", type: "all" },
        // Domains
        { name: "AI & Machine Learning", desc: "Deep Learning, NLP & Computer Vision Kits (Python, PyTorch - Working Code & PPT)", count: "6 Kits", type: "domain" },
        { name: "Web & Full Stack Development", desc: "Enterprise Full-Stack & Microservices Systems (Java, Go, React - Working Code & PPT)", count: "6 Kits", type: "domain" },
        { name: "Cybersecurity & Cloud", desc: "Threat Detection, Penetration Testing & Cryptography (Python, C, Rust - Working Code & PPT)", count: "6 Kits", type: "domain" },
        { name: "Blockchain & Web3 DApps", desc: "Smart Contracts, Solidity & DApps (Solidity, Web3.js - Working Code & PPT)", count: "4 Kits", type: "domain" }
      ];
    }

    // 2. B.Tech (4 Years - 450 Kits total)
    if (/b\.?tech/i.test(course)) {
      return [
        { name: "1st Year Projects & PPTs", desc: "Foundational Languages: C Programming, Python Basics, Web (HTML/CSS/JS) & Algorithms (111 Kits)", count: "111 Kits", type: "year" },
        { name: "2nd Year Projects & PPTs", desc: "Core Curriculum: C++ OOPs, Java Applications, x86 Assembly & SQL (117 Kits)", count: "117 Kits", type: "year" },
        { name: "3rd Year Projects & PPTs", desc: "Advanced Stacks: Systems (Go, Rust), Microcontrollers (Arduino, Verilog), Web/Mobile (TypeScript, Flutter) & AI/ML (116 Kits)", count: "116 Kits", type: "year" },
        { name: "4th Year Major Capstone & PPTs", desc: "Major Capstones: Distributed Cloud (Docker, K8s, Go), Blockchain (Solidity) & Edge AI (106 Kits)", count: "106 Kits", type: "year" },
        { name: "All B.Tech Projects & PPTs", desc: "Complete 4-Year B.Tech Catalog Index with Source Code & Presentation Decks", count: "450 Kits", type: "all" },
        // Domains
        { name: "AI & Machine Learning", desc: "Computer Vision, NLP, Deep Learning & Predictive Models (Python, PyTorch - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Web & Full Stack Development", desc: "MERN, Django, Spring Boot & React Applications (JavaScript, TypeScript - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "IoT & Hardware Embedded", desc: "ESP32, Arduino, Raspberry Pi & Smart Automation (C++, Arduino, Verilog - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Cybersecurity & Cloud", desc: "Penetration Testing, Encryption & Cloud Infrastructure (Python, Go, Bash - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Python & Data Science", desc: "Scrapers, Bots, Dashboards & Data Analytics (Python, Pandas, FastAPI - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Blockchain & Web3 DApps", desc: "Smart Contracts, Solidity & Decentralized Systems (Solidity, Web3 - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Mobile App Development", desc: "Cross-Platform Flutter & React Native Applications (Dart, Kotlin, Swift - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Java & Enterprise Systems", desc: "Spring Boot, Microservices & Enterprise Architecture (Java, C# - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "C / C++ Core Systems", desc: "System Programming, OS, Compilers & Embedded Drivers (C, C++, Assembly - 50 Kits)", count: "50 Kits", type: "domain" }
      ];
    }

    // 3. BCA (3 Years - 344 Kits total)
    if (/bca/i.test(course)) {
      return [
        { name: "1st Year Projects & PPTs", desc: "Foundational Languages: C Programming, Python Scripting, Web Basics & SQL (111 Kits)", count: "111 Kits", type: "year" },
        { name: "2nd Year Projects & PPTs", desc: "Core Curriculum: C++ OOPs, Java Applications, PHP & MySQL, C#/VB.NET & Bash (117 Kits)", count: "117 Kits", type: "year" },
        { name: "3rd Year Final Projects & PPTs", desc: "Final Year Capstones: MERN Stack (React, Node), Mobile (Flutter, Kotlin) & Cloud (116 Kits)", count: "116 Kits", type: "year" },
        { name: "All BCA Projects & PPTs", desc: "Complete BCA Catalog Index with Source Code & Presentation Decks", count: "344 Kits", type: "all" },
        // Domains
        { name: "Web & Full Stack Development", desc: "MERN, Django, PHP & React Web Applications (50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Python & Data Science", desc: "Automation Bots, GUI Tools & Dashboards (Python, Pandas - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "AI & Machine Learning", desc: "Machine Learning & Smart Classification (Python - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Mobile App Development", desc: "Flutter & Mobile Applications (Dart, Android - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Java & Enterprise Systems", desc: "Java MVC & Database Systems (Java, MySQL, C# - 50 Kits)", count: "50 Kits", type: "domain" }
      ];
    }

    // 4. B.Sc (3 Years - 344 Kits total)
    if (/b\.?sc/i.test(course)) {
      return [
        { name: "1st Year Projects & PPTs", desc: "Foundations of Computing: C, Python, Discrete Logic & Web (111 Kits)", count: "111 Kits", type: "year" },
        { name: "2nd Year Projects & PPTs", desc: "Core Software: C++ Data Structures, Java Enterprise, PostgreSQL/SQL & Linux (117 Kits)", count: "117 Kits", type: "year" },
        { name: "3rd Year Final Projects & PPTs", desc: "Applied Computing: Statistical Computing in R, Machine Learning in Python & Security (116 Kits)", count: "116 Kits", type: "year" },
        { name: "All B.Sc Projects & PPTs", desc: "Complete B.Sc Catalog Index with Source Code & Presentation Decks", count: "344 Kits", type: "all" },
        // Domains
        { name: "Python & Data Science", desc: "Data Analysis, Scrapers & Automation (Python, R - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Web & Full Stack Development", desc: "Full Stack & Web Applications (JavaScript, HTML/CSS - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "AI & Machine Learning", desc: "Machine Learning & Neural Nets (Python, Scikit-Learn - 50 Kits)", count: "50 Kits", type: "domain" }
      ];
    }

    // 5. Diploma (3 Years - 344 Kits total)
    if (/diploma/i.test(course)) {
      return [
        { name: "1st Year Projects & PPTs", desc: "Technical Foundations: C Basics, Python Automation & Web Basics (111 Kits)", count: "111 Kits", type: "year" },
        { name: "2nd Year Projects & PPTs", desc: "Core Labs: C++ OOPs, Core Java, MySQL Databases & Arduino Microcontrollers (117 Kits)", count: "117 Kits", type: "year" },
        { name: "3rd Year Final Projects & PPTs", desc: "Polytechnic Capstones: PHP Web Dev, Android Basics & Practical Industrial IoT (116 Kits)", count: "116 Kits", type: "year" },
        { name: "All Diploma Projects & PPTs", desc: "Complete Polytechnic Diploma Catalog Index with Source Code & Presentation Decks", count: "344 Kits", type: "all" },
        // Domains
        { name: "IoT & Hardware Embedded", desc: "ESP32, Arduino & Sensor Automation (C++, Arduino - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "C / C++ Core Systems", desc: "Microcontroller C, Systems & Drivers (C, C++ - 50 Kits)", count: "50 Kits", type: "domain" },
        { name: "Web & Full Stack Development", desc: "Responsive Web Development (HTML/CSS, JavaScript, PHP - 50 Kits)", count: "50 Kits", type: "domain" }
      ];
    }

    return [];
  }

  getTop25Languages() {
    return [
      { name: "Python", desc: "Core University Curriculum: AI/ML, Data Science, Web & Automation (50 Projects)", count: "50 Projects" },
      { name: "C", desc: "Procedural Programming, Operating Systems, Memory Management & Embedded (50 Projects)", count: "50 Projects" },
      { name: "C++", desc: "Object-Oriented Programming, Data Structures, Game Dev & High-Performance Engines (50 Projects)", count: "50 Projects" },
      { name: "Java", desc: "Enterprise Architecture, Spring Boot, OOPs, Design Patterns & Distributed Systems (50 Projects)", count: "50 Projects" },
      { name: "JavaScript", desc: "Modern Web Development, Frontend DOM, Node.js & Full-Stack Applications (50 Projects)", count: "50 Projects" },
      { name: "TypeScript", desc: "Typed Full-Stack Applications, Next.js, React, Node.js & Scalable Architecture (50 Projects)", count: "50 Projects" },
      { name: "C#", desc: "Enterprise .NET Applications, Desktop GUI, Web APIs & Unity Development (50 Projects)", count: "50 Projects" },
      { name: "Go (Golang)", desc: "Cloud Native Microservices, High-Concurrency Network Servers & Distributed Tools (50 Projects)", count: "50 Projects" },
      { name: "Rust", desc: "Memory-Safe Systems Programming, Cryptography, CLI Tools & High-Performance Engines (50 Projects)", count: "50 Projects" },
      { name: "Kotlin", desc: "Modern Android Development, Jetpack Compose & JVM Microservices (50 Projects)", count: "50 Projects" },
      { name: "Swift", desc: "Apple iOS & macOS Native Applications, SwiftUI & Mobile Architecture (50 Projects)", count: "50 Projects" },
      { name: "PHP", desc: "Server-Side Web Development, MySQL Integration & Full-Stack Dynamic Portals (50 Projects)", count: "50 Projects" },
      { name: "SQL", desc: "Relational Database Management, Complex Queries, Schema Design & Analytics (50 Projects)", count: "50 Projects" },
      { name: "Dart", desc: "Cross-Platform Mobile Development, Flutter Framework & Reactive State Management (50 Projects)", count: "50 Projects" },
      { name: "R", desc: "Statistical Computing, Exploratory Data Analysis & Quantitative Research (50 Projects)", count: "50 Projects" },
      { name: "Ruby", desc: "Web Application Development, MVC Frameworks & Rapid Prototyping (50 Projects)", count: "50 Projects" },
      { name: "Scala", desc: "Functional Programming on JVM, Big Data Processing & Distributed Systems (50 Projects)", count: "50 Projects" },
      { name: "MATLAB", desc: "Matrix Computing, Numerical Analysis, Signal Processing & Scientific Simulations (50 Projects)", count: "50 Projects" },
      { name: "Assembly Language", desc: "x86/ARM Processor Architecture, Register Operations & Low-Level Reverse Engineering (50 Projects)", count: "50 Projects" },
      { name: "Verilog", desc: "Hardware Description Language (HDL), FPGA Design & Digital Logic Circuits (50 Projects)", count: "50 Projects" },
      { name: "VHDL", desc: "ASIC/FPGA Digital Systems Modeling, Logic Synthesis & Verification (50 Projects)", count: "50 Projects" },
      { name: "Bash", desc: "Linux Shell Automation, System Administration, DevOps Scripting & Security Tooling (50 Projects)", count: "50 Projects" },
      { name: "Solidity", desc: "Smart Contract Development, Ethereum EVM & Web3 Decentralized Applications (50 Projects)", count: "50 Projects" },
      { name: "Arduino", desc: "Microcontroller Firmware, Sensor Interfacing & IoT Hardware Prototyping (50 Projects)", count: "50 Projects" },
      { name: "HTML / CSS / Web", desc: "Frontend UI Foundations, Responsive Web Design & Semantic Markup (50 Projects)", count: "50 Projects" }
    ];
  }

  getAll140LanguagesList() {
    const list = [
      { name: "ABAP", desc: "SAP Enterprise Resource Planning & Business Application Programming (50 Projects)" },
      { name: "ActionScript", desc: "Interactive Multimedia, Canvas Animation & Legacy Web Systems (50 Projects)" },
      { name: "Ada", desc: "High-Integrity, Safety-Critical Avionics & Real-Time Defense Systems (50 Projects)" },
      { name: "ALGOL 60", desc: "Historical Algorithmic Language, Syntax Foundations & Compiler Design (50 Projects)" },
      { name: "ALGOL 68", desc: "Orthogonal Language Design, Advanced Typing & Concurrent Systems (50 Projects)" },
      { name: "APL", desc: "Array-Oriented Vector Computing & Mathematical Matrix Analysis (50 Projects)" },
      { name: "Arduino", desc: "Microcontroller Firmware, Sensor Interfacing & Embedded Robotics (50 Projects)" },
      { name: "Assembly Language", desc: "x86/ARM Architecture, Register Computations & Low-Level Kernels (50 Projects)" },
      { name: "AutoLISP", desc: "CAD Scripting, Automated Design & Symbolic Geometric Computation (50 Projects)" },
      { name: "AWK", desc: "Unix Text Processing, Log Parsing & Stream Pattern Scanning (50 Projects)" },
      { name: "B", desc: "Predecessor to C, System Architecture & Minimalist Runtime (50 Projects)" },
      { name: "Bash", desc: "Linux Shell Automation, DevOps Pipelines & System Administration (50 Projects)" },
      { name: "BASIC", desc: "Beginner-Friendly Algorithmic Foundations & Interactive Applications (50 Projects)" },
      { name: "bc", desc: "Arbitrary-Precision Mathematical Calculator & Scripting Engine (50 Projects)" },
      { name: "BCPL", desc: "Early Systems Programming, Portability & Compiler Bootstrapping (50 Projects)" },
      { name: "BQN", desc: "Modern Array Programming, Data-Parallel Pipelines & Math Modeling (50 Projects)" },
      { name: "C", desc: "Procedural Programming, Operating Systems & Low-Level Drivers (50 Projects)" },
      { name: "C++", desc: "Object-Oriented Programming, Game Engines, High-Performance Systems (50 Projects)" },
      { name: "C#", desc: "Enterprise .NET Framework, Desktop GUI, Web APIs & Unity (50 Projects)" },
      { name: "C3", desc: "Modern C Evolution, Safe Memory Semantics & High-Performance Systems (50 Projects)" },
      { name: "Caml", desc: "Categorical Abstract Machine Language & Functional Type Systems (50 Projects)" },
      { name: "Ceylon", desc: "Enterprise Class Modeling, Modular JVM Architecture & Web SDKs (50 Projects)" },
      { name: "Chapel", desc: "High-Performance Parallel Computing & Distributed Supercomputing (50 Projects)" },
      { name: "ChucK", desc: "Real-Time Sound Synthesis & Timed Concurrent Music Programming (50 Projects)" },
      { name: "Cilk", desc: "Multithreaded Parallel Algorithms & Work-Stealing Scheduling (50 Projects)" },
      { name: "Clojure", desc: "Functional Lisp on the JVM, Concurrency & Immutable Data (50 Projects)" },
      { name: "COBOL", desc: "Enterprise Banking, Financial Transaction Pipelines & Ledger Systems (50 Projects)" },
      { name: "CoffeeScript", desc: "Syntactic Transpilation, Ruby-Like Expressiveness & JS Tooling (50 Projects)" },
      { name: "Crystal", desc: "Ruby Syntax with C Performance, Static Typing & Fiber Concurrency (50 Projects)" },
      { name: "Csound", desc: "Acoustic Audio Synthesis, Algorithmic Composition & DSP Filters (50 Projects)" },
      { name: "Cyclone", desc: "Safe Dialect of C, Region-Based Memory Management & Security (50 Projects)" },
      { name: "D", desc: "Modern Systems Programming, Template Metaprogramming & Garbage Collection (50 Projects)" },
      { name: "Dafny", desc: "Formal Verification, Proof Assistant & Verified Software Construction (50 Projects)" },
      { name: "Dart", desc: "Cross-Platform Mobile UI, Flutter Engine & Reactive Applications (50 Projects)" },
      { name: "Delphi", desc: "Rapid Application Development, Object Pascal & Native Windows GUI (50 Projects)" },
      { name: "Dylan", desc: "Dynamic Object-Oriented Component Architecture & Advanced Macros (50 Projects)" },
      { name: "E", desc: "Secure Distributed Computing, Capability-Based Security & Actors (50 Projects)" },
      { name: "ECMAScript", desc: "Modern Web Standard Specifications, Asynchronous Pipelines & Modules (50 Projects)" },
      { name: "Eiffel", desc: "Design by Contract, Strict Object-Oriented Engineering & Reliability (50 Projects)" },
      { name: "Elixir", desc: "Scalable Fault-Tolerant Distributed Systems & Erlang OTP Architecture (50 Projects)" },
      { name: "Elm", desc: "Purely Functional Web Architecture, Zero Runtime Exceptions & UI (50 Projects)" },
      { name: "Emacs Lisp", desc: "Editor Extensibility, Text Manipulation & Scriptable Workspaces (50 Projects)" },
      { name: "Erlang", desc: "Massively Concurrent Telecom Systems, Lightweight Actor Processes (50 Projects)" },
      { name: "F#", desc: "Functional-First .NET Language, Type Providers & Scientific Finance (50 Projects)" },
      { name: "Factor", desc: "Concatenative Stack-Based Metaprogramming & High-Performance JIT (50 Projects)" },
      { name: "Falcon", desc: "Multi-Paradigm Scripting, Embedded Engine Integration & Native Threading (50 Projects)" },
      { name: "Faust", desc: "Functional DSP Compiler, Audio Effects & Real-Time Synthesizers (50 Projects)" },
      { name: "Flix", desc: "Polymorphic Functional Logic Programming & Datalog Solvers (50 Projects)" },
      { name: "Fortran", desc: "Numerical Analysis, High-Performance Computing & Physics Simulations (50 Projects)" },
      { name: "Futhark", desc: "Data-Parallel Functional Programming & High-Performance GPU Code (50 Projects)" },
      { name: "G-code", desc: "CNC Machining, Automated Toolpaths & 3D Printer Motion Control (50 Projects)" },
      { name: "GAMS", desc: "General Algebraic Modeling, Linear Optimization & Operations Research (50 Projects)" },
      { name: "GDScript", desc: "Godot Game Engine Scripting, Node Trees & 2D/3D Physics Logic (50 Projects)" },
      { name: "GLSL", desc: "OpenGL Shading Language, GPU Pixel Shaders & Real-Time Graphics (50 Projects)" },
      { name: "Go", desc: "Cloud Native Microservices, Concurrency with Goroutines & Scalable APIs (50 Projects)" },
      { name: "Golang", desc: "High-Throughput Network Servers, REST Microservices & Cloud Infrastructure (50 Projects)" },
      { name: "Groovy", desc: "Agile Dynamic Language for JVM, Gradle Build Pipelines & Automation (50 Projects)" },
      { name: "Hack", desc: "Gradual Typing for PHP, High-Scale Web Architecture & HHVM (50 Projects)" },
      { name: "Haskell", desc: "Pure Functional Programming, Monads & Strong Static Type Inference (50 Projects)" },
      { name: "Haxe", desc: "Cross-Target Multiplatform Toolkit, Transpilation & Universal SDK (50 Projects)" },
      { name: "HLSL", desc: "DirectX High-Level Shader Language, Compute Shaders & 3D Rendering (50 Projects)" },
      { name: "HolyC", desc: "TempleOS Kernel Programming, Direct Hardware Access & JIT Synthesis (50 Projects)" },
      { name: "Icon", desc: "Goal-Directed Evaluation, Advanced String Scanning & Generators (50 Projects)" },
      { name: "Idris", desc: "Dependent Types, Theorem Proving & Type-Driven Software Verification (50 Projects)" },
      { name: "Io", desc: "Prototype-Based Pure Object Programming, Coroutines & Dynamic Dispatch (50 Projects)" },
      { name: "Java", desc: "Enterprise Applications, Spring Boot Microservices & Cross-Platform JVM (50 Projects)" },
      { name: "JavaScript", desc: "Web Development, Full-Stack Node.js, Express & Dynamic Web Apps (50 Projects)" },
      { name: "JScript", desc: "Active Scripting for Windows Host, System Shell & Legacy Applications (50 Projects)" },
      { name: "Julia", desc: "High-Performance Scientific Computing, Differential Equations & ML (50 Projects)" },
      { name: "Jython", desc: "Python Seamlessly Interoperating with Java Libraries & JVM Ecosystem (50 Projects)" },
      { name: "Kotlin", desc: "Modern Android Development, Jetpack Compose, Coroutines & Multiplatform (50 Projects)" },
      { name: "Kustom", desc: "Android System Customization, Dynamic Live Wallpapers & UI Widgets (50 Projects)" },
      { name: "LabVIEW", desc: "Graphical System Design, Virtual Instrumentation & Hardware Acquisition (50 Projects)" },
      { name: "Lean", desc: "Interactive Theorem Proving, Mathematical Formalization & Metaprogramming (50 Projects)" },
      { name: "Limbo", desc: "Inferno Distributed OS, Channel Concurrency & Lightweight Processes (50 Projects)" },
      { name: "Lisp", desc: "Symbolic Computing, S-Expressions, Macros & AI Foundations (50 Projects)" },
      { name: "Common Lisp", desc: "Industrial Dynamic Language, CLOS Object System & High-Performance Macros (50 Projects)" },
      { name: "Scheme", desc: "Minimalist Elegance, Lexical Scoping, Continuations & Educational Foundations (50 Projects)" },
      { name: "Logo", desc: "Educational Turtle Graphics, Spatial Geometry & Procedural Thinking (50 Projects)" },
      { name: "Lua", desc: "Lightweight Embedded Scripting, Game Engines (Roblox, Defold) & Nginx (50 Projects)" },
      { name: "MATLAB", desc: "Matrix Laboratory, Signal Processing, Controls & Simulation Toolboxes (50 Projects)" },
      { name: "Mercury", desc: "Pure Logic Functional Programming, Strong Purity & High Performance (50 Projects)" },
      { name: "ML", desc: "MetaLanguage Foundations, Hindley-Milner Type Inference & Pattern Matching (50 Projects)" },
      { name: "Modula-2", desc: "Modular Programming, Systems Abstraction & Strong Type Safety (50 Projects)" },
      { name: "Modula-3", desc: "Thread Concurrency, Garbage Collection & Safe Systems Architecture (50 Projects)" },
      { name: "Mojo", desc: "Pythonic Syntax with Metal Hardware Acceleration for AI Accelerators (50 Projects)" },
      { name: "Nemerle", desc: "Macro Metaprogramming for .NET, Functional-Object Hybrid (50 Projects)" },
      { name: "NetLogo", desc: "Multi-Agent Simulation Modeling & Emergent Complex Systems (50 Projects)" },
      { name: "Nim", desc: "Fast Expressive Systems Language, C/C++ Transpilation & Zero-Overhead (50 Projects)" },
      { name: "Nix", desc: "Declarative Reproducible Package Management & DevOps OS Configuration (50 Projects)" },
      { name: "Numbat", desc: "Scientific Dimension-Aware Unit Calculation & Physical Computations (50 Projects)" },
      { name: "Oberon", desc: "Minimalist Object-Oriented Operating System & Language Design (50 Projects)" },
      { name: "Objective-C", desc: "Dynamic Smalltalk-Style Messaging on C for Apple Cocoa Frameworks (50 Projects)" },
      { name: "OCaml", desc: "Industrial Functional Programming, OCaml Type Safety & Compilers (50 Projects)" },
      { name: "Odin", desc: "Data-Oriented Systems Language, Game Development & Low-Level Control (50 Projects)" },
      { name: "OpenCL", desc: "Heterogeneous Parallel Computing Across CPUs, GPUs & Accelerators (50 Projects)" },
      { name: "Pascal", desc: "Structured Academic Programming, Strong Typing & Compiler Pedagogy (50 Projects)" },
      { name: "Perl", desc: "Text Extraction, Regular Expressions, System Scripting & Web CGI (50 Projects)" },
      { name: "PHP", desc: "Modern Web Backends, Composer Ecosystem & Dynamic Server-Side Apps (50 Projects)" },
      { name: "Pike", desc: "Interpreted Systems Scripting, Robust Networking & Advanced Data Types (50 Projects)" },
      { name: "PL/I", desc: "Historical General-Purpose Mainframe Language for Scientific & Business (50 Projects)" },
      { name: "PL/SQL", desc: "Oracle Procedural SQL, Stored Procedures, Triggers & Database Logic (50 Projects)" },
      { name: "PostScript", desc: "Turing-Complete Vector Graphics Description & Printing Engine (50 Projects)" },
      { name: "PowerShell", desc: "Object-Oriented Windows Command Automation & Cloud Administration (50 Projects)" },
      { name: "Prolog", desc: "First-Order Predicate Logic, Unification, Expert Systems & AI Rules (50 Projects)" },
      { name: "Pure Data", desc: "Visual Dataflow Audio Synthesis, Interactive Sensors & Multimedia (50 Projects)" },
      { name: "PureScript", desc: "Strongly-Typed Pure Functional Language Transpiling to JavaScript (50 Projects)" },
      { name: "Python", desc: "Data Science, Deep Learning, Web Backends, Automation & Academic Core (50 Projects)" },
      { name: "Q", desc: "Ultra-High Performance Vector Database Scripting for kdb+ Financial Data (50 Projects)" },
      { name: "QML", desc: "Declarative UI Modeling for Qt Framework, Animations & Embedded Screens (50 Projects)" },
      { name: "QuakeC", desc: "Game Logic Scripting, Physics Entities & 3D Shooter Mechanics (50 Projects)" },
      { name: "R", desc: "Statistical Modeling, Biostatistics, ggplot2 Visualizations & Analytics (50 Projects)" },
      { name: "Racket", desc: "Programmable Programming Language, Scheme Evolution & Macro Systems (50 Projects)" },
      { name: "Raku", desc: "Multi-Paradigm Expressiveness, Advanced Grammars & Unicode Pipelines (50 Projects)" },
      { name: "REBOL", desc: "Relative Expression-Based Object Language, Distributed Internet Dialects (50 Projects)" },
      { name: "Red", desc: "Full-Stack Metaprogramming Language with Low-Level Native Red/System (50 Projects)" },
      { name: "Rexx", desc: "Structured Scripting for Mainframe Automation & Clean Readability (50 Projects)" },
      { name: "Ring", desc: "Embedded Multi-Paradigm Language, GUI Applications & Game Scripting (50 Projects)" },
      { name: "Rust", desc: "Safe Systems Programming, Fearless Concurrency & Zero-Cost Abstractions (50 Projects)" },
      { name: "Ruby", desc: "Object-Oriented Web Engineering, Ruby on Rails & Human-Centric Design (50 Projects)" },
      { name: "Scala", desc: "Object-Functional Fusion, Akka Actors, Apache Spark & Big Data Pipelines (50 Projects)" },
      { name: "Scratch", desc: "Block-Based Visual Logic, Computational Thinking & Animation (50 Projects)" },
      { name: "Sed", desc: "Stream Editor for Filtering, Regular Expression Parsing & Transformations (50 Projects)" },
      { name: "Simula", desc: "Birthplace of Object-Oriented Programming, Classes & Simulation Models (50 Projects)" },
      { name: "Smalltalk", desc: "Pure Object-Oriented Live Environment, Reflective Metaprogramming (50 Projects)" },
      { name: "Solidity", desc: "Ethereum EVM Smart Contracts, DeFi Protocols & Web3 Token Standards (50 Projects)" },
      { name: "SQL", desc: "Relational Database Querying, Relational Algebra, Aggregations & Views (50 Projects)" },
      { name: "Structured Text", desc: "IEC 61131-3 Industrial Automation, PLC Logic & Process Automation (50 Projects)" },
      { name: "Swift", desc: "Native iOS/macOS Development, SwiftUI, Protocol-Oriented Design (50 Projects)" },
      { name: "Tcl", desc: "Tool Command Language, Embedded Applications & EDA Hardware Scripting (50 Projects)" },
      { name: "Tk", desc: "Cross-Platform GUI Toolkit for Tcl, Python, Perl & Ruby (50 Projects)" },
      { name: "TypeScript", desc: "Typed JavaScript at Scale, Interfaces, Generics & Enterprise Frontend (50 Projects)" },
      { name: "V", desc: "Fast Lightweight Systems Language, C-Speed, Human-Friendly & Safe (50 Projects)" },
      { name: "Vlang", desc: "V Language High-Performance Systems & Native GUI Binaries (50 Projects)" },
      { name: "Vala", desc: "Modern GObject System Programming for GNOME with C-Level Speed (50 Projects)" },
      { name: "Verilog", desc: "Hardware Modeling, Gate-Level Synthesis, FSMs & FPGA Circuitry (50 Projects)" },
      { name: "VHDL", desc: "Very High Speed Integrated Circuit Hardware Description & Simulation (50 Projects)" },
      { name: "Visual Basic .NET", desc: "Rapid Enterprise Windows Desktop Development & Form Interfaces (50 Projects)" },
      { name: "WebAssembly", desc: "Near-Native Binary Code in Modern Web Browsers & Cloud Runtimes (50 Projects)" },
      { name: "Wolfram Language", desc: "Knowledge-Based Symbolic Computing, Differential Physics & Mathematics (50 Projects)" },
      { name: "XQuery", desc: "XML Database Querying, XPath Transformations & Document Information (50 Projects)" },
      { name: "XSLT", desc: "Extensible Stylesheet Language Transformations for XML Documents (50 Projects)" },
      { name: "Zig", desc: "Robust Native Systems Programming, Comptime Metaprogramming & No Hidden Control Flow (50 Projects)" },
      { name: "Z shell", desc: "Z Shell Interactive CLI Environment, Auto-Completions & Unix Scripts (50 Projects)" },
      { name: "Zsh", desc: "Z Shell Interactive CLI Environment, Auto-Completions & Unix Scripts (50 Projects)" }
    ];
    return list.map(item => ({ ...item, count: "50 Projects" }));
  }

  getLanguagesForFamily(familyName) {
    const f = familyName.toLowerCase();
    const all = this.getAll140LanguagesList();
    const map = {
      systems: ["C", "C++", "C3", "Rust", "Go", "Zig", "D", "Nim", "Odin", "V", "Vala", "Assembly Language", "Fortran", "Ada", "Modula-2", "Modula-3", "Oberon", "HolyC", "Cyclone"],
      web: ["JavaScript", "TypeScript", "Python", "PHP", "Ruby", "Perl", "Lua", "CoffeeScript", "Dart", "Hack", "Haxe", "Elm", "PureScript", "WebAssembly"],
      enterprise: ["Java", "C#", "Kotlin", "Swift", "Visual Basic .NET", "Delphi", "Object Pascal", "Objective-C", "Groovy", "Scala"],
      data: ["Python", "R", "Julia", "MATLAB", "Mojo", "SQL", "PL/SQL", "Wolfram Language", "APL", "BQN", "Q", "GAMS", "Futhark"],
      hardware: ["Arduino", "Verilog", "VHDL", "OpenCL", "Structured Text", "LabVIEW", "G-code"],
      functional: ["Haskell", "OCaml", "Caml", "F#", "Clojure", "Elixir", "Erlang", "Lisp", "Common Lisp", "Scheme", "Racket", "ML", "Idris", "Lean", "Prolog", "PureScript"],
      devops: ["Bash", "PowerShell", "Zsh", "AWK", "Sed", "Nix", "bc"],
      graphics: ["GLSL", "HLSL", "GDScript", "Csound", "ChucK", "Faust", "Pure Data", "QuakeC"],
      historical: ["ALGOL 60", "ALGOL 68", "B", "BCPL", "BASIC", "COBOL", "Pascal", "PL/I", "Simula", "Smalltalk", "Logo", "Rexx", "Ring", "AutoLISP", "PostScript", "Scratch", "Dylan", "E", "ECMAScript", "Eiffel", "Factor", "Falcon", "Flix", "Icon", "Io", "Limbo", "Nemerle", "NetLogo", "Pike", "QML", "REBOL", "Red", "Tcl", "Tk", "XQuery", "XSLT"]
    };

    let matchedKey = null;
    if (f.includes("system") || f.includes("low-level")) matchedKey = "systems";
    else if (f.includes("web") || f.includes("scripting")) matchedKey = "web";
    else if (f.includes("enterprise") || f.includes("desktop") || f.includes("jvm")) matchedKey = "enterprise";
    else if (f.includes("data") || f.includes("numerical") || f.includes("analytics")) matchedKey = "data";
    else if (f.includes("hardware") || f.includes("embedded") || f.includes("hdl")) matchedKey = "hardware";
    else if (f.includes("functional") || f.includes("declarative")) matchedKey = "functional";
    else if (f.includes("devops") || f.includes("shell") || f.includes("automation")) matchedKey = "devops";
    else if (f.includes("shader") || f.includes("graphics") || f.includes("audio")) matchedKey = "graphics";
    else if (f.includes("historical") || f.includes("compiler") || f.includes("educational")) matchedKey = "historical";

    if (!matchedKey) return null;
    const names = map[matchedKey];
    return all.filter(item => names.some(n => n.toLowerCase() === item.name.toLowerCase()));
  }

  getTechCategories() {
    return [
      { name: "Top 25 Core University Curriculum Languages", desc: "Python, C, C++, Java, JavaScript, TypeScript, C#, Go, Rust, Kotlin, Swift, PHP, SQL, Dart, R, Ruby, Scala, MATLAB, Assembly, Verilog, VHDL, Bash, Solidity, Arduino & HTML/CSS", count: "25 Languages (50 Projects Each)" },
      { name: "All 140 Programming Languages (A to Z Directory)", desc: "Complete A-Z Academic Directory of all 140 programming languages with 50 verified project packages each", count: "140 Languages (50 Projects Each)" },
      { name: "Systems, Native & Low-Level Languages (18 Languages)", desc: "C, C++, C3, Rust, Go, Zig, D, Nim, Odin, V/Vlang, Vala, Assembly Language, Fortran, Ada, Modula-2, Modula-3, Oberon, HolyC & Cyclone", count: "19 Languages" },
      { name: "Web, Full-Stack & Scripting Languages (13 Languages)", desc: "JavaScript, TypeScript, Python, PHP, Ruby, Perl, Lua, CoffeeScript, Dart, Hack, Haxe, Elm, PureScript & WebAssembly", count: "14 Languages" },
      { name: "Enterprise, Desktop & Mobile Platforms (10 Languages)", desc: "Java, C#, Kotlin, Swift, Visual Basic .NET, Delphi / Object Pascal, Objective-C, Groovy & Scala", count: "10 Languages" },
      { name: "Data Science, AI & Numerical Computing (13 Languages)", desc: "Python, R, Julia, MATLAB, Mojo, SQL, PL/SQL, Wolfram Language, APL, BQN, Q, GAMS & Futhark", count: "13 Languages" },
      { name: "Hardware, Embedded Systems & HDL (8 Languages)", desc: "Arduino, ESP32, Verilog, VHDL, Embedded C/C++, OpenCL, Structured Text, LabVIEW & G-code", count: "8 Languages" },
      { name: "Cloud, DevOps, Shell Scripting & Automation (7 Languages)", desc: "Go, Rust, Docker, Kubernetes, Bash, PowerShell, Zsh, AWK, Sed, Nix & bc", count: "7 Languages" },
      { name: "Blockchain, Solidity & Web3 DApps", desc: "Solidity, Ethereum, Web3.js, Smart Contracts, Rust & Decentralized Finance", count: "53 Kits" },
      { name: "Functional & Declarative Languages (16 Languages)", desc: "Haskell, OCaml, Caml, F#, Clojure, Elixir, Erlang, Lisp, Common Lisp, Scheme, Racket, Standard ML, Idris, Lean, Prolog & PureScript", count: "16 Languages" },
      { name: "Graphics, Shaders, Audio & Games (8 Languages)", desc: "GLSL, HLSL, GDScript, Csound, ChucK, Faust, Pure Data & QuakeC", count: "8 Languages" },
      { name: "Historical Foundations, Compilers & Educational (27 Languages)", desc: "ALGOL 60, ALGOL 68, B, BCPL, BASIC, COBOL, Pascal, PL/I, Simula, Smalltalk, Logo, Rexx, Ring, AutoLISP, PostScript, Scratch & More", count: "36 Languages" }
    ];
  }

  getProjectsByTech(techName) {
    const q = techName.toLowerCase().trim();

    // Check direct domain aliases or exact language match (handles all 140+ languages with 100% precision)
    if (ForgeExplorer.DOMAIN_ALIASES[q]) {
      return this.searchProjects(techName);
    }
    const cleanName = q.replace(/\s*(programming|language|systems|ecosystem|projects|core|basics|scripting)\s*/gi, ' ').trim();
    if (ForgeExplorer.DOMAIN_ALIASES[cleanName]) {
      return this.searchProjects(cleanName);
    }

    return this.allProjects.filter(p => {
      const stack = Array.isArray(p.techStack) ? p.techStack : [];
      const title = (p.title || "").toLowerCase();
      const cat = p.category || "";

      // 1. Top 25 University Curriculum Languages
      if (q.includes("top 25") || q.includes("curriculum")) {
        return true;
      }
      // 2. Blockchain, Solidity & Web3
      if (q.includes("blockchain") || q.includes("solidity") || q.includes("web3")) {
        return cat === "blockchain" || stack.some(t => /solidity|web3|blockchain|hardhat|ethers/i.test(t));
      }
      // 3. Computer Vision & OpenCV
      if (q.includes("vision") || q.includes("opencv") || q.includes("yolo")) {
        return stack.some(t => /opencv|vision|yolo|image|cnn/i.test(t)) || title.includes("vision") || title.includes("yolo") || title.includes("detection");
      }
      // 4. FastAPI & REST Microservices
      if (q.includes("fastapi") || q.includes("microservice")) {
        return stack.some(t => /fastapi|api|rest/i.test(t));
      }
      // 5. React.js & Next.js Frontend
      if (q.includes("react") || q.includes("next.js")) {
        return stack.some(t => /react|next\.?js/i.test(t));
      }
      // 6. MERN & Node.js Full-Stack
      if (q.includes("mern") || q.includes("node.js")) {
        return cat === "web-dev" || stack.some(t => /node|express|mongo|mern/i.test(t));
      }
      // 7. Data Science, Pandas & Analytics
      if (q.includes("data science") || q.includes("pandas") || q.includes("analytics")) {
        return cat === "python-data" || stack.some(t => /pandas|numpy|matplotlib|plotly|streamlit|data/i.test(t));
      }
      // 8. Python & Automation
      if (q.includes("python") && !q.includes("data science")) {
        return cat === "python-data" || stack.some(t => /python|flask/i.test(t));
      }
      // 9. AI, Machine Learning & Deep Learning
      if (/\b(ai|ml)\b/i.test(q) || q.includes("machine learning") || q.includes("deep learning")) {
        return cat === "ai-ml" || stack.some(t => /ai|ml|tensorflow|pytorch|scikit|model/i.test(t));
      }
      // 10. Flutter & Dart Mobile Apps
      if (q.includes("flutter") || q.includes("mobile") || q.includes("dart")) {
        return cat === "mobile" || stack.some(t => /flutter|dart|mobile|android|ios|kotlin|swift/i.test(t));
      }
      // 11. Java & Spring Boot Enterprise
      if (q.includes("java") || q.includes("spring") || q.includes("jvm")) {
        return cat === "java" || stack.some(t => /java|spring|scala|kotlin|c#|groovy/i.test(t));
      }
      // 12. IoT, ESP32 & Arduino Embedded
      if (q.includes("iot") || q.includes("arduino") || q.includes("esp32") || q.includes("embedded") || q.includes("hardware")) {
        return cat === "iot-embedded" || stack.some(t => /iot|esp32|esp8266|arduino|raspberry|sensor|verilog|vhdl/i.test(t));
      }
      // 13. Cybersecurity, WAF & Cryptography
      if (q.includes("cyber") || q.includes("security") || q.includes("cryptography") || q.includes("waf")) {
        return cat === "cybersecurity" || stack.some(t => /security|crypto|waf|scanner|cipher|sniff/i.test(t));
      }
      // 14. C & C++ Core Systems & OS
      if (q.includes("c & c++") || q.includes("c / c++") || q.includes("c++") || q.includes("systems") || q.includes("low-level")) {
        return cat === "c-cpp" || stack.some(t => /\bc\b|\bc\+\+|assembly|rust|zig/i.test(t));
      }
      // 15. Docker, DevOps & Cloud Systems
      if (q.includes("docker") || q.includes("devops") || q.includes("cloud") || q.includes("shell") || q.includes("bash")) {
        return stack.some(t => /docker|cloud|redis|microservice|kubernetes|bash|shell|go/i.test(t)) || cat === "cybersecurity";
      }
      // 16. Database Systems & SQL
      if (q.includes("database") || q.includes("sql") || q.includes("postgres") || q.includes("mysql")) {
        return stack.some(t => /postgres|mysql|sqlite|sql|dbms/i.test(t));
      }
      // 17. Functional Languages
      if (q.includes("functional") || q.includes("declarative") || q.includes("haskell") || q.includes("lisp")) {
        return cat === "c-cpp" || cat === "python-data" || cat === "ai-ml";
      }
      // 18. Scientific & Numerical
      if (q.includes("scientific") || q.includes("numerical") || q.includes("matlab") || q.includes("r ")) {
        return cat === "python-data";
      }
      // 19. Shaders & Graphics
      if (q.includes("shader") || q.includes("graphics") || q.includes("glsl")) {
        return cat === "iot-embedded" || cat === "ai-ml";
      }
      // 20. Historical & Compilers
      if (q.includes("historical") || q.includes("compiler") || q.includes("pascal") || q.includes("fortran")) {
        return cat === "c-cpp";
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

    // 4. Tech Categories Level & Language Directory Lists
    else if (dirData.type === "tech-category-list" || dirData.type === "language-list") {
      dirData.items.forEach(item => {
        count++;
        html += this.getFolderRowHtml({
          title: item.name,
          desc: item.desc,
          badge: item.count,
          targetPath: item.targetPath || [...this.currentPath, item.name]
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

  static get DOMAIN_ALIASES() {
    return {
      // C / C++ Core Systems & Low-Level / Compilers
      'c': 'c-cpp',
      'c language': 'c-cpp',
      'c/c++': 'c-cpp',
      'c / c++': 'c-cpp',
      'c++': 'c-cpp',
      'cpp': 'c-cpp',
      'c project': 'c-cpp',
      'c projects': 'c-cpp',
      'c++ project': 'c-cpp',
      'c++ projects': 'c-cpp',
      'c core': 'c-cpp',
      'c programming': 'c-cpp',
      'c3': 'c-cpp',
      'cilk': 'c-cpp',
      'cyclone': 'c-cpp',
      'd': 'c-cpp',
      'zig': 'c-cpp',
      'nim': 'c-cpp',
      'odin': 'c-cpp',
      'v': 'c-cpp',
      'vlang': 'c-cpp',
      'vala': 'c-cpp',
      'assembly': 'c-cpp',
      'assembly language': 'c-cpp',
      'asm': 'c-cpp',
      'holyc': 'c-cpp',
      'b': 'c-cpp',
      'bcpl': 'c-cpp',
      'modula-2': 'c-cpp',
      'modula-3': 'c-cpp',
      'oberon': 'c-cpp',
      'ada': 'c-cpp',
      'limbo': 'c-cpp',
      'fortran': 'c-cpp',
      'algol': 'c-cpp',
      'algol 60': 'c-cpp',
      'algol 68': 'c-cpp',
      'basic': 'c-cpp',
      'pascal': 'c-cpp',
      'simula': 'c-cpp',
      'rexx': 'c-cpp',
      'ring': 'c-cpp',
      'falcon': 'c-cpp',
      'factor': 'c-cpp',
      'flix': 'c-cpp',
      'icon': 'c-cpp',
      'io': 'c-cpp',
      'pike': 'c-cpp',
      'pl/i': 'c-cpp',
      'bc': 'c-cpp',
      'e': 'c-cpp',
      'dylan': 'c-cpp',
      'eiffel': 'c-cpp',
      'chapel': 'c-cpp',
      'futhark': 'c-cpp',
      'haskell': 'c-cpp',
      'ocaml': 'c-cpp',
      'caml': 'c-cpp',
      'standard ml': 'c-cpp',
      'ml': 'c-cpp',
      'idris': 'c-cpp',
      'lean': 'c-cpp',
      'dafny': 'c-cpp',
      'emacs lisp': 'c-cpp',
      'autolisp': 'c-cpp',

      // Python & Data Science Ecosystem
      'python': 'python-data',
      'py': 'python-data',
      'python project': 'python-data',
      'python projects': 'python-data',
      'python-data': 'python-data',
      'python data': 'python-data',
      'python data science': 'python-data',
      'python & data science': 'python-data',
      'python programming': 'python-data',
      'python automation': 'python-data',
      'data science': 'python-data',
      'jython': 'python-data',
      'mojo': 'python-data',
      'r': 'python-data',
      'matlab': 'python-data',
      'julia': 'python-data',
      'wolfram': 'python-data',
      'wolfram language': 'python-data',
      'apl': 'python-data',
      'bqn': 'python-data',
      'q': 'python-data',
      'gams': 'python-data',
      'numbat': 'python-data',
      'lisp': 'python-data',
      'common lisp': 'python-data',
      'scheme': 'python-data',
      'racket': 'python-data',
      'logo': 'python-data',
      'sql': 'python-data',

      // Java & Enterprise Systems
      'java': 'java',
      'core java': 'java',
      'advance java': 'java',
      'advanced java': 'java',
      'java project': 'java',
      'java projects': 'java',
      'java programming': 'java',
      'spring boot': 'java',
      'spring': 'java',
      'c#': 'java',
      'csharp': 'java',
      'visual basic .net': 'java',
      'visual basic': 'java',
      'vb.net': 'java',
      'delphi': 'java',
      'object pascal': 'java',
      'scala': 'java',
      'groovy': 'java',
      'ceylon': 'java',
      'clojure': 'java',
      'abap': 'java',
      'cobol': 'java',
      'nemerle': 'java',
      'smalltalk': 'java',
      'pl/sql': 'java',
      'f#': 'java',

      // Web & Full-Stack Development
      'web': 'web-dev',
      'web dev': 'web-dev',
      'web development': 'web-dev',
      'web project': 'web-dev',
      'web projects': 'web-dev',
      'full stack': 'web-dev',
      'fullstack': 'web-dev',
      'mern': 'web-dev',
      'frontend': 'web-dev',
      'backend': 'web-dev',
      'html': 'web-dev',
      'css': 'web-dev',
      'html/css': 'web-dev',
      'html / css': 'web-dev',
      'html / css / web': 'web-dev',
      'html/css/web': 'web-dev',
      'javascript': 'web-dev',
      'js': 'web-dev',
      'typescript': 'web-dev',
      'ts': 'web-dev',
      'php': 'web-dev',
      'ruby': 'web-dev',
      'perl': 'web-dev',
      'lua': 'web-dev',
      'coffeescript': 'web-dev',
      'actionscript': 'web-dev',
      'webassembly': 'web-dev',
      'wasm': 'web-dev',
      'ecmascript': 'web-dev',
      'jscript': 'web-dev',
      'hack': 'web-dev',
      'haxe': 'web-dev',
      'elm': 'web-dev',
      'purescript': 'web-dev',
      'tcl': 'web-dev',
      'tk': 'web-dev',
      'xslt': 'web-dev',
      'xquery': 'web-dev',
      'qml': 'web-dev',
      'elixir': 'web-dev',
      'erlang': 'web-dev',
      'crystal': 'web-dev',
      'scratch': 'web-dev',
      'postscript': 'web-dev',
      'rebol': 'web-dev',
      'red': 'web-dev',
      'raku': 'web-dev',

      // AI & Machine Learning
      'ai': 'ai-ml',
      'ml': 'ai-ml',
      'ai/ml': 'ai-ml',
      'ai & ml': 'ai-ml',
      'ai project': 'ai-ml',
      'ai projects': 'ai-ml',
      'ml project': 'ai-ml',
      'ml projects': 'ai-ml',
      'artificial intelligence': 'ai-ml',
      'machine learning': 'ai-ml',
      'deep learning': 'ai-ml',
      'prolog': 'ai-ml',
      'mercury': 'ai-ml',
      'netlogo': 'ai-ml',

      // IoT & Hardware Embedded Systems
      'iot': 'iot-embedded',
      'iot project': 'iot-embedded',
      'iot projects': 'iot-embedded',
      'iot & hardware embedded': 'iot-embedded',
      'arduino': 'iot-embedded',
      'esp32': 'iot-embedded',
      'embedded': 'iot-embedded',
      'hardware': 'iot-embedded',
      'verilog': 'iot-embedded',
      'vhdl': 'iot-embedded',
      'opencl': 'iot-embedded',
      'labview': 'iot-embedded',
      'structured text': 'iot-embedded',
      'g-code': 'iot-embedded',
      'glsl': 'iot-embedded',
      'hlsl': 'iot-embedded',
      'gdscript': 'iot-embedded',
      'csound': 'iot-embedded',
      'chuck': 'iot-embedded',
      'faust': 'iot-embedded',
      'pure data': 'iot-embedded',
      'quakec': 'iot-embedded',

      // Mobile App Development
      'mobile': 'mobile',
      'mobile app': 'mobile',
      'mobile apps': 'mobile',
      'mobile project': 'mobile',
      'mobile projects': 'mobile',
      'mobile app development': 'mobile',
      'flutter': 'mobile',
      'dart': 'mobile',
      'kotlin': 'mobile',
      'swift': 'mobile',
      'objective-c': 'mobile',
      'android': 'mobile',
      'ios': 'mobile',
      'react native': 'mobile',
      'kustom': 'mobile',

      // Blockchain & Web3 DApps
      'blockchain': 'blockchain',
      'blockchain project': 'blockchain',
      'blockchain projects': 'blockchain',
      'blockchain & web3 dapps': 'blockchain',
      'web3': 'blockchain',
      'crypto': 'blockchain',
      'solidity': 'blockchain',
      'dapp': 'blockchain',
      'dapps': 'blockchain',
      'smart contract': 'blockchain',
      'smart contracts': 'blockchain',

      // Cybersecurity & Systems / DevOps
      'cyber': 'cybersecurity',
      'security': 'cybersecurity',
      'cybersecurity': 'cybersecurity',
      'cyber security': 'cybersecurity',
      'ethical hacking': 'cybersecurity',
      'cybersecurity project': 'cybersecurity',
      'cybersecurity projects': 'cybersecurity',
      'cybersecurity & cloud': 'cybersecurity',
      'rust': 'cybersecurity',
      'go': 'cybersecurity',
      'golang': 'cybersecurity',
      'go (golang)': 'cybersecurity',
      'bash': 'cybersecurity',
      'shell': 'cybersecurity',
      'powershell': 'cybersecurity',
      'zsh': 'cybersecurity',
      'z shell': 'cybersecurity',
      'awk': 'cybersecurity',
      'sed': 'cybersecurity',
      'nix': 'cybersecurity'
    };
  }

  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  searchProjects(rawQuery) {
    if (!rawQuery) return [];
    const q = rawQuery.trim().toLowerCase();
    if (!q) return [];

    const aliases = ForgeExplorer.DOMAIN_ALIASES;

    // Direct degree alias match (e.g. 'btech', 'bca', 'mca', 'diploma', 'bsc')
    if (q === 'btech' || q === 'b.tech' || q === 'b tech') {
      return this.allProjects.filter(p => (p.degrees || []).some(d => /b\.?tech/i.test(d)));
    }
    if (q === 'bca') {
      return this.allProjects.filter(p => (p.degrees || []).some(d => /bca/i.test(d)));
    }
    if (q === 'bsc' || q === 'b.sc' || q === 'b sc') {
      return this.allProjects.filter(p => (p.degrees || []).some(d => /b\.?sc/i.test(d)));
    }
    if (q === 'diploma') {
      return this.allProjects.filter(p => p.year <= 3);
    }
    if (q === 'mca' || q === 'm.tech' || q === 'mtech') {
      return this.allProjects.filter(p => (p.degrees || []).some(d => /mca|m\.?tech/i.test(d)) || p.year >= 3);
    }

    // 1. Direct domain alias match (e.g. 'c', 'python', 'java', 'c++', 'iot')
    // User wants ONLY projects belonging to that specific category!
    if (aliases[q]) {
      const targetCat = aliases[q];
      return this.allProjects.filter(p => p.category === targetCat);
    }

    // 2. Query starting or ending with domain prefix/suffix:
    // e.g. "c atm", "python scraper", "hospital in c++", "attendance in python"
    for (const [alias, targetCat] of Object.entries(aliases)) {
      // Prefix: "python scraper", "c bank"
      const prefixRegex = new RegExp('^' + this.escapeRegex(alias) + '\\s+(.+)$');
      const pMatch = q.match(prefixRegex);
      if (pMatch) {
        const rest = pMatch[1].trim();
        const catProjects = this.allProjects.filter(p => p.category === targetCat);
        const res = this.filterByKeywords(catProjects, rest);
        if (res.length > 0) return res;
      }

      // Suffix: "atm in c", "attendance in python"
      const suffixRegex = new RegExp('^(.+?)\\s+(?:in|using|with|for)\\s+' + this.escapeRegex(alias) + '$');
      const sMatch = q.match(suffixRegex);
      if (sMatch) {
        const rest = sMatch[1].trim();
        const catProjects = this.allProjects.filter(p => p.category === targetCat);
        const res = this.filterByKeywords(catProjects, rest);
        if (res.length > 0) return res;
      }
    }

    // 3. General Keyword Search with Word Boundaries & Scoring
    return this.filterByKeywords(this.allProjects, q);
  }

  filterByKeywords(projectList, query) {
    const cleanQ = query.trim().toLowerCase();
    const words = cleanQ.split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return [];

    const scored = [];

    for (const p of projectList) {
      const title = (p.title || '').toLowerCase();
      const tagline = (p.tagline || p.description || '').toLowerCase();
      const catLabel = (p.categoryLabel || '').toLowerCase();
      const stack = Array.isArray(p.techStack) ? p.techStack : [];

      let score = 0;

      // Full phrase exact match in title: very high priority
      if (title.includes(cleanQ)) {
        score += 150;
        if (title.startsWith(cleanQ)) score += 50;
      } else if (tagline.includes(cleanQ)) {
        score += 50;
      }

      let allWordsMatched = true;

      for (const w of words) {
        const escapedWord = this.escapeRegex(w);
        const isShort = w.length <= 2;

        let wordRegex;
        if (w === 'c++' || w === 'cpp') {
          wordRegex = /\b(?:c\+\+|cpp)\b/i;
        } else if (w === 'c#') {
          wordRegex = /\bc#\b/i;
        } else {
          wordRegex = new RegExp('(?:^|[\\s\\-_/().,"\'`])' + escapedWord + '(?:$|[\\s\\-_/().,"\'`])', 'i');
        }

        let wordFound = false;

        // Special check: prevent 'c' matching inside other words (e.g. Scikit, Price, Machine, Face)
        if (w === 'c') {
          if (p.category === 'c-cpp' || stack.some(t => t.toLowerCase() === 'c' || t.toLowerCase() === 'c language') || /\b(?:in\s+c|c\s+language|c\s*\/\s*c\+\+)\b/i.test(title)) {
            score += 80;
            wordFound = true;
          }
        } 
        // Special check: prevent 'java' matching 'javascript'
        else if (w === 'java') {
          const hasPureJava = (p.category === 'java') ||
            stack.some(t => /\bjava\b/i.test(t) && !/javascript/i.test(t)) ||
            (/\bjava\b/i.test(title) && !/javascript/i.test(title));
          if (hasPureJava) {
            score += 80;
            wordFound = true;
          }
        } 
        // Special check: prevent 'ai' matching 'email', 'train', 'rain', 'blockchain'
        else if (w === 'ai') {
          if (p.category === 'ai-ml' || /\bai\b/i.test(title) || stack.some(t => /\bai\b/i.test(t))) {
            score += 80;
            wordFound = true;
          }
        }
        // Special check: prevent 'ml' matching 'html', 'xml', 'seamless'
        else if (w === 'ml') {
          if (p.category === 'ai-ml' || /\bml\b/i.test(title) || stack.some(t => /\bml\b/i.test(t))) {
            score += 80;
            wordFound = true;
          }
        }
        // Special check: prevent 'react' matching 'reactions', 'reacted'
        else if (w === 'react') {
          const hasReact = stack.some(t => /\breact(?:\.js)?\b/i.test(t)) || /\breact(?:\.js)?\b/i.test(title);
          if (hasReact) {
            score += (p.category === 'web-dev' ? 90 : 40);
            wordFound = true;
          }
        }
        else {
          // Check title with word boundary
          if (wordRegex.test(title)) {
            score += 60;
            wordFound = true;
          } else if (!isShort && title.includes(w)) {
            score += 20;
            wordFound = true;
          }

          // Check tech stack with word boundary
          if (stack.some(t => wordRegex.test(t) || (!isShort && t.toLowerCase() === w))) {
            score += 40;
            wordFound = true;
          }

          // Check tagline with word boundary
          if (wordRegex.test(tagline)) {
            score += 15;
            wordFound = true;
          }

          // Check category label
          if (wordRegex.test(catLabel)) {
            score += 25;
            wordFound = true;
          }

          // Check degrees list (e.g. "B.Tech", "BCA", "B.Sc")
          if (!wordFound && Array.isArray(p.degrees)) {
            const cleanW = w.replace(/[^a-z0-9]/g, '');
            if (cleanW.length >= 3 && p.degrees.some(d => d.toLowerCase().replace(/[^a-z0-9]/g, '').includes(cleanW))) {
              score += 25;
              wordFound = true;
            }
          }

          // Check year label (e.g. "1st Year", "Final Year")
          if (!wordFound && p.yearLabel && wordRegex.test(p.yearLabel)) {
            score += 20;
            wordFound = true;
          }
        }

        if (!wordFound) {
          allWordsMatched = false;
        }
      }

      if (allWordsMatched && score > 0) {
        scored.push({ project: p, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => s.project);
  }

  renderSearchResults() {
    const q = this.searchQuery;
    const matchingProjects = this.searchProjects(q);

    let count = matchingProjects.length;
    let html = "";

    if (count === 0) {
      html = `
        <div class="explorer-empty-state">
          <p>No verified project kits matched "<strong>${this.searchQuery}</strong>".</p>
          <span style="font-size:0.85rem; color:var(--text-muted);">Try searching for C, Python, Java, AI/ML, React, IoT, or Viva Prep.</span>
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
