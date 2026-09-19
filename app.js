/**
 * FARHAAN BASHIR — PORTFOLIO CORE ENGINE
 * Typographic System: Newsreader + Space Mono
 * Architecture: Static 4-System Grid + Deep-Dive Architecture Case Studies
 */

// Deep-Dive Technical Architecture & Systems Specifications (Interior Modal Views)
const caseStudyData = {
  telemetry: {
    tag: "SYS_01 // REAL-TIME TRANSIT & TELEMETRY",
    title: "Live Route Intelligence Engine",
    subtitle: "High-Throughput Spatial Ingestion & Predictive Dispatch",
    overview: "Built for SAFARapp, this high-concurrency real-time telemetry streaming cluster ingests continuous GPS updates from public buses navigating complex Himalayan valleys in Jammu & Kashmir. The engine eliminates mountain multipath reflections using recursive Kalman filtering and broadcasts sub-second arrival predictions directly to commuter devices.",
    diagram: `+-----------------------+      +-----------------------+      +-----------------------+
|  Hardware Bus GPS     | ---> |  Redis Streams Hub    | ---> |  Kalman Smoothing     |
|  (MQTT / UDP Delta)   |      |  (Pub/Sub Ingress)    |      |  Spatial Noise Filter |
+-----------------------+      +-----------------------+      +-----------------------+
                                                                          |
                                                                          v
                                                             +-------------------------+
                                                             |  WebSocket Cluster Hub  |
                                                             |  (<25ms to Commuter App)|
                                                             +-------------------------+`,
    highlights: [
      "WebSocket Pub/Sub Cluster: Scalable Node.js & Redis cluster handling 10,000+ simultaneous commuter socket connections.",
      "Sub-25ms Dispatch Latency: High-frequency GPS delta streams dispatched across mountain corridors in under 25 milliseconds.",
      "Recursive Kalman Filtering: Eliminates spatial multipath drift caused by steep valley cliffs and river gorge topography.",
      "PostGIS Spatial Bounding: Micro-indexed proximity queries locating nearest operational bus stops in <3ms."
    ],
    benchmarks: [
      { key: "DISPATCH LATENCY", val: "Sub-25ms WebSocket Delays" },
      { key: "AGGREGATE SCALE", val: "50,000+ Commuters Targeted" },
      { key: "CONCURRENCY", val: "10,000+ Simultaneous Sockets" },
      { key: "FILTER KERNEL", val: "Kalman Spatial Noise Smoothing" }
    ]
  },

  pass: {
    tag: "SYS_02 // CONTACTLESS CRYPTOGRAPHY",
    title: "Smart Booking & Offline Cryptographic Pass",
    subtitle: "HMAC-SHA256 Offline Asymmetric Ticket Validation",
    overview: "An offline-first transit ticketing engine developed for remote corridors where cellular connectivity is intermittent or non-existent. Tickets are cryptographically signed with HMAC-SHA256 and verified locally on conductors' handheld devices in under 1ms with zero internet connection, while PostgreSQL row-level locks guarantee seat consistency.",
    diagram: `+-----------------------+      +-----------------------+      +-----------------------+
|  Commuter Booking     | ---> |  HMAC-SHA256 Signer   | ---> |  Scannable Dynamic    |
|  (PostgreSQL Lock)    |      |  (Transit Root Key)   |      |  Offline QR Ticket    |
+-----------------------+      +-----------------------+      +-----------------------+
                                                                          |
                                                                          v
                                                             +-------------------------+
                                                             |  Conductor Offline POS  |
                                                             |  (< 1ms Key Ring Check) |
                                                             +-------------------------+`,
    highlights: [
      "100% Offline Verification: Offline cryptographic signature validation enables rapid bus boarding without internet connectivity.",
      "Anti-Replay Salt Nonces: Rolling timestamp nonces prevent ticket duplication, screenshot forwarding, and double-use fraud.",
      "Atomic Row-Level Locking: PostgreSQL 'FOR UPDATE SKIP LOCKED' transactions prevent concurrent seat overbooking on high-demand routes.",
      "PWA Offline Storage: Compressed ticket tokens stored locally within indexed client cache for instant offline retrieval."
    ],
    benchmarks: [
      { key: "SECURITY LEVEL", val: "100% Zero-Connectivity Validation" },
      { key: "POS CHECK TIME", val: "< 1ms Local Signature Check" },
      { key: "CRYPTO STANDARD", val: "HMAC SHA-256 with Salt Nonce" },
      { key: "DB TRANSACTION", val: "PostgreSQL Row-Level Locks" }
    ]
  },

  navigation: {
    tag: "SYS_03 // RESILIENT MOUNTAIN NAVIGATION",
    title: "Offline Transit & J&K Bus Network",
    subtitle: "Edge Vector Tiling & USSD/SMS Automated Gateway",
    overview: "A resilient mountain navigation subsystem engineered for high-altitude Himalayan transit corridors (Gulmarg, Sonamarg, Pir Panjal pass). Compresses hierarchical vector map tiles and spatial graph routing into an under 18MB local cache, paired with an automated USSD/SMS fallback service for passengers using basic 2G feature phones.",
    diagram: `+-----------------------+      +-----------------------+      +-----------------------+
|  Hierarchical Vector  | ---> |  Compressed SQLite    | ---> |  Client Mapbox GL     |
|  Tile Extraction      |      |  Local Cache (<18MB)  |      |  Offline Vector Map   |
+-----------------------+      +-----------------------+      +-----------------------+
                                           |
                                           v
                               +-----------------------+
                               |  USSD/SMS Gateways    | ---> Fallback Timetable Lookup
                               |  (2G / Zero-Data)     |      Without Smartphones
                               +-----------------------+`,
    highlights: [
      "Compressed Vector Tiles: Full valley route network encoded into under 18MB local SQLite/Hive storage footprint.",
      "Offline Graph Traversal: On-device topological graph traversal providing turn-by-turn bus corridor directions without cellular signal.",
      "USSD / SMS Automated Fallback: Commuters on feature phones query departure times and delay estimates via automated shortcode queries.",
      "40+ Mapped Stops: Accurately calibrated bus stops mapped across remote regional transit corridors."
    ],
    benchmarks: [
      { key: "NETWORK COVERAGE", val: "40+ Valley Bus Stops Mapped" },
      { key: "CACHE FOOTPRINT", val: "< 18MB Full Corridor Tiles" },
      { key: "MAP RENDERING", val: "12ms Local Canvas Vectors" },
      { key: "FALLBACK CHANNEL", val: "Automated USSD / SMS 2G Gateway" }
    ]
  },

  itinerary: {
    tag: "SYS_04 // ALGORITHMIC ROUTE OPTIMIZATION",
    title: "AI Multi-Modal Itinerary Engine",
    subtitle: "Multi-Objective Heuristic A* Pareto Search Kernel",
    overview: "Custom multi-objective pathfinding engine calculating complex multi-modal journeys (local bus routes + shared valley cabs + pedestrian transfers). Dynamically evaluates Pareto-optimal route frontiers by incorporating real-time Himalayan weather disruptions, snow accumulation, and elevation slope penalties.",
    diagram: `+-----------------------+      +-----------------------+
|  Real-Time Weather    | ---> |  Heuristic Weighting  |
|  (Precipitation/Snow) |      |  (Elevation Gradient) |
+-----------------------+      +-----------------------+
                                           |
                                           v
+-----------------------+      +-----------------------+
|  Dynamic Road Network | ---> |  Multi-Objective A*   | ---> Pareto-Optimal
|  (Buses + Cabs + Walk)|      |  Pareto Search Kernel |      Route Set (<40ms)
+-----------------------+      +-----------------------+`,
    highlights: [
      "Sub-40ms Heuristics: High-performance FastAPI and NetworkX async microservice returning Pareto-optimal itineraries in under 40 milliseconds.",
      "Environmental Penalty Model: Walking legs and mountain transfer links dynamically re-weighted based on live rain, snow, and altitude gain.",
      "In-Memory Spatial Graph: 94.2% cache hit ratio across road topology network graphs stored in memory.",
      "Multi-Modal Synthesizer: Seamless integration of fixed-schedule state buses, shared passenger cabs, and walking transfers."
    ],
    benchmarks: [
      { key: "SEARCH LATENCY", val: "< 40ms Pareto Frontier Compute" },
      { key: "CACHE HIT RATIO", val: "94.2% In-Memory Graph Nodes" },
      { key: "SEARCH KERNEL", val: "Multi-Objective Heuristic A*" },
      { key: "FRAMEWORK", val: "FastAPI + NetworkX Microservice" }
    ]
  }
};

