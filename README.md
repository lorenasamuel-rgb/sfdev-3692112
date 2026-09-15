# Rota Doc

Aplicação para produtores independentes e estreantes inscreverem documentários em festivais.

Um documentário chega ao festival por uma inscrição e, depois, passa por seleção curatorial. A inscrição não garante participação. Cada festival tem regulamento próprio — esta ferramenta cruza o filme com exigências típicas de duração, estreia, data de conclusão, screener e legendas, e organiza o pacote de materiais, os direitos e o acompanhamento das inscrições.

O **arquivo fictício** em `datasets/fictional-film-archive` alimenta as seções Arquivo e Prêmios (cartões de filme e jornada de honrarias).

## O que faz

- Cadastra a ficha do documentário (títulos, logline, duração, conclusão, estreia, screener)
- Cruza o filme com um catálogo de festivais (Sheffield DocFest, IDFA, É Tudo Verdade, Doclisboa e outros)
- Mostra o arquivo de filmes do Git (`FilmCard`) e a jornada de prêmios
- Monta o festival package e a lista de direitos (entrevistas, música, arquivo, E&O)
- Acompanha os sete passos da inscrição até o termo de exibição
- Separa a rota de filmes finalizados da rota de laboratórios e mercados (MeetMarket, fóruns)

Os resumos de regulamento são de referência. Confirme sempre o edital vigente.

## Como ter isto no Mac (local)

Os comandos só funcionam **dentro do repositório**, não na pasta pessoal (`~`).

```bash
cd ~/Documents/sfdev-3692112
git fetch origin
git checkout cursor/projeto-git-atualizado-c219
git pull origin cursor/projeto-git-atualizado-c219
cd src/app
npm install
npm test
npm run dev
```

Abre em `http://localhost:7363`. Os dados de inscrição ficam no `localStorage` do navegador.

Se aparecer `cd: no such file or directory: src/app` ou `Could not read package.json` em `/Users/…/package.json`, o Terminal ainda está fora do clone. Confira com `pwd` e `ls`: você deve ver `src` e `datasets`.

```bash
npm run build
npm run preview
```
