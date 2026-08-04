# Client Development Kanban

A ready-to-use Kanban for client development work: backlog topics, committed todos, and a simple board you can open in the browser.

## Columns

| Column | Purpose |
|--------|---------|
| **Backlog** | Ideas and work not yet committed |
| **Todo** | Committed for the current cycle / sprint |
| **In Progress** | Actively being worked |
| **Review** | Waiting on client or internal QA |
| **Done** | Accepted / shipped |

## Card fields

- **Title** — short work item name
- **Type** — Discovery / Design / Build / Fix / Client / Docs
- **Priority** — High / Medium / Low
- **Owner** — optional assignee
- **Tag** — client or project label

## How to use

1. Keep uncommitted work in **Backlog**.
2. Pull only what you will finish this cycle into **Todo**.
3. Move cards to **In Progress** when work starts (limit WIP).
4. Put client feedback and QA in **Review**.
5. Move to **Done** only after acceptance.

Starter Todo pull (already seeded):

- Kickoff & success criteria with client
- Environment setup (dev / staging / prod)
- Requirements workshop / user stories
- Scope boundaries and out-of-scope list
- Communication cadence (standup, demos, feedback)

## Files

| Path | Description |
|------|-------------|
| [`kanban/BOARD.md`](kanban/BOARD.md) | Markdown board with columns and starter cards |
| [`kanban/backlog.json`](kanban/backlog.json) | Structured topics for the UI |
| [`kanban/index.html`](kanban/index.html) | Static board that renders from `backlog.json` |

## Open the board

Serve the `kanban` folder so the browser can load `backlog.json`:

```bash
cd kanban && python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).
