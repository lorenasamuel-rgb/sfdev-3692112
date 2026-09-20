import { packageItemIds, rightsItemIds } from '../data/checklists.js'

export function displayValue(value, empty = '—') {
  if (value === true) return 'yes'
  if (value === false) return 'no'
  const text = String(value ?? '').trim()
  return text || empty
}

export function buildStartFields(film, t) {
  const premiereKey = {
    none: 'film.premiereNone',
    national: 'film.premiereNational',
    european: 'film.premiereEuropean',
    international: 'film.premiereInternational',
    world: 'film.premiereWorld',
  }
  const formKey = {
    Documentary: 'film.formDocumentary',
    Drama: 'film.formDrama',
    Animation: 'film.formAnimation',
    Experimental: 'film.formExperimental',
  }
  return [
    { label: t('film.originalTitle'), value: displayValue(film.originalTitle) },
    { label: t('film.englishTitle'), value: displayValue(film.englishTitle) },
    { label: t('film.logline'), value: displayValue(film.logline) },
    { label: t('film.shortSynopsis'), value: displayValue(film.shortSynopsis) },
    { label: t('film.fullSynopsis'), value: displayValue(film.fullSynopsis) },
    { label: t('film.duration'), value: displayValue(film.durationMinutes) },
    { label: t('film.completion'), value: displayValue(film.completionDate) },
    { label: t('film.country'), value: displayValue(film.productionCountry) },
    { label: t('film.languages'), value: displayValue(film.languages) },
    { label: t('film.form'), value: t(formKey[film.form] || 'film.formDocumentary') },
    {
      label: t('film.stage'),
      value: film.stage === 'wip' ? t('film.stageWip') : t('film.stageFinished'),
    },
    { label: t('film.premiereStatus'), value: t(premiereKey[film.premiereStatus] || 'film.premiereNone') },
    { label: t('film.published'), value: film.publishedPublicly ? t('report.yes') : t('report.no') },
    { label: t('film.screenerUrl'), value: displayValue(film.screenerUrl) },
    { label: t('film.hasSubs'), value: film.hasEnglishSubtitles ? t('report.yes') : t('report.no') },
    { label: t('film.hasSrt'), value: film.hasSrt ? t('report.yes') : t('report.no') },
    { label: t('film.director'), value: displayValue(film.directorName) },
    { label: t('film.directorBio'), value: displayValue(film.directorBio) },
    { label: t('film.directorStatement'), value: displayValue(film.directorStatement) },
    { label: t('film.producer'), value: displayValue(film.producerName) },
    { label: t('film.email'), value: displayValue(film.producerEmail) },
    { label: t('film.phone'), value: displayValue(film.producerPhone) },
  ]
}

export function buildChecklistRows(ids, stateMap, keyPrefix, t) {
  return ids.map((id) => ({
    id,
    group: t(`${keyPrefix}.${id}.group`),
    label: t(`${keyPrefix}.${id}.label`),
    done: Boolean(stateMap[id]),
  }))
}

export function buildPackageRows(packageState, t) {
  return buildChecklistRows(packageItemIds, packageState, 'packageItems', t)
}

export function buildRightsRows(rightsState, t) {
  return buildChecklistRows(rightsItemIds, rightsState, 'rightsItems', t)
}

export function checklistSummary(rows, t) {
  const done = rows.filter((row) => row.done).length
  return t('report.checklistDone', { done, total: rows.length })
}
