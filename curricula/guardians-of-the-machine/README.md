# Guardians of the Machine
## A 26-week AI Security & Governance team curriculum — built, not assembled

A complete training program that takes ten people with minimal security background and makes them a team that can threat-model, red-team, and govern a real AI system. Delivered in two synchronized editions — in-person and fully remote — with a facilitator guide that lets a working professional run it without writing a word of their own material.

**26 weeks · 78 contact hours · 10 participants · 5 roles · 4 deliverable files · zero dependencies**

---

## Why this exists

Most AI security training fails in one of two directions.

**Vendor courses** teach this quarter's threat list. The learner memorizes ten attack names, the landscape shifts, and the training is stale inside a year. Nothing transfers.

**Academic material** teaches the theory correctly and leaves the learner unable to walk into a room and say what should happen on Tuesday. No artifact, no decision, no document anyone can act on.

The gap is a program that builds *durable judgment* — attacker mindset, defense in depth, framework navigation, team coordination — and proves it by producing a real assessment of a real (if fictional) system. That is what this is. The final four weeks are not a review; they are a full security and governance assessment of a hospital AI system, delivered as a briefing to leadership.

The design constraint that shaped everything: **the facilitator has a full-time job, a spouse, and kids.** They can review prepared material. They cannot author 26 weeks of lesson plans. A curriculum that requires an unpaid expert to write their own content does not get run.

---

## The program

### Structure
Ten individual contributors across five roles, two per role, meeting three hours weekly for 26 weeks. Roles are not decorative — each person carries a distinct slice of every exercise and a distinct section of the final assessment.

| Role | Owns |
|---|---|
| AI Security Specialist | Threat identification, the master attack map, red-team leadership |
| Responsible AI Analyst | Governance, fairness, compliance obligations |
| Cloud ML Scientist | Model behavior, lifecycle stages, technical root cause |
| AI Engineer | System wiring, agent permissions, logging and controls |
| Data Security Specialist | Data inventory, privacy exposure, provenance |

### The five phases

**Phase 1 · Foundations (Weeks 1–5).** Vocabulary and lenses. AI/ML/deep learning in plain English, the CIA triad rewired for AI systems, the six-stage AI lifecycle as a map every later attack pins to, the four industry frameworks, and bias reframed from HR paperwork into attack surface. Ends with a team charter the group signs and reopens on Week 26.

**Phase 2 · Know the Enemy (Weeks 6–11).** One major threat per week: prompt injection and the lethal trifecta, data poisoning and backdoors, privacy attacks, deepfake social engineering, shadow AI, then a synthesis week where the team chains four threats into a single compound attack and defends against another team's chain.

**Phase 3 · Agentic & Deep Learning Threats (Weeks 12–17).** The frontier. What changes when AI *acts* rather than answers — goal hijack, tool misuse, memory poisoning, rogue agents, cascading failures, AI supply chain and the AI-BOM, adversarial examples. Organized around Least Agency as the governing principle.

**Phase 4 · Defend & Govern (Weeks 18–22).** The pivot from attacker to owner. NIST AI RMF as the operating system, layered controls, AI red teaming, fairness audits, incident response and policy. The emotional peak is Week 18, where the team reopens the risk statements they wrote in Week 2 and rewrites them in framework language — the growth is visible in a single side-by-side.

**Phase 5 · Capstone (Weeks 23–26).** A full security and governance assessment of *CareBridge AI*, a fictional hospital system with a triage model, a patient-facing chatbot, and an agent that touches records. Architecture, threat identification, rated findings, an executive-ready report, and a live briefing where evaluators ask hard questions.

---

## What ships

Four files. No build step, no dependencies, no install — every HTML file opens in a browser and runs.

| File | What it is |
|---|---|
| `guardians-of-the-machine.html` | The full 26-week curriculum, in-person edition (166 KB) |
| `virtual-guardians-of-the-machine.html` | The same program rebuilt for distributed teams (174 KB) |
| `guardians-facilitator-guide.html` | Prepared teach-block content, interactive (126 KB) |
| `guardians-facilitator-guide.docx` | The same guide, 55 print-ready pages |
| `learning-record-*.docx` (×5) | Fillable role-specific records, one per role |

### The two curriculum editions
Same 26 weeks, same roles, same 75 quiz questions, same capstone — but the virtual edition is a genuine adaptation rather than a note saying "use Zoom." Every physical mechanic is translated: whiteboards become a persistent shared board, "hold up a C/I/A card" becomes a meeting poll, gallery walks become screen-shared board walkthroughs, anonymous slips become anonymous polls, role pairs become pre-assigned breakout rooms. Each week carries a specific *Running this on video* note, and the cheat sheet gains an in-person→remote tooling translation table.

