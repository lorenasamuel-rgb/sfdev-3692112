# Product Brief — AI Film Discovery Platform

Reconstructed from director notes (raw meeting transcription). Use this as the north star for backlog priorities.

## Goal

Build an AI-powered discovery platform for independent films and festivals — stronger search, a dynamic homepage, richer metadata, and tools that help filmmakers get exposure without putting films behind a paywall.

## Client context

- Runs a **film discovery platform** focused on festivals and independent films.
- Revenue today: **film submissions (~£47)**, sponsorships, advertising.
- Explicit constraint: **do not hide films behind a paywall**.
- Value proposition: interviews, promotion, discoverability, filmmaker exposure.
- Engagement ask: ideas, architecture, UX, discovery patterns, and AI features — not necessarily a finished product.

## Problems to solve

### Weak search
Users often do not know exactly what they want. Search/discovery should work by:

- emotions, themes, genres, stories
- equipment (Canon, Sony, etc.)
- festivals, directors
- technical aspects

Inspiration: Netflix-style recommendation before the user can name a title.

### Blog-like homepage
Homepage should become dynamic:

- automatically surface interesting films
- highlight rotating categories (documentaries, animation, LGBTQ+, shorts, etc.)
- adapt without daily manual editing

### Thin film metadata
Need richer film information, much of it extractable automatically:

- camera / equipment, editing software
- themes, awards, festivals
- filming locations, crew
- interview content

## Core capabilities

1. **AI metadata extraction** — themes, people, equipment, summary, tags, genre, emotions, audience
2. **Semantic search** — meaning over keywords (“films about grief”, “shot on Canon”)
3. **Dynamic homepage** — auto-curated, rotating discovery surfaces
4. **Recommendation engine** — watch history, themes, festivals, genres, directors, popularity
5. **Festival assistant** — ingest PDF/web programme → films, directors, countries, connections
6. **Automatic interview generation** — questions from submission → record → transcript, clips, quotes, posts, article
7. **Social / content generation** — Instagram clips, quotes, social posts, articles
8. **Sponsorship matching** — auto-group by equipment/software (Canon, Adobe, Blackmagic, etc.)
9. **Film relationship graph** — people, festivals, themes, equipment links
10. **Filmmaker dashboard** — upload, review AI tags, interviews, promotion status

## Design principles

- Discovery-first, not catalogue-first
- AI assists humans; filmmakers can review/edit generated metadata and interview questions
- Keep films freely discoverable; monetize via submission, sponsorship, and promotion value
- Prefer creative architecture and UX thinking over a complete production system in early phases
