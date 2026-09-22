# Rota Doc

**Inscrever um filme em festival não falha por falta de talento. Falha por falta de método.**

Rota Doc é uma aplicação web que transforma o processo de inscrição em festivais numa rota clara de sete passos: cadastrar a ficha do filme, cruzar os dados com o regulamento de cada festival, montar o pacote de materiais, conferir os direitos e acompanhar cada candidatura até o termo de exibição.

---

## O problema

Uma produtora independente ou um realizador estreante que quer inscrever um curta enfrenta sempre a mesma parede:

- **O regulamento é longo e o detalhe decisivo está escondido.** Duração máxima, janela de conclusão, status de estreia, obrigatoriedade de legendas em inglês: cada festival combina essas regras de forma diferente.
- **Um erro custa a inscrição inteira.** Publicar o filme completo no YouTube antes de definir a estratégia elimina o status de estreia e fecha portas que não reabrem.
- **A taxa é paga antes da leitura atenta.** Muita gente descobre que o filme era inelegível depois de pagar.
- **Os mesmos materiais são refeitos a cada inscrição.** Logline, sinopses, stills, biografia da direção, screener com senha: tudo recomeça do zero em cada formulário.
- **O acompanhamento vive em folhas de cálculo.** Prazos, estados e senhas espalhados por ficheiros que ninguém atualiza.

## A solução

Rota Doc responde a isso com uma rota única e um motor de elegibilidade que lê a ficha do filme e o perfil de cada festival ao mesmo tempo.

| Passo | Na aplicação | O que resolve |
| --- | --- | --- |
| 1. Escolher festivais | **Festivais** | Filtra 40 festivais por região, foco editorial, presença de laboratório e elegibilidade real com o seu filme |
| 2. Verificar o regulamento | **Guia** | Os nove requisitos que aparecem em quase todo edital, explicados em linguagem de produção |
| 3. Preencher a inscrição | **Ficha** | Um cadastro único que alimenta todos os cruzamentos |
| 4. Enviar o screener | **Pacote** | 15 materiais do *festival package*, preparados uma vez e reutilizados |
| 5. Pagar a taxa | **Inscrições** | Só depois de conferir estreia, data de conclusão e screener |
| 6. Aguardar a seleção | **Inscrições** | Seis estados de acompanhamento por festival |
| 7. Termo e cópia final | **Direitos** | Música, arquivo, entrevistas, menores, locações, autoridade do produtor e E&O |

### O motor de elegibilidade

É o coração do produto. Para cada festival, Rota Doc cruza a ficha do filme com o regulamento e devolve um veredito com justificação, não um simples sim ou não:

- **Elegível**, **Rever** ou **Inelegível**, com uma pontuação de 0 a 100
- **Impedimentos** que bloqueiam a inscrição: filme longo demais para um festival de curtas, conclusão fora da janela de 24 meses, estreia já consumida por outro festival, filme publicado integralmente em acesso aberto
- **Alertas** para o que ainda dá para resolver: duração em falta, ausência de legendas em inglês, screener sem link, foco editorial que não conversa com a forma do filme
- **Coincidências** que valem a pena citar na candidatura: secção compatível com o estado de estreia, abertura a independentes e estreantes, faixa de novas vozes

A lógica de estreia é cumulativa e conservadora: um filme que já fez estreia internacional continua a poder oferecer estreia nacional ou europeia, mas não o contrário.

### Nota de preparação

Um medidor de 0 a 100 no topo de todas as páginas, em três faixas (baixo, médio, alto), que sobe conforme a ficha, o pacote e os direitos ficam completos e desce quando o filme já está público. É a resposta imediata à pergunta "já posso começar a inscrever?".

### Relatório em PDF

Um clique gera o **Relatório da rota**: ficha técnica, festivais ordenados por aderência, estado dos checklists de pacote e direitos e as inscrições em andamento. Gerado no browser com `pdf-lib`, sem servidor e sem enviar dados a lado nenhum.

### Bilingue, PT e EN

Toda a interface troca de idioma num botão no topo. Os nomes de filmes e festivais do dataset permanecem em inglês, como num catálogo real.