**The two files are maintained as a matched pair.** A change to one is applied to both. That rule is stated in the project because paired artifacts that silently drift apart are worse than a single file.

### The facilitator guide
The piece that determines whether the program actually gets run. For each of the 26 weeks:

- **Prep in 5** — the one thing to read if there are five minutes before the session
- **The hook** — a ready opening line that starts the block with energy
- **Talking points** — the lesson in plain, speakable language (109 total)
- **Examples & analogies** — drop-in comparisons that make abstract ideas land (78 total)
- **Put on screen** — short definitions to display while talking (111 total)
- **Anticipated questions** — the questions people actually ask, with solid answers (104 pairs)
- **Transition** — a sentence to move into the exercise
- **Running the exercise** — how to facilitate, with the on-video variant noted
- **Timing** — a split that keeps three hours on track

One source of content renders to both HTML and Word, so the two formats cannot fall out of sync. The HTML version has tap-to-reveal answers and progress tracking; the Word version is built for annotating on the couch.

---

## Frameworks applied

Used as working instruments, not cited as credentials:

**OWASP LLM Top 10** — the checklist applied to every LLM-layer threat in Phase 2.
**OWASP Agentic Top 10 (ASI01–ASI10)** — the backbone of Phase 3; goal hijack, tool misuse, memory poisoning, supply chain, cascading failures.
**MITRE ATLAS** — attacker tactics and techniques, taught as a navigable atlas rather than a reading assignment.
**NIST AI RMF** — Govern, Map, Measure, Manage structure Phase 4 and become the section structure of the capstone assessment.
**EU AI Act** — high-risk obligations for accuracy, robustness, and human oversight, applied to the bias and fairness weeks.

Week 4 teaches the meta-skill deliberately: read the ten titles, pick the entry that scares you most, find the real incident behind it, explain it to a teammate. Frameworks are reference books. Navigation skills outlive the entries.

---

## Design decisions worth noting

**The impossibility of a fairness definition is discovered, not announced.** Bias is introduced in Week 5 as an attack surface, then measured in Week 21 — after nineteen weeks of the team wanting a clean answer. The ordering makes the constraint land as a discovered limit that requires an accountable human, not a footnote.

**Threats are taught in isolation, then deliberately chained.** Weeks 6–10 build one threat at a time for clarity. Week 11 breaks that frame on purpose: teams design compound attacks chaining four threats, discover each link is survivable while the chain is not, and learn why no single role sees the whole picture. The team structure becomes self-justifying rather than asserted.

**Every attack pins to a lifecycle stage.** The Week 3 map turns intimidating attack names into locatable problems. By Week 17 a participant can place any threat on the lifecycle, name its framework entry, and cite a real incident.

**The capstone shifts the facilitator's role.** From Week 23 the guide explicitly stops supplying answers and coaches questions — *which lifecycle stage? which layer? which framework entry?* The scaffolding from Phases 1–4 unsticks nearly everything, which is the point.

**Quiz answer positions are shuffled deterministically** at render time rather than authored in place, so correct answers are not clustered and the distribution holds across all 75 questions.

---

## Scope — what this is not

Stated plainly, because boundaries protect credibility:

- **Not a certification.** No accrediting body stands behind it. It points participants toward AIGP, AAIR, CISA, and CRISC as the credentials that formalize what they demonstrate here.
- **No live attack tooling or exploit development.** Red teaming is taught as structured methodology and documentation discipline; a safe sandbox LLM is optional, not required.
- **No hands-on model training.** Participants govern and assess models; they do not build them.
- **The capstone system is fictional.** CareBridge AI is designed to exercise every threat class, not to mirror a specific vendor product.
- **No production deployment or MLOps content.**
- **Threat currency has a shelf life.** The 2026 threat landscape will age. The framework-navigation and defense-in-depth reasoning are the parts built to outlast it, and the program says so out loud in Week 26.

---

## Quality standards

All three HTML files are single self-contained documents with no external dependencies and no browser storage, verified by a headless render test that exercises every view — 29 views in each curriculum edition, 28 in the facilitator guide — and confirms zero runtime errors with substantive content in each.

The Word document is generated programmatically from the same content source as the HTML guide, then rendered to PDF and visually inspected page by page before shipping. Content is validated for completeness across all 26 weeks: no missing sections, no malformed question-answer pairs, no stray markup.

The paired-file rule is enforced by construction rather than discipline — the virtual edition is produced by transformation from the in-person source, so structural drift is not possible and content changes are applied to both.

---

## Running it

Open any HTML file in a browser. Nothing to install.

Facilitators need a conferencing client with breakout rooms and polls, one shared board (Miro, Mural, or Jamboard), and a shared drive folder. The Before Week 1 checklist in the virtual edition covers setup; the facilitator guide's *How to use* page covers everything else in about four minutes of reading.