/* ==========================================================================
   DOM Initialization
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initThemeManager();
  initCaseStudyModal();
  initMobileNavigation();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Newsreader + Space Mono in Dark / Light Mode)
   ========================================================================== */
function initThemeManager() {
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const html = document.documentElement;

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem("fb_portfolio_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "dark");

  setTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      localStorage.setItem("fb_portfolio_theme", newTheme);
    });
  }

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    if (themeLabel) {
      themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
    }
  }
}

/* ==========================================================================
   2. Interior Case Study Architecture Modal (#moduleModal)
   Houses detailed architecture diagrams, flowcharts, and performance metrics
   ========================================================================== */
function initCaseStudyModal() {
  const modal = document.getElementById("moduleModal");
  const modalClose = document.getElementById("modalClose");
  const modalDismiss = document.getElementById("modalDismiss");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalBody = document.getElementById("modalBody");

  if (!modal) return;

  const triggerButtons = document.querySelectorAll(".modal-trigger-btn");

  triggerButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const moduleId = btn.getAttribute("data-module");
      const data = caseStudyData[moduleId];

      if (!data) return;

      modalTag.textContent = data.tag;
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;

      modalBody.innerHTML = `
        <p>${data.overview}</p>

        <h4>PIPELINE ARCHITECTURE &amp; FLOWCHART</h4>
        <pre class="modal-diagram">${data.diagram}</pre>

        <h4>CORE ARCHITECTURAL HIGHLIGHTS</h4>
        <ul style="padding-left: 1.2rem; margin-bottom: 1.4rem; display: flex; flex-direction: column; gap: 0.45rem;">
          ${data.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>

        <h4>SYSTEM PERFORMANCE BENCHMARKS</h4>
        <ul class="modal-benchmarks-list">
          ${data.benchmarks.map(b => `
            <li>
              <span class="benchmark-k">${b.key}</span>
              <span class="benchmark-v">${b.val}</span>
            </li>
          `).join("")}
        </ul>
      `;

      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalDismiss) modalDismiss.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNavigation() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const drawer = document.getElementById("mobileNavDrawer");

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("active");
    drawer.setAttribute("aria-hidden", (!isOpen).toString());
  });

  const links = drawer.querySelectorAll(".mobile-nav-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("active");
      drawer.setAttribute("aria-hidden", "true");
    });
  });
}

/* ==========================================================================
   4. Direct Contact Form Dispatch Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("userName");
    const name = nameInput ? nameInput.value.trim() : "there";
    
    alert(`Thank you, ${name}. Your message proposal has been prepared. You may also reach Farhaan directly at farhanbashir327426@gmail.com or +91 6006048125.`);
    form.reset();
  });
}
