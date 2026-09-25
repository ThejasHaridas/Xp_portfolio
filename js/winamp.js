/* Winamp — a tiny chiptune player. All tracks are original and synthesised live with Web Audio. */
(window.XPExt = window.XPExt || []).push((xp) => {
  "use strict";

  xp.ICONS.winamp = `<svg viewBox="0 0 48 48"><path d="M24 4l6 12 14 2-10 10 3 14-13-7-13 7 3-14L4 18l14-2z" fill="#f4ad00" stroke="#8a5a00"/><path d="M16 20l4 10 4-7 4 7 4-10" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/></svg>`;

  // Notation: one token per 16th note. "-" = rest. Notes like C4, F#3, Bb5.
  const TRACKS = [
    {
      title: "Bliss Hills",
      bpm: 116,
      lead: "E5 - G5 - C6 - G5 - E5 - D5 - C5 - D5 - E5 - G5 - A5 - G5 - E5 - - - D5 - E5 - G5 - E5 - D5 - C5 - A4 - C5 - D5 - E5 - D5 - C5 - - - - - - -",
      bass: "C3 - - - C3 - G2 - A2 - - - A2 - E2 - F2 - - - F2 - C3 - G2 - - - G2 - B2 -",
      drums: "k-h-s-h-k-h-s-hh",
      wave: "square",
    },
    {
      title: "Neural Groove",
      bpm: 126,
      lead: "A4 - C5 - E5 - A5 - G5 - E5 - D5 - E5 - C5 - - - D5 - E5 - G5 - E5 - D5 - C5 - B4 - A4 - - - E5 - D5 - C5 - B4 - G4 - A4 - - - - - - -",
      bass: "A2 - A2 A3 A2 - A2 A3 F2 - F2 F3 F2 - F2 F3 C3 - C3 C4 C3 - C3 C4 G2 - G2 G3 G2 - B2 G2",
      drums: "k-hsk-h-k-hsk-hh",
      wave: "square",
    },
    {
      title: "Vector Store Blues",
      bpm: 96,
      lead: "E4 - G4 - A4 - Bb4 A4 G4 - E4 - - - D4 - E4 - - - G4 - A4 - C5 - A4 - G4 - E4 - - - - - - - B4 - A4 - G4 - E4 - D4 - E4 - - - - - - -",
      bass: "E2 - G#2 - B2 - C#3 - D3 - C#3 - B2 - G#2 - A2 - C#3 - E3 - F#3 - G3 - F#3 - E3 - C#3 -",
      drums: "k--hs-h-k-kh s-h-",
      wave: "triangle",
    },
    {
      title: "Kochi Sunset",
      bpm: 88,
      lead: "D5 - - - F#5 - A5 - - - B5 - A5 - F#5 - E5 - - - - - D5 - E5 - F#5 - - - A5 - F#5 - E5 - D5 - - - B4 - - - D5 - - - - - - - - - - -",
      bass: "D3 - - - A2 - - - B2 - - - F#2 - - - G2 - - - D3 - - - G2 - - - A2 - - -",
      drums: "k-h-h-h-s-h-h-hk",
      wave: "triangle",
    },
  ];
  const LOOPS = 6; // pattern repetitions per track

  const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const toMidi = (t) => {
    const m = /^([A-G])([#b]?)(\d)$/.exec(t);
    if (!m) return null;
    return 12 * (+m[3] + 1) + NOTE[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
  };
  const parse = (s) => s.trim().split(/\s+/).map((t) => (t === "-" ? null : toMidi(t)));
  const freq = (n) => 440 * Math.pow(2, (n - 69) / 12);
  TRACKS.forEach((t) => {
    t.leadSteps = parse(t.lead);
    t.bassSteps = parse(t.bass);
    t.stepDur = 60 / t.bpm / 4;
    t.totalSteps = t.leadSteps.length * LOOPS;
    t.duration = t.totalSteps * t.stepDur;
  });
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  xp.APPS.winamp = {
    title: "Winamp",
    icon: "winamp",
    size: [340, null],
    resizable: false,
    render: () => `
      <div class="winamp win-body flat">
        <div class="wa-main">
          <div class="wa-left">
            <div class="wa-state" data-state>■</div>
            <div class="wa-time" data-time>0:00</div>
            <canvas class="wa-viz" width="152" height="36"></canvas>
          </div>
          <div class="wa-right">
            <div class="wa-marquee"><span data-title>Winamp — press play</span></div>
            <div class="wa-meta"><b>128</b> kbps <b>44</b> kHz <span class="wa-stereo">stereo</span></div>
            <label class="wa-vol">VOL <input type="range" min="0" max="100" value="70" data-vol aria-label="Volume"></label>
          </div>
        </div>
        <div class="wa-seek"><i data-progress></i></div>
        <div class="wa-controls">
          <button data-act="prev" title="Previous">⏮</button><button data-act="play" title="Play">▶</button><button data-act="pause" title="Pause">⏸</button><button data-act="stop" title="Stop">⏹</button><button data-act="next" title="Next">⏭</button>
          <span class="wa-logo">⚡ WINAMP</span>
        </div>
        <ol class="wa-playlist" data-list>
          ${TRACKS.map((t, i) => `<li data-track="${i}"><span>${i + 1}. Thejas Haridas — ${t.title}</span><span>${fmt(t.duration)}</span></li>`).join("")}
        </ol>
      </div>`,
    mount(win) {
      const $ = (s) => win.querySelector(s);
      const viz = $(".wa-viz"), vctx = viz.getContext("2d");
      const timeEl = $("[data-time]"), titleEl = $("[data-title]"), stateEl = $("[data-state]"), progress = $("[data-progress]");
      let cur = 0, step = 0, playing = false, nextTime = 0, sched = null, raf = null;
      let ctx = null, out = null, analyser = null, noise = null;

      function ensureAudio() {
        if (ctx) return true;
        ctx = window.XPSound?.context();
        const master = window.XPSound?.output();
        if (!ctx || !master) return false;
        out = ctx.createGain();
        out.gain.value = $("[data-vol]").value / 100 * 0.5;
        analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        out.connect(analyser);
        analyser.connect(master);
        noise = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
        const d = noise.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        return true;
      }

      function note(n, t, dur, type, vol) {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type;
        o.frequency.value = freq(n);
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(g); g.connect(out);
        o.start(t); o.stop(t + dur + 0.02);
      }
      function drum(kind, t) {
        if (kind === "k") {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.frequency.setValueAtTime(150, t);
          o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
          g.gain.setValueAtTime(0.5, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
          o.connect(g); g.connect(out);
          o.start(t); o.stop(t + 0.16);
        } else {
          const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
          src.buffer = noise;
          f.type = kind === "h" ? "highpass" : "bandpass";
          f.frequency.value = kind === "h" ? 7000 : 1800;
          g.gain.setValueAtTime(kind === "h" ? 0.08 : 0.22, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + (kind === "h" ? 0.04 : 0.12));
          src.connect(f); f.connect(g); g.connect(out);
          src.start(t); src.stop(t + 0.15);
        }
      }

      function schedule() {
        const t = TRACKS[cur];
        while (nextTime < ctx.currentTime + 0.12) {
          if (step >= t.totalSteps) { next(true); return; }
          const L = t.leadSteps[step % t.leadSteps.length];
          const B = t.bassSteps[step % t.bassSteps.length];
          const D = t.drums[step % t.drums.length];
          if (L !== null && L !== undefined) note(L, nextTime, t.stepDur * 1.8, t.wave, 0.12);
          if (B !== null && B !== undefined) note(B, nextTime, t.stepDur * 1.5, "triangle", 0.28);
          if (D && D !== "-" && D !== " ") drum(D, nextTime);
          nextTime += t.stepDur;
          step++;
        }
      }

      function drawViz() {
        vctx.fillStyle = "#000";
        vctx.fillRect(0, 0, viz.width, viz.height);
        const bars = 19, bw = viz.width / bars;
        const data = new Uint8Array(analyser ? analyser.frequencyBinCount : 32);
        if (analyser && playing) analyser.getByteFrequencyData(data);
        for (let i = 0; i < bars; i++) {
          const v = (data[i + 1] || 0) / 255;
          const h = Math.max(1, v * viz.height);
          const grad = vctx.createLinearGradient(0, viz.height, 0, 0);
          grad.addColorStop(0, "#00c000");
          grad.addColorStop(0.6, "#e8e800");
          grad.addColorStop(1, "#e00000");
          vctx.fillStyle = grad;
          vctx.fillRect(i * bw + 1, viz.height - h, bw - 2, h);
        }
        const t = TRACKS[cur];
        const elapsed = Math.min(step * t.stepDur, t.duration);
        timeEl.textContent = fmt(elapsed);
        progress.style.width = (elapsed / t.duration) * 100 + "%";
        if (playing) raf = requestAnimationFrame(drawViz);
      }

      function highlight() {
        win.querySelectorAll("[data-track]").forEach((li) => li.classList.toggle("on", +li.dataset.track === cur));
        titleEl.textContent = `${cur + 1}. Thejas Haridas — ${TRACKS[cur].title} (${fmt(TRACKS[cur].duration)}) *** `;
      }

      function play() {
        if (!ensureAudio()) { xp.alert("Winamp", "Your browser does not support Web Audio.", "warning"); return; }
        if (window.XPSound.muted) titleEl.textContent = "Sound is muted — click the speaker in the tray";
        if (playing) return;
        playing = true;
        nextTime = ctx.currentTime + 0.05;
        sched = setInterval(schedule, 25);
        stateEl.textContent = "▶";
        win.classList.add("wa-playing");
        if (!window.XPSound.muted) highlight();
        cancelAnimationFrame(raf);
        drawViz();
      }
      function pause() {
        playing = false;
        clearInterval(sched);
        cancelAnimationFrame(raf);
        stateEl.textContent = "❚❚";
        win.classList.remove("wa-playing");
      }
      function stop() {
        pause();
        step = 0;
        stateEl.textContent = "■";
        drawViz();
      }
      function next(auto) {
        const was = playing || auto;
        stop();
        cur = (cur + 1) % TRACKS.length;
        highlight();
        if (was) play();
      }
      function prev() {
        const was = playing;
        stop();
        cur = (cur - 1 + TRACKS.length) % TRACKS.length;
        highlight();
        if (was) play();
      }

      const ACTIONS = { play, pause: () => (playing ? pause() : play()), stop, next: () => next(false), prev };
      win.querySelector(".wa-controls").addEventListener("click", (e) => {
        const b = e.target.closest("[data-act]");
        if (b) ACTIONS[b.dataset.act]();
      });
      $("[data-list]").addEventListener("dblclick", (e) => {
        const li = e.target.closest("[data-track]");
        if (!li) return;
        stop(); cur = +li.dataset.track; highlight(); play();
      });
      $("[data-list]").addEventListener("click", (e) => {
        const li = e.target.closest("[data-track]");
        if (li && xp.isMobile()) { stop(); cur = +li.dataset.track; highlight(); play(); }
      });
      $("[data-vol]").addEventListener("input", (e) => { if (out) out.gain.value = (e.target.value / 100) * 0.5; });

      win._cleanup = () => {
        pause();
        if (out) { out.disconnect(); analyser.disconnect(); }
      };
      highlight();
      drawViz();
    },
  };
});
