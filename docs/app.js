/**
 * Farhaan Bashir Portfolio — Application Logic & Portfolio Digital QR Suite
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initScrollSpy();
    initCaseStudyModals();
    initContactForm();
    initPortfolioQRModal();
    initContactQRWidget();
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
            // Re-render QR with theme colors if modal or widget is active
            if (window.updateActiveQR) window.updateActiveQR();
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
   3. Case Study Detail Modal Data & Logic
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
        title: 'Smart Booking & Offline QR Ticketing',
        body: `
            <p><strong>Overview:</strong> Built for SAFARapp, this offline-first reservation engine prevents double-booking and enables instant conductor validation across Jammu & Kashmir transit corridors where cellular networks frequently drop.</p>
            
            <h4 style="font-weight:700; color:var(--text-primary); margin-top:1rem;">KEY ARCHITECTURE HIGHLIGHTS:</h4>
            <ul style="padding-left:1.2rem; display:flex; flex-direction:column; gap:0.4rem;">
                <li><strong>HMAC SHA-256 Offline Signed QR:</strong> Tickets encode passenger identifiers, route segment IDs, and an HMAC signature verifiable by conductors in under 1 millisecond with zero cellular connection.</li>
                <li><strong>Atomic DB Transactions:</strong> PostgreSQL row-level locks prevent seat race conditions during peak morning valley departures.</li>
                <li><strong>Anti-Replay Salt & Expiry Windows:</strong> Rolling timestamp nonces prevent ticket reuse and screenshot forwarding fraud.</li>
            </ul>

            <h4 style="font-weight:700; color:var(--text-primary); margin-top:1rem;">CRYPTOGRAPHIC VERIFICATION PIPELINE:</h4>
            <div class="modal-code-block">
[ Commuter Booking App ] ──► [ PostgreSQL Atomic Lock ]
                                        │
                                        ▼
[ HMAC SHA-256 Signer ] ────► [ Scannable Offline QR Pass ]
                                        │
                                        ▼
[ Conductor Offline Reader ] ─► [ Local Key Ring Check (<0.4ms) ] ──► [ Validated / Gate Open ]
            </div>

            <h4 style="font-weight:700; color:var(--text-primary); margin-top:1rem;">CANONICAL TICKET SCHEMA:</h4>
            <div class="modal-code-block">
{
  "ticket_id": "SAFAR-JK-90821",
  "passenger": "Farhaan Bashir",
  "route": "Srinagar TRC -> Baramulla Main",
  "issued_at": 1787384900,
  "signature": "cead2d56683cd1ecd515cf7a9ec18451d395a9fd2cd8375649e90e770802a47e"
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
   4. Portfolio Digital QR Suite (Modal & Sharing)
   ========================================================================== */
