# PRD — Rota Doc

**Produto:** Rota Doc  
**Tipo:** workspace de inscrição de documentários em festivais  
**Status do documento:** rascunho para alinhamento  
**Versão:** 1.0  
**Data:** 20 de setembro de 2026  
**Idioma do produto:** português (Brasil)  
**Código:** `src/app`  
**Protótipo anterior:** `src/week2-practice`

Este documento descreve o produto que está em `main`: o que ele resolve, para quem, o que já existe, o que é obrigatório, o que fica de fora e o que vem depois. Não substitui o [README](README.md) (como rodar) nem um manual de uso.

---

## 1. Resumo

Rota Doc ajuda **produtores independentes e realizadores estreantes** a inscrever um documentário em festivais **sem distribuidora**.

A premissa do produto é simples e deve aparecer em toda a interface:

1. O filme chega ao festival por uma **inscrição**.
2. Depois disso há **seleção curatorial**. A inscrição **não garante** participação.
3. Cada festival tem **regulamento próprio**. O app cruza o filme com regras típicas; o **edital vigente** manda.

O workspace cobre o processo completo até o termo de exibição:

| Etapa | O que o app faz |
| --- | --- |
| Ficha | Cadastra título, logline, duração, conclusão, estreia, screener e quem inscreve |
| Escolha | Cruza o filme com um catálogo de festivais de documentário |
| Pacote | Checklist dos materiais que os festivais pedem |
| Direitos | Checklist de autorizações (entrevistas, música, arquivo, E&O) |
| Acompanhamento | Sete passos por festival, do “escolher” ao “termo e cópia final” |
| Desenvolvimento | Rota paralela para laboratórios, mercados e pitching |

Os dados ficam só no **navegador** (`localStorage`). Não há conta, servidor de negócio nem envio da inscrição.

---

## 2. Problema

Inscrever um documentário independente é um trabalho de regulamento, não de networking com distribuidora. Quem estreia ou produz sem equipe de festival costuma errar em pontos caros:

- **Estreia.** Publicar o filme inteiro no YouTube ou em streaming queima a janela de world / international premiere.
- **Janela de conclusão.** Muitos festivais pedem filme concluído nos últimos 12–24 meses, ou depois de uma data da edição.
- **Duração.** Curta, média e longa mudam taxa, categoria e às vezes a seção.
- **Screener e legendas.** Link privado, sem geo-block, com legendas em inglês quando o áudio não é inglês.
- **Direitos.** Música, arquivo e entrevistas precisam estar licenciados antes de alguém assinar o termo de exibição.
- **Processo.** Cada casa tem site ou FilmFreeway próprio. Sem um quadro, a pessoa paga taxa cedo demais, perde prazo ou mistura rota de filme **finalizado** com rota de **projeto em desenvolvimento**.

Ferramentas genéricas (planilha, FilmFreeway isolado, notas) não cruzam a ficha do filme com as regras de cada casa nem separam as duas rotas.

---

## 3. Objetivos

### 3.1 Objetivos de produto

- Deixar um independente ou estreante **apto a inscrever** com clareza do que falta.
- Evitar inscrições **inúteis ou prejudiciais** (filme público, estreia já gasta, WIP na seleção oficial, conclusão fora da janela).
- Reunir **uma vez** o festival package e a checagem de direitos, e reutilizar nas casas.
- Acompanhar cada inscrição nos **sete passos reais**, até o termo de exibição.
- Ensinar, com linguagem de ofício, que **inscrição ≠ seleção**.

### 3.2 Não-objetivos (explícitos)

O Rota Doc **não**:

- envia a inscrição, paga taxa ou preenche FilmFreeway;
- substitui o edital, a curadoria ou um parecer jurídico;
- garante vaga, prêmio ou distribuição;
- é uma distribuidora, um festival ou uma plataforma de discovery para o público;
- sincroniza dados entre dispositivos na versão atual.

Os resumos de regulamento são **referência de edição**. O site oficial confirma prazo, taxa, categoria e estreia.

