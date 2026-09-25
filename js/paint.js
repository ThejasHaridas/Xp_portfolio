/* Paint — a small MS Paint homage on <canvas>. */
(window.XPExt = window.XPExt || []).push((xp) => {
  "use strict";

  xp.ICONS.paint = `<svg viewBox="0 0 48 48"><path d="M24 6C12 6 4 14 4 24c0 9 7 16 14 16 4 0 4-3 3-6-1-3 1-5 4-5h7c7 0 12-4 12-10C44 12 35 6 24 6z" fill="#f2d8a7" stroke="#8a6a2b"/><circle cx="14" cy="22" r="3.5" fill="#e3310b"/><circle cx="20" cy="14" r="3.5" fill="#f4ad00"/><circle cx="30" cy="13" r="3.5" fill="#4ea40f"/><circle cx="37" cy="20" r="3.5" fill="#1060e0"/><path d="M28 44l14-18 3 2-13 18z" fill="#8b5a2b"/><path d="M42 26l3-4 3 2-3 4z" fill="#bbb"/></svg>`;

  const PALETTE = ["#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080", "#808040", "#004040", "#0080ff", "#004080", "#8000ff", "#804000",
    "#ffffff", "#c0c0c0", "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ffff80", "#00ff80", "#80ffff", "#8080ff", "#ff0080", "#ff8040"];

  const TOOL_ICONS = {
    pencil: `<path d="M3 13l1-3 7-7 2 2-7 7z" fill="#f4c542" stroke="#333"/><path d="M3 13l1-3 2 2z" fill="#333"/>`,
    brush: `<path d="M9 2l5 5-4 3-4-4z" fill="#8b5a2b" stroke="#333"/><path d="M6 6l4 4-3 3c-2 1-5 1-5 1s0-3 1-5z" fill="#1060e0" stroke="#333"/>`,
    eraser: `<path d="M2 10l6-6 6 6-4 4H6z" fill="#f7a8c4" stroke="#333"/><path d="M2 10l4 4" stroke="#333"/>`,
    fill: `<path d="M3 8l5-5 5 5-5 5z" fill="#ddd" stroke="#333"/><path d="M13 9c1 2 2 3 1 4s-2-1-1-4z" fill="#1060e0"/>`,
    picker: `<path d="M3 13l7-7 2 2-7 7H3z" fill="#fff" stroke="#333"/><path d="M10 4l2-2 2 2-2 2z" fill="#333"/>`,
    spray: `<rect x="5" y="6" width="5" height="8" rx="1" fill="#999" stroke="#333"/><rect x="6" y="3" width="3" height="3" fill="#333"/><circle cx="12" cy="3" r=".8"/><circle cx="14" cy="5" r=".8"/><circle cx="13" cy="1.5" r=".8"/>`,
    line: `<path d="M2 14L14 2" stroke="#333" stroke-width="2"/>`,
    rect: `<rect x="2" y="4" width="12" height="9" fill="none" stroke="#333" stroke-width="1.6"/>`,
    ellipse: `<ellipse cx="8" cy="8" rx="6" ry="4.5" fill="none" stroke="#333" stroke-width="1.6"/>`,
    text: `<text x="8" y="13" font-size="13" font-family="Times New Roman" font-weight="bold" text-anchor="middle">A</text>`,
  };
  const TOOL_NAMES = { pencil: "Pencil", brush: "Brush", eraser: "Eraser", fill: "Fill With Color", picker: "Pick Color", spray: "Airbrush", line: "Line", rect: "Rectangle", ellipse: "Ellipse", text: "Text" };

  xp.APPS.paint = {
    title: "untitled - Paint",
    icon: "paint",
    size: [780, 560],
    render: () => `
      <div class="menubar"><span data-menu="file">File</span><span data-menu="edit">Edit</span><span data-menu="image">Image</span><span data-menu="help">Help</span></div>
      <div class="paint win-body flat">
        <div class="paint-tools">
          ${Object.keys(TOOL_ICONS).map((t) => `<button class="ptool${t === "pencil" ? " on" : ""}" data-tool="${t}" title="${TOOL_NAMES[t]}"><svg viewBox="0 0 16 16">${TOOL_ICONS[t]}</svg></button>`).join("")}
          <div class="psizes">${[1, 3, 6, 10].map((s, i) => `<button class="psize${i === 1 ? " on" : ""}" data-size="${s}" title="${s}px"><i style="height:${Math.min(s, 8)}px"></i></button>`).join("")}</div>
        </div>
        <div class="paint-area"><div class="paint-stack"><canvas class="pc" width="640" height="400"></canvas><canvas class="po" width="640" height="400"></canvas></div></div>
      </div>
      <div class="paint-bottom">
        <div class="pcur" title="Left click: primary colour · Right click: secondary colour"><i class="pbg"></i><i class="pfg"></i></div>
        <div class="ppal">${PALETTE.map((c) => `<button style="background:${c}" data-color="${c}" aria-label="${c}"></button>`).join("")}</div>
      </div>
      <div class="statusbar"><span data-status>For Help, click Help Topics on the Help Menu.</span><span data-pos>0, 0</span></div>`,
    mount(win) {
      const pc = win.querySelector(".pc"), po = win.querySelector(".po");
      const ctx = pc.getContext("2d", { willReadFrequently: true }), octx = po.getContext("2d");
      const fgEl = win.querySelector(".pfg"), bgEl = win.querySelector(".pbg");
      const status = win.querySelector("[data-status]"), posEl = win.querySelector("[data-pos]");
      let tool = "pencil", size = 3, fg = "#000000", bg = "#ffffff";
      const undo = [], redo = [];

      const setColors = () => { fgEl.style.background = fg; bgEl.style.background = bg; };
      const snapshot = () => { undo.push(ctx.getImageData(0, 0, pc.width, pc.height)); if (undo.length > 30) undo.shift(); redo.length = 0; };
      const clear = () => { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, pc.width, pc.height); };
      clear();
      // A little signature in the corner of the starting canvas.
      ctx.fillStyle = "#1060e0";
      ctx.font = "bold 16px Tahoma, sans-serif";
      ctx.fillText("Hi! Draw something for Thejas :)", 16, 30);
      setColors();

      win.querySelectorAll("[data-tool]").forEach((b) => b.addEventListener("click", () => {
        tool = b.dataset.tool;
        win.querySelectorAll("[data-tool]").forEach((x) => x.classList.toggle("on", x === b));
        status.textContent = TOOL_NAMES[tool];
      }));
      win.querySelectorAll("[data-size]").forEach((b) => b.addEventListener("click", () => {
        size = +b.dataset.size;
        win.querySelectorAll("[data-size]").forEach((x) => x.classList.toggle("on", x === b));
      }));
      const pal = win.querySelector(".ppal");
      pal.addEventListener("click", (e) => { const b = e.target.closest("[data-color]"); if (b) { fg = b.dataset.color; setColors(); } });
      pal.addEventListener("contextmenu", (e) => { e.preventDefault(); const b = e.target.closest("[data-color]"); if (b) { bg = b.dataset.color; setColors(); } });

      const pt = (e) => {
        const r = po.getBoundingClientRect();
        return { x: Math.round(((e.clientX - r.left) * po.width) / r.width), y: Math.round(((e.clientY - r.top) * po.height) / r.height) };
      };

      function hexToRgba(hex) {
        const n = parseInt(hex.slice(1), 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 255];
      }
      function floodFill(x, y, color) {
        const img = ctx.getImageData(0, 0, pc.width, pc.height), d = img.data, W = pc.width, H = pc.height;
        const i0 = (y * W + x) * 4, target = [d[i0], d[i0 + 1], d[i0 + 2], d[i0 + 3]], rgba = hexToRgba(color);
        if (target.every((v, i) => v === rgba[i])) return;
        const match = (i) => Math.abs(d[i] - target[0]) < 24 && Math.abs(d[i + 1] - target[1]) < 24 && Math.abs(d[i + 2] - target[2]) < 24 && Math.abs(d[i + 3] - target[3]) < 24;
        const stack = [[x, y]];
        while (stack.length) {
          let [cx, cy] = stack.pop();
          while (cy >= 0 && match((cy * W + cx) * 4)) cy--;
          cy++;
          let left = false, right = false;
          while (cy < H && match((cy * W + cx) * 4)) {
            const i = (cy * W + cx) * 4;
            d[i] = rgba[0]; d[i + 1] = rgba[1]; d[i + 2] = rgba[2]; d[i + 3] = 255;
            if (cx > 0) { const m = match(i - 4); if (m && !left) { stack.push([cx - 1, cy]); left = true; } else if (!m) left = false; }
            if (cx < W - 1) { const m = match(i + 4); if (m && !right) { stack.push([cx + 1, cy]); right = true; } else if (!m) right = false; }
            cy++;
          }
        }
        ctx.putImageData(img, 0, 0);
      }

      function stroke(c, a, b, color, width) {
        c.strokeStyle = color;
        c.lineWidth = width;
        c.lineCap = "round";
        c.lineJoin = "round";
        c.beginPath();
        c.moveTo(a.x + 0.5, a.y + 0.5);
        c.lineTo(b.x + 0.5, b.y + 0.5);
        c.stroke();
      }
      function shape(c, a, b, color, width) {
        c.strokeStyle = color;
        c.lineWidth = width;
        c.beginPath();
        if (tool === "line") { c.lineCap = "round"; c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); }
        else if (tool === "rect") c.rect(Math.min(a.x, b.x) + 0.5, Math.min(a.y, b.y) + 0.5, Math.abs(b.x - a.x), Math.abs(b.y - a.y));
        else c.ellipse((a.x + b.x) / 2, (a.y + b.y) / 2, Math.abs(b.x - a.x) / 2, Math.abs(b.y - a.y) / 2, 0, 0, Math.PI * 2);
        c.stroke();
      }
      function spray(p, color) {
        ctx.fillStyle = color;
        const r = size * 4;
        for (let i = 0; i < 18; i++) {
          const ang = Math.random() * Math.PI * 2, rad = Math.random() * r;
          ctx.fillRect(p.x + Math.cos(ang) * rad, p.y + Math.sin(ang) * rad, 1, 1);
        }
      }

      let drawing = null;
      po.addEventListener("contextmenu", (e) => e.preventDefault());
      po.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        po.setPointerCapture(e.pointerId);
        const p = pt(e), color = e.button === 2 ? bg : fg, other = e.button === 2 ? fg : bg;
        if (tool === "picker") {
          const [r, g, b] = ctx.getImageData(p.x, p.y, 1, 1).data;
          const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
          if (e.button === 2) bg = hex; else fg = hex;
          setColors();
          return;
        }
        snapshot();
        if (tool === "fill") { floodFill(p.x, p.y, color); return; }
        if (tool === "text") {
          const text = prompt("Text:");
          if (text) { ctx.fillStyle = color; ctx.font = `${10 + size * 3}px Tahoma, sans-serif`; ctx.fillText(text, p.x, p.y); }
          return;
        }
        drawing = { start: p, last: p, color, other, sprayTimer: null };
        if (tool === "pencil") stroke(ctx, p, p, color, 1);
        if (tool === "brush") stroke(ctx, p, p, color, size + 1);
        if (tool === "eraser") { ctx.fillStyle = other; ctx.fillRect(p.x - size * 2, p.y - size * 2, size * 4, size * 4); }
        if (tool === "spray") { spray(p, color); drawing.sprayTimer = setInterval(() => spray(drawing.last, color), 30); }
      });
      po.addEventListener("pointermove", (e) => {
        const p = pt(e);
        posEl.textContent = `${p.x}, ${p.y}`;
        if (!drawing) return;
        const { last, color, other } = drawing;
        if (tool === "pencil") stroke(ctx, last, p, color, 1);
        else if (tool === "brush") stroke(ctx, last, p, color, size + 1);
        else if (tool === "eraser") stroke(ctx, last, p, other, size * 4);
        else if (tool === "spray") spray(p, color);
        else if (["line", "rect", "ellipse"].includes(tool)) {
          octx.clearRect(0, 0, po.width, po.height);
          shape(octx, drawing.start, p, color, Math.max(1, size - 1));
        }
        drawing.last = p;
      });
      const end = (e) => {
        if (!drawing) return;
        clearInterval(drawing.sprayTimer);
        if (["line", "rect", "ellipse"].includes(tool)) {
          octx.clearRect(0, 0, po.width, po.height);
          shape(ctx, drawing.start, pt(e), drawing.color, Math.max(1, size - 1));
        }
        drawing = null;
      };
      po.addEventListener("pointerup", end);
      po.addEventListener("pointercancel", end);

      const doUndo = () => { if (undo.length) { redo.push(ctx.getImageData(0, 0, pc.width, pc.height)); ctx.putImageData(undo.pop(), 0, 0); } };
      const doRedo = () => { if (redo.length) { undo.push(ctx.getImageData(0, 0, pc.width, pc.height)); ctx.putImageData(redo.pop(), 0, 0); } };
      const save = () => {
        pc.toBlob((blob) => {
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "untitled.png";
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        });
      };
      const invert = () => {
        snapshot();
        const img = ctx.getImageData(0, 0, pc.width, pc.height);
        for (let i = 0; i < img.data.length; i += 4) { img.data[i] = 255 - img.data[i]; img.data[i + 1] = 255 - img.data[i + 1]; img.data[i + 2] = 255 - img.data[i + 2]; }
        ctx.putImageData(img, 0, 0);
      };
      const flip = () => {
        snapshot();
        const tmp = document.createElement("canvas");
        tmp.width = pc.width; tmp.height = pc.height;
        tmp.getContext("2d").drawImage(pc, 0, 0);
        ctx.save(); ctx.scale(-1, 1); ctx.drawImage(tmp, -pc.width, 0); ctx.restore();
      };

      const MENUS = {
        file: [
          { label: "New", action: () => { snapshot(); clear(); } },
          { label: "Save as PNG...", action: save },
          { sep: true },
          { label: "Exit", action: () => xp.closeWin("paint") },
        ],
        edit: [{ label: "Undo  (Ctrl+Z)", action: doUndo }, { label: "Redo  (Ctrl+Y)", action: doRedo }],
        image: [
          { label: "Flip Horizontal", action: flip },
          { label: "Invert Colors", action: invert },
          { label: "Clear Image", action: () => { snapshot(); clear(); } },
        ],
        help: [{ label: "About Paint", action: () => xp.alert("About Paint", "<b>Paint</b> for Thejas's portfolio.<br>Left-click a colour for the pen, right-click for the background.", "info") }],
      };
      win.querySelectorAll("[data-menu]").forEach((m) => m.addEventListener("click", (e) => {
        e.stopPropagation();
        const r = m.getBoundingClientRect();
        xp.showMenu(r.left, r.bottom, MENUS[m.dataset.menu]);
      }));
      win.addEventListener("keydown", (e) => {
        if (!e.ctrlKey) return;
        if (e.key === "z") { e.preventDefault(); doUndo(); }
        if (e.key === "y") { e.preventDefault(); doRedo(); }
        if (e.key === "s") { e.preventDefault(); save(); }
      });
      win.tabIndex = -1;
    },
  };
});
