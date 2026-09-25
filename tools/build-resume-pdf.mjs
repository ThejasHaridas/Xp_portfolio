// Builds assets/Thejas_Haridas_Resume.pdf from the same data the site uses (script.js).
// The public PDF deliberately leaves out the phone number.
// Usage: npm i -D playwright && node tools/build-resume-pdf.mjs
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  ({ chromium } = await import(process.env.PLAYWRIGHT_MODULE || "/opt/node22/lib/node_modules/playwright/index.mjs"));
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "assets", "Thejas_Haridas_Resume.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.join(root, "index.html")).href);
const data = await page.evaluate(() => window.XP.data);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const { PROFILE, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, PUBLICATIONS, CERTS, ACHIEVEMENTS } = data;
const host = (u) => u.replace(/^https?:\/\//, "");

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 14mm 15mm; }
  body { font: 10pt/1.42 "Segoe UI", Tahoma, Arial, sans-serif; color: #1a1a1a; margin: 0; }
  h1 { font-size: 22pt; margin: 0; letter-spacing: .5px; color: #0b3a9e; }
  .role { font-size: 11pt; font-weight: 600; color: #444; margin: 2px 0 4px; }
  .contact { font-size: 9pt; color: #333; }
  .contact a { color: #0b3a9e; text-decoration: none; }
  h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 1px; color: #0b3a9e; border-bottom: 1.5px solid #0b3a9e; padding-bottom: 2px; margin: 14px 0 6px; }
  .row { display: flex; justify-content: space-between; gap: 12px; }
  .row b { font-size: 10.5pt; }
  .muted { color: #555; font-size: 9pt; }
  ul { margin: 3px 0 8px; padding-left: 16px; }
  li { margin: 1.5px 0; }
  .item { break-inside: avoid; margin-bottom: 6px; }
  .skills div { margin: 2px 0; }
  .flow { color: #555; font-size: 8.5pt; margin-top: 2px; }
</style></head><body>
  <h1>${esc(PROFILE.name.toUpperCase())}</h1>
  <div class="role">${esc(PROFILE.role)}</div>
  <div class="contact">${esc(PROFILE.location)} &nbsp;|&nbsp; <a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a> &nbsp;|&nbsp;
    <a href="${esc(PROFILE.linkedin)}">${esc(host(PROFILE.linkedin))}</a> &nbsp;|&nbsp; <a href="${esc(PROFILE.github)}">${esc(host(PROFILE.github))}</a></div>

  <h2>Professional Summary</h2>
  <p style="margin:0">${esc(PROFILE.summary)}</p>

  <h2>Experience</h2>
  ${EXPERIENCE.map((x) => `<div class="item">
    <div class="row"><b>${esc(x.title)}</b><span class="muted">${esc(x.period)}</span></div>
    <div class="muted">${esc(x.company)}, ${esc(x.place)} (${esc(x.type)})</div>
    <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>`).join("")}

  <h2>Skills</h2>
  <div class="skills">${SKILLS.map((s) => `<div><b>${esc(s.cat)}:</b> ${esc(s.items.join(", "))}</div>`).join("")}</div>

  <h2>Projects</h2>
  ${PROJECTS.map((p, i) => `<div class="item"><b>${i + 1}. ${esc(p.name)}</b> <span class="muted">(${esc(p.short)})</span>
    <div>${esc(p.desc)}</div>
    <div class="flow">Pipeline: ${esc(p.flow.map((f) => f.t).join(" → "))}</div></div>`).join("")}

  <h2>Education</h2>
  ${EDUCATION.map((e) => `<div class="item"><div class="row"><b>${esc(e.degree)}</b><span class="muted">${esc(e.period)}</span></div><div class="muted">${esc(e.school)}</div></div>`).join("")}

  <h2>Publications</h2>
  <ul>${PUBLICATIONS.map((p) => `<li>${esc(p.authors)}, “${esc(p.title)},” <i>${esc(p.venue)}</i>, ${esc(p.date)}.</li>`).join("")}</ul>

  <h2>Certifications</h2>
  <ul>${CERTS.map((c) => `<li>${esc(c.name)} – ${esc(c.by)} (${esc(c.date)})</li>`).join("")}</ul>

  <h2>Achievements</h2>
  <ul>${ACHIEVEMENTS.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
</body></html>`;

await page.setContent(html, { waitUntil: "load" });
await page.pdf({ path: out, format: "A4", printBackground: true });
await browser.close();
console.log("Wrote", path.relative(root, out));
