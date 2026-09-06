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
    const targetHash = hashStr ? `#/${hashStr}` : "#/";

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    } else {
      // If hash was already the target, hashchange won't fire, so force sync & render immediately
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
    if (this.currentPath.length === 1) {
      return {
        type: "course-level",
        course: firstSeg,
        items: this.getCourseItems(firstSeg)
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
      { name: "Browse by Technology", courseKey: "tech", desc: "Filter by Stack: Python, AI/ML, MERN, Java, IoT, Mobile, Blockchain, C++", count: "9 Stacks", targetPath: ["Browse by Technology"] }
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
