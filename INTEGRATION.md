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

```html
<button class="modal-trigger-btn" data-module="telemetry" data-case-study="telemetry">
  Read Case Study →
</button>
```

---

## Step 4: Assets Directory

The `/assets/` directory in your project root contains:

```
/assets/
├── safar_corridor_hero.jpg       (16:9, 1920x1080+)
├── dispatch_manual_before.jpg    (16:9, 1920x1080+)
├── dispatch_live_after.jpg       (16:9, 1920x1080+)
├── ui_live_tracking.jpg          (4:3, 1024x768+)
└── ui_offline_navigation.jpg     (4:3, 1024x768+)
```

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
