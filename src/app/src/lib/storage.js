const STORAGE_KEY = 'rota-doc-state-v1'

export const emptyFilm = {
  originalTitle: '',
  englishTitle: '',
  logline: '',
  shortSynopsis: '',
  fullSynopsis: '',
  durationMinutes: '',
  completionDate: '',
  productionCountry: '',
  languages: '',
  stage: 'finished',
  premiereStatus: 'none',
  publishedPublicly: false,
  hasEnglishSubtitles: false,
  hasSrt: false,
  screenerUrl: '',
  screenerPassword: '',
  directorName: '',
  directorBio: '',
  directorStatement: '',
  producerName: '',
  producerEmail: '',
  producerPhone: '',
}

export const emptyState = {
  film: { ...emptyFilm },
  package: {},
  rights: {},
  submissions: [],
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(emptyState)
    const parsed = JSON.parse(raw)
    return {
      film: { ...emptyFilm, ...parsed.film },
      package: parsed.package ?? {},
      rights: parsed.rights ?? {},
      submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [],
    }
  } catch {
    return structuredClone(emptyState)
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function sampleFilm() {
  return {
    ...emptyFilm,
    originalTitle: 'A Casa do Rio',
    englishTitle: 'The River House',
    logline:
      'Uma família ribeirinha luta para permanecer em sua casa enquanto o rio muda de curso e o mapa oficial diz que ela já não existe.',
    shortSynopsis:
      'Durante uma cheia histórica, uma diretora estreante acompanha três gerações que recusam deixar a beira do rio.',
    durationMinutes: '78',
    completionDate: '2025-11-02',
    productionCountry: 'Brasil',
    languages: 'português',
    stage: 'finished',
    premiereStatus: 'none',
    publishedPublicly: false,
    hasEnglishSubtitles: true,
    hasSrt: true,
    screenerUrl: 'https://vimeo.com/000000000',
    screenerPassword: 'casa2026',
    directorName: 'Helena Costa',
    directorBio: 'Diretora estreante, formada em jornalismo, trabalha com arquivo familiar.',
    directorStatement: 'Filmei a casa da minha mãe antes que o rio a levasse para o papel.',
    producerName: 'Paulo Mendes',
    producerEmail: 'paulo@exemplo.com',
    producerPhone: '+55 11 90000-0000',
  }
}
