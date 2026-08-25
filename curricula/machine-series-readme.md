# AI Governance Practitioner Portfolio
## Building the Machine → Taming the Machine

A two-part practicum taking a learner from zero programming experience to producing the three professional assessment documents an AI governance function runs on: a **Model Risk Assessment**, a **Model Bias Assessment**, and a **Responsible AI Assessment**.

**122 days · 13 portfolio artifacts · ~135 hours of hands-on work · all runnable on free-tier compute**

---

## Why this exists

AI governance hiring has a credibility gap that runs in both directions.

Candidates from **compliance backgrounds** can name every framework and cannot verify a single technical claim made to them — they accept a vendor's "no statistically significant disparity" without asking about statistical power.

Candidates from **data science backgrounds** can compute anything and cannot say which fairness definition should govern a use case, who owns the decision threshold, or what document a finding belongs in.

The scarce and valuable profile is the person who holds both halves. This curriculum was built to produce that person, on the premise that **you cannot meaningfully assess a model you could not have built**. Every governance claim it teaches, the learner has personally produced the evidence for.

---

## The two courses

### Building the Machine — foundation
**61 days · ~41 hours · no prerequisites**

Takes someone who has never written code and makes them able to audit a machine learning model. Not "understand ML conceptually" — actually train one, break it, measure who it fails, and document the result.

The governance lens is present from Day 1 rather than appended at the end. The learner meets proxy variables, hidden disparities and correlation fallacies *while* learning what a dataset is, so that when formal fairness metrics arrive the intuition is already built.

**Arc:** data literacy → classical ML → evaluation and fairness → deep learning → LLMs → deployment and governance.

### Taming the Machine — professional practice
**61 days · ~94 hours · assumes the first course**

Takes a competent technical auditor and makes them a practitioner who produces work product. The premise is that computing correctly is not the job — scoping an assessment, deciding what to measure, diagnosing mechanism, pricing the trade, routing decisions to accountable humans, and writing so a director acts: that is the job.

**Arc:** statistical rigour and tooling → advanced models and evaluation → advanced fairness and monitoring → three assessment builds → integration, defence, and the job market.

---

## What gets built

Thirteen artifacts, each committed to a public repository with a written reflection. They compose rather than stand alone — each phase's output becomes the next phase's input.

### Building the Machine

| # | Artifact | What it demonstrates |
|---|---|---|
| 1 | Dataset profile | Identifying representation gaps and proxy risk before a model exists |
| 2 | Trained classifier | Building the thing that will later be governed |
| 3 | Bias audit + mitigation | Measuring disparity, mitigating it, and showing what the mitigation cost |
| 4 | Neural network | Working with opaque model families and reasoning about their limits |
| 5 | LLM evaluation harness | Measuring a generative system with a reusable instrument |
| 6 | Complete audit | Carrying a model through a full technical review |

### Taming the Machine

| # | Artifact | What it demonstrates |
|---|---|---|
| 1 | Tested audit module + CI | Building governance tooling and proving it still computes correctly |
| 2 | Full evaluation gauntlet | Evaluating like a model validation team |
| 3 | Mitigation proof | Pricing a fairness trade with uncertainty attached |
| **4** | **Model Risk Assessment** | Producing the document a risk function operates on |
| **5** | **Model Bias Assessment** | Producing a statute-methodology audit with alternatives analysis |
| **6** | **Responsible AI Assessment** | Scoping societal impact and binding proportionate obligations |
| 7 | Complete governance engagement | Doing all of it, coherently, on an unfamiliar system |

The three flagship assessments **cross-cite a single evidence base** rather than duplicating it: the risk assessment is the container, the bias assessment takes one risk family to legal depth, and the responsible AI assessment supplies the context layer that sets obligations. That interlock is how a real governance function's outputs relate — and it is a question interviewers ask directly.

---

## How each phase earns its deliverable

### Building the Machine

**Days 1–10 → Dataset Profile.** Data is taught as non-neutral before any model appears. Averages that hide disparities, spread as a reliability signal, proxy variables, causal fallacies — bias concepts delivered as statistics. Establishes the motion that recurs across both courses: *compute per group, compare.*

**Days 11–24 → Trained Classifier.** The mechanism of learning, each concept paired with its governance reading. Leakage and feature engineering are taught as audit findings; ensembles introduce the transparency-for-power trade the learner will spend both courses managing.

**Days 25–36 → Bias Audit & Mitigation.** The intellectual core. Error rates and *who they fall on*; the accuracy paradox; base rates. Then the three fairness definitions in sequence — and only then the **impossibility theorem** proving they cannot be jointly satisfied. The ordering is deliberate: the learner wants all three before discovering they cannot have them, so the theorem lands as a discovered constraint that reframes fairness from a technical target into a normative choice requiring an accountable human.

**Days 37–48 → Neural Network.** Built from the neuron up so nothing arrives as magic, peaking at the interpretability crisis and transfer learning — where the learner discovers they will govern systems whose training they cannot inspect.

**Days 49–56 → LLM Eval Harness.** Attention, tokenisation and its non-neutrality across languages, RLHF, prompt injection, RAG and hallucination. Ends with a reusable harness, because measuring a generative system is a different skill from describing one.