### 3.3 Princípios

1. **Regulamento primeiro.** Toda recomendação aponta de volta ao edital.
2. **Não tratar inscrição como resultado.** Copy, status e passos separam envio de seleção.
3. **Duas rotas.** Filme fechado → seleção oficial. Projeto aberto → labs, mercados, pitching.
4. **Estreia é ativo estratégico.** O app alerta contra publicação integral pública.
5. **Independentes e estreantes cabem**, desde que o filme caiba na regra — não o contrário.
6. **Orientação, não veredito.** “Elegível” nunca significa “vai entrar”.
7. **Preparar uma vez, reutilizar.** Pacote e direitos não se redesenham a cada festival.

---

## 4. Público

### 4.1 Persona principal — produtora independente / primeira direção

- Tem um documentário (muitas vezes em português, produzido no Brasil ou na América Latina).
- Não tem distribuidora nem equipe de festival.
- Precisa decidir **onde** inscrever, **quando** gastar a estreia e **o que** juntar antes de pagar taxa.
- Usa o app no computador, com o Vimeo e o edital abertos em outras abas.

### 4.2 Persona secundária — filme ainda em desenvolvimento

- Imagem e som não estão fechados.
- Busca coprodutor, fundo, lab ou mercado (MeetMarket, IDFA Forum, CPH:FORUM, Hot Docs Forum).
- Não deve ser empurrada para a seleção oficial de filme finalizado.

### 4.3 Fora do público nesta versão

- Programadores e curadores de festival (não há fila de screener nem ferramenta de seleção).
- Espectadores / discovery de catálogo.
- Longas de ficção como foco editorial (o catálogo e o vocabulário são de documentário).

---

## 5. Estado atual (MVP em `main`)

O MVP já está implementado como SPA React + Vite, hash routing, persistência local.

| Superfície | Rota | Situação |
| --- | --- | --- |
| Início | `#/` | Entrega a tese, os sete passos e as duas rotas |
| Filme | `#/filme` | Ficha completa + nota de preparação + filme de exemplo |
| Festivais | `#/festivais` | Catálogo, filtros, ordenação por compatibilidade |
| Detalhe do festival | `#/festivais/:id` | Cruzamento, seções de estreia, resumo, link do edital |
| Pacote | `#/pacote` | 15 itens + lista “se for selecionado” |
| Direitos | `#/direitos` | 9 itens, E&O marcado como posterior |
| Inscrições | `#/inscricoes` | Status, sete passos, notas, remoção |
| Guia | `#/guia` | Requisitos comuns + recortes Sheffield / IDFA |
| Labs | `#/laboratorios` | Rota de desenvolvimento (conteúdo estático) |

**Catálogo de referência (edição 2026):** Sheffield DocFest, IDFA, É Tudo Verdade, Doclisboa, CPH:DOX, Hot Docs, Visions du Réel, True/False, FIPADOC, Olhar de Cinema, Porto/Post/Doc, Cinéma du Réel.

**Motor de elegibilidade** (`src/app/src/lib/eligibility.js`), coberto por testes: duração, estreia restante, WIP, publicação pública, legendas em inglês, janela / data mínima de conclusão, screener.

**Limitações conhecidas do MVP** (não são bugs se estiverem documentadas):

- um filme por navegador;
- catálogo fixo no código, sem prazos calendário nem taxas numéricas;
- labs não entram no tracker de inscrições;
- sem conta, exportação, reset na UI ou i18n;
- elegibilidade é heurística da edição de referência, não parser do edital.

---

## 6. Jornadas

### J1 — Cadastrar o filme e entender a preparação

1. A pessoa abre o app e lê que inscrição ≠ seleção.
2. Vai em **Filme** e preenche identidade, ficha técnica, estreia, screener e contato.
3. Vê a nota 0–100 subir conforme preenche.
4. Opcionalmente carrega o exemplo *A Casa do Rio* só para explorar, depois substitui.

**Sucesso:** o header mostra o título, uma nota e “0 inscrições”. Sem título, Festivais pede cadastro.

