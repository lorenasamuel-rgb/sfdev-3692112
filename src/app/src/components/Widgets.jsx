import { evaluateFestival, readinessScore, statusLabel } from '../lib/eligibility.js'
import { packageItems, rightsItems } from '../data/checklists.js'
import { labelCountry, labelFocus } from '../lib/labels.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

export function EligibilityBadge({ result }) {
  const { locale } = useLanguage()
  return (
    <span className={`badge badge-${result.status}`}>{statusLabel(result.status, locale)}</span>
  )
}

export function ReadinessMeter() {
  const { film, package: packageState, rights } = useAppState()
  const { t } = useLanguage()
  const score = readinessScore(film, packageState, rights, packageItems, rightsItems)
  return (
    <div className="meter" aria-label={t('widgets.readinessAria', { score })}>
      <div className="meter-head">
        <span>{t('widgets.readiness')}</span>
        <strong>{score}/100</strong>
      </div>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export function Checklist({ items, stateMap, onToggle, extra }) {
  const groups = [...new Set(items.map((item) => item.group))]
  return (
    <div className="checklist">
      {groups.map((group) => (
        <section key={group} className="checklist-group">
          <h3>{group}</h3>
          <ul>
            {items
              .filter((item) => item.group === group)
              .map((item) => (
                <li key={item.id}>
                  <label className={stateMap[item.id] ? 'is-done' : ''}>
                    <input
                      type="checkbox"
                      checked={Boolean(stateMap[item.id])}
                      onChange={() => onToggle(item.id)}
                    />
                    <span>
                      <strong>{item.label}</strong>
                      {item.hint ? <em>{item.hint}</em> : null}
                    </span>
                  </label>
                </li>
              ))}
          </ul>
        </section>
      ))}
      {extra}
    </div>
  )
}

export function FestivalCard({ festival, film, onOpen }) {
  const { locale, t } = useLanguage()
  const result = evaluateFestival(film, festival, new Date(), locale)
  return (
    <article className="festival-card">
      <header>
        <p className="eyebrow">
          {festival.city} · {labelCountry(festival.country, t)}
        </p>
        <h3>
          <a href={`#/festivais/${festival.id}`}>{festival.name}</a>
        </h3>
        <EligibilityBadge result={result} />
      </header>
      <p>{festival.focusTags.map((tag) => labelFocus(tag, t)).join(' · ')}</p>
      <ul className="chip-row">
        {festival.openToIndependents ? <li>{t('festivals.independents')}</li> : null}
        {festival.openToFirstTimers ? <li>{t('festivals.firstTimers')}</li> : null}
        {festival.duration?.shortMax ? (
          <li>{t('festivals.shortMax', { max: festival.duration.shortMax })}</li>
        ) : null}
        {festival.hasLabs ? <li>{festival.labsName}</li> : null}
      </ul>
      <button type="button" className="btn-ghost" onClick={onOpen}>
        {t('festivals.open')}
      </button>
    </article>
  )
}

export function PremiereCallout() {
  const { t } = useLanguage()
  return (
    <aside className="callout callout-warn">
      <h3>{t('premiere.title')}</h3>
      <p>{t('premiere.body')}</p>
    </aside>
  )
}

export function EmptyFilmHint() {
  const { film, loadSample } = useAppState()
  const { t } = useLanguage()
  if (film.originalTitle) return null
  return (
    <div className="empty-film">
      <p>{t('emptyFilm.body')}</p>
      <div className="btn-row">
        <a className="btn" href="#/filme">
          {t('emptyFilm.register')}
        </a>
        <button type="button" className="btn-ghost" onClick={loadSample}>
          {t('emptyFilm.sample')}
        </button>
      </div>
    </div>
  )
}