---

## Sobre o que ele corre

Rota Doc é alimentado pelo **Fictional Film Archive**, um dataset de ensino inteiramente inventado que vive neste repositório:

| | |
| --- | --- |
| 180 | filmes fictícios, com cartaz, forma, país e sinopse |
| 40 | festivais fictícios, com cidade, foco editorial e secções |
| 120 | pessoas e 24 produtoras |
| 909 | créditos ligando filmes a pessoas |
| 495 | honrarias, da seleção oficial à vitória |
| 12 | prémios fictícios |
| 1.736 | atribuições de taxonomia (género, tema, técnica, forma, país) |

O dataset traz lacunas de propósito: filmes sem duração, sem cartaz, sem honrarias. É isso que dá à interface algo real para tratar em renderização condicional, e é isso que torna o cruzamento de elegibilidade interessante.

Duas páginas existem só para explorar esse arquivo: **Arquivo** (180 filmes com filtros por forma, país, tema e direção) e **Prémios** (a jornada seleção oficial → lista longa → shortlist → indicação → menção → vitória). Em qualquer uma delas, **Usar na inscrição** carrega o título escolhido na ficha e recalcula tudo.

---

## Sob o capô

- **React 19 + Vite 8**, sem biblioteca de routing: a navegação por hash é resolvida na própria aplicação
- **Zero backend.** A ficha, os checklists e as inscrições ficam no `localStorage` do browser
- **Dados como módulos.** O dataset é importado via alias `@archive` e mapeado para o modelo da aplicação em `src/data/archive.js`
- **Lógica isolada da interface.** Elegibilidade, nota de preparação, datas, secções e relatório vivem em `src/lib`, testados com o runner nativo do Node
- **Traduções centralizadas** em `src/i18n/strings.js`, com interpolação por chave

```text
src/app/src/
  lib/        elegibilidade, nota de preparação, relatório PDF, rota entre secções
  data/       mapeamento do Fictional Film Archive e checklists
  pages/      Início, Ficha, Arquivo, Festivais, Prémios, Pacote, Direitos, Inscrições, Guia, Labs
  i18n/       PT e EN
  state/      estado da aplicação e persistência
datasets/fictional-film-archive/
  stage-1-simple-collection/     6 filmes, para começar
  stage-2-richer-collection/     12 filmes com arrays
  stage-3-connected-archive/     o arquivo completo que a aplicação usa
```

## Rodar localmente

Precisa apenas de Node.js e um browser atualizado.

```bash
cd src/app
npm install
npm run dev
```

Abre em `http://localhost:7363`.

```bash
npm test     # 26 testes de elegibilidade, relatório e navegação
npm run lint # oxlint
npm run build && npm run preview   # pré-visualização em :7364
```

Os cartazes são servidos a partir de `datasets/fictional-film-archive/images` por um plugin de Vite, tanto em desenvolvimento como no `build`.

---

## O que Rota Doc não é

Sendo honesto sobre os limites, porque eles fazem parte da proposta:

- Não envia a inscrição por você, não preenche o FilmFreeway e não paga taxas
- Não garante vaga na programação: depois da inscrição vem a seleção curatorial
- Não substitui assessoria jurídica de direitos
- Não acompanha editais reais. Nesta versão o catálogo é o arquivo fictício de ensino: use-o para praticar a rota, nunca como edital

## Próximos passos

- Exportar e importar a rota, para trabalhar em mais de um computador
- Prazos por edição de festival, com alertas antes da data
- Vários filmes na mesma instalação, hoje limitada a uma ficha
- Ligar o catálogo a fontes reais de editais, mantendo o dataset fictício como modo de treino

---

## Contexto

Projeto do Software Development Bootcamp, edição Directors Notes. O **Fictional Film Archive** foi inventado inteiramente para o curso: nenhum título, pessoa, produtora, festival, prémio ou descrição corresponde a registos reais, e os cartazes são formas geométricas geradas por script, sem fotografias.

Os resumos de regulamento na aplicação são material de ensino. Confirme sempre o edital vigente no site oficial do festival.
