# PRD — Rota Doc

**Produto:** Rota Doc  
**Tipo:** workspace de inscrição em festivais + arquivo de ensino  
**Status do documento:** rascunho para alinhamento  
**Versão:** 1.1  
**Data:** 20 de setembro de 2026  
**Fonte de verdade desta versão:** branch `cursor/apple-on-visualizacoes-3ed7` ([PR #12](https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/12))  
**Idiomas da UI:** português e inglês (seletor PT / EN)  
**Código:** `src/app`  
**Dados de ensino:** `datasets/fictional-film-archive`

O `main` hoje tem só o recorte anterior (ficha + festivais reais de documentário, sem arquivo, sem Prêmios, sem PT/EN, sem visual Apple). Este PRD descreve o produto **completo** que está no branch acima.

Guia de uso nesse branch: `MANUAL.md`. Como rodar: [README](README.md).

---

## 1. Resumo

Rota Doc ajuda **produtores independentes e realizadores estreantes** a praticar e organizar a inscrição de um filme em festival **sem distribuidora**.

Nesta versão o workspace é alimentado pelo **Fictional Film Archive** (180 filmes, 40 festivais, honrarias e prêmios fictícios) e usa um visual inspirado no marketing da Apple (home em unidades, nav global, acento verde `#00FF7D`).

A premissa do produto permanece:

1. O filme chega ao festival por uma **inscrição**.
2. Depois disso há **seleção curatorial**. A inscrição **não garante** participação.
3. Cada casa tem **regulamento próprio**. O app cruza o filme com regras de ensino; o **edital vigente** (quando for festival real) manda. Neste branch o catálogo é **fictício**.

O fluxo visível na navegação:

| Nav (rótulo na UI) | Rota | Função |
| --- | --- | --- |
| Guia | `#/guia` | Requisitos comuns de edital |
| **Start** | `#/filme` | Ficha **Take Action** |
| Festivais | `#/festivais` | Escolher casas do arquivo |
| Pacote | `#/pacote` | Festival package |
| Direitos | `#/direitos` | Autorizações |
| Inscrições | `#/inscricoes` | Sete passos por festival |
| Labs | `#/laboratorios` | Mercados e pitching |
| **Search** | `#/arquivo` | 180 filmes fictícios |
| Prêmios | `#/premios` | Seleção → indicação → vitória |

Todas as secções têm **Seguinte / Next** e, quando há página anterior, **Anterior / Back**. Dá para **baixar um PDF** da rota (Start, Festivals, Package, Rights, Submissions).

---

## 2. Problema

Inscrever um filme independente é trabalho de regulamento, não de networking com distribuidora. Quem estreia ou produz sem equipe de festival costuma errar em pontos caros:

- **Estreia.** Publicar o filme inteiro no YouTube ou em streaming queima a janela de world / international premiere.
- **Janela de conclusão.** Muitos festivais pedem filme concluído nos últimos 12–24 meses.
- **Duração e forma.** Curta/média/longa e documentário/ficção/animação/experimental mudam categoria e seção.
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
- Entregar a rota em **PT e EN** e num visual de produto (Apple), não de exercício.
- Permitir **levar a rota para fora do browser** (PDF).

### 3.2 Não-objetivos

O Rota Doc **não**:

- envia a inscrição, paga taxa ou preenche FilmFreeway;
- substitui o edital, a curadoria ou um parecer jurídico;
- garante vaga, prêmio ou distribuição;
- é uma distribuidora ou uma plataforma de discovery para o público final;
- sincroniza dados entre dispositivos nesta versão;
- usa festivais, filmes ou prêmios **reais** no catálogo deste branch (são de ensino).

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
- Quem precisa de um calendário vivo de editais reais (isso estava no recorte do `main`, não neste branch).

---

## 5. Estado atual (branch Apple + visualizações)

SPA React + Vite, hash routing, `localStorage`, i18n PT/EN, visual Apple, dataset Stage 3.

### 5.1 Superfícies

| Superfície | Situação |
| --- | --- |
| Home Apple | Unidades (Festivais, Package, Arquivo, Prêmios, Labs) + ribbon de disclaimer |
| Start / Take Action | Ficha completa, busca de título no arquivo, limpar formulário, PDF, medidor colorido |
| Festivais | 40 casas fictícias; busca por nome; filtros; cruzamento de elegibilidade |
| Pacote / Direitos | Checklists + pager Seguinte/Anterior |
| Inscrições | Status, sete passos, notas, PDF |
| Guia / Labs | Requisitos comuns e rota de desenvolvimento |
| Search (Arquivo) | 180 filmes; filtro forma/país; “Usar na inscrição” |
| Prêmios | Honrarias: Official Selection → Longlisted → Shortlisted → Nominated → Special Mention → Winner |
| Chrome | Nav global, menu mobile, PT/EN, acento `#00FF7D` |

### 5.2 Visual e interação (requisitos de UI deste branch)

- Home em **unidades** ao estilo Apple (títulos curtos, “Saiba mais”, foto de produto).
- Nav global com marca, idioma e hamburger no mobile.
- Botões **Seguinte / Next** e **Anterior / Back** em verde `#00FF7D`.
- Secção ativa, checkboxes concluídos e bullets de Labs no mesmo verde.
- Medidor de preparação: **vermelho &lt; 50**, **amarelo 50–70**, **verde `#00FF7D` &gt; 70**.
- Ficha do filme intitulada **Take Action** (nav: **Start**).
- Arquivo no nav como **Search**.

### 5.3 Relação com `main`

| | `main` | `cursor/apple-on-visualizacoes-3ed7` |
| --- | --- | --- |
| Catálogo | 12 festivais reais de documentário (ref. 2026) | 40 festivais fictícios do arquivo |
| Arquivo / Prêmios | não | sim |
| PT / EN | não | sim |
| Visual | papel / serif editorial | Apple marketing |
| PDF | não | sim |
| Nome da ficha | Filme | Take Action / Start |
| Formas de filme | só documentário no copy | Documentary, Drama, Animation, Experimental |

---

## 6. Jornadas

### J1 — Take Action: cadastrar ou puxar do arquivo

1. A pessoa abre Start (**Take Action**).
2. Ou preenche a ficha, ou busca um título no arquivo, ou carrega o exemplo, ou **limpa o formulário**.
3. Vê a nota 0–100 mudar de cor conforme a banda.
4. Segue para Festivais pelo **Seguinte**.

**Sucesso:** header mostra título + nota + contagem de inscrições. Sem título, Festivais pede cadastro.

### J2 — Escolher festivais

1. Busca pelo **nome** e/ou filtra região, elegíveis, labs.
2. Abre a ficha da casa: matches, avisos, bloqueios, seções de estreia.
3. Adiciona às inscrições só depois de ler o resumo (catálogo de ensino).

**Sucesso:** filme público, WIP na casa errada ou conclusão fora da janela aparece como **provavelmente inelegível**.

### J3 — Pacote e direitos

1. Marca textos, stills, screener, legendas.
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

Estágio WIP ou entrada por Labs. Seleção oficial de casas só-finalizado fica inelegível, com ponte para mercado/lab.

---

## 7. Requisitos funcionais

**P0** = o produto deste branch não existe sem isso (já implementado, salvo lacuna explícita).  
**P1** = próximo corte. **P2** = depois.

### 7.1 Start / Take Action

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| F-01 | Cadastrar títulos, logline, sinopses | P0 | Persiste após reload |
| F-02 | Duração, conclusão, país, idiomas, **forma**, estágio | P0 | Forma: documentário, ficção, animação, experimental |
| F-03 | Maior estreia já realizada (nenhuma / nacional / europeia / internacional / mundial) | P0 | Alimenta o que o filme ainda pode oferecer |
| F-04 | Declarar filme integral público | P0 | Inelegibilidade típica + nota cai |
| F-05 | Screener (URL, senha, legendas EN, `.srt`) | P0 | Sem URL: revisar; sem legendas e áudio não inglês: bloqueio onde exigido |
| F-06 | Direção, bio, declaração, produtor, e-mail, telefone | P0 | E-mail conta na nota |
| F-07 | Salvar a cada alteração | P0 | Sem botão salvar |
| F-08 | Preencher com exemplo **do arquivo** | P0 | Exemplo fictício, não obra real |
| F-09 | **Limpar formulário** remonta a ficha vazia | P0 | Não deixa placeholder de título EN parecendo valor |
| F-10 | Busca de título no arquivo, com lista de opções | P0 | Escolher um título carrega a ficha; vazio mostra “nenhum filme” |
| F-11 | Nota 0–100 com bandas de cor | P0 | &lt;50 vermelho; 50–70 amarelo; &gt;70 verde `#00FF7D` |
| F-12 | PDF da rota a partir da ficha | P0 | Ficheiro descarrega no browser |

### 7.2 Festivais e elegibilidade

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| E-01 | Listar festivais do arquivo (cidade, país, foco, labs, independentes/estreantes) | P0 | Proveniente do Stage 3, não hardcoded real |
| E-02 | Buscar **pelo nome** (lista de opções) e filtrar região / elegíveis / labs | P0 | Estado vazio, não erro |
| E-03 | Ordenar pelo score de cruzamento | P0 | Com ficha, casas compatíveis sobem |
| E-04 | Selos Elegível / Revisar regulamento / Provavelmente inelegível | P0 | Copy não promete seleção |
| E-05 | Detalhe: matches, avisos, bloqueios, estreia por seção, resumo, link | P0 | Disclaimer de ensino visível |
| E-06 | Sem filme, pedir cadastro / exemplo | P0 | Hint na lista |
| E-07 | Adicionar às inscrições sem duplicar | P0 | Segunda vez aponta para a lista |
| E-08 | Disclaimer: catálogo fictício / resumo ≠ edital | P0 | Ribbon, footer, detalhe, PDF |

Regras do motor (iguais em espírito ao recorte de `main`):

| Código | Quando | Efeito |
| --- | --- | --- |
| `wip` | WIP onde a seleção oficial não aceita | Inelegível; apontar lab se houver |
| `too-old-date` / `too-old` | Fora da data mínima ou da janela em meses | Inelegível |
| `completion-missing` / `duration-missing` / `screener` | Falta dado | Revisar |
| `future-date` | Conclusão no futuro | Revisar |
| `public-release` | Filme integral público | Inelegível para seções com exigência de estreia |
| `premiere-partial` / `premiere-blocked` | Grau de estreia já usado | Aviso ou inelegível |
| `subs` | Exige legendas EN, áudio não inglês, sem legendas | Inelegível ou revisar |

Estreia restante:

| Já usado | Ainda pode oferecer |
| --- | --- |
| Nenhuma | mundial, internacional, europeia, nacional, nenhuma |
| Nacional | internacional, europeia, nenhuma |
| Europeia | nacional, nenhuma |
| Internacional | europeia, nacional, nenhuma |
| Mundial | nacional, nenhuma |

### 7.3 Pacote e direitos

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| P-01 | Checklist de package (textos, direção, imagens, cópia de avaliação, contato) | P0 | Progresso visível; itens feitos em verde |
| P-02 | Lista pós-seleção: DCP/ProRes, press kit, trailer limpo, acessibilidade, termo | P0 | Ecoa no status Selecionado |
| D-01 | Direitos: entrevistas, menores, composição, master, fotos, vídeo, locações, autoridade, E&O | P0 | E&O com hint de distribuição posterior |
| D-02 | Não se apresentar como parecer jurídico | P0 | Copy de roteiro |

### 7.4 Inscrições e sete passos

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| S-01 | Tracker por festival, sem duplicar | P0 | Um registro por casa |
| S-02 | Status: em análise, inscrito, aguardando, selecionado, não selecionado, retirado | P0 | Edição manual sempre possível |
| S-03 | Sete passos: escolher → regulamento → formulário → screener → taxa → espera → termo/cópia | P0 | Passo 1 marcado ao adicionar |
| S-04 | form+screener+taxa ⇒ Inscrito; +espera ⇒ Aguardando (a partir de Em análise / Inscrito) | P0 | Não rebaixa Selecionado / Não selecionado / Retirado |
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

### 7.5 Search (Arquivo) e Prêmios

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| A-01 | Listar filmes do Stage 3 com cartaz, forma, país, duração | P0 | Dataset fictício; cartazes em `/archive-images` |
| A-02 | Filtrar busca / forma / país; paginação “mostrar mais” | P0 | Vazio amigável |
| A-03 | **Usar na inscrição** preenche Take Action e vai a Start | P0 | Filme em uso fica marcado |
| AW-01 | Listar honrarias com ano, filme, corpo, seção, resultado | P0 | Ordem de resultado: Official Selection → … → Winner |
| AW-02 | Filtrar por texto, resultado e tipo (festival vs award) | P0 | Clique no filme carrega a ficha |
| AW-03 | Deixar explícito que a jornada é de ensino | P0 | Copy não afirma prêmios reais |

### 7.6 Guia, Labs, home, chrome, i18n, PDF

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| G-01 | Home explica tese, unidades Apple, duas rotas, alerta de estreia | P0 | CTAs para Start, Festivais, Arquivo, Prêmios |
| G-02 | Guia: finalizado, conclusão, duração, estreia, screener, legendas, direitos, taxa, prazo | P0 | Não substitui edital |
| G-03 | Labs: quando usar mercado/pitching | P0 | Distinto da seleção oficial |
| G-04 | Nav com rótulos i18n; Start e Search nos nomes da UI | P0 | Secção atual destacada em verde |
| G-05 | Ribbon + footer: inscrição ≠ seleção; dataset fictício | P0 | Todas as páginas |
| G-06 | **Seguinte / Anterior** em todas as secções do `SECTION_FLOW` | P0 | Primeira sem Anterior; última sem Seguinte |
| I-01 | Seletor PT / EN no topo e no menu | P0 | UI inteira troca de língua; títulos do dataset ficam em inglês |
| I-02 | Locale persiste no browser | P0 | Reload mantém PT ou EN |
| R-01 | PDF cobre Start, Festivals, Package, Rights, Submissions | P0 | Inclui disclaimer de ensino e nota de preparação |
| R-02 | PDF lista festivais rastreados ou ainda não inelegíveis (até um teto) | P0 | Inscrições fora do teto ainda entram |

### 7.7 Persistência

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| ST-01 | `localStorage` chave `rota-doc-state-v1` | P0 | Ficha, pacote, direitos, inscrições |
| ST-02 | JSON inválido volta ao vazio sem quebrar | P0 | App abre |
| ST-03 | Documentar perda ao limpar cache / outro perfil / anônimo | P0 | README + MANUAL |

---

## 8. Sequência imediata (P1)

| ID | Requisito | Por quê |
| --- | --- | --- |
| N-01 | Unir o catálogo **real** de documentário do `main` com o arquivo de ensino (modo prática vs modo temporada) | Hoje são dois produtos em branches diferentes |
| N-02 | Prazos calendário (early / regular / late) | Taxa ainda é qualitativa |
| N-03 | Vários filmes no mesmo browser | Um JSON só não cobre produtora real |
| N-04 | Labs no tracker (pitching / mercado / coprodução) | Segunda rota existe na copy, pouco no acompanhamento |
| N-05 | A jornada de prêmios do **filme da pessoa**, não só do arquivo | Prêmios hoje são o dataset de ensino |
| N-06 | Conta opcional / sync depois da exportação PDF | PDF já tira o dado do browser; sync é o passo seguinte |

---

## 9. Fora de escopo nesta fase

- Envio real da inscrição / FilmFreeway API / pagamento.
- Parser de PDF de edital.
- Catálogo “sempre atualizado” sem curadoria.
- Discovery para público (busca semântica, homepage Netflix, matching de patrocínio, geração de entrevista).
- App nativo.
- Republicar o arquivo cliente Directors Notes.

O brief de discovery com IA (`kanban/PRODUCT_BRIEF.md` noutro branch) é **outro produto**.

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
- Visual Apple não autoriza copy de “tão sonhada premiação” como **promessa**; a home pode convidar, o disclaimer da ribbon manda.
- Sempre devolver a decisão ao regulamento (ou deixar claro o caráter fictício).

### 10.3 Acessibilidade

- Labels nos campos; selos com texto, não só cor.
- `aria-current` na secção ativa; menu com Escape e `aria-expanded`.
- Medidor com `aria-label` da nota.
- Contraste do verde `#00FF7D` sobre fundo claro precisa continuar legível (texto em botão vs. texto corrido).

---

## 11. Dados

### 11.1 Estado do cliente

```text
{
  film: { …ficha, form, archiveFilmId?… },
  package: { [itemId]: boolean },
  rights: { [itemId]: boolean },
  submissions: [{ id, festivalId, status, notes, steps, createdAt }]
}
```

Locale de UI é persistido à parte do estado da rota.

### 11.2 Fictional Film Archive

Stage 3 ligado em `src/app/src/data/archive.js`:

- 180 filmes → Search e preenchimento da ficha  
- 40 festivais → catálogo de inscrição de ensino  
- 120 pessoas, 24 empresas, 12 awards, 495 honrarias → Prêmios  

Não copiar nem transformar registros do cliente. Cartazes abstratos em `datasets/fictional-film-archive/images`.

### 11.3 PDF

Gerado no cliente (`reportModel` + `reportPdf`). Não sobe ficha nem senha de screener para servidor.

---

## 12. Requisitos não funcionais

| Área | Requisito |
| --- | --- |
| Stack | React + Vite; `src/app`; dev em **http://localhost:7363** (`npm start` na raiz deste branch) |
| Testes | Elegibilidade, i18n, secções, PDF (`npm test` em `src/app`) |
| Lint / build | `npm run lint` e `npm run build` |
| Privacidade | Ficha e senha do screener só no browser; PDF é download local |
| Legal | UI, ribbon, footer, MANUAL e PDF: ensino / fictício; inscrição ≠ seleção |
| i18n | Strings em `src/app/src/i18n/strings.js`; regras de elegibilidade não nascem misturadas a copy |

---

## 13. Métricas de sucesso

Sem analytics no MVP. Quando houver, medir **processo**, não seleção.

- Uma sessão: ficha preenchida (ou título do arquivo) + selo por festival.
- “Quase erros” visíveis: publicação pública, WIP, janela, legendas.
- PDF gerado com as cinco secções depois de marcar pacote/direitos.
- Learner consegue alternar PT/EN sem perder a ficha.
- Testes do motor e do PDF verdes.

Não usamos como sucesso: quantidade de “elegível”, taxas pagas, filmes selecionados.

---

## 14. Riscos

| Risco | Mitigação |
| --- | --- |
| Catálogo fictício lido como edital real | Ribbon, footer, MANUAL, PDF, README |
| Dois branches (`main` real vs este arquivo) confundem o produto | Este PRD nomeia o branch fonte; P1 N-01 |
| Copy de premiação vs princípio 2 | Ribbon e selos não prometem vitória |
| Verde `#00FF7D` ilegível | Usar o verde em botão/acento, não em texto longo sobre branco |
| Perda de `localStorage` | PDF (já existe) + documentar reset |
| Dataset cliente vs fictício | Só o arquivo inventado entra no app |

---

## 15. Roadmap

### Agora — este branch (entregue no PR #12)

Workspace Apple + PT/EN + Take Action + Search + Prêmios + pager + PDF + arquivo fictício.

### Em seguida — P1 (secção 8)

Modo prática vs temporada real, prazos, vários filmes, labs no tracker, prêmios do filme da pessoa.

### Depois — P2

Conta opcional, calendário de temporada, mais casas de língua portuguesa quando o modo real voltar.

### Explicitamente outro produto

Discovery com IA, homepage dinâmica, extração de metadados, matching de patrocínio.

---

## 16. Questões em aberto

1. O produto “oficial” passa a ser este branch (arquivo + Apple) ou o `main` (festivais reais de documentário)?
2. Quem versiona o catálogo a cada temporada, se o modo real voltar?
3. A jornada de prêmios deve continuar só no dataset de ensino?
4. O verde Apple é marca permanente ou só desta apresentação?
5. Labs no mesmo tracker ou quadro próprio?

---

## 17. Apêndice

### Como abrir o produto desta versão

```bash
git fetch origin
git checkout cursor/apple-on-visualizacoes-3ed7
git pull origin cursor/apple-on-visualizacoes-3ed7
npm install --prefix src/app
npm start
```

Abre **http://localhost:7363/**. PR: https://github.com/lorenasamuel-rgb/sfdev-3692112/pull/12

### Relação com outros artefatos

| Artefato | Papel |
| --- | --- |
| PR #12 / `cursor/apple-on-visualizacoes-3ed7` | Produto descrito neste PRD |
| `main` | Recorte anterior, festivais reais, sem arquivo |
| `src/week2-practice` | Protótipo pedagógico de readiness |
| `datasets/fictional-film-archive` | Dataset de ensino |
| PR #11 `apple-website-style` | Experimento Apple anterior, sobre outra base |
| Brief de discovery com IA | Outro produto |

### Filme de exemplo

Título fictício do arquivo (não enviar a festival real). Serve para demonstrar Take Action, cruzamento e PDF.

---

*Rota Doc organiza o processo de inscrição. A seleção é curatorial. Neste branch o catálogo é fictício. Confirme prazos, taxas e estreia no site oficial quando for uma casa real.*