**Days 57–60 → Complete Audit.** Drift and monitoring, documentation as governance, framework mapping, then a full technical review.

### Taming the Machine

**Days 1–10 → Tested Audit Module.** The statistics the first course deliberately omitted: bootstrap, confidence intervals on fairness metrics, the abuses of p-values, effect sizes, drift mathematics, calibration decomposition, Shapley values. The phase's pivot is encoding statistical honesty *into the tooling itself* — a significance method that refuses to return a bare p-value on an underpowered subgroup. A policy becomes a control. Shipped with a test suite, pinned environment and CI.

**Days 11–24 → Full Gauntlet.** Gradient boosting, imbalance handling as a values decision in disguise, calibration repair, explanation triangulated across three methods, uncertainty quantification. The hinge: the learner **fine-tunes a transformer on free hardware, then audits their own model and finds imported bias** — with task data that contains no demographic signal, isolating pretraining as the source. Supply-chain risk becomes something demonstrated, not read about.

**Days 25–32 → Mitigation Proof.** From running fairness tools to knowing where they stop. Every library output gets an interval, a multiplicity correction and a minimum cell size. Two mitigations applied and priced, intersectionality with its statistical cost, and a live monitor with a frozen baseline.

**Days 33–41 → Model Risk Assessment.** Nine days walking the NIST AI RMF functions as document sections: scoping and inventory, risk identification, the register, measurement traceability, control gaps, treatment with signed residual acceptance — and report writing, the last-mile skill that determines whether the analysis changes anything.

**Days 42–49 → Model Bias Assessment.** Built to NYC Local Law 144 methodology: independence, mandated categories, a SQL lab building and reconciling the audit population from source tables, impact ratios, an extended battery including a stage-by-stage audit of the whole decision system, root-cause analysis, validity evidence and differential prediction, and the two-document publication pattern. Teaches both halves of the Uniform Guidelines — the four-fifths screen *and* the validity requirement that accompanies it.

**Days 50–60 → Responsible AI Assessment + Capstone.** System profile and foreseeable-misuse register, harms and benefits held to equal rigour, scored impact levels driving an obligations ladder, ISO 42001 linkage. Then integration, executive defence, honest market positioning, and a full engagement on a fresh system.

---

## Frameworks and standards applied

Applied in practice, not merely cited:

**NIST AI Risk Management Framework** — the four functions structure the Model Risk Assessment end to end.
**ISO/IEC 42001** — AI management system; Annex A controls and a Statement of Applicability.
**ISO/IEC 42005** — AI system impact assessment process.
**ISO/IEC 23894** — AI risk management, informing register and treatment discipline.
**NYC Local Law 144** — independent bias audit methodology, intersectional impact ratios, public summary.
**Uniform Guidelines on Employee Selection Procedures (29 CFR 1607)** — the four-fifths rule *and* the validity-evidence requirement.
**EU AI Act** — risk tiering, post-market monitoring, human oversight.
**Canada's Algorithmic Impact Assessment** — scored proportionality driving obligations.
**SR 11-7 model risk tradition** — effective challenge, independent validation, out-of-time testing.

---

## What carries forward after Day 60

**Cheat sheets** in both courses, organised for use under pressure rather than as topic indexes — killer audit questions by lifecycle stage, traps to catch on sight, threshold conventions, and the three reusable assessment skeletons. The intermediate sheet includes a maintenance calendar, because frameworks change and a reference that silently goes stale is worse than none.

**65 interview questions with in-depth answers**, balanced across technical, governance and frameworks, scenario, and behavioural. Every answer ties back to specific days in both courses, so a thin answer points directly at the material to revisit. The answers model *structure* rather than script — and they build in honest positioning, disclosing solo work on public data, because an inspectable portfolio makes precision free and exaggeration fatal.

---

## Scope — what this does not cover

Stated plainly, because boundaries protect credibility:

- No deep reinforcement learning, generative image/video modelling, or NLP research methods
- No MLOps or production engineering — the courses govern deployed systems, they do not deploy them
- No legal advice; regulatory material teaches how to read and apply published requirements
- No general SQL or data-engineering track beyond building and reconciling an audit population; no SAS
- No psychometric test construction — validity evidence is taught to the depth needed to *audit*, not to build instruments
- Jurisdictional focus is US and EU, with Canada as a proportionality reference
- **Not a certification.** No accrediting body stands behind this. The value is the artifacts and the demonstrable skill.

---

## Quality standards

Both courses are single self-contained HTML files with no build step or dependencies, and both pass an automated five-pass review re-run after every substantive edit: structural integrity, assessment integrity, content and code accuracy, cross-reference resolution, and reference-layer coverage — plus a headless render test of all 122 days and a WCAG AA contrast audit.

Assessment construction is held to measured standards rather than assumed ones. Answer positions are balanced and non-periodic; correct answers are not systematically longest (within 2–7% of distractor length); absolutes are not concentrated in wrong answers nor hedging in right ones. Every cross-reference between the courses resolves to a day whose content supports the claim.

The review process is documented honestly, including its limits: automated passes verify machine-checkable properties and cannot verify that a claim is *true* or that language does not overclaim. A domain-truth pass against primary sources and a rhetoric pass are run manually, after both categories of defect survived the automated review at least once.
