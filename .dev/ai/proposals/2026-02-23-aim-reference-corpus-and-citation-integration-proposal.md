# Proposal: AI-Generated Virtual Environments Reference Corpus and Citation Integration

**Generated:** 2026-02-23
**Status:** Draft
**Project:** MSF AI-Generated Virtual Environments Reference Site
**Author:** Codex (Research-Derived)
**Priority:** HIGH
**Type:** Architecture & Infrastructure (Multi-Phase)
**Parent:** None
**Companion Proposals:** None
**Research:** `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/generative-worlds/RESEARCH-INDEX.md`, `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/generative-worlds/synthesis/generative-worlds-consolidated-research.md`, `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/.dev/_sprints/2025-12-15-msf-wg/output/RESEARCH-REPORT-AI-GENERATED-VIRTUAL-ENVIRONMENTS.md`
**Handoff:** None
**CEO Vision:** None

---

## 1. Executive Summary

The current published reference site is clean and navigable, and it already includes a high-level source table in Appendix B. What it does not yet provide is a direct, auditable bridge between the published claims and the full deep-research corpus that produced those claims. The supporting data exists across a large markdown corpus (research prompts, model responses, mining notes, synthesis files, and use-case artifacts), but that material is not yet first-class in the site information architecture.

This proposal adds a formal "Reference Corpus" capability to the website: a deterministic ingestion process, a new subsection on the published site dedicated to corpus navigation, and a citation model that can be applied throughout the report pages. This gives readers a clear path from statement -> citation -> source artifact without forcing maintainers to hand-curate every relationship repeatedly.

The approach keeps the current content model (Astro + MDX) and extends it with structured source metadata, reusable citation components, and validation scripts so source links and citations remain coherent over time.

**Core Equation / Core Principle:**
```
Published Narrative = Curated Synthesis + Verifiable Source Graph + Deterministic Citation Rules
```

**What this delivers:**

1. **Reference Corpus Subsection.** A new appendix subsection that exposes the actual deep-research corpus and synthesis lineage as browsable, categorized references.
2. **Site-Wide Citation Framework.** Consistent in-document citation primitives and section-level source lists across major report pages.
3. **Validation and Governance.** Build-time checks that catch broken citations, orphaned sources, and unresolved links before publication.

**Estimated timeline:** 8-12 working days with 3 parallel agents across 4 phases.

---

## 2. Problem Statement

### 2.1 Source Transparency Gap

The site presents conclusions and synthesized analysis, but the deep-research evidence base is mostly represented as a summarized table rather than a navigable reference system tied to individual claims.

### 2.2 Specific Gaps

- No dedicated "reference corpus" subsection in `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/content/pages/appendices.mdx` that maps to the real markdown corpus.
- Deep research artifacts live primarily in `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/generative-worlds/` and `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/.dev/_sprints/2025-12-15-msf-wg/`, but are not represented as structured source entities in the site repo.
- No reusable citation primitive is currently enforced across core pages (e.g., `scope`, `landscape`, `implementations/*`, `standards`, `gaps`, `maturity`, `recommendations`).
- No citation-linting step exists in build/publish flow to guarantee every citation key resolves and every source record is valid.

### 2.3 What This Costs

- Readers cannot quickly verify which deep-research documents substantiate specific claims.
- Citation quality drifts over time because updates are manual and non-validated.
- Team velocity drops because each documentation update requires repeated rediscovery of source provenance.
- Confidence in the report as a reference asset is reduced when auditability is partial.

---

## 3. Proposed Architecture

