# Manual do Rota Doc

Guia de uso da aplicação para produtores independentes e estreantes inscreverem documentários em festivais.

Os resumos de regulamento no app são de **referência**. Confirme sempre o edital vigente no site oficial do festival. A inscrição **não garante** participação: a seleção é curatorial.

---

## 1. O que é o Rota Doc

O Rota Doc organiza o processo de inscrição de um documentário em festival. Ele ajuda a:

- cadastrar a ficha do filme (títulos, logline, duração, conclusão, estreia, screener);
- cruzar o filme com um catálogo de festivais;
- montar o *festival package* e a lista de direitos;
- acompanhar os sete passos da inscrição até o termo de exibição;
- separar a rota de filmes **finalizados** da rota de **laboratórios e mercados**.

Não é uma distribuidora, não envia a inscrição por você e não substitui o regulamento oficial.

### Para quem é

Produtores independentes e realizadores estreantes que querem inscrever um documentário sem passar por uma distribuidora, mas precisam conferir regras de duração, estreia, conclusão, screener e legendas.

### O que o app não faz

- não paga taxas nem preenche FilmFreeway;
- não garante vaga na programação;
- não substitui assessoria jurídica de direitos;
- não atualiza editais automaticamente a cada edição.

---

## 2. Como começar

### Requisitos

- Node.js instalado;
- navegador atualizado (Chrome, Firefox, Safari ou Edge).

### Instalar e abrir

```bash
cd src/app
npm install
npm run dev
```

