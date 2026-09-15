import test from 'node:test'
import assert from 'node:assert/strict'
import {
  durationCategory,
  evaluateFestival,
  filmHasEnglishAudio,
  premiereCovers,
  readinessScore,
} from './eligibility.js'

const baseFestival = {
  name: 'Fest Teste',
  acceptsFinished: true,
  acceptsWip: false,
  hasLabs: true,
  labsName: 'MeetMarket',
  openToIndependents: true,
  openToFirstTimers: true,
  duration: { shortMax: 40, mediumMax: null },
  completionMaxMonths: 24,
  completionAfter: null,
  englishSubtitlesRequired: true,
  premierePrograms: [
    { name: 'World Comp', required: 'world' },
    { name: 'Panorama', required: 'none' },
  ],
}

const baseFilm = {
  durationMinutes: 78,
  completionDate: '2025-11-02',
  languages: 'português',
  stage: 'finished',
  premiereStatus: 'none',
  publishedPublicly: false,
  hasEnglishSubtitles: true,
  screenerUrl: 'https://vimeo.com/1',
}

test('curta fica abaixo de 40 minutos no padrão Sheffield', () => {
  assert.equal(durationCategory(39, { duration: { shortMax: 40 } }).id, 'short')
  assert.equal(durationCategory(40, { duration: { shortMax: 40 } }).id, 'feature')
})

test('filme inédito cobre estreia mundial', () => {
  assert.equal(premiereCovers('none', 'world'), true)
  assert.equal(premiereCovers('national', 'world'), false)
  assert.equal(premiereCovers('national', 'international'), true)
  assert.equal(premiereCovers('international', 'world'), false)
  assert.equal(premiereCovers('world', 'national'), true)
})

test('áudio em inglês é reconhecido em pt e en', () => {
  assert.equal(filmHasEnglishAudio({ languages: 'inglês, português' }), true)
  assert.equal(filmHasEnglishAudio({ languages: 'português' }), false)
})

test('IDFA bloqueia filme antigo demais pela data mínima', () => {
  const result = evaluateFestival(
    { ...baseFilm, completionDate: '2023-01-01', hasEnglishSubtitles: true },
    { ...baseFestival, completionAfter: '2024-09-01', completionMaxMonths: 18 },
    new Date('2026-09-01'),
  )
  assert.equal(result.status, 'ineligible')
  assert.ok(result.issues.some((issue) => issue.code === 'too-old-date'))
})

test('work in progress não entra na seleção oficial sem acceptsWip', () => {
  const result = evaluateFestival({ ...baseFilm, stage: 'wip' }, baseFestival)
  assert.equal(result.status, 'ineligible')
  assert.ok(result.issues.some((issue) => issue.code === 'wip'))
})

test('YouTube público elimina estreia e marca inelegível', () => {
  const result = evaluateFestival({ ...baseFilm, publishedPublicly: true }, baseFestival)
  assert.equal(result.status, 'ineligible')
  assert.ok(result.issues.some((issue) => issue.code === 'public-release'))
  assert.equal(result.eligiblePrograms.some((program) => program.required === 'world'), false)
  assert.ok(result.eligiblePrograms.some((program) => program.name === 'Panorama'))
})

test('sem legendas em inglês, filme em português fica inelegível', () => {
  const result = evaluateFestival(
    { ...baseFilm, hasEnglishSubtitles: false, languages: 'português' },
    baseFestival,
  )
  assert.equal(result.status, 'ineligible')
  assert.ok(result.issues.some((issue) => issue.code === 'subs'))
})

test('filme inédito, legendado e com screener é elegível', () => {
  const result = evaluateFestival(baseFilm, baseFestival, new Date('2026-03-01'))
  assert.equal(result.status, 'eligible')
  assert.ok(result.eligiblePrograms.some((program) => program.required === 'world'))
})

test('readiness sobe com pacote e direitos marcados', () => {
  const packageItems = [{ id: 'a' }, { id: 'b' }]
  const rightsItems = [{ id: 'c' }]
  const low = readinessScore(baseFilm, {}, {}, packageItems, rightsItems)
  const high = readinessScore(
    { ...baseFilm, originalTitle: 'X', englishTitle: 'Y', logline: 'Z', producerEmail: 'a@b.c' },
    { a: true, b: true },
    { c: true },
    packageItems,
    rightsItems,
  )
  assert.ok(high > low)
})
