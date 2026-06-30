# 🐱 Spinning Cat Loader

> Extracted from [hexo-theme-shoka](https://github.com/amehime/hexo-theme-shoka)  
> A pure-CSS animated orange tabby cat that spins while your page loads.

![screenshot](demo.gif)

**Zero images.** The entire cat is built with CSS `radial-gradient`, `clip-path`, `border-radius`, and `transform`. It spins 720°, the body morphs through keyframes, and the foot wobbles for a cartoonish running effect.

---

## Quick Start

### 1. Copy HTML

Place this right after `<body>`:

```html
<div id="loading">
  <div class="cat">
    <div class="body"></div>
    <div class="head">
      <div class="face"></div>
    </div>
    <div class="foot">
      <div class="tummy-end"></div>
      <div class="bottom"></div>
      <div class="legs left"></div>
      <div class="legs right"></div>
    </div>
    <div class="paw">
      <div class="hands left"></div>
      <div class="hands right"></div>
    </div>
  </div>
</div>
```

### 2. Include files

```html
<!-- In <head> -->
<link rel="stylesheet" href="spinning-cat-loader.css">

<!-- Before </body> -->
<!-- Optional: anime.js for smooth fade-out -->
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.0/lib/anime.min.js"></script>
<script src="spinning-cat-loader.js"></script>
```

### 3. Configure (optional)

Define `window.CatLoaderConfig` **before** the loader script:

```html
<script>
  window.CatLoaderConfig = {
    start: true,    // Show cat on first page load
    switch: true,   // Re-show cat when user switches browser tabs

    // Optional: tab-switch title/favicon tricks
    titleHide: '(◞‸◟ )  Don\'t go!',
    titleShow: '✌️  Welcome back!',
    faviconHidden: '/failure.ico',
    faviconNormal: '/favicon.ico'
  };
</script>
```

---

## API

The global `CatLoader` object:

| Method | Description |
|---|---|
| `CatLoader.show()` | Immediately show the loader overlay |
| `CatLoader.hide([ms])` | Hide after `ms` milliseconds (default 3000). Pass `0` to hide immediately. |
| `CatLoader.vanish()` | Force-hide right now |

### User interactions

| Action | Result |
|---|---|
| **Click** the cat | Dismisses immediately (`CatLoader.vanish()`) |
| **Hover** over the cat | Pauses the spin animation |
| **Click while paused** | Resumes the animation |

---

## How It Works

### CSS (spinning-cat-loader.css)

The `.cat` container is `15em` wide (150px at default 10px font-size). Inside it, overlapping `div`s with `border-radius: 50%` and `radial-gradient` backgrounds create the cat's head, body, foot, legs, paws, tummy, and face. Three `@keyframes` animate:

| Animation | What it does |
|---|---|
| `loading-cat` (2.74s) | Rotates the whole cat from 0° → -720° |
| `body` (2.74s) | Morphs the body's `clip-path` polygon to simulate a running pose |
| `foot` (2.74s) | Spins the foot disk with a wobble |

Colors are hardcoded for the orange tabby:
- Body: `rgb(237, 166, 93)` (ginger)
- Tummy: `rgb(242, 192, 137)` (light cream)
- Tail: `rgb(198, 130, 59)` (darker orange)
- Outline: `rgb(56, 60, 75)` (dark charcoal)

The background color behind the cat comes from `--loader-bg` (defaults to `#f7f7f7`). Set it to match your page background:

```css
:root {
  --loader-bg: #1a1a2e;  /* dark theme */
}
```

### JS (spinning-cat-loader.js)

- On `DOMContentLoaded`, the loader auto-hides after 3 seconds.
- The `body.loaded` class toggles `overflow` and fades out the overlay.
- Tab visibility API: when the user switches away, the cat reappears (if `switch: true`).
- Clicking the cat calls `vanish()` immediately.
- If **anime.js** is available, hide/show use a 200ms opacity fade; otherwise they toggle instantly.

---

## Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge). 

- `clip-path` is supported in all evergreen browsers. IE11 is **not** supported.
- The optional tab-switch feature uses the [Page Visibility API](https://caniuse.com/pagevisibility).

---

## Files

| File | Purpose |
|---|---|
| `spinning-cat-loader.css` | All cat styles + keyframes (drop-in, ~220 lines) |
| `spinning-cat-loader.js` | Show/hide logic + tab-switch behavior (~130 lines) |
| `demo.html` | Standalone demo — open in browser to see it work |
| `README.md` | This file |

---

## License

MIT — same as the original [hexo-theme-shoka](https://github.com/amehime/hexo-theme-shoka) theme.
