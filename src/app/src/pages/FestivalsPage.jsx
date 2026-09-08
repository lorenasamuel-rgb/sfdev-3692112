import { useMemo, useState } from 'react'
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

  const countries = useMemo(
    () => [...new Set(festivals.map((festival) => festival.country))].sort(),
    [],
  )
  const focusTags = useMemo(
    () => [...new Set(festivals.flatMap((festival) => festival.focusTags))].sort(),
    [],
  )

  const rows = useMemo(() => {
    return festivals
      .map((festival) => ({
        festival,
        result: evaluateFestival(film, festival, new Date(), locale),
      }))
      .filter(({ festival, result }) => {
        const hay = `${festival.name} ${festival.city} ${festival.country} ${festival.focus}`.toLowerCase()
        if (query && !hay.includes(query.toLowerCase())) return false
        if (region !== 'all' && festival.region !== region) return false
        if (country !== 'all' && festival.country !== country) return false
        if (focus !== 'all' && !festival.focusTags.includes(focus)) return false
        if (filter === 'eligible' && result.status !== 'eligible') return false
        if (filter === 'labs' && !festival.hasLabs) return false
        return true
      })
      .sort((a, b) => b.result.score - a.result.score)
  }, [film, query, region, country, focus, filter, locale])

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
        <input
          type="search"
          placeholder={t('festivals.search')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
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
