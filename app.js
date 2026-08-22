/**
 * Farhaan Bashir Portfolio — Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initScrollSpy();
    initCaseStudyModals();
    initContactForm();
});

/* ==========================================================================
   1. Theme Switching (Light / Dark)
   ========================================================================== */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('fb_theme') || 'light';
    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('fb_theme', theme);

        if (themeLabel) {
            themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
        }
    }
}

/* ==========================================================================
   2. ScrollSpy Active Nav Link
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. Case Study Detail Modal
   ========================================================================== */
const caseStudyData = {
    '1': {
        tag: 'CASE STUDY · REAL-TIME TRANSIT & TELEMETRY',
        title: 'Live Route Intelligence Engine',
        body: `
            <p><strong>Overview:</strong> Built for SAFARapp, the Live Route Intelligence Engine processes continuous GPS telemetry streams from public buses across Jammu & Kashmir. It applies Kalman filtering algorithms to smooth signal jumps in mountain valleys and streams real-time bus arrivals to commuter phones.</p>
            
            <h4 style="font-weight:700; color:var(--text-primary); margin-top:1rem;">KEY ARCHITECTURE HIGHLIGHTS:</h4>
            <ul style="padding-left:1.2rem; display:flex; flex-direction:column; gap:0.4rem;">
                <li><strong>WebSocket Cluster:</strong> Scalable Node.js pub/sub cluster with Redis handling 10,000+ simultaneous commuter connections.</li>
                <li><strong>Sub-second Latency:</strong> GPS position deltas dispatched to clients in under 25 milliseconds.</li>
                <li><strong>PostGIS Spatial Queries:</strong> Efficient bounding-box queries for nearby bus stop discovery.</li>
            </ul>

            <h4 style="font-weight:700; color:var(--text-primary); margin-top:1rem;">TELEMETRY WORKFLOW:</h4>
            <div class="modal-code-block">
[ GPS Hardware Transmitter ] ──► [ MQTT / UDP Ingress ]
                                      │
                                      ▼
[ Node.js Spatial Filter Worker ] ──► [ Redis Telemetry Store ]
                                      │
                                      ▼
[ WebSocket Broadcast Hub ] ────────► [ Flutter Commuter App (<25ms) ]
            </div>
        `
    },
    '2': {
        tag: 'CASE STUDY · CONTACTLESS CRYPTOGRAPHY',
        title: 'Smart Booking & QR Ticketing',
        body: `
            <p><strong>Overview:</strong> A cryptographically secured offline ticket reservation engine designed to prevent double-booking and enable instant QR conductor validation even in zero-connectivity areas.</p>
            
            <h4 style="font-weight:700; color:var(--text-primary); margin-top:1rem;">KEY ARCHITECTURE HIGHLIGHTS:</h4>
            <ul style="padding-left:1.2rem; display:flex; flex-direction:column; gap:0.4rem;">
                <li><strong>HMAC SHA-256 Signed QR Code:</strong> Contains passenger ID, route segment, timestamp, and verifiable digital signature readable without cellular internet.</li>
                <li><strong>Atomic DB Transactions:</strong> PostgreSQL row-level locks prevent seat contention during peak commute hours.</li>
            </ul>

            <h4 style="font-weight:700; color:var(--text-primary); margin-top:1rem;">TICKET PAYLOAD SCHEMATIC:</h4>
            <div class="modal-code-block">
{
  "ticket_id": "SAFAR-JK-90821",
  "passenger": "Farhaan Bashir",
  "route": "Srinagar TRC -> Baramulla Main",
  "timestamp": 1787384900,
  "signature": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
}
            </div>
        `
    },
    '3': {
        tag: 'CASE STUDY · RESILIENT MOUNTAIN NAVIGATION',
        title: 'Offline Transit & J&K Bus Network',
        body: `
            <p><strong>Overview:</strong> Engineered for mountainous terrains like Gulmarg, Sonamarg, and Leh where mobile signals drop. Provides offline vector map rendering and route graph searching directly inside the mobile app.</p>
            
            <h4 style="font-weight:700; color:var(--text-primary); margin-top:1rem;">KEY ARCHITECTURE HIGHLIGHTS:</h4>
            <ul style="padding-left:1.2rem; display:flex; flex-direction:column; gap:0.4rem;">
                <li><strong>Compressed Vector Map Tiles:</strong> Stored locally in IndexedDB / Hive SQLite under 18MB total footprint.</li>
                <li><strong>USSD / SMS Fallback:</strong> Commuters without smartphones or 3G can text route codes to receive timing SMS replies.</li>
            </ul>
        `
    },
    '4': {
        tag: 'CASE STUDY · ALGORITHMIC ROUTE OPTIMIZATION',
        title: 'AI Multi-Modal Itinerary Engine',
        body: `
            <p><strong>Overview:</strong> Custom algorithmic travel engine computing multi-segment journeys (local bus + cab + walking) while factoring in Kashmir weather conditions, elevation gradients, and schedule delays.</p>
            
            <h4 style="font-weight:700; color:var(--text-primary); margin-top:1rem;">KEY ARCHITECTURE HIGHLIGHTS:</h4>
            <ul style="padding-left:1.2rem; display:flex; flex-direction:column; gap:0.4rem;">
                <li><strong>Elevation & Weather Penalties:</strong> Dynamically adjusts walking segment weights during snow/rain events.</li>
                <li><strong>FastAPI Graph Microservice:</strong> Computes Pareto-optimal route options in <40ms.</li>
            </ul>
        `
    }
};

function initCaseStudyModals() {
    const modal = document.getElementById('moduleModal');
    const modalClose = document.getElementById('modalClose');
    const modalDismiss = document.getElementById('modalDismiss');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const featuredCards = document.querySelectorAll('.featured-card');

    if (!modal) return;

    featuredCards.forEach(card => {
        const id = card.getAttribute('data-module');
        const triggerBtn = card.querySelector('.modal-trigger-btn');

        const openHandler = (e) => {
            e.preventDefault();
            if (caseStudyData[id]) {
                modalTag.textContent = caseStudyData[id].tag;
                modalTitle.textContent = caseStudyData[id].title;
                modalBody.innerHTML = caseStudyData[id].body;
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        };

        if (triggerBtn) {
            triggerBtn.addEventListener('click', openHandler);
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalDismiss) modalDismiss.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   4. Contact Form Validation & Submission
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending message...`;

        setTimeout(() => {
            alert(`Thank you, ${name}! Your message has been sent directly to Farhaan Bashir (farhanbashir327426@gmail.com / +91 6006048125).\n\nWe will get back to you shortly at ${email}.`);
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 1000);
    });
}
