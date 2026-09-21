# PRD — Rota Doc

**Produto:** Rota Doc  
**Tipo:** workspace de inscrição em festivais + arquivo de ensino  
**Status do documento:** rascunho para alinhamento  
**Versão:** 1.2  
**Data:** 21 de setembro de 2026  
**Fonte de verdade:** `main` (produto completo após o merge do [PR #12](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/12))  
**Idiomas da UI:** português (padrão) e inglês (seletor PT / EN)  
**Código:** `src/app`  
**Guia de uso:** [`src/practice/MANUAL.md`](src/practice/MANUAL.md)  
**Dados de ensino:** `datasets/fictional-film-archive`

Este documento descreve o produto **como está no `main` hoje**, o que ele não faz, e o que vem a seguir. Substitui o rascunho do [PR #13](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/13), escrito quando o arquivo, o PT/EN e o visual Apple ainda viviam só no branch `cursor/apple-on-visualizacoes-3ed7`.

---

## 1. Resumo

Rota Doc ajuda **produtores independentes e realizadores estreantes** a praticar e organizar a inscrição de um filme em festival **sem distribuidora**.

O workspace é alimentado pelo **Fictional Film Archive** (180 filmes, 40 festivais, honrarias e prêmios fictícios) e usa um visual de marketing (home em unidades, nav global, acento verde `#00FF7D`).

Premissas:

1. O filme chega ao festival por uma **inscrição**.
2. Depois disso há **seleção curatorial**. A inscrição **não garante** participação.
3. Cada casa tem **regulamento próprio**. O app cruza o filme com regras de ensino; o **edital vigente** (quando for festival real) manda. O catálogo desta versão é **fictício**.

Navegação:

| Nav (rótulo na UI) | Rota | Função |
| --- | --- | --- |
| Guia | `#/guia` | Requisitos comuns de edital |
| **Start** | `#/filme` | Ficha **Take Action** |
| Festivais | `#/festivais` | Escolher casas do arquivo |
| Pacote | `#/pacote` | Festival package |
| Direitos | `#/direitos` | Autorizações e licenças |
| Inscrições | `#/inscricoes` | Sete passos por festival |
| Labs | `#/laboratorios` | Mercados e pitching |
| **Search** | `#/arquivo` | 180 filmes fictícios |
| Prêmios | `#/premios` | Seleção → indicação → vitória |

Todas as secções têm **Seguinte / Next** e, quando há página anterior, **Anterior / Back**. Dá para **baixar um PDF** da rota (Start, Festivals, Package, Rights, Submissions).

---

## 2. Problema

Inscrever um filme independente é trabalho de regulamento, não de networking com distribuidora. Quem estreia ou produz sem equipe de festival costuma errar em pontos caros:

- **Estreia.** Publicar o filme inteiro no YouTube, Vimeo público ou streaming queima a janela de world / international premiere.
- **Janela de conclusão.** Muitos festivais pedem filme concluído nos últimos 12–24 meses.
- **Duração e forma.** Curta / média / longa e documentário / ficção / animação / experimental mudam categoria e seção.
- **Screener e legendas.** Link privado, sem geo-block, com legendas em inglês quando o áudio não é inglês.
- **Direitos.** Música, arquivo e entrevistas precisam estar licenciados antes do termo de exibição.
- **Processo.** Cada casa tem site ou FilmFreeway. Sem um quadro, a pessoa paga taxa cedo demais ou mistura filme **finalizado** com **projeto em desenvolvimento**.
- **Aprendizado.** É preciso praticar a rota (incluindo a jornada de prêmios) sem republicar dados reais de um arquivo cliente.

Ferramentas genéricas não cruzam a ficha com as regras de cada casa, não separam as duas rotas e não ensinam seleção → indicação → vitória.

---

## 3. Objetivos

### 3.1 Objetivos de produto

- Deixar um independente ou estreante **apto a inscrever** (ou a praticar a inscrição) com clareza do que falta.
- Evitar inscrições **inúteis ou prejudiciais** (filme público, estreia já gasta, WIP na seleção oficial, conclusão fora da janela).
- Reunir **uma vez** o festival package e a checagem de direitos.
- Acompanhar cada inscrição nos **sete passos**, até o termo de exibição.
- Ensinar, com linguagem de ofício, que **inscrição ≠ seleção**.
- Usar o arquivo fictício para **Search**, **Prêmios** e para preencher a ficha Take Action sem copiar obras reais.
- Entregar a rota em **PT e EN** e num visual de produto, não de exercício.
- Permitir **levar a rota para fora do browser** (PDF).

### 3.2 Não-objetivos

O Rota Doc **não**:

- envia a inscrição, paga taxa ou preenche FilmFreeway;
- substitui o edital, a curadoria ou um parecer jurídico;
- garante vaga, prêmio ou distribuição;
- é uma distribuidora ou uma plataforma de discovery para o público final;
- sincroniza dados entre dispositivos nesta versão;
- usa festivais, filmes ou prêmios **reais** no catálogo atual (são de ensino).

### 3.3 Princípios

1. **Regulamento primeiro.** Toda recomendação aponta de volta ao edital (ou deixa claro que o catálogo é de ensino).
2. **Inscrição ≠ resultado.** Copy, status e passos separam envio de seleção.
3. **Duas rotas.** Filme fechado → seleção oficial. Projeto aberto → labs, mercados, pitching.
4. **Estreia é ativo estratégico.** Alertar contra publicação integral pública.
5. **Independentes e estreantes cabem**, desde que o filme caiba na regra.
6. **Orientação, não veredito.** “Elegível” nunca significa “vai entrar”.
7. **Preparar uma vez, reutilizar.** Pacote e direitos não se redesenham a cada festival.
8. **Arquivo fictício é infraestrutura de ensino**, não um catálogo editorial a publicar como real.

---

## 4. Público

### 4.1 Persona principal — produtora independente / primeira direção

- Tem um filme (muitas vezes em português) e não tem distribuidora.
- Precisa decidir onde inscrever, quando gastar a estreia e o que juntar antes de pagar taxa.
- Nesta versão também **pratica** a rota com títulos do arquivo.

### 4.2 Persona secundária — filme em desenvolvimento

- Imagem e som não estão fechados.
- Busca coprodutor, fundo, lab ou mercado.
- Não deve ser empurrada para a seleção oficial de filme finalizado.

### 4.3 Persona de curso — learner do bootcamp

- Precisa das telas Arquivo e Prêmios, do seletor PT/EN e de um visual de produto para apresentar o trabalho.
- Não deve republicar o arquivo cliente (Directors Notes); só o dataset fictício.

### 4.4 Fora do público nesta versão

- Programadores de festival (não há fila de screener).
- Espectadores / discovery tipo Netflix.
- Quem precisa de um calendário vivo de editais reais (isso existiu no recorte anterior de 12 festivais de documentário; não está no `main` atual).

---

## 5. Estado atual (`main`)

SPA React + Vite, hash routing, `localStorage`, i18n PT/EN, visual de marketing Apple, dataset Stage 3.

### 5.1 Superfícies

| Superfície | Situação |
| --- | --- |
| Home | Unidades (Festivais, Package, Arquivo, Prêmios, Labs) + ribbon de disclaimer |
| Start / Take Action | Ficha completa, busca de título no arquivo, exemplo, PDF, medidor colorido |
| Festivais | 40 casas fictícias; busca por nome; filtros; cruzamento de elegibilidade |
| Pacote / Direitos | Checklists + pager Seguinte / Anterior |
| Inscrições | Status, sete passos, notas, PDF |
| Guia / Labs | Requisitos comuns e rota de desenvolvimento |
| Search (Arquivo) | 180 filmes; filtro forma / país / texto; “Usar na inscrição” |
| Prêmios | Honrarias: Official Selection → Longlisted → Shortlisted → Nominated → Special Mention → Winner |
| Chrome | Nav global, menu mobile, PT/EN, acento `#00FF7D` |

### 5.2 Visual e interação

- Home em **unidades** ao estilo Apple (títulos curtos, “Saiba mais”).
- Nav global com marca, idioma e hamburger no mobile.
- Botões **Seguinte / Next** e **Anterior / Back** em verde `#00FF7D`.
- Secção ativa, checkboxes concluídos e bullets de Labs no mesmo verde.
- Medidor de preparação: **vermelho &lt; 50**, **amarelo 50–70**, **verde `#00FF7D` &gt; 70**.
- Ficha do filme intitulada **Take Action** (nav: **Start**).
- Arquivo no nav como **Search**.

PRs em curso que podem alterar só a identidade visual, sem mudar requisitos: [PR #14](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/14) (cinema) e [PR #15](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/15) (verde `#114022`).

### 5.3 Histórico do recorte anterior

Antes do PR #12, o `main` tinha um recorte menor: 12 festivais **reais** de documentário, sem Arquivo, sem Prêmios, sem PT/EN, sem PDF e sem visual Apple. Esse recorte **não é mais o produto oficial**. A união “modo prática (arquivo fictício) vs modo temporada (editais reais)” volta como P1 (N-01).

---

## 6. Jornadas

### J1 — Take Action: cadastrar ou puxar do arquivo

1. A pessoa abre Start (**Take Action**).
2. Ou preenche a ficha, ou busca um título no arquivo, ou carrega o exemplo.
3. Vê a nota 0–100 mudar de cor conforme a banda.
4. Segue para Festivais pelo **Seguinte**.

**Sucesso:** header mostra título + nota + contagem de inscrições. Sem título, Festivais pede cadastro.

### J2 — Escolher festivais

1. Busca pelo **nome** e/ou filtra região, país, foco, elegíveis, labs.
2. Abre a ficha da casa: matches, avisos, bloqueios, seções de estreia.
3. Adiciona às inscrições só depois de ler o resumo (catálogo de ensino).

**Sucesso:** filme público, WIP na casa errada ou conclusão fora da janela aparece como **provavelmente inelegível**.

### J3 — Pacote e direitos

1. Marca textos, stills, screener, legendas (15 itens).
2. Confere entrevistas, menores, música, arquivo, locações, autoridade. E&O é pós-inscrição.

### J4 — Acompanhar inscrição e exportar

1. Status inicial *Em análise*, passo 1 marcado.
2. form + screener + taxa ⇒ *Inscrito*; + espera ⇒ *Aguardando seleção*.
3. *Selecionado* lembra termo e cópia final.
4. **Baixar PDF** reúne Start, Festivals, Package, Rights e Submissions.

### J5 — Search e Prêmios (ensino)

1. Em Search, filtra 180 filmes e clica **Usar na inscrição**.
2. Em Prêmios, vê a jornada até Winner e pode abrir o filme na ficha.
3. Entende que honrarias são fictícias.

### J6 — Filme ainda não fechado

Estágio WIP ou entrada por Labs. Seleção oficial de casas só-finalizado fica inelegível, com ponte para mercado / lab.

---

## 7. Requisitos funcionais

**P0** = o produto atual não existe sem isso (já implementado, salvo lacuna explícita).  
**P1** = próxima fatia (secção 8).

### 7.1 Start / Take Action (ficha)

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| F-01 | Ficha com identidade, ficha técnica, estreia, screener e quem inscreve | P0 | Salvamento automático ao digitar |
| F-02 | Título original é busca no arquivo | P0 | Escolher um resultado preenche a ficha |
| F-03 | Formas: Documentary, Drama, Animation, Experimental | P0 | Default Documentary |
| F-04 | Estágio: finalizado vs WIP | P0 | Afeta elegibilidade |
| F-05 | Status de estreia: none / national / european / international / world | P0 | Cruza com seções do festival |
| F-06 | Flag de publicação pública (YouTube / Vimeo público / streaming) | P0 | Marca inelegível nas competições com estreia |
| F-07 | Carregar exemplo do arquivo (`film-001`) | P0 | Pacote marcado; E&O fica de fora |
| F-08 | Nota de preparação 0–100 visível na ficha e no header | P0 | Bandas vermelho / amarelo / verde |
| F-09 | PDF a partir da ficha | P0 | Download local, sem servidor |
| F-10 | Hint quando o filme veio do arquivo | P0 | Mostra título e ano |

Campos da ficha: título original, título em inglês, logline, sinopse curta, sinopse completa, duração (min), data de conclusão, país, idiomas, forma, estágio, estreia, publicação pública, screener (URL + senha), legendas EN, arquivo .srt, direção, bio, declaração, produtor, e-mail, telefone.

### 7.2 Motor de elegibilidade

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| E-01 | Status: elegível / revisar regulamento / provavelmente inelegível | P0 | Issues bloqueiam; warnings pedem revisão |
| E-02 | WIP só em casas `acceptsWip` (New Voices no arquivo) | P0 | Senão, ponte para Labs |
| E-03 | Duração: curta &lt; shortMax (40); média se houver mediumMax; senão longa | P0 | Casa `shortOnly` bloqueia longa |
| E-04 | Sobreposição de forma com `focusTags` | P0 | Mismatch é warning, não issue |
| E-05 | Janela de conclusão (`completionMaxMonths` ou `completionAfter`) | P0 | Sem data: warning; fora: inelegível |
| E-06 | Publicação pública queima estreia | P0 | Só seções `required: none` sobrevivem |
| E-07 | Estreia ainda oferecida vs exigida pela seção | P0 | Bloqueio total ou parcial |
| E-08 | Legendas EN se o áudio não for inglês e a casa exigir | P0 | Sem idioma: warning; com idioma e sem subs: issue |
| E-09 | Screener ausente é warning | P0 | Não bloqueia sozinho |
| E-10 | Independentes e estreantes como matches positivos | P0 | Todas as casas do arquivo atual são abertas |
| E-11 | Score 0–100 derivado de issues / warnings / matches | P0 | Lista ordenada por score |

O motor está em `src/app/src/lib/eligibility.js`, com testes em `eligibility.test.js`. Resumos de regulamento são **de ensino**.

### 7.3 Pacote e direitos

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| P-01 | 15 itens do festival package, agrupados | P0 | Textos, direção, imagens, screener, contato |
| P-02 | Lista “se for selecionado” (DCP, press kit, trailer limpo, acessibilidade, termo) | P0 | Informativa, sem checkbox |
| P-03 | 9 itens de direitos | P0 | Entrevistas, menores, composição, master, fotos, vídeo, locações, autoridade, E&O |
| P-04 | Checklists entram na nota de preparação | P0 | Até 12 pontos cada |
| P-05 | E&O tratado como pós-inscrição | P0 | Hint deixa isso explícito |

### 7.4 Inscrições e sete passos

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| S-01 | Tracker por festival, sem duplicar | P0 | Um registro por casa |
| S-02 | Status: em análise, inscrito, aguardando, selecionado, não selecionado, retirado | P0 | Edição manual sempre possível |
| S-03 | Sete passos: escolher → regulamento → formulário → screener → taxa → espera → termo/cópia | P0 | Passo 1 marcado ao adicionar |
| S-04 | form + screener + taxa ⇒ Inscrito; + espera ⇒ Aguardando (a partir de Em análise / Inscrito) | P0 | Não rebaixa Selecionado / Não selecionado / Retirado |
| S-05 | Notas livres | P0 | Persistem |
| S-06 | Remover ≠ cancelar no festival | P0 | Copy de acompanhamento local |
| S-07 | Selecionado lembra termo e entrega | P0 | Nota no card |
| S-08 | PDF também a partir de Inscrições | P0 | Mesmo relatório da ficha |
| S-09 | **Limpar a rota inteira** (ficha + checklists + inscrições) | P0 | Estado volta ao vazio no mesmo browser |

Sete passos (produto):

1. Escolher os festivais
2. Verificar o regulamento
3. Preencher a inscrição (fora do app)
4. Enviar o screener
5. Pagar a taxa (quando houver)
6. Aguardar a seleção
7. Termo e cópia final

**Lacuna conhecida:** o botão “Limpar formulário / Clear form” aparece em **todas** as secções (via `SectionPager`) e chama `clearFilm`, que zera a rota inteira — não só a ficha. Ver P1 N-07.

### 7.5 Search (Arquivo) e Prêmios

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| A-01 | Listar filmes do Stage 3 com cartaz, forma, país, duração | P0 | Dataset fictício; cartazes em `/archive-images` |
| A-02 | Filtrar busca / forma / país; paginação “mostrar mais” (24) | P0 | Vazio amigável |
| A-03 | **Usar na inscrição** preenche Take Action e vai a Start | P0 | Filme em uso fica marcado |
| AW-01 | Listar honrarias com ano, filme, corpo, seção, resultado | P0 | Ordem de resultado: Official Selection → … → Winner |
| AW-02 | Filtrar por texto, resultado e tipo (festival vs award); paginação 40 | P0 | Clique no filme carrega a ficha |
| AW-03 | Deixar explícito que a jornada é de ensino | P0 | Copy não afirma prêmios reais |

Relacionado: issue [#3](https://github.com/lorenasamuel-rgb/sfdev-3692112/issues/3) (jornada de prêmios do filme da pessoa) e issue [#10](https://github.com/lorenasamuel-rgb/sfdev-3692112/issues/10) (atualizar o dataset).

### 7.6 Guia, Labs, home, chrome, i18n, PDF

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| G-01 | Home explica tese, unidades, duas rotas, sete passos | P0 | CTAs para Start, Festivais, Arquivo, Prêmios |
| G-02 | Guia: finalizado, conclusão, duração, estreia, screener, legendas, direitos, taxa, prazo | P0 | Não substitui edital |
| G-03 | Labs: quando usar mercado / pitching | P0 | Distinto da seleção oficial; casas `hasLabs` |
| G-04 | Nav com rótulos i18n; Start e Search nos nomes da UI | P0 | Secção atual destacada em verde |
| G-05 | Ribbon + footer: inscrição ≠ seleção; dataset fictício | P0 | Todas as páginas |
| G-06 | **Seguinte / Anterior** em todas as secções do `SECTION_FLOW` | P0 | Primeira sem Anterior; última sem Seguinte |
| G-07 | Alerta de estreia na home, no guia e onde a ficha pede publicação | P0 | Link privado com senha ≠ lançamento público |
| I-01 | Seletor PT / EN no topo e no menu | P0 | UI inteira troca de língua; títulos do dataset ficam em inglês |
| I-02 | Locale persiste no browser (`rota-doc-locale`) | P0 | Reload mantém PT ou EN; `lang` e `<title>` acompanham |
| R-01 | PDF cobre Start, Festivals, Package, Rights, Submissions | P0 | Inclui disclaimer de ensino e nota de preparação |
| R-02 | PDF lista até 8 festivais rastreados ou ainda não inelegíveis | P0 | Inscrições fora do teto ainda entram |
| R-03 | PDF gerado no cliente (`pdf-lib`); senha do screener não vai para servidor | P0 | Nome `rota-doc-report-{slug}.pdf` |

### 7.7 Persistência

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| ST-01 | `localStorage` chave `rota-doc-state-v2`, com fallback de leitura para `rota-doc-state-v1` | P0 | Ficha, pacote, direitos, inscrições |
| ST-02 | JSON inválido volta ao vazio sem quebrar | P0 | App abre |
| ST-03 | Documentar perda ao limpar cache / outro perfil / anônimo | P0 | README + MANUAL |

**Lacuna conhecida:** o MANUAL ainda cita `rota-doc-state-v1` como chave vigente. Ver P1 N-08.

---

## 8. Sequência imediata (P1)

| ID | Requisito | Por quê |
| --- | --- | --- |
| N-01 | Unir o catálogo **real** de documentário (recorte antigo) com o arquivo de ensino (modo prática vs modo temporada) | Hoje só o arquivo fictício está no `main` |
| N-02 | Prazos calendário (early / regular / late) | Taxa ainda é qualitativa (`fees.amount = varies`) |
| N-03 | Vários filmes no mesmo browser | Um JSON só não cobre produtora real |
| N-04 | Labs no tracker (pitching / mercado / coprodução) | Segunda rota existe na copy, pouco no acompanhamento |
| N-05 | A jornada de prêmios do **filme da pessoa**, não só do arquivo | Issue #3; Prêmios hoje são o dataset de ensino |
| N-06 | Conta opcional / sync depois da exportação PDF | PDF já tira o dado do browser; sync é o passo seguinte |
| N-07 | Separar **limpar a ficha** de **limpar a rota inteira** | O botão atual apaga checklists e inscrições em qualquer secção |
| N-08 | Alinhar MANUAL e READMEs à chave `rota-doc-state-v2` e aos paths `src/app` / `src/practice` | Documentação de uso ficou atrás da reorganização de pastas |
| N-09 | Atualizar o dataset de ensino quando o brief pedir | Issue #10 |

---

## 9. Fora de escopo nesta fase

- Envio real da inscrição / FilmFreeway API / pagamento.
- Parser de PDF de edital.
- Catálogo “sempre atualizado” sem curadoria.
- Discovery para público (busca semântica, homepage Netflix, matching de patrocínio, geração de entrevista).
- App nativo.
- Republicar o arquivo cliente Directors Notes.

O brief de discovery com IA (kanban noutro branch / [PR #1](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/1)) é **outro produto**.

---

## 10. Experiência e conteúdo

### 10.1 Fluxo das secções (`SECTION_FLOW`)

```text
Guia → Start → Festivais → Pacote → Direitos → Inscrições → Labs → Search → Prêmios
```

Fluxo canônico de inscrição: **Start → Pacote / Direitos → Festivais → Inscrições** (+ PDF).  
Fluxo de ensino: **Search / Prêmios → Start**.

### 10.2 Tom

- Ofício (edital, screener, estreia, termo), em PT e EN.
- Visual de marketing não autoriza copy de “tão sonhada premiação” como **promessa**; a home pode convidar, o disclaimer da ribbon manda.
- Sempre devolver a decisão ao regulamento (ou deixar claro o caráter fictício).

### 10.3 Acessibilidade

- Labels nos campos; selos com texto, não só cor (`badge-eligible` etc.).
- `aria-current` na secção ativa; menu com Escape e `aria-expanded`.
- Medidor com `aria-label` da nota.
- Contraste do verde `#00FF7D` sobre fundo claro precisa continuar legível (texto em botão vs. texto corrido).

---

## 11. Dados

### 11.1 Estado do cliente

```text
{
  film: { …ficha, form, archiveFilmId?, archiveYear?… },
  package: { [itemId]: boolean },
  rights: { [itemId]: boolean },
  submissions: [{ id, festivalId, status, notes, steps, createdAt }]
}
```

Locale de UI (`rota-doc-locale`) é persistido à parte do estado da rota.

### 11.2 Fictional Film Archive

Stage 3 ligado em `src/app/src/data/archive.js`:

- 180 filmes → Search e preenchimento da ficha
- 40 festivais → catálogo de inscrição de ensino
- 120 pessoas, 24 empresas, 12 awards, 495 honrarias → Prêmios

Não copiar nem transformar registros do cliente. Cartazes abstratos em `datasets/fictional-film-archive/images`, servidos em `/archive-images`.

Mapeamento de ensino (não é edital real):

- `acceptsWip` / `hasLabs` quando o foco inclui **New voices**
- `shortOnly` quando o foco inclui **Short film** (teto 40 min)
- legendas EN exigidas fora de Portugal / Brasil
- janela típica de conclusão: 24 meses
- competição de documentário no arquivo pede estreia internacional; outras seções, `none`

### 11.3 PDF

Gerado no cliente (`reportModel` + `reportPdf` + `downloadReport`). Não sobe ficha nem senha de screener para servidor. Caracteres fora de Latin-1 são removidos (`pdfSafe`) porque o PDF usa Helvetica.

---

## 12. Requisitos não funcionais

| Área | Requisito |
| --- | --- |
| Stack | React 19 + Vite 8; código em `src/app`; dataset em `datasets/fictional-film-archive` |
| Dev | `cd src/app && npm install && npm run dev` → **http://localhost:7363** (`strictPort`) |
| Preview | `npm run preview` → **http://localhost:7364** |
| Testes | Elegibilidade, i18n, secções, PDF (`npm test` em `src/app`) |
| Lint / build | `npm run lint` (oxlint) e `npm run build` |
| Privacidade | Ficha e senha do screener só no browser; PDF é download local |
| Legal | UI, ribbon, footer, MANUAL e PDF: ensino / fictício; inscrição ≠ seleção |
| i18n | Strings em `src/app/src/i18n/strings.js`; regras de elegibilidade não nascem misturadas a copy |
| Atalho de prática | `src/practice/package.json` tem scripts `start` / `dev` / `test` apontando para `src/app` (paths relativos à pasta do manifesto) |

---

## 13. Métricas de sucesso

Sem analytics no MVP. Quando houver, medir **processo**, não seleção.

- Uma sessão: ficha preenchida (ou título do arquivo) + selo por festival.
- “Quase erros” visíveis: publicação pública, WIP, janela, legendas.
- PDF gerado com as cinco secções depois de marcar pacote / direitos.
- Learner consegue alternar PT/EN sem perder a ficha.
- Testes do motor e do PDF verdes.

Não usamos como sucesso: quantidade de “elegível”, taxas pagas, filmes selecionados.

---

## 14. Riscos

| Risco | Mitigação |
| --- | --- |
| Catálogo fictício lido como edital real | Ribbon, footer, MANUAL, PDF, README |
| Copy de premiação vs princípio 2 | Ribbon e selos não prometem vitória |
| Verde `#00FF7D` ilegível | Usar o verde em botão / acento, não em texto longo sobre branco |
| Perda de `localStorage` | PDF (já existe) + documentar reset |
| Dataset cliente vs fictício | Só o arquivo inventado entra no app |
| “Limpar formulário” apaga a rota | N-07; até lá, MANUAL deve avisar |
| PRs de identidade visual divergirem do PRD | #14 / #15 são skin; requisitos desta versão não mudam |

---

## 15. Roadmap

### Agora — `main` (entregue no PR #12)

Workspace Apple + PT/EN + Take Action + Search + Prêmios + pager + PDF + arquivo fictício. Pastas reorganizadas em `src/app`, `src/practice` e `datasets/`.

### Em seguida — P1 (secção 8)

Modo prática vs temporada real, prazos, vários filmes, labs no tracker, prêmios do filme da pessoa, limpar ficha vs rota, docs alinhados, dataset (issues #3 e #10).

### Depois — P2

Conta opcional, calendário de temporada, mais casas de língua portuguesa quando o modo real voltar.

### Explicitamente outro produto

Discovery com IA, homepage dinâmica, extração de metadados, matching de patrocínio.

---

## 16. Questões em aberto

1. Quem versiona o catálogo a cada temporada, se o modo real (N-01) voltar?
2. A jornada de prêmios deve continuar só no dataset de ensino, ou o filme da pessoa ganha um quadro próprio (issue #3)?
3. O verde Apple `#00FF7D` é marca permanente, ou o produto migra para cinema / `#114022` (PRs #14 e #15)?
4. Labs no mesmo tracker ou quadro próprio?
5. O botão de limpar deve pedir confirmação antes de zerar a rota?

**Resolvido nesta versão:** o produto oficial é o `main` com arquivo fictício + visual Apple, não o recorte antigo de 12 festivais reais.

---

## 17. Apêndice

### Como abrir o produto

A partir da pasta do repositório:

```bash
cd src/app
npm install
npm test
npm run dev
```

Abre **http://localhost:7363/**.

Build / preview:

```bash
npm run build
npm run preview
```

Preview em **http://localhost:7364/**.

### Relação com outros artefatos

| Artefato | Papel |
| --- | --- |
| `main` | Produto descrito neste PRD |
| [PR #12](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/12) | Merge que tornou este recorte oficial |
| [PR #13](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/13) | Rascunho anterior do PRD (desatualizado: ainda trata o Apple branch como fora do `main`) |
| [`src/practice/MANUAL.md`](src/practice/MANUAL.md) | Guia de uso |
| `src/practice/week2-practice` | Protótipo pedagógico de readiness (HTML / JS, não o app) |
| `datasets/fictional-film-archive` | Dataset de ensino Stage 1–3 |
| [PR #11](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/11) | Experimento Apple anterior, sobre outra base |
| [PR #1](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/1) / brief de discovery com IA | Outro produto |
| Issue [#3](https://github.com/lorenasamuel-rgb/sfdev-3692112/issues/3) | Bookmark da jornada de prêmios |
| Issue [#10](https://github.com/lorenasamuel-rgb/sfdev-3692112/issues/10) | Atualizar o dataset |

### Filme de exemplo

`film-001` do arquivo (não enviar a festival real). Serve para demonstrar Take Action, cruzamento e PDF.

---

*Rota Doc organiza o processo de inscrição. A seleção é curatorial. O catálogo desta versão é fictício. Confirme prazos, taxas e estreia no site oficial quando for uma casa real.*
