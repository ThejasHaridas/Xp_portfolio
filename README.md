# Thejas Haridas — Windows XP Portfolio

A portfolio site inspired by Windows XP. It's plain HTML, CSS and JavaScript with no build step and no dependencies.

**Features:** a boot screen and login screen, a Bliss-style desktop, windows you can drag, resize, minimise and maximise, a taskbar, a Start menu, a tray clock, a playable Minesweeper, and a mobile layout where windows open full screen.

## Run locally
Open `index.html` in a browser, or run:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy (GitHub Pages)
Settings → Pages → Deploy from branch → select this branch, `/ (root)`.

## Editing content
All portfolio content lives at the top of `script.js` (`PROFILE`, `EXPERIENCE`, `PROJECTS`, `SKILLS`, …).

To turn on the **Download PDF** button in the Resume window, add your resume at `assets/Thejas_Haridas_Resume.pdf`.
