import { filmToDossier, getArchiveFilmById, SAMPLE_FILM_ID } from '../data/archive.js'
import { emptyFilm, emptyState } from './emptyState.js'

const STORAGE_KEY = 'rota-doc-state-v2'

export { emptyFilm, emptyState }

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem('rota-doc-state-v1')
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
  const film = getArchiveFilmById(SAMPLE_FILM_ID)
  if (!film) return { ...emptyFilm }
  return { ...emptyFilm, ...filmToDossier(film) }
}
