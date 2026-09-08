import { useEffect, useMemo, useRef, useState } from 'react'
import { festivals } from '../data/festivals.js'
import { evaluateFestival } from '../lib/eligibility.js'
import { EmptyFilmHint, FestivalCard } from '../components/Widgets.jsx'
import { labelCountry, labelFocus } from '../lib/labels.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

export function FestivalsPage() {
  const { film } = useAppState()
  const { locale, t } = useLanguage()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('all')
  const [country, setCountry] = useState('all')
  const [focus, setFocus] = useState('all')
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const searchRef = useRef(null)

  const countries = useMemo(
    () => [...new Set(festivals.map((festival) => festival.country))].sort(),
    [],
  )
  const focusTags = useMemo(
    () => [...new Set(festivals.flatMap((festival) => festival.focusTags))].sort(),
    [],
  )

  const byOptions = useMemo(() => {
    return festivals.filter((festival) => {
      if (region !== 'all' && festival.region !== region) return false
      if (country !== 'all' && festival.country !== country) return false
      if (focus !== 'all' && !festival.focusTags.includes(focus)) return false
      return true
    })
  }, [region, country, focus])

  const nameOptions = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const pool = needle
      ? byOptions.filter((festival) => festival.name.toLowerCase().includes(needle))
      : byOptions
    return pool.slice(0, 8)
  }, [byOptions, query])

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return byOptions
      .map((festival) => ({
        festival,
        result: evaluateFestival(film, festival, new Date(), locale),
      }))
      .filter(({ festival, result }) => {
        if (needle && !festival.name.toLowerCase().includes(needle)) return false
        if (filter === 'eligible' && result.status !== 'eligible') return false
        if (filter === 'labs' && !festival.hasLabs) return false
        return true
      })
      .sort((a, b) => b.result.score - a.result.score)
  }, [film, byOptions, query, filter, locale])

  useEffect(() => {
    function onPointer(event) {
      if (!searchRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [])

  function pickName(name) {
    setQuery(name)
    setOpen(false)
  }

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{t('festivals.eyebrow')}</p>
          <h1>{t('festivals.title')}</h1>
          <p>{t('festivals.lede', { count: festivals.length })}</p>
        </div>
      </header>

      <EmptyFilmHint />

      <div className="filters filters-wide">
        <div className="festival-search" ref={searchRef}>
          <input
            type="search"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-controls="festival-name-results"
            autoComplete="off"
            placeholder={t('festivals.search')}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setOpen(true)
                setActive((index) => Math.min(index + 1, Math.max(nameOptions.length - 1, 0)))
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActive((index) => Math.max(index - 1, 0))
              }
              if (event.key === 'Enter' && open && nameOptions[active]) {
                event.preventDefault()
                pickName(nameOptions[active].name)
              }
              if (event.key === 'Escape') setOpen(false)
            }}
          />
          {open ? (
            <ul id="festival-name-results" className="title-search-list" role="listbox">
              {nameOptions.length === 0 ? (
                <li className="is-empty">{t('festivals.searchEmpty')}</li>
              ) : (
                nameOptions.map((festival, index) => (
                  <li key={festival.id} role="option" aria-selected={index === active}>
                    <button
                      type="button"
                      className={index === active ? 'is-active' : ''}
                      onMouseEnter={() => setActive(index)}
                      onMouseDown={(event) => {
                        event.preventDefault()
                        pickName(festival.name)
                      }}
                    >
                      <span>
                        <strong>{festival.name}</strong>
                        <em>
                          {festival.city} · {labelCountry(festival.country, t)}
                        </em>
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          ) : null}
        </div>
        <select value={region} onChange={(event) => setRegion(event.target.value)}>
          <option value="all">{t('festivals.allRegions')}</option>
          <option value="europe">{t('region.europe')}</option>
          <option value="northAmerica">{t('region.northAmerica')}</option>
          <option value="africa">{t('region.africa')}</option>
        </select>
        <select value={country} onChange={(event) => setCountry(event.target.value)}>
          <option value="all">{t('festivals.allCountries')}</option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {labelCountry(item, t)}
            </option>
          ))}
        </select>
        <select value={focus} onChange={(event) => setFocus(event.target.value)}>
          <option value="all">{t('festivals.allFocus')}</option>
          {focusTags.map((item) => (
            <option key={item} value={item}>
              {labelFocus(item, t)}
            </option>
          ))}
        </select>
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="all">{t('festivals.allStatus')}</option>
          <option value="eligible">{t('festivals.onlyEligible')}</option>
          <option value="labs">{t('festivals.withLabs')}</option>
        </select>
      </div>

      <div className="card-grid">
        {rows.map(({ festival }) => (
          <FestivalCard
            key={festival.id}
            festival={festival}
            film={film}
            onOpen={() => {
              window.location.hash = `#/festivais/${festival.id}`
            }}
          />
        ))}
      </div>
      {rows.length === 0 ? <p className="muted">{t('festivals.empty')}</p> : null}
    </div>
  )
}
