/* Nostalgic XP touches: tray volume, balloons, desktop context menu, Display Properties
   (wallpapers, colour schemes, screensavers) and the paperclip assistant. */
(window.XPExt = window.XPExt || []).push((xp) => {
  "use strict";
  const { $, esc, settings } = xp;
  const desktop = $("#desktop");

  xp.ICONS.display = `<svg viewBox="0 0 48 48"><rect x="5" y="6" width="38" height="28" rx="2" fill="#dfe6f2" stroke="#44546a"/><rect x="8" y="9" width="32" height="22" fill="#3d86e8"/><path d="M8 25c8-6 18-6 32 0v6H8z" fill="#5aad2e"/><rect x="18" y="34" width="12" height="4" fill="#b8c2d2"/><rect x="12" y="38" width="24" height="4" rx="1" fill="#cfd7e4" stroke="#44546a"/><circle cx="38" cy="36" r="8" fill="#f4ad00" stroke="#8a5a00"/><path d="M34 36h8M38 32v8" stroke="#fff" stroke-width="2"/></svg>`;
  xp.ICONS.clip = `<svg viewBox="0 0 48 48"><path d="M18 40V14a6 6 0 0 1 12 0v22a4 4 0 0 1-8 0V16" fill="none" stroke="#7a8793" stroke-width="3.5" stroke-linecap="round"/><circle cx="21" cy="12" r="3" fill="#fff" stroke="#333"/><circle cx="29" cy="12" r="3" fill="#fff" stroke="#333"/><circle cx="21.5" cy="12.5" r="1.2"/><circle cx="29.5" cy="12.5" r="1.2"/></svg>`;

  /* ---------- Settings ---------- */
  const WALLPAPERS = { bliss: "Bliss", autumn: "Autumn", azul: "Azul", moon: "Red Moon Desert", classic: "(None) — Classic teal" };
  const THEMES = { blue: "Windows XP style — Default (blue)", olive: "Windows XP style — Olive Green", silver: "Windows XP style — Silver" };
  const SAVERS = { pipes: "3D Pipes", logo: "Windows XP", stars: "Starfield", none: "(None)" };
  const cfg = {
    wallpaper: settings.get("wallpaper", "bliss"),
    theme: settings.get("theme", "blue"),
    saver: settings.get("saver", "pipes"),
    wait: settings.get("wait", 1),
  };
  function applyLook() {
    Object.keys(WALLPAPERS).forEach((w) => desktop.classList.toggle("wp-" + w, cfg.wallpaper === w));
    document.body.dataset.theme = cfg.theme;
  }
  applyLook();

  /* ---------- Tray: volume + balloons ---------- */
  const vol = $("#volIcon");
  const syncVol = () => {
    const m = window.XPSound?.muted;
    vol.classList.toggle("muted", !!m);
    vol.title = m ? "Volume: muted (click to unmute)" : "Volume (click to mute)";
  };
  vol.addEventListener("click", (e) => {
    e.stopPropagation();
    window.XPSound?.setMuted(!window.XPSound.muted);
    syncVol();
    xp.sound("ding");
  });
  syncVol();

  let balloonEl = null;
  function balloon({ title, text, iconKey = "info", onClick }) {
    balloonEl?.remove();
    const b = document.createElement("div");
    b.className = "balloon";
    b.setAttribute("role", "status");
    b.innerHTML = `<button class="balloon-x" aria-label="Close">✕</button><div class="balloon-title">${xp.icon(iconKey)}<b>${esc(title)}</b></div><p>${esc(text)}</p>`;
    desktop.appendChild(b);
    balloonEl = b;
    xp.sound("balloon");
    const close = () => { b.classList.add("fade-out"); setTimeout(() => b.remove(), 500); };
    b.querySelector(".balloon-x").addEventListener("click", (e) => { e.stopPropagation(); close(); });
    b.addEventListener("click", () => { onClick?.(); close(); });
    setTimeout(close, 12000);
  }
  xp.balloon = balloon;

  const timers = [];
  xp.on("login", () => {
    timers.push(setTimeout(() => balloon({
      title: "New publication available",
      text: `"${xp.data.PUBLICATIONS[0].title}" — click here to read more.`,
      onClick: () => xp.openApp("publications"),
    }), 7000));
    timers.push(setTimeout(() => {
      if (!xp.windows.has("cmd")) balloon({ title: "Tip: try the Command Prompt", text: "Type HELP to explore this portfolio from a terminal.", iconKey: "cmd", onClick: () => xp.openApp("cmd") });
    }, 45000));
    timers.push(setTimeout(showAssistant, 3500));
    resetIdle();
  });
  xp.on("logoff", () => { timers.forEach(clearTimeout); timers.length = 0; hideAssistant(); balloonEl?.remove(); });

  /* ---------- Desktop context menu ---------- */
  const ORDER_TYPE = ["about", "projects", "experience", "publications", "achievements", "resume", "skills", "contact", "ie", "cmd", "paint", "winamp", "solitaire", "minesweeper", "recycle"];
  function arrange(mode) {
    const list = xp.DESKTOP;
    if (mode === "name") list.sort((a, b) => a[1].localeCompare(b[1]));
    else if (mode === "type") list.sort((a, b) => ORDER_TYPE.indexOf(a[0]) - ORDER_TYPE.indexOf(b[0]));
    else list.splice(0, list.length, ...xp.DESKTOP_DEFAULT);
    xp.buildIcons();
  }
  function refresh() {
    const icons = $("#icons");
    icons.style.visibility = "hidden";
    setTimeout(() => { icons.style.visibility = ""; }, 120);
  }

  desktop.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".window, .taskbar, .start-menu, .balloon, .assistant")) return;
    e.preventDefault();
    const iconEl = e.target.closest(".icon");
    if (iconEl) {
      const id = iconEl.dataset.app, label = iconEl.textContent.trim();
      xp.showMenu(e.clientX, e.clientY, [
        { label: "Open", bold: true, action: () => xp.openApp(id) },
        { sep: true },
        { label: "Create Shortcut", disabled: true },
        { label: "Delete", action: () => xp.alert("Confirm File Delete", `Are you sure you want to delete '${esc(label)}'?<br><br>Just kidding — Thejas's work is too good to throw away.`, "warning") },
        { label: "Rename", disabled: true },
        { sep: true },
        { label: "Properties", action: () => xp.alert(`${label} Properties`, `<b>${esc(label)}</b><br>Type: Portfolio item<br>Location: C:\\Users\\Thejas Haridas\\Desktop`, "info") },
      ]);
      return;
    }
    xp.showMenu(e.clientX, e.clientY, [
      { label: "Arrange Icons By", submenu: [
        { label: "Name", action: () => arrange("name") },
        { label: "Type", action: () => arrange("type") },
        { label: "Default", action: () => arrange("default") },
      ] },
      { label: "Refresh", action: refresh },
      { sep: true },
      { label: "Paste", disabled: true },
      { label: "Paste Shortcut", disabled: true },
      { sep: true },
      { label: "New", submenu: [
        { label: "Folder", icon: "folder", action: () => xp.alert("New Folder", "Thejas's work is already neatly organised in <b>My Projects</b>.", "info") },
        { label: "Text Document", icon: "notepad", action: () => xp.openApp("resume") },
      ] },
      { sep: true },
      { label: "Wallpaper", submenu: Object.entries(WALLPAPERS).map(([k, v]) => ({ label: v, checked: cfg.wallpaper === k, action: () => { cfg.wallpaper = k; settings.set("wallpaper", k); applyLook(); } })) },
      { label: "Properties", action: () => xp.openApp("display") },
    ]);
  });

  // Long-press on touch devices opens the same menu.
  let pressTimer = null;
  desktop.addEventListener("touchstart", (e) => {
    if (e.target.closest(".window, .taskbar, .start-menu, .balloon, .assistant") || e.touches.length > 1) return;
    const t = e.touches[0];
    pressTimer = setTimeout(() => desktop.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, clientX: t.clientX, clientY: t.clientY })), 600);
  }, { passive: true });
  ["touchend", "touchmove", "touchcancel"].forEach((ev) => desktop.addEventListener(ev, () => clearTimeout(pressTimer), { passive: true }));

  /* ---------- Display Properties ---------- */
  xp.APPS.display = {
    title: "Display Properties",
    icon: "display",
    size: [420, null],
    resizable: false,
    render: () => `
      <div class="win-body flat dp">
        <div class="dp-tabs" role="tablist">
          <button role="tab" data-tab="desktop" class="on">Desktop</button>
          <button role="tab" data-tab="saver">Screen Saver</button>
          <button role="tab" data-tab="appearance">Appearance</button>
        </div>
        <div class="dp-panel">
          <div class="dp-monitor"><div class="dp-screen" data-preview><div class="dp-mini-window"><i></i></div><div class="dp-mini-taskbar"></div></div><div class="dp-stand"></div></div>
          <div data-pane="desktop">
            <label class="dp-label">Background:</label>
            <select size="5" class="dp-list" data-wallpaper>${Object.entries(WALLPAPERS).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join("")}</select>
          </div>
          <div data-pane="saver" hidden>
            <label class="dp-label">Screen saver:</label>
            <div class="dp-row"><select data-saver>${Object.entries(SAVERS).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join("")}</select><button class="xp-btn" data-preview-saver>Preview</button></div>
            <div class="dp-row">Wait: <input type="number" min="1" max="30" data-wait style="width:52px"> minutes</div>
          </div>
          <div data-pane="appearance" hidden>
            <label class="dp-label">Windows and buttons:</label>
            <select data-theme-select>${Object.entries(THEMES).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join("")}</select>
          </div>
        </div>
        <div class="dialog-actions dp-actions"><button class="xp-btn" data-ok>OK</button><button class="xp-btn" data-cancel>Cancel</button><button class="xp-btn" data-apply>Apply</button></div>
      </div>`,
    mount(win) {
      const q = (s) => win.querySelector(s);
      const draft = { ...cfg };
      const wp = q("[data-wallpaper]"), sv = q("[data-saver]"), wait = q("[data-wait]"), th = q("[data-theme-select]"), prev = q("[data-preview]");
      wp.value = draft.wallpaper; sv.value = draft.saver; wait.value = draft.wait; th.value = draft.theme;
      const paint = () => {
        prev.className = "dp-screen wp-" + draft.wallpaper;
        prev.dataset.theme = draft.theme;
      };
      paint();
      win.querySelectorAll("[data-tab]").forEach((t) => t.addEventListener("click", () => {
        win.querySelectorAll("[data-tab]").forEach((x) => x.classList.toggle("on", x === t));
        win.querySelectorAll("[data-pane]").forEach((p) => { p.hidden = p.dataset.pane !== t.dataset.tab; });
      }));
      wp.addEventListener("change", () => { draft.wallpaper = wp.value; paint(); });
      th.addEventListener("change", () => { draft.theme = th.value; paint(); });
      sv.addEventListener("change", () => { draft.saver = sv.value; });
      wait.addEventListener("change", () => { draft.wait = Math.min(30, Math.max(1, +wait.value || 1)); wait.value = draft.wait; });
      q("[data-preview-saver]").addEventListener("click", () => startSaver(draft.saver));
      const apply = () => {
        Object.assign(cfg, draft);
        Object.entries(cfg).forEach(([k, v]) => settings.set(k, v));
        applyLook();
        resetIdle();
      };
      q("[data-apply]").addEventListener("click", apply);
      q("[data-ok]").addEventListener("click", () => { apply(); xp.closeWin("display"); });
      q("[data-cancel]").addEventListener("click", () => xp.closeWin("display"));
    },
  };

  /* ---------- Screensaver ---------- */
  let idleTimer = null, saver = null;
  function resetIdle() {
    clearTimeout(idleTimer);
    if (cfg.saver === "none") return;
    idleTimer = setTimeout(() => {
      if (!desktop.classList.contains("hidden")) startSaver(cfg.saver);
    }, cfg.wait * 60000);
  }
  ["mousemove", "keydown", "pointerdown", "wheel", "touchstart"].forEach((ev) => document.addEventListener(ev, () => { if (!saver) resetIdle(); }, { passive: true }));

  function startSaver(kind) {
    if (saver || kind === "none") return;
    const c = document.createElement("canvas");
    c.className = "saver";
    document.body.appendChild(c);
    const g = c.getContext("2d");
    const fit = () => { c.width = innerWidth; c.height = innerHeight; g.fillStyle = "#000"; g.fillRect(0, 0, c.width, c.height); };
    fit();
    const step = { pipes: pipes, logo: logo, stars: stars }[kind](g, c);
    let raf, last = 0;
    const loop = (t) => { if (t - last > 16) { step(t); last = t; } raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const start = Date.now();
    let origin = null;
    const stop = (e) => {
      if (Date.now() - start < 600) return; // ignore the click that started a preview
      if (e.type === "mousemove") {
        if (!origin) { origin = [e.clientX, e.clientY]; return; }
        if (Math.hypot(e.clientX - origin[0], e.clientY - origin[1]) < 12) return;
      }
      cancelAnimationFrame(raf);
      c.remove();
      saver = null;
      ["mousemove", "keydown", "pointerdown", "touchstart"].forEach((ev) => document.removeEventListener(ev, stop, true));
      removeEventListener("resize", fit);
      resetIdle();
    };
    ["mousemove", "keydown", "pointerdown", "touchstart"].forEach((ev) => document.addEventListener(ev, stop, true));
    addEventListener("resize", fit);
    saver = c;
  }

  function pipes(g, c) {
    const CELL = 36, R = 9;
    const COLORS = [["#ff5a5a", "#8a0000"], ["#5ad05a", "#0a6a0a"], ["#5a9bff", "#0a2f8a"], ["#ffd35a", "#8a6a00"], ["#e070ff", "#5a0a7a"], ["#5ae0e0", "#0a6a6a"], ["#f0f0f0", "#6a6a6a"]];
    const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let cols, rows, pipesArr, segs;
    const reset = () => {
      cols = Math.ceil(c.width / CELL); rows = Math.ceil(c.height / CELL);
      g.fillStyle = "#000"; g.fillRect(0, 0, c.width, c.height);
      pipesArr = Array.from({ length: 4 }, (_, i) => ({ x: (Math.random() * cols) | 0, y: (Math.random() * rows) | 0, d: DIRS[(Math.random() * 4) | 0], col: COLORS[(i + ((Math.random() * 7) | 0)) % COLORS.length] }));
      segs = 0;
      pipesArr.forEach((p) => joint(p));
    };
    const center = (p) => [p.x * CELL + CELL / 2, p.y * CELL + CELL / 2];
    function joint(p) {
      const [x, y] = center(p);
      const grad = g.createRadialGradient(x - 3, y - 3, 1, x, y, R + 3);
      grad.addColorStop(0, "#fff"); grad.addColorStop(0.3, p.col[0]); grad.addColorStop(1, p.col[1]);
      g.fillStyle = grad;
      g.beginPath(); g.arc(x, y, R + 2, 0, Math.PI * 2); g.fill();
    }
    function segment(p, nx, ny) {
      const [x1, y1] = center(p), x2 = nx * CELL + CELL / 2, y2 = ny * CELL + CELL / 2;
      const horiz = y1 === y2;
      const grad = horiz ? g.createLinearGradient(0, y1 - R, 0, y1 + R) : g.createLinearGradient(x1 - R, 0, x1 + R, 0);
      grad.addColorStop(0, p.col[1]); grad.addColorStop(0.35, "#fff"); grad.addColorStop(0.5, p.col[0]); grad.addColorStop(1, p.col[1]);
      g.fillStyle = grad;
      if (horiz) g.fillRect(Math.min(x1, x2), y1 - R, Math.abs(x2 - x1), R * 2);
      else g.fillRect(x1 - R, Math.min(y1, y2), R * 2, Math.abs(y2 - y1));
    }
    reset();
    let lastStep = 0;
    return (t) => {
      if (t - lastStep < 45) return;
      lastStep = t;
      pipesArr.forEach((p) => {
        if (Math.random() < 0.25) {
          const opts = DIRS.filter((d) => d[0] !== -p.d[0] || d[1] !== -p.d[1]);
          const nd = opts[(Math.random() * opts.length) | 0];
          if (nd !== p.d) { p.d = nd; joint(p); }
        }
        let nx = p.x + p.d[0], ny = p.y + p.d[1];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) {
          p.d = [-p.d[0], -p.d[1]];
          joint(p);
          nx = p.x + p.d[0]; ny = p.y + p.d[1];
        }
        segment(p, nx, ny);
        p.x = nx; p.y = ny;
      });
      if (++segs > 420) reset();
    };
  }

  function logo(g, c) {
    let x = 100, y = 100, dx = 2.2, dy = 1.7, hue = 0;
    return () => {
      const w = 300, h = 110;
      g.fillStyle = "rgba(0,0,0,0.25)";
      g.fillRect(0, 0, c.width, c.height);
      x += dx; y += dy;
      if (x < 0 || x + w > c.width) { dx = -dx; hue += 60; }
      if (y < 0 || y + h > c.height) { dy = -dy; hue += 60; }
      const colors = ["#f35325", "#81bc06", "#05a6f0", "#ffba08"];
      colors.forEach((col, i) => {
        g.fillStyle = col;
        g.fillRect(x + (i % 2) * 34, y + 10 + ((i / 2) | 0) * 34, 30, 30);
      });
      g.fillStyle = `hsl(${hue % 360},80%,70%)`;
      g.font = "bold 36px 'Franklin Gothic Medium', Arial, sans-serif";
      g.fillText("Windows", x + 80, y + 48);
      g.font = "16px Tahoma, sans-serif";
      g.fillStyle = "#fff";
      g.fillText("Thejas Haridas · AI/ML Engineer", x + 80, y + 76);
    };
  }

  function stars(g, c) {
    const S = Array.from({ length: 400 }, () => ({ x: (Math.random() - 0.5) * c.width, y: (Math.random() - 0.5) * c.height, z: Math.random() * c.width }));
    return () => {
      g.fillStyle = "#000";
      g.fillRect(0, 0, c.width, c.height);
      const cx = c.width / 2, cy = c.height / 2;
      S.forEach((s) => {
        s.z -= 6;
        if (s.z <= 1) { s.x = (Math.random() - 0.5) * c.width; s.y = (Math.random() - 0.5) * c.height; s.z = c.width; }
        const k = 128 / s.z, px = s.x * k + cx, py = s.y * k + cy, r = Math.max(0.5, 2.2 - s.z / c.width * 2);
        g.fillStyle = "#fff";
        g.fillRect(px, py, r, r);
      });
    };
  }

  /* ---------- Paperclip assistant ---------- */
  let assistant = null;
  function hideAssistant() {
    if (!assistant) return;
    assistant.classList.add("fade-out");
    const a = assistant;
    assistant = null;
    setTimeout(() => a.remove(), 500);
  }
  function showAssistant(force) {
    if (assistant || desktop.classList.contains("hidden")) return;
    if (!force && settings.get("assistantOff", false)) return;
    const a = document.createElement("div");
    a.className = "assistant";
    a.innerHTML = `
      <div class="as-bubble">
        <p>It looks like you're hiring an <b>AI/ML engineer</b>!<br>Would you like help?</p>
        <ul>
          <li data-go="resume">Show me Thejas's resume</li>
          <li data-go="projects">Show me the projects</li>
          <li data-go="contact">I'd like to get in touch</li>
          <li data-go="cmd">Let me try the Command Prompt</li>
          <li data-go="close">Just browsing, thanks</li>
        </ul>
        <label><input type="checkbox" data-off> Don't show me this tip again</label>
      </div>
      <button class="as-clip" aria-label="Assistant">
        <svg viewBox="0 0 60 90"><path d="M22 84V26a13 13 0 0 1 26 0v44a8 8 0 0 1-16 0V30" fill="none" stroke="#8a97a3" stroke-width="6" stroke-linecap="round"/><path d="M22 84V26a13 13 0 0 1 26 0v44a8 8 0 0 1-16 0V30" fill="none" stroke="#d9e0e6" stroke-width="2" stroke-linecap="round"/>
          <g class="as-eyes"><ellipse cx="27" cy="24" rx="7" ry="8" fill="#fff" stroke="#333"/><ellipse cx="43" cy="24" rx="7" ry="8" fill="#fff" stroke="#333"/><circle cx="29" cy="26" r="3"/><circle cx="45" cy="26" r="3"/></g>
          <path d="M19 13q8-6 14 0M37 13q8-6 14 0" fill="none" stroke="#333" stroke-width="2"/></svg>
      </button>`;
    desktop.appendChild(a);
    assistant = a;
    xp.sound("balloon");
    a.querySelector(".as-bubble ul").addEventListener("click", (e) => {
      const li = e.target.closest("[data-go]");
      if (!li) return;
      if (a.querySelector("[data-off]").checked) settings.set("assistantOff", true);
      if (li.dataset.go !== "close") xp.openApp(li.dataset.go);
      hideAssistant();
    });
    a.querySelector("[data-off]").addEventListener("change", (e) => settings.set("assistantOff", e.target.checked));
    a.querySelector(".as-clip").addEventListener("click", () => a.classList.toggle("collapsed"));
  }
  xp.APPS.assistant = { title: "Assistant", icon: "clip", launch: () => showAssistant(true) };
});
