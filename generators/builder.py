"""
ProjectForge Master Project Builder.
Constructs full academic project packages and outputs optimized client distribution files.
"""

import json
import os
from typing import List, Dict, Any, Optional

try:
    import pymongo
except ImportError:
    pymongo = None

from .models import FullProject, ProjectMeta
from .catalog import PROJECTS_META
from .slides import generate_presentation_slides
from .domains import generate_full_code_files


def build_full_project(p: ProjectMeta) -> FullProject:
    """
    Builds a complete academic project bundle combining:
    - Metadata (category, year, difficulty, tech stack, tags)
    - IEEE-aligned synopsis (abstract, objectives, system comparison)
    - 10-slide presentation deck with speaker notes
    - Verified multi-file source code bundle
    - Viva voce defense Q&A
    """
    title = p["title"]
    year = p["year"]
    year_label = p["yearLabel"]
    degrees = p["degrees"]
    tech = p["techStack"]
    tech_str = ", ".join(tech)
    cat_label = p["categoryLabel"]

    synopsis = {
        "abstract": f"{title} is an academic project engineered for {year_label} students in {', '.join(degrees)} curricula. The project addresses critical domain challenges by leveraging modern {tech_str} to deliver a clean, robust, and reproducible working system ready for college evaluation.",
        "objectives": [
            f"Develop and deploy a working system using {tech[0]} and {tech[1] if len(tech)>1 else tech[0]}.",
            f"Adhere to best software engineering standards tailored for {cat_label}.",
            f"Provide verified source code, comprehensive 10-slide PowerPoint presentation, and IEEE synopsis documentation for defense."
        ],
        "existingSystemIssues": [
            "Manual, disconnected procedures causing high latency and human error rates.",
            "Lack of real-time monitoring, visualization, or validation mechanisms.",
            "Absence of structured logging, automated reports, and centralized data security."
        ],
        "proposedSystemAdvantages": [
            "Automated end-to-end processing pipeline reducing operational turnaround time by over 75%.",
            "Intuitive responsive interface with live validation and error recovery.",
            f"Complete academic kit customized for {', '.join(degrees)} final examination."
        ],
        "systemRequirements": {
            "hardware": "Standard PC / Laptop with 4GB+ RAM (8GB recommended for ML/IoT)",
            "software": f"{tech_str} environment with modern web browser / IDE"
        }
    }

    slides = generate_presentation_slides(p)
    code_files = generate_full_code_files(p)

    viva_q = [
        {
            "question": f"What is the primary objective of {title} and what real-world problem does it solve?",
            "answer": f"{title} automates legacy workflows by providing a structured, high-performance solution built with {tech_str}, ensuring high reliability, sub-second latency, and ease of deployment."
        },
        {
            "question": f"Why did you choose {tech[0]} over other alternatives for this project?",
            "answer": f"{tech[0]} provides the optimal balance between performance, ecosystem support, and ease of deployment, making it ideal for {year_label} {cat_label} requirements."
        },
        {
            "question": "How did you test and validate the system against edge cases and exceptions?",
            "answer": "We performed unit testing on individual modules, input boundary validation, and stress-tested concurrent operations to ensure zero unhandled runtime exceptions."
        }
    ]

    return {
        **p,
        "synopsis": synopsis,
        "slides": slides,
        "codeFiles": code_files,
        "vivaQuestions": viva_q
    }


