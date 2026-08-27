# AI Film Discovery Platform

Kanban and product brief for redesigning a client film discovery platform with AI — better search, a dynamic homepage, richer metadata, and filmmaker-facing tools. Films stay free to watch; value comes from submissions, sponsorships, interviews, and exposure.

## Product brief

See [`kanban/PRODUCT_BRIEF.md`](kanban/PRODUCT_BRIEF.md) for goals, problems, AI opportunities, and core capabilities reconstructed from director notes.

## Columns

| Column | Purpose |
|--------|---------|
| **Backlog** | Ideas and work not yet committed |
| **Todo** | Committed for the current cycle |
| **In Progress** | Actively being worked |
| **Review** | Waiting on client or internal QA |
| **Done** | Accepted / shipped |

## Card fields

- **Title** — short work item name
- **Type** — Discovery / Design / Build / Fix / Client / Docs
- **Priority** — High / Medium / Low
- **Owner** — optional assignee
- **Tag** — theme such as `search`, `homepage`, `ai-metadata`, `festival`

## How to use

1. Keep uncommitted work in **Backlog**.
2. Pull only what you will finish this cycle into **Todo**.
3. Move cards to **In Progress** when work starts (limit WIP).
4. Put client feedback and reviews in **Review**.
5. Move to **Done** only after acceptance.

Current Todo focus: product brief alignment, discovery jobs-to-be-done, business constraints, information architecture, and dynamic homepage sketch.

## Files

| Path | Description |
|------|-------------|
| [`kanban/PRODUCT_BRIEF.md`](kanban/PRODUCT_BRIEF.md) | Vision and capabilities from director notes |
| [`kanban/BOARD.md`](kanban/BOARD.md) | Markdown board with seeded cards |
| [`kanban/backlog.json`](kanban/backlog.json) | Structured topics for the UI |
| [`kanban/index.html`](kanban/index.html) | Static board that renders from `backlog.json` |

## Open the board

Serve the `kanban` folder so the browser can load `backlog.json`:

```bash
cd kanban && python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).
