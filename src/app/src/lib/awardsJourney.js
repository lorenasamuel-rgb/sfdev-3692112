import archiveFilms from '../data/archiveFilms.json'
import awards from '../data/awards.json'
import festivals from '../data/festivals.json'
import honours from '../data/honours.json'
import people from '../data/people.json'
import { peopleById } from './format.js'

export const JOURNEY_STAGES = [
  'Official Selection',
  'Longlisted',
  'Shortlisted',
  'Nominated',
  'Special Mention',
  'Winner',
]

const COMPLETE_JOURNEY = new Set(['Official Selection', 'Nominated', 'Winner'])

function bodyName(honour, awardMap, festivalMap) {
  if (honour.bodyType === 'Award') {
    return awardMap[honour.bodyId]?.name ?? honour.bodyId
  }

  return festivalMap[honour.bodyId]?.name ?? honour.bodyId
}

export function buildAwardJourneys() {
  const awardMap = Object.fromEntries(awards.map((award) => [award.id, award]))
  const festivalMap = Object.fromEntries(festivals.map((festival) => [festival.id, festival]))
  const filmMap = Object.fromEntries(archiveFilms.map((film) => [film.id, film]))
  const peopleMap = peopleById(people)

  const byFilm = new Map()

  for (const honour of honours) {
    if (!byFilm.has(honour.filmId)) {
      byFilm.set(honour.filmId, [])
    }
    byFilm.get(honour.filmId).push(honour)
  }

  const journeys = []

  for (const [filmId, events] of byFilm) {
    const film = filmMap[filmId]
    if (!film) continue

    const results = new Set(events.map((event) => event.result))
    const complete = [...COMPLETE_JOURNEY].every((stage) => results.has(stage))
    const sorted = [...events].sort((a, b) => {
      const stageGap = JOURNEY_STAGES.indexOf(a.result) - JOURNEY_STAGES.indexOf(b.result)
      if (stageGap !== 0) return stageGap
      return a.year - b.year
    })

    journeys.push({
      film,
      directors: film.directorIds
        .map((id) => peopleMap[id]?.name)
        .filter(Boolean)
        .join(', '),
      complete,
      results,
      events: sorted.map((event) => ({
        ...event,
        bodyName: bodyName(event, awardMap, festivalMap),
      })),
    })
  }

  return journeys.sort((a, b) => Number(b.complete) - Number(a.complete) || a.film.title.localeCompare(b.film.title))
}
