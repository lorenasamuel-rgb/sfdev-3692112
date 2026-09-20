import { writeFileSync } from 'node:fs'
import { translate } from '../src/i18n/translate.js'
import { packageItemIds, rightsItemIds } from '../src/data/checklists.js'
import {
  buildPackageRows,
  buildRightsRows,
  buildStartFields,
  checklistSummary,
} from '../src/lib/reportModel.js'
import { createRoutePdfBytes } from '../src/lib/reportPdf.js'

const locale = process.argv[3] === 'pt' ? 'pt' : 'en'
const generatedDate = locale === 'pt' ? '20 de setembro de 2026' : '20 September 2026'
const t = (key, vars) => translate(locale, key, vars)

function stepLine(done) {
  return [1, 2, 3, 4, 5, 6, 7]
    .map((number, index) => {
      const id = ['choose', 'rules', 'form', 'screener', 'fee', 'wait', 'delivery'][index]
      const mark = number <= done ? '[x]' : '[ ]'
      return `${mark} ${number}. ${t(`steps.${id}.title`)}`
    })
    .join('  ')
}

const film = {
  originalTitle: 'The Quiet Cartographer',
  englishTitle: 'The Quiet Cartographer',
  logline: 'A mapmaker records disappearing paths along a changing coastline.',
  shortSynopsis: 'A mapmaker records disappearing paths along a changing coastline.',
  fullSynopsis: 'A mapmaker records disappearing paths along a changing coastline.',
  durationMinutes: '11',
  completionDate: '2023-01-01',
  productionCountry: 'Ireland',
  languages: 'English',
  form: 'Documentary',
  stage: 'finished',
  premiereStatus: 'international',
  publishedPublicly: false,
  hasEnglishSubtitles: true,
  hasSrt: true,
  screenerUrl: 'https://vimeo.com/000000000',
  screenerPassword: 'archive',
  directorName: 'Archive Director',
  directorBio: 'A filmmaker working with maps, memory and the Atlantic edge.',
  directorStatement: 'The coastline is a document. This film treats every path as a record that can vanish.',
  producerName: 'Rota Doc teaching desk',
  producerEmail: 'archive@example.com',
  producerPhone: '',
  archiveFilmId: 'film-001',
  archiveYear: 2023,
}

const packageState = Object.fromEntries(packageItemIds.map((id) => [id, true]))
const rightsState = Object.fromEntries(rightsItemIds.filter((id) => id !== 'eo').map((id) => [id, true]))
const packageRows = buildPackageRows(packageState, t)
const rightsRows = buildRightsRows(rightsState, t)

const model = {
  brand: t('brand'),
  title: t('report.title'),
  subtitle: t('report.subtitle'),
  filmName: film.originalTitle,
  generated: t('report.generated', { date: generatedDate }),
  score: 100,
  scoreLabel: t('report.score', { score: 100 }),
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
      lede: t('festivals.lede', { count: 12 }),
      empty: t('report.noFestivals'),
      rows: [
        {
          name: 'Sheffield DocFest',
          meta: t('report.festivalMeta', {
            city: 'Sheffield',
            country: 'United Kingdom',
            status: t('status.eligible'),
            score: 88,
          }),
          note: 'Running time and premiere fit the teaching call.',
        },
        {
          name: 'IDFA',
          meta: t('report.festivalMeta', {
            city: 'Amsterdam',
            country: 'Netherlands',
            status: t('status.review'),
            score: 72,
          }),
          note: 'Confirm completion date against the (fictional) call.',
        },
        {
          name: 'Doclisboa',
          meta: t('report.festivalMeta', {
            city: 'Lisbon',
            country: 'Portugal',
            status: t('status.eligible'),
            score: 90,
          }),
          note: 'Portuguese-language house in the archive. English subtitles still help.',
        },
      ],
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
      rows: [
        {
          name: 'Sheffield DocFest',
          status: t('submissions.considering'),
          steps: stepLine(2),
          notes: 'Early-bird window. Do not pay before the premiere check.',
        },
        {
          name: 'Doclisboa',
          status: t('submissions.submitted'),
          steps: stepLine(5),
          notes: 'Screener password: archive. Category: New Voices.',
        },
      ],
    },
  },
}

const bytes = await createRoutePdfBytes(model)
const out = process.argv[1] ? process.argv[2] : null
const target = process.argv[2] || '/tmp/rota-doc-report-the-quiet-cartographer.pdf'
writeFileSync(target, bytes)
console.log(`wrote ${target} (${bytes.length} bytes)`)
