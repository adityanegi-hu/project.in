/**
 * ProjectForge Cloudflare Worker API & Edge Application Controller
 * High-performance edge server replacing legacy Python server.py.
 * Powered by Cloudflare Workers, Static Assets, and D1 SQLite Database.
 */

// --- Utility: Standard JSON Response with CORS ---
function jsonResponse(data, status = 200, customHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      ...customHeaders
    }
  });
}

// --- Utility: CORS Preflight Handler ---
function handleCorsPreflight() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Max-Age": "86400"
    }
  });
}

// --- Security: PBKDF2 Password Hashing (100,000 iterations PBKDF2-HMAC-SHA256) ---
async function hashPassword(password) {
  const salt = crypto.randomUUID().replace(/-/g, "").slice(0, 32);
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );
  const hex = Array.from(new Uint8Array(derived))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
  return `pbkdf2_sha256$${salt}$${hex}`;
}

async function verifyPassword(password, storedHash) {
  if (!password || !storedHash) return false;
  try {
    const parts = storedHash.split("$");
    if (parts.length !== 3 || parts[0] !== "pbkdf2_sha256") return false;
    const salt = parts[1];
    const expectedHex = parts[2];
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    const derived = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: enc.encode(salt),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      256
    );
    const calculatedHex = Array.from(new Uint8Array(derived))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    return calculatedHex === expectedHex;
  } catch (err) {
    return false;
  }
}

