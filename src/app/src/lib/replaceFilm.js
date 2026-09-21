export function filmIsDirty(film) {
  return Boolean(film?.originalTitle?.trim())
}

export function confirmReplaceFilm(film, t) {
  if (!filmIsDirty(film)) return true
  return window.confirm(t('film.replaceConfirm'))
}
