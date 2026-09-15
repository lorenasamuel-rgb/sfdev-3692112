# Manual do Rota Doc

Guia de uso da aplicação para produtores independentes e estreantes inscreverem filmes em festivais.

Esta versão inclui o que foi pedido na semana de 8 de setembro de 2026: o **Fictional Film Archive**, as telas **Arquivo** e **Prêmios**, e o seletor **PT / EN** no topo.

Os resumos de regulamento no app são de **referência de ensino**. O catálogo de festivais, filmes e honrarias é **fictício**. Confirme sempre o edital vigente no site oficial. A inscrição **não garante** participação: a seleção é curatorial.

---

## Como ver no Cursor e no VS Code

Os dois editores precisam abrir **a mesma pasta** do clone. Depois, puxe este branch:

```bash
cd ~/Documents/sfdev-3692112
git fetch origin
git checkout cursor/visualizacoes-semana-passada-b80e
git pull origin cursor/visualizacoes-semana-passada-b80e
```

No VS Code e no Cursor: **File → Open Folder** → `sfdev-3692112`.

Para abrir o app:

```bash
cd src/app
npm install
npm run dev
```

Abre em [http://localhost:7363](http://localhost:7363).

---

## 1. O que é o Rota Doc

O Rota Doc organiza o processo de inscrição de um filme em festival. Ele ajuda a:

- cadastrar a ficha do filme (títulos, logline, duração, conclusão, estreia, screener);
- buscar um título no **arquivo fictício** e usar esses dados na ficha;
- cruzar o filme com um catálogo de festivais de ensino;
- ver a **jornada de prêmios** (seleção oficial → indicação → vitória);
- montar o *festival package* e a lista de direitos;
- acompanhar os sete passos da inscrição até o termo de exibição;
- separar a rota de filmes **finalizados** da rota de **laboratórios e mercados**.

Não é uma distribuidora, não envia a inscrição por você e não substitui o regulamento oficial.

### O que o app não faz

- não paga taxas nem preenche FilmFreeway;
- não garante vaga na programação;
- não substitui assessoria jurídica de direitos;
- não atualiza editais reais automaticamente.

---

## 2. Como começar

### Requisitos

- Node.js instalado;
- navegador atualizado (Chrome, Firefox, Safari ou Edge).

### Instalar e abrir

A partir da pasta do repositório (não da pasta pessoal `~`):

```bash
cd src/app
npm install
npm test
npm run dev
```

O app abre em [http://localhost:7363](http://localhost:7363).

### Onde os dados ficam

A ficha, os checklists e as inscrições ficam no **localStorage** do navegador (chave `rota-doc-state-v1`). Cartazes vêm de `datasets/fictional-film-archive/images`.

- os dados permanecem se você recarregar a página no mesmo navegador;
- limpar o cache do site apaga o cadastro;
- outro computador, outro perfil ou modo anônimo começa do zero.

---

## 3. Como navegar

O seletor **PT | EN** fica ao lado da marca, no topo. A interface inteira troca de língua. Nomes de filmes e festivais do dataset permanecem em inglês.

| Menu | Rota | Função |
| --- | --- | --- |
| (marca Rota Doc) | Início | Convite à jornada de premiação e os sete passos |
| Filme | `#/filme` | Ficha do filme, com busca no arquivo |
| Arquivo | `#/arquivo` | 180 filmes fictícios, cartaz e filtros |
| Festivais | `#/festivais` | 40 festivais fictícios e cruzamento de elegibilidade |
| Prêmios | `#/premios` | Jornada seleção → indicação → vitória |
| Pacote | `#/pacote` | Materiais do festival package |
| Direitos | `#/direitos` | Autorizações e licenças |
| Inscrições | `#/inscricoes` | Acompanhamento de cada festival |
| Guia | `#/guia` | Requisitos comuns de regulamento |
| Labs | `#/laboratorios` | Laboratórios, mercados e pitching |

À direita do menu aparece o **título do filme**, a **nota de preparação** (0–100) e o **número de inscrições**. A seção em que você está fica destacada no menu.

---

## 4. Fluxo recomendado

1. Cadastre o filme em **Filme**, ou busque um título do **Arquivo** e use na inscrição.
2. Marque o que já está pronto em **Pacote** e **Direitos**.
3. Em **Festivais**, busque pelo nome, filtre e abra os que combinam com duração, estreia e estágio.
4. Em **Prêmios**, veja como seleção oficial, indicação e vitória se encadeiam no dataset.
5. Em **Inscrições**, avance os sete passos e atualize o status.
6. Se o filme ainda estiver em desenvolvimento, use **Labs** em vez da seleção oficial.

---

## 5. Página inicial

A abertura convida ao passo a passo da premiação em festivais e lista os **sete passos** da inscrição.

Atalhos: **Cadastrar meu filme**, **Ver festivais**, **Abrir o arquivo** e **Ver prêmios**.

Há um alerta sobre **estreia**: não publique o filme inteiro no YouTube, Vimeo público ou streaming antes de definir a estratégia. Um link **privado com senha** para avaliação, em geral, não conta como lançamento público.

---

## 6. Filme — ficha

É o cadastro que alimenta o cruzamento com os festivais. Os campos salvam automaticamente ao digitar.

**Título original** é uma busca no arquivo: ao escolher um resultado, a ficha recebe título, duração, sinopse e demais dados da sessão Arquivo. O exemplo de ficha usa *O Chamado*.

**Limpar formulário** remonta a ficha vazia. O placeholder do título em inglês não deve parecer valor preenchido.

A nota **Preparação para inscrever** (0–100) sobe com título, logline, duração, conclusão, país, idiomas, filme finalizado, estreia intacta, legendas, screener, e-mail e os checklists de Pacote e Direitos.

---

## 7. Arquivo

Lista os **180 filmes** do Fictional Film Archive, com cartaz, forma, país, direção e honrarias.

Filtros: busca por título, tema ou direção; forma; país. **Usar na inscrição** leva os dados para a ficha em Filme.

---

## 8. Festivais

Catálogo de **40 festivais fictícios**. Busca pelo nome, com lista de opções, sem perder os filtros de região e elegibilidade.

Cada card mostra cidade, selo de elegibilidade, foco editorial e atalhos para independentes, estreantes e labs.

O cruzamento com a ficha é uma **orientação de ensino**. O edital real manda.

**Adicionar às inscrições** cria o acompanhamento em Inscrições.

---

## 9. Prêmios

Jornada de honrarias do dataset: seleção oficial, lista longa, shortlist, indicação, menção e vitória.

Filtros por resultado e tipo de órgão. Ao abrir um filme a partir da honraria, a ficha de inscrição pode receber esse título.

---

## 10. Pacote, Direitos, Inscrições, Guia e Labs

- **Pacote** — textos, direção, imagens, screener e contato (15 itens).
- **Direitos** — entrevistas, menores, música, arquivo, locações, autoridade do produtor, E&O.
- **Inscrições** — status (em análise, inscrito, aguardando, selecionado, não selecionado, retirado) e os sete passos por festival.
- **Guia** — leitura típica de edital (conclusão, duração, estreia, screener, legendas, taxa).
- **Labs** — rota de desenvolvimento (MeetMarket, fóruns). A inscrição em lab é distinta da seleção oficial.

---

## 11. Perguntas frequentes

**Por que eu não via isso no VS Code?**  
Porque essas telas ficaram em pull requests da semana passada, fora do `main`. Este branch junta esse trabalho. Depois do `git checkout` e `git pull` acima, Cursor e VS Code mostram o mesmo código.

**A inscrição garante que o filme entra no festival?**  
Não. Depois da inscrição há seleção curatorial.

**Posso usar o filme de exemplo?**  
Sim, para testar o app. Não envie esses dados a um festival real.

**Os festivais são reais?**  
Nesta versão o catálogo é o arquivo fictício de ensino. Use-o para praticar a rota, não como edital.

---

## 12. Resumo rápido

| Quero… | Onde ir |
| --- | --- |
| Cadastrar o filme | Filme |
| Ver cartazes e escolher um título do dataset | Arquivo |
| Ver se um festival cabe no meu filme | Festivais |
| Ver seleção, indicação e vitória | Prêmios |
| Trocar o idioma da interface | PT / EN no topo |
| Montar textos, stills e screener | Pacote |
| Conferir música, arquivo e entrevistas | Direitos |
| Acompanhar prazos e status | Inscrições |
| Entender o que os editais pedem | Guia |
| Inscrever um projeto em desenvolvimento | Labs |
