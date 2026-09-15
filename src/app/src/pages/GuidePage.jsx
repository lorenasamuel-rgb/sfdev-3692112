import { requirementIds } from '../data/checklists.js'
import { labFestivals } from '../data/festivals.js'
import { PremiereCallout } from '../components/Widgets.jsx'
import { labelCountry, labelFocus } from '../lib/labels.js'
import { useLanguage } from '../i18n/context.js'

export function GuidePage() {
  const { t } = useLanguage()
  const examples = labFestivals.slice(0, 2)

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{t('guide.eyebrow')}</p>
          <h1>{t('guide.title')}</h1>
          <p>{t('guide.lede')}</p>
        </div>
      </header>

      <div className="req-table">
        {requirementIds.map((id) => (
          <article key={id}>
            <h2>{t(`requirements.${id}.title`)}</h2>
            <p>{t(`requirements.${id}.meaning`)}</p>
          </article>
        ))}
      </div>

      <PremiereCallout />

      <section className="split">
        {examples.map((festival) => (
          <article key={festival.id} className="panel">
            <h2>{festival.name}</h2>
            <p>
              {festival.city}, {labelCountry(festival.country, t)}. {festival.description}
            </p>
            <a href={`#/festivais/${festival.id}`}>{t('festivals.open')}</a>
          </article>
        ))}
      </section>
    </div>
  )
}

export function LabsPage() {
  const { t } = useLanguage()

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{t('labs.eyebrow')}</p>
          <h1>{t('labs.title')}</h1>
          <p>{t('labs.lede')}</p>
        </div>
      </header>

      <section className="panel">
        <h2>{t('labs.when')}</h2>
        <ul className="plain-list">
          <li>{t('labs.when1')}</li>
          <li>{t('labs.when2')}</li>
          <li>{t('labs.when3')}</li>
        </ul>
      </section>

      {labFestivals.length === 0 ? (
        <p className="muted">{t('labs.empty')}</p>
      ) : (
        <div className="card-grid">
          {labFestivals.map((festival) => (
            <article key={festival.id} className="festival-card">
              <p className="eyebrow">
                {festival.city} · {labelCountry(festival.country, t)}
              </p>
              <h3>
                <a href={`#/festivais/${festival.id}`}>{festival.name}</a>
              </h3>
              <p>{festival.hasLabs ? t('labs.note') : festival.description}</p>
              <ul className="chip-row">
                {festival.focusTags.map((tag) => (
                  <li key={tag}>{labelFocus(tag, t)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
