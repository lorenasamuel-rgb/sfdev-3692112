import filmsRaw from '@archive/stage-3-connected-archive/films.json'
import festivalsRaw from '@archive/stage-3-connected-archive/festivals.json'
import peopleRaw from '@archive/stage-3-connected-archive/people.json'
import honoursRaw from '@archive/stage-3-connected-archive/honours.json'
import awardsRaw from '@archive/stage-3-connected-archive/awards.json'

const EUROPE = new Set([
  'United Kingdom',
  'Ireland',
  'Netherlands',
  'Belgium',
  'Germany',
  'Portugal',
  'Spain',
  'Norway',
  'Poland',
  'Iceland',
])

const PREMIERE_BY_SECTION = {
  'Official Programme': 'none',
  'Audience Selection': 'none',
  'Documentary Competition': 'international',
  'Animation Competition': 'none',
  'Experimental Programme': 'none',
  'New Voices': 'none',
  'Short Film': 'none',
}

export const archiveFilmsRaw = filmsRaw
export const archiveFestivalsRaw = festivalsRaw
export const archivePeople = peopleRaw
export const archiveHonours = honoursRaw
export const archiveAwards = awardsRaw

const peopleById = Object.fromEntries(peopleRaw.map((person) => [person.id, person]))
const awardsById = Object.fromEntries(awardsRaw.map((award) => [award.id, award]))
const festivalsById = Object.fromEntries(festivalsRaw.map((festival) => [festival.id, festival]))
const filmsById = Object.fromEntries(filmsRaw.map((film) => [film.id, film]))

export function posterSrc(poster) {
  if (!poster) return null
  return `/archive-images/${poster.split('/').pop()}`
}

export function minutesFromSeconds(seconds) {
  if (!seconds) return null
  return Math.max(1, Math.round(seconds / 60))
}

export function regionKeyFor(country) {
  if (EUROPE.has(country)) return 'europe'
  if (country === 'Canada') return 'northAmerica'
  if (country === 'Nigeria') return 'africa'
  return 'other'
}

function isShortFestival(festival) {
  const focus = festival.focus ?? []
  return focus.includes('Short film') || /short/i.test(festival.name)
}

function sectionRequired(section) {
  return PREMIERE_BY_SECTION[section] ?? 'none'
}

export function mapFestival(festival, honours = honoursRaw) {
  const focus = festival.focus ?? []
  const format = festival.format ?? []
  const related = honours.filter((item) => item.bodyId === festival.id)
  const sections = [...new Set(related.map((item) => item.section).filter(Boolean))]
  const shortFestival = isShortFestival(festival)
  const newVoices = focus.includes('New voices')
  const premierePrograms = (sections.length ? sections : ['Official Programme']).map((section) => ({
    name: section,
    required: sectionRequired(section),
    note: '',
  }))

  return {
    id: festival.id,
    slug: festival.slug,
    name: festival.name,
    city: festival.city,
    country: festival.country,
    foundedYear: festival.foundedYear,
    usualMonth: festival.usualMonth,
    format,
    focusTags: focus,
    focus: focus.join(' · '),
    description: festival.description,
    website: festival.website,
    edition: String(festival.foundedYear),
    platform: format.includes('Online') && format.includes('In-person')
      ? 'In-person / Online'
      : format.includes('Online')
        ? 'Online'
        : 'In-person',
    acceptsFinished: true,
    acceptsWip: newVoices,
    hasLabs: newVoices,
    labsName: newVoices ? 'New Voices' : null,
    labsNote: newVoices
      ? 'New voices strand in the teaching archive — a stand-in for labs and first-timer routes.'
      : null,
    duration: {
      shortMax: 40,
      mediumMax: shortFestival ? null : 60,
      shortOnly: shortFestival,
      notes: shortFestival
        ? 'Short film festival in the teaching set. Typical ceiling under 40 minutes.'
        : 'Mixed durations in the teaching set. Confirm category against the (fictional) call.',
    },
    completionMaxMonths: 24,
    completionAfter: null,
    countries: 'all',
    englishSubtitlesRequired: !['Portugal', 'Brazil'].includes(festival.country),
    englishSubtitlesWhen: ['Portugal', 'Brazil'].includes(festival.country)
      ? 'Portuguese-language festivals in the archive often accept Portuguese audio; English subs still help.'
      : 'English-language screener or English subtitles when the audio is not English.',
    premierePrograms,
    fees: [{ label: 'Submission', amount: 'varies', deadline: 'edition' }],
    feeNote: 'Teaching dataset: treat fees as variable. Confirm any real call separately.',
    feeWaiver: newVoices,
    openToIndependents: true,
    openToFirstTimers: true,
    themes: focus.map((tag) => tag.toLowerCase()),
    region: regionKeyFor(festival.country),
    honourCount: related.length,
  }
}

