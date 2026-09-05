/**
 * Farhaan Bashir | AI Systems & Engineering Portfolio Logic
 */

const drawerData = {
  itinerary: {
    title: "AI Multi-Modal Itinerary Engine",
    subtitle: "Multi-Objective Heuristic A* Graph Optimization",
    diagram: `
+-----------------------+      +-----------------------+
|  Real-Time Weather    | ---> |  Heuristic Weighting  |
|  (Precipitation/Snow) |      |  (Elevation Gradient) |
+-----------------------+      +-----------------------+
                                           |
                                           v
+-----------------------+      +-----------------------+
|  Dynamic Road Network | ---> |  Multi-Objective A*   | ---> Pareto-Optimal
|  (Buses + Cabs + Walk)|      |  Pareto Search Kernel |      Route Set (<40ms)
+-----------------------+      +-----------------------+
    `,
    overview: "Engineered for complex mountainous corridors in Jammu & Kashmir. Dispatches custom multi-objective graph searches combining local transit schedules, cab hauls, and walking legs with elevation and weather penalty weights.",
    metrics: [
      { key: "Search Latency", value: "< 40ms (Pareto Frontier)" },
      { key: "Algorithmic Engine", value: "Multi-Objective A* Graph Search" },
      { key: "Spatial Tile Hit Ratio", value: "94.2% Cached in Memory" },
      { key: "Microservice Framework", value: "FastAPI + NetworkX (Async IO)" }
    ]
  },
  telemetry: {
    title: "Live Route Intelligence & Telemetry Pipeline",
    subtitle: "High-Throughput Spatial Ingestion & Predictive Dispatch",
    diagram: `
+-----------------------+      +-----------------------+      +-----------------------+
|  Hardware Bus GPS     | ---> |  Redis Streams Hub    | ---> |  Kalman Smoothing     |
|  (MQTT / UDP Delta)   |      |  (Pub/Sub Ingress)    |      |  Spatial Noise Filter |
+-----------------------+      +-----------------------+      +-----------------------+
                                                                          |
                                                                          v
                                                             +-------------------------+
                                                             |  WebSocket Cluster Hub  |
                                                             |  (<25ms to Commuter App)|
                                                             +-------------------------+
    `,
    overview: "Real-time streaming cluster that ingests high-frequency transit telemetry across mountain valleys. Smooths out GPS multipath errors using recursive Kalman filtering and broadcasts sub-second arrival updates.",
    metrics: [
      { key: "Simultaneous Concurrency", value: "10,000+ Commuter Connections" },
      { key: "Broadcast Latency", value: "Sub-25ms Delta Dispatch" },
      { key: "Spatial Store", value: "PostGIS + Redis Spatial Indexes" },
      { key: "Fault Tolerance", value: "Automatic WebSocket Failover Cluster" }
    ]
  },
  pass: {
    title: "Smart Booking & Offline Cryptographic Pass",
    subtitle: "HMAC SHA-256 Offline Asymmetric Validation",
    diagram: `
+-----------------------+      +-----------------------+      +-----------------------+
|  Commuter Booking     | ---> |  HMAC-SHA256 Signer   | ---> |  Scannable Dynamic    |
|  (PostgreSQL Lock)    |      |  (Transit Root Key)   |      |  Offline QR Ticket    |
+-----------------------+      +-----------------------+      +-----------------------+
                                                                          |
                                                                          v
                                                             +-------------------------+
                                                             |  Conductor Offline POS  |
                                                             |  (< 1ms Key Ring Check) |
                                                             +-------------------------+
    `,
    overview: "Cryptographically secured ticket engine allowing offline ticket verification on remote transit routes with zero cellular connectivity. Prevents ticket reuse, tampering, and seat contention through atomic DB transactions.",
    metrics: [
      { key: "Offline Validation Speed", value: "< 1ms Verification on Handheld" },
      { key: "Network Prerequisite", value: "0% Internet Access Required" },
      { key: "Crypto Standard", value: "HMAC SHA-256 with Rolling Timestamp Nonce" },
      { key: "Concurrency Defense", value: "PostgreSQL Row-Level Locks (SKIP LOCKED)" }
    ]
  },
  navigation: {
    title: "Resilient Mountain Navigation & Vector Cache",
    subtitle: "Edge GIS Tiling & Low-Bandwidth USSD Fallback",
    diagram: `
+-----------------------+      +-----------------------+      +-----------------------+
|  Hierarchical Vector  | ---> |  Compressed SQLite    | ---> |  Client Mapbox GL     |
|  Tile Extraction      |      |  Local Cache (<18MB)  |      |  Offline Vector Map   |
+-----------------------+      +-----------------------+      +-----------------------+
                                           |
                                           v
                               +-----------------------+
                               |  USSD/SMS Gateways    | ---> Fallback Timetable Lookup
                               |  (2G / Zero-Data)     |      Without Smartphones
                               +-----------------------+
    `,
    overview: "Lightweight offline map vector tile renderer and route graph search built for remote Himalayan highways. Bundles cached vector tiles into under 18MB and features an automated SMS/USSD fallback pipeline for commuters without mobile data.",
    metrics: [
      { key: "Local Cache Size", value: "< 18MB Complete Route Footprint" },
      { key: "Offline Map Render", value: "12ms Canvas Vector Refresh" },
      { key: "Fallback Redundancy", value: "USSD / Shortcode SMS Query Hub" },
      { key: "Map Engine", value: "Mapbox GL + Local Hive SQLite" }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initProjectFiltering();
  initTechnicalDrawer();
  initPortfolioQRModal();
  initContactForm();
});

/* ==========================================================================
   1. Category Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");

      projectCards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   2. Technical Architecture Drawer
   ========================================================================== */
function initTechnicalDrawer() {
  const drawer = document.getElementById("technicalDrawer");
  const closeDrawer = document.getElementById("closeDrawer");
  const drawerContent = document.getElementById("drawerContent");
  const backdrop = document.getElementById("drawerBackdrop");

  document.querySelectorAll(".inspect-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const data = drawerData[id];
      if (!data) return;

      drawerContent.innerHTML = `
        <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.3rem;">${data.title}</h2>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); margin-bottom: 1.2rem;">${data.subtitle}</div>
        
        <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.4rem;">${data.overview}</p>
        
        <div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">PIPELINE SCHEMATIC</div>
        <pre style="background: var(--bg-base); padding: 1.2rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-primary); border: 1px solid var(--border-subtle); overflow-x: auto; line-height: 1.4; margin-bottom: 1.5rem;">${data.diagram}</pre>
        
        <div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem;">CORE PERFORMANCE BENCHMARKS</div>
        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.8rem;">
          ${data.metrics.map(m => `
            <li style="background: var(--bg-elevated); border: 1px solid var(--border-subtle); padding: 0.6rem 0.9rem; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
              <span style="color: var(--text-secondary); font-family: var(--font-mono);">${m.key}</span>
              <strong style="color: var(--accent-emerald); font-family: var(--font-mono);">${m.value}</strong>
            </li>
          `).join("")}
        </ul>

        <div style="padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
          <a href="https://github.com/Farhaan327426" target="_blank" rel="noopener" class="btn-primary" style="width: 100%; justify-content: center;">
            Inspect GitHub Repository ↗
          </a>
        </div>
      `;

      drawer.classList.add("open");
      if (backdrop) backdrop.classList.add("active");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function dismissDrawer() {
    drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (closeDrawer) closeDrawer.addEventListener("click", dismissDrawer);
  if (backdrop) backdrop.addEventListener("click", dismissDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      dismissDrawer();
    }
  });
}

/* ==========================================================================
   3. Portfolio Digital QR Suite Modal
   ========================================================================== */
function initPortfolioQRModal() {
  if (typeof QRCodeEngine === "undefined") return;

  const scanPassBtn = document.getElementById("scanPassBtn");
  const openContactQrBtn = document.getElementById("openContactQrBtn");
  const modal = document.getElementById("portfolioQrModal");
  const modalClose = document.getElementById("portfolioQrClose");
  const qrContainer = document.getElementById("portfolioQrContainer");
  const qrTabs = document.querySelectorAll(".p-qr-tab");
  const qrTitle = document.getElementById("pQrTitle");
  const qrDesc = document.getElementById("pQrDesc");
  const btnCopy = document.getElementById("btnCopyPortfolioLink");
  const btnDownload = document.getElementById("btnDownloadPortfolioPass");

  if (!modal || !qrContainer) return;

  const portfolioUrl = window.location.origin && window.location.origin !== "null"
    ? window.location.href.split("#")[0]
    : "https://farhaan327426.github.io/farhaan-portfolio/";

  const vCardPayload = QRCodeEngine.createVCard({
    firstName: "Farhaan",
    lastName: "Bashir",
    org: "SAFARapp Mobility & Transit Systems",
    title: "Founder & Lead Engineer",
    phone: "+916006048125",
    email: "farhanbashir327426@gmail.com",
    url: portfolioUrl,
    note: "Engineering intelligent transit AI, routing heuristics, and real-time spatial streaming."
  });

  const qrModes = {
    mobile: {
      title: "Scan to Open Portfolio on Mobile",
      desc: "Point your smartphone camera at the QR code to seamlessly browse Farhaan Bashir’s portfolio on your phone.",
      payload: portfolioUrl,
      filename: "farhaan-bashir-portfolio.png",
      copyText: portfolioUrl,
      copyLabel: "Copy Portfolio Link 🔗"
    },
    vcard: {
      title: "Save Farhaan Bashir’s Digital Pass",
      desc: "Point your camera to instantly add Farhaan Bashir (Founder & Lead Engineer, SAFARapp) to your phone contacts.",
      payload: vCardPayload,
      filename: "farhaan-bashir-vcard.png",
      copyText: vCardPayload,
      copyLabel: "Copy vCard 📋"
    },
    whatsapp: {
      title: "Chat with Farhaan on WhatsApp",
      desc: "Scan to immediately launch a direct WhatsApp conversation with Farhaan (+91 6006048125).",
      payload: "https://wa.me/916006048125?text=Hi%20Farhaan,%20I%20am%20reviewing%20your%20portfolio!",
      filename: "farhaan-bashir-whatsapp.png",
      copyText: "https://wa.me/916006048125",
      copyLabel: "Copy WhatsApp Link 💬"
    },
    github: {
      title: "Farhaan’s GitHub Profile",
      desc: "Scan to explore Farhaan’s repositories, architecture proofs-of-concept, and production code.",
      payload: "https://github.com/Farhaan327426",
      filename: "farhaan-bashir-github.png",
      copyText: "https://github.com/Farhaan327426",
      copyLabel: "Copy GitHub Link 🐙"
    }
  };

  let activeMode = "mobile";

  function renderQR() {
    const item = qrModes[activeMode];
    const svg = QRCodeEngine.generateSVG(item.payload, {
      size: 200,
      colorDark: "#10B981",
      colorLight: "#080C14",
      rounded: true,
      cornerGlow: true
    });

    qrContainer.innerHTML = svg;
    if (qrTitle) qrTitle.textContent = item.title;
    if (qrDesc) qrDesc.textContent = item.desc;
    if (btnCopy) btnCopy.textContent = item.copyLabel;
  }

  qrTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      qrTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeMode = tab.getAttribute("data-mode") || "mobile";
      renderQR();
    });
  });

  function openModal() {
    renderQR();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (scanPassBtn) scanPassBtn.addEventListener("click", openModal);
  if (openContactQrBtn) openContactQrBtn.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      const item = qrModes[activeMode];
      navigator.clipboard.writeText(item.copyText).then(() => {
        const prev = btnCopy.textContent;
        btnCopy.textContent = "Copied! ✓";
        setTimeout(() => { btnCopy.textContent = prev; }, 2000);
      });
    });
  }

  if (btnDownload) {
    btnDownload.addEventListener("click", () => {
      const item = qrModes[activeMode];
      const canvas = document.createElement("canvas");
      QRCodeEngine.renderToCanvas(canvas, item.payload, {
        size: 360,
        colorDark: "#080C14",
        colorLight: "#FFFFFF",
        margin: 2
      });

      const link = document.createElement("a");
      link.download = item.filename;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }
}

/* ==========================================================================
   4. Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending...`;

    setTimeout(() => {
      alert(`Thank you, ${name}! Your inquiry has been dispatched to Farhaan Bashir (farhanbashir327426@gmail.com / +91 6006048125).\n\nWe will get back to you shortly at ${email}.`);
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 800);
  });
}
