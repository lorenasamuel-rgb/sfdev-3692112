import { festivals, getFestivalById, stepDefinitions } from '../data/festivals.js'
import { evaluateFestival, readinessScore } from './eligibility.js'
import { packageItems, rightsItems } from '../data/checklists.js'
import { labelCountry } from './labels.js'
import {
  buildPackageRows,
  buildRightsRows,
  buildStartFields,
  checklistSummary,
} from './reportModel.js'
import { createRoutePdfBytes, downloadPdfBytes, reportFilename } from './reportPdf.js'

function formatDate(locale) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'pt-BR', {
    dateStyle: 'long',
  }).format(new Date())
}

export function buildFestivalRows(film, submissions, t, locale) {
  const trackedIds = new Set(submissions.map((item) => item.festivalId))
  const ranked = festivals
    .map((festival) => {
      const result = evaluateFestival(film, festival, new Date(), locale)
      return { festival, result }
    })
    .sort((a, b) => b.result.score - a.result.score)

  const picked = []
  const seen = new Set()
  for (const row of ranked) {
    if (trackedIds.has(row.festival.id) || row.result.status !== 'ineligible') {
      picked.push(row)
      seen.add(row.festival.id)
    }
    if (picked.length >= 8) break
  }
  for (const item of submissions) {
    if (seen.has(item.festivalId)) continue
    const festival = getFestivalById(item.festivalId)
    if (!festival) continue
    picked.push({
      festival,
      result: evaluateFestival(film, festival, new Date(), locale),
    })
  }

  return picked.map(({ festival, result }) => ({
    name: festival.name,
    meta: t('report.festivalMeta', {
      city: festival.city,
      country: labelCountry(festival.country, t),
      status: t(`status.${result.status}`),
      score: result.score,
    }),
    note: result.issues[0]?.message || result.warnings[0]?.message || result.matches[0] || '',
  }))
}

export function buildSubmissionRows(submissions, t) {
  return submissions
    .map((item) => {
      const festival = getFestivalById(item.festivalId)
      if (!festival) return null
      const steps = stepDefinitions
        .map((step) => {
          const mark = item.steps?.[step.id] ? '[x]' : '[ ]'
          return `${mark} ${step.number}. ${t(`steps.${step.id}.title`)}`
        })
        .join('  ')
      return {
        name: festival.name,
        status: t(`submissions.${item.status}`),
        steps,
        notes: item.notes || '',
      }
    })
    .filter(Boolean)
}

export function buildRouteReportModel({ film, packageState, rights, submissions, t, locale }) {
  const score = readinessScore(film, packageState, rights, packageItems, rightsItems)
  const packageRows = buildPackageRows(packageState, t)
  const rightsRows = buildRightsRows(rights, t)
  const filmName = film.originalTitle || film.englishTitle || t('report.untitled')

  return {
    brand: t('brand'),
    title: t('report.title'),
    subtitle: t('report.subtitle'),
    filmName,
    generated: t('report.generated', { date: formatDate(locale) }),
    score,
    scoreLabel: t('report.score', { score }),
    disclaimer: t('report.disclaimer'),
    footer: t('report.footer'),
    sections: {
      start: {
        title: t('report.sectionStart'),
        lede: t('film.lede'),
        fields: buildStartFields(film, t),
      },
      festivals: {
        title: t('report.sectionFestivals'),
        lede: t('festivals.lede', { count: festivals.length }),
        empty: t('report.noFestivals'),
        rows: buildFestivalRows(film, submissions, t, locale),
      },
      package: {
        title: t('report.sectionPackage'),
        lede: t('package.lede'),
        summary: checklistSummary(packageRows, t),
        rows: packageRows,
      },
      rights: {
        title: t('report.sectionRights'),
        lede: t('rights.lede'),
        summary: checklistSummary(rightsRows, t),
        rows: rightsRows,
      },
      submissions: {
        title: t('report.sectionSubmissions'),
        lede: t('submissions.lede'),
        empty: t('report.noSubmissions'),
        notesLabel: t('submissions.notes'),
        rows: buildSubmissionRows(submissions, t),
      },
    },
  }
}

export async function downloadRouteReport({ film, packageState, rights, submissions, t, locale }) {
  const model = buildRouteReportModel({ film, packageState, rights, submissions, t, locale })
  const bytes = await createRoutePdfBytes(model)
  downloadPdfBytes(bytes, reportFilename(film))
}
