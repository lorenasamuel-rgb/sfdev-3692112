import { stepDefinitions } from '../data/festivals.js'
import { PremiereCallout } from '../components/Widgets.jsx'
import { useLanguage } from '../i18n/context.js'

export function HomePage() {
  const { t } = useLanguage()
  return (
    <div className="page home">
      <section className="hero">
        <p className="eyebrow">{t('home.eyebrow')}</p>
        <h1>{t('home.title')}</h1>
        <p className="lede">{t('home.lede')}</p>
        <div className="btn-row">
          <a className="btn" href="#/filme">
            {t('home.ctaFilm')}
          </a>
          <a className="btn-ghost" href="#/festivais">
            {t('home.ctaFestivals')}
          </a>
          <a className="btn-ghost" href="#/arquivo">
            {t('home.ctaArchive')}
          </a>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>{t('home.how')}</h2>
          <ol className="steps">
            {stepDefinitions.map((step) => (
              <li key={step.id}>
                <span>{String(step.number).padStart(2, '0')}</span>
                <div>
                  <strong>{t(`steps.${step.id}.title`)}</strong>
                  <p>{t(`steps.${step.id}.detail`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="stack">
          <PremiereCallout />
          <aside className="callout">
            <h3>{t('home.twoRoutes')}</h3>
            <p>
              {t('home.twoRoutesBody', {
                finished: t('home.finished'),
                dev: t('home.dev'),
              })}
            </p>
            <a href="#/laboratorios">{t('home.labsLink')}</a>
          </aside>
        </div>
      </section>
    </div>
  )
}