### J2 — Escolher festivais sem queimar estreia

1. Em **Festivais**, filtra por região / elegíveis / labs.
2. Abre um card (ex.: IDFA) e lê matches, avisos e bloqueios.
3. Vê quais seções ainda aceitam o grau de estreia disponível.
4. Abre o regulamento oficial. Só então adiciona às inscrições.

**Sucesso:** não paga taxa sem ter visto estreia, conclusão e screener. Filme público ou WIP na casa errada aparece como **provavelmente inelegível**.

### J3 — Fechar pacote e direitos antes de inscrever

1. Marca textos, stills, screener e legendas em **Pacote**.
2. Confere entrevistas, menores, música, arquivo, locações e autoridade em **Direitos**.
3. Entende que E&O é de distribuição posterior, não da inscrição.

**Sucesso:** a nota de preparação sobe; a pessoa sabe o que falta antes do passo “pagar a taxa”.

### J4 — Acompanhar uma inscrição até o resultado

1. O festival entra em **Inscrições** com status *Em análise* e passo 1 marcado.
2. A pessoa marca regulamento → formulário → screener → taxa.
3. Ao marcar formulário + screener + taxa, o status vira *Inscrito*; com “aguardar”, vira *Aguardando seleção*.
4. Se *Selecionado*, o app lembra termo, DCP/ProRes, press kit, trailer limpo e acessibilidade.
5. Notas guardam prazo, senha do Vimeo, categoria. Remover tira só o acompanhamento local.

**Sucesso:** o quadro reflete o estado real **fora** do app (FilmFreeway / site do festival).

### J5 — Filme ainda não fechado

1. Estágio = *work in progress*, ou a pessoa vai direto a **Labs**.
2. Seleção oficial de casas que só aceitam finalizado fica inelegível, com ponte para o lab (ex. MeetMarket).
3. A inscrição de mercado é tratada como **outra rota**.

---

## 7. Requisitos funcionais

Prioridade: **P0** = o MVP não existe sem isso; **P1** = deve entrar na sequência imediata; **P2** = evolução.

Cada requisito P0 abaixo já está atendido no código atual, salvo onde marcado como lacuna.

### 7.1 Ficha do filme

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| F-01 | Cadastrar título original, título em inglês, logline, sinopse curta e completa | P0 | Campos persistem após recarregar a página |
| F-02 | Cadastrar duração (min), data de conclusão, país, idiomas, estágio (finalizado / WIP) | P0 | Duração e conclusão alimentam a elegibilidade |
| F-03 | Registrar a **maior** estreia já realizada: nenhuma, nacional, europeia, internacional, mundial | P0 | O valor entra no cálculo do que o filme ainda pode oferecer |
| F-04 | Declarar se o filme **inteiro** já está público (YouTube, Vimeo público, streaming) | P0 | Marcar isso gera inelegibilidade típica para competições de estreia e reduz a nota |
| F-05 | Cadastrar screener (URL privada, senha, legendas em inglês, arquivo `.srt`) | P0 | Sem URL: aviso de revisar; sem legendas e áudio não inglês: bloqueio onde o festival exige inglês |
| F-06 | Cadastrar direção, bio, declaração, produtor, e-mail e telefone | P0 | E-mail conta na nota de preparação |
| F-07 | Salvar a cada alteração, sem botão “salvar” | P0 | Digitar e recarregar mantém os dados |
| F-08 | Oferecer filme de exemplo para exploração | P0 | Preenche ficha + quase todo pacote/direitos; E&O permanece desmarcado |
| F-09 | Exibir nota de preparação 0–100 no header e na ficha | P0 | Sobe com campos-chave, pacote e direitos; publicação pública reduz |