O app abre em [http://localhost:7363](http://localhost:7363).

Outros comandos:

```bash
npm test          # testes de elegibilidade
npm run build     # build de produção
npm run preview   # pré-visualizar o build
```

### Onde os dados ficam

Tudo é salvo no **localStorage** do navegador (chave `rota-doc-state-v1`): ficha do filme, checklists e inscrições.

Isso significa:

- os dados permanecem se você recarregar a página no mesmo navegador;
- limpar o cache do site apaga o cadastro;
- outro computador, outro perfil ou modo anônimo começa do zero;
- não há conta, nuvem nem sincronização entre dispositivos.

---

## 3. Como navegar

O menu superior tem sete seções, além da página inicial:

| Menu | Rota | Função |
| --- | --- | --- |
| (marca Rota Doc) | Início | Apresentação e os sete passos |
| Filme | `#/filme` | Ficha do documentário |
| Festivais | `#/festivais` | Catálogo e cruzamento de elegibilidade |
| Pacote | `#/pacote` | Materiais do festival package |
| Direitos | `#/direitos` | Autorizações e licenças |
| Inscrições | `#/inscricoes` | Acompanhamento de cada festival |
| Guia | `#/guia` | Requisitos comuns de regulamento |
| Labs | `#/laboratorios` | Laboratórios, mercados e pitching |

À direita do menu aparece o **título do filme**, a **nota de preparação** (0–100) e o **número de inscrições**.

O rodapé lembra: a seleção é curatorial e cada festival tem edital próprio.

---

## 4. Fluxo recomendado

1. Cadastre o filme em **Filme**.
2. Marque o que já está pronto em **Pacote** e **Direitos**.
3. Em **Festivais**, filtre e abra os que combinam com duração, estreia e estágio.
4. Leia o resumo, abra o regulamento oficial e, se fizer sentido, adicione às inscrições.
5. Em **Inscrições**, avance os sete passos e atualize o status.
6. Se o filme ainda estiver em desenvolvimento, use **Labs** em vez da seleção oficial.

Use **Guia** sempre que precisar reler o que os editais costumam exigir.

---

## 5. Página inicial

A abertura explica o propósito do app e lista os **sete passos** da inscrição:

1. Escolher os festivais
2. Verificar o regulamento
3. Preencher a inscrição
4. Enviar o screener
5. Pagar a taxa
6. Aguardar a seleção
7. Termo e cópia final (se selecionado)

Também destaca as **duas rotas**:

- filme **finalizado** → inscrição na seleção oficial;
- filme em **desenvolvimento** → laboratórios, mercados e pitching (MeetMarket, fóruns).

Há um alerta sobre **estreia**: não publique o filme inteiro no YouTube, Vimeo público ou streaming antes de definir a estratégia. Um link **privado com senha** para avaliação, em geral, não conta como lançamento público.

Atalhos: **Cadastrar meu filme** e **Ver festivais**.

---

## 6. Filme — ficha do documentário

É o cadastro que alimenta o cruzamento com os festivais e a nota de preparação. Os campos salvam automaticamente ao digitar.

### Identidade

- **Título original** (obrigatório para o app tratar o filme como cadastrado)
- **Título em inglês**
- **Logline** (uma ou duas frases)
- **Sinopse curta**
- **Sinopse completa**

### Ficha técnica

- **Duração** em minutos — define curta, média ou longa conforme o festival
- **Data de conclusão** — usada na janela típica de 12–24 meses
- **País de produção**
- **Idiomas do áudio** — se não for inglês, a maioria dos festivais pede legendas em inglês
- **Estágio**: documentário finalizado ou *work in progress*

### Estreia e publicação

**Maior estreia já realizada:**

| Opção | Significado |
| --- | --- |
| Ainda não estreou | Melhor posição para competições de estreia mundial |
| Estreia nacional | Já estreou no país; algumas competições internacionais ainda são possíveis |
| Estreia europeia | Já estreou na Europa |
| Estreia internacional | Já estreou fora do país de origem |
| Estreia mundial (já usada) | A janela de world premiere foi gasta |

Marque **O filme inteiro já está público** se o documentário estiver no YouTube, Vimeo público ou streaming. Isso costuma eliminar o status de estreia e o app trata o filme como **provavelmente inelegível** para competições importantes.

### Screener

- **Link privado** (em geral Vimeo com senha)
- **Senha**
- **Screener com legendas em inglês**
- **Arquivo .srt disponível**

O link precisa funcionar até o fim da seleção e **sem bloqueio geográfico**.

### Quem inscreve

Direção, produtor ou responsável, e-mail, telefone, biografia e declaração da direção.

### Preencher com exemplo

O botão **Preencher com exemplo** carrega o filme fictício *A Casa do Rio* (longa brasileiro, 78 min, ainda sem estreia, com legendas e screener). Também marca quase todos os itens de Pacote e Direitos (exceto o seguro E&O). Use só para explorar o app; substitua pelos dados reais antes de inscrever.

### Nota de preparação (0–100)

O medidor **Preparação para inscrever** sobe quando você preenche título, logline, duração, conclusão, país, idiomas, filme finalizado, estreia intacta, legendas, screener, e-mail, e quando avança os checklists de Pacote e Direitos.

Publicar o filme integralmente em plataforma pública **reduz** a nota.

---

## 7. Festivais

Lista o catálogo de referência e cruza cada casa com a ficha do filme.

Se ainda não houver título cadastrado, aparece o convite para cadastrar o filme ou carregar o exemplo.

### Filtros

- busca por nome, cidade ou tema;
- região: todas, América Latina, Europa, América do Norte;
- status: todos, só elegíveis com o seu filme, ou só festivais com laboratório/mercado.

Os cards são ordenados pelo cruzamento com o seu filme (os mais compatíveis primeiro).

### O que aparece em cada card

- cidade e país;
- nome (abre o detalhe);
- selo de elegibilidade;
- foco editorial;
- selos: Independentes, Estreantes, limite de curta, nome do lab.

### Selo de elegibilidade

| Selo | Quando aparece |
| --- | --- |
| **Elegível** | Não há bloqueios evidentes; ainda assim leia o edital |
| **Revisar regulamento** | Falta dado (duração, conclusão, screener) ou há restrição parcial de estreia |
| **Provavelmente inelegível** | Há impedimento típico: filme antigo demais, WIP onde só entra finalizado, estreia já usada, publicação pública, falta de legendas em inglês |

O cruzamento considera, entre outros:

- estágio (finalizado vs. WIP);
- duração e categoria;
- data de conclusão (data mínima da edição ou janela em meses);
- status de estreia por seção (mundial, internacional, europeia, nacional);
- publicação pública integral;
- legendas em inglês quando o áudio não é inglês;
- presença de screener.

O resultado é uma **orientação**. O edital vigente manda.

### Página do festival

Em `#/festivais/{id}` você encontra:

- descrição, edição de referência e plataforma (site do festival ou FilmFreeway);
- **Cruzamento com o seu filme**: o que combina, avisos e bloqueios;
- **Exigências típicas de estreia** por seção (possível ou bloqueada);
- **Regulamento em resumo**: finalizado/WIP, duração, conclusão, legendas, taxa, screener;
- links para o **regulamento oficial** e, se houver, para o laboratório/mercado;
- os passos seguintes da inscrição.

**Adicionar às inscrições** cria um acompanhamento em Inscrições, já com o passo 1 (escolher o festival) marcado. Se o festival já estiver na lista, o botão vira **Ver na lista de inscrições**.

### Catálogo incluído (edição de referência 2026)

| Festival | Cidade | Região | Lab / mercado |
| --- | --- | --- | --- |
| Sheffield DocFest | Sheffield | Europa | MeetMarket |
| IDFA | Amsterdã | Europa | IDFA Forum / Academy |
| É Tudo Verdade | São Paulo e Rio | América Latina | Encontros e mostras de projetos |
| Doclisboa | Lisboa | Europa | Industry / Apordoc |
| CPH:DOX | Copenhague | Europa | CPH:FORUM |
| Hot Docs | Toronto | América do Norte | Hot Docs Forum |
| Visions du Réel | Nyon | Europa | sim |
| True/False Film Fest | Columbia, Missouri | América do Norte | — |
| FIPADOC | Biarritz | Europa | sim |
| Olhar de Cinema | Curitiba | América Latina | — |
| Porto/Post/Doc | Porto | Europa | sim |
| Cinéma du Réel | Paris | Europa | — |

---

## 8. Pacote — festival package

Checklist dos materiais que os festivais pedem na inscrição. Prepare uma vez e reutilize.

Grupos:

- **Textos** — títulos, logline, sinopses, ficha técnica
- **Direção** — bio, foto, declaração
- **Imagens** — stills, pôster, trailer
- **Cópia de avaliação** — link privado, legendas em inglês, arquivo `.srt`
- **Contato** — quem pode assinar o termo de exibição

Marque cada item quando estiver pronto. O contador mostra *X de 15 itens prontos*.

### Se o filme for selecionado

O festival pode pedir, além do pacote de inscrição:

- cópia de exibição em DCP, ProRes ou formato pedido;
- press kit atualizado;
- trailer sem legendas incorporadas;
- materiais de acessibilidade (legendas, audiodescrição);
- termo de exibição assinado.

---

## 9. Direitos

Quem inscreve precisa ter autoridade para exibir o filme. A tela lista autorizações típicas:

| Grupo | O que conferir |
| --- | --- |
| Pessoas | Termos das pessoas entrevistadas; autorização de responsáveis por menores |
| Música | Licença da composição e da gravação (master) |
| Arquivo | Fotografias; vídeos, TV e redes sociais |
| Locações | Autorização de espaços particulares |
| Produtor | Autoridade para inscrever e exibir |
| Distribuição | Seguro Errors & Omissions (E&O), quando o comprador exigir depois |

O E&O em geral **não** é exigido na inscrição em festival; entra na distribuição posterior.

Este checklist é um roteiro. Não substitui contrato nem parecer jurídico.

---

## 10. Inscrições

Acompanha cada festival escolhido. A inscrição no festival acontece **fora** do Rota Doc (site oficial ou FilmFreeway). Aqui você só organiza o processo.

### Adicionar um festival

- na página do festival, **Adicionar às inscrições**; ou
- no seletor **Adicionar festival**, no topo desta tela.

Cada festival entra só uma vez. O status inicial é **Em análise**.

### Status

| Status | Uso |
| --- | --- |
| Em análise | Você ainda está conferindo se vale inscrever |
| Inscrito | Formulário, screener e taxa (quando houver) foram feitos |
| Aguardando seleção | Inscrição enviada; espera a curadoria |
| Selecionado | Precisa assinar termo e enviar cópia final |
| Não selecionado | Fora da programação desta edição |
| Retirado | Você tirou o filme da disputa |

Alguns status mudam sozinhos ao marcar passos:

- marcar **preencher inscrição + screener + taxa** promove de *Em análise* para *Inscrito*;
- marcar também **aguardar a seleção** promove para *Aguardando seleção*.

Você pode ajustar o status manualmente a qualquer momento.

### Os sete passos (checklist por festival)

1. Escolher os festivais
2. Verificar o regulamento
3. Preencher a inscrição
4. Enviar o screener
5. Pagar a taxa
6. Aguardar a seleção
7. Termo e cópia final

Se o status for **Selecionado**, aparece o lembrete de assinar o termo e enviar cópia, divulgação e legendas.

### Notas e remoção

Use o campo **Notas** para prazo, taxa paga, senha do Vimeo, categoria escolhida.

**Remover** tira o festival da lista de acompanhamento. Não cancela a inscrição no site do festival.

---

## 11. Guia — requisitos comuns

Roteiro de leitura de edital, não um substituto. Cobre:

- documentário finalizado vs. work in progress;
- data de conclusão (muitas vezes 12–24 meses);
- duração (curta frequentemente perto de 40 minutos);
- status de estreia;
- screener privado;
- legendas em inglês;
- direitos autorizados;
- taxa (varia com duração e prazo);
- prazo (inscrição antecipada costuma ser mais barata).

Há um recorte de referência do **Sheffield DocFest** e do **IDFA 2026**, com links para os regulamentos oficiais.

---

## 12. Labs — laboratórios e mercados

Use esta rota se o documentário **ainda não está fechado** e você busca financiamento, coprodução ou distribuição — não uma cópia final para seleção oficial.

Sinais de que esta é a rota certa:

- imagem e som ainda não estão fechados;
- você busca coprodutor, fundo ou agente de vendas;
- é um primeiro filme e precisa de laboratório de desenvolvimento.

Exemplos citados no app:

- **MeetMarket** (Sheffield DocFest) — projetos em vários estágios, inclusive estreantes;
- **IDFA Forum** — coprodução;
- **CPH:FORUM** — documentários em desenvolvimento;
- **Hot Docs Forum** — indústria e Deal Maker.

A inscrição em lab/mercado é **distinta** da inscrição do filme finalizado.

---

## 13. Conceitos que o app usa

### Estreia

Cada competição pode exigir um “grau” de estreia ainda disponível:

- **mundial** — primeira exibição pública em qualquer lugar;
- **internacional** — primeira fora do país de origem;
- **europeia** — primeira na Europa;
- **nacional** — primeira no país do festival.

O app calcula o que o filme **ainda pode oferecer** com base na maior estreia já usada. Publicar o filme inteiro em plataforma pública costuma zerar essa janela.

### Screener vs. cópia de exibição

- **Screener**: cópia de avaliação (link privado) para a seleção.
- **Cópia de exibição**: DCP/ProRes (ou o formato pedido) **depois** de selecionado.

### Independentes e estreantes

Os festivais do catálogo estão abertos a produtores independentes e a primeiros filmes, **desde que** o documentário caiba no regulamento (duração, conclusão, estreia, screener, direitos).

---

## 14. Perguntas frequentes

**Preciso de distribuidora para inscrever?**  
Não. Independentes e estreantes podem inscrever. O que manda é o regulamento.

**A inscrição garante que o filme entra no festival?**  
Não. Depois da inscrição há seleção curatorial.

**Por que meu filme aparece como “revisar regulamento”?**  
Falta algum dado (duração, conclusão, screener) ou há restrição parcial — por exemplo, uma competição de estreia mundial bloqueada, mas outra seção ainda possível.

**Por que aparece “provavelmente inelegível”?**  
Há um bloqueio típico: conclusão fora da janela, WIP em festival que só aceita finalizado, estreia já usada nas seções listadas, filme público na internet, ou falta de legendas em inglês.

**Posso usar o filme de exemplo?**  
Sim, para testar o app. Não envie esses dados a um festival.

**Como apago meus dados?**  
Limpe os dados do site no navegador (armazenamento local / localStorage para este endereço). Não há botão de “reset” no app.

**Os prazos e taxas estão atualizados?**  
São resumos de edições de referência (2026 no catálogo atual). Sempre abra o regulamento oficial antes de pagar.

---

## 15. Avisos importantes

1. Confirme prazos, taxas, categoria e estreia no **site oficial**.
2. Não pague taxa antes de conferir estreia, data de conclusão e screener.
3. Não publique o filme completo em plataforma pública enquanto a estratégia de festivais estiver aberta.
4. Mantenha o screener no ar, com senha, até o fim da seleção.
5. Guarde uma versão do trailer **sem** legendas queimadas para entrega se for selecionado.
6. Quem inscreve precisa poder assinar o termo de exibição.

---

## 16. Resumo rápido

| Quero… | Onde ir |
| --- | --- |
| Cadastrar o documentário | Filme |
| Ver se um festival cabe no meu filme | Festivais → abrir o festival |
| Montar textos, stills e screener | Pacote |
| Conferir música, arquivo e entrevistas | Direitos |
| Acompanhar prazos e status | Inscrições |
| Entender o que os editais pedem | Guia |
| Inscrever um projeto em desenvolvimento | Labs |
