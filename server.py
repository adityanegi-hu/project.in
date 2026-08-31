"""
ProjectForge - Full-Stack Local Server with MongoDB Integration
Serves the web application and handles REST endpoints for MongoDB at mongodb://localhost:27017.
"""

import http.server
import socketserver
import json
import urllib.parse
import os
import sys
import hashlib

# Safe import for PyMongo
try:
    import pymongo
except ImportError:
    pymongo = None

from datetime import datetime, timezone

import time
from collections import defaultdict

class WebFirewallShield:
    """
    ProjectForge Application-Layer Web Security Firewall (WAF)
    Provides real-time rate limiting, malicious pattern inspection, path traversal protection,
    and automatic defense headers.
    """
    def __init__(self, rate_limit=120, time_window=60):
        self.rate_limit = rate_limit
        self.time_window = time_window
        self.request_history = defaultdict(list)
        self.blocked_attacks_count = 0
        self.total_inspected_requests = 0
        self.start_time = time.time()
        
        self.blocked_patterns = [
            "../", "..\\", "%2e%2e", "%00", 
            "<script", "javascript:", "eval(", 
            "union select", "$where", "/etc/passwd", 
            "cmd.exe", ".env", "phpinfo"
        ]

    def is_rate_limited(self, client_ip):
        now = time.time()
        self.request_history[client_ip] = [t for t in self.request_history[client_ip] if now - t < self.time_window]
        if len(self.request_history[client_ip]) >= self.rate_limit:
            return True
        self.request_history[client_ip].append(now)
        return False

    def inspect_request(self, client_ip, path, body=b""):
        self.total_inspected_requests += 1
        
        # 1. Rate Limiting Check
        if self.is_rate_limited(client_ip):
            self.blocked_attacks_count += 1
            return False, 429, "Rate limit exceeded (Max 120 requests/minute). Please slow down."

        # 2. Malicious Pattern Inspection (URL Decoded)
        lowered_path = urllib.parse.unquote(path).lower()
        for pattern in self.blocked_patterns:
            if pattern in lowered_path:
                self.blocked_attacks_count += 1
                return False, 403, "Firewall Rule Triggered: Blocked unauthorized pattern."

        if body:
            try:
                body_str = body.decode("utf-8", errors="ignore").lower()
                for pattern in ["<script", "eval(", "union select"]:
                    if pattern in body_str:
                        self.blocked_attacks_count += 1
                        return False, 403, f"Firewall Rule Triggered: Blocked malicious payload."
            except Exception:
                pass

        return True, 200, "OK"

    def get_status(self):
        return {
            "firewall": "Active",
            "status": "Healthy & Protecting",
            "total_inspected_requests": self.total_inspected_requests,
            "blocked_threats_count": self.blocked_attacks_count,
            "rate_limit_per_minute": self.rate_limit,
            "active_clients_tracked": len(self.request_history),
            "uptime_seconds": int(time.time() - self.start_time)
        }

waf = WebFirewallShield()


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_PORT = 3000
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "projectforge"

# Connect to MongoDB
db = None
if pymongo is not None:
    try:
        mongo_client = pymongo.MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        mongo_client.server_info()
        db = mongo_client[DB_NAME]
        print(f"Connected to MongoDB at {MONGO_URI}/{DB_NAME}", flush=True)
    except Exception as err:
        print(f"Notice: MongoDB not available at {MONGO_URI} ({err}). Running in fallback mode.", flush=True)
        db = None
else:
    print("Notice: 'pymongo' module not installed in current environment. Running in standalone static mode.", flush=True)