### 7.2 Catálogo e elegibilidade

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| E-01 | Listar festivais de documentário com cidade, país, foco, labs e abertura a independentes/estreantes | P0 | Catálogo mínimo: as 12 casas da seção 5 |
| E-02 | Buscar por nome, cidade ou tema; filtrar por região, só elegíveis, só com lab | P0 | Lista vazia mostra estado vazio, não erro |
| E-03 | Ordenar pelo score de cruzamento com o filme cadastrado | P0 | Com ficha preenchida, casas compatíveis sobem |
| E-04 | Classificar cada casa em **Elegível**, **Revisar regulamento** ou **Provavelmente inelegível** | P0 | Selos visíveis no card e no detalhe; copy não promete seleção |
| E-05 | No detalhe: matches, avisos, bloqueios, seções de estreia possível/bloqueada, resumo (WIP, duração, conclusão, legendas, taxa, screener) | P0 | Sempre há link para o regulamento oficial |
| E-06 | Sem filme cadastrado, pedir cadastro ou exemplo antes do cruzamento útil | P0 | Hint na lista de festivais |
| E-07 | Adicionar o festival às inscrições a partir do detalhe, sem duplicar | P0 | Segunda vez aponta para a lista existente |
| E-08 | Disclaimer visível: resumo ≠ edital | P0 | Home, detalhe, rodapé e guia |

Regras do motor (produto, não só implementação):

| Código | Quando | Efeito |
| --- | --- | --- |
| `wip` | Estágio WIP e o festival não aceita WIP na seleção oficial | Inelegível; apontar lab se houver |
| `too-old-date` / `too-old` | Conclusão antes da data mínima ou fora da janela em meses | Inelegível |
| `completion-missing` / `duration-missing` / `screener` | Falta dado essencial | Revisar |
| `future-date` | Conclusão no futuro | Revisar |
| `public-release` | Filme integral público | Inelegível para seções que exigem estreia; só seções “sem exigência” restam |
| `premiere-partial` / `premiere-blocked` | Grau de estreia já usado | Aviso ou inelegível, conforme ainda houver seção possível |
| `subs` | Festival exige legendas em inglês, áudio não é inglês, screener sem legendas | Inelegível (se idioma informado) ou revisar (se idioma vazio) |

Estreia restante (maior status já usado → o que ainda se pode oferecer):

| Já usado | Ainda pode oferecer |
| --- | --- |
| Nenhuma | mundial, internacional, europeia, nacional, nenhuma |
| Nacional | internacional, europeia, nenhuma |
| Europeia | nacional, nenhuma |
| Internacional | europeia, nacional, nenhuma |
| Mundial | nacional, nenhuma |

Duração: cada festival define teto de curta (padrão 40 min) e, se houver, de média; acima disso é longa. Isso muda **enquadramento e taxa**, não a inscrição em si.

### 7.3 Pacote e direitos

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| P-01 | Checklist de festival package agrupado (textos, direção, imagens, cópia de avaliação, contato) | P0 | 15 itens; progresso “X de 15” |
| P-02 | Lista do que vem **depois** da seleção (DCP/ProRes, press kit, trailer limpo, acessibilidade, termo) | P0 | Visível em Pacote; ecoa no status Selecionado |
| D-01 | Checklist de direitos: entrevistas, menores, composição, master, fotos, vídeo/arquivo, locações, autoridade, E&O | P0 | E&O com hint de que é pós-inscrição |
| D-02 | Não se apresentar como aconselhamento jurídico | P0 | Copy de roteiro, não de parecer |

### 7.4 Inscrições e sete passos

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| S-01 | Tracker por festival escolhido | P0 | Um registro por festival |
| S-02 | Status: em análise, inscrito, aguardando seleção, selecionado, não selecionado, retirado | P0 | Edição manual sempre possível |
| S-03 | Sete passos conferíveis: escolher → regulamento → formulário → screener → taxa → espera → termo/cópia | P0 | Passo 1 já vem marcado ao adicionar |
| S-04 | Promoção automática: form+screener+taxa ⇒ *Inscrito*; +espera ⇒ *Aguardando* (só a partir de *Em análise* / *Inscrito*) | P0 | Não rebaixa *Selecionado* / *Não selecionado* / *Retirado* |
| S-05 | Notas livres por inscrição | P0 | Persistem |
| S-06 | Remover acompanhamento sem implicar cancelamento no festival | P0 | Copy não diz “cancelar inscrição” |
| S-07 | Com *Selecionado*, lembrar termo e entrega final | P0 | Nota visível no card |
| S-08 | Adicionar festival também a partir da lista de inscrições | P0 | Só casas ainda não rastreadas |

