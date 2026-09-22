import { emptyFilm, emptyState } from './emptyState.js'

export const ROUTE_TABLE = 'route_state'

export function stateToRow(state, userId, now = new Date()) {
  return {
    user_id: userId,
    film: state.film ?? { ...emptyFilm },
    package: state.package ?? {},
    rights: state.rights ?? {},
    submissions: Array.isArray(state.submissions) ? state.submissions : [],
    updated_at: now.toISOString(),
  }
}

export function rowToState(row) {
  if (!row) return null
  return {
    film: { ...emptyFilm, ...(row.film ?? {}) },
    package: row.package ?? {},
    rights: row.rights ?? {},
    submissions: Array.isArray(row.submissions) ? row.submissions : [],
  }
}

export function isEmptyState(state) {
  if (!state) return true
  const film = state.film ?? {}
  const hasFilm = Object.keys(emptyFilm).some((key) => {
    const value = film[key]
    if (typeof value === 'boolean') return value !== emptyFilm[key]
    return Boolean(value) && value !== emptyFilm[key]
  })
  const hasChecks =
    Object.values(state.package ?? {}).some(Boolean) ||
    Object.values(state.rights ?? {}).some(Boolean)
  const hasSubmissions = (state.submissions ?? []).length > 0
  return !hasFilm && !hasChecks && !hasSubmissions
}

// On sign in the browser may hold work that was never uploaded, and the account
// may hold work from another machine. The filled one wins; when both are filled
// the cloud is the shared copy, so it wins.
export function chooseState(localState, remoteState) {
  if (!remoteState || isEmptyState(remoteState)) {
    return { state: localState ?? structuredClone(emptyState), source: 'local' }
  }
  return { state: remoteState, source: 'remote' }
}
