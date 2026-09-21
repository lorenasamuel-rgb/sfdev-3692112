# Rota Doc

Workspace para produtores independentes e estreantes organizarem a inscrição de um filme em festival. O catálogo é o **Fictional Film Archive** (180 filmes, 40 festivais, honrarias fictícias): serve para praticar a rota, não como edital real.

A inscrição não garante participação. A seleção é curatorial.

O [PRD](PRD.md) descreve o produto no `main`: ficha Take Action, Search, jornada de prêmios, PT/EN, PDF da rota e visual Apple. Guia de uso: [`src/practice/MANUAL.md`](src/practice/MANUAL.md).

## Como rodar

```bash
cd src/app
npm install
npm test
npm run dev
```

Abre em `http://localhost:7363`. A ficha, os checklists e as inscrições ficam no `localStorage` do navegador (`rota-doc-state-v2`). Cartazes vêm de `datasets/fictional-film-archive/images`.

```bash
npm run build
npm run preview
```

Preview em `http://localhost:7364`.