// --- Main Worker Fetch Handler ---
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method.toUpperCase();

    // 1. Handle CORS Preflight
    if (method === "OPTIONS") {
      return handleCorsPreflight();
    }

    // 2. Route API Requests
    if (pathname.startsWith("/api/")) {
      try {
        // --- System Health & Status ---
        if (pathname === "/api/status" || pathname === "/api/health" || pathname === "/healthz") {
          return jsonResponse({
            status: "ONLINE",
            service: "ForgeProject Cloudflare Edge API",
            runtime: "cloudflare-workers",
            region: request.cf?.colo || "global-edge",
            country: request.cf?.country || "US",
            d1_connected: Boolean(env.DB),
            timestamp: new Date().toISOString()
          });
        }

        // --- Firewall Status ---
        if (pathname === "/api/firewall-status") {
          return jsonResponse({
            status: "ACTIVE",
            shield: "Cloudflare Web Application Firewall (WAF) & DDoS Guard",
            rate_limiting: "Edge Automatic",
            ddos_mitigation: "Global Anycast Protected"
          });
        }

        // --- Get All Projects (Lightweight Meta) ---
        if (pathname === "/api/projects" && method === "GET") {
          // Client loads data-summary.js; API confirms readiness
          return jsonResponse({
            success: true,
            total_projects: 450,
            summary_url: "/js/data-summary.js"
          });
        }

        // --- Get Single Project Details ---
        if ((pathname.startsWith("/api/project/") || pathname === "/api/project") && method === "GET") {
          let projId = pathname.startsWith("/api/project/")
            ? pathname.replace("/api/project/", "").trim()
            : url.searchParams.get("id");

          if (!projId) {
            return jsonResponse({ success: false, error: "Project ID is required" }, 400);
          }

          // Check community / shared projects in D1 first
          if (env.DB) {
            const sharedRow = await env.DB.prepare(
              "SELECT * FROM shared_projects WHERE id = ?"
            ).bind(projId).first();

            if (sharedRow) {
              return jsonResponse({
                success: true,
                project: {
                  id: sharedRow.id,
                  title: sharedRow.title,
                  tagline: sharedRow.tagline,
                  category: sharedRow.category,
                  techStack: JSON.parse(sharedRow.tech_stack || "[]"),
                  codeFiles: JSON.parse(sharedRow.code_files || "[]"),
                  synopsis: JSON.parse(sharedRow.synopsis || "{}"),
                  vivaQuestions: []
                }
              });
            }
          }

          // Fetch static details dictionary from CDN asset storage
          if (env.ASSETS) {
            try {
              const detailsReq = new Request(new URL("/js/data-details.json", request.url));
              const detailsRes = await env.ASSETS.fetch(detailsReq);
              if (detailsRes && detailsRes.ok) {
                const detailsMap = await detailsRes.json();
                if (detailsMap[projId]) {
                  return jsonResponse({
                    success: true,
                    project: {
                      id: projId,
                      ...detailsMap[projId]
                    }
                  });
                }
              }
            } catch (err) {
              // fall through to 404
            }
          }

          return jsonResponse({ success: false, error: `Project '${projId}' not found` }, 404);
        }

        // --- Auth: Signup ---
        if (pathname === "/api/auth/signup" && method === "POST") {
          const body = await request.json().catch(() => null);
          if (!body || !body.email || !body.password) {
            return jsonResponse({ success: false, error: "Email and password are required" }, 400);
          }

          const email = body.email.trim().toLowerCase();
          const name = (body.name || email.split("@")[0]).trim();
          const department = (body.department || "Computer Science").trim();
          const year = (body.year || "3rd Year").trim();

          if (!env.DB) {
            return jsonResponse({ success: false, error: "Database service unavailable" }, 503);
          }

          const existing = await env.DB.prepare(
            "SELECT id FROM users WHERE email = ?"
          ).bind(email).first();

          if (existing) {
            return jsonResponse({ success: false, error: "An account with this email already exists." }, 409);
          }

          const passwordHash = await hashPassword(body.password);
          const userId = crypto.randomUUID();
          const sessionToken = `pf_${crypto.randomUUID().replace(/-/g, "")}`;

          await env.DB.prepare(`
            INSERT INTO users (id, name, email, password_hash, department, year, saved_project_ids, created_at, last_login)
            VALUES (?, ?, ?, ?, ?, ?, '[]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `).bind(userId, name, email, passwordHash, department, year).run();

          return jsonResponse({
            success: true,
            message: "Registration successful! Welcome to ProjectForge.",
            user: {
              id: userId,
              email,
              name,
              department,
              year,
              saved_project_ids: []
            },
            token: sessionToken
          });
        }

        // --- Auth: Signin ---
        if (pathname === "/api/auth/signin" && method === "POST") {
          const body = await request.json().catch(() => null);
          if (!body || !body.email || !body.password) {
            return jsonResponse({ success: false, error: "Email and password are required" }, 400);
          }

          const email = body.email.trim().toLowerCase();
          if (!env.DB) {
            return jsonResponse({ success: false, error: "Database service unavailable" }, 503);
          }

          const user = await env.DB.prepare(
            "SELECT * FROM users WHERE email = ?"
          ).bind(email).first();

          if (!user) {
            return jsonResponse({ success: false, error: "Invalid email or password." }, 401);
          }

          const isValid = await verifyPassword(body.password, user.password_hash);
          if (!isValid) {
            return jsonResponse({ success: false, error: "Invalid email or password." }, 401);
          }

          // Update last login
          await env.DB.prepare(
            "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?"
          ).bind(user.id).run();

          const sessionToken = `pf_${crypto.randomUUID().replace(/-/g, "")}`;
          let savedIds = [];
          try {
            savedIds = JSON.parse(user.saved_project_ids || "[]");
          } catch {
            savedIds = [];
          }

          return jsonResponse({
            success: true,
            message: "Authentication successful.",
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              department: user.department,
              year: user.year,
              saved_project_ids: savedIds
            },
            token: sessionToken
          });
        }

        // --- User: Toggle Bookmark / Save Project ---
        if (pathname === "/api/user/toggle-save" && method === "POST") {
          const body = await request.json().catch(() => null);
          if (!body || !body.email || !body.project_id) {
            return jsonResponse({ success: false, error: "email and project_id are required" }, 400);
          }

          const email = body.email.trim().toLowerCase();
          const projId = body.project_id.trim();

          if (!env.DB) {
            return jsonResponse({ success: false, error: "Database service unavailable" }, 503);
          }

          const user = await env.DB.prepare(
            "SELECT id, saved_project_ids FROM users WHERE email = ?"
          ).bind(email).first();

          if (!user) {
            return jsonResponse({ success: false, error: "User not found" }, 404);
          }

          let savedIds = [];
          try {
            savedIds = JSON.parse(user.saved_project_ids || "[]");
          } catch {
            savedIds = [];
          }

          const exists = savedIds.includes(projId);
          if (exists) {
            savedIds = savedIds.filter(id => id !== projId);
          } else {
            savedIds.push(projId);
          }

          await env.DB.prepare(
            "UPDATE users SET saved_project_ids = ? WHERE id = ?"
          ).bind(JSON.stringify(savedIds), user.id).run();

          return jsonResponse({
            success: true,
            saved: !exists,
            saved_project_ids: savedIds,
            message: exists ? "Project removed from bookmarks" : "Project saved to bookmarks"
          });
        }

        // --- User: Fetch Saved Projects ---
        if (pathname === "/api/user/saved-projects" && method === "GET") {
          const email = (url.searchParams.get("email") || request.headers.get("x-user-email") || "").trim().toLowerCase();
          if (!email || !env.DB) {
            return jsonResponse({ success: true, saved_project_ids: [], projects: [], count: 0 });
          }

          const user = await env.DB.prepare(
            "SELECT saved_project_ids FROM users WHERE email = ?"
          ).bind(email).first();

          let savedIds = [];
          if (user && user.saved_project_ids) {
            try {
              savedIds = JSON.parse(user.saved_project_ids);
            } catch {
              savedIds = [];
            }
          }

          return jsonResponse({
            success: true,
            saved_project_ids: savedIds,
            count: savedIds.length
          });
        }

        // --- Community: Share Project ---
        if (pathname === "/api/share-project" && method === "POST") {
          const body = await request.json().catch(() => null);
          if (!body || !body.title) {
            return jsonResponse({ success: false, error: "Project title is required" }, 400);
          }

          if (!env.DB) {
            return jsonResponse({ success: false, error: "Database service unavailable" }, 503);
          }

          const newId = `shared-${Date.now().toString(36)}`;
          await env.DB.prepare(`
            INSERT INTO shared_projects (id, title, tagline, category, author_name, author_email, year_label, tech_stack, code_files, synopsis, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
          `).bind(
            newId,
            body.title.trim(),
            (body.tagline || "").trim(),
            body.category || "web-dev",
            (body.authorName || body.author || "Anonymous").trim(),
            (body.authorEmail || "").trim(),
            body.yearLabel || "Capstone",
            JSON.stringify(body.techStack || []),
            JSON.stringify(body.codeFiles || []),
            JSON.stringify(body.synopsis || {})
          ).run();

          return jsonResponse({
            success: true,
            message: "Project submitted and published to community showcase!",
            id: newId
          });
        }

        // --- Community: Get Shared Projects ---
        if (pathname === "/api/shared-projects" && method === "GET") {
          if (!env.DB) {
            return jsonResponse([]);
          }

          const rows = await env.DB.prepare(
            "SELECT * FROM shared_projects ORDER BY created_at DESC LIMIT 50"
          ).all();

          const list = (rows.results || []).map(r => {
            let tech = [];
            try { tech = JSON.parse(r.tech_stack || "[]"); } catch {}
            return {
              id: r.id,
              title: r.title,
              tagline: r.tagline,
              category: r.category,
              authorName: r.author_name,
              yearLabel: r.year_label,
              techStack: tech,
              createdAt: r.created_at
            };
          });

          return jsonResponse(list);
        }

        // --- Mock AI Viva Voce Defense Simulator ---
        if (pathname === "/api/viva/chat" && method === "POST") {
          const body = await request.json().catch(() => ({}));
          const title = body.projectTitle || "your project";
          return jsonResponse({
            success: true,
            reply: `Regarding ${title}: The system architecture adheres to academic standards. In your viva evaluation, make sure to detail concurrency handling, component modularity, and operational fault tolerance.`,
            score: 25
          });
        }

        // API 404
        return jsonResponse({ success: false, error: "API endpoint not found" }, 404);

      } catch (err) {
        return jsonResponse({
          success: false,
          error: "Internal Edge Server Error",
          details: err.message
        }, 500);
      }
    }

    // 3. Serve Static Assets for all non-API routes
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  }
};