function initPortfolioQRModal() {
    if (typeof QRCodeEngine === 'undefined') return;

    const qrShareBtn = document.getElementById('qrShareBtn');
    const portfolioQrModal = document.getElementById('portfolioQrModal');
    const pModalClose = document.getElementById('portfolioQrClose');
    const pModalDismiss = document.getElementById('portfolioQrDismiss');
    const qrContainer = document.getElementById('portfolioQrContainer');
    const qrTabs = document.querySelectorAll('.p-qr-tab');
    const qrTitle = document.getElementById('pQrTitle');
    const qrDesc = document.getElementById('pQrDesc');
    const btnCopyLink = document.getElementById('btnCopyPortfolioLink');
    const btnDownloadPass = document.getElementById('btnDownloadPortfolioPass');

    if (!portfolioQrModal || !qrContainer) return;

    const portfolioUrl = window.location.origin && window.location.origin !== 'null'
        ? window.location.href.split('#')[0]
        : 'https://farhaan327426.github.io/farhaan-portfolio/';

    const vCardPayload = QRCodeEngine.createVCard({
        firstName: 'Farhaan',
        lastName: 'Bashir',
        org: 'SAFARapp Mobility & Transit Systems',
        title: 'Founder & Lead Engineer',
        phone: '+916006048125',
        email: 'farhanbashir327426@gmail.com',
        url: portfolioUrl,
        note: 'Engineering real-time transit telemetry, route optimization, & distributed systems.'
    });

    const qrModes = {
        'mobile': {
            title: 'Scan to Open Portfolio on Mobile',
            desc: 'Point your smartphone camera at the QR code to seamlessly browse Farhaan Bashir’s portfolio on your phone.',
            payload: portfolioUrl,
            filename: 'farhaan-bashir-portfolio-qr.png',
            copyText: portfolioUrl,
            copyLabel: 'Copy Portfolio Link 🔗'
        },
        'vcard': {
            title: 'Save Farhaan Bashir’s Digital Pass',
            desc: 'Point your camera to instantly add Farhaan Bashir (Founder & Lead Engineer, SAFARapp) to your phone contacts.',
            payload: vCardPayload,
            filename: 'farhaan-bashir-vcard-pass.png',
            copyText: vCardPayload,
            copyLabel: 'Copy vCard Data 📋'
        },
        'whatsapp': {
            title: 'Chat with Farhaan on WhatsApp',
            desc: 'Scan to immediately launch a direct WhatsApp conversation with Farhaan (+91 6006048125).',
            payload: 'https://wa.me/916006048125?text=Hi%20Farhaan,%20I%20am%20reviewing%20your%20portfolio!',
            filename: 'farhaan-bashir-whatsapp-qr.png',
            copyText: 'https://wa.me/916006048125',
            copyLabel: 'Copy WhatsApp Link 💬'
        },
        'github': {
            title: 'Farhaan’s GitHub Profile',
            desc: 'Scan to explore Farhaan’s repositories, architecture proofs-of-concept, and production code.',
            payload: 'https://github.com/Farhaan327426',
            filename: 'farhaan-bashir-github-qr.png',
            copyText: 'https://github.com/Farhaan327426',
            copyLabel: 'Copy GitHub Link 🐙'
        }
    };

    let activeMode = 'mobile';

    function renderModalQR() {
        const item = qrModes[activeMode];
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        const svg = QRCodeEngine.generateSVG(item.payload, {
            size: 210,
            colorDark: '#10B981',
            colorLight: isDark ? '#141416' : '#FAF8F3',
            rounded: true,
            cornerGlow: true
        });

        qrContainer.innerHTML = svg;
        if (qrTitle) qrTitle.textContent = item.title;
        if (qrDesc) qrDesc.textContent = item.desc;
        if (btnCopyLink) btnCopyLink.textContent = item.copyLabel;
    }

    window.updateActiveQR = renderModalQR;

    qrTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            qrTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeMode = tab.getAttribute('data-mode') || 'mobile';
            renderModalQR();
        });
    });

    function openModal() {
        renderModalQR();
        portfolioQrModal.classList.add('active');
        portfolioQrModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        portfolioQrModal.classList.remove('active');
        portfolioQrModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (qrShareBtn) qrShareBtn.addEventListener('click', openModal);
    if (pModalClose) pModalClose.addEventListener('click', closeModal);
    if (pModalDismiss) pModalDismiss.addEventListener('click', closeModal);

    portfolioQrModal.addEventListener('click', (e) => {
        if (e.target === portfolioQrModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && portfolioQrModal.classList.contains('active')) {
            closeModal();
        }
    });

    if (btnCopyLink) {
        btnCopyLink.addEventListener('click', () => {
            const item = qrModes[activeMode];
            navigator.clipboard.writeText(item.copyText).then(() => {
                const prev = btnCopyLink.textContent;
                btnCopyLink.textContent = 'Copied to Clipboard! ✓';
                setTimeout(() => { btnCopyLink.textContent = prev; }, 2000);
            });
        });
    }

    if (btnDownloadPass) {
        btnDownloadPass.addEventListener('click', () => {
            const item = qrModes[activeMode];
            const canvas = document.createElement('canvas');
            QRCodeEngine.renderToCanvas(canvas, item.payload, {
                size: 400,
                colorDark: '#0E1116',
                colorLight: '#FFFFFF',
                margin: 2
            });

            const link = document.createElement('a');
            link.download = item.filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }
}

/* ==========================================================================
   5. Contact Section Smart Digital QR Widget
   ========================================================================== */
function initContactQRWidget() {
    if (typeof QRCodeEngine === 'undefined') return;

    const qrContainer = document.getElementById('contactQrOutput');
    const qrTabs = document.querySelectorAll('.c-qr-tab');
    const qrHint = document.getElementById('contactQrHint');
    const btnDownload = document.getElementById('btnDownloadContactQr');
    const btnCopyVCard = document.getElementById('btnCopyVCard');

    if (!qrContainer) return;

    let currentMode = 'vcard';

    const portfolioUrl = window.location.origin && window.location.origin !== 'null'
        ? window.location.href.split('#')[0]
        : 'https://farhaan327426.github.io/farhaan-portfolio/';

    const vCardData = QRCodeEngine.createVCard({
        firstName: 'Farhaan',
        lastName: 'Bashir',
        org: 'SAFARapp Mobility & Transit Systems',
        title: 'Founder & Lead Engineer',
        phone: '+916006048125',
        email: 'farhanbashir327426@gmail.com',
        url: portfolioUrl,
        note: 'Engineering real-time transit telemetry, route optimization, & offline cryptography.'
    });

    const modes = {
        'vcard': {
            payload: vCardData,
            hint: 'Scan with smartphone camera to instantly save Farhaan Bashir into your contacts.',
            filename: 'farhaan-bashir-vcard.png'
        },
        'portfolio': {
            payload: portfolioUrl,
            hint: 'Scan to open this portfolio directly on your mobile device.',
            filename: 'farhaan-bashir-portfolio.png'
        },
        'whatsapp': {
            payload: 'https://wa.me/916006048125?text=Hi%20Farhaan,%20I%20saw%20your%20portfolio!',
            hint: 'Scan to start an instant WhatsApp conversation with Farhaan (+91 6006048125).',
            filename: 'farhaan-bashir-whatsapp.png'
        }
    };

    function renderWidgetQR() {
        const item = modes[currentMode];
        const svg = QRCodeEngine.generateSVG(item.payload, {
            size: 115,
            colorDark: '#10B981',
            colorLight: '#09090B',
            rounded: true,
            cornerGlow: true
        });

        qrContainer.innerHTML = svg;
        if (qrHint) qrHint.textContent = item.hint;
    }

    qrTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            qrTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentMode = tab.getAttribute('data-qrmode') || 'vcard';
            renderWidgetQR();
        });
    });

    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            const item = modes[currentMode];
            const canvas = document.createElement('canvas');
            QRCodeEngine.renderToCanvas(canvas, item.payload, {
                size: 320,
                colorDark: '#0D0F12',
                colorLight: '#FFFFFF',
                margin: 2
            });

            const link = document.createElement('a');
            link.download = item.filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    if (btnCopyVCard) {
        btnCopyVCard.addEventListener('click', () => {
            const item = modes[currentMode];
            navigator.clipboard.writeText(item.payload).then(() => {
                const prev = btnCopyVCard.innerHTML;
                btnCopyVCard.innerHTML = `Copied! ✓`;
                setTimeout(() => { btnCopyVCard.innerHTML = prev; }, 2000);
            });
        });
    }

    // Initial render
    renderWidgetQR();
}

/* ==========================================================================
   6. Contact Form Validation & Submission
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
