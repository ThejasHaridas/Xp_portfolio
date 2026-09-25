# Thejas Haridas — Windows XP Portfolio

**Live:** https://thejasharidas.github.io/Xp_portfolio/

A portfolio site inspired by Windows XP. It's plain HTML, CSS and JavaScript with no build step and no dependencies.

**Features**
- Boot and login screens, a desktop with windows you can drag, resize, minimise and maximise, a taskbar, a Start menu with an All Programs submenu, and a tray clock.
- **Command Prompt**: a portfolio terminal. Type `help`; other commands include `whoami`, `projects 1`, `skills`, `hire`, `dir`, `tree` and `matrix`.
- **Project folders with architecture diagrams**: double-click a project to see its pipeline drawn as a diagram.
- **Nostalgic touches:**
  - Synthesised XP-style system sounds, with a mute button in the tray.
  - A right-click desktop menu for arranging icons and switching wallpaper.
  - Display Properties, with 5 wallpapers, the Blue, Olive and Silver colour schemes, and 3D Pipes, Windows logo and Starfield screensavers.
  - A paperclip assistant and tray notification balloons.
- **Apps and games:** Paint, Solitaire (Klondike), Winamp playing original chiptunes, and Minesweeper.
- A mobile layout where windows open full screen and long-press opens the right-click menu.

## Run locally
Open `index.html` in a browser, or run:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy (GitHub Pages)
Settings → Pages → Deploy from branch → select this branch, `/ (root)`.

## Editing content
All portfolio content lives at the top of `script.js` (`PROFILE`, `EXPERIENCE`, `PROJECTS`, `SKILLS`, …). Each project's `flow` array drives its diagram.

Apps live in `js/`. Each one registers itself on the shared `XP` API, which `script.js` defines.

The downloadable resume at `assets/Thejas_Haridas_Resume.pdf` is generated from the same data, with the phone number left out. After editing content in `script.js`, rebuild it with:
```bash
npm i -D playwright && node tools/build-resume-pdf.mjs
```
