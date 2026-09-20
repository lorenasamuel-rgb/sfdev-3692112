import test from 'node:test'
import assert from 'node:assert/strict'
import { translate } from '../i18n/translate.js'
import { buildPackageRows, buildStartFields, displayValue } from './reportModel.js'
import { createRoutePdfBytes, pdfSafe, reportFilename } from './reportPdf.js'

const t = (key, vars) => translate('en', key, vars)

test('mostra travessao quando o campo da ficha esta vazio', () => {
  assert.equal(displayValue(''), '—')
  assert.equal(displayValue('The Quiet Cartographer'), 'The Quiet Cartographer')
})

test('monta os campos Start com o titulo do filme', () => {
  const fields = buildStartFields(
    {
      originalTitle: 'The Quiet Cartographer',
      englishTitle: 'The Quiet Cartographer',
      logline: 'A mapmaker records disappearing paths.',
      form: 'Documentary',
      stage: 'finished',
      premiereStatus: 'none',
      publishedPublicly: false,
      hasEnglishSubtitles: true,
      hasSrt: true,
    },
    t,
  )
  assert.equal(fields[0].value, 'The Quiet Cartographer')
  assert.equal(fields.find((item) => item.label === t('film.form')).value, 'Documentary')
})

test('o pacote marca itens feitos e pendentes', () => {
  const rows = buildPackageRows({ titles: true, logline: false }, t)
  assert.equal(rows.find((item) => item.id === 'titles').done, true)
  assert.equal(rows.find((item) => item.id === 'logline').done, false)
  assert.ok(rows.length >= 10)
})

test('o PDF comeca com o cabecalho e o nome do ficheiro usa o titulo', async () => {
  const model = {
    brand: 'Rota Doc',
    title: 'Route report',
    subtitle: 'Start, Festivals, Package, Rights and Submissions',
    filmName: 'The Quiet Cartographer',
    generated: 'Generated on 20 September 2026',
    score: 100,
    scoreLabel: 'Readiness 100/100',
    disclaimer: 'Teaching document.',
    footer: 'Rota Doc',
    sections: {
      start: {
        title: 'Start',
        lede: 'Film file',
        fields: [{ label: 'Original title', value: 'The Quiet Cartographer' }],
      },
      festivals: {
        title: 'Festivals',
        lede: 'Pick matching festivals',
        empty: 'None',
        rows: [
          {
            name: 'Sheffield DocFest',
            meta: 'Sheffield, United Kingdom · Eligible · 88/100',
            note: 'Screener is ready.',
          },
        ],
      },
      package: {
        title: 'Package',
        lede: 'Prepare once.',
        summary: '15 of 15 items ready',
        rows: [{ id: 'titles', label: 'Original title and English title', done: true }],
      },
      rights: {
        title: 'Rights',
        lede: 'Clear the rights.',
        summary: '8 of 9 items ready',
        rows: [{ id: 'music-composition', label: 'Music composition', done: true }],
      },
      submissions: {
        title: 'Submissions',
        lede: 'Track the route.',
        empty: 'None',
        notesLabel: 'Notes',
        rows: [
          {
            name: 'Sheffield DocFest',
            status: 'Considering',
            steps: '[x] 1. Choose festivals  [ ] 2. Check the rules',
            notes: 'Early bird deadline in March.',
          },
        ],
      },
    },
  }
  const bytes = await createRoutePdfBytes(model)
  assert.equal(pdfSafe('O Chamado — Take Action'), 'O Chamado - Take Action')
  assert.equal(reportFilename({ originalTitle: 'The Quiet Cartographer' }), 'rota-doc-report-the-quiet-cartographer.pdf')
  assert.equal(String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]), '%PDF')
  assert.ok(bytes.length > 1500)
})