Os sete passos são parte do produto, não só da UI:

1. Escolher os festivais (tema, duração, país, estágio)
2. Verificar o regulamento (estreia, conclusão, categoria)
3. Preencher a inscrição (site do festival ou FilmFreeway)
4. Enviar o screener (link privado, sem geo-block)
5. Pagar a taxa (quando houver; antecipar costuma ser mais barato; há isenções)
6. Aguardar a seleção (inscrição não garante participação)
7. Termo e cópia final (se selecionado)

### 7.5 Guia, labs e home

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| G-01 | Home explica tese, sete passos, duas rotas e alerta de estreia | P0 | CTAs para Filme e Festivais |
| G-02 | Guia lista requisitos comuns de edital (finalizado, conclusão, duração, estreia, screener, legendas, direitos, taxa, prazo) | P0 | Diz que não substitui o edital |
| G-03 | Labs explica quando usar mercado/pitching e cita MeetMarket, IDFA Forum, CPH:FORUM, Hot Docs Forum | P0 | Distingue da seleção oficial |
| G-04 | Navegação persistente com filme atual, nota e contagem de inscrições | P0 | Todas as rotas acima acessíveis |
| G-05 | Rodapé reitera seleção curatorial + edital próprio | P0 | Presente em todas as páginas |

### 7.6 Persistência

| ID | Requisito | Pri | Critério de aceite |
| --- | --- | --- | --- |
| ST-01 | Persistir ficha, pacote, direitos e inscrições no `localStorage` (`rota-doc-state-v1`) | P0 | Reload no mesmo origin restaura |
| ST-02 | JSON inválido ou ausente volta ao estado vazio, sem quebrar a UI | P0 | App abre mesmo com storage corrompido |
| ST-03 | Documentar que limpar cache / outro perfil / anônimo zera os dados | P0 | README (e manual, quando existir) |

---

## 8. Requisitos da sequência imediata (P1)

Não estão no MVP. São o próximo corte honesto do produto, não um roadmap infinito.

| ID | Requisito | Por quê |
| --- | --- | --- |
| N-01 | **Prazos no calendário** por festival (early / regular / late) e alerta “não pague antes de conferir” | Hoje a taxa é só qualitativa; o erro mais caro é prazo |
| N-02 | **Vários filmes** (ou pelo menos WIP + finalizado lado a lado) | Produtoras reais não têm um único título |
| N-03 | **Exportar / imprimir** ficha + pacote + direitos (PDF ou texto) | O dado precisa sair do navegador rumo ao FilmFreeway |
| N-04 | **Resetar cadastro** na UI, sem DevTools | O exemplo *A Casa do Rio* mistura-se fácil com dados reais |
| N-05 | **Labs no tracker** (status próprio: pitching, mercado, coprodução) | A segunda rota existe na copy, não no acompanhamento |
| N-06 | **PT / EN na interface** | Circuito internacional; ficha já pede título em inglês |
| N-07 | **Jornada pós-seleção (prêmios)** | Seleção → indicação → vitória é a continuação natural do passo 7 e o tema aberto no repositório |

---

## 9. Fora de escopo nesta fase

- Conta de usuário, nuvem, sync entre aparelhos.
- Pagamento de taxa, wallet, FilmFreeway API.
- Parser automático de PDF de edital.
- Catálogo vivo “sempre atualizado” sem curadoria humana.
- Discovery para público (home estilo Netflix, busca semântica, gráfico social).
- Geração de entrevista, clipping ou matching de patrocínio.
- Ficção / animação como linha editorial principal.
- App nativo.

