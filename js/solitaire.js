/* Solitaire — Klondike, draw one. Click a card to select it, click a destination to move; double-click sends a card home. */
(window.XPExt = window.XPExt || []).push((xp) => {
  "use strict";

  xp.ICONS.solitaire = `<svg viewBox="0 0 48 48"><rect x="6" y="8" width="22" height="30" rx="3" fill="#fff" stroke="#555" transform="rotate(-12 17 23)"/><rect x="18" y="8" width="22" height="30" rx="3" fill="#fff" stroke="#555" transform="rotate(8 29 23)"/><path d="M30 16c-3 0-4 3-4 4 0 3 4 6 4 8 0-2 4-5 4-8 0-1-1-4-4-4z" fill="#d4201c" transform="rotate(8 29 23)"/><text x="22" y="18" font-size="7" font-weight="bold" fill="#d4201c" transform="rotate(8 29 23)">A</text></svg>`;

  const SUITS = ["♠", "♥", "♦", "♣"];
  const RANKS = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const isRed = (c) => c.s === 1 || c.s === 2;

  xp.APPS.solitaire = {
    title: "Solitaire",
    icon: "solitaire",
    size: [660, 520],
    render: () => `
      <div class="menubar"><span data-menu="game">Game</span><span data-menu="help">Help</span></div>
      <div class="sol-felt" data-felt></div>
      <div class="statusbar"><span data-msg>Click a card, then click where it should go. Double-click sends it home.</span><span data-score>Score: 0 Time: 0</span></div>`,
    mount(win) {
      const felt = win.querySelector("[data-felt]");
      const scoreEl = win.querySelector("[data-score]");
      let state, sel, score, seconds, timer, history, won;

      function deal() {
        const deck = [];
        for (let s = 0; s < 4; s++) for (let r = 1; r <= 13; r++) deck.push({ s, r, up: false });
        for (let i = deck.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [deck[i], deck[j]] = [deck[j], deck[i]]; }
        const tab = Array.from({ length: 7 }, (_, i) => {
          const pile = deck.splice(0, i + 1);
          pile[pile.length - 1].up = true;
          return pile;
        });
        state = { stock: deck, waste: [], found: [[], [], [], []], tab };
        sel = null; score = 0; seconds = 0; history = []; won = false;
        clearInterval(timer);
        timer = setInterval(() => { if (!won) { seconds++; updateStatus(); } }, 1000);
        render();
      }

      const pileOf = (type, i) => (type === "stock" ? state.stock : type === "waste" ? state.waste : type === "found" ? state.found[i] : state.tab[i]);
      const save = () => { history.push(JSON.stringify({ state, score })); if (history.length > 200) history.shift(); };
      const updateStatus = () => { scoreEl.textContent = `Score: ${score} Time: ${seconds}`; };

      function canMove(src, dst) {
        const from = pileOf(src.type, src.i), moving = from.slice(src.idx);
        const c = moving[0];
        if (!c || !c.up) return false;
        if (dst.type === "found") {
          if (moving.length !== 1) return false;
          const f = state.found[dst.i], top = f[f.length - 1];
          return top ? top.s === c.s && c.r === top.r + 1 : c.r === 1;
        }
        if (dst.type === "tab") {
          if (src.type === "tab" && src.i === dst.i) return false;
          const t = state.tab[dst.i], top = t[t.length - 1];
          return top ? top.up && isRed(top) !== isRed(c) && c.r === top.r - 1 : c.r === 13;
        }
        return false;
      }

      function move(src, dst) {
        save();
        const from = pileOf(src.type, src.i);
        const moving = from.splice(src.idx);
        pileOf(dst.type, dst.i).push(...moving);
        if (dst.type === "found") score += 10;
        if (src.type === "waste" && dst.type === "tab") score += 5;
        if (src.type === "found" && dst.type === "tab") score = Math.max(0, score - 15);
        if (src.type === "tab" && from.length && !from[from.length - 1].up) { from[from.length - 1].up = true; score += 5; }
        xp.sound("click");
        checkWin();
      }

      function autoHome(src) {
        const from = pileOf(src.type, src.i);
        if (src.idx !== from.length - 1) return false;
        for (let f = 0; f < 4; f++) {
          const dst = { type: "found", i: f };
          if (canMove(src, dst)) { move(src, dst); return true; }
        }
        return false;
      }

      function checkWin() {
        if (state.found.every((f) => f.length === 13)) {
          won = true;
          clearInterval(timer);
          render();
          felt.classList.add("won");
          xp.sound("ding");
          setTimeout(() => xp.alert("Solitaire", `<b>Congratulations, you won!</b><br>Score: ${score} · Time: ${seconds}s<br><br>Deal again from the Game menu.`, "info"), 600);
        }
      }

      function drawStock() {
        save();
        if (state.stock.length) {
          const c = state.stock.pop();
          c.up = true;
          state.waste.push(c);
        } else {
          state.stock = state.waste.reverse().map((c) => ({ ...c, up: false }));
          state.waste = [];
          score = Math.max(0, score - 20);
        }
        xp.sound("click");
      }

      function layout() {
        const W = felt.clientWidth || 600;
        const gap = Math.max(6, Math.min(14, W * 0.02));
        const cw = Math.min(80, (W - gap * 8) / 7);
        const ch = cw * 1.4;
        return { gap, cw, ch, x: (i) => gap + i * (cw + gap) };
      }

      function cardHtml(c, x, y, L, attrs, selected) {
        const base = `class="card ${c.up ? (isRed(c) ? "up red" : "up black") : "down"}${selected ? " sel" : ""}" style="left:${x}px;top:${y}px;width:${L.cw}px;height:${L.ch}px" ${attrs}`;
        if (!c.up) return `<div ${base}></div>`;
        const r = RANKS[c.r], s = SUITS[c.s];
        const mid = c.r > 10 ? `<b class="face">${r}</b>` : s;
        return `<div ${base}><span class="c-tl">${r}<br>${s}</span><span class="c-mid">${mid}</span><span class="c-br">${r}<br>${s}</span></div>`;
      }

      function render() {
        const L = layout();
        felt.style.setProperty("--cw", L.cw + "px");
        const isSel = (type, i, idx) => sel && sel.type === type && sel.i === i && idx >= sel.idx;
        let h = "";
        // Stock
        h += `<div class="slot stock-slot" style="left:${L.x(0)}px;top:${L.gap}px;width:${L.cw}px;height:${L.ch}px" data-type="stock">${state.stock.length ? "" : "<b>↻</b>"}</div>`;
        if (state.stock.length) h += cardHtml(state.stock[state.stock.length - 1], L.x(0), L.gap, L, `data-type="stock"`, false);
        // Waste (show top 1)
        h += `<div class="slot" style="left:${L.x(1)}px;top:${L.gap}px;width:${L.cw}px;height:${L.ch}px" data-type="waste"></div>`;
        if (state.waste.length) {
          const idx = state.waste.length - 1;
          h += cardHtml(state.waste[idx], L.x(1), L.gap, L, `data-type="waste" data-i="0" data-idx="${idx}"`, isSel("waste", 0, idx));
        }
        // Foundations
        state.found.forEach((f, i) => {
          h += `<div class="slot found-slot" style="left:${L.x(3 + i)}px;top:${L.gap}px;width:${L.cw}px;height:${L.ch}px" data-type="found" data-i="${i}"><b>${SUITS[i]}</b></div>`;
          if (f.length) h += cardHtml(f[f.length - 1], L.x(3 + i), L.gap, L, `data-type="found" data-i="${i}" data-idx="${f.length - 1}"`, isSel("found", i, f.length - 1));
        });
        // Tableau
        const top0 = L.gap * 2 + L.ch;
        let maxY = top0 + L.ch;
        state.tab.forEach((t, i) => {
          h += `<div class="slot" style="left:${L.x(i)}px;top:${top0}px;width:${L.cw}px;height:${L.ch}px" data-type="tab" data-i="${i}"></div>`;
          let y = top0;
          t.forEach((c, idx) => {
            h += cardHtml(c, L.x(i), y, L, `data-type="tab" data-i="${i}" data-idx="${idx}"`, isSel("tab", i, idx));
            y += c.up ? L.ch * 0.26 : L.ch * 0.1;
          });
          maxY = Math.max(maxY, y + L.ch);
        });
        felt.innerHTML = `<div class="sol-inner" style="height:${maxY + L.gap}px">${h}</div>`;
        updateStatus();
      }

      felt.addEventListener("click", (e) => {
        if (won) return;
        const el = e.target.closest("[data-type]");
        if (!el) { sel = null; render(); return; }
        const type = el.dataset.type, i = +el.dataset.i || 0;
        const idx = el.dataset.idx === undefined ? null : +el.dataset.idx;
        if (type === "stock") { sel = null; drawStock(); render(); return; }
        const pile = pileOf(type, i);
        // Flip a face-down top card.
        if (type === "tab" && idx !== null && idx === pile.length - 1 && !pile[idx].up) {
          save(); pile[idx].up = true; score += 5; sel = null; render(); return;
        }
        if (sel) {
          const dst = { type, i };
          if ((type === "found" || type === "tab") && canMove(sel, dst)) { move(sel, dst); sel = null; render(); return; }
        }
        if (idx !== null && pile[idx] && pile[idx].up) {
          sel = sel && sel.type === type && sel.i === i && sel.idx === idx ? null : { type, i, idx };
        } else sel = null;
        render();
      });
      felt.addEventListener("dblclick", (e) => {
        const el = e.target.closest("[data-idx]");
        if (!el || won) return;
        const src = { type: el.dataset.type, i: +el.dataset.i || 0, idx: +el.dataset.idx };
        if (autoHome(src)) { sel = null; render(); }
      });

      const undo = () => {
        const last = history.pop();
        if (!last) return;
        ({ state, score } = JSON.parse(last));
        sel = null;
        render();
      };
      const autoPlay = () => {
        let moved = true;
        while (moved) {
          moved = false;
          const sources = [{ type: "waste", i: 0, idx: state.waste.length - 1 }, ...state.tab.map((t, i) => ({ type: "tab", i, idx: t.length - 1 }))];
          for (const s of sources) if (s.idx >= 0 && autoHome(s)) { moved = true; break; }
        }
        sel = null;
        render();
      };
      const MENUS = {
        game: [
          { label: "Deal", action: () => { felt.classList.remove("won"); deal(); } },
          { label: "Undo", action: undo },
          { label: "Send all possible cards home", action: autoPlay },
          { sep: true },
          { label: "Exit", action: () => xp.closeWin("solitaire") },
        ],
        help: [{ label: "How to play", action: () => xp.alert("Solitaire", "Build the four foundations (top right) from Ace to King by suit.<br><br>On the tableau, stack cards in descending order, alternating red and black. Only Kings go in empty columns.<br><br>Click the deck to draw a card.", "info") }],
      };
      win.querySelectorAll("[data-menu]").forEach((m) => m.addEventListener("click", (e) => {
        e.stopPropagation();
        const r = m.getBoundingClientRect();
        xp.showMenu(r.left, r.bottom, MENUS[m.dataset.menu]);
      }));

      const ro = new ResizeObserver(() => state && render());
      ro.observe(felt);
      win._cleanup = () => { clearInterval(timer); ro.disconnect(); };
      deal();
    },
  };
});
