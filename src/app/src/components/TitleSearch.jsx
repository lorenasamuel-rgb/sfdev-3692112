import { useEffect, useMemo, useRef, useState } from 'react'
import { searchArchiveFilms } from '../data/archive.js'
import { labelCountry, labelForm } from '../lib/labels.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

export function TitleSearch() {
  const { film, updateFilm, loadArchiveFilm } = useAppState()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const wrapRef = useRef(null)
  const query = film.originalTitle ?? ''

  const matches = useMemo(() => searchArchiveFilms(query), [query])

  useEffect(() => {
    function onPointer(event) {
      if (!wrapRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [])

  function select(item) {
    loadArchiveFilm(item.id)
    setOpen(false)
  }

  return (
    <label className="full title-search" ref={wrapRef}>
      {t('film.originalTitle')}
      <input
        type="search"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls="archive-title-results"
        required
        autoComplete="off"
        placeholder={t('film.titleSearchPlaceholder')}
        value={query}
        onChange={(event) => {
          updateFilm({
            originalTitle: event.target.value,
            archiveFilmId: '',
            archiveYear: '',
          })
          setActive(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
            setActive((index) => Math.min(index + 1, Math.max(matches.length - 1, 0)))
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActive((index) => Math.max(index - 1, 0))
          }
          if (event.key === 'Enter' && open && matches[active]) {
            event.preventDefault()
            select(matches[active])
          }
          if (event.key === 'Escape') setOpen(false)
        }}
      />
      {open ? (
        <ul id="archive-title-results" className="title-search-list" role="listbox">
          {matches.length === 0 ? (
            <li className="is-empty">{t('film.titleSearchEmpty')}</li>
          ) : (
            matches.map((item, index) => {
              const directors = item.directors.map((person) => person.name).join(', ')
              return (
                <li key={item.id} role="option" aria-selected={index === active}>
                  <button
                    type="button"
                    className={index === active ? 'is-active' : ''}
                    onMouseEnter={() => setActive(index)}
                    onMouseDown={(event) => {
                      event.preventDefault()
                      select(item)
                    }}
                  >
                    {item.posterSrc ? (
                      <img src={item.posterSrc} alt="" />
                    ) : (
                      <span className="title-search-fallback" aria-hidden="true" />
                    )}
                    <span>
                      <strong>{item.title}</strong>
                      <em>
                        {item.year} · {labelForm(item.form, t)} · {labelCountry(item.country, t)}
                        {directors ? ` · ${directors}` : ''}
                      </em>
                    </span>
                  </button>
                </li>
              )
            })
          )}
        </ul>
      ) : null}
    </label>
  )
}