### 3.1 Reference Corpus Pipeline

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Deep Research Corpus (msf-wg-tool)                                         │
│ - generative-worlds/*                                                       │
│ - .dev/_sprints/2025-12-15-msf-wg/*                                        │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │ manifest + metadata extraction
                                ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ Ingestion Script (msf site repo)                                            │
│ scripts/sync-reference-corpus.(mjs|cjs)                                     │
│ - normalize path, title, type, date, provenance, URL                        │
│ - emit canonical source IDs                                                 │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ Structured Source Layer                                                     │
│ src/data/reference/sources.json                                             │
│ src/data/reference/documents.json                                           │
│ src/data/reference/lineage.json                                             │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ Presentation Layer                                                          │
│ - Appendix subsection: "Reference Corpus"                                   │
│ - Citation components in MDX pages                                          │
│ - Section source blocks + backlink lists                                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

The ingestion script creates a deterministic source graph from the research markdown corpus, while the site renders that graph through an appendix subsection and reusable citation components.

### 3.2 Citation and Linking Model

Introduce canonical source IDs (`SRC-0001`, `SRC-0002`, ...) and optional synthesis IDs (`SYN-0001`, ...). Each cited claim in MDX references one or more IDs using a standardized citation component.

Minimum schema for `sources.json`:

- `id`: stable source identifier.
- `title`: display title.
- `source_type`: research-mining, synthesis, specification, github, blog, etc.
- `origin_path`: absolute corpus origin path.
- `published_url`: target URL if public.
- `date`: source date (ISO where possible).
- `tags`: topical tags for filtering.
- `used_in`: pages/sections citing the source.

This enables:

- Forward links (page claim -> source record).
- Reverse links (source record -> all citing pages/sections).
- Audit checks (unused sources, orphan citations, stale links).

### 3.3 Integration with Existing Infrastructure

| Existing System | Integration Point | Direction |
|---|---|---|
| **Astro content pages** | MDX citation component + section source blocks | Content -> source metadata |
| **Appendices page** | New Reference Corpus subsection in `appendices.mdx` (or split page) | Source metadata -> rendered reference |
| **Build pipeline** | Pre-build corpus sync + citation validation scripts | Corpus -> structured data -> static site |
| **Existing source table** | Migrate/extend Appendix B from manual list to generated source dataset | Generated data -> appendix table |

### 3.4 Technology Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Corpus representation | **Generated JSON manifests in site repo** | Keeps build deterministic and GitHub Pages compatible. |
| Citation primitive | **Reusable MDX component (`<Citation />`)** | Enforces consistency and avoids ad hoc inline patterns. |
| Reference subsection location | **Appendices (new dedicated subsection/page)** | Aligns with current IA and preserves reader expectation. |
| Validation | **Build-time lint scripts** | Prevents regressions and broken provenance links. |

---

## 4. Task Breakdown

### 4.1 New Components to Build

| ID | Component | Description | Depends On |
|----|-----------|-------------|------------|
| T1 | Corpus Sync Script | Extract and normalize deep-research markdown metadata into source manifests. | None |
| T2 | Citation Components | Implement reusable citation badge/link components for MDX pages. | T1 |
| T3 | Reference Corpus UI | Add appendix subsection/page for browsing corpus records and lineage. | T1 |
| T4 | Citation Lint | Validate citation IDs, source existence, and backlink integrity. | T1, T2 |
| T5 | Content Citation Pass | Add citations and source blocks across report pages. | T2, T4 |

### 4.2 Existing Components Reused (No Build Required)

| Component | Location | Used By |
|-----------|----------|---------|
| Dynamic content routing | `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/pages/[...slug].astro` | T3, T5 |
| Appendices content page | `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/content/pages/appendices.mdx` | T3 |
| Existing markdown corpus | `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/generative-worlds/` | T1 |

### 4.3 Files to Modify (Existing)

| File | Modification | Task |
|------|-------------|------|
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/content/pages/appendices.mdx` | Add Reference Corpus subsection, lineage map, generated source mapping blocks | T3 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/content/pages/landscape.mdx` | Add citations and section source block | T5 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/content/pages/standards.mdx` | Add citations and section source block | T5 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/content/pages/gaps.mdx` | Add citations and section source block | T5 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/content/pages/maturity.mdx` | Add citations and section source block | T5 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/content/pages/recommendations.mdx` | Add citations and section source block | T5 |

### 4.4 Files to Create (New)

| File/Directory | Purpose | Task |
|---|---|---|
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/scripts/sync-reference-corpus.cjs` | Generate source manifests from deep-research markdown corpus | T1 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/scripts/validate-citations.cjs` | Lint citation integrity and fail build on errors | T4 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/data/reference/sources.json` | Canonical source registry | T1 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/data/reference/lineage.json` | Synthesis-to-source lineage map | T1 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/components/Citation.astro` | Inline citation component | T2 |
| `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf/aim/reports/ai-generative-virtual-environments/src/components/SourceList.astro` | Rendered source list/backlinks component | T2, T3 |

---

## 5. Implementation Phases

### Phase 1: Corpus Model and Ingestion

**Goal:** Build deterministic source manifests from existing deep-research markdown corpus.

| Task | Deliverable | Effort | Parallel |
|------|-------------|--------|----------|
| T1: Corpus Sync Script | Generated `sources.json` + `lineage.json` | 2-3 days | Track A |

**Exit Criteria:**
- Corpus sync script produces stable source IDs across repeated runs.
- At least 90% of target deep-research artifacts are captured with valid metadata fields.

### Phase 2: Presentation Infrastructure

**Goal:** Add reusable citation and source rendering components plus appendix integration.

| Task | Deliverable | Effort | Parallel |
|------|-------------|--------|----------|
| T2: Citation Components | `<Citation />` and source list components | 1-2 days | Track A |
| T3: Reference Corpus UI | Appendix subsection/page rendering corpus + lineage | 1-2 days | Track B |

**Exit Criteria:**
- Citation component works in all content pages without style regressions.
- Reference Corpus subsection displays source inventory and synthesis lineage.

### Phase 3: Validation and Content Citation Pass

**Goal:** Apply citations across report pages and enforce integrity checks.

| Task | Deliverable | Effort | Parallel |
|------|-------------|--------|----------|
| T4: Citation Lint | Build-time citation validator | 1 day | Track A |
| T5: Content Citation Pass | Citations + section source lists across key pages | 3-4 days | Track B/C |

**Exit Criteria:**
- Build fails on unresolved citation IDs or missing source records.
- Key report pages include citation coverage for major factual claims.

### Phase 4: QA, Governance, and Rollout

**Goal:** Final verification and operational process for future updates.

| Task | Deliverable | Effort | Parallel |
|------|-------------|--------|----------|
| QA + docs | Validation report + maintenance runbook | 1-2 days | Track A |

**Exit Criteria:**
- End-to-end verification passed (source -> citation -> rendered page).
- Update runbook documented for future corpus refresh cycles.

### Phase Summary

| Phase | Duration | Dependencies | Parallel Tracks |
|-------|----------|-------------|-----------------|
| Phase 1: Corpus Model and Ingestion | 2-3 days | None | 1 |
| Phase 2: Presentation Infrastructure | 2-4 days | Phase 1 | 2 |
| Phase 3: Validation and Citation Pass | 4-5 days | Phase 2 | 2-3 |
| Phase 4: QA and Rollout | 1-2 days | Phase 3 | 1 |
| **Total** | **8-12 days** | | |

---

## 6. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Corpus path drift between repos** | MEDIUM | HIGH | Add explicit source-root config and validation that fails when roots are unavailable. |
| **Citation debt (incomplete coverage)** | HIGH | MEDIUM | Define per-page minimum citation thresholds and track completion checklist by page. |
| **Source ID churn** | MEDIUM | HIGH | Use deterministic ID generation with path+title hashing and lock file for overrides. |
| **Build complexity increase** | MEDIUM | MEDIUM | Keep sync/lint scripts independent and cache generated manifests. |
| **Link rot for external references** | HIGH | MEDIUM | Add periodic link validation and stale-link reporting in maintenance cycle. |

---

## 7. Validation Strategy

### 7.1 Unit Validation (Per Component)

**Corpus Sync (T1):**
- Run sync twice and verify identical `sources.json` output for same input corpus.
- Validate that every source has required fields (`id`, `title`, `source_type`, `origin_path`).

**Citation Components (T2):**
- Render citation in MDX with valid ID and verify output link points to source registry.
- Render citation with invalid ID and verify linter catches it pre-build.

**Citation Lint (T4):**
- Inject invalid citation key and confirm build exits non-zero.
- Inject orphaned source and confirm it is flagged in lint report.

### 7.2 Integration Validation

**Full Pipeline Test:**
1. Sync corpus from deep-research markdown roots.
2. Build site with citation lint enabled.
3. Navigate to Reference Corpus subsection and verify source inventory renders.
4. Open core pages and verify citations link to valid source records.
5. Confirm reverse links from source entries back to citing pages.

### 7.3 Acceptance Criteria for the Proposal Itself

- [ ] Reference Corpus subsection is present and includes deep-research and synthesis lineage.
- [ ] Core report pages include inline citations for major claims and section-level source blocks.
- [ ] Citation validator prevents broken source mappings from shipping.
- [ ] Source registry can be regenerated from corpus with deterministic IDs.

---

## 8. Work Order Generation Plan

Upon approval of this proposal, the following work orders should be created:

### WO Set 1: Reference Corpus + Citation Rollout

| WO ID | Title | Priority | Dependencies |
|-------|-------|----------|-------------|
| WO-msf-aim-ref-001 | Implement corpus sync + source manifest generation | 1 | None |
| WO-msf-aim-ref-002 | Add citation and source-list components | 1 | WO-msf-aim-ref-001 |
| WO-msf-aim-ref-003 | Add Reference Corpus subsection to appendices | 1 | WO-msf-aim-ref-001, WO-msf-aim-ref-002 |
| WO-msf-aim-ref-004 | Implement citation validation script + build hook | 1 | WO-msf-aim-ref-002 |
| WO-msf-aim-ref-005 | Citation pass: landscape/standards/gaps/maturity/recommendations | 1 | WO-msf-aim-ref-003, WO-msf-aim-ref-004 |
| WO-msf-aim-ref-006 | Citation pass: implementations profiles and appendix cleanup | 2 | WO-msf-aim-ref-005 |
| WO-msf-aim-ref-007 | QA, verification, and maintenance runbook | 1 | WO-msf-aim-ref-006 |

**Total Work Orders:** 7  
**Critical Path:** WO-msf-aim-ref-001 -> WO-msf-aim-ref-002 -> WO-msf-aim-ref-004 -> WO-msf-aim-ref-005 -> WO-msf-aim-ref-006 -> WO-msf-aim-ref-007

**Execution DAG:**
```
WO-001 ──> WO-002 ──> WO-004 ──> WO-005 ──> WO-006 ──> WO-007
   │           │
   └──────────>WO-003 ──────────┘
```

---

## 9. Review Checklist

### Architecture Review

- [ ] Source ingestion is deterministic and reproducible.
- [ ] Citation rendering is componentized, not ad hoc per page.
- [ ] Validation checks run automatically in build flow.

### Completeness Review

- [ ] Every new component is identified with a task ID.
- [ ] Dependencies between tasks are explicit and acyclic.
- [ ] Risk mitigations are actionable.

### Vision Alignment Review

- [ ] Proposal strengthens transparency and reference utility of the published report.
- [ ] Proposal keeps existing IA readable while increasing traceability.

---

## 10. Appendix (Optional)

Suggested initial corpus roots for Phase 1 ingestion:

- `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/generative-worlds/`
- `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/.dev/_sprints/2025-12-15-msf-wg/research-mining/`
- `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/.dev/_sprints/2025-12-15-msf-wg/output/`
- `/Users/grig/work/MSF - Metaverse Standards Forum/repo/msf-wg-tool/.dev/INBOX/msf-ai-generative-worlds/`

Suggested section-level citation rollout order:

1. `landscape.mdx`
2. `standards.mdx`
3. `gaps.mdx`
4. `maturity.mdx`
5. `recommendations.mdx`
6. `implementations/*.mdx`

---

*End of proposal.*
