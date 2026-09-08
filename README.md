# Rota Doc

Aplicação para produtores independentes e estreantes inscreverem filmes em festivais, agora alimentada pelo **Fictional Film Archive** (180 filmes, 40 festivais, honrarias e prêmios fictícios).

A interface está em português e inglês — o seletor PT/EN fica no topo da página.

Os resumos de regulamento são de ensino. O dataset é inteiramente fictício.

## Como rodar

A partir da pasta do repositório (não da pasta pessoal `~`):

```bash
cd src/app
npm install
npm test
npm run dev
```

Abre em `http://localhost:7363`. Os dados da ficha ficam no `localStorage` do navegador. Cartazes vêm de `datasets/fictional-film-archive/images`.

```bash
npm run build
npm run preview
```
