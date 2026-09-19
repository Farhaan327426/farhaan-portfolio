/**
 * FARHAAN BASHIR — PORTFOLIO ENGINE (REFACTORED)
 * Centralized State Management | Micro-Interaction Choreography | Accessibility-First
 */

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
      { key: "DISPATCH LATENCY", val: "25", unit: "ms" },
      { key: "AGGREGATE SCALE", val: "50000", unit: "+" },
      { key: "CONCURRENCY", val: "10000", unit: "+" },
      { key: "FILTER KERNEL", val: "Kalman Filter", unit: "" }
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
      { key: "CONNECTIVITY REQUIRED", val: "0", unit: "%" },
      { key: "POS CHECK TIME", val: "1", unit: "ms" },
      { key: "CRYPTO STANDARD", val: "SHA-256", unit: "" },
      { key: "DB LOCKING", val: "Row-Level", unit: "" }
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
      { key: "STOPS MAPPED", val: "40", unit: "+" },
      { key: "CACHE FOOTPRINT", val: "18", unit: "MB" },
      { key: "MAP RENDERING", val: "12", unit: "ms" },
      { key: "FALLBACK CHANNEL", val: "2G USSD", unit: "" }
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
      { key: "SEARCH LATENCY", val: "40", unit: "ms" },
      { key: "CACHE HIT RATIO", val: "94.2", unit: "%" },
      { key: "SEARCH KERNEL", val: "A* Pareto", unit: "" },
      { key: "FRAMEWORK", val: "FastAPI", unit: "" }
    ]
  }
};

/* ==========================================================================
   CENTRALIZED STATE MANAGEMENT LAYER
   ========================================================================== */
const PortfolioState = {
  theme: null,
  modalOpen: false,
  activeSection: null,
  isMobile: false,
  mobileDrawerOpen: false,

  init() {
    this.theme = this.loadTheme();
    this.detectMobileBreakpoint();
    return this;
  },

  loadTheme() {
    const saved = localStorage.getItem("fb_portfolio_theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "dark";
  },

  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    const themeLabel = document.getElementById("themeLabel");
    if (themeLabel) {
      themeLabel.textContent = theme.toUpperCase();
    }
    localStorage.setItem("fb_portfolio_theme", theme);
  },

  setModalState(isOpen) {
    this.modalOpen = isOpen;
    const modal = document.getElementById("moduleModal");
    if (modal) {
      modal.setAttribute("aria-hidden", (!isOpen).toString());
    }
    document.body.style.overflow = isOpen ? "hidden" : "";
  },

  setMobileDrawer(isOpen) {
    this.mobileDrawerOpen = isOpen;
    const drawer = document.getElementById("mobileNavDrawer");
    if (drawer) {
      drawer.classList.toggle("active", isOpen);
      drawer.setAttribute("aria-expanded", isOpen.toString());
    }
  },

  detectMobileBreakpoint() {
    this.isMobile = window.innerWidth < 768;
  }
};

/* ==========================================================================
   INITIALIZATION ORCHESTRATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  PortfolioState.init();
  initThemeEngine();
  initCaseStudyModal();
  initMobileNavigation();
  initContactForm();
  initScrollObserver();
  attachResizeObserver();
  attachSystemPreferenceListener();
});

/* ==========================================================================
   1. THEME ENGINE WITH OS-LEVEL PREFERENCE SYNC
   ========================================================================== */
function initThemeEngine() {
  const themeToggle = document.getElementById("themeToggle");
  
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = PortfolioState.theme === "dark" ? "light" : "dark";
      PortfolioState.setTheme(newTheme);
    });
  }
}

function attachSystemPreferenceListener() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    if (!localStorage.getItem("fb_portfolio_theme")) {
      PortfolioState.setTheme(e.matches ? "dark" : "light");
    }
  });
}

/* ==========================================================================
   2. CASE STUDY MODAL ENGINE WITH EASED COUNTER ANIMATIONS
   ========================================================================== */
