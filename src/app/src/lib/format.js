export function formatRuntime(runtimeSeconds) {
  if (runtimeSeconds == null || Number.isNaN(runtimeSeconds)) {
    return 'Duração não informada'
  }

  const minutes = Math.max(1, Math.round(runtimeSeconds / 60))
  return `${minutes} min`
}

export function posterSrc(poster) {
  if (!poster) return null
  return `/${poster}`
}

export function peopleById(people) {
  return Object.fromEntries(people.map((person) => [person.id, person]))
}

export function directorNames(directorIds = [], peopleMap) {
  return directorIds
    .map((id) => peopleMap[id]?.name)
    .filter(Boolean)
    .join(', ')
}
