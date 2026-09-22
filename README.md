# Rota Doc

**Festival submissions rarely fail for lack of talent. They fail for lack of method.**

Rota Doc is a web app that turns festival submission into a clear seven-step route: put the film on file, cross its data against each festival's rules, build the materials package, clear the rights, and track every entry through to the exhibition agreement.

**[Try the live demo](https://rota-doc-seven.vercel.app/#/)** · **[See the presentation](https://gamma.app/docs/Rota-Doc-or-Award-Journey-bxo3mm0wsgcwhc2)**

The demo opens in Portuguese, so press **EN** in the header first. It also starts with an empty film file, and the quickest tour fills it: open **Archive**, pick any title and press **Use for submission**, then go to **Festivals** and watch 40 eligibility verdicts appear against that film. Everything you enter stays in your own browser.

---

## The problem

An independent producer or a first-time director trying to enter a short film hits the same wall every time:

- **The rules are long and the decisive detail is buried.** Maximum running time, completion window, premiere status, mandatory English subtitles: every festival combines those rules differently.
- **One mistake costs the whole submission.** Publishing the full film on YouTube before settling on a festival strategy destroys premiere status and closes doors that do not reopen.
- **The fee gets paid before the rules get read.** Plenty of filmmakers discover the film was ineligible only after paying.
- **The same materials are rebuilt for every entry.** Logline, synopses, stills, director biography, passworded screener: each form starts from scratch.
- **Tracking lives in spreadsheets.** Deadlines, statuses and passwords scattered across files nobody keeps current.

## The solution

Rota Doc answers that with a single route and an eligibility engine that reads the film file and each festival's profile at the same time.

| Step | In the app | What it solves |
| --- | --- | --- |
| 1. Choose festivals | **Festivals** | Filters 40 festivals by region, editorial focus, labs strand and real eligibility with your film |
| 2. Check the rules | **Guide** | The nine requirements that show up in almost every call, explained in production language |
| 3. Fill in the entry | **Film file** | One record that feeds every cross-check |
| 4. Send the screener | **Package** | 15 festival-package materials, prepared once and reused |
| 5. Pay the fee | **Submissions** | Only after premiere status, completion date and screener check out |
| 6. Wait for selection | **Submissions** | Six tracking statuses per festival |
| 7. Agreement and final copy | **Rights** | Music, archive, interviews, minors, locations, producer authority and E&O |

### The eligibility engine

This is the heart of the product. For each festival, Rota Doc crosses the film file against the rules and returns a reasoned verdict rather than a bare yes or no:

- **Eligible**, **Check the rules** or **Probably ineligible**, with a score from 0 to 100
- **Blockers** that stop the entry: film too long for a shorts festival, completion outside the 24-month window, a premiere already spent at another festival, a film already published in full for open viewing
- **Warnings** for what can still be fixed: missing running time, no English subtitles, no screener link, an editorial focus that does not match the film's form
- **Matches** worth citing in the application: a section compatible with the current premiere status, openness to independents and first-timers, a new-voices strand

The premiere logic is cumulative and conservative: a film that has already had its international premiere can still offer a national or European premiere, but not the other way round.

### Readiness score

A 0-to-100 meter at the top of every page, banded low, mid and high, that rises as the film file, package and rights fill in and drops when the film is already public. It answers "am I ready to start submitting?" at a glance.

### PDF report

One click produces the **Route report**: the film's technical details, festivals ranked by fit, the state of the package and rights checklists, and the submissions in progress. Generated in the browser with `pdf-lib`, with no server and no data leaving the machine.

### Bilingual, PT and EN

The whole interface switches language from a button in the header. Film and festival names from the dataset stay in English, as they would in a real catalogue.

---

## What it runs on

Rota Doc is powered by the **Fictional Film Archive**, a wholly invented teaching dataset that lives in this repository:

| | |
| --- | --- |
| 180 | fictional films, with poster, form, country and synopsis |
| 40 | fictional festivals, with city, editorial focus and sections |
| 120 | people and 24 production companies |
| 909 | credits linking films to people |
| 495 | honours, from official selection through to winning |
| 12 | fictional awards |
| 1,736 | taxonomy assignments (genre, theme, technique, form, country) |

The dataset carries gaps on purpose: films with no running time, no poster, no honours. That is what gives the interface something real to handle in conditional rendering, and what makes the eligibility cross-check interesting.

Two pages exist purely to explore that archive: **Archive** (180 films filtered by form, country, theme and director) and **Awards** (the journey from official selection through longlist, shortlist, nomination and special mention to winner). In either one, **Use for submission** loads the chosen title into the film file and recalculates everything.

---

## Under the hood

- **React 19 + Vite 8**, with no routing library: hash navigation is resolved in the app itself
- **Zero backend.** The film file, checklists and submissions live in the browser's `localStorage`
- **Data as modules.** The dataset is imported through the `@archive` alias and mapped to the app's model in `src/data/archive.js`
- **Logic kept out of the UI.** Eligibility, readiness score, dates, route sections and the report live in `src/lib`, tested with Node's built-in test runner
- **Translations centralised** in `src/i18n/strings.js`, with per-key interpolation

```text
src/app/src/
  lib/        eligibility, readiness score, PDF report, route between sections
  data/       Fictional Film Archive mapping and checklists
  pages/      Home, Film file, Archive, Festivals, Awards, Package, Rights, Submissions, Guide, Labs
  i18n/       PT and EN
  state/      app state and persistence
datasets/fictional-film-archive/
  stage-1-simple-collection/     6 films, to begin with
  stage-2-richer-collection/     12 films with arrays
  stage-3-connected-archive/     the full archive the app uses
```

## Running it locally

There is nothing to install to just look around: the [live demo](https://rota-doc-seven.vercel.app/#/) is the same app. To run it yourself, all you need is Node.js and an up-to-date browser.

```bash
cd src/app
npm install
npm run dev
```

It opens at `http://localhost:7363`.

```bash
npm test     # 26 tests covering eligibility, the report and navigation
npm run lint # oxlint
npm run build && npm run preview   # preview on :7364
```

Posters are served from `datasets/fictional-film-archive/images` by a Vite plugin, in development and in the build alike.

---

## What Rota Doc is not

Being straight about the limits, because they are part of the proposition:

- It does not submit for you, does not fill in FilmFreeway and does not pay fees
- It does not guarantee a slot in the programme: submission is followed by curatorial selection
- It does not replace legal advice on rights
- It does not track real calls for entries. In this version the catalogue is the fictional teaching archive: use it to practise the route, never as a call

## Next steps

- Export and import the route, to work across more than one machine
- Per-edition festival deadlines, with alerts before the date
- Several films in one installation, today limited to a single film file
- Connecting the catalogue to real sources of calls, keeping the fictional dataset as a practice mode

---

## Context

A Software Development Bootcamp project, Directors Notes edition. The **Fictional Film Archive** was invented entirely for the course: no title, person, company, festival, award or description corresponds to a real record, and the posters are script-generated geometric shapes with no photographs.

The rule summaries in the app are teaching material. Always confirm the current call on the festival's official site.
