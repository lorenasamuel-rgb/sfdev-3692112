# Rota Doc

Aplicação para produtores independentes e estreantes inscreverem documentários em festivais.

Um documentário chega ao festival por uma inscrição e, depois, passa por seleção curatorial. A inscrição não garante participação. Cada festival tem regulamento próprio — esta ferramenta cruza o filme com exigências típicas de duração, estreia, data de conclusão, screener e legendas, e organiza o pacote de materiais, os direitos e o acompanhamento das inscrições.

## O que faz

- Cadastra a ficha do documentário (títulos, logline, duração, conclusão, estreia, screener)
- Cruza o filme com um catálogo de festivais (Sheffield DocFest, IDFA, É Tudo Verdade, Doclisboa e outros)
- Monta o festival package e a lista de direitos (entrevistas, música, arquivo, E&O)
- Acompanha os sete passos da inscrição até o termo de exibição
- Separa a rota de filmes finalizados da rota de laboratórios e mercados (MeetMarket, fóruns)

Os resumos de regulamento são de referência. Confirme sempre o edital vigente.

## Como rodar

```bash
cd src/app
npm install
npm test
npm run dev
```

Abre em `http://localhost:7363`. Os dados ficam no `localStorage` do navegador.

```bash
npm run build
npm run preview
```