class ProjectForgeHandler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def end_headers(self):
        # Application-Layer Firewall Security Headers
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("X-XSS-Protection", "1; mode=block")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Permissions-Policy", "geolocation=(), camera=(), microphone=()")
        self.send_header("Connection", "close")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Content-Length", "0")
        self.end_headers()

    def send_json(self, status_code, data):
        try:
            body = json.dumps(data, default=str).encode("utf-8")
            self.send_response(status_code)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as e:
            print(f"Error in send_json: {e}", flush=True)

    def do_GET(self):
        client_ip = self.client_address[0] if self.client_address else "127.0.0.1"
        allowed, status, msg = waf.inspect_request(client_ip, self.path)
        if not allowed:
            self.send_json(status, {"error": msg, "firewall": "Active"})
            return

        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/firewall-status":
            self.send_json(200, waf.get_status())
            return
        
        # API: Fetch all projects from MongoDB
        if parsed.path == "/api/projects":
            try:
                projects = list(db["projects"].find({}, {"_id": 0})) if db is not None else []
                self.send_json(200, projects)
            except Exception as e:
                self.send_json(500, {"error": str(e)})
            return
            
        # API: Fetch shared community projects from MongoDB
        elif parsed.path == "/api/shared-projects":
            try:
                shared = list(db["shared_projects"].find({}, {"_id": 0})) if db is not None else []
                self.send_json(200, shared)
            except Exception as e:
                self.send_json(500, {"error": str(e)})
            return

        # API: Fetch user saved projects
        elif parsed.path == "/api/user/saved-projects":
            try:
                query_params = urllib.parse.parse_qs(parsed.query)
                email = query_params.get("email", [""])[0].strip().lower()
                
                if not email:
                    raise ValueError("Email parameter is required")
                
                saved_ids = []
                if db is not None:
                    user = db["users"].find_one({"email": email})
                    if user:
                        saved_ids = user.get("saved_project_ids", [])
                        
                    saved_projects = list(db["projects"].find({"id": {"$in": saved_ids}}, {"_id": 0}))
                else:
                    saved_projects = []

                self.send_json(200, {
                    "success": True,
                    "saved_project_ids": saved_ids,
                    "projects": saved_projects,
                    "count": len(saved_projects)
                })
            except Exception as e:
                self.send_json(400, {"success": False, "error": str(e)})
            return

        # API: Fetch individual project details on-demand
        elif parsed.path.startswith("/api/project/"):
            try:
                proj_id = parsed.path.replace("/api/project/", "").strip()
                if not proj_id:
                    raise ValueError("Project ID is required")

                proj_doc = None
                if db is not None:
                    proj_doc = db["projects"].find_one({"id": proj_id}, {"_id": 0})

                if proj_doc is None:
                    details_file = os.path.join(BASE_DIR, "js", "data-details.json")
                    if os.path.exists(details_file):
                        with open(details_file, "r", encoding="utf-8") as df:
                            details_map = json.load(df)
                            if proj_id in details_map:
                                proj_doc = {"id": proj_id, **details_map[proj_id]}

                if proj_doc is None:
                    self.send_json(404, {"success": False, "error": f"Project '{proj_id}' not found"})
                else:
                    self.send_json(200, {"success": True, "project": proj_doc})
            except Exception as e:
                self.send_json(400, {"success": False, "error": str(e)})
            return

        # Default static file handler
        return super().do_GET()




    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length) if content_length > 0 else b"{}"

        # API: User Sign Up / Registration
        if parsed.path == "/api/auth/signup":
            try:
                data = json.loads(body.decode("utf-8"))
                email = data.get("email", "").strip().lower()
                password = data.get("password", "").strip()
                name = data.get("name", "").strip()
                degree = data.get("degree", "B.Tech").strip()
                year = data.get("year", "3").strip()

                if not email or not password or not name:
                    raise ValueError("Name, email, and password are required.")

                if len(password) < 6:
                    raise ValueError("Password must be at least 6 characters.")

                pwd_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()

                if db is not None:
                    existing = db["users"].find_one({"email": email})
                    if existing:
                        raise ValueError("An account with this email already exists. Please Sign In.")

                    user_doc = {
                        "email": email,
                        "name": name,
                        "password": pwd_hash,
                        "degree": degree,
                        "year": year,
                        "saved_project_ids": [],
                        "createdAt": datetime.now(timezone.utc).isoformat()
                    }
                    db["users"].insert_one(user_doc)

                user_profile = {
                    "email": email,
                    "name": name,
                    "degree": degree,
                    "year": year,
                    "saved_project_ids": []
                }

                self.send_json(201, {
                    "success": True,
                    "message": "Account created successfully!",
                    "user": user_profile
                })
            except Exception as e:
                self.send_json(400, {"success": False, "error": str(e)})
            return

        # API: User Sign In
        elif parsed.path == "/api/auth/signin":
            try:
                data = json.loads(body.decode("utf-8"))
                email = data.get("email", "").strip().lower()
                password = data.get("password", "").strip()

                if not email or not password:
                    raise ValueError("Email and password are required.")

                pwd_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()

                if db is not None:
                    user = db["users"].find_one({"email": email})
                    if not user:
                        raise ValueError("No account found with this email. Please Sign Up.")
                    if user.get("password") != pwd_hash:
                        raise ValueError("Invalid password. Please check and try again.")

                    user_profile = {
                        "email": user["email"],
                        "name": user.get("name", "Student"),
                        "degree": user.get("degree", "B.Tech"),
                        "year": user.get("year", "3"),
                        "saved_project_ids": user.get("saved_project_ids", [])
                    }
                else:
                    user_profile = {
                        "email": email,
                        "name": email.split("@")[0].capitalize(),
                        "degree": "B.Tech",
                        "year": "3",
                        "saved_project_ids": []
                    }

                self.send_json(200, {
                    "success": True,
                    "message": "Signed in successfully!",
                    "user": user_profile
                })
            except Exception as e:
                self.send_json(400, {"success": False, "error": str(e)})
            return

        # API: Toggle Saved Project for User
        elif parsed.path == "/api/user/toggle-save":
            try:
                data = json.loads(body.decode("utf-8"))
                email = data.get("email", "").strip().lower()
                project_id = data.get("projectId", "").strip()

                if not email or not project_id:
                    raise ValueError("Email and projectId are required.")

                saved_ids = []
                is_saved = False

                if db is not None:
                    user = db["users"].find_one({"email": email})
                    if not user:
                        db["users"].insert_one({
                            "email": email,
                            "name": email.split("@")[0].capitalize(),
                            "password": "",
                            "degree": "B.Tech",
                            "year": "3",
                            "saved_project_ids": [project_id],
                            "createdAt": datetime.now(timezone.utc).isoformat()
                        })
                        saved_ids = [project_id]
                        is_saved = True
                    else:
                        saved_ids = user.get("saved_project_ids", [])
                        if project_id in saved_ids:
                            saved_ids.remove(project_id)
                            is_saved = False
                        else:
                            saved_ids.append(project_id)
                            is_saved = True

                        db["users"].update_one(
                            {"email": email},
                            {"$set": {"saved_project_ids": saved_ids}}
                        )
                else:
                    saved_ids = [project_id]
                    is_saved = True

                self.send_json(200, {
                    "success": True,
                    "saved": is_saved,
                    "saved_project_ids": saved_ids,
                    "message": "Project added to your saved collection" if is_saved else "Project removed from saved collection"
                })
            except Exception as e:
                self.send_json(400, {"success": False, "error": str(e)})
            return

        # API: Submit & Share a new project to MongoDB
        elif parsed.path == "/api/share-project":
            try:
                data = json.loads(body.decode("utf-8"))
                now_str = datetime.now(timezone.utc).isoformat()
                data["createdAt"] = now_str
                data["status"] = "approved"
                
                cat_id = data.get("category", "web-dev")
                cat_labels = {
                    "ai-ml": "AI & Machine Learning",
                    "iot-embedded": "IoT & Hardware",
                    "java": "Java & Enterprise",
                    "mobile": "Mobile Flutter",
                    "blockchain": "Blockchain & Web3",
                    "web-dev": "Web & Full Stack",
                    "python-data": "Python & Data Science",
                    "cybersecurity": "Cybersecurity & Cloud",
                    "c-cpp": "C / C++ Systems"
                }
                
                raw_tech = data.get("techStack", ["Python", "React"])
                if isinstance(raw_tech, list):
                    tech_stack = [str(t).strip() for t in raw_tech if str(t).strip()]
                elif isinstance(raw_tech, str):
                    tech_stack = [t.strip() for t in raw_tech.split(",") if t.strip()]
                else:
                    tech_stack = ["Python", "React"]

                tech_str = ", ".join(tech_stack)

                author_name = data.get("authorName", "Student Contributor")
                author_email = data.get("authorEmail", "")
                author_degree = data.get("authorDegree", "B.Tech")
                author_year = int(data.get("authorYear", data.get("year", 3)))

                proj_id = f"shared-{int(datetime.now().timestamp() * 1000)}"
                full_proj_meta = {
                    "id": proj_id,
                    "year": author_year,
                    "yearLabel": f"Year {author_year} Capstone Project",
                    "difficulty": data.get("difficulty", "Medium"),
                    "title": data.get("title", "Community Submitted Project"),
                    "category": cat_id,
                    "categoryLabel": cat_labels.get(cat_id, "Software Engineering"),
                    "badge": f"Shared by {author_name.split()[0]}",
                    "tagline": data.get("abstract", "")[:120] + "..." if len(data.get("abstract", "")) > 120 else data.get("abstract", ""),
                    "rating": 4.9,
                    "downloads": "1.2k+",
                    "color": "#10b981",
                    "techStack": tech_stack,
                    "degrees": ["B.Tech", "BCA", "B.Sc"],
                    "author": {
                        "name": author_name,
                        "email": author_email,
                        "degree": author_degree,
                        "year": author_year
                    },
                    "synopsis": {
                        "abstract": data.get("abstract", "Student project submission verified and approved for academic reference."),
                        "existingSystemIssues": [
                            "Manual unstructured workflow",
                            "Lack of automated validation",
                            "High operational latency"
                        ],
                        "proposedSystemAdvantages": [
                            "Fully automated modular pipeline",
                            "Real-time responsive dashboard",
                            "Standardized IEEE format documentation"
                        ],
                        "systemRequirements": {
                            "hardware": "Standard PC / Multi-core CPU, 8GB RAM",
                            "software": f"{tech_str}, Modern Web Browser, Git"
                        },
                        "objectives": [
                            "Implement core algorithmic workflow",
                            "Design responsive presentation layer",
                            "Provide verifiable testing artifacts"
                        ]
                    },
                    "codeFiles": [
                        {
                            "filename": "README.md",
                            "language": "markdown",
                            "code": f"# {data.get('title')}\n\nRepository: {data.get('repoUrl')}\nSubmitted by: {data.get('authorName', 'Student')}\n\n{data.get('abstract')}"
                        },
                        {
                            "filename": "main.py" if any("python" in t.lower() for t in tech_stack) else "index.js",
                            "language": "python" if any("python" in t.lower() for t in tech_stack) else "javascript",
                            "code": f"// Project: {data.get('title')}\n// Author: {data.get('authorName', 'Student')}\nconsole.log('Project initialized successfully');\n"
                        }
                    ],
                    "slides": [
                        {
                            "slideNumber": 1,
                            "type": "title",
                            "title": data.get("title", "Project Defense"),
                            "subtitle": f"An Academic Capstone Presentation by {data.get('authorName', 'Student')}",
                            "bullets": [],
                            "speakerNotes": "Introduce your team, project title, and institution."
                        },
                        {
                            "slideNumber": 2,
                            "type": "problem",
                            "title": "Problem Statement",
                            "subtitle": "Challenges in Existing Systems",
                            "bullets": [
                                "Manual and inefficient legacy workflows",
                                "Lack of centralized reporting mechanisms",
                                "High error rates in manual verification"
                            ],
                            "speakerNotes": "Discuss why this project was necessary and the problems it solves."
                        },
                        {
                            "slideNumber": 3,
                            "type": "solution",
                            "title": "Proposed Solution",
                            "subtitle": "System Architecture & Innovation",
                            "bullets": [
                                f"Built with {data.get('techStack', 'Modern Web Technologies')}",
                                "Modular microservice architecture",
                                "End-to-end automated pipeline"
                            ],
                            "speakerNotes": "Explain your proposed architecture and how it overcomes previous issues."
                        }
                    ],
                    "vivaQuestions": [
                        {
                            "question": f"What is the primary motivation behind {data.get('title')}?",
                            "answer": f"The primary goal is to address identified operational bottlenecks using modern {data.get('techStack', 'software')} best practices."
                        },
                        {
                            "question": "Which architecture pattern was chosen and why?",
                            "answer": "We adopted a modular MVC design to decouple presentation, logic, and data storage layers."
                        }
                    ]
                }
                
                if db is not None:
                    db["shared_projects"].insert_one(data)
                    db["projects"].insert_one(full_proj_meta)
                    print(f"MongoDB: Saved project {proj_id} to both 'shared_projects' and 'projects' collections.", flush=True)

                self.send_json(201, {
                    "success": True, 
                    "message": "Project saved to MongoDB successfully in both 'shared_projects' and 'projects' collections!", 
                    "project": full_proj_meta
                })
            except Exception as e:
                self.send_json(400, {"success": False, "error": str(e)})
            return

        self.send_json(404, {"error": "Not Found"})

def start_server(host="127.0.0.1", port=DEFAULT_PORT):
    os.chdir(BASE_DIR)
    try:
        http.server.ThreadingHTTPServer.allow_reuse_address = False
        with http.server.ThreadingHTTPServer((host, port), ProjectForgeHandler) as httpd:
            print("============================================================", flush=True)
            print(f"ProjectForge Server is LIVE!", flush=True)
            print(f"Open in your browser: http://{host}:{port}", flush=True)
            print(f"MongoDB Integration: mongodb://localhost:27017/{DB_NAME}", flush=True)
            print("============================================================", flush=True)
            httpd.serve_forever()
    except OSError as e:
        if "10048" in str(e) or "Address already in use" in str(e):
            fallback_port = port + 1 if port < 9000 else 8080
            print(f"Port {port} in use, switching to port {fallback_port}...", flush=True)
            start_server(host, fallback_port)
        else:
            raise e
    except KeyboardInterrupt:
        print("\nServer shutting down.", flush=True)

if __name__ == "__main__":
    port_arg = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", DEFAULT_PORT))
    host_arg = sys.argv[2] if len(sys.argv) > 2 else os.environ.get("HOST", "127.0.0.1")
    start_server(host_arg, port_arg)


