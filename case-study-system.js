/**
 * FULL-SCREEN CASE STUDY VISUAL EXPERIENCE
 * Telemetry Canvas with Kalman Filtering | Before/After Slider | Screenshot Gallery
 * Module-Specific Customization (telemetry, pass, navigation, itinerary)
 */

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
        { label: "Commuters Reached", value: 50000, unit: "" },
        { label: "Dispatch Latency", value: 25, unit: "ms" },
        { label: "Mountain Routes", value: 40, unit: "+" }
      ],
      metrics: [
        { label: "Concurrent Connections", value: 10000 },
        { label: "Aggregate GPS Updates/s", value: 50000 },
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
          description: "HMAC-SHA256 signed locally. No internet required. Conductor validates on handheld device."
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
        { label: "Offline Storage", value: "SQLite" }
      ],
      gallery: [
        {
          img: "assets/ui_offline_navigation.jpg",
          title: "Offline Vector Maps",
          description: "Full mountain network in 18MB cache. Turn-by-turn directions work without cellular."
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
        { label: "Route Options", value: 3, unit: "-5 per journey" }
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
        <!-- Header -->
        <header class="case-study-header">
          <button id="caseStudyBack" class="header-back" aria-label="Back to portfolio">
            ← Back to Portfolio
          </button>
          <h1 id="caseStudyTitle" class="header-title"></h1>
          <div class="header-module-switcher" id="moduleSwitcher"></div>
        </header>

        <!-- Hero Section -->
        <section class="case-study-hero">
          <img id="heroImg" src="" alt="Case study hero" class="hero-image">
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <div class="hero-tag" id="heroTag"></div>
            <h2 id="heroTitle" class="hero-title"></h2>
            <p id="heroSubtitle" class="hero-subtitle"></p>
            <div class="hero-stats" id="heroStats"></div>
          </div>
        </section>

        <!-- Before/After Slider -->
        <section class="before-after-section">
          <h2>The Friction Point</h2>
          <div class="slider-wrapper" id="sliderWrapper">
            <img id="beforeImg" src="" alt="Before state" class="slider-image before">
            <div class="slider-after-container" id="afterContainer">
              <img id="afterImg" src="" alt="After state" class="slider-image after">
            </div>
            <div class="slider-handle" id="sliderHandle" role="slider" aria-label="Before/After comparison" tabindex="0"></div>
            <span class="slider-label before">BEFORE</span>
            <span class="slider-label after">AFTER</span>
          </div>
        </section>

        <!-- Telemetry Canvas -->
        <section class="telemetry-section">
          <h2>Live System Performance</h2>
          <div class="canvas-wrapper">
            <canvas id="telemetryCanvas" width="1200" height="600"></canvas>
            <div class="canvas-controls">
              <button id="canvasPlayPause" class="control-btn" aria-label="Play/pause animation">▶ Play</button>
              <button id="canvasReset" class="control-btn" aria-label="Reset animation">⟲ Reset</button>
            </div>
          </div>
          <div class="metrics-grid" id="metricsGrid"></div>
        </section>

        <!-- Screenshot Gallery -->
        <section class="gallery-section">
          <h2>Product in Use</h2>
          <div class="gallery-carousel" id="galleryCarousel">
            <img id="galleryImage" src="" alt="Product screenshot" class="gallery-image">
            <div class="gallery-annotation">
              <h3 id="galleryTitle"></h3>
              <p id="galleryDescription"></p>
            </div>
          </div>
          <div class="gallery-controls">
            <button id="galleryPrev" class="gallery-btn" aria-label="Previous">←</button>
            <div id="galleryDots" class="gallery-dots"></div>
            <button id="galleryNext" class="gallery-btn" aria-label="Next">→</button>
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
        const moduleId = btn.getAttribute("data-module") || btn.getAttribute("data-case-study");
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
    if (!this.modules[moduleId]) moduleId = "telemetry";

    this.state.currentModule = moduleId;
    this.state.isOpen = true;
    this.state.currentGallerySlide = 0;

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
        (stat) =>
          `<div class="stat-block">
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
        (m) =>
          `<div class="metric-item">
        <div class="metric-label">${m.label}</div>
        <div class="metric-value">${m.isPercent ? m.value : m.value}</div>
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
      if (!isDragging && e.type !== "click" && e.type !== "keyboard") return;

      const rect = wrapper.getBoundingClientRect();
      const afterImg = document.getElementById("afterImg");
      if (afterImg) {
        afterImg.style.width = rect.width + "px";
      }

      let clientX = e.clientX;
      if (e.touches && e.touches.length) {
        clientX = e.touches[0].clientX;
      } else if (clientX === undefined) {
        clientX = rect.left + rect.width * 0.5;
      }

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
        updateSlider({ clientX: rect.left + rect.width * 0.4, type: "keyboard" });
      } else if (e.key === "ArrowRight") {
        updateSlider({ clientX: rect.left + rect.width * 0.6, type: "keyboard" });
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
    document.querySelectorAll(".gallery-dots .dot").forEach((dot, i) => {
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

      ctx.fillStyle = "rgba(10, 10, 10, 0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "rgba(100, 100, 100, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo((i / 10) * canvas.width, 0);
        ctx.lineTo((i / 10) * canvas.width, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, (i / 10) * canvas.height);
        ctx.lineTo(canvas.width, (i / 10) * canvas.height);
        ctx.stroke();
      }

      if (this.state.canvasAnimating) {
        time += 0.016;
      }

      buses.forEach((bus, idx) => {
        const progress = ((time * 0.15 + idx * 0.12) % 1);
        const wpIdx = Math.floor(progress * (config.routeWaypoints.length - 1));
        const localProgress = (progress * (config.routeWaypoints.length - 1)) % 1;

        const wp1 = config.routeWaypoints[wpIdx];
        const wp2 = config.routeWaypoints[Math.min(wpIdx + 1, config.routeWaypoints.length - 1)];

        const x = wp1.lat + (wp2.lat - wp1.lat) * localProgress;
        const y = wp1.lng + (wp2.lng - wp1.lng) * localProgress;

        // Add noise
        const noiseX = (Math.random() - 0.5) * 0.01;
        const noiseY = (Math.random() - 0.5) * 0.01;

        // Apply Kalman filter
        const filteredX = kalmanFilters[idx].filter(x + noiseX);
        const filteredY = kalmanFilters[idx].filter(y + noiseY);

        bus.x = ((filteredX - 34) / 0.35) * canvas.width;
        bus.y = ((filteredY - 74.6) / 1.0) * canvas.height;

        bus.trail.push({ x: bus.x, y: bus.y });
        if (bus.trail.length > 50) bus.trail.shift();

        // Draw trail
        ctx.strokeStyle = "rgba(0, 217, 255, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        bus.trail.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Draw bus marker
        ctx.fillStyle = "rgba(0, 217, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(bus.x, bus.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw direction / pulse indicator
        ctx.strokeStyle = "rgba(0, 217, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(bus.x, bus.y, 12, 0, Math.PI * 2);
        ctx.stroke();
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
      const duration = 800;
      const delay = idx * 100;
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
 * KALMAN FILTER IMPLEMENTATION
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

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  CaseStudySystem.init();
});