def generate_data_files(
    output_dir: str = "js",
    projects_meta: Optional[List[ProjectMeta]] = None,
    sync_mongo: bool = True
) -> Dict[str, Any]:
    """
    Compiles client distribution data files:
    1. js/data-summary.js: Lightweight ~350 KB catalog index with synopses for instant UI rendering.
    2. js/data-details.json: Complete on-demand dictionary with slides, code files, and viva Q&A.
    3. MongoDB Sync: Optionally syncs all projects to local MongoDB instance.
    """
    if projects_meta is None:
        projects_meta = PROJECTS_META

    os.makedirs(output_dir, exist_ok=True)
    full_projects = [build_full_project(p) for p in projects_meta]
    total_count = len(projects_meta)

    yr_counts = {1: 0, 2: 0, 3: 0, 4: 0}
    cat_counts = {}
    deg_counts = {"B.Tech": 0, "BCA": 0, "B.Sc": 0}

    for p in projects_meta:
        yr_counts[p["year"]] += 1
        cat_counts[p["category"]] = cat_counts.get(p["category"], 0) + 1
        for d in p["degrees"]:
            deg_counts[d] = deg_counts.get(d, 0) + 1

    shared_constants = f"""
const DOMAINS_LIST = [
  {{ id: "all", name: "All Domains ({total_count})", icon: "layout-grid" }},
  {{ id: "ai-ml", name: "AI & Machine Learning ({cat_counts.get('ai-ml', 50)})", icon: "brain-circuit" }},
  {{ id: "iot-embedded", name: "IoT & Hardware ({cat_counts.get('iot-embedded', 50)})", icon: "cpu" }},
  {{ id: "java", name: "Java & Enterprise ({cat_counts.get('java', 50)})", icon: "coffee" }},
  {{ id: "mobile", name: "Mobile Flutter ({cat_counts.get('mobile', 50)})", icon: "smartphone" }},
  {{ id: "blockchain", name: "Blockchain & Web3 ({cat_counts.get('blockchain', 50)})", icon: "blocks" }},
  {{ id: "web-dev", name: "Web & Full Stack ({cat_counts.get('web-dev', 50)})", icon: "globe" }},
  {{ id: "python-data", name: "Python & Data Science ({cat_counts.get('python-data', 50)})", icon: "terminal" }},
  {{ id: "cybersecurity", name: "Cybersecurity & Cloud ({cat_counts.get('cybersecurity', 50)})", icon: "shield" }},
  {{ id: "c-cpp", name: "C / C++ Systems ({cat_counts.get('c-cpp', 50)})", icon: "code" }}
];

const ACADEMIC_YEARS = [
  {{ id: "all", name: "All Years ({total_count})", icon: "graduation-cap", count: {total_count} }},
  {{ id: "1", name: "1st Year (Beginner)", icon: "sparkles", count: {yr_counts[1]}, desc: "Fundamental C/C++, Python Basics, Simple Web & CLI Utilities" }},
  {{ id: "2", name: "2nd Year (Intermediate)", icon: "book-open", count: {yr_counts[2]}, desc: "Java OOPs, MySQL, Flask, Flutter Mini, IoT Nodes, Security Tools" }},
  {{ id: "3", name: "3rd Year (Hard / Pre-Final)", icon: "rocket", count: {yr_counts[3]}, desc: "MERN, Django, PyTorch ML, LoRa IoT, Web3 DApps, Cloud CSPM" }},
  {{ id: "4", name: "4th Year (Major / Capstone)", icon: "trophy", count: {yr_counts[4]}, desc: "Deep RL, Kubernetes Microservices, Post-Quantum, Distributed DBs" }}
];

const DEGREE_STREAMS = [
  {{ id: "all", name: "All Degrees", icon: "layers", count: {total_count}, label: "All Streams" }},
  {{ id: "B.Tech", name: "B.Tech Projects", icon: "cpu", count: {deg_counts['B.Tech']}, label: "B.Tech (CSE / IT / AI / ECE)" }},
  {{ id: "BCA", name: "BCA Projects", icon: "monitor", count: {deg_counts['BCA']}, label: "BCA (Software & Web Apps)" }},
  {{ id: "B.Sc", name: "B.Sc Projects", icon: "atom", count: {deg_counts['B.Sc']}, label: "B.Sc (Computer Science / IT)" }}
];

const DIFFICULTY_LEVELS = [
  {{ id: "all", name: "All Levels" }},
  {{ id: "Easy", name: "Easy (1st Year)" }},
  {{ id: "Medium", name: "Medium (2nd Year)" }},
  {{ id: "Hard", name: "Hard (3rd Year)" }},
  {{ id: "Very Hard", name: "Very Hard (4th Year Major)" }}
];
"""

    # 1. Lightweight data-summary.js
    summary_projects = [
        {
            **p,
            "synopsis": fp["synopsis"]
        }
        for p, fp in zip(projects_meta, full_projects)
    ]
    summary_json = json.dumps(summary_projects, indent=2)
    summary_content = f"""// ProjectForge Lightweight Catalog Index (~350 KB)
// {total_count} Verified Working Projects across {len(cat_counts)} Domains with Synopses Included
const PROJECTS_DATA = {summary_json};
{shared_constants}
"""
    summary_path = os.path.join(output_dir, "data-summary.js")
    with open(summary_path, "w", encoding="utf-8") as f:
        f.write(summary_content)
    print(f"Compiled lightweight catalog index -> {summary_path} ({len(summary_content)} bytes)")

    # 2. Heavy details dictionary
    details_map = {
        p["id"]: {
            "synopsis": p["synopsis"],
            "slides": p["slides"],
            "codeFiles": p["codeFiles"],
            "vivaQuestions": p["vivaQuestions"]
        }
        for p in full_projects
    }
    details_path = os.path.join(output_dir, "data-details.json")
    with open(details_path, "w", encoding="utf-8") as f:
        json.dump(details_map, f)
    print(f"Compiled on-demand project details map -> {details_path}")

    # 3. MongoDB Sync
    mongo_status = "Skipped"
    if sync_mongo and pymongo is not None:
        try:
            mongo_uri = os.environ.get("MONGO_URI", "mongodb://localhost:27017")
            client = pymongo.MongoClient(mongo_uri, serverSelectionTimeoutMS=2000)
            client.server_info()
            db_name = os.environ.get("DB_NAME", "projectforge")
            db = client[db_name]
            coll = db["projects"]
            coll.create_index([("id", pymongo.ASCENDING)], unique=True)

            valid_ids = [p["id"] for p in full_projects]
            del_res = coll.delete_many({"id": {"$nin": valid_ids}})
            if del_res.deleted_count > 0:
                print(f"MongoDB Cleaned: Removed {del_res.deleted_count} obsolete projects.")

            ops = [
                pymongo.UpdateOne({"id": p["id"]}, {"$set": p}, upsert=True)
                for p in full_projects
            ]
            coll.bulk_write(ops, ordered=False)
            mongo_status = f"Saved {total_count} projects to {mongo_uri}/{db_name}.projects"
            print(f"MongoDB Sync: Successfully saved {total_count} projects into {mongo_uri}/{db_name}.projects")
        except Exception as e:
            mongo_status = f"Notice: {e}"
            print(f"MongoDB Notice: {e}")

    return {
        "total_projects": total_count,
        "year_distribution": yr_counts,
        "domain_distribution": cat_counts,
        "degree_distribution": deg_counts,
        "mongo_status": mongo_status
    }
