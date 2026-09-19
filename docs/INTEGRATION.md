# Case Study System Integration Guide

## Files Provided

1. **case-study-system.js** — Complete state management, module switching, canvas animation, Kalman filtering
2. **case-study-styles.css** — Full-screen overlay styling, responsive design, accessibility
3. **INTEGRATION.md** — This file

---

## Step 1: Add CSS to Portfolio

In your `index.html` `<head>`, add after existing stylesheets:

```html
<link rel="stylesheet" href="case-study-styles.css">
```

---

## Step 2: Add JavaScript to Portfolio

In your `index.html` `<body>` before closing tag, add:

```html
<script src="case-study-system.js"></script>
```

---

## Step 3: Update Existing Modal Triggers

Replace the `modal-trigger-btn` system with data attributes:

### Old (to remove):
```html
<button class="modal-trigger-btn" data-module="telemetry">
  Read Case Study →
</button>
```

### New (to use):
```html
<button class="modal-trigger-btn" data-module="telemetry" data-case-study="telemetry">
  Read Case Study →
</button>
```

**Alternative approach**: Keep existing buttons and they'll automatically work. The system listens for `.modal-trigger-btn` elements with `data-module` attributes.

---

## Step 4: Create Assets Directory

Create `/assets/` directory in your project root and add these images:

```
/assets/
├── safar_corridor_hero.jpg       (16:9, 1920x1080+)
├── dispatch_manual_before.jpg    (16:9, 1920x1080+)
├── dispatch_live_after.jpg       (16:9, 1920x1080+)
├── ui_live_tracking.jpg          (4:3, 1024x768+)
└── ui_offline_navigation.jpg     (4:3, 1024x768+)
```

All image paths in `case-study-system.js` reference `assets/`. Update if your directory is different.

---

## Step 5: Remove Old Modal Code (Optional)

If you're replacing the old text-based modal, remove or comment out:

```javascript
// OLD - REMOVE
function initCaseStudyModal() {
  // ... old modal code
}
```

The new system handles all modal interactions.

---

## Keyboard Shortcuts

Users can navigate the case study experience via keyboard:

| Key | Action |
|-----|--------|
| `Escape` | Close case study |
| `1` | Switch to Telemetry module |
| `2` | Switch to Ticketing module |
| `3` | Switch to Maps module |
| `4` | Switch to Routing module |
| `←` / `→` | Navigate gallery slides |
| `Tab` | Navigate interactive elements |

---

## Module Customization

Each module is self-contained in `CaseStudySystem.modules[moduleId]`:

```javascript
CaseStudySystem.modules.telemetry = {
  tag: "SYS_01 // REAL-TIME TRANSIT & TELEMETRY",
  title: "Live Route Intelligence Engine",
  subtitle: "High-Throughput Spatial Ingestion & Predictive Dispatch",
  heroImg: "assets/safar_corridor_hero.jpg",
  beforeImg: "assets/dispatch_manual_before.jpg",
  afterImg: "assets/dispatch_live_after.jpg",
  stats: [
    { label: "Commuters Reached", value: 50000, unit: "" },
    // ... more stats
  ],
  metrics: [
    { label: "Concurrent Connections", value: 10000 },
    // ... more metrics
  ],
  gallery: [
    {
      img: "assets/ui_live_tracking.jpg",
      title: "Live Tracking Dashboard",
      description: "Real-time GPS updates delivered..."
    }
  ],
  canvasConfig: {
    routeWaypoints: [ /* lat/lng points */ ],
    busCount: 12,
    gpsSampleRate: 50
  }
};
```

### Customizing a Module

To modify telemetry stats, edit the `stats` array:

```javascript
stats: [
  { label: "Your Label", value: 12345, unit: "unit" },
  { label: "Metric Name", value: 67.8, unit: "%" }
]
```

To customize route waypoints for telemetry canvas:

```javascript
canvasConfig: {
  routeWaypoints: [
    { lat: 34.0837, lng: 74.7973, name: "Start" },
    { lat: 34.2657, lng: 75.3346, name: "End" }
  ],
  busCount: 10,
  gpsSampleRate: 40
}
```

---

## Kalman Filter Configuration

The telemetry canvas uses Kalman filtering to smooth noisy GPS signals (simulating mountain multipath reflection).

Adjust filter sensitivity in `case-study-system.js`:

```javascript
const kalmanFilters = buses.map(() => 
  new KalmanFilter(0.1, 4)  // (processNoise, measurementNoise)
);
```

- **processNoise** (0.1): How much the bus position is expected to change. Lower = smoother.
- **measurementNoise** (4): How much noise in the raw GPS signal. Higher = more aggressive filtering.

Recommended ranges:
- Smooth tracking: `new KalmanFilter(0.05, 8)`
- Responsive tracking: `new KalmanFilter(0.2, 2)`

---

## Before/After Slider

