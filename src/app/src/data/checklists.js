export const packageItems = [
  {
    id: 'titles',
    group: 'Textos',
    label: 'Título original e título em inglês',
    hint: 'Os dois nomes entram na ficha da inscrição e nos catálogos.',
  },
  {
    id: 'logline',
    group: 'Textos',
    label: 'Logline (uma ou duas frases)',
    hint: 'O resumo que o programador lê primeiro.',
  },
  {
    id: 'short-synopsis',
    group: 'Textos',
    label: 'Sinopse curta',
    hint: 'Geralmente 400–600 caracteres.',
  },
  {
    id: 'full-synopsis',
    group: 'Textos',
    label: 'Sinopse completa',
    hint: 'Versão longa para catálogo e imprensa.',
  },
  {
    id: 'credits-sheet',
    group: 'Textos',
    label: 'Ficha técnica e créditos completos',
    hint: 'Duração, ano, país, idiomas, equipe.',
  },
  {
    id: 'director-bio',
    group: 'Direção',
    label: 'Biografia da direção',
    hint: 'Curta, em português e inglês se possível.',
  },
  {
    id: 'director-photo',
    group: 'Direção',
    label: 'Fotografia da direção',
    hint: 'Alta resolução, fundo simples.',
  },
  {
    id: 'director-statement',
    group: 'Direção',
    label: 'Nota ou declaração da direção',
    hint: 'Por que este filme, agora.',
  },
  {
    id: 'stills',
    group: 'Imagens',
    label: 'De três a cinco fotografias em alta resolução',
    hint: 'Frames do documentário, não prints de tela.',
  },
  {
    id: 'poster',
    group: 'Imagens',
    label: 'Pôster (quando disponível)',
    hint: 'Útil para seleção e obrigatório se o filme for escolhido.',
  },
  {
    id: 'trailer',
    group: 'Imagens',
    label: 'Trailer ou teaser',
    hint: 'Guarde também uma versão sem legendas incorporadas para o festival.',
  },
  {
    id: 'screener',
    group: 'Cópia de avaliação',
    label: 'Link privado do filme',
    hint: 'Funcionando até o fim da seleção, sem bloqueio geográfico.',
  },
  {
    id: 'subs-en',
    group: 'Cópia de avaliação',
    label: 'Legendas em inglês',
    hint: 'Normalmente obrigatórias quando o áudio não está em inglês.',
  },
  {
    id: 'srt',
    group: 'Cópia de avaliação',
    label: 'Arquivo .srt das legendas',
    hint: 'Preferível além das legendas queimadas no screener.',
  },
  {
    id: 'contact',
    group: 'Contato',
    label: 'Contato do produtor ou responsável',
    hint: 'Quem pode assinar o termo de exibição.',
  },
]

export const selectedDeliveryItems = [
  {
    id: 'dcp',
    label: 'Cópia de exibição em DCP, ProRes ou formato pedido',
  },
  {
    id: 'press-kit',
    label: 'Press kit atualizado',
  },
  {
    id: 'clean-trailer',
    label: 'Trailer sem legendas incorporadas',
  },
  {
    id: 'accessibility',
    label: 'Materiais de acessibilidade (legendas, audiodescrição, quando pedidos)',
  },
  {
    id: 'exhibition-terms',
    label: 'Termo de exibição assinado',
  },
]

export const rightsItems = [
  {
    id: 'interviews',
    group: 'Pessoas',
    label: 'Termos de autorização das pessoas entrevistadas',
    hint: 'Uso em festivais, catálogo e, se possível, janelas futuras.',
  },
  {
    id: 'minors',
    group: 'Pessoas',
    label: 'Autorização dos responsáveis por menores',
    hint: 'Obrigatório quando há crianças ou adolescentes na imagem ou no som.',
  },
  {
    id: 'music-composition',
    group: 'Música',
    label: 'Licença da composição musical',
    hint: 'Direito autoral da obra, mesmo que a gravação seja sua.',
  },
  {
    id: 'music-master',
    group: 'Música',
    label: 'Licença da gravação (master)',
    hint: 'Quem detém a faixa usada no filme.',
  },
  {
    id: 'archive-stills',
    group: 'Arquivo',
    label: 'Permissão para fotografias',
    hint: 'Acervos pessoais, agências e imagens encontradas.',
  },
  {
    id: 'archive-video',
    group: 'Arquivo',
    label: 'Permissão para vídeos, TV e redes sociais',
    hint: 'Noticiários, YouTube, Instagram, CCTV e semelhantes.',
  },
  {
    id: 'locations',
    group: 'Locações',
    label: 'Autorização das locações privadas',
    hint: 'Quando a filmagem ocorre em espaço particular.',
  },
  {
    id: 'authority',
    group: 'Produtor',
    label: 'Autoridade para inscrever e exibir o filme',
    hint: 'O produtor precisa poder assinar pelo filme.',
  },
  {
    id: 'eo',
    group: 'Distribuição',
    label: 'Seguro Errors & Omissions (E&O) — quando for o caso',
    hint: 'Alguns compradores exigem na distribuição posterior, não na inscrição.',
  },
]

export const commonRequirements = [
  {
    id: 'finished',
    title: 'Documentário finalizado',
    meaning:
      'Normalmente deve estar com imagem e som fechados. Alguns festivais aceitam work in progress — e laboratórios existem para o estágio anterior.',
  },
  {
    id: 'completion',
    title: 'Data de conclusão',
    meaning: 'Pode ser exigido que o filme tenha sido concluído nos últimos 12–24 meses.',
  },
  {
    id: 'duration',
    title: 'Duração',
    meaning:
      'O festival define categorias como curta, média ou longa. O limite de curta frequentemente fica próximo de 40 minutos, mas varia.',
  },
  {
    id: 'premiere',
    title: 'Status de estreia',
    meaning:
      'Algumas competições exigem estreia mundial, internacional, europeia ou nacional. Publicar o filme inteiro no YouTube pode queimar essa janela.',
  },
  {
    id: 'screener',
    title: 'Screener',
    meaning: 'Link privado, funcionando até o fim da seleção, sem bloqueio geográfico.',
  },
  {
    id: 'subs',
    title: 'Legendas em inglês',
    meaning: 'Normalmente obrigatórias quando o áudio não está em inglês.',
  },
  {
    id: 'rights',
    title: 'Direitos autorizados',
    meaning:
      'Música, imagens de arquivo, fotografias, entrevistas e outros conteúdos precisam estar licenciados.',
  },
  {
    id: 'fee',
    title: 'Taxa',
    meaning: 'Pode variar conforme duração e antecedência da inscrição.',
  },
  {
    id: 'deadline',
    title: 'Prazo',
    meaning: 'Inscrições antecipadas costumam ser mais baratas.',
  },
]
