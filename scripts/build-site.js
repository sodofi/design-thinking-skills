const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const ROOT = path.join(__dirname, "..");
const SITE = path.join(ROOT, "site");

// ethskills-style: each skill lives at /{name}/SKILL.md
const SKILLS = [
  { name: "coach", source: "SKILL.md", title: "Coach", description: "Design thinking coach for builders: principles, process summary, conversation patterns. Start here." },
  { name: "process", source: "process.md", title: "Process", description: "Full 5-phase framework: Empathize → Define → Ideate → Prototype → Test, with exercises and worked example." },
  { name: "personas", source: "personas.md", title: "Personas", description: "10 user personas with empathy maps, day-in-the-life, JTBD, and design prompts per theme." },
  { name: "themes", source: "themes.md", title: "Themes & CROPS", description: "CROPS constraints plus four Synthesis themes (Pay, Trust, Cooperate, Keep Secrets) and infrastructure." },
];

function stripFrontmatter(raw) {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  return match ? raw.slice(match[0].length) : raw;
}

/** For agent-facing .md: paths like /process/SKILL.md so agent can fetch from any origin */
function rewriteReferencesForAgent(md) {
  return md
    .replace(/`?references\/process\.md`?/g, "/process/SKILL.md")
    .replace(/`?references\/personas\.md`?/g, "/personas/SKILL.md")
    .replace(/`?references\/themes\.md`?/g, "/themes/SKILL.md");
}

/** For HTML: links to human-readable skill pages */
function rewriteReferencesForHtml(md) {
  return md
    .replace(/`?references\/process\.md`?/g, "[process](/process/)")
    .replace(/`?references\/personas\.md`?/g, "[personas](/personas/)")
    .replace(/`?references\/themes\.md`?/g, "[themes](/themes/)");
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function skillPageLayout(skillName, skillTitle, bodyHtml) {
  const skillPath = `${skillName}/SKILL.md`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(skillTitle)} — Design Thinking Skills</title>
  <link rel="stylesheet" href="../assets/style.css?v=3">
</head>
<body>
  <div class="container">
    <header class="page-header">
      <a class="back" href="../">← All skills</a>
      <p class="skill-url-line">Skill file (for agents): <code id="skill-url" class="skill-url-code">/${skillPath}</code> <button type="button" class="copy-btn" aria-label="Copy skill URL to clipboard">Copy</button></p>
      <h1>${escapeHtml(skillTitle)}</h1>
    </header>
    <div class="skill-content">
${bodyHtml}
    </div>
  </div>
  <script>
    (function() {
      var el = document.getElementById('skill-url');
      if (el) el.textContent = window.location.origin + '/${skillPath}';
      var btn = document.querySelector('.copy-btn');
      if (btn) btn.addEventListener('click', function() {
        navigator.clipboard.writeText(window.location.origin + '/${skillPath}').then(function() { btn.textContent = 'Copied'; setTimeout(function() { btn.textContent = 'Copy'; }, 1500); });
      });
    })();
  </script>
</body>
</html>`;
}

function build() {
  marked.setOptions({ gfm: true });

  // Ensure asset path exists
  const assetsDir = path.join(SITE, "assets");
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  for (const { name, source, title, description } of SKILLS) {
    const srcPath = path.join(ROOT, source);
    const dir = path.join(SITE, name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    let md = fs.readFileSync(srcPath, "utf8");
    md = stripFrontmatter(md);

    // Agent-facing .md: resolve references to other skills
    const mdForAgent = rewriteReferencesForAgent(md);
    fs.writeFileSync(path.join(dir, "SKILL.md"), mdForAgent, "utf8");
    console.log("Wrote", name + "/SKILL.md");

    // Human-facing HTML
    const mdForHtml = rewriteReferencesForHtml(md);
    const bodyHtml = marked.parse(mdForHtml).trim();
    const html = skillPageLayout(name, title, bodyHtml);
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
    console.log("Wrote", name + "/index.html");
  }

  // Root index skill file (like ethskills.com/SKILL.md): list all skills with paths
  const indexMd = `# Design Thinking Skills

User-centered product design for agentic builders — CROPs as design constraints.

Fetch any URL below and read it into your context.

**All skills (this index):** /SKILL.md

**Individual skills:**
- /coach/SKILL.md — Coach (start here). ${SKILLS.find(s => s.name === "coach").description}
- /process/SKILL.md — Process. ${SKILLS.find(s => s.name === "process").description}
- /personas/SKILL.md — Personas. ${SKILLS.find(s => s.name === "personas").description}
- /themes/SKILL.md — Themes & CROPS. ${SKILLS.find(s => s.name === "themes").description}

## How to use

Give your AI agent this site's URL or a skill URL. No install, no login.

- **One link:** Send your agent the site URL; it can fetch /SKILL.md first to get this index, then fetch the skills it needs.
- **Direct skill:** \`curl -s https://your-domain.com/coach/SKILL.md\`
- Start with the Coach; it references Process, Personas, and Themes.
`;
  fs.writeFileSync(path.join(SITE, "SKILL.md"), indexMd, "utf8");
  console.log("Wrote SKILL.md (root index)");
}

build();