The slider supports:
- **Mouse drag** — Drag the handle left/right
- **Touch drag** — Swipe on mobile
- **Click** — Click anywhere on the image to move the handle
- **Keyboard** — Arrow keys to adjust (when handle is focused)

Customize the initial split position by editing:

```javascript
// In case-study-system.js, loadModuleContent()
document.getElementById("afterContainer").style.width = "50%";  // Default 50/50
document.getElementById("sliderHandle").style.left = "50%";
```

Change `50%` to `30%`, `70%`, etc. for different starting positions.

---

## Canvas Telemetry Visualization

The canvas animates buses moving along mountain routes with:
- **GPS trail visualization** — Fading line showing recent positions
- **Kalman filtering** — Smoothed position vs. raw noisy signal
- **Grid background** — Reference grid for spatial understanding
- **Play/Pause controls** — Users can pause animation to inspect

The animation is continuous and loops through the route. Speed is controlled by:

```javascript
time += 0.016;  // In animate() function
```

Adjust this multiplier to speed up/slow down the animation (0.016 ≈ 60fps).

---

## Gallery Management

Add more screenshots to a module's gallery:

```javascript
gallery: [
  {
    img: "assets/screenshot-1.jpg",
    title: "First Screenshot",
    description: "What users see here..."
  },
  {
    img: "assets/screenshot-2.jpg",
    title: "Second Screenshot",
    description: "What happens next..."
  },
  // Add more slides
]
```

Users navigate with:
- Gallery buttons (← →)
- Dot indicators (click to jump)
- Keyboard arrows (← →)

---

## Module Switcher Pills

In the header, users can click module pills to switch between systems:

```
[Telemetry] [Ticketing] [Maps] [Routing]
```

Each pill updates all content: hero, stats, metrics, gallery, canvas.

To customize pill labels, edit `renderModuleSwitcher()`:

```javascript
const labels = ["Telemetry", "Ticketing", "Maps", "Routing"];
```

---

## Closing the Case Study

Users can close via:
1. **← Back to Portfolio** button in header
2. **Escape key**

Closing preserves scroll position of the main portfolio page.

---

## Testing Checklist

- [x] Click "Read Case Study →" on any portfolio card
- [x] Verify full-screen overlay opens smoothly
- [x] Drag the before/after slider handle
- [x] Click gallery navigation buttons
- [x] Press number keys (1-4) to switch modules
- [x] Press Escape to close
- [x] Test on mobile (responsive layout)
- [x] Verify keyboard focus states (Tab key)
- [x] Test all four modules load with correct assets

---

## Browser Support

- **Modern browsers** — Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile** — iOS Safari 14+, Chrome Android
- **Fallbacks** — Canvas rendering, CSS Grid fallbacks (for older browsers)

---

## Performance Considerations

1. **Image Optimization** — Compress hero/before/after images to <500KB each
2. **Canvas Animation** — Runs at 60fps. If performance degrades, reduce `busCount` in `canvasConfig`
3. **Gallery Images** — Use WebP with JPEG fallback for 4:3 screenshots
4. **Lazy Loading** — Images load only when module is opened (no preload)

---

## Customization Examples

### Change hero stats for a module:
```javascript
telemetry: {
  // ...
  stats: [
    { label: "Users Reached", value: 100000, unit: "" },
    { label: "Latency", value: 15, unit: "ms" },
    { label: "Uptime", value: 99.9, unit: "%" }
  ]
}
```

### Change route waypoints (e.g., different city):
```javascript
canvasConfig: {
  routeWaypoints: [
    { lat: 40.7128, lng: -74.0060, name: "New York" },
    { lat: 40.7580, lng: -73.9855, name: "Central Park" }
  ],
  busCount: 15,
  gpsSampleRate: 50
}
```

### Add a new gallery slide:
```javascript
gallery: [
  // ... existing slides
  {
    img: "assets/new-feature.jpg",
    title: "New Feature Screenshot",
    description: "This shows the latest feature in action..."
  }
]
```

---

## Troubleshooting

**Issue: Images not loading**
- Check `assets/` paths in `case-study-system.js`
- Verify image files exist in correct directory
- Check browser console for 404 errors

**Issue: Canvas not animating**
- Verify telemetryCanvas element exists in DOM
- Check browser console for JavaScript errors
- Ensure `busCount > 0` in canvasConfig

**Issue: Before/After slider not dragging**
- Test mouse, touch, and click interactions separately
- Check if slider-handle element is receiving pointer events
- Verify CSS z-index layering is correct

**Issue: Gallery dots not updating**
- Check `state.currentGallerySlide` is being tracked
- Verify gallery array has content
- Check console for JavaScript errors

---

## Support & Customization

For module-specific customizations beyond these templates:

1. Identify which module needs change (telemetry, pass, navigation, itinerary)
2. Locate module definition in `CaseStudySystem.modules`
3. Update relevant property (stats, metrics, gallery, canvasConfig)
4. Test in browser (F12 → Console for errors)

All modules use the same rendering engine, so changes are consistent across the system.
