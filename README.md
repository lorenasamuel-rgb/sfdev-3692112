# Rota Doc

Aplicação para produtores independentes e estreantes inscreverem filmes em festivais, agora alimentada pelo **Fictional Film Archive** (180 filmes, 40 festivais, honrarias e prêmios fictícios).

A interface está em português e inglês. O seletor PT/EN fica no topo da página.

As telas **Arquivo** e **Prêmios**, o seletor PT/EN e o visual Apple estão neste branch. Guia de uso: [MANUAL.md](MANUAL.md).

Os resumos de regulamento são de ensino. O dataset é inteiramente fictício.

## Como ter no VS Code (e no Cursor)

Abra a **mesma pasta** do clone nos dois editores. Depois puxe este branch:

```bash
cd ~/Documents/sfdev-3692112
git fetch origin
git checkout cursor/apple-on-visualizacoes-3ed7
git pull origin cursor/apple-on-visualizacoes-3ed7
```

No VS Code: **File → Open Folder** → a pasta `sfdev-3692112`.

## Como rodar

A partir da pasta do repositório (não da pasta pessoal `~`):

```bash
npm install --prefix src/app
npm start
```

Abre em `http://localhost:7363`. Os dados da ficha ficam no `localStorage` do navegador. Cartazes vêm de `datasets/fictional-film-archive/images`.

```bash
npm run build
npm run preview
```
