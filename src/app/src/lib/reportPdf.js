import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { readinessBand } from './eligibility.js'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 48
const GREEN = rgb(0, 1, 125 / 255)
const INK = rgb(0.114, 0.114, 0.122)
const MUTED = rgb(0.431, 0.431, 0.451)
const LINE = rgb(0.824, 0.824, 0.843)
const LOW = rgb(1, 0.231, 0.188)
const MID = rgb(0.78, 0.573, 0)
const BAND_COLOR = { low: LOW, mid: MID, high: GREEN }

export function pdfSafe(value) {
  return String(value ?? '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/…/g, '...')
    .replace(/[‹›]/g, '>')
    .replace(/[\u0100-\uFFFF]/g, '')
}

function wrapLine(font, text, size, maxWidth) {
  const safe = pdfSafe(text)
  if (!safe) return ['']
  const words = safe.split(/\s+/)
  const lines = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      line = next
      continue
    }
    if (line) lines.push(line)
    if (font.widthOfTextAtSize(word, size) <= maxWidth) {
      line = word
      continue
    }
    let chunk = ''
    for (const char of word) {
      const trial = chunk + char
      if (font.widthOfTextAtSize(trial, size) <= maxWidth) chunk = trial
      else {
        if (chunk) lines.push(chunk)
        chunk = char
      }
    }
    line = chunk
  }
  if (line) lines.push(line)
  return lines
}

