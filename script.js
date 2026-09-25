/* ==========================================================
   Windows XP inspired portfolio — Thejas Haridas
   ========================================================== */
(() => {
  "use strict";

  /* ---------------- Profile data ---------------- */
  const PROFILE = {
    name: "Thejas Haridas",
    role: "AI/ML Engineer | Data Scientist",
    location: "Kochi, Kerala, India",
    email: "thejasharidas@gmail.com",
    linkedin: "https://linkedin.com/in/thejas-haridas",
    github: "https://github.com/thejas-haridas",
    resumePdf: "assets/Thejas_Haridas_Resume.pdf",
    summary:
      "AI/ML Engineer with hands-on experience building production LLM pipelines, biomedical knowledge graphs, and document intelligence systems. Specialises in LLM orchestration (vLLM, LangChain, LangGraph), agentic workflows, and graph-based knowledge representation with Neo4j. Adept at engineering robust extraction pipelines with self-correction loops, retry logic, and structured prompt systems for regulated, data-intensive domains.",
  };

  const EXPERIENCE = [
    {
      title: "Junior AI/ML Engineer",
      company: "FeatherSoft",
      place: "Kochi, Kerala",
      type: "Full-time",
      period: "Sep 2025 – Present",
      points: [
        "Built a multi-stage LLM pipeline to extract structured data from clinical toxicology PDFs using a locally hosted vision model (Qwen via vLLM), processing rasterised document pages into structured JSON and Excel outputs.",
        "Designed and maintained a biomedical knowledge graph in Neo4j using the Biolink ontology, enabling semantic querying across preclinical research entities with full-text Lucene search and input sanitisation.",
        "Engineered structured XML prompt systems (extraction, structure detection, row-fill, Excel code generation) with self-correction loops, retry logic, and layered JSON repair fallbacks to handle model inconsistencies at scale.",
        "Developed Python tooling for automated report generation from multi-report PDFs with page-offset tracking, sex-split appendix handling, and openpyxl-based Excel output.",
      ],
    },
    {
      title: "Trainee Data Scientist",
      company: "Tyloones Software Private Limited",
      place: "Noida",
      type: "Apprenticeship",
      period: "Jan 2025 – Jul 2025",
      points: [
        "Built LangChain-based data pipelines integrating SQL Server backends for structured data retrieval and downstream ML workflows.",
        "Developed time series forecasting models and FastAPI microservices to expose ML predictions via REST endpoints.",
        "Worked on data engineering tasks including ingestion, transformation, and validation pipelines for business analytics.",
      ],
    },
    {
      title: "Research and Development Intern",
      company: "Digital University Kerala",
      place: "Thiruvananthapuram",
      type: "Internship",
      period: "May 2024 – Dec 2024",
      points: [
        "Developed OCR-based document processing workflows using Label Studio for annotation and Python for post-processing.",
        "Contributed to ML research involving image processing and optical character recognition for regional language documents.",
      ],
    },
  ];

  const PROJECTS = [
    {
      name: "Clinical PDF Extraction Pipeline",
      stack: ["vLLM", "Qwen Vision", "Python", "openpyxl", "JSON repair"],
      short: "vLLM + Qwen vision model",
      flow: [
        { t: "Clinical PDF", s: "Toxicology reports", k: "io" },
        { t: "Rasterise pages", s: "PDF → page images", k: "proc" },
        { t: "Qwen VL via vLLM", s: "Locally hosted model", k: "model" },
        { t: "Table detection", s: "Phase 1", k: "proc" },
        { t: "Structure consensus", s: "Phase 2", k: "proc" },
        { t: "Row fill", s: "Phase 3 · XML prompts", k: "model" },
        { t: "JSON repair", s: "Layered fallbacks", k: "guard" },
        { t: "Validation", s: "Retry logic", k: "guard" },
        { t: "JSON + Excel", s: "openpyxl output", k: "io" },
      ],
      loops: [{ from: 7, to: 6, label: "self-correction loop" }],
      highlights: [
        "Multi-phase extraction: table detection → structure consensus → row fill.",
        "Self-correction loops and retry logic absorb model inconsistencies at scale.",
        "Layered JSON repair fallbacks keep the pipeline from failing on malformed output.",
        "Structured JSON and Excel deliverables generated with openpyxl.",
      ],
      desc: "End-to-end pipeline that rasterises clinical toxicology PDF pages, sends them to a locally hosted Qwen vision model via vLLM, and extracts structured hematology/TK tables into JSON and Excel. Features multi-phase extraction (table detection → structure consensus → row fill), self-correction loops, and layered JSON repair fallbacks.",
    },
    {
      name: "Biomedical Knowledge Graph",
      stack: ["Neo4j", "Biolink", "Lucene", "Python", "YAML"],
      short: "Neo4j + Biolink ontology",
      flow: [
        { t: "Preclinical data", s: "Research entities", k: "io" },
        { t: "YAML config", s: "Pipeline settings", k: "proc" },
        { t: "Biolink mapping", s: "Ontology alignment", k: "model" },
        { t: "Neo4j graph", s: "Nodes + relationships", k: "db" },
        { t: "Lucene index", s: "Full-text search", k: "db" },
        { t: "Input sanitisation", s: "Safe queries", k: "guard" },
        { t: "Python query API", s: "Query interface", k: "proc" },
        { t: "Semantic retrieval", s: "Entities + context", k: "io" },
      ],
      highlights: [
        "Biolink ontology gives preclinical entities a standard, queryable schema.",
        "Full-text Lucene indexing with input sanitisation for safe search.",
        "YAML-driven configuration keeps the pipeline reproducible.",
        "Python query interface for semantic entity retrieval.",
      ],
      desc: "Knowledge graph system for preclinical research data using Neo4j and the Biolink ontology. Implemented full-text Lucene indexing with input sanitisation, YAML-based configuration, and a Python query interface for semantic entity retrieval.",
    },
    {
      name: "Alcohol Sales Prediction",
      stack: ["FastText", "BiGRU", "Self-Attention", "SHAP", "TensorFlow"],
      short: "FastText + BiGRU + Attention",
      flow: [
        { t: "Sales text data", s: "Raw records", k: "io" },
        { t: "Preprocessing", s: "Clean + tokenise", k: "proc" },
        { t: "FastText", s: "Word embeddings", k: "model" },
        { t: "BiGRU layers", s: "Sequence encoder", k: "model" },
        { t: "Self-attention", s: "Weighted context", k: "model" },
        { t: "Dense head", s: "Classifier", k: "proc" },
        { t: "Prediction", s: "Sales forecast", k: "io" },
        { t: "SHAP analysis", s: "Explainability", k: "guard" },
      ],
      highlights: [
        "FastText embeddings feed bidirectional GRU layers.",
        "Self-attention highlights the most informative tokens.",
        "SHAP explainability for model interpretability in a regulated context.",
      ],
      desc: "Text classification pipeline using FastText embeddings, BiGRU layers, and a self-attention mechanism for sales forecasting. Included SHAP-based explainability analysis for model interpretability in a regulated context.",
    },
  ];

  const SKILLS = [
    { cat: "Programming & Libraries", icon: "code", level: 92, items: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "FastAPI", "LangChain", "LangGraph", "Deep Agents", "openpyxl", "SQL", "PySpark", "OpenCV"] },
    { cat: "AI / LLM", icon: "brain", level: 90, items: ["vLLM", "Qwen Vision Models", "Prompt Engineering (XML / CoT)", "RAG", "AI Agents", "Agentic Workflows", "Self-Correction Loops"] },
    { cat: "Databases & Graph", icon: "db", level: 82, items: ["Neo4j", "Biolink ontology", "Lucene full-text search", "Microsoft SQL Server", "ChromaDB", "Vector Stores"] },
    { cat: "Infrastructure & Tools", icon: "tools", level: 78, items: ["Docker", "FastAPI", "Git", "Label Studio", "Streamlit", "Matplotlib", "Power BI"] },
    { cat: "Soft Skills", icon: "users", level: 88, items: ["Problem-solving", "Analytical Thinking", "Collaboration", "Continuous Learning"] },
  ];

  const EDUCATION = [
    { degree: "M.Sc. Computer Science (Data Analytics)", school: "Kerala University of Digital Sciences, Innovation and Technology (Digital University Kerala)", period: "2023 – 2025" },
    { degree: "B.Sc. Physics", school: "Kerala University", period: "Graduated 2023" },
  ];

  const PUBLICATIONS = [
    { title: "Chaos-based Audio Encryption: A Comparative Study", venue: "Franklin Open (Elsevier)", date: "September 2024", authors: "Thejas Haridas et al.", url: "https://www.sciencedirect.com/search?qs=Chaos-based%20Audio%20Encryption%3A%20A%20Comparative%20Study" },
  ];

  const CERTS = [
    { name: "Neo4j Fundamentals", by: "Neo4j", date: "Sep 2024" },
    { name: "Google Cloud Career Launchpad — Data Analytics Track", by: "Google Cloud", date: "Jun 2024" },
  ];

  const ACHIEVEMENTS = [
    "First author on a peer-reviewed publication (Franklin Open, Elsevier) at postgraduate level.",
    "Qualified UGC NET in Computer Science.",
  ];

  /* ---------------- Icons (inline SVG) ---------------- */
  const ICONS = {
    computer: `<svg viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="26" rx="2" fill="#dfe6f2" stroke="#44546a"/><rect x="9" y="9" width="30" height="20" fill="url(#g-scr)"/><path d="M18 32h12l2 6H16z" fill="#b8c2d2" stroke="#44546a"/><rect x="10" y="38" width="28" height="4" rx="1" fill="#cfd7e4" stroke="#44546a"/><defs><linearGradient id="g-scr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d86e8"/><stop offset=".7" stop-color="#9fd0fa"/><stop offset=".7" stop-color="#5aad2e"/></linearGradient></defs></svg>`,
    folder: `<svg viewBox="0 0 48 48"><path d="M4 12a2 2 0 0 1 2-2h12l4 4h20a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="#e8b93a" stroke="#a87b12"/><path d="M4 18h40v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="#fcd964" stroke="#a87b12"/></svg>`,
    docs: `<svg viewBox="0 0 48 48"><path d="M4 12a2 2 0 0 1 2-2h12l4 4h20a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="#e8b93a" stroke="#a87b12"/><rect x="12" y="8" width="20" height="22" fill="#fff" stroke="#888"/><path d="M15 13h14M15 17h14M15 21h10" stroke="#4a78d6"/><path d="M4 20h40v18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="#fcd964" stroke="#a87b12"/></svg>`,
    briefcase: `<svg viewBox="0 0 48 48"><rect x="17" y="8" width="14" height="8" rx="2" fill="none" stroke="#6b4a1e" stroke-width="3"/><rect x="5" y="14" width="38" height="26" rx="3" fill="#b5793a" stroke="#6b4a1e"/><rect x="5" y="22" width="38" height="3" fill="#8f5a24"/><rect x="21" y="20" width="6" height="7" rx="1" fill="#f5d06b" stroke="#6b4a1e"/></svg>`,
    control: `<svg viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="3" fill="#dfe8f7" stroke="#3a64b8"/><circle cx="17" cy="17" r="6" fill="#4ea40f"/><rect x="26" y="12" width="12" height="10" fill="#f4ad00"/><path d="M11 36l7-9 5 6 4-4 9 7z" fill="#1060e0"/><circle cx="34" cy="32" r="0"/></svg>`,
    notepad: `<svg viewBox="0 0 48 48"><rect x="9" y="6" width="30" height="36" fill="#fff" stroke="#5a6f8a"/><rect x="9" y="6" width="30" height="6" fill="#6b9be6"/><path d="M13 17h22M13 22h22M13 27h22M13 32h16M13 37h20" stroke="#9bb0cc"/><circle cx="14" cy="9" r="1.2" fill="#fff"/><circle cx="19" cy="9" r="1.2" fill="#fff"/></svg>`,
    mail: `<svg viewBox="0 0 48 48"><rect x="5" y="12" width="38" height="26" rx="2" fill="#f7f7f7" stroke="#5a6f8a"/><path d="M5 13l19 14 19-14" fill="none" stroke="#5a6f8a" stroke-width="2"/><circle cx="36" cy="34" r="9" fill="#1a9df1" stroke="#0b5fae"/><path d="M31 34h10M36 29v10" stroke="#fff" stroke-width="2.5"/></svg>`,
    ie: `<svg viewBox="0 0 48 48"><circle cx="24" cy="25" r="14" fill="none" stroke="#1a6fd8" stroke-width="7"/><path d="M12 25h26" stroke="#1a6fd8" stroke-width="6"/><path d="M38 21H18" stroke="#fff" stroke-width="0"/><path d="M4 30C8 12 34 4 44 10c3 3-2 12-10 18" fill="none" stroke="#f4ad00" stroke-width="3"/></svg>`,
    book: `<svg viewBox="0 0 48 48"><path d="M8 8h26a4 4 0 0 1 4 4v28H12a4 4 0 0 1-4-4z" fill="#2b62c7" stroke="#163a80"/><path d="M12 36h26v4H12a2 2 0 0 1 0-4z" fill="#fff" stroke="#163a80"/><path d="M15 14h16M15 19h12" stroke="#cfe0ff" stroke-width="2"/></svg>`,
    trophy: `<svg viewBox="0 0 48 48"><path d="M14 6h20v10a10 10 0 0 1-20 0z" fill="#f5c525" stroke="#a67c00"/><path d="M14 10H7c0 7 4 10 8 10M34 10h7c0 7-4 10-8 10" fill="none" stroke="#a67c00" stroke-width="2"/><rect x="21" y="26" width="6" height="8" fill="#e0ad10"/><rect x="14" y="34" width="20" height="6" rx="1" fill="#8b5a2b" stroke="#5a3a18"/></svg>`,
    mine: `<svg viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" fill="#c0c0c0" stroke="#808080"/><circle cx="24" cy="24" r="10" fill="#000"/><path d="M24 9v30M9 24h30M13 13l22 22M35 13L13 35" stroke="#000" stroke-width="3"/><rect x="19" y="19" width="4" height="4" fill="#fff"/></svg>`,
    recycle: `<svg viewBox="0 0 48 48"><path d="M12 14h24l-3 28H15z" fill="#dce9f7" stroke="#5a7aa6"/><ellipse cx="24" cy="14" rx="13" ry="3" fill="#eef4fb" stroke="#5a7aa6"/><path d="M19 22l3 5h-6zM28 22l3 5h-6zM21 33h6" stroke="#2d9a18" stroke-width="2" fill="none"/></svg>`,
    github: `<svg viewBox="0 0 24 24"><path fill="#24292f" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#0a66c2"/><path fill="#fff" d="M5.3 9.2h2.9V19H5.3zM6.8 4.6a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10 9.2h2.8v1.3c.4-.8 1.4-1.6 2.9-1.6 3 0 3.6 2 3.6 4.6V19h-2.9v-4.8c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V19H10z"/></svg>`,
    at: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#f4ad00"/><path d="M4 7l8 6 8-6" stroke="#fff" stroke-width="2" fill="none"/><rect x="4" y="6" width="16" height="12" fill="none" stroke="#fff" stroke-width="2"/></svg>`,
    pdf: `<svg viewBox="0 0 48 48"><path d="M10 4h20l10 10v30H10z" fill="#fff" stroke="#888"/><path d="M30 4v10h10" fill="#e8e8e8" stroke="#888"/><rect x="6" y="24" width="28" height="12" rx="2" fill="#d4201c"/><text x="20" y="33" font-size="9" font-family="Arial" font-weight="bold" fill="#fff" text-anchor="middle">PDF</text></svg>`,
    info: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#2b6fe0" stroke="#15439a"/><circle cx="24" cy="14" r="3" fill="#fff"/><rect x="21" y="20" width="6" height="16" rx="2" fill="#fff"/></svg>`,
    code: `<svg viewBox="0 0 48 48"><rect x="4" y="8" width="40" height="32" rx="2" fill="#1e1e1e" stroke="#555"/><path d="M16 18l-6 6 6 6M32 18l6 6-6 6M27 15l-6 18" stroke="#5ac8fa" stroke-width="2.5" fill="none"/></svg>`,
    brain: `<svg viewBox="0 0 48 48"><path d="M24 8c-4-4-12-2-12 4-5 1-7 7-4 11-3 4 0 10 5 10 1 5 8 7 11 3 3 4 10 2 11-3 5 0 8-6 5-10 3-4 1-10-4-11 0-6-8-8-12-4z" fill="#f7a8c4" stroke="#b0476f"/><path d="M24 9v30M17 16c3 1 4 4 3 7M31 16c-3 1-4 4-3 7M15 28c3-1 6 0 7 3M33 28c-3-1-6 0-7 3" stroke="#b0476f" fill="none"/></svg>`,
    db: `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="10" rx="15" ry="5" fill="#9ec3f5" stroke="#2a5aa8"/><path d="M9 10v28c0 3 7 5 15 5s15-2 15-5V10" fill="#6c9fe8" stroke="#2a5aa8"/><path d="M9 20c0 3 7 5 15 5s15-2 15-5M9 29c0 3 7 5 15 5s15-2 15-5" fill="none" stroke="#2a5aa8"/></svg>`,
    tools: `<svg viewBox="0 0 48 48"><path d="M30 6a10 10 0 0 0-9 13L6 34a4 4 0 0 0 6 6l15-15a10 10 0 0 0 13-9l-6 4-6-3-1-6z" fill="#9aa7b8" stroke="#4a5566"/><circle cx="9" cy="37" r="1.5" fill="#fff"/></svg>`,
    users: `<svg viewBox="0 0 48 48"><circle cx="17" cy="16" r="7" fill="#f0c090" stroke="#8a5a2b"/><path d="M4 40c0-8 6-13 13-13s13 5 13 13z" fill="#3a7be0" stroke="#1d4ea7"/><circle cx="33" cy="18" r="6" fill="#f0c090" stroke="#8a5a2b"/><path d="M26 40c1-9 4-12 9-12 6 0 9 5 9 12z" fill="#4ea40f" stroke="#2d6b08"/></svg>`,
    warning: `<svg viewBox="0 0 48 48"><path d="M24 4l21 38H3z" fill="#f7c948" stroke="#a67c00"/><rect x="22" y="16" width="4" height="14" fill="#000"/><rect x="22" y="33" width="4" height="4" fill="#000"/></svg>`,
    help: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#2b6fe0" stroke="#15439a"/><text x="24" y="32" font-size="24" font-family="Arial" font-weight="bold" fill="#fff" text-anchor="middle">?</text></svg>`,
    search: `<svg viewBox="0 0 48 48"><circle cx="20" cy="20" r="12" fill="#cfe6ff" stroke="#2a5aa8" stroke-width="4"/><path d="M29 29l12 12" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/></svg>`,
  };
  const icon = (k) => ICONS[k] || ICONS.folder;

  /* ---------------- Helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tags = (arr) => arr.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  const isMobile = () => window.innerWidth <= 700;

  const explorerChrome = (address, addrIcon) => `
    <div class="menubar"><span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span></div>
    <div class="toolbar">
      <span class="tbtn back"><b>&#9664;</b>Back</span>
      <span class="tbtn fwd"><b>&#9654;</b></span>
      <span class="tbtn">${icon("search").replace("<svg", '<svg width="20" height="20"')} Search</span>
      <span class="tbtn">${icon("folder").replace("<svg", '<svg width="20" height="20"')} Folders</span>
    </div>
    <div class="addressbar">Address <span class="addr">${icon(addrIcon)}${esc(address)}</span><span class="go"><b>&#10140;</b>Go</span></div>`;

  const taskpane = (boxes) =>
    `<aside class="taskpane">${boxes
      .map(
        (b) => `<div class="tp-box ${b.primary ? "primary" : ""}"><h4>${esc(b.title)}</h4>${
          b.links
            ? `<ul>${b.links.map((l) => l.download
              ? `<li><a class="tp-link" href="${l.download}" download>${icon(l.icon)}${esc(l.label)}</a></li>`
              : `<li data-open="${l.open || ""}" data-href="${l.href || ""}">${icon(l.icon)}${esc(l.label)}</li>`).join("")}</ul>`
            : `<p>${b.html}</p>`
        }</div>`
      )
      .join("")}</aside>`;

  const commonPane = [
    {
      title: "Other Places",
      links: [
        { label: "About Me", icon: "computer", open: "about" },
        { label: "Projects", icon: "docs", open: "projects" },
        { label: "Experience", icon: "briefcase", open: "experience" },
        { label: "Contact", icon: "mail", open: "contact" },
      ],
    },
  ];

  /* ---------------- App definitions ---------------- */
  const APPS = {
    about: {
      title: "About Me",
      icon: "computer",
      size: [680, 500],
      render: () => `
        ${explorerChrome("C:\\Users\\Thejas Haridas\\About Me", "computer")}
        <div class="win-body"><div class="explorer">
          ${taskpane([
            { title: "System Tasks", primary: true, links: [
              { label: "View my resume", icon: "notepad", open: "resume" },
              { label: "Download resume (PDF)", icon: "pdf", download: PROFILE.resumePdf },
              { label: "View my skills", icon: "control", open: "skills" },
              { label: "Send me an e-mail", icon: "mail", open: "contact" },
            ] },
            ...commonPane,
            { title: "Details", html: `<b>${esc(PROFILE.name)}</b><br>${esc(PROFILE.role)}<br>${esc(PROFILE.location)}` },
          ])}
          <div class="content">
            <div class="profile-head">
              <span class="avatar">TH</span>
              <div>
                <h2>${esc(PROFILE.name)}</h2>
                <p class="sub">${esc(PROFILE.role)} &middot; ${esc(PROFILE.location)}</p>
              </div>
            </div>
            <h3>Summary</h3>
            <p>${esc(PROFILE.summary)}</p>
            <h3>System Properties</h3>
            <dl class="kv">
              <dt>Current role:</dt><dd>Junior AI/ML Engineer @ FeatherSoft</dd>
              <dt>Specialisation:</dt><dd>LLM pipelines, agentic workflows, knowledge graphs</dd>
              <dt>Education:</dt><dd>M.Sc. Computer Science (Data Analytics)</dd>
              <dt>Location:</dt><dd>${esc(PROFILE.location)}</dd>
              <dt>Also:</dt><dd>UGC NET qualified (Computer Science)</dd>
            </dl>
            <h3>Education</h3>
            ${EDUCATION.map((e) => `<p><b>${esc(e.degree)}</b> <span class="sub">(${esc(e.period)})</span><br>${esc(e.school)}</p>`).join("")}
            <h3>Core Stack</h3>
            <div>${tags(["Python", "vLLM", "LangChain", "LangGraph", "Neo4j", "RAG", "AI Agents", "FastAPI", "PyTorch", "TensorFlow", "Docker"])}</div>
          </div>
        </div></div>
        <div class="statusbar"><span>My Computer</span><span>Online</span></div>`,
    },

    experience: {
      title: "Experience",
      icon: "briefcase",
      size: [700, 520],
      render: () => `
        ${explorerChrome("C:\\Users\\Thejas Haridas\\Experience", "briefcase")}
        <div class="win-body"><div class="explorer">
          ${taskpane([
            { title: "Career Tasks", primary: true, links: [
              { label: "View projects", icon: "docs", open: "projects" },
              { label: "Download resume (PDF)", icon: "pdf", download: PROFILE.resumePdf },
            ] },
            ...commonPane,
          ])}
          <div class="content">
            <h2>Work Experience</h2>
            <p class="sub">${EXPERIENCE.length} items</p>
            <div class="timeline">
              ${EXPERIENCE.map((x) => `
                <div class="tl-item">
                  <h4>${esc(x.title)}</h4>
                  <div class="tl-meta"><b>${esc(x.company)}</b><span>${esc(x.place)}</span><span>${esc(x.type)}</span><span>${esc(x.period)}</span></div>
                  <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
                </div>`).join("")}
            </div>
          </div>
        </div></div>
        <div class="statusbar"><span>${EXPERIENCE.length} objects</span><span>My Computer</span></div>`,
    },

    projects: {
      title: "My Projects",
      icon: "docs",
      size: [720, 520],
      render: () => `
        ${explorerChrome("C:\\Users\\Thejas Haridas\\My Documents\\Projects", "docs")}
        <div class="win-body"><div class="explorer">
          ${taskpane([
            { title: "File and Folder Tasks", primary: true, links: [
              { label: "View on GitHub", icon: "github", href: PROFILE.github },
              { label: "Publications", icon: "book", open: "publications" },
            ] },
            ...commonPane,
          ])}
          <div class="content">
            <h2>Projects</h2>
            <p class="sub">Click a project to preview it; double-click to open its folder.</p>
            <div class="file-grid">
              ${PROJECTS.map((p, i) => `
                <button class="file-item${i === 0 ? " active" : ""}" data-project="${i}">
                  ${icon("folder")}
                  <span><strong>${esc(p.name)}</strong><small>${esc(p.short)}</small></span>
                </button>`).join("")}
            </div>
            <div class="detail" data-detail></div>
          </div>
        </div></div>
        <div class="statusbar"><span>${PROJECTS.length} objects</span><span>My Documents</span></div>`,
      mount: (win) => {
        const detail = $("[data-detail]", win);
        const show = (i) => {
          const p = PROJECTS[i];
          detail.innerHTML = `<h4>${esc(p.name)}</h4><p>${esc(p.desc)}</p><div>${tags(p.stack)}</div>${diagram(p)}
            <p><button class="xp-btn" data-open-project="${i}">${icon("folder").replace("<svg", '<svg width="14" height="14"')} Open project folder</button></p>`;
          $("[data-open-project]", detail).addEventListener("click", () => openApp("project" + i));
          win.querySelectorAll(".file-item").forEach((b) => b.classList.toggle("active", +b.dataset.project === i));
        };
        win.querySelectorAll(".file-item").forEach((b) => {
          b.addEventListener("click", () => show(+b.dataset.project));
          b.addEventListener("dblclick", () => openApp("project" + b.dataset.project));
        });
        show(0);
      },
    },

    skills: {
      title: "Control Panel — Skills",
      icon: "control",
      size: [720, 500],
      render: () => `
        ${explorerChrome("Control Panel\\Skills", "control")}
        <div class="win-body"><div class="explorer">
          ${taskpane([
            { title: "Control Panel", primary: true, html: "Pick a category to see what Thejas works with day to day." },
            { title: "See Also", links: [
              { label: "Projects", icon: "docs", open: "projects" },
              { label: "Certifications", icon: "trophy", open: "achievements" },
            ] },
          ])}
          <div class="content">
            <h2>Pick a category</h2>
            <div class="cp-grid">
              ${SKILLS.map((s) => `
                <div class="cp-cat">
                  ${icon(s.icon)}
                  <div>
                    <h4>${esc(s.cat)}</h4>
                    <div class="meter" title="${s.level}%"><i style="width:${s.level}%"></i></div>
                    <div>${tags(s.items)}</div>
                  </div>
                </div>`).join("")}
            </div>
          </div>
        </div></div>
        <div class="statusbar"><span>${SKILLS.length} categories</span><span>Control Panel</span></div>`,
    },

    resume: {
      title: "Resume.txt - Notepad",
      icon: "notepad",
      size: [640, 520],
      render: () => `
        <div class="menubar"><span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span></div>
        <div class="toolbar">
          <a class="xp-btn" href="${PROFILE.resumePdf}" download style="text-decoration:none;display:inline-flex;gap:4px;align-items:center">${icon("pdf").replace("<svg", '<svg width="16" height="16"')} Download PDF</a>
        </div>
        <div class="win-body"><div class="notepad" spellcheck="false">${esc(resumeText())}</div></div>`,
    },

    publications: {
      title: "Publications",
      icon: "book",
      size: [600, 380],
      render: () => `
        ${explorerChrome("C:\\Users\\Thejas Haridas\\Publications", "book")}
        <div class="win-body"><div class="content">
          <h2>Publications</h2>
          ${PUBLICATIONS.map((p) => `
            <div class="detail">
              <h4>${esc(p.title)}</h4>
              <p>${esc(p.authors)} &middot; <i>${esc(p.venue)}</i> &middot; ${esc(p.date)}</p>
              <a href="${p.url}" target="_blank" rel="noopener">Find it on ScienceDirect &rarr;</a>
            </div>`).join("")}
          <p class="sub" style="margin-top:12px">First-author, peer-reviewed publication at postgraduate level.</p>
        </div></div>
        <div class="statusbar"><span>${PUBLICATIONS.length} object(s)</span><span>My Computer</span></div>`,
    },

    achievements: {
      title: "Certifications & Achievements",
      icon: "trophy",
      size: [560, 400],
      render: () => `
        <div class="win-body"><div class="content">
          <h2>Certifications</h2>
          <ul>${CERTS.map((c) => `<li><b>${esc(c.name)}</b> — ${esc(c.by)} <span class="sub">(${esc(c.date)})</span></li>`).join("")}</ul>
          <h3>Achievements</h3>
          <ul>${ACHIEVEMENTS.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
        </div></div>`,
    },

    contact: {
      title: "New Message — Outlook Express",
      icon: "mail",
      size: [560, 480],
      render: () => `
        <div class="menubar"><span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Message</span></div>
        <div class="contact-cards">
          <a href="mailto:${PROFILE.email}">${icon("at")}${esc(PROFILE.email)}</a>
          <a href="${PROFILE.linkedin}" target="_blank" rel="noopener">${icon("linkedin")}LinkedIn</a>
          <a href="${PROFILE.github}" target="_blank" rel="noopener">${icon("github")}GitHub</a>
        </div>
        <form class="mail-form win-body flat" data-mail>
          <label class="mail-row">To: <input value="${esc(PROFILE.email)}" readonly /></label>
          <label class="mail-row">From: <input name="from" placeholder="Your name" required /></label>
          <label class="mail-row">Subject: <input name="subject" placeholder="Let's work together" required /></label>
          <textarea name="body" placeholder="Hi Thejas, ..." required></textarea>
          <div><button class="xp-btn" type="submit">Send</button></div>
        </form>
        <div class="statusbar"><span>Opens your e-mail client to send.</span><span>Online</span></div>`,
      mount: (win) => {
        $("[data-mail]", win).addEventListener("submit", (e) => {
          e.preventDefault();
          const f = e.target;
          const body = `${f.body.value}\n\n— ${f.from.value}`;
          window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(f.subject.value)}&body=${encodeURIComponent(body)}`;
        });
      },
    },

    ie: {
      title: "Links — Microsoft Internet Explorer",
      icon: "ie",
      size: [620, 440],
      render: () => `
        ${explorerChrome("https://thejasharidas.github.io/Xp_portfolio/links", "ie")}
        <div class="win-body"><div class="ie-page">
          <h1>Find me on the web</h1>
          <div class="link-list">
            <a href="${PROFILE.github}" target="_blank" rel="noopener">${icon("github")}<span><strong>GitHub</strong><small>github.com/thejas-haridas</small></span></a>
            <a href="${PROFILE.linkedin}" target="_blank" rel="noopener">${icon("linkedin")}<span><strong>LinkedIn</strong><small>linkedin.com/in/thejas-haridas</small></span></a>
            <a href="mailto:${PROFILE.email}">${icon("at")}<span><strong>E-mail</strong><small>${esc(PROFILE.email)}</small></span></a>
          </div>
        </div></div>
        <div class="statusbar"><span>Done</span><span>Internet</span></div>`,
    },

    minesweeper: {
      title: "Minesweeper",
      icon: "mine",
      size: [null, null],
      resizable: false,
      render: () => `
        <div class="menubar"><span data-new>Game</span><span>Help</span></div>
        <div class="win-body flat" style="padding:6px;overflow:visible"><div class="mine-wrap">
          <div class="mine-head"><span class="lcd" data-mines>010</span><button class="smiley" data-smiley>🙂</button><span class="lcd" data-time>000</span></div>
          <div class="mine-grid" data-grid></div>
        </div></div>`,
      mount: (win) => minesweeper(win),
    },

    recycle: {
      title: "Recycle Bin",
      icon: "recycle",
      size: [480, 300],
      render: () => `
        ${explorerChrome("Recycle Bin", "recycle")}
        <div class="win-body"><div class="content">
          <p><b>Recycle Bin is empty.</b></p>
          <p class="sub">Thejas doesn't throw away ideas — they just end up in <a href="#" data-open-link="projects">Projects</a>.</p>
        </div></div>
        <div class="statusbar"><span>0 objects</span><span>Recycle Bin</span></div>`,
    },
  };

  function resumeText() {
    const line = "=".repeat(60);
    const out = [];
    out.push(PROFILE.name.toUpperCase(), PROFILE.role, `${PROFILE.location} | ${PROFILE.email}`, "linkedin.com/in/thejas-haridas | github.com/thejas-haridas", "");
    out.push(line, "PROFESSIONAL SUMMARY", line, PROFILE.summary, "");
    out.push(line, "EXPERIENCE", line);
    EXPERIENCE.forEach((x) => {
      out.push(`${x.title}  (${x.period})`, `${x.company}, ${x.place} (${x.type})`);
      x.points.forEach((p) => out.push(`  * ${p}`));
      out.push("");
    });
    out.push(line, "SKILLS", line);
    SKILLS.forEach((s) => out.push(`* ${s.cat}: ${s.items.join(", ")}`));
    out.push("", line, "PROJECTS", line);
    PROJECTS.forEach((p, i) => out.push(`${i + 1}. ${p.name} (${p.short})`, `   ${p.desc}`, ""));
    out.push(line, "EDUCATION", line);
    EDUCATION.forEach((e) => out.push(`${e.degree}  (${e.period})`, `  ${e.school}`));
    out.push("", line, "PUBLICATIONS", line);
    PUBLICATIONS.forEach((p) => out.push(`* ${p.authors}, "${p.title}," ${p.venue}, ${p.date}.`));
    out.push("", line, "CERTIFICATIONS", line);
    CERTS.forEach((c) => out.push(`* ${c.name} - ${c.by} (${c.date})`));
    out.push("", line, "ACHIEVEMENTS", line);
    ACHIEVEMENTS.forEach((a) => out.push(`* ${a}`));
    return out.join("\n");
  }

  /* ---------------- Desktop icons & start menu ---------------- */
  const DESKTOP = [
    ["about", "About Me"],
    ["projects", "My Projects"],
    ["experience", "Experience"],
    ["skills", "Skills"],
    ["resume", "Resume.txt"],
    ["publications", "Publications"],
    ["contact", "Contact Me"],
    ["ie", "Internet Explorer"],
    ["achievements", "Achievements"],
    ["cmd", "Command Prompt"],
    ["paint", "Paint"],
    ["winamp", "Winamp"],
    ["solitaire", "Solitaire"],
    ["minesweeper", "Minesweeper"],
    ["recycle", "Recycle Bin"],
  ];
  const DESKTOP_DEFAULT = DESKTOP.slice();

  const START_LEFT = [
    ["ie", "Internet", "Links & socials"],
    ["contact", "E-mail", "Outlook Express"],
    "sep",
    ["about", "About Me"],
    ["projects", "My Projects"],
    ["cmd", "Command Prompt"],
    ["winamp", "Winamp"],
    ["paint", "Paint"],
    "sep",
    "all",
  ];
  const ALL_PROGRAMS = [
    { label: "Accessories", submenu: [["cmd", "Command Prompt"], ["paint", "Paint"], ["resume", "Notepad"]] },
    { label: "Games", submenu: [["minesweeper", "Minesweeper"], ["solitaire", "Solitaire"]] },
    ["ie", "Internet Explorer"],
    ["contact", "Outlook Express"],
    ["winamp", "Winamp"],
  ];
  const START_RIGHT = [
    ["resume", "My Resume"],
    ["publications", "My Publications"],
    ["achievements", "My Achievements"],
    "sep",
    ["skills", "Control Panel"],
    ["display", "Display Properties"],
    ["about", "My Computer"],
    "sep",
    ["help", "Help and Support"],
    ["assistant", "Ask the Assistant"],
    ["cmd", "Run..."],
  ];

  APPS.help = {
    title: "Help and Support Center",
    icon: "help",
    size: [520, 340],
    render: () => `
      <div class="win-body"><div class="content">
        <h2>Welcome to Thejas's portfolio</h2>
        <ul>
          <li><b>Double-click</b> (or tap) a desktop icon to open it.</li>
          <li>Drag windows by their title bar; resize from the bottom-right corner.</li>
          <li>Use the <b>start</b> button for quick access to everything.</li>
          <li>Minimise with <b>_</b>, maximise with <b>□</b>, close with <b>✕</b>.</li>
          <li><b>Right-click</b> the desktop to arrange icons or change the wallpaper, theme and screensaver.</li>
          <li>Open <b>Command Prompt</b> and type <code>help</code> for a terminal tour.</li>
          <li>Click the speaker in the tray to mute or unmute sounds.</li>
        </ul>
        <p>Want to talk? <a href="mailto:${PROFILE.email}">${esc(PROFILE.email)}</a></p>
      </div></div>`,
  };

  function buildIcons() {
    $("#icons").innerHTML = DESKTOP.map(([id, label]) => `<button class="icon" data-app="${id}">${icon(APPS[id].icon)}<span>${esc(label)}</span></button>`).join("");
  }

  function buildDesktop() {
    const wrap = $("#icons");
    buildIcons();
    wrap.addEventListener("click", (e) => {
      const b = e.target.closest(".icon");
      wrap.querySelectorAll(".icon").forEach((i) => i.classList.toggle("selected", i === b));
      if (b && (isMobile() || e.detail === 0)) openApp(b.dataset.app);
    });
    wrap.addEventListener("dblclick", (e) => {
      const b = e.target.closest(".icon");
      if (b && !isMobile()) openApp(b.dataset.app);
    });
    $("#desktop").addEventListener("mousedown", (e) => {
      if (e.target.id === "desktop" || e.target.id === "icons") wrap.querySelectorAll(".icon").forEach((i) => i.classList.remove("selected"));
    });

    const item = (entry, big) => {
      if (entry === "sep") return `<li class="sm-sep"></li>`;
      if (entry === "all") return `<li class="sm-all" data-all><strong>All Programs</strong><b class="sm-arrow">&#9654;</b></li>`;
      const [id, label, sub] = entry;
      return `<li data-app="${id}">${icon(APPS[id].icon)}${big ? `<span><strong>${esc(label)}</strong>${sub ? `<small>${esc(sub)}</small>` : ""}</span>` : esc(label)}</li>`;
    };
    $("#smLeft").innerHTML = START_LEFT.map((e) => item(e, true)).join("");
    $("#smRight").innerHTML = START_RIGHT.map((e) => item(e, false)).join("");
  }

  /* ---------------- Window manager ---------------- */
  const windows = new Map();
  let zTop = 100;
  let cascade = 0;

  function openApp(id) {
    const app = APPS[id];
    if (!app) return;
    closeStart();
    if (app.launch) { app.launch(); return; }
    if (windows.has(id)) {
      const w = windows.get(id);
      w.el.classList.remove("minimized");
      focusWin(id);
      return;
    }

    const el = document.createElement("div");
    el.className = "window";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", app.title);
    el.innerHTML = `
      <div class="titlebar">
        ${icon(app.icon)}<span class="title">${esc(app.title)}</span>
        <button class="tb-btn min" aria-label="Minimize"><i></i></button>
        ${app.resizable === false ? "" : `<button class="tb-btn max" aria-label="Maximize"><i></i></button>`}
        <button class="tb-btn close" aria-label="Close"><i></i></button>
      </div>
      ${app.render()}
      ${app.resizable === false ? "" : `<div class="resize"></div>`}`;

    const area = $("#desktop");
    const [w, h] = app.size;
    const maxW = area.clientWidth, maxH = area.clientHeight - 30;
    if (w) el.style.width = Math.min(w, maxW - 20) + "px";
    if (h) el.style.height = Math.min(h, maxH - 20) + "px";
    const off = (cascade++ % 6) * 26;
    el.style.left = Math.max(0, Math.min(maxW - (w || 300), 120 + off)) + "px";
    el.style.top = Math.max(0, Math.min(maxH - (h || 300), 30 + off)) + "px";
    if (isMobile() && app.resizable !== false) el.classList.add("maximized");

    $("#windows").appendChild(el);

    const task = document.createElement("button");
    task.className = "task-btn";
    task.innerHTML = `${icon(app.icon)}<span>${esc(app.title)}</span>`;
    task.title = app.title;
    $("#taskItems").appendChild(task);

    windows.set(id, { el, task });

    el.addEventListener("mousedown", () => focusWin(id));
    el.addEventListener("touchstart", () => focusWin(id), { passive: true });
    $(".tb-btn.close", el).addEventListener("click", (e) => { e.stopPropagation(); closeWin(id); });
    $(".tb-btn.min", el).addEventListener("click", (e) => { e.stopPropagation(); minimizeWin(id); });
    $(".tb-btn.max", el)?.addEventListener("click", (e) => { e.stopPropagation(); el.classList.toggle("maximized"); sound("restore"); });
    $(".titlebar", el).addEventListener("dblclick", (e) => { if (app.resizable !== false && !e.target.closest(".tb-btn")) el.classList.toggle("maximized"); });
    task.addEventListener("click", () => {
      if (el.classList.contains("minimized")) { el.classList.remove("minimized"); focusWin(id); sound("restore"); }
      else if (task.classList.contains("active")) minimizeWin(id);
      else focusWin(id);
    });

    el.querySelectorAll("[data-open]").forEach((n) => n.addEventListener("click", () => n.dataset.open && openApp(n.dataset.open)));
    el.querySelectorAll("[data-href]").forEach((n) => n.dataset.href && n.addEventListener("click", () => window.open(n.dataset.href, "_blank", "noopener")));
    el.querySelectorAll("[data-open-link]").forEach((n) => n.addEventListener("click", (e) => { e.preventDefault(); openApp(n.dataset.openLink); }));

    makeDraggable(el, $(".titlebar", el));
    const rz = $(".resize", el);
    if (rz) makeResizable(el, rz);

    app.mount?.(el);
    focusWin(id);
  }

  function focusWin(id) {
    windows.forEach((w, key) => {
      const on = key === id;
      w.el.classList.toggle("inactive", !on);
      w.task.classList.toggle("active", on);
    });
    const w = windows.get(id);
    if (w) w.el.style.zIndex = ++zTop;
  }

  function minimizeWin(id) {
    const w = windows.get(id);
    if (!w) return;
    w.el.classList.add("minimized");
    w.task.classList.remove("active");
    sound("minimize");
    // focus the next top-most visible window
    let best = null, bestZ = -1;
    windows.forEach((o, key) => {
      if (!o.el.classList.contains("minimized") && +o.el.style.zIndex > bestZ) { best = key; bestZ = +o.el.style.zIndex; }
    });
    if (best) focusWin(best);
  }

  function closeWin(id) {
    const w = windows.get(id);
    if (!w) return;
    w.el._cleanup?.();
    w.el.remove();
    w.task.remove();
    windows.delete(id);
    const last = [...windows.keys()].pop();
    if (last) focusWin(last);
  }

  function pointer(e) {
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX, y: p.clientY };
  }

  function makeDraggable(el, handle) {
    const start = (e) => {
      if (e.target.closest(".tb-btn") || el.classList.contains("maximized")) return;
      const p0 = pointer(e);
      const ox = el.offsetLeft, oy = el.offsetTop;
      const move = (ev) => {
        const p = pointer(ev);
        const area = $("#desktop");
        const nx = Math.min(Math.max(ox + p.x - p0.x, -el.offsetWidth + 80), area.clientWidth - 80);
        const ny = Math.min(Math.max(oy + p.y - p0.y, 0), area.clientHeight - 60);
        el.style.left = nx + "px";
        el.style.top = ny + "px";
        if (ev.cancelable) ev.preventDefault();
      };
      const end = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", end);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", end);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", end);
      document.addEventListener("touchmove", move, { passive: false });
      document.addEventListener("touchend", end);
    };
    handle.addEventListener("mousedown", start);
    handle.addEventListener("touchstart", start, { passive: true });
  }

  function makeResizable(el, handle) {
    const start = (e) => {
      e.stopPropagation();
      const p0 = pointer(e);
      const w0 = el.offsetWidth, h0 = el.offsetHeight;
      const move = (ev) => {
        const p = pointer(ev);
        el.style.width = Math.max(280, w0 + p.x - p0.x) + "px";
        el.style.height = Math.max(160, h0 + p.y - p0.y) + "px";
        if (ev.cancelable) ev.preventDefault();
      };
      const end = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", end);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", end);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", end);
      document.addEventListener("touchmove", move, { passive: false });
      document.addEventListener("touchend", end);
    };
    handle.addEventListener("mousedown", start);
    handle.addEventListener("touchstart", start, { passive: true });
  }

  /* ---------------- Start menu ---------------- */
  const startMenu = $("#startMenu");
  const startBtn = $("#startBtn");
  function closeStart() { startMenu.classList.add("hidden"); startBtn.classList.remove("active"); }
  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = startMenu.classList.toggle("hidden");
    startBtn.classList.toggle("active", !open);
  });
  startMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    const all = e.target.closest("[data-all]");
    if (all) { openAllPrograms(all); return; }
    const li = e.target.closest("[data-app]");
    if (li) openApp(li.dataset.app);
    const act = e.target.closest("[data-action]");
    if (act) {
      closeStart();
      if (act.dataset.action === "logoff") logOff();
      else shutDown();
    }
  });
  function openAllPrograms(anchor) {
    const r = anchor.getBoundingClientRect();
    const toItem = (e) => Array.isArray(e)
      ? { label: e[1], icon: APPS[e[0]].icon, action: () => openApp(e[0]) }
      : { label: e.label, icon: "folder", submenu: e.submenu.map(toItem) };
    showMenu(r.right - 4, r.top, ALL_PROGRAMS.map(toItem), { anchorBottom: r.bottom });
  }
  startMenu.addEventListener("mouseover", (e) => {
    const all = e.target.closest("[data-all]");
    if (all && !document.querySelector(".ctx-menu") && !isMobile()) openAllPrograms(all);
  });
  document.addEventListener("click", (e) => { if (!startMenu.contains(e.target) && !e.target.closest(".ctx-menu")) closeStart(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeStart(); });

  /* ---------------- Clock ---------------- */
  function tick() {
    $("#clock").textContent = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  /* ---------------- Boot / login / shutdown ---------------- */
  const boot = $("#boot"), login = $("#login"), desktop = $("#desktop"), shutdown = $("#shutdown");
  let booted = false;
  function toLogin() {
    if (booted) return;
    booted = true;
    boot.classList.add("hidden");
    login.classList.remove("hidden");
    $("#userTile").focus();
  }
  boot.addEventListener("click", toLogin);
  setTimeout(toLogin, 3000);

  $("#userTile").addEventListener("click", () => {
    sound("startup");
    login.classList.add("fade-out");
    setTimeout(() => {
      login.classList.add("hidden");
      login.classList.remove("fade-out");
      desktop.classList.remove("hidden");
      if (!sessionStorageGet("welcomed")) {
        openApp("about");
        sessionStorageSet("welcomed", "1");
      }
      emit("login");
    }, 500);
  });

  function closeAll() { [...windows.keys()].forEach(closeWin); cascade = 0; }
  function logOff() { sound("logoff"); emit("logoff"); closeAll(); desktop.classList.add("hidden"); login.classList.remove("hidden"); }
  function shutDown() { sound("shutdown"); emit("logoff"); closeAll(); desktop.classList.add("hidden"); shutdown.classList.remove("hidden"); }
  $("#restartBtn").addEventListener("click", () => {
    shutdown.classList.add("hidden");
    booted = false;
    boot.classList.remove("hidden");
    setTimeout(toLogin, 2500);
  });

  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch { /* ignore */ } }

  /* ---------------- Minesweeper ---------------- */
  function minesweeper(win) {
    const W = 9, H = 9, MINES = 10;
    const grid = $("[data-grid]", win), smiley = $("[data-smiley]", win);
    const minesLcd = $("[data-mines]", win), timeLcd = $("[data-time]", win);
    grid.style.gridTemplateColumns = `repeat(${W}, 20px)`;
    let cells, over, started, flags, timer, seconds, opened;
    const pad = (n) => String(Math.max(0, Math.min(999, n))).padStart(3, "0");
    const nbrs = (i) => {
      const x = i % W, y = (i / W) | 0, out = [];
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if ((dx || dy) && nx >= 0 && ny >= 0 && nx < W && ny < H) out.push(ny * W + nx);
      }
      return out;
    };

    function reset() {
      clearInterval(timer);
      over = false; started = false; flags = 0; seconds = 0; opened = 0;
      cells = Array.from({ length: W * H }, () => ({ mine: false, open: false, flag: false, n: 0 }));
      smiley.textContent = "🙂";
      minesLcd.textContent = pad(MINES);
      timeLcd.textContent = pad(0);
      grid.innerHTML = cells.map((_, i) => `<button class="cell" data-i="${i}"></button>`).join("");
    }

    function plant(safe) {
      const forbidden = new Set([safe, ...nbrs(safe)]);
      let placed = 0;
      while (placed < MINES) {
        const r = (Math.random() * W * H) | 0;
        if (!cells[r].mine && !forbidden.has(r)) { cells[r].mine = true; placed++; }
      }
      cells.forEach((c, i) => { c.n = nbrs(i).filter((j) => cells[j].mine).length; });
    }

    function render(i) {
      const c = cells[i], b = grid.children[i];
      b.className = "cell" + (c.open ? " open" : "") + (c.open && c.n ? ` n${c.n}` : "") + (c.boom ? " boom" : "");
      b.textContent = c.open ? (c.mine ? "💣" : c.n || "") : c.flag ? "🚩" : "";
    }

    function reveal(i) {
      const stack = [i];
      while (stack.length) {
        const k = stack.pop(), c = cells[k];
        if (c.open || c.flag) continue;
        c.open = true; opened++;
        render(k);
        if (!c.mine && c.n === 0) stack.push(...nbrs(k));
      }
    }

    function lose(i) {
      over = true; clearInterval(timer);
      cells[i].boom = true;
      cells.forEach((c, k) => { if (c.mine) { c.open = true; render(k); } });
      smiley.textContent = "😵";
      sound("error");
    }

    function checkWin() {
      if (opened === W * H - MINES) {
        over = true; clearInterval(timer);
        smiley.textContent = "😎";
        sound("ding");
        cells.forEach((c, k) => { if (c.mine && !c.flag) { c.flag = true; render(k); } });
        minesLcd.textContent = pad(0);
      }
    }

    grid.addEventListener("click", (e) => {
      const b = e.target.closest(".cell");
      if (!b || over) return;
      const i = +b.dataset.i, c = cells[i];
      if (c.flag) return;
      if (!started) {
        started = true; plant(i);
        timer = setInterval(() => { timeLcd.textContent = pad(++seconds); }, 1000);
      }
      if (c.open && c.n) {
        // chord: open neighbours when flags match the number
        const ns = nbrs(i);
        if (ns.filter((j) => cells[j].flag).length === c.n) {
          for (const j of ns) if (!cells[j].flag && !cells[j].open) { if (cells[j].mine) { lose(j); return; } reveal(j); }
        }
      } else if (c.mine) { lose(i); return; }
      else reveal(i);
      checkWin();
    });
    grid.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const b = e.target.closest(".cell");
      if (!b || over) return;
      const i = +b.dataset.i, c = cells[i];
      if (c.open) return;
      c.flag = !c.flag; flags += c.flag ? 1 : -1;
      minesLcd.textContent = pad(MINES - flags);
      render(i);
    });
    grid.addEventListener("mousedown", (e) => { if (!over && e.button === 0) smiley.textContent = "😮"; });
    document.addEventListener("mouseup", () => { if (!over && smiley.textContent === "😮") smiley.textContent = "🙂"; });
    smiley.addEventListener("click", reset);
    $("[data-new]", win).addEventListener("click", reset);
    win._cleanup = () => clearInterval(timer);
    reset();
  }

  /* ---------------- Sounds & events ---------------- */
  function sound(name) { window.XPSound?.play(name); }
  const listeners = {};
  function on(evt, fn) { (listeners[evt] = listeners[evt] || []).push(fn); }
  function emit(evt, data) { (listeners[evt] || []).forEach((fn) => { try { fn(data); } catch (err) { console.error(err); } }); }

  const settings = {
    get(k, d) { try { const v = localStorage.getItem("xp." + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("xp." + k, JSON.stringify(v)); } catch { /* ignore */ } },
  };

  /* ---------------- Architecture diagrams ---------------- */
  const KINDS = {
    io: { fill: "#e3f6d9", stroke: "#3d8b1f", label: "Input / output" },
    proc: { fill: "#e4edfc", stroke: "#2a5bc2", label: "Processing" },
    model: { fill: "#f3e6fb", stroke: "#7b3fb0", label: "Model" },
    db: { fill: "#fff3cf", stroke: "#b07d00", label: "Storage / index" },
    guard: { fill: "#fde7df", stroke: "#c2461d", label: "Reliability" },
  };
  function diagram(p) {
    if (!p.flow) return "";
    const nodes = p.flow, cols = 3, W = 176, H = 56, GX = 48, GY = 62, PAD = 20;
    const rows = Math.ceil(nodes.length / cols);
    const pos = nodes.map((_, i) => {
      const r = (i / cols) | 0;
      const c = r % 2 ? cols - 1 - (i % cols) : i % cols;
      return { x: PAD + c * (W + GX), y: PAD + r * (H + GY) };
    });
    const width = PAD * 2 + cols * W + (cols - 1) * GX;
    const height = PAD * 2 + rows * H + (rows - 1) * GY + (p.loops ? 36 : 0);
    const edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = pos[i], b = pos[i + 1];
      if (a.y === b.y) {
        const y = a.y + H / 2;
        const [x1, x2] = b.x > a.x ? [a.x + W, b.x - 3] : [a.x, b.x + W + 3];
        edges.push(`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="dg-edge" marker-end="url(#dg-arrow)"/>`);
      } else {
        const x = a.x + W / 2;
        edges.push(`<line x1="${x}" y1="${a.y + H}" x2="${x}" y2="${b.y - 3}" class="dg-edge" marker-end="url(#dg-arrow)"/>`);
      }
    }
    (p.loops || []).forEach((l) => {
      const a = pos[l.from], b = pos[l.to];
      const ax = a.x + W / 2, bx = b.x + W / 2, y = a.y + H;
      edges.push(`<path d="M${ax} ${y} C${ax} ${y + 44}, ${bx} ${y + 44}, ${bx} ${y + 4}" class="dg-loop" marker-end="url(#dg-arrow-loop)"/>
        <text x="${(ax + bx) / 2}" y="${y + 46}" class="dg-loop-label">${esc(l.label)}</text>`);
    });
    const boxes = nodes.map((n, i) => {
      const { x, y } = pos[i], k = KINDS[n.k] || KINDS.proc;
      return `<g class="dg-node" style="animation-delay:${i * 70}ms">
        <rect x="${x + 2}" y="${y + 3}" width="${W}" height="${H}" rx="5" fill="rgba(0,0,0,.12)"/>
        <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="5" fill="${k.fill}" stroke="${k.stroke}" stroke-width="1.5"/>
        <circle cx="${x + 14}" cy="${y + 14}" r="9" fill="${k.stroke}"/>
        <text x="${x + 14}" y="${y + 18}" class="dg-num">${i + 1}</text>
        <text x="${x + W / 2 + 8}" y="${y + 25}" class="dg-title">${esc(n.t)}</text>
        <text x="${x + W / 2 + 8}" y="${y + 42}" class="dg-sub">${esc(n.s || "")}</text>
      </g>`;
    });
    const used = [...new Set(nodes.map((n) => n.k))];
    return `<div class="diagram">
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Architecture of ${esc(p.name)}: ${esc(nodes.map((n) => n.t).join(" then "))}">
        <defs>
          <marker id="dg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#1d3f8a"/></marker>
          <marker id="dg-arrow-loop" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#c2461d"/></marker>
        </defs>
        ${edges.join("")}${boxes.join("")}
      </svg>
      <div class="dg-legend">${used.map((k) => `<span><i style="background:${KINDS[k].fill};border-color:${KINDS[k].stroke}"></i>${KINDS[k].label}</span>`).join("")}</div>
    </div>`;
  }

  PROJECTS.forEach((p, i) => {
    APPS["project" + i] = {
      title: p.name,
      icon: "folder",
      size: [760, 560],
      render: () => `
        ${explorerChrome(`C:\\Users\\Thejas Haridas\\My Documents\\Projects\\${p.name}`, "folder")}
        <div class="win-body"><div class="explorer">
          ${taskpane([
            { title: "Project Tasks", primary: true, links: [
              { label: "Back to Projects", icon: "docs", open: "projects" },
              { label: "View on GitHub", icon: "github", href: PROFILE.github },
              ...PROJECTS.map((q, j) => j === i ? null : { label: q.name, icon: "folder", open: "project" + j }).filter(Boolean),
            ] },
            { title: "Details", html: `<b>${esc(p.name)}</b><br>${esc(p.short)}<br><br>${p.flow.length} pipeline stages` },
          ])}
          <div class="content">
            <h2>${esc(p.name)}</h2>
            <p class="sub">${esc(p.short)}</p>
            <p>${esc(p.desc)}</p>
            <h3>Architecture</h3>
            ${diagram(p)}
            <h3>Highlights</h3>
            <ul>${(p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
            <h3>Tech Stack</h3>
            <div>${tags(p.stack)}</div>
          </div>
        </div></div>
        <div class="statusbar"><span>${p.flow.length} stages</span><span>My Documents</span></div>`,
    };
  });

  /* ---------------- Menus & dialogs ---------------- */
  function closeMenus() { document.querySelectorAll(".ctx-menu").forEach((m) => m.remove()); }
  function showMenu(x, y, items, opts = {}) {
    if (!opts.sub) closeMenus();
    const m = document.createElement("ul");
    m.className = "ctx-menu";
    m.setAttribute("role", "menu");
    m.innerHTML = items.map((it, i) => it.sep
      ? `<li class="ctx-sep" role="separator"></li>`
      : `<li role="menuitem" data-i="${i}" class="${it.disabled ? "disabled" : ""} ${it.bold ? "bold" : ""}">${it.icon ? icon(it.icon) : `<span class="ctx-ico">${it.checked ? "✔" : ""}</span>`}<span>${esc(it.label)}</span>${it.submenu ? `<b class="ctx-arrow">&#9654;</b>` : ""}</li>`).join("");
    document.body.appendChild(m);
    const vw = window.innerWidth, vh = window.innerHeight - 30;
    const left = x + m.offsetWidth > vw ? Math.max(0, (opts.flipX ?? x) - m.offsetWidth) : x;
    const top = y + m.offsetHeight > vh ? Math.max(0, (opts.anchorBottom ?? vh) - m.offsetHeight) : y;
    m.style.left = left + "px";
    m.style.top = top + "px";
    let child = null;
    const openSub = (li) => {
      const it = items[+li.dataset.i];
      child?.remove(); child = null;
      if (!it?.submenu || it.disabled) return;
      const r = li.getBoundingClientRect();
      child = showMenu(r.right - 3, r.top - 3, it.submenu, { sub: true, flipX: r.left + 3, anchorBottom: r.bottom + 3 });
    };
    // Like Windows, wait a moment before switching submenus so the pointer can travel diagonally into one.
    let hoverTimer = null;
    m.addEventListener("mouseover", (e) => {
      const li = e.target.closest("li[data-i]");
      if (!li || isMobile()) return;
      clearTimeout(hoverTimer);
      if (child && items[+li.dataset.i]?.submenu && child.dataset.from === li.dataset.i) return;
      hoverTimer = setTimeout(() => { openSub(li); if (child) child.dataset.from = li.dataset.i; }, child ? 350 : 120);
    });
    m.addEventListener("mouseleave", () => clearTimeout(hoverTimer));
    m.addEventListener("click", (e) => {
      e.stopPropagation();
      const li = e.target.closest("li[data-i]");
      if (!li) return;
      const it = items[+li.dataset.i];
      if (it.disabled) return;
      if (it.submenu) { clearTimeout(hoverTimer); openSub(li); if (child) child.dataset.from = li.dataset.i; return; }
      closeMenus();
      closeStart();
      it.action?.();
    });
    return m;
  }
  document.addEventListener("mousedown", (e) => { if (!e.target.closest(".ctx-menu") && !e.target.closest("[data-all]")) closeMenus(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenus(); });

  let alertCount = 0;
  function alertBox(title, message, iconKey = "warning") {
    const id = "alert" + ++alertCount;
    APPS[id] = {
      title, icon: iconKey, size: [380, null], resizable: false,
      render: () => `<div class="win-body flat"><div class="dialog-body">${icon(iconKey)}<div>${message}</div></div>
        <div class="dialog-actions"><button class="xp-btn" data-ok>OK</button></div></div>`,
      mount: (win) => { const ok = $("[data-ok]", win); ok.addEventListener("click", () => { closeWin(id); delete APPS[id]; }); ok.focus(); },
    };
    sound(iconKey === "info" ? "ding" : "error");
    openApp(id);
  }

  /* ---------------- Extensions ---------------- */
  const api = {
    APPS, ICONS, DESKTOP, DESKTOP_DEFAULT, START_LEFT, START_RIGHT,
    data: { PROFILE, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, PUBLICATIONS, CERTS, ACHIEVEMENTS },
    icon, esc, tags, $, isMobile, explorerChrome, taskpane, diagram,
    openApp, closeWin, focusWin, windows, buildIcons, showMenu, closeMenus, alert: alertBox,
    sound, on, emit, settings,
  };
  window.XP = api;
  (window.XPExt || []).forEach((ext) => { try { ext(api); } catch (err) { console.error(err); } });

  /* ---------------- Init ---------------- */
  buildDesktop();
  tick();
  setInterval(tick, 10000);
})();
