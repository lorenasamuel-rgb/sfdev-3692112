# PRD — Rota Doc

**Product:** Rota Doc  
**Type:** festival-submission workspace + teaching archive  
**Document status:** draft for alignment  
**Version:** 1.2  
**Date:** 21 September 2026  
**Language:** English  
**Source of truth:** `main` (full product after [PR #12](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/12) merged)  
**UI languages:** Portuguese (default) and English (PT / EN switch)  
**Code:** `src/app`  
**User guide:** [`src/practice/MANUAL.md`](src/practice/MANUAL.md)  
**Teaching data:** `datasets/fictional-film-archive`

This document describes the product **as it stands on `main` today**, what it does not do, and what comes next. It replaces the draft in [PR #13](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/13), written when the archive, PT/EN, and Apple visual still lived only on `cursor/apple-on-visualizacoes-3ed7`.

---

## 1. Summary

Rota Doc helps **independent producers and first-time filmmakers** practise and organise a festival submission **without a distributor**.

The workspace is fed by the **Fictional Film Archive** (180 films, 40 festivals, fictional honours and awards) and uses a marketing visual (home in units, global nav, green accent `#00FF7D`).

Premises:

1. A film reaches a festival through a **submission**.
2. After that there is **curatorial selection**. Submitting **does not guarantee** a place in the programme.
3. Each festival has **its own rules**. The app matches the film against teaching rules; the **current call** (when the festival is real) wins. The catalogue in this version is **fictional**.

Navigation:

| Nav (UI label) | Route | Role |
| --- | --- | --- |
| Guia | `#/guia` | Common call requirements |
| **Start** | `#/filme` | **Take Action** film file |
| Festivais | `#/festivais` | Choose houses from the archive |
| Pacote | `#/pacote` | Festival package |
| Direitos | `#/direitos` | Clearances and licences |
| Inscrições | `#/inscricoes` | Seven steps per festival |
| Labs | `#/laboratorios` | Markets and pitching |
| **Search** | `#/arquivo` | 180 fictional films |
| Prêmios | `#/premios` | Selection → nomination → win |

Every section has **Next** and, when there is a previous page, **Back**. The route can be **downloaded as a PDF** (Start, Festivals, Package, Rights, Submissions).

---

## 2. Problem

Submitting an independent film is rules work, not distributor networking. First-time producers without a festival team often get expensive details wrong:

- **Premiere.** Publishing the whole film on YouTube, public Vimeo, or streaming burns the world / international premiere window.
- **Completion window.** Many festivals ask for a film completed in the last 12–24 months.
- **Runtime and form.** Short / medium / feature and documentary / drama / animation / experimental change category and section.
- **Screener and subtitles.** A private link, no geo-block, with English subtitles when the audio is not English.
- **Rights.** Music, archive, and interviews need to be licensed before the exhibition agreement.
- **Process.** Each house has its own site or FilmFreeway. Without a board, people pay a fee too early or mix a **finished film** with a **work in development**.
- **Learning.** The route (including the awards journey) has to be practised without republishing real client-archive data.

Generic tools do not match the film file against each house’s rules, do not split the two routes, and do not teach selection → nomination → win.

---

## 3. Goals

### 3.1 Product goals

- Make an independent or first-timer **ready to submit** (or to practise submitting) with a clear view of what is still missing.
- Avoid **useless or harmful** submissions (public film, spent premiere, WIP in official selection, completion outside the window).
- Gather the festival package and rights check **once**.
- Track each submission through the **seven steps**, through to the exhibition agreement.
- Teach, in craft language, that **submission ≠ selection**.
- Use the fictional archive for **Search**, **Awards**, and filling the Take Action file without copying real works.
- Deliver the route in **PT and EN** and in a product visual, not a classroom exercise.
- Let people **take the route out of the browser** (PDF).

### 3.2 Non-goals

Rota Doc does **not**:

- send the submission, pay a fee, or fill in FilmFreeway;
- replace the call, the curation, or legal advice;
- guarantee a slot, a prize, or distribution;
- act as a distributor or a discovery platform for end audiences;
- sync data across devices in this version;
- use **real** festivals, films, or awards in the current catalogue (they are teaching records).

### 3.3 Principles

1. **Rules first.** Every recommendation points back to the call (or makes it clear the catalogue is teaching material).
2. **Submission ≠ outcome.** Copy, status, and steps separate sending from selection.
3. **Two routes.** Locked picture → official selection. Open project → labs, markets, pitching.
4. **Premiere is a strategic asset.** Warn against publishing the whole film publicly.
5. **Independents and first-timers belong**, as long as the film fits the rule.
6. **Guidance, not a verdict.** “Eligible” never means “it will get in”.
7. **Prepare once, reuse.** Package and rights are not redesigned for each festival.
8. **The fictional archive is teaching infrastructure**, not an editorial catalogue to publish as real.

---

## 4. Audience

### 4.1 Primary persona — independent producer / first-time director

- Has a film (often in Portuguese) and no distributor.
- Needs to decide where to submit, when to spend the premiere, and what to gather before paying a fee.
- In this version also **practises** the route with archive titles.

### 4.2 Secondary persona — film in development

- Picture and sound are not locked.
- Is looking for a co-producer, fund, lab, or market.
- Must not be pushed into official selection for finished films.

### 4.3 Course persona — bootcamp learner

- Needs the Archive and Awards screens, the PT/EN switch, and a product visual to present the work.
- Must not republish the client archive (Directors Notes); only the fictional dataset.

### 4.4 Out of audience in this version

- Festival programmers (there is no screener queue).
- Viewers / Netflix-style discovery.
- Anyone who needs a live calendar of real calls (that existed in the earlier 12-festival documentary slice; it is not on current `main`).

---

## 5. Current state (`main`)

React + Vite SPA, hash routing, `localStorage`, PT/EN i18n, Apple-style marketing visual, Stage 3 dataset.

### 5.1 Surfaces

| Surface | Status |
| --- | --- |
| Home | Units (Festivals, Package, Archive, Awards, Labs) + disclaimer ribbon |
| Start / Take Action | Full film file, archive title search, sample, PDF, coloured meter |
| Festivals | 40 fictional houses; name search; filters; eligibility match |
| Package / Rights | Checklists + Next / Back pager |
| Submissions | Status, seven steps, notes, PDF |
| Guide / Labs | Common requirements and the development route |
| Search (Archive) | 180 films; form / country / text filters; “Use in submission” |
| Awards | Honours: Official Selection → Longlisted → Shortlisted → Nominated → Special Mention → Winner |
| Chrome | Global nav, mobile menu, PT/EN, accent `#00FF7D` |

### 5.2 Visual and interaction

- Home in Apple-style **units** (short titles, “Learn more”).
- Global nav with mark, language, and a mobile hamburger.
- **Next** and **Back** buttons in green `#00FF7D`.
- Active section, completed checkboxes, and Labs bullets in the same green.
- Readiness meter: **red &lt; 50**, **amber 50–70**, **green `#00FF7D` &gt; 70**.
- Film file titled **Take Action** (nav: **Start**).
- Archive in the nav as **Search**.

Open PRs that may change visual identity only, not requirements: [PR #14](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/14) (cinema) and [PR #15](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/15) (green `#114022`).

### 5.3 Earlier slice

Before PR #12, `main` held a smaller slice: 12 **real** documentary festivals, no Archive, no Awards, no PT/EN, no PDF, and no Apple visual. That slice is **no longer the official product**. Combining “practice mode (fictional archive) vs season mode (real calls)” returns as P1 (N-01).

---

## 6. Journeys

### J1 — Take Action: register or pull from the archive

1. The person opens Start (**Take Action**).
2. They fill the file, search an archive title, or load the sample.
3. They see the 0–100 score change colour with the band.
4. They continue to Festivals with **Next**.

**Success:** the header shows title + score + submission count. With no title, Festivals asks them to register.

### J2 — Choose festivals

1. Search by **name** and/or filter region, country, focus, eligible only, labs.
2. Open the house file: matches, warnings, blocks, premiere sections.
3. Add to submissions only after reading the summary (teaching catalogue).

**Success:** a public film, WIP at the wrong house, or completion outside the window shows as **likely ineligible**.

### J3 — Package and rights

1. Tick texts, stills, screener, subtitles (15 items).
2. Check interviews, minors, music, archive, locations, authority. E&O is post-submission.

### J4 — Track a submission and export

1. Initial status *Considering*, step 1 ticked.
2. form + screener + fee ⇒ *Submitted*; + wait ⇒ *Awaiting selection*.
3. *Selected* reminds them of the agreement and delivery copy.
4. **Download PDF** gathers Start, Festivals, Package, Rights, and Submissions.

### J5 — Search and Awards (teaching)

1. In Search, filter 180 films and click **Use in submission**.
2. In Awards, see the journey through to Winner and open the film into the file.
3. Understand that honours are fictional.

### J6 — Film not locked yet

WIP stage or entry through Labs. Official selection at finished-only houses is ineligible, with a pointer to market / lab.

---

## 7. Functional requirements

**P0** = the current product does not exist without this (already implemented, unless a gap is called out).  
**P1** = next slice (section 8).

### 7.1 Start / Take Action (film file)

| ID | Requirement | Pri | Acceptance |
| --- | --- | --- | --- |
| F-01 | File with identity, credits, premiere, screener, and who is submitting | P0 | Auto-saves on type |
| F-02 | Original title is an archive search | P0 | Picking a result fills the file |
| F-03 | Forms: Documentary, Drama, Animation, Experimental | P0 | Default Documentary |
| F-04 | Stage: finished vs WIP | P0 | Affects eligibility |
| F-05 | Premiere status: none / national / european / international / world | P0 | Matches festival sections |
| F-06 | Public-publication flag (YouTube / public Vimeo / streaming) | P0 | Marks ineligible for premiere competitions |
| F-07 | Load archive sample (`film-001`) | P0 | Package ticked; E&O left off |
| F-08 | Readiness score 0–100 on the file and in the header | P0 | Red / amber / green bands |
| F-09 | PDF from the film file | P0 | Local download, no server |
| F-10 | Hint when the film came from the archive | P0 | Shows title and year |

Film-file fields: original title, English title, logline, short synopsis, full synopsis, runtime (min), completion date, country, languages, form, stage, premiere, public publication, screener (URL + password), English subtitles, .srt file, director, bio, statement, producer, email, phone.

### 7.2 Eligibility engine

| ID | Requirement | Pri | Acceptance |
| --- | --- | --- | --- |
| E-01 | Status: eligible / review the rules / likely ineligible | P0 | Issues block; warnings ask for review |
| E-02 | WIP only at `acceptsWip` houses (New Voices in the archive) | P0 | Otherwise, pointer to Labs |
| E-03 | Runtime: short &lt; shortMax (40); medium if mediumMax exists; else feature | P0 | `shortOnly` house blocks a feature |
| E-04 | Form overlap with `focusTags` | P0 | Mismatch is a warning, not an issue |
| E-05 | Completion window (`completionMaxMonths` or `completionAfter`) | P0 | No date: warning; outside: ineligible |
| E-06 | Public publication burns premiere | P0 | Only sections `required: none` survive |
| E-07 | Premiere still on offer vs required by the section | P0 | Full or partial block |
| E-08 | English subtitles if audio is not English and the house requires them | P0 | No language: warning; language set and no subs: issue |
| E-09 | Missing screener is a warning | P0 | Does not block on its own |
| E-10 | Independents and first-timers as positive matches | P0 | Every current archive house is open |
| E-11 | Score 0–100 from issues / warnings / matches | P0 | List sorted by score |

The engine lives in `src/app/src/lib/eligibility.js`, with tests in `eligibility.test.js`. Rule summaries are **teaching material**.

### 7.3 Package and rights

| ID | Requirement | Pri | Acceptance |
| --- | --- | --- | --- |
| P-01 | 15 grouped festival-package items | P0 | Texts, director, images, screener, contact |
| P-02 | “If selected” list (DCP, press kit, clean trailer, accessibility, agreement) | P0 | Informational, no checkbox |
| P-03 | 9 rights items | P0 | Interviews, minors, composition, master, stills, video, locations, authority, E&O |
| P-04 | Checklists feed the readiness score | P0 | Up to 12 points each |
| P-05 | E&O treated as post-submission | P0 | Hint makes that explicit |

### 7.4 Submissions and seven steps

| ID | Requirement | Pri | Acceptance |
| --- | --- | --- | --- |
| S-01 | Tracker per festival, no duplicates | P0 | One record per house |
| S-02 | Status: considering, submitted, awaiting, selected, not selected, withdrawn | P0 | Always editable by hand |
| S-03 | Seven steps: choose → rules → form → screener → fee → wait → agreement/copy | P0 | Step 1 ticked on add |
| S-04 | form + screener + fee ⇒ Submitted; + wait ⇒ Awaiting (from Considering / Submitted) | P0 | Does not demote Selected / Not selected / Withdrawn |
| S-05 | Free notes | P0 | Persist |
| S-06 | Remove ≠ withdraw at the festival | P0 | Copy is local tracking |
| S-07 | Selected reminds of the agreement and delivery | P0 | Note on the card |
| S-08 | PDF also from Submissions | P0 | Same report as the film file |
| S-09 | **Clear the whole route** (file + checklists + submissions) | P0 | State returns to empty in the same browser |

Seven steps (product):

1. Choose the festivals
2. Check the rules
3. Fill in the submission (outside the app)
4. Send the screener
5. Pay the fee (when there is one)
6. Wait for selection
7. Agreement and final copy

**Known gap:** the “Clear form” button appears on **every** section (via `SectionPager`) and calls `clearFilm`, which wipes the whole route — not only the film file. See P1 N-07.

### 7.5 Search (Archive) and Awards

| ID | Requirement | Pri | Acceptance |
| --- | --- | --- | --- |
| A-01 | List Stage 3 films with poster, form, country, runtime | P0 | Fictional dataset; posters at `/archive-images` |
| A-02 | Filter by search / form / country; “show more” pagination (24) | P0 | Friendly empty state |
| A-03 | **Use in submission** fills Take Action and goes to Start | P0 | Film in use is marked |
| AW-01 | List honours with year, film, body, section, result | P0 | Result order: Official Selection → … → Winner |
| AW-02 | Filter by text, result, and type (festival vs award); pagination 40 | P0 | Clicking the film loads the file |
| AW-03 | Make it explicit that the journey is teaching material | P0 | Copy does not claim real prizes |

Related: issue [#3](https://github.com/lorenasamuel-rgb/sfdev-3692112/issues/3) (awards journey for the person’s own film) and issue [#10](https://github.com/lorenasamuel-rgb/sfdev-3692112/issues/10) (update the dataset).

### 7.6 Guide, Labs, home, chrome, i18n, PDF

| ID | Requirement | Pri | Acceptance |
| --- | --- | --- | --- |
| G-01 | Home explains the thesis, units, two routes, seven steps | P0 | CTAs to Start, Festivals, Archive, Awards |
| G-02 | Guide: finished, completion, runtime, premiere, screener, subtitles, rights, fee, deadline | P0 | Does not replace the call |
| G-03 | Labs: when to use a market / pitch | P0 | Distinct from official selection; `hasLabs` houses |
| G-04 | Nav with i18n labels; Start and Search as UI names | P0 | Current section highlighted in green |
| G-05 | Ribbon + footer: submission ≠ selection; fictional dataset | P0 | Every page |
| G-06 | **Next / Back** on every `SECTION_FLOW` section | P0 | First has no Back; last has no Next |
| G-07 | Premiere warning on home, guide, and where the file asks about publication | P0 | Private passworded link ≠ public release |
| I-01 | PT / EN switch in the top bar and the menu | P0 | Whole UI changes language; dataset titles stay in English |
| I-02 | Locale persists in the browser (`rota-doc-locale`) | P0 | Reload keeps PT or EN; `lang` and `<title>` follow |
| R-01 | PDF covers Start, Festivals, Package, Rights, Submissions | P0 | Includes teaching disclaimer and readiness score |
| R-02 | PDF lists up to 8 tracked or not-yet-ineligible festivals | P0 | Submissions beyond the cap still appear |
| R-03 | PDF built on the client (`pdf-lib`); screener password never goes to a server | P0 | Filename `rota-doc-report-{slug}.pdf` |

### 7.7 Persistence

| ID | Requirement | Pri | Acceptance |
| --- | --- | --- | --- |
| ST-01 | `localStorage` key `rota-doc-state-v2`, with read fallback to `rota-doc-state-v1` | P0 | File, package, rights, submissions |
| ST-02 | Invalid JSON falls back to empty without crashing | P0 | App opens |
| ST-03 | Document loss on cache clear / other profile / private mode | P0 | README + MANUAL |

**Known gap:** the MANUAL still names `rota-doc-state-v1` as the live key. See P1 N-08.

---

## 8. Immediate sequence (P1)

| ID | Requirement | Why |
| --- | --- | --- |
| N-01 | Combine the **real** documentary catalogue (earlier slice) with the teaching archive (practice mode vs season mode) | Only the fictional archive is on `main` today |
| N-02 | Calendar deadlines (early / regular / late) | Fee is still qualitative (`fees.amount = varies`) |
| N-03 | Several films in the same browser | One JSON blob does not cover a real producer |
| N-04 | Labs in the tracker (pitching / market / co-production) | The second route exists in copy, barely in tracking |
| N-05 | Awards journey for **the person’s film**, not only the archive | Issue #3; Awards today is the teaching dataset |
| N-06 | Optional account / sync after PDF export | PDF already gets the data out of the browser; sync is the next step |
| N-07 | Split **clear the file** from **clear the whole route** | The current button wipes checklists and submissions from any section |
| N-08 | Align MANUAL and READMEs with `rota-doc-state-v2` and the `src/app` / `src/practice` paths | Usage docs lagged the folder reorganisation |
| N-09 | Update the teaching dataset when the brief asks | Issue #10 |

---

## 9. Out of scope in this phase

- Real submission send / FilmFreeway API / payment.
- PDF call parser.
- An “always current” catalogue with no curation.
- Audience discovery (semantic search, Netflix homepage, sponsor matching, interview generation).
- Native app.
- Republishing the Directors Notes client archive.

The AI discovery brief (kanban on another branch / [PR #1](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/1)) is **a different product**.

---

## 10. Experience and content

### 10.1 Section flow (`SECTION_FLOW`)

```text
Guide → Start → Festivals → Package → Rights → Submissions → Labs → Search → Awards
```

Canonical submission flow: **Start → Package / Rights → Festivals → Submissions** (+ PDF).  
Teaching flow: **Search / Awards → Start**.

### 10.2 Tone

- Craft language (call, screener, premiere, agreement), in PT and EN.
- A marketing visual does not license “dream prize” copy as a **promise**; home may invite, the ribbon disclaimer rules.
- Always return the decision to the call (or make the fictional character explicit).

### 10.3 Accessibility

- Labels on fields; badges with text, not colour alone (`badge-eligible` and so on).
- `aria-current` on the active section; menu with Escape and `aria-expanded`.
- Meter with an `aria-label` for the score.
- Contrast of green `#00FF7D` on a light background must stay readable (button type vs body copy).

---

## 11. Data

### 11.1 Client state

```text
{
  film: { …file, form, archiveFilmId?, archiveYear?… },
  package: { [itemId]: boolean },
  rights: { [itemId]: boolean },
  submissions: [{ id, festivalId, status, notes, steps, createdAt }]
}
```

UI locale (`rota-doc-locale`) is persisted apart from the route state.

### 11.2 Fictional Film Archive

Stage 3 wired in `src/app/src/data/archive.js`:

- 180 films → Search and filling the file
- 40 festivals → teaching submission catalogue
- 120 people, 24 companies, 12 awards, 495 honours → Awards

Do not copy or transform client records. Abstract posters in `datasets/fictional-film-archive/images`, served at `/archive-images`.

Teaching mapping (not a real call):

- `acceptsWip` / `hasLabs` when focus includes **New voices**
- `shortOnly` when focus includes **Short film** (40 min ceiling)
- English subtitles required outside Portugal / Brazil
- typical completion window: 24 months
- documentary competition in the archive asks for an international premiere; other sections, `none`

### 11.3 PDF

Built on the client (`reportModel` + `reportPdf` + `downloadReport`). Does not upload the file or screener password to a server. Characters outside Latin-1 are stripped (`pdfSafe`) because the PDF uses Helvetica.

---

## 12. Non-functional requirements

| Area | Requirement |
| --- | --- |
| Stack | React 19 + Vite 8; code in `src/app`; dataset in `datasets/fictional-film-archive` |
| Dev | `cd src/app && npm install && npm run dev` → **http://localhost:7363** (`strictPort`) |
| Preview | `npm run preview` → **http://localhost:7364** |
| Tests | Eligibility, i18n, sections, PDF (`npm test` in `src/app`) |
| Lint / build | `npm run lint` (oxlint) and `npm run build` |
| Privacy | File and screener password stay in the browser; PDF is a local download |
| Legal | UI, ribbon, footer, MANUAL, and PDF: teaching / fictional; submission ≠ selection |
| i18n | Strings in `src/app/src/i18n/strings.js`; eligibility rules are not born mixed into copy |
| Practice shortcut | `src/practice/package.json` has `start` / `dev` / `test` scripts pointing at `src/app` (paths relative to the manifest folder) |

---

## 13. Success metrics

No analytics in the MVP. When there are some, measure **process**, not selection.

- One session: file filled (or an archive title) + a badge per festival.
- Near-misses visible: public publication, WIP, window, subtitles.
- PDF generated with the five sections after ticking package / rights.
- Learner can switch PT/EN without losing the file.
- Engine and PDF tests green.

We do not treat as success: count of “eligible”, fees paid, films selected.

---

## 14. Risks

| Risk | Mitigation |
| --- | --- |
| Fictional catalogue read as a real call | Ribbon, footer, MANUAL, PDF, README |
| Prize copy vs principle 2 | Ribbon and badges do not promise a win |
| Green `#00FF7D` unreadable | Use the green on buttons / accents, not long copy on white |
| `localStorage` loss | PDF (already exists) + document reset |
| Client dataset vs fictional | Only the invented archive enters the app |
| “Clear form” wipes the route | N-07; until then, MANUAL should warn |
| Visual-identity PRs drifting from the PRD | #14 / #15 are skin; this version’s requirements do not change |

---

## 15. Roadmap

### Now — `main` (shipped in PR #12)

Apple workspace + PT/EN + Take Action + Search + Awards + pager + PDF + fictional archive. Folders reorganised into `src/app`, `src/practice`, and `datasets/`.

### Next — P1 (section 8)

Practice vs real-season mode, deadlines, several films, labs in the tracker, awards for the person’s film, clear file vs route, aligned docs, dataset (issues #3 and #10).

### Later — P2

Optional account, season calendar, more Portuguese-language houses when real mode returns.

### Explicitly a different product

AI discovery, dynamic homepage, metadata extraction, sponsor matching.

---

## 16. Open questions

1. Who versions the catalogue each season if real mode (N-01) returns?
2. Should the awards journey stay on the teaching dataset only, or does the person’s film get its own board (issue #3)?
3. Is Apple green `#00FF7D` the lasting brand, or does the product move to cinema / `#114022` (PRs #14 and #15)?
4. Labs in the same tracker or a board of their own?
5. Should clear ask for confirmation before wiping the route?

**Settled in this version:** the official product is `main` with the fictional archive + Apple visual, not the earlier 12-festival real-documentary slice.

---

## 17. Appendix

### How to open the product

From the repository folder:

```bash
cd src/app
npm install
npm test
npm run dev
```

Opens **http://localhost:7363/**.

Build / preview:

```bash
npm run build
npm run preview
```

Preview at **http://localhost:7364/**.

### Relation to other artefacts

| Artefact | Role |
| --- | --- |
| `main` | Product described in this PRD |
| [PR #12](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/12) | Merge that made this slice official |
| [PR #13](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/13) | Earlier PRD draft (stale: still treats the Apple branch as off `main`) |
| [`src/practice/MANUAL.md`](src/practice/MANUAL.md) | User guide |
| `src/practice/week2-practice` | Pedagogical readiness prototype (HTML / JS, not the app) |
| `datasets/fictional-film-archive` | Teaching dataset Stages 1–3 |
| [PR #11](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/11) | Earlier Apple experiment, on a different base |
| [PR #1](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/1) / AI discovery brief | A different product |
| Issue [#3](https://github.com/lorenasamuel-rgb/sfdev-3692112/issues/3) | Awards-journey bookmark |
| Issue [#10](https://github.com/lorenasamuel-rgb/sfdev-3692112/issues/10) | Update the dataset |

### Sample film

`film-001` from the archive (do not send it to a real festival). Used to demonstrate Take Action, matching, and the PDF.

---

*Rota Doc organises the submission process. Selection is curatorial. The catalogue in this version is fictional. Confirm deadlines, fees, and premiere status on the official site when the house is real.*
