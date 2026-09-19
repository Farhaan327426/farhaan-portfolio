/**
 * FARHAAN BASHIR — PORTFOLIO ENGINE
 * Centralized State Management | Micro-Interaction Choreography | Accessibility-First
 */

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
function startPortfolioEngine() {
  PortfolioState.init();
  initThemeEngine();
  initMobileNavigation();
  initContactForm();
  initScrollObserver();
  attachResizeObserver();
  attachSystemPreferenceListener();

  if (window.CaseStudySystem && typeof window.CaseStudySystem.init === "function") {
    window.CaseStudySystem.init();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startPortfolioEngine);
} else {
  startPortfolioEngine();
}

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
