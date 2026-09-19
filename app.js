/**
 * FARHAAN BASHIR — PORTFOLIO ENGINE (REFACTORED)
 * Centralized State Management | Micro-Interaction Choreography | Accessibility-First
 * Full-Screen Case Study Visual Experience with Telemetry Canvas & Before/After Slider
 */

/* ==========================================================================
   FULL-SCREEN CASE STUDY VISUAL EXPERIENCE SYSTEM
   ========================================================================== */
const CaseStudySystem = {
  state: {
    currentModule: null,
    isOpen: false,
    currentGallerySlide: 0,
    canvasAnimating: true,
  },

  modules: {
    telemetry: {
      tag: "SYS_01 // REAL-TIME TRANSIT & TELEMETRY",
      title: "Live Route Intelligence Engine",
      subtitle: "High-Throughput Spatial Ingestion & Predictive Dispatch",
      heroImg: "assets/safar_corridor_hero.jpg",
      beforeImg: "assets/dispatch_manual_before.jpg",
      afterImg: "assets/dispatch_live_after.jpg",
      stats: [
        { label: "Commuters Reached", value: 50000, unit: "+" },
        { label: "Dispatch Latency", value: 25, unit: "ms" },
        { label: "Mountain Routes", value: 40, unit: "+" }
      ],
      metrics: [
        { label: "Concurrent Connections", value: "10,000+" },
        { label: "Aggregate GPS Updates/s", value: "1,420/s" },
        { label: "Cache Hit Ratio", value: "94.2%", isPercent: true },
        { label: "Spatial Index", value: "PostGIS" }
      ],
      gallery: [
        {
          img: "assets/ui_live_tracking.jpg",
          title: "Live Tracking Dashboard",
          description: "Real-time GPS updates delivered sub-25ms. Commuters see next bus arrival, ETA confidence, and delay alerts."
        },
        {
          img: "assets/ui_offline_navigation.jpg",
          title: "Route Optimization Engine",
          description: "Multi-modal synthesis: fixed buses + shared cabs + walking. Pareto-optimal journeys computed in 40ms."
        }
      ],
      canvasConfig: {
        routeWaypoints: [
          { lat: 34.0837, lng: 74.7973, name: "Srinagar Terminal" },
          { lat: 34.2657, lng: 75.3346, name: "Gulmarg Junction" },
          { lat: 34.2601, lng: 75.2994, name: "Mountain Pass" },
          { lat: 34.2604, lng: 75.3300, name: "High Altitude Corridor" }
        ],
        busCount: 12,
        gpsSampleRate: 50
      }
    },

    pass: {
      tag: "SYS_02 // CONTACTLESS CRYPTOGRAPHY",
      title: "Smart Booking & Offline Cryptographic Pass",
      subtitle: "HMAC-SHA256 Offline Asymmetric Ticket Validation",
      heroImg: "assets/safar_corridor_hero.jpg",
      beforeImg: "assets/dispatch_manual_before.jpg",
      afterImg: "assets/dispatch_live_after.jpg",
      stats: [
        { label: "Offline Verification", value: 100, unit: "%" },
        { label: "POS Check Time", value: 1, unit: "ms" },
        { label: "Routes Protected", value: 40, unit: "+" }
      ],
      metrics: [
        { label: "Crypto Standard", value: "HMAC-SHA256" },
        { label: "Offline Mode", value: "100%" },
        { label: "DB Locking", value: "Row-Level" },
        { label: "Anti-Replay", value: "Nonce Salt" }
      ],
      gallery: [
        {
          img: "assets/ui_live_tracking.jpg",
          title: "Offline Ticket Generation",
          description: "HMAC-SHA256 signed locally. No internet required. Conductor validates on handheld POS device in under 1ms."
        }
      ],
      canvasConfig: {
        routeWaypoints: [
          { lat: 34.0837, lng: 74.7973, name: "Srinagar" },
          { lat: 34.2657, lng: 75.3346, name: "Gulmarg" }
        ],
        busCount: 8,
        gpsSampleRate: 30
      }
    },

    navigation: {
      tag: "SYS_03 // RESILIENT MOUNTAIN NAVIGATION",
      title: "Offline Transit & J&K Bus Network",
      subtitle: "Edge Vector Tiling & USSD/SMS Automated Gateway",
      heroImg: "assets/safar_corridor_hero.jpg",
      beforeImg: "assets/dispatch_manual_before.jpg",
      afterImg: "assets/dispatch_live_after.jpg",
      stats: [
        { label: "Stops Mapped", value: 40, unit: "+" },
        { label: "Cache Footprint", value: 18, unit: "MB" },
        { label: "Coverage Area", value: 3500, unit: "km²" }
      ],
      metrics: [
        { label: "Vector Tiles", value: "Compressed" },
        { label: "Fallback Channel", value: "2G USSD/SMS" },
        { label: "Map Rendering", value: "12ms" },
        { label: "Offline Storage", value: "Hive SQLite" }
      ],
      gallery: [
        {
          img: "assets/ui_offline_navigation.jpg",
          title: "Offline Vector Maps",
          description: "Full mountain network in 18MB cache. Turn-by-turn directions work without cellular connection."
        }
      ],
      canvasConfig: {
        routeWaypoints: [
          { lat: 34.0837, lng: 74.7973, name: "Srinagar" },
          { lat: 34.2657, lng: 75.3346, name: "Gulmarg" },
          { lat: 34.1500, lng: 75.5000, name: "Sonamarg" }
        ],
        busCount: 10,
        gpsSampleRate: 20
      }
    },

    itinerary: {
      tag: "SYS_04 // ALGORITHMIC ROUTE OPTIMIZATION",
      title: "AI Multi-Modal Itinerary Engine",
      subtitle: "Multi-Objective Heuristic A* Pareto Search Kernel",
      heroImg: "assets/safar_corridor_hero.jpg",
      beforeImg: "assets/dispatch_manual_before.jpg",
      afterImg: "assets/dispatch_live_after.jpg",
      stats: [
        { label: "Search Latency", value: 40, unit: "ms" },
        { label: "Cache Hit Ratio", value: 94.2, unit: "%" },
        { label: "Route Options", value: 5, unit: " Pareto Paths" }
      ],
      metrics: [
        { label: "Search Kernel", value: "A* Pareto" },
        { label: "Framework", value: "FastAPI" },
        { label: "Weather Integration", value: "Real-Time" },
        { label: "Multi-Modal", value: "Bus+Cab+Walk" }
      ],
      gallery: [
        {
          img: "assets/ui_live_tracking.jpg",
          title: "Pareto Journey Synthesis",
          description: "Multiple optimal routes ranked by time/cost/comfort. Dynamic weather penalties adjust elevation penalties."
        }
      ],
      canvasConfig: {
        routeWaypoints: [
          { lat: 34.0837, lng: 74.7973, name: "Start" },
          { lat: 34.1500, lng: 75.1000, name: "Transfer Hub" },
          { lat: 34.2657, lng: 75.3346, name: "Destination" }
        ],
        busCount: 6,
        gpsSampleRate: 40
      }
    }
  },

  init() {
    this.injectHTML();
    this.attachEventListeners();
    this.attachKeyboardShortcuts();
  },

  injectHTML() {
    if (document.getElementById("caseStudyExperience")) return;

    const template = `
      <div id="caseStudyExperience" class="case-study-experience" aria-hidden="true" role="dialog">
        <!-- Sticky Header Bar -->
        <header class="case-study-header">
          <button id="caseStudyBack" class="header-back" aria-label="Back to portfolio">
            ← Back to Systems
          </button>
          <div id="caseStudyTitle" class="header-title"></div>
          <div class="header-module-switcher" id="moduleSwitcher"></div>
        </header>

        <!-- Hero Section with Dynamic HUD -->
        <section class="case-study-hero">
          <img id="heroImg" src="" alt="Case study hero banner" class="hero-image">
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <div class="hero-tag" id="heroTag"></div>
            <h2 id="heroTitle" class="hero-title"></h2>
            <p id="heroSubtitle" class="hero-subtitle"></p>
            <div class="hero-stats" id="heroStats"></div>
          </div>
        </section>

        <!-- Interactive Before/After Split Comparison Slider -->
        <section class="before-after-section">
          <div class="case-section-heading">
            <span class="case-section-tag">ARCHITECTURAL TRANSFORMATION</span>
            <h2 class="case-section-title">The Operational Shift</h2>
            <p class="case-section-desc">Drag the split divider to compare traditional manual dispatch against SAFAR's real-time coordinated telemetry.</p>
          </div>

          <div class="slider-wrapper" id="sliderWrapper">
            <img id="beforeImg" src="" alt="Before state: Manual dispatch" class="slider-image before">
            <div class="slider-after-container" id="afterContainer">
              <img id="afterImg" src="" alt="After state: Coordinated live tracking" class="slider-image after">
            </div>
            <div class="slider-handle" id="sliderHandle" role="slider" aria-label="Before/After comparison slider" tabindex="0">
              <span class="handle-icon">⇹</span>
            </div>
            <span class="slider-label before">BEFORE // MANUAL UNCERTAINTY</span>
            <span class="slider-label after">AFTER // LIVE STREAM TELEMETRY</span>
          </div>
        </section>

        <!-- Real-Time Telemetry Canvas with Kalman Filter Smoothing -->
        <section class="telemetry-section">
          <div class="case-section-heading">
            <span class="case-section-tag">LIVE KERNEL SIMULATION</span>
            <h2 class="case-section-title">Telemetry &amp; Kalman Filtering Radar</h2>
            <p class="case-section-desc">Simulated GPS packets traversing mountain corridors. Raw signal noise is smoothed via recursive Kalman algorithms.</p>
          </div>

          <div class="canvas-wrapper">
            <canvas id="telemetryCanvas" width="1200" height="500"></canvas>
            <div class="canvas-controls">
              <button id="canvasPlayPause" class="control-btn" aria-label="Play or pause animation">⏸ Pause</button>
              <button id="canvasReset" class="control-btn" aria-label="Reset telemetry simulation">⟲ Reset</button>
            </div>
            <div class="canvas-hud">
              <span>CORRIDOR: KASHMIR VALLEY 34°N 75°E</span>
              <span id="canvasPacketRate">INGRESS: 1,420 PKTS/S</span>
            </div>
          </div>

          <div class="metrics-grid" id="metricsGrid"></div>
        </section>

        <!-- Product in Use Screenshot Gallery -->
        <section class="gallery-section">
          <div class="case-section-heading">
            <span class="case-section-tag">SYSTEMS IN PRODUCTION</span>
            <h2 class="case-section-title">Product Interfaces in the Field</h2>
          </div>

          <div class="gallery-carousel" id="galleryCarousel">
            <div class="gallery-img-container">
              <img id="galleryImage" src="" alt="Product interface screenshot" class="gallery-image">
            </div>
            <div class="gallery-annotation">
              <h3 id="galleryTitle"></h3>
              <p id="galleryDescription"></p>
            </div>
          </div>

          <div class="gallery-controls">
            <button id="galleryPrev" class="gallery-btn" aria-label="Previous screenshot">← Prev</button>
            <div id="galleryDots" class="gallery-dots"></div>
            <button id="galleryNext" class="gallery-btn" aria-label="Next screenshot">Next →</button>
          </div>
        </section>
      </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", template);
  },

  attachEventListeners() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".modal-trigger-btn, [data-case-study]");
      if (btn) {
        e.preventDefault();
        const moduleId = btn.getAttribute("data-module") || btn.getAttribute("data-case-study") || "telemetry";
        this.open(moduleId);
      }
    });

    const backBtn = document.getElementById("caseStudyBack");
    if (backBtn) {
      backBtn.addEventListener("click", () => this.close());
    }

    this.initSlider();
    this.initGalleryControls();
    this.initCanvasControls();
  },

  attachKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (!this.state.isOpen) return;

      if (e.key === "Escape") this.close();
      if (e.key === "1") this.switchModule("telemetry");
      if (e.key === "2") this.switchModule("pass");
      if (e.key === "3") this.switchModule("navigation");
      if (e.key === "4") this.switchModule("itinerary");
      if (e.key === "ArrowLeft") this.prevGallerySlide();
      if (e.key === "ArrowRight") this.nextGallerySlide();
    });
  },

  open(moduleId) {
    if (!this.modules[moduleId]) {
      moduleId = "telemetry";
    }

    this.state.currentModule = moduleId;
    this.state.isOpen = true;
    this.state.currentGallerySlide = 0;
    this.state.canvasAnimating = true;

    const experience = document.getElementById("caseStudyExperience");
    if (experience) {
      experience.classList.add("active");
      experience.setAttribute("aria-hidden", "false");
    }
    document.body.style.overflow = "hidden";

    this.loadModuleContent(moduleId);
    this.renderModuleSwitcher();
    this.initTelemetryCanvas();
  },

  close() {
    this.state.isOpen = false;
    this.state.canvasAnimating = false;

    const experience = document.getElementById("caseStudyExperience");
    if (experience) {
      experience.classList.remove("active");
      experience.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
  },

  loadModuleContent(moduleId) {
    const module = this.modules[moduleId];
    if (!module) return;

    document.getElementById("caseStudyTitle").textContent = module.title;
    document.getElementById("heroTag").textContent = module.tag;
    document.getElementById("heroTitle").textContent = module.title;
    document.getElementById("heroSubtitle").textContent = module.subtitle;
    document.getElementById("heroImg").src = module.heroImg;
    document.getElementById("beforeImg").src = module.beforeImg;
    document.getElementById("afterImg").src = module.afterImg;

    this.renderHeroStats(module.stats);
    this.renderMetrics(module.metrics);
    this.renderGallery(module.gallery);

    const afterContainer = document.getElementById("afterContainer");
    const sliderHandle = document.getElementById("sliderHandle");
    const wrapper = document.getElementById("sliderWrapper");
    const afterImg = document.getElementById("afterImg");
    if (afterContainer && sliderHandle) {
      afterContainer.style.width = "50%";
      sliderHandle.style.left = "50%";
      if (wrapper && afterImg) {
        setTimeout(() => {
          afterImg.style.width = wrapper.offsetWidth + "px";
        }, 50);
      }
    }
  },

  renderHeroStats(stats) {
    const statsHtml = stats
      .map(
        (stat) => `
        <div class="stat-block">
          <div class="stat-value" data-target="${stat.value}">${stat.value}</div>
          <div class="stat-label">${stat.label}</div>
          <div class="stat-unit">${stat.unit}</div>
        </div>`
      )
      .join("");
    document.getElementById("heroStats").innerHTML = statsHtml;
    this.animateStatCounters();
  },

  renderMetrics(metrics) {
    const metricsHtml = metrics
      .map(
        (m) => `
        <div class="metric-item">
          <div class="metric-label">${m.label}</div>
          <div class="metric-value">${m.value}</div>
        </div>`
      )
      .join("");
    document.getElementById("metricsGrid").innerHTML = metricsHtml;
  },

  renderGallery(gallery) {
    if (gallery.length > 0) {
      document.getElementById("galleryImage").src = gallery[0].img;
      document.getElementById("galleryTitle").textContent = gallery[0].title;
      document.getElementById("galleryDescription").textContent = gallery[0].description;
    }

    const dotsHtml = gallery.map((_, i) => `<div class="dot ${i === 0 ? "active" : ""}" data-idx="${i}"></div>`).join("");
    document.getElementById("galleryDots").innerHTML = dotsHtml;
  },

  renderModuleSwitcher() {
    const switcher = document.getElementById("moduleSwitcher");
    const modules = ["telemetry", "pass", "navigation", "itinerary"];
    const labels = ["Telemetry", "Ticketing", "Maps", "Routing"];

    const html = modules
      .map(
        (m, i) =>
          `<button class="module-pill ${m === this.state.currentModule ? "active" : ""}" data-module="${m}">${labels[i]}</button>`
      )
      .join("");

    switcher.innerHTML = html;
    switcher.onclick = (e) => {
      const btn = e.target.closest(".module-pill");
      if (btn) this.switchModule(btn.getAttribute("data-module"));
    };
  },

  switchModule(moduleId) {
    this.state.currentGallerySlide = 0;
    this.state.currentModule = moduleId;
    this.loadModuleContent(moduleId);
    this.renderModuleSwitcher();
    this.initTelemetryCanvas();
  },

  initSlider() {
    const wrapper = document.getElementById("sliderWrapper");
    const handle = document.getElementById("sliderHandle");
    const afterContainer = document.getElementById("afterContainer");

    if (!wrapper || !handle || !afterContainer) return;

    let isDragging = false;

    function updateSlider(e) {
      if (!isDragging && e.type !== "click") return;

      const rect = wrapper.getBoundingClientRect();
      const afterImg = document.getElementById("afterImg");
      if (afterImg) {
        afterImg.style.width = rect.width + "px";
      }
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));

      const percent = (x / rect.width) * 100;
      afterContainer.style.width = percent + "%";
      handle.style.left = percent + "%";
    }

    handle.addEventListener("mousedown", () => (isDragging = true));
    handle.addEventListener("touchstart", () => (isDragging = true), { passive: true });
    document.addEventListener("mouseup", () => (isDragging = false));
    document.addEventListener("touchend", () => (isDragging = false));
    document.addEventListener("mousemove", updateSlider);
    document.addEventListener("touchmove", updateSlider, { passive: true });
    wrapper.addEventListener("click", (e) => {
      isDragging = true;
      updateSlider(e);
      isDragging = false;
    });

    handle.addEventListener("keydown", (e) => {
      const rect = wrapper.getBoundingClientRect();
      if (e.key === "ArrowLeft") {
        updateSlider({ clientX: rect.left + rect.width * 0.35, type: "click" });
      } else if (e.key === "ArrowRight") {
        updateSlider({ clientX: rect.left + rect.width * 0.65, type: "click" });
      }
    });
  },

  initGalleryControls() {
    const prev = document.getElementById("galleryPrev");
    const next = document.getElementById("galleryNext");
    const dots = document.getElementById("galleryDots");

    if (prev) prev.addEventListener("click", () => this.prevGallerySlide());
    if (next) next.addEventListener("click", () => this.nextGallerySlide());

    if (dots) {
      dots.addEventListener("click", (e) => {
        const dot = e.target.closest(".dot");
        if (dot) {
          this.state.currentGallerySlide = parseInt(dot.getAttribute("data-idx"));
          this.updateGallerySlide();
        }
      });
    }
  },

  prevGallerySlide() {
    const gallery = this.modules[this.state.currentModule].gallery;
    this.state.currentGallerySlide = (this.state.currentGallerySlide - 1 + gallery.length) % gallery.length;
    this.updateGallerySlide();
  },

  nextGallerySlide() {
    const gallery = this.modules[this.state.currentModule].gallery;
    this.state.currentGallerySlide = (this.state.currentGallerySlide + 1) % gallery.length;
    this.updateGallerySlide();
  },

  updateGallerySlide() {
    const gallery = this.modules[this.state.currentModule].gallery;
    const slide = gallery[this.state.currentGallerySlide];
    if (!slide) return;

    document.getElementById("galleryImage").src = slide.img;
    document.getElementById("galleryTitle").textContent = slide.title;
    document.getElementById("galleryDescription").textContent = slide.description;

    this.updateGalleryDots();
  },

  updateGalleryDots() {
    document.querySelectorAll("#galleryDots .dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === this.state.currentGallerySlide);
    });
  },

  initCanvasControls() {
    const playPause = document.getElementById("canvasPlayPause");
    const reset = document.getElementById("canvasReset");

    if (playPause) {
      playPause.addEventListener("click", () => {
        this.state.canvasAnimating = !this.state.canvasAnimating;
        playPause.textContent = this.state.canvasAnimating ? "⏸ Pause" : "▶ Play";
      });
    }

    if (reset) {
      reset.addEventListener("click", () => {
        this.initTelemetryCanvas();
      });
    }
  },

  initTelemetryCanvas() {
    const canvas = document.getElementById("telemetryCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const config = this.modules[this.state.currentModule].canvasConfig;

    let time = 0;
    const buses = this.generateBuses(config);
    const kalmanFilters = buses.map(() => new KalmanFilter(0.1, 4));

    const animate = () => {
      if (!this.state.isOpen) return;

      // Dark radar background
      ctx.fillStyle = "rgba(9, 13, 20, 0.96)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw radar grid
      ctx.strokeStyle = "rgba(6, 182, 212, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 12; i++) {
        ctx.beginPath();
        ctx.moveTo((i / 12) * canvas.width, 0);
        ctx.lineTo((i / 12) * canvas.width, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j <= 6; j++) {
        ctx.beginPath();
        ctx.moveTo(0, (j / 6) * canvas.height);
        ctx.lineTo(canvas.width, (j / 6) * canvas.height);
        ctx.stroke();
      }

      // Draw waypoint connector corridors
      ctx.strokeStyle = "rgba(6, 182, 212, 0.35)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      config.routeWaypoints.forEach((wp, idx) => {
        const px = ((wp.lat - 34) / 0.35) * canvas.width;
        const py = ((wp.lng - 74.6) / 1.0) * canvas.height;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw waypoints
      config.routeWaypoints.forEach((wp) => {
        const px = ((wp.lat - 34) / 0.35) * canvas.width;
        const py = ((wp.lng - 74.6) / 1.0) * canvas.height;
        ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
        ctx.font = "10px monospace";
        ctx.fillText(wp.name, px + 8, py + 3);
      });

      if (this.state.canvasAnimating) {
        time += 0.016;
      }

      buses.forEach((bus, idx) => {
        const progress = ((time * 0.2 + idx * 0.15) % 1);
        const totalSegments = config.routeWaypoints.length - 1;
        const segIdx = Math.min(Math.floor(progress * totalSegments), totalSegments - 1);
        const localT = (progress * totalSegments) - segIdx;

        const wp1 = config.routeWaypoints[segIdx];
        const wp2 = config.routeWaypoints[Math.min(segIdx + 1, totalSegments)];

        const targetX = wp1.lat + (wp2.lat - wp1.lat) * localT;
        const targetY = wp1.lng + (wp2.lng - wp1.lng) * localT;

        // Add mountain multipath GPS noise
        const noiseX = (Math.sin(time * 5 + idx) * 0.006) + (Math.random() - 0.5) * 0.004;
        const noiseY = (Math.cos(time * 5 + idx) * 0.006) + (Math.random() - 0.5) * 0.004;

        // Apply Kalman filter
        const filteredX = kalmanFilters[idx].filter(targetX + noiseX);
        const filteredY = kalmanFilters[idx].filter(targetY + noiseY);

        bus.x = ((filteredX - 34) / 0.35) * canvas.width;
        bus.y = ((filteredY - 74.6) / 1.0) * canvas.height;

        bus.trail.push({ x: bus.x, y: bus.y });
        if (bus.trail.length > 35) bus.trail.shift();

        // Draw Kalman trajectory trail
        ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        bus.trail.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Draw active bus icon
        ctx.fillStyle = "rgba(6, 182, 212, 1)";
        ctx.beginPath();
        ctx.arc(bus.x, bus.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Radar pulse ring
        const pulseR = 8 + (Math.sin(time * 4 + idx) * 4);
        ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bus.x, bus.y, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        // Bus ID label
        ctx.fillStyle = "rgba(240, 246, 252, 0.8)";
        ctx.font = "9px monospace";
        ctx.fillText(`BUS_${idx + 1}`, bus.x + 8, bus.y - 6);
      });

      if (this.state.canvasAnimating) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  },

  generateBuses(config) {
    return Array.from({ length: config.busCount }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      trail: []
    }));
  },

  animateStatCounters() {
    const counters = document.querySelectorAll("#heroStats [data-target]");
    counters.forEach((el, idx) => {
      const target = parseFloat(el.getAttribute("data-target"));
      if (isNaN(target)) return;

      let current = 0;
      const duration = 700;
      const delay = idx * 80;
      const startTime = performance.now() + delay;

      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const animate = (currentTime) => {
        const elapsed = Math.max(0, currentTime - startTime);
        const progress = Math.min(elapsed / duration, 1);
        current = target * easeOutQuart(progress);

        el.textContent = Number.isInteger(target) ? Math.round(current).toLocaleString() : current.toFixed(1);

        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });
  }
};

/**
 * RECURSIVE KALMAN FILTER IMPLEMENTATION
 * Smooths noisy GPS signals from mountain multipath reflections
 */
class KalmanFilter {
  constructor(processNoise, measurementNoise) {
    this.processNoise = processNoise || 0.1;
    this.measurementNoise = measurementNoise || 4;
    this.value = 0;
    this.error = 1;
    this.lastValue = 0;
  }

  filter(measurement) {
    this.error = this.error + this.processNoise;
    const kalmanGain = this.error / (this.error + this.measurementNoise);
    this.value = this.lastValue + kalmanGain * (measurement - this.lastValue);
    this.error = (1 - kalmanGain) * this.error;
    this.lastValue = this.value;
    return this.value;
  }
}

/* ==========================================================================
   CENTRALIZED PORTFOLIO STATE LAYER
   ========================================================================== */
const PortfolioState = {
  theme: null,
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
   PORTFOLIO INITIALIZATION SEQUENCE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  PortfolioState.init();
  initThemeEngine();
  initMobileNavigation();
  initContactForm();
  initScrollObserver();
  attachResizeObserver();
  attachSystemPreferenceListener();

  // Initialize Full-Screen Visual Case Study Suite
  CaseStudySystem.init();
});

/* ==========================================================================
   1. Theme Management Engine
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
   2. Mobile Navigation Drawer Controller
   ========================================================================== */
function initMobileNavigation() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const drawer = document.getElementById("mobileNavDrawer");

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener("click", () => {
    PortfolioState.setMobileDrawer(!PortfolioState.mobileDrawerOpen);
  });

  drawer.querySelectorAll(".mobile-nav-link").forEach((link) => {
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
   3. Contact Form Submission Lifecycle
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
    <p>Message recorded for <strong>${name}</strong>. Direct channels: <strong>farhanbashir327426@gmail.com</strong> | <strong>+91 6006048125</strong></p>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   4. Scroll-Driven Active Navigation Observer
   ========================================================================== */
function initScrollObserver() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          PortfolioState.activeSection = id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: [0.2, 0.5], rootMargin: "-100px 0px -50%" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   5. Viewport Resize Observer
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
