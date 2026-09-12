/**
 * ForgeProject Interactive Viva-Voce Defense AI Examiner Simulator
 * Allows students to practice their college project defense with realistic examiner questions,
 * scoring, feedback, and tips.
 */

class VivaSimulator {
  constructor() {
    this.currentProject = null;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.isEvaluating = false;

    this.initElements();
    this.initEventListeners();
  }

  initElements() {
    this.chatMessagesContainer = document.getElementById("vivaChatMessages");
    this.userInput = document.getElementById("vivaUserInput");
    this.sendBtn = document.getElementById("vivaSendBtn");
    this.projectSelect = document.getElementById("vivaProjectSelect");

    // Self-populate if options are unpopulated or only contain the placeholder
    if (this.projectSelect && this.projectSelect.options.length <= 1) {
      if (window.app && typeof window.app.populateVivaProjectSelect === "function") {
        window.app.populateVivaProjectSelect();
      }
    }
  }

  initEventListeners() {
    this.sendBtn?.addEventListener("click", () => this.handleUserSubmit());
    this.userInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleUserSubmit();
    });

    this.projectSelect?.addEventListener("change", (e) => {
      const projId = e.target.value;
      if (!projId) return;
      const projects = (window.app && Array.isArray(window.app.projects) && window.app.projects.length > 0)
        ? window.app.projects
        : (window.explorer?.allProjects || (typeof PROJECTS_DATA !== "undefined" ? PROJECTS_DATA : []));
      const proj = projects.find(p => p.id === projId);
      if (proj) this.startSession(proj);
    });
  }

  async startSession(project) {
    if (!project) return;
    this.initElements();

    if (this.projectSelect && project.id) {
      this.projectSelect.value = project.id;
    }

    if (!project.vivaQuestions && window.app && typeof window.app.getProjectFullDetails === "function") {
      project = await window.app.getProjectFullDetails(project);
    }
    this.currentProject = project;
    this.currentQuestionIndex = 0;
    this.score = 0;

    if (this.chatMessagesContainer) {
      this.chatMessagesContainer.innerHTML = "";
    }

    this.addExaminerMessage(
      `Hello! I will be your External Project Examiner today for **${project.title}**. ` +
      `I'll ask you a few targeted technical questions to evaluate your system architecture, methodology, and design choices. Let's begin!`
    );

    setTimeout(() => {
      this.askNextQuestion();
    }, 1000);
  }

  askNextQuestion() {
    if (!this.currentProject) return;
    const questions = this.currentProject.vivaQuestions || [
      { question: `Explain the architecture of ${this.currentProject.title}.`, answer: "We used a modular design pattern." }
    ];

    if (this.currentQuestionIndex < questions.length) {
      const q = questions[this.currentQuestionIndex];
      this.addExaminerMessage(`**Question ${this.currentQuestionIndex + 1}:** ${q.question}`);
    } else {
      this.finishSession();
    }
  }

  handleUserSubmit() {
    this.initElements();
    const text = this.userInput?.value.trim();
    if (!text || this.isEvaluating) return;

    if (!this.currentProject || !this.currentProject.vivaQuestions) return;

    if (this.currentQuestionIndex >= this.currentProject.vivaQuestions.length) {
      this.addStudentMessage(text);
      if (this.userInput) this.userInput.value = "";
      this.addExaminerMessage("💡 Your mock defense session is already complete. You can select another project from the dropdown above to start a new mock viva, or download your complete project kit!");
      return;
    }

    this.addStudentMessage(text);
    if (this.userInput) this.userInput.value = "";
    this.isEvaluating = true;

    // Simulate Examiner Evaluation
    setTimeout(() => {
      this.evaluateAnswer(text);
      this.isEvaluating = false;
    }, 1200);
  }

  evaluateAnswer(studentAnswer) {
    if (!this.currentProject || !this.currentProject.vivaQuestions || !this.currentProject.vivaQuestions[this.currentQuestionIndex]) {
      this.finishSession();
      return;
    }

    const currentQ = this.currentProject.vivaQuestions[this.currentQuestionIndex];
    const words = studentAnswer.toLowerCase().split(/\s+/);

    // Semantic keyword evaluation based on model answer with stop words filtered out
    const stopWords = new Set([
      "this", "that", "with", "from", "have", "been", "were", "what", "when", "where",
      "which", "while", "also", "into", "more", "some", "such", "than", "then", "their",
      "they", "will", "would", "about", "could", "should", "using", "used", "uses"
    ]);

    const rawModelWords = (currentQ.answer || "").toLowerCase().match(/\b\w{3,}\b/g) || [];
    const technicalKeywords = rawModelWords.filter(w => !stopWords.has(w));

    let matchCount = 0;
    const studentUniqueWords = new Set(words.filter(w => !stopWords.has(w)));
    studentUniqueWords.forEach(w => {
      if (technicalKeywords.includes(w)) matchCount++;
    });

    const isGood = (words.length >= 6 && matchCount >= 2) || (words.length >= 15 && matchCount >= 1);

    if (isGood) {
      this.score += 25;
      this.addExaminerMessage(
        `✅ **Good defense!** You covered key points. ` +
        `<br><br><strong>Examiner Ideal Note:</strong> "${currentQ.answer}"`
      );
    } else {
      this.score += 10;
      this.addExaminerMessage(
        `⚠️ **Partially acceptable, but needs more technical depth.** ` +
        `<br><br><strong>Here is how you should frame your answer to the committee:</strong><br>"${currentQ.answer}"`
      );
    }

    this.currentQuestionIndex++;

    setTimeout(() => {
      this.askNextQuestion();
    }, 1500);
  }

  finishSession() {
    const questions = this.currentProject?.vivaQuestions || [];
    const totalMax = Math.max(questions.length, 1) * 25;
    const percentage = Math.min(Math.round((this.score / totalMax) * 100), 100);

    let verdict = "Excellent! You are fully prepared to score top marks in your final project viva.";
    if (percentage < 70) {
      verdict = "Fair attempt! Review the provided Viva-Voce defense cheat sheet in the project kit before the final examination.";
    }

    this.addExaminerMessage(
      `🏁 **Viva Practice Complete!**<br>` +
      `<strong>Your Defense Readiness Score:</strong> ${percentage}%<br>` +
      `<em>${verdict}</em><br><br>` +
      `👉 You can download the complete project kit with full Q&A cheat sheets anytime!`
    );

    if (percentage >= 70 && typeof confetti === "function") {
      confetti({ particleCount: 50, spread: 60 });
    }
  }

  formatMarkdown(content) {
    if (!content) return "";
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  }

  addExaminerMessage(html) {
    this.initElements();
    if (!this.chatMessagesContainer) return;
    const formattedHtml = this.formatMarkdown(html);
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-bubble examiner";
    msgDiv.innerHTML = `
      <div class="speaker-tag"><i data-lucide="user-check"></i> External Examiner</div>
      <div>${formattedHtml}</div>
    `;
    this.chatMessagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
    if (window.lucide) window.lucide.createIcons();
  }

  addStudentMessage(text) {
    this.initElements();
    if (!this.chatMessagesContainer) return;
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-bubble student";
    msgDiv.innerText = text;
    this.chatMessagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.chatMessagesContainer) {
      this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;
    }
  }
}

// Global Viva Simulator Instance
window.vivaSimulator = new VivaSimulator();
