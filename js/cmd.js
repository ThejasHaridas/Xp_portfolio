/* Command Prompt — a portfolio terminal. */
(window.XPExt = window.XPExt || []).push((xp) => {
  "use strict";
  const { PROFILE, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, PUBLICATIONS, CERTS, ACHIEVEMENTS } = xp.data;
  const { esc } = xp;

  xp.ICONS.cmd = `<svg viewBox="0 0 48 48"><rect x="4" y="8" width="40" height="32" rx="2" fill="#111" stroke="#666"/><rect x="4" y="8" width="40" height="6" fill="#0b4fd6"/><path d="M10 21l6 4-6 4" stroke="#ddd" stroke-width="2.5" fill="none"/><path d="M19 31h10" stroke="#ddd" stroke-width="2.5"/></svg>`;

  // Things `start`/`open` and `dir` know about.
  const PROGRAMS = {
    about: "about", "about.txt": "about", mycomputer: "about",
    projects: "projects", experience: "experience", skills: "skills", control: "skills",
    resume: "resume", "resume.txt": "resume", notepad: "resume",
    publications: "publications", achievements: "achievements", certs: "achievements",
    contact: "contact", outlook: "contact", msimn: "contact",
    ie: "ie", iexplore: "ie", internet: "ie",
    minesweeper: "minesweeper", winmine: "minesweeper",
    sol: "solitaire", solitaire: "solitaire",
    paint: "paint", mspaint: "paint",
    winamp: "winamp", display: "display", "desk.cpl": "display",
    help: "help", recycle: "recycle",
  };

  const COLORS = ["#000000", "#000080", "#008000", "#008080", "#800000", "#800080", "#808000", "#c0c0c0",
    "#808080", "#0000ff", "#00ff00", "#00ffff", "#ff0000", "#ff00ff", "#ffff00", "#ffffff"];

  const FS = {
    "C:\\Users\\Thejas": [
      ["<DIR>", "Projects"], ["<DIR>", "Experience"], ["<DIR>", "Publications"],
      ["1,024", "About.txt"], ["8,192", "Resume.txt"], ["2,048", "Skills.cpl"], ["512", "Contact.eml"],
    ],
    "C:\\Users\\Thejas\\Projects": PROJECTS.map((p) => ["<DIR>", p.name]),
    "C:\\Users\\Thejas\\Experience": EXPERIENCE.map((x) => ["<DIR>", x.company]),
    "C:\\Users\\Thejas\\Publications": PUBLICATIONS.map((p) => ["4,096", p.title.slice(0, 40) + ".pdf"]),
  };

  const bar = (pct, n = 20) => "[" + "#".repeat(Math.round((pct / 100) * n)).padEnd(n, ".") + "] " + pct + "%";

  xp.APPS.cmd = {
    title: "Command Prompt",
    icon: "cmd",
    size: [680, 440],
    render: () => `<div class="cmd win-body" data-cmd><div class="cmd-out" aria-live="polite"></div><label class="cmd-line"><span class="cmd-prompt"></span><input class="cmd-input" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="Command input" /></label></div>`,
    mount(win) {
      const root = win.querySelector("[data-cmd]");
      const out = root.querySelector(".cmd-out");
      const input = root.querySelector(".cmd-input");
      const promptEl = root.querySelector(".cmd-prompt");
      let cwd = "C:\\Users\\Thejas";
      const history = [];
      let hIdx = 0;

      const setPrompt = () => { promptEl.textContent = cwd + ">"; };
      const print = (text = "", cls = "") => {
        const d = document.createElement("div");
        if (cls) d.className = cls;
        d.textContent = text;
        out.appendChild(d);
      };
      const printHtml = (html) => {
        const d = document.createElement("div");
        d.innerHTML = html;
        out.appendChild(d);
      };
      const scroll = () => { root.scrollTop = root.scrollHeight; };
      const open = (id) => setTimeout(() => xp.openApp(id), 150);

      const COMMANDS = {
        help: {
          desc: "List available commands",
          run() {
            print("For more information on a specific command, just try it :)");
            print("");
            Object.entries(COMMANDS).filter(([, c]) => c.desc).forEach(([name, c]) => print(name.toUpperCase().padEnd(14) + c.desc));
            print("");
            print("Tip: use Tab to autocomplete and the Up/Down arrows for history.", "dim");
          },
        },
        whoami: { desc: "Who is this?", run() { print("featherSoft\\thejas.haridas"); print(`${PROFILE.name} — ${PROFILE.role}`, "hl"); } },
        about: { desc: "Professional summary", run() { print(PROFILE.name.toUpperCase(), "hl"); print(PROFILE.role); print(""); print(PROFILE.summary); } },
        skills: {
          desc: "Skills by category",
          run() {
            SKILLS.forEach((s) => {
              print(s.cat.padEnd(26) + bar(s.level), "hl");
              print("  " + s.items.join(", "));
            });
          },
        },
        projects: {
          desc: "List projects (PROJECTS 1 for details)",
          run(args) {
            const n = parseInt(args[0], 10);
            if (n >= 1 && n <= PROJECTS.length) {
              const p = PROJECTS[n - 1];
              print(p.name, "hl");
              print(p.desc);
              print("");
              print("Pipeline:", "hl");
              p.flow.forEach((f, i) => print(`  ${String(i + 1).padStart(2)}. ${f.t.padEnd(22)} ${f.s || ""}`));
              (p.loops || []).forEach((l) => print(`  ↺  ${l.label}: step ${l.from + 1} → step ${l.to + 1}`, "dim"));
              print("");
              print("Stack: " + p.stack.join(", "));
              print(`Type START PROJECT${n} to open the project folder.`, "dim");
              return;
            }
            PROJECTS.forEach((p, i) => print(`  ${i + 1}. ${p.name.padEnd(36)} ${p.short}`));
            print("");
            print("Type PROJECTS <number> for details.", "dim");
          },
        },
        experience: {
          desc: "Work history",
          run() {
            EXPERIENCE.forEach((x) => {
              print(`${x.title} @ ${x.company}`, "hl");
              print(`  ${x.period} · ${x.place} · ${x.type}`, "dim");
              x.points.forEach((p) => print("  - " + p));
              print("");
            });
          },
        },
        education: { desc: "Degrees", run() { EDUCATION.forEach((e) => { print(`${e.degree} (${e.period})`, "hl"); print("  " + e.school); }); } },
        publications: { desc: "Research papers", run() { PUBLICATIONS.forEach((p) => { print(p.title, "hl"); print(`  ${p.authors} · ${p.venue} · ${p.date}`); }); } },
        certs: {
          desc: "Certifications & achievements",
          run() {
            CERTS.forEach((c) => print(`* ${c.name} — ${c.by} (${c.date})`));
            ACHIEVEMENTS.forEach((a) => print(`* ${a}`));
          },
        },
        contact: {
          desc: "How to reach Thejas",
          run() {
            printHtml(`E-mail   : <a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a>`);
            printHtml(`LinkedIn : <a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener">${esc(PROFILE.linkedin)}</a>`);
            printHtml(`GitHub   : <a href="${esc(PROFILE.github)}" target="_blank" rel="noopener">${esc(PROFILE.github)}</a>`);
            print(`Location : ${PROFILE.location}`);
          },
        },
        resume: { desc: "Open the resume", run() { print("Opening Resume.txt..."); open("resume"); } },
        hire: {
          desc: "Hire Thejas",
          run() {
            print("Checking candidate...");
            print("  LLM pipelines ........ OK", "ok");
            print("  Knowledge graphs ..... OK", "ok");
            print("  Agentic workflows .... OK", "ok");
            print("  Team player .......... OK", "ok");
            print("Excellent choice. Opening a new message...", "hl");
            open("contact");
          },
        },
        start: {
          desc: "Open a program (START PAINT)",
          run(args) {
            const name = (args[0] || "").toLowerCase();
            const id = PROGRAMS[name] || (xp.APPS[name] ? name : null);
            if (!id) { print(`Windows cannot find '${args[0] || ""}'. Try: ${Object.keys(PROGRAMS).slice(0, 12).join(", ")}...`, "err"); return; }
            open(id);
          },
        },
        github: { desc: "Open GitHub profile", run() { print("Opening " + PROFILE.github); window.open(PROFILE.github, "_blank", "noopener"); } },
        linkedin: { desc: "Open LinkedIn profile", run() { print("Opening " + PROFILE.linkedin); window.open(PROFILE.linkedin, "_blank", "noopener"); } },
        dir: {
          desc: "List files in this folder",
          run() {
            const items = FS[cwd] || [];
            print(` Volume in drive C is PORTFOLIO`);
            print(` Directory of ${cwd}`);
            print("");
            const d = new Date().toLocaleDateString();
            if (cwd !== "C:\\Users\\Thejas") print(`${d}  12:00 PM    <DIR>          ..`);
            items.forEach(([size, name]) => print(`${d}  12:00 PM    ${size.padStart(10)}     ${name}`));
            print(`               ${items.length} item(s)`);
          },
        },
        cd: {
          desc: "Change folder",
          run(args) {
            const target = args.join(" ");
            if (!target) { print(cwd); return; }
            if (target === ".." || target === "\\") { cwd = "C:\\Users\\Thejas"; setPrompt(); return; }
            const match = Object.keys(FS).find((k) => k.toLowerCase().endsWith("\\" + target.toLowerCase()));
            if (match && cwd === "C:\\Users\\Thejas") { cwd = match; setPrompt(); return; }
            const project = PROJECTS.findIndex((p) => p.name.toLowerCase().startsWith(target.toLowerCase()));
            if (cwd.endsWith("Projects") && project >= 0) { print(`Opening ${PROJECTS[project].name}...`); open("project" + project); return; }
            print("The system cannot find the path specified.", "err");
          },
        },
        type: {
          desc: "Show a file (TYPE ABOUT.TXT)",
          run(args) {
            const f = (args[0] || "").toLowerCase();
            if (f.startsWith("about")) COMMANDS.about.run([]);
            else if (f.startsWith("resume")) { COMMANDS.about.run([]); print(""); COMMANDS.experience.run([]); COMMANDS.education.run([]); }
            else if (f.startsWith("skills")) COMMANDS.skills.run([]);
            else if (f.startsWith("contact")) COMMANDS.contact.run([]);
            else print("The system cannot find the file specified.", "err");
          },
        },
        tree: {
          desc: "Folder structure",
          run() {
            print("C:\\USERS\\THEJAS");
            Object.keys(FS).slice(1).forEach((k, i, arr) => {
              const last = i === arr.length - 1;
              print((last ? "└───" : "├───") + k.split("\\").pop());
              FS[k].forEach(([, name]) => print((last ? "    " : "│   ") + "    " + name));
            });
          },
        },
        systeminfo: {
          desc: "System information",
          run() {
            const lines = [
              `Host Name:          ${PROFILE.name.toUpperCase()}`,
              `OS Name:            Portfolio XP Professional`,
              `Role:               ${PROFILE.role}`,
              `Location:           ${PROFILE.location}`,
              `Processor(s):       Python, vLLM, LangChain, LangGraph`,
              `Memory:             Neo4j knowledge graph + ChromaDB vector store`,
              `Current Employer:   ${EXPERIENCE[0].company} (${EXPERIENCE[0].period})`,
              `Education:          ${EDUCATION[0].degree}`,
              `Hotfix(s):          UGC NET (Computer Science) qualified`,
              `Uptime:             ${Math.floor(performance.now() / 60000)} min on this page`,
            ];
            lines.forEach((l) => print(l));
          },
        },
        ipconfig: {
          desc: "Network configuration",
          run() {
            print("Windows IP Configuration");
            print("");
            print("Ethernet adapter Career Connection:");
            print("   Connection-specific DNS Suffix  . : github.io");
            print("   IPv4 Address. . . . . . . . . . . : 10.0.0.42 (always learning)");
            print("   Default Gateway . . . . . . . . . : " + PROFILE.email);
          },
        },
        ping: {
          desc: "Ping a host",
          run(args) {
            const host = args[0] || "thejas";
            print(`Pinging ${host} with 32 bytes of data:`);
            for (let i = 0; i < 4; i++) print(`Reply from ${host}: bytes=32 time=${2 + ((Math.random() * 6) | 0)}ms TTL=128`);
            print("Thejas usually replies to e-mail within a day.", "dim");
          },
        },
        date: { desc: "Show the date", run() { print("The current date is: " + new Date().toDateString()); } },
        time: { desc: "Show the time", run() { print("The current time is: " + new Date().toLocaleTimeString()); } },
        ver: { desc: "Version", run() { print("Microsoft Windows XP [Version 5.1.2600] — Thejas Haridas Portfolio Edition"); } },
        echo: { desc: "Print text", run(args) { print(args.join(" ")); } },
        color: {
          desc: "Colours, e.g. COLOR 0A",
          run(args) {
            const v = (args[0] || "07").toLowerCase();
            if (!/^[0-9a-f]{2}$/.test(v) || v[0] === v[1]) { print("Usage: COLOR <bg><fg> using hex digits 0-F, e.g. COLOR 0A", "err"); return; }
            root.style.background = COLORS[parseInt(v[0], 16)];
            root.style.color = COLORS[parseInt(v[1], 16)];
          },
        },
        history: { desc: "Command history", run() { history.forEach((h, i) => print(`${String(i + 1).padStart(3)}  ${h}`)); } },
        cls: { desc: "Clear the screen", run() { out.innerHTML = ""; } },
        matrix: {
          desc: "Follow the white rabbit",
          run() {
            const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
            let n = 0;
            const t = setInterval(() => {
              print(Array.from({ length: 64 }, () => (Math.random() < 0.6 ? chars[(Math.random() * chars.length) | 0] : " ")).join(""), "ok");
              scroll();
              if (++n > 24) { clearInterval(t); print("Wake up, recruiter... type HIRE.", "hl"); scroll(); }
            }, 60);
          },
        },
        sudo: { run() { print("thejas is not in the sudoers file. This incident will be reported. (Try HIRE instead.)", "err"); } },
        exit: { desc: "Close the Command Prompt", run() { xp.closeWin("cmd"); } },
      };
      // Aliases
      Object.assign(COMMANDS, {
        ls: COMMANDS.dir, clear: COMMANDS.cls, cat: COMMANDS.type, open: COMMANDS.start,
        neofetch: COMMANDS.systeminfo, "?": COMMANDS.help, work: COMMANDS.experience, email: COMMANDS.contact,
      });
      // Programs are runnable by name too (e.g. "winmine", "mspaint").
      const runProgram = (name) => { const id = PROGRAMS[name]; if (id) { print(`Starting ${name}...`); open(id); return true; } return false; };

      function exec(line) {
        print(cwd + ">" + line, "echo");
        const trimmed = line.trim();
        if (!trimmed) return;
        history.push(trimmed);
        hIdx = history.length;
        const [cmd, ...args] = trimmed.split(/\s+/);
        const name = cmd.toLowerCase();
        const c = COMMANDS[name];
        if (c) c.run(args);
        else if (!runProgram(name)) print(`'${cmd}' is not recognized as an internal or external command,\noperable program or batch file. Type HELP for a list.`, "err");
        print("");
      }

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          exec(input.value);
          input.value = "";
          scroll();
        } else if (e.key === "ArrowUp") {
          if (hIdx > 0) input.value = history[--hIdx];
          e.preventDefault();
        } else if (e.key === "ArrowDown") {
          hIdx = Math.min(history.length, hIdx + 1);
          input.value = history[hIdx] || "";
          e.preventDefault();
        } else if (e.key === "Tab") {
          e.preventDefault();
          const v = input.value.toLowerCase();
          const hits = Object.keys(COMMANDS).filter((k) => k.startsWith(v));
          if (hits.length === 1) input.value = hits[0] + " ";
          else if (hits.length > 1) { print(hits.join("  "), "dim"); scroll(); }
        } else if (e.key === "l" && e.ctrlKey) {
          e.preventDefault();
          out.innerHTML = "";
        }
      });
      root.addEventListener("mouseup", () => { if (!window.getSelection().toString()) input.focus(); });

      setPrompt();
      print("Microsoft Windows XP [Version 5.1.2600]");
      print("(C) Thejas Haridas. All rights reserved.");
      print("");
      print(`Welcome to ${PROFILE.name}'s portfolio terminal. Type HELP to get started.`, "hl");
      print("");
      setTimeout(() => input.focus(), 50);
    },
  };
});
