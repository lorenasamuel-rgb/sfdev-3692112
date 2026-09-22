import { useMemo, useState } from 'react'
import {
  archiveAwards,
  archiveFestivalsRaw,
  archiveHonours,
  decorateHonour,
} from '../data/archive.js'
import { labelHonour } from '../lib/labels.js'
import { confirmReplaceFilm } from '../lib/replaceFilm.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

const RESULT_ORDER = [
  'Official Selection',
  'Longlisted',
  'Shortlisted',
  'Nominated',
  'Special Mention',
  'Winner',
]

const PAGE_SIZE = 40

export function AwardsPage() {
  const { film, loadArchiveFilm } = useAppState()
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('all')
  const [bodyType, setBodyType] = useState('all')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return archiveHonours
      .map(decorateHonour)
      .filter((item) => {
        if (result !== 'all' && item.result !== result) return false
        if (bodyType !== 'all' && item.bodyType !== bodyType) return false
        if (!needle) return true
        const hay = `${item.film?.title ?? ''} ${item.bodyName} ${item.section} ${item.result}`.toLowerCase()
        return hay.includes(needle)
      })
      .sort((a, b) => b.year - a.year || a.bodyName.localeCompare(b.bodyName))
  }, [query, result, bodyType])

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>{t('awards.title')}</h1>
          <p>
            {t('awards.lede', {
              honours: archiveHonours.length,
              festivals: archiveFestivalsRaw.length,
              awards: archiveAwards.length,
            })}
          </p>
        </div>
      </header>

      <div className="filters">
        <label className="filter-field">
          {t('awards.search')}
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setVisible(PAGE_SIZE)
            }}
          />
        </label>
        <label className="filter-field">
          {t('awards.allResults')}
          <select
            value={result}
            onChange={(event) => {
              setResult(event.target.value)
              setVisible(PAGE_SIZE)
            }}
          >
            <option value="all">{t('awards.allResults')}</option>
            {RESULT_ORDER.map((item) => (
              <option key={item} value={item}>
                {labelHonour(item, t)}
              </option>
            ))}
          </select>
        </label>
        <label className="filter-field">
          {t('awards.allBodies')}
          <select
            value={bodyType}
            onChange={(event) => {
              setBodyType(event.target.value)
              setVisible(PAGE_SIZE)
            }}
          >
            <option value="all">{t('awards.allBodies')}</option>
            <option value="Festival">{t('awards.festivalsOnly')}</option>
            <option value="Award">{t('awards.awardsOnly')}</option>
          </select>
        </label>
      </div>

      <div className="honour-table">
        <div className="honour-head">
          <span>{t('awards.year')}</span>
          <span>{t('awards.film')}</span>
          <span>{t('awards.body')}</span>
          <span>{t('awards.section')}</span>
          <span>{t('awards.result')}</span>
        </div>
        {rows.slice(0, visible).map((item) => (
          <article key={`${item.filmId}-${item.bodyId}-${item.year}-${item.section}-${item.result}`} className="honour-row">
            <span>{item.year}</span>
            <button
              type="button"
              className="btn-text"
              onClick={() => {
                if (!confirmReplaceFilm(film, t)) return
                loadArchiveFilm(item.filmId)
                window.location.hash = '#/filme'
              }}
            >
              {item.film?.title ?? item.filmId}
            </button>
            <span>
              {item.bodyName}
              <em>{item.bodyType === 'Festival' ? t('nav.festivais') : t('nav.premios')}</em>
            </span>
            <span>{item.section}</span>
            <span className={`badge honour-${item.result.replace(/\s+/g, '-').toLowerCase()}`}>
              {labelHonour(item.result, t)}
            </span>
          </article>
        ))}
      </div>
      {visible < rows.length ? (
        <div className="btn-row">
          <button type="button" className="btn-ghost" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
            {t('awards.more', { count: rows.length - visible })}
          </button>
        </div>
      ) : null}
      {rows.length === 0 ? (
        <div className="empty-film">
          <p>{t('awards.empty')}</p>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setQuery('')
              setResult('all')
              setBodyType('all')
            }}
          >
            {t('awards.reset')}
          </button>
        </div>
      ) : null}
    </div>
  )
}
