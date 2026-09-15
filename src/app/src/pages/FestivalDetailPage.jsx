import { getFestivalById, stepDefinitions } from '../data/festivals.js'
import { honoursForFestival } from '../data/archive.js'
import { evaluateFestival } from '../lib/eligibility.js'
import { EligibilityBadge } from '../components/Widgets.jsx'
import { labelCountry, labelHonour, labelMonth } from '../lib/labels.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

export function FestivalDetailPage({ id }) {
  const festival = getFestivalById(id)
  const { film, addSubmission, submissions, loadArchiveFilm } = useAppState()
  const { locale, t } = useLanguage()

  if (!festival) {
    return (
      <div className="page">
        <h1>{t('festivalDetail.missing')}</h1>
        <a href="#/festivais">{t('festivalDetail.back')}</a>
      </div>
    )
  }

  const result = evaluateFestival(film, festival, new Date(), locale)
  const already = submissions.some((item) => item.festivalId === festival.id)
  const programme = honoursForFestival(festival.id)

  return (
    <div className="page festival-detail">
      <p className="eyebrow">
        <a href="#/festivais">{t('nav.festivais')}</a> · {festival.platform} ·{' '}
        {t('festivals.founded', { year: festival.foundedYear })}
      </p>
      <header className="page-head">
        <div>
          <h1>{festival.name}</h1>
          <p>
            {festival.city}, {labelCountry(festival.country, t)}. {festival.description}
          </p>
          <p className="muted">
            {t('festivals.month', { month: labelMonth(festival.usualMonth, t) })} ·{' '}
            {festival.focusTags.map((tag) => t(`focus.${tag}`)).join(' · ')}
          </p>
        </div>
        <div className="page-head-aside">
          <EligibilityBadge result={result} />
          {already ? (
            <a className="btn" href="#/inscricoes">
              {t('festivalDetail.added')}
            </a>
          ) : (
            <button type="button" className="btn" onClick={() => addSubmission(festival.id)}>
              {t('festivalDetail.add')}
            </button>
          )}
        </div>
      </header>

      <div className="split">
        <section className="panel">
          <h2>{t('festivalDetail.match')}</h2>
          <p className="muted">{result.category.label}</p>
          {result.matches.length ? (
            <ul className="plain-list yes">
              {result.matches.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {result.warnings.map((item) => (
            <p key={item.code} className="note warn">
              {item.message}
            </p>
          ))}
          {result.issues.map((item) => (
            <p key={item.code} className="note bad">
              {item.message}
            </p>
          ))}
        </section>

        <section className="panel">
          <h2>{t('festivalDetail.premiereNeeds')}</h2>
          <ul className="plain-list">
            {festival.premierePrograms.map((program) => {
              const ok = result.eligiblePrograms.includes(program)
              return (
                <li key={program.name}>
                  <strong>{program.name}</strong> — {t(`premiereNeed.${program.required}`)}
                  <span className={ok ? 'ok' : 'no'}>
                    {ok ? ` ${t('festivalDetail.possible')}` : ` ${t('festivalDetail.blocked')}`}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <section className="panel">
        <h2>{t('festivalDetail.rules')}</h2>
        <dl className="spec">
          <div>
            <dt>{t('festivalDetail.finishedWip')}</dt>
            <dd>
              {festival.acceptsFinished ? t('festivalDetail.finishedYes') : t('festivalDetail.finishedNo')}
              {festival.acceptsWip ? t('festivalDetail.wipYes') : t('festivalDetail.wipNo')}
            </dd>
          </div>
          <div>
            <dt>{t('festivalDetail.duration')}</dt>
            <dd>
              {festival.duration.shortOnly
                ? t('festivalDetail.durationShort')
                : t('festivalDetail.durationMixed')}
            </dd>
          </div>
          <div>
            <dt>{t('festivalDetail.completion')}</dt>
            <dd>
              {festival.completionAfter
                ? t('festivalDetail.completionAfter', { date: festival.completionAfter })
                : ''}
              {festival.completionMaxMonths
                ? t('festivalDetail.completionWindow', { months: festival.completionMaxMonths })
                : t('festivalDetail.completionConfirm')}
            </dd>
          </div>
          <div>
            <dt>{t('festivalDetail.subs')}</dt>
            <dd>
              {festival.englishSubtitlesRequired
                ? t('festivalDetail.subsEn')
                : t('festivalDetail.subsLocal')}
            </dd>
          </div>
          <div>
            <dt>{t('festivalDetail.fee')}</dt>
            <dd>{t('festivalDetail.feeNote')}</dd>
          </div>
          <div>
            <dt>{t('festivalDetail.screener')}</dt>
            <dd>{t('festivalDetail.screenerNote')}</dd>
          </div>
        </dl>
        <p className="muted">{t('festivalDetail.disclaimer')}</p>
        <div className="btn-row">
          <a className="btn" href={festival.website} target="_blank" rel="noreferrer">
            {t('festivalDetail.official')}
          </a>
        </div>
      </section>

      <section className="panel">
        <h2>{t('festivalDetail.programme')}</h2>
        {programme.length === 0 ? (
          <p className="muted">{t('festivalDetail.noProgramme')}</p>
        ) : (
          <ul className="plain-list programme-list">
            {programme.map((item) => (
              <li key={`${item.filmId}-${item.year}-${item.section}`}>
                <button
                  type="button"
                  className="btn-text"
                  onClick={() => {
                    loadArchiveFilm(item.filmId)
                    window.location.hash = '#/filme'
                  }}
                >
                  {item.film?.title ?? item.filmId}
                </button>
                <span className="muted">
                  {' '}
                  · {item.year} · {item.section} · {labelHonour(item.result, t)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>{t('festivalDetail.after')}</h2>
        <ol className="steps compact">
          {stepDefinitions.slice(1).map((step) => (
            <li key={step.id}>
              <span>{String(step.number).padStart(2, '0')}</span>
              <div>
                <strong>{t(`steps.${step.id}.title`)}</strong>
                <p>{t(`steps.${step.id}.detail`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