Esses temas aparecem em briefs paralelos do repositório (plataforma de discovery com IA, arquivo de ensino). **Não entram no Rota Doc** até o workspace de inscrição estar sólido.

---

## 10. Experiência e conteúdo

### 10.1 Arquitetura da informação

```text
Início
 ├─ Filme          → ficha + nota
 ├─ Festivais      → lista → detalhe → (edital oficial | adicionar inscrição)
 ├─ Pacote         → checklist inscrição + entrega se selecionado
 ├─ Direitos       → checklist de autorizações
 ├─ Inscrições     → cards por festival
 ├─ Guia           → leitura de edital
 └─ Labs           → rota de desenvolvimento
```

Fluxo canônico: **Filme → Pacote / Direitos → Festivais → edital oficial → Inscrições**.

### 10.2 Tom de voz

- Português claro, de ofício (edital, screener, estreia mundial, termo de exibição).
- Direto, sem hype de “sua tão sonhada premiação” como promessa.
- Alertas de estreia e de publicação pública em destaque, sem alarmismo vazio.
- Sempre devolver a decisão ao regulamento vigente.

### 10.3 Acessibilidade e apresentação (NFR de UI)

- Contraste legível no tema papel / tinta já usado.
- Labels associadas aos campos da ficha.
- Selos de elegibilidade com texto, não só cor.
- Uso viável em viewport estreita (nav, ficha, cards).
- Idioma da página: `pt-BR`.

---

## 11. Dados

### 11.1 Estado do cliente (`rota-doc-state-v1`)

```text
{
  film: { …ficha… },
  package: { [itemId]: boolean },
  rights: { [itemId]: boolean },
  submissions: [{
    id, festivalId, status, notes,
    steps: { choose, rules, form, screener, fee, wait, delivery },
    createdAt
  }]
}
```

Não há backend. Qualquer evolução com conta precisa de migração explícita desse JSON.

### 11.2 Catálogo de festivais (conteúdo)

Campos mínimos por casa: identidade, região, plataforma de inscrição, foco, aceita finalizado/WIP, lab associado, tetos de duração, janela ou data de conclusão, exigência de legendas, seções com grau de estreia, nota de taxa, abertura a independentes e estreantes, URL do edital.

Atualização do catálogo é **curadoria de produto**, não feature automática.

### 11.3 Dataset de ensino

`datasets/fictional-film-archive/` é material de bootcamp (filmes, pessoas, festivais e honrarias **fictícios**). Não deve ser confundido com o catálogo real do Rota Doc. Integração com o arquivo (páginas Arquivo / Prêmios) é experimento de curso, não requisito P0 deste PRD.

---

## 12. Requisitos não funcionais

| Área | Requisito |
| --- | --- |
| Stack | React 19 + Vite; app em `src/app`; porta de dev **7363** |
| Testes | Motor de elegibilidade com testes node (`npm test`). P0 novo no motor exige caso de teste |
| Lint / build | `npm run lint` e `npm run build` passam |
| Privacidade | Nenhum dado da ficha sai do navegador nesta versão. Screener URL e senha são locais — não logar |
| Performance | Catálogo atual (dezenas de casas) avalia no cliente sem espera perceptível |
| Confiabilidade | Storage corrompido não derruba a SPA |
| Legal / risco | UI e docs repetem: referência ≠ edital; inscrição ≠ seleção; checklist ≠ parecer jurídico |
| i18n | MVP só `pt-BR`; strings da UI não devem nascer misturadas a regras de elegibilidade |

---

## 13. Métricas de sucesso

Não há analytics no MVP. Quando houver, medir o **processo**, não a seleção (que o app não controla).

**Indicadores de produto (qualitativos agora, quantitativos depois):**

- A pessoa consegue cadastrar o filme e obter um selo por festival em uma sessão.
- Casos de “quase erro” são visíveis: publicação pública, WIP na seleção oficial, conclusão fora da janela, falta de legendas.
- Há pelo menos uma inscrição com passos 3–5 marcados **depois** de abrir o edital (não o contrário).
- Nota de preparação > 70 correlaciona com pacote + direitos + screener preenchidos — não com “otimismo”.

