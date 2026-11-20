"""
Academic presentation slide deck generator.
Generates a structured 10-slide academic defense presentation with presenter notes.
"""

from typing import List, Dict, Any
from .models import Slide

def generate_presentation_slides(p):
    title = p["title"]
    year_label = p["yearLabel"]
    degrees = p["degrees"]
    tech = p["techStack"]
    tech_str = ", ".join(tech)
    cat_label = p["categoryLabel"]

    return [
        {
            "slideNumber": 1, "type": "title",
            "title": title,
            "subtitle": f"{year_label} Presentation Deck | {', '.join(degrees)}",
            "bullets": [f"Domain: {cat_label}", f"Target Degree: {', '.join(degrees)}", f"Core Technologies: {tech_str}"],
            "notes": f"Respected examiners, today we present our project: {title}.",
            "speakerNotes": f"Respected examiners, today we present our project: {title}."
        },
        {
            "slideNumber": 2, "type": "problem",
            "title": "Problem Statement & Motivation",
            "subtitle": f"Why this project is crucial in modern {cat_label}",
            "bullets": [
                "Current legacy workflows rely on manual intervention prone to errors.",
                "High operational latency and lack of real-time visibility.",
                f"Urgent requirement for an automated solution in {tech[0]}."
            ],
            "notes": "Emphasize the problem statement and motivation.",
            "speakerNotes": "Emphasize the problem statement and motivation."
        },
        {
            "slideNumber": 3, "type": "comparison",
            "title": "Literature Review & Comparison",
            "subtitle": "Existing vs. Proposed System Architecture",
            "bullets": [
                "Existing System: Fragmented tools, high manual overhead.",
                "Proposed System: Streamlined architecture with sub-second execution speed.",
                f"Built using production standards in {tech_str}."
            ],
            "notes": "Highlight architectural advantages over existing approaches.",
            "speakerNotes": "Highlight architectural advantages over existing approaches."
        },
        {
            "slideNumber": 4, "type": "architecture",
            "title": "System Architecture & Data Flow",
            "subtitle": "5-Stage End-to-End Execution Pipeline",
            "diagramSteps": ["Input / Telemetry Ingestion", "Data Validation & Parsing", "Core Processing Engine", "Database & State Store", "UI Presentation / Output"],
            "bullets": [
                "Layered separation of concerns (Presentation, Business Logic, Persistence).",
                "Asynchronous communication channels ensuring optimal throughput.",
                "Robust error boundary handling across all endpoints."
            ],
            "notes": "Walk the committee through the 5 execution stages.",
            "speakerNotes": "Walk the committee through the 5 execution stages."
        },
        {
            "slideNumber": 5, "type": "tech-stack",
            "title": "Technology Stack & Specs",
            "subtitle": "Frameworks, Libraries & Runtime Environment",
            "bullets": [
                f"Primary Language & Framework: {tech_str}",
                "Design Pattern: Modular Component-Driven Architecture",
                "Operating Environment: Cross-Platform (Windows, Linux, macOS, Cloud)",
                "Documentation Standard: IEEE Format Project Report"
            ],
            "notes": "Justify why these specific tools were chosen.",
            "speakerNotes": "Justify why these specific tools were chosen."
        },
        {
            "slideNumber": 6, "type": "methodology",
            "title": "Core Modules & Methodology",
            "subtitle": "Detailed Module Breakdown",
            "bullets": [
                "Module 1: User / Sensor Ingestion & Authentication Interface",
                "Module 2: Core Algorithm / Smart Contract / Logic Processing",
                "Module 3: Live Telemetry, Visualizer & Analytics Dashboard",
                "Module 4: Automated Export, Report & Alert Dispatcher"
            ],
            "notes": "Explain module synchronization and data flow.",
            "speakerNotes": "Explain module synchronization and data flow."
        },
        {
            "slideNumber": 7, "type": "results",
            "title": "Experimental Results & Validation",
            "subtitle": "Empirical Benchmark & Stress Test Metrics",
            "bullets": [
                "100% Success rate across academic test suites and edge cases.",
                "Sub-150ms average transaction / inference latency.",
                "Zero data loss under continuous simulated workload tests."
            ],
            "notes": "Present empirical metrics and benchmarks.",
            "speakerNotes": "Present empirical metrics and benchmarks."
        },
        {
            "slideNumber": 8, "type": "demo",
            "title": "Live Demonstration Walkthrough",
            "subtitle": "Real-Time System Execution",
            "bullets": [
                "Step 1: System initialization and dependency loading.",
                "Step 2: Interactive execution and real-time processing.",
                "Step 3: Output verification, state persistence, and telemetry audit."
            ],
            "notes": "Demonstrate the working project live.",
            "speakerNotes": "Demonstrate the working project live."
        },
        {
            "slideNumber": 9, "type": "future-scope",
            "title": "Future Scope & Enhancements",
            "subtitle": "Scalability & Roadmap",
            "bullets": [
                "Integration with decentralized cloud infrastructure and edge computing nodes.",
                "Mobile companion app deployment with push telemetry alerts.",
                "Automated CI/CD integration with automated unit test suites."
            ],
            "notes": "Explain future roadmap and scalability.",
            "speakerNotes": "Explain future roadmap and scalability."
        },
        {
            "slideNumber": 10, "type": "conclusion",
            "title": "Conclusion & Examiner Defense Q&A",
            "subtitle": "Key Takeaways & viva Defense",
            "bullets": [
                f"{title} successfully fulfills all academic objectives.",
                "Complete working source code, synopsis report, and documentation verified.",
                "Thank you! We welcome questions from the examination committee."
            ],
            "notes": "Conclude and invite questions.",
            "speakerNotes": "Conclude and invite questions."
        }
    ]
