# sfdev-3692112

Repositório de filmes do bootcamp. A app React em `src/app` lê o **Fictional Film Archive** versionado em `datasets/fictional-film-archive` — a mesma lista de festivais, filmes e honrarias commitada no Git.

## App no Mac (Terminal)

Os comandos `cd src/app` e `npm install` só funcionam **dentro da pasta do repositório**, não em `~` (a pasta pessoal).

1. Abra o Terminal.
2. Entre no clone do projeto (ajuste o caminho se a pasta estiver noutro sítio):

```bash
cd ~/Documents/sfdev-3692112
```

3. Traga esta versão do app (branch do PR):

```bash
git fetch origin
git checkout cursor/projeto-git-atualizado-c219
git pull origin cursor/projeto-git-atualizado-c219
```

4. Instale e suba o servidor **a partir de `src/app`**:

```bash
cd src/app
npm install
npm run dev
```

5. Abra o endereço que o Vite imprimir (em geral `http://localhost:5173`).

Se aparecer `cd: no such file or directory: src/app` ou `Could not read package.json` em `/Users/…/package.json`, o Terminal ainda está fora do repositório. Confira com `pwd` e `ls`. Você deve ver pastas como `src` e `datasets` antes de `cd src/app`.

Seções da app:

- **Arquivo** — `FilmCard` com props, um cartão por filme da coleção Stage 2
- **Festivais** — catálogo Stage 3 do Git
- **Prêmios** — jornada seleção → indicação → vitória a partir de `honours.json`
- **Avaliação** — fluxo da Week 2, com festivais sugeridos a partir da lista do Git

Os dados são fictícios, criados para o curso. Não republicam o acervo real do Directors Notes.
