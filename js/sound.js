/* Synthesised XP-style system sounds (Web Audio, no audio files). */
window.XPSound = (() => {
  "use strict";
  let ctx = null, master = null;
  let muted = false;
  try { muted = localStorage.getItem("xp.muted") === "true"; } catch { /* ignore */ }

  function ac() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.6;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

  function tone(freq, start, dur, { type = "sine", vol = 0.2, attack = 0.01, detune = 0, to = null } = {}) {
    const c = ac();
    if (!c) return;
    const t0 = c.currentTime + start;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    o.detune.value = detune;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g);
    g.connect(master);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  }

  const SOUNDS = {
    startup() {
      tone(midi(51), 0, 3.2, { type: "sine", vol: 0.14, attack: 0.4 });
      [63, 70, 75, 79].forEach((n, i) => {
        tone(midi(n), i * 0.2, 2.8 - i * 0.2, { type: "triangle", vol: 0.1, attack: 0.08 });
        tone(midi(n), i * 0.2, 2.8 - i * 0.2, { type: "sine", vol: 0.06, attack: 0.12, detune: 8 });
      });
      tone(midi(82), 0.95, 2, { type: "sine", vol: 0.06, attack: 0.05 });
      tone(midi(87), 1.25, 1.6, { type: "sine", vol: 0.04, attack: 0.05 });
    },
    logoff() {
      [82, 79, 75, 70, 63].forEach((n, i) => tone(midi(n), i * 0.16, 1.3, { type: "triangle", vol: 0.1, attack: 0.03 }));
    },
    shutdown() {
      [79, 75, 72, 67, 63, 55].forEach((n, i) => tone(midi(n), i * 0.22, 1.6, { type: "sine", vol: 0.12, attack: 0.05 }));
    },
    error() {
      tone(midi(76), 0, 0.35, { type: "triangle", vol: 0.2 });
      tone(midi(69), 0.12, 0.55, { type: "triangle", vol: 0.2 });
    },
    ding() {
      tone(midi(84), 0, 0.7, { vol: 0.16 });
      tone(midi(91), 0, 0.45, { vol: 0.05 });
    },
    balloon() {
      tone(midi(79), 0, 0.18, { vol: 0.12 });
      tone(midi(86), 0.09, 0.35, { vol: 0.1 });
    },
    minimize() { tone(900, 0, 0.12, { type: "sine", vol: 0.06, to: 350 }); },
    restore() { tone(350, 0, 0.12, { type: "sine", vol: 0.06, to: 900 }); },
    click() { tone(1600, 0, 0.03, { type: "square", vol: 0.025 }); },
  };

  return {
    play(name) {
      if (muted) return;
      try { SOUNDS[name]?.(); } catch { /* audio unavailable */ }
    },
    get muted() { return muted; },
    setMuted(m) {
      muted = !!m;
      try { localStorage.setItem("xp.muted", String(muted)); } catch { /* ignore */ }
      if (master) master.gain.value = muted ? 0 : 0.6;
    },
    /** Output node for other audio (Winamp). Respects mute. */
    output() { return ac() ? master : null; },
    context() { return ac(); },
  };
})();
