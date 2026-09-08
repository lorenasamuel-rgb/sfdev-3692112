import { useMemo, useState } from 'react'
import { archiveFilms } from '../data/archive.js'
import { labelCountry, labelForm } from '../lib/labels.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

const PAGE_SIZE = 24

export function ArchivePage() {
  const { film, loadArchiveFilm } = useAppState()
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [form, setForm] = useState('all')
  const [country, setCountry] = useState('all')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const forms = useMemo(
    () => ['all', ...new Set(archiveFilms.map((item) => item.form).filter(Boolean))],
    [],
  )
  const countries = useMemo(
    () => ['all', ...new Set(archiveFilms.map((item) => item.country).filter(Boolean))].sort(),
    [],
  )

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return archiveFilms.filter((item) => {
      if (form !== 'all' && item.form !== form) return false
      if (country !== 'all' && item.country !== country) return false
      if (!needle) return true
      const directors = item.directors.map((person) => person.name).join(' ')
      const hay = `${item.title} ${item.synopsis} ${item.form} ${item.country} ${(item.themes ?? []).join(' ')} ${directors}`.toLowerCase()
      return hay.includes(needle)
    })
  }, [query, form, country])

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{t('archive.eyebrow')}</p>
          <h1>{t('archive.title')}</h1>
          <p>{t('archive.lede', { count: archiveFilms.length })}</p>
        </div>
      </header>

      <div className="filters">
        <input
          type="search"
          placeholder={t('archive.search')}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setVisible(PAGE_SIZE)
          }}
        />
        <select
          value={form}
          onChange={(event) => {
            setForm(event.target.value)
            setVisible(PAGE_SIZE)
          }}
        >
          {forms.map((item) => (
            <option key={item} value={item}>
              {item === 'all' ? t('archive.allForms') : labelForm(item, t)}
            </option>
          ))}
        </select>
        <select
          value={country}
          onChange={(event) => {
            setCountry(event.target.value)
            setVisible(PAGE_SIZE)
          }}
        >
          {countries.map((item) => (
            <option key={item} value={item}>
              {item === 'all' ? t('archive.allCountries') : labelCountry(item, t)}
            </option>
          ))}
        </select>
      </div>

      <div className="card-grid film-grid">
        {rows.slice(0, visible).map((item) => {
          const active = film.archiveFilmId === item.id
          return (
            <article key={item.id} className="festival-card film-card">
              {item.posterSrc ? (
                <img src={item.posterSrc} alt={item.posterAlt || item.title} className="film-poster" />
              ) : (
                <div className="film-poster is-empty">{t('archive.noPoster')}</div>
              )}
              <header>
                <p className="eyebrow">
                  {item.year} · {labelForm(item.form, t)} · {labelCountry(item.country, t)}
                </p>
                <h3>{item.title}</h3>
              </header>
              <p>{item.synopsis}</p>
              <p className="muted">
                {item.directors.map((person) => person.name).join(', ')}
                {item.minutes
                  ? ` · ${t('archive.runtime', { minutes: item.minutes })}`
                  : ` · ${t('archive.runtimeUnknown')}`}
                {item.honours.length
                  ? ` · ${t('archive.honours', { count: item.honours.length })}`
                  : ''}
              </p>
              <button
                type="button"
                className={active ? 'btn' : 'btn-ghost'}
                onClick={() => {
                  loadArchiveFilm(item.id)
                  window.location.hash = '#/filme'
                }}
              >
                {active ? t('archive.using') : t('archive.useFilm')}
              </button>
            </article>
          )
        })}
      </div>
      {visible < rows.length ? (
        <div className="btn-row">
          <button type="button" className="btn-ghost" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
            {t('archive.more', { count: rows.length - visible })}
          </button>
        </div>
      ) : null}
      {rows.length === 0 ? <p className="muted">{t('archive.empty')}</p> : null}
    </div>
  )
}