function slug(value) {
  const base = pdfSafe(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return base || 'rota-doc'
}

export function reportFilename(film) {
  const title = film?.originalTitle || film?.englishTitle || 'take-action'
  return `rota-doc-report-${slug(title)}.pdf`
}

export async function createRoutePdfBytes(model) {
  const pdf = await PDFDocument.create()
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const contentWidth = PAGE_WIDTH - MARGIN * 2
  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  let y = PAGE_HEIGHT - MARGIN
  const band = readinessBand(model.score)

  function addPage() {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])
    y = PAGE_HEIGHT - MARGIN
    drawHeader()
  }

  function ensure(height) {
    if (y - height < MARGIN + 28) addPage()
  }

  function drawHeader() {
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 8,
      width: PAGE_WIDTH,
      height: 8,
      color: GREEN,
    })
    page.drawText(pdfSafe(model.brand), {
      x: MARGIN,
      y: PAGE_HEIGHT - 28,
      size: 9,
      font: bold,
      color: INK,
    })
    const dateWidth = regular.widthOfTextAtSize(pdfSafe(model.generated), 9)
    page.drawText(pdfSafe(model.generated), {
      x: PAGE_WIDTH - MARGIN - dateWidth,
      y: PAGE_HEIGHT - 28,
      size: 9,
      font: regular,
      color: MUTED,
    })
    y = PAGE_HEIGHT - 48
  }

  function text(value, { font = regular, size = 10, color = INK, gap = 14 } = {}) {
    const lines = wrapLine(font, value, size, contentWidth)
    for (const line of lines) {
      ensure(gap)
      page.drawText(line, { x: MARGIN, y, size, font, color })
      y -= gap
    }
  }

  function sectionTitle(title) {
    ensure(36)
    y -= 8
    page.drawRectangle({ x: MARGIN, y: y + 2, width: 8, height: 14, color: GREEN })
    page.drawText(pdfSafe(title), {
      x: MARGIN + 16,
      y: y + 4,
      size: 14,
      font: bold,
      color: INK,
    })
    y -= 18
  }

  function field(label, value) {
    const labelSize = 8
    const valueSize = 10
    const labelLines = wrapLine(bold, label, labelSize, contentWidth)
    const valueLines = wrapLine(regular, value, valueSize, contentWidth)
    ensure(labelLines.length * 11 + valueLines.length * 13 + 8)
    for (const line of labelLines) {
      page.drawText(line, { x: MARGIN, y, size: labelSize, font: bold, color: MUTED })
      y -= 11
    }
    for (const line of valueLines) {
      page.drawText(line, { x: MARGIN, y, size: valueSize, font: regular, color: INK })
      y -= 13
    }
    y -= 6
  }

  function checklist(rows, summary) {
    text(summary, { size: 10, color: MUTED, gap: 16 })
    for (const row of rows) {
      const mark = row.done ? '[x]' : '[ ]'
      const line = `${mark}  ${row.label}`
      const lines = wrapLine(regular, line, 10, contentWidth)
      ensure(lines.length * 13 + 2)
      for (const item of lines) {
        page.drawText(item, {
          x: MARGIN,
          y,
          size: 10,
          font: regular,
          color: row.done ? INK : MUTED,
        })
        y -= 13
      }
    }
    y -= 4
  }

  drawHeader()
  text(model.title, { font: bold, size: 22, gap: 26 })
  text(model.subtitle, { size: 11, color: MUTED, gap: 16 })
  text(model.filmName, { font: bold, size: 13, gap: 18 })
  page.drawText(pdfSafe(model.scoreLabel), {
    x: MARGIN,
    y,
    size: 12,
    font: bold,
    color: BAND_COLOR[band] ?? GREEN,
  })
  y -= 22
  text(model.disclaimer, { size: 8, color: MUTED, gap: 11 })

  sectionTitle(model.sections.start.title)
  text(model.sections.start.lede, { size: 9, color: MUTED, gap: 13 })
  for (const item of model.sections.start.fields) {
    field(item.label, item.value)
  }

  sectionTitle(model.sections.festivals.title)
  text(model.sections.festivals.lede, { size: 9, color: MUTED, gap: 13 })
  if (!model.sections.festivals.rows.length) {
    text(model.sections.festivals.empty, { size: 10, color: MUTED, gap: 14 })
  } else {
    for (const row of model.sections.festivals.rows) {
      ensure(40)
      page.drawText(pdfSafe(row.name), { x: MARGIN, y, size: 11, font: bold, color: INK })
      y -= 14
      text(row.meta, { size: 9, color: MUTED, gap: 12 })
      if (row.note) text(row.note, { size: 9, gap: 12 })
      y -= 4
    }
  }

  sectionTitle(model.sections.package.title)
  text(model.sections.package.lede, { size: 9, color: MUTED, gap: 13 })
  checklist(model.sections.package.rows, model.sections.package.summary)

  sectionTitle(model.sections.rights.title)
  text(model.sections.rights.lede, { size: 9, color: MUTED, gap: 13 })
  checklist(model.sections.rights.rows, model.sections.rights.summary)

  sectionTitle(model.sections.submissions.title)
  text(model.sections.submissions.lede, { size: 9, color: MUTED, gap: 13 })
  if (!model.sections.submissions.rows.length) {
    text(model.sections.submissions.empty, { size: 10, color: MUTED, gap: 14 })
  } else {
    for (const row of model.sections.submissions.rows) {
      ensure(36)
      page.drawText(pdfSafe(row.name), { x: MARGIN, y, size: 11, font: bold, color: INK })
      y -= 14
      text(row.status, { size: 9, color: MUTED, gap: 12 })
      text(row.steps, { size: 9, gap: 12 })
      if (row.notes) field(model.sections.submissions.notesLabel, row.notes)
      y -= 4
    }
  }

  const pages = pdf.getPages()
  pages.forEach((item, index) => {
    const label = `${index + 1} / ${pages.length}`
    const width = regular.widthOfTextAtSize(label, 8)
    item.drawText(pdfSafe(model.footer), {
      x: MARGIN,
      y: 24,
      size: 8,
      font: regular,
      color: MUTED,
    })
    item.drawText(label, {
      x: PAGE_WIDTH - MARGIN - width,
      y: 24,
      size: 8,
      font: regular,
      color: MUTED,
    })
    item.drawLine({
      start: { x: MARGIN, y: 36 },
      end: { x: PAGE_WIDTH - MARGIN, y: 36 },
      thickness: 0.5,
      color: LINE,
    })
  })

  return pdf.save()
}

export function downloadPdfBytes(bytes, filename) {
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