**Indicadores que *não* usamos como sucesso:** número de “elegível”, taxas pagas, filmes selecionados.

**Qualidade:** testes de elegibilidade verdes; zero copy que prometa participação.

---

## 14. Riscos

| Risco | Mitigação |
| --- | --- |
| Catálogo desatualizado vira “verdade” | Disclaimer + link oficial em todo detalhe; edição de referência explícita (hoje 2026) |
| Heurística de estreia errada para uma seção | Sempre listar seções; “possível / bloqueada” é palpite; edital decide |
| Usuário envia o filme de exemplo a um festival | Exemplo claramente fictício; reset (N-04) na sequência |
| Perda de dados no `localStorage` | Documentar; exportação (N-03) na sequência |
| Confundir Rota Doc com discovery / arquivo de ensino | Este PRD delimita; dataset fictício não substitui o catálogo real |
| Tom de “garantir prêmio” | Princípio 2; evitar copy de conquista/premiação como promessa |

---

## 15. Roadmap

### Agora — MVP (entregue)

Workspace local: ficha, cruzamento, pacote, direitos, sete passos, guia, labs, 12 festivais de referência, testes do motor.

### Em seguida — P1 (seção 8)

Prazos, múltiplos filmes, exportar, reset, labs no tracker, PT/EN, jornada seleção → indicação → prêmio.

### Depois — P2

- Conta opcional e sync.
- Mais casas da América Latina e de língua portuguesa.
- Calendário único de prazos da temporada.
- Lembrete de screener no ar até o fim da seleção.
- Acessibilidade mais profunda (audiodescrição do produto, teclado, leitores de tela).

### Explicitamente depois de o núcleo estar sólido

Ideias de discovery com IA, homepage dinâmica, extração de metadados, matching de patrocínio — outro produto (plataforma de discovery), não uma feature escondida do Rota Doc.

---

## 16. Questões em aberto

1. O catálogo permanece **só documentário** ou abre para híbridos / ficção de autor (Olhar de Cinema já encosta nisso)?
2. Quem **cura e versiona** o catálogo a cada temporada (2026 → 2027)?
3. A jornada de prêmios é um quadro do **filme da pessoa** ou um arquivo editorial separado (dataset de ensino)?
4. Precisamos de conta antes da exportação, ou a exportação local basta para o público-alvo?
5. Labs devem ser inscrições no mesmo tracker ou um quadro próprio?

---

## 17. Apêndice — inventário do MVP

### Telas e CTAs

| Tela | CTA principal |
| --- | --- |
| Home | Cadastrar meu filme / Ver festivais / Ir para labs |
| Filme | Preencher com exemplo |
| Festivais | Ver regulamento resumido |
| Detalhe | Adicionar às inscrições / Abrir regulamento oficial / Labs |
| Pacote / Direitos | Marcar item |
| Inscrições | Status, passos, notas, remover |
| Guia | Links Sheffield e IDFA |
| Labs | Links MeetMarket (e menções Forum) |

### Filme de exemplo

*A Casa do Rio* / *The River House* — longa brasileiro, 78 min, conclusão 2025-11-02, português, finalizado, sem estreia, legendas + `.srt`, screener Vimeo fictício. Serve para demonstrar um perfil **elegível** na maior parte do catálogo, não para envio real.

### Relação com outros artefatos do repo

| Artefato | Papel frente a este PRD |
| --- | --- |
| `src/app` | Produto |
| `src/week2-practice` | Protótipo pedagógico de “festival readiness”; não é o produto |
| `datasets/fictional-film-archive` | Dataset de ensino; não é o catálogo Rota Doc |
| Issue de *awards journey* | Entrada de P1 (N-07), a detalhar |
| Brief de discovery com IA | Outro produto; fora de escopo aqui |

---

*Rota Doc organiza o processo de inscrição. A seleção é curatorial. Confirme prazos, taxas e estreia no site oficial.*