function initCaseStudyModal() {
  const modal = document.getElementById("moduleModal");
  if (!modal) return;

  document.addEventListener("click", handleModalTrigger);

  const modalClose = document.getElementById("modalClose");
  const modalDismiss = document.getElementById("modalDismiss");

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalDismiss) modalDismiss.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && PortfolioState.modalOpen) closeModal();
  });

  function handleModalTrigger(e) {
    const btn = e.target.closest(".modal-trigger-btn");
    if (!btn) return;
    e.preventDefault();

    const moduleId = btn.getAttribute("data-module");
    const data = caseStudyData[moduleId];
    if (!data) return;

    populateModalContent(data);
    openModal();
  }

  function populateModalContent(data) {
    document.getElementById("modalTag").textContent = data.tag;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalSubtitle").textContent = data.subtitle;

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
      <p class="modal-overview-text">${data.overview}</p>

      <div class="modal-section-header">
        <h4>PIPELINE ARCHITECTURE &amp; FLOWCHART</h4>
      </div>
      <pre class="modal-diagram">${data.diagram}</pre>

      <div class="modal-section-header">
        <h4>CORE ARCHITECTURAL HIGHLIGHTS</h4>
      </div>
      <ul class="modal-highlights-list">
        ${data.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>

      <div class="modal-section-header">
        <h4>SYSTEM PERFORMANCE BENCHMARKS</h4>
      </div>
      <ul class="modal-benchmarks-list">
        ${data.benchmarks.map(b => `
          <li>
            <span class="benchmark-k">${b.key}</span>
            <span class="benchmark-v" data-target="${b.val}">${isNaN(b.val) ? b.val : '0'}${b.unit}</span>
          </li>
        `).join("")}
      </ul>
    `;

    requestAnimationFrame(() => animateBenchmarkCounters(modalBody));
  }

  function openModal() {
    PortfolioState.setModalState(true);
    modal.classList.add("active");
  }

  function closeModal() {
    PortfolioState.setModalState(false);
    modal.classList.remove("active");
  }
}

/* ==========================================================================
   3. EASED BENCHMARK COUNTER ANIMATION (CUBIC-IN-OUT)
   ========================================================================== */
function animateBenchmarkCounters(container) {
  const elements = container.querySelectorAll(".benchmark-v[data-target]");
  
  elements.forEach((el, idx) => {
    const targetVal = parseFloat(el.getAttribute("data-target"));
    if (isNaN(targetVal)) return;

    const unit = el.textContent.replace(/[0-9.]/g, "");
    const delay = idx * 50;
    
    setTimeout(() => {
      let currentVal = 0;
      const duration = 600;
      const startTime = performance.now();

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        currentVal = targetVal * easedProgress;

        el.textContent = `${Number.isInteger(targetVal) ? Math.round(currentVal) : currentVal.toFixed(1)}${unit}`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }, delay);
  });
}

/* ==========================================================================
   4. MOBILE NAVIGATION DRAWER WITH ARIA STATE MANAGEMENT
   ========================================================================== */
function initMobileNavigation() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const drawer = document.getElementById("mobileNavDrawer");

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener("click", () => {
    PortfolioState.setMobileDrawer(!PortfolioState.mobileDrawerOpen);
  });

  drawer.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      PortfolioState.setMobileDrawer(false);
    });
  });

  document.addEventListener("click", (e) => {
    if (!drawer.contains(e.target) && !menuBtn.contains(e.target) && PortfolioState.mobileDrawerOpen) {
      PortfolioState.setMobileDrawer(false);
    }
  });
}

/* ==========================================================================
   5. CONTACT FORM WITH LOADING & SUCCESS STATE CHOREOGRAPHY
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const nameInput = document.getElementById("userName");
    const name = nameInput?.value.trim() || "there";

    if (!submitBtn) return;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "DISPATCHING…";
    submitBtn.disabled = true;
    submitBtn.setAttribute("data-state", "loading");

    setTimeout(() => {
      submitBtn.setAttribute("data-state", "success");
      submitBtn.textContent = "MESSAGE RECEIVED";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.setAttribute("data-state", "idle");
        form.reset();

        showContactNotification(name);
      }, 1200);
    }, 500);
  });
}

function showContactNotification(name) {
  const notification = document.createElement("div");
  notification.className = "contact-notification";
  notification.setAttribute("role", "alert");
  notification.innerHTML = `
    <p>Direct channels: <strong>farhanbashir327426@gmail.com</strong> | <strong>+91 6006048125</strong></p>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   6. SCROLL-DRIVEN SECTION ACTIVE STATE WITH REFINED THRESHOLDS
   ========================================================================== */
function initScrollObserver() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          PortfolioState.activeSection = id;
          navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: [0.2, 0.5], rootMargin: "-100px 0px -50%" }
  );

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   7. RESPONSIVE BREAKPOINT OBSERVER FOR STATE SYNC
   ========================================================================== */
function attachResizeObserver() {
  const resizeObserver = new ResizeObserver(() => {
    const wasMobile = PortfolioState.isMobile;
    PortfolioState.detectMobileBreakpoint();

    if (wasMobile && !PortfolioState.isMobile && PortfolioState.mobileDrawerOpen) {
      PortfolioState.setMobileDrawer(false);
    }
  });

  resizeObserver.observe(document.documentElement);
}
