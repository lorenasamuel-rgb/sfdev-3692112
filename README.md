# Rota Doc

A workspace for independent producers and first-time filmmakers to organise a festival submission. The catalogue is the **Fictional Film Archive** (180 films, 40 festivals, fictional honours): use it to practise the route, not as a real call.

Submitting does not guarantee a place in the programme. Selection is curatorial.

The [PRD](PRD.md) (English) describes the product on `main`: Take Action file, Search, awards journey, PT/EN, route PDF, and Apple visual. User guide: [`src/practice/MANUAL.md`](src/practice/MANUAL.md).

## Run

```bash
cd src/app
npm install
npm test
npm run dev
```

Opens at `http://localhost:7363`. The film file, checklists, and submissions live in the browser `localStorage` (`rota-doc-state-v2`). Posters come from `datasets/fictional-film-archive/images`.

```bash
npm run build
npm run preview
```

Preview at `http://localhost:7364`.