export const festivals = festivalsRaw.map((festival) => mapFestival(festival))

export function getFestivalById(id) {
  return festivals.find((festival) => festival.id === id) ?? null
}

export const stepDefinitions = [
  { id: 'choose', number: 1 },
  { id: 'rules', number: 2 },
  { id: 'form', number: 3 },
  { id: 'screener', number: 4 },
  { id: 'fee', number: 5 },
  { id: 'wait', number: 6 },
  { id: 'delivery', number: 7 },
]

export function directorsFor(film) {
  return (film.directorIds ?? []).map((id) => peopleById[id]).filter(Boolean)
}

export function honoursForFilm(filmId) {
  return honoursRaw
    .filter((item) => item.filmId === filmId)
    .map(decorateHonour)
}

export function honoursForFestival(festivalId) {
  return honoursRaw
    .filter((item) => item.bodyId === festivalId)
    .map(decorateHonour)
}

export function decorateHonour(item) {
  const film = filmsById[item.filmId]
  const festival = item.bodyType === 'Festival' ? festivalsById[item.bodyId] : null
  const award = item.bodyType === 'Award' ? awardsById[item.bodyId] : null
  return {
    ...item,
    film,
    bodyName: festival?.name ?? award?.name ?? item.bodyId,
    bodyCity: festival?.city ?? null,
    bodyCountry: festival?.country ?? null,
  }
}

export const archiveFilms = filmsRaw.map((film) => ({
  ...film,
  directors: directorsFor(film),
  honours: honoursForFilm(film.id),
  minutes: minutesFromSeconds(film.runtimeSeconds),
  posterSrc: posterSrc(film.poster),
}))

export function getArchiveFilmById(id) {
  return archiveFilms.find((film) => film.id === id) ?? null
}

export const SAMPLE_FILM_ID = 'film-001'

function premiereFromHonours(honours) {
  if (honours.some((item) => item.bodyType === 'Festival')) return 'international'
  return 'none'
}

export function filmToDossier(film) {
  const directors = film.directors ?? directorsFor(film)
  const honours = film.honours ?? honoursForFilm(film.id)
  const minutes = film.minutes ?? minutesFromSeconds(film.runtimeSeconds)
  const portugueseCountry = film.country === 'Brazil' || film.country === 'Portugal'
  return {
    originalTitle: film.title,
    englishTitle: film.title,
    logline: film.synopsis ?? '',
    shortSynopsis: film.synopsis ?? '',
    fullSynopsis: film.synopsis ?? '',
    durationMinutes: minutes ? String(minutes) : '',
    completionDate: film.published || (film.year ? `${film.year}-01-01` : ''),
    productionCountry: film.country ?? '',
    languages: portugueseCountry ? 'português' : 'English',
    form: film.form || 'Documentary',
    stage: 'finished',
    premiereStatus: premiereFromHonours(honours),
    publishedPublicly: false,
    hasEnglishSubtitles: true,
    hasSrt: true,
    screenerUrl: 'https://vimeo.com/000000000',
    screenerPassword: 'archive',
    directorName: directors[0]?.name ?? '',
    directorBio: directors[0]?.biography ?? '',
    directorStatement: film.synopsis ?? '',
    producerName: '',
    producerEmail: 'archive@example.com',
    producerPhone: '',
    archiveFilmId: film.id,
    archiveYear: film.year,
  }
}

export const labFestivals = festivals.filter((festival) => festival.hasLabs)
