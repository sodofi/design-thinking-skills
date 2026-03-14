# Design Thinking Skills

User-centered product design and CROPS framework materials for hackathon builders (e.g. The Synthesis). Content is written for both humans and AI agents.

## Content

- **SKILL.md** — Synthesis Design Coach: principles, process summary, conversation patterns. Give this to an agent first.
- **process.md** — Full 5-phase design thinking framework (Empathize → Define → Ideate → Prototype → Test) with exercises and a worked example.
- **personas.md** — 10 user personas with empathy maps, day-in-the-life, JTBD, and design prompts per theme.
- **themes.md** — CROPS constraints and four Synthesis themes (Agents that Pay, Trust, Cooperate, Keep Secrets) plus infrastructure.

## Website (ethskills-style)

Same architecture as [ethskills.com](https://ethskills.com/): each skill lives at `/{name}/SKILL.md`. The landing page lists skills and their URLs; clicking a skill shows the content and you can copy its skill file URL.

### Build

```bash
npm install
npm run build
```

This generates:

- `site/SKILL.md` — root index (lists all skills; agents can fetch this first).
- `site/coach/SKILL.md`, `site/process/SKILL.md`, `site/personas/SKILL.md`, `site/themes/SKILL.md` — raw markdown for agents.
- `site/coach/index.html`, etc. — human-readable pages with rendered content and a “Copy” button for the skill URL.

### Deploy

Serve the `site/` directory from the root of your domain. No build step on the host if you run `npm run build` before deploying.

- **Humans:** Open the landing page, then click a skill to read it; use “Copy” to get the skill URL, or click the `coach/SKILL.md`-style link to open the raw file (URL in the address bar is the skill file).
- **Agents:** Fetch `/SKILL.md` for the index, or fetch a skill directly (e.g. `curl -s https://your-domain.com/coach/SKILL.md`).
