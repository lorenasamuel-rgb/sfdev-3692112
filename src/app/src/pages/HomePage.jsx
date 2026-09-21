import { stepDefinitions } from '../data/festivals.js'
import { useLanguage } from '../i18n/context.js'

function More({ href, children }) {
  return (
    <a href={href}>
      {children} <span aria-hidden="true">›</span>
    </a>
  )
}

export function HomePage() {
  const { t } = useLanguage()
  return (
    <div className="page home">
      <section className="unit unit-hero">
        <div className="unit-copy">
          <p className="unit-kicker">{t('brand')}</p>
          <h1>{t('home.heroTitle')}</h1>
          <p className="unit-subhead">{t('home.lede')}</p>
          <div className="unit-links">
            <More href="#/filme">{t('home.ctaFilm')}</More>
            <More href="#/arquivo">{t('home.ctaArchive')}</More>
          </div>
        </div>
      </section>

      <section className="unit unit-steps">
        <div className="unit-copy">
          <h2>{t('home.how')}</h2>
          <p className="unit-subhead">{t('home.unitHowSub')}</p>
          <div className="unit-links">
            <More href="#/guia">{t('home.learnMore')}</More>
          </div>
        </div>
        <ol className="home-steps">
          {stepDefinitions.map((step) => (
            <li key={step.id}>
              <span>{String(step.number).padStart(2, '0')}</span>
              {t(`steps.${step.id}.title`)}
            </li>
          ))}
        </ol>
      </section>

      <section className="unit unit-festivals">
        <div className="unit-copy">
          <h2>{t('home.unitFestivals')}</h2>
          <p className="unit-subhead">{t('home.unitFestivalsSub')}</p>
          <div className="unit-links">
            <More href="#/festivais">{t('home.learnMore')}</More>
            <More href="#/guia">{t('nav.guia')}</More>
          </div>
        </div>
      </section>

      <section className="unit unit-package">
        <div className="unit-copy">
          <h2>{t('home.unitPackage')}</h2>
          <p className="unit-subhead">{t('home.unitPackageSub')}</p>
          <div className="unit-links">
            <More href="#/pacote">{t('home.learnMore')}</More>
            <More href="#/direitos">{t('nav.direitos')}</More>
          </div>
        </div>
      </section>

      <div className="tile-grid">
        <article className="tile tile-archive">
          <div className="unit-copy">
            <h2>{t('home.unitArchive')}</h2>
            <p className="unit-subhead">{t('home.unitArchiveSub')}</p>
            <div className="unit-links">
              <More href="#/arquivo">{t('home.ctaArchive')}</More>
            </div>
          </div>
        </article>
        <article className="tile tile-awards">
          <div className="unit-copy">
            <h2>{t('home.unitAwards')}</h2>
            <p className="unit-subhead">{t('home.unitAwardsSub')}</p>
            <div className="unit-links">
              <More href="#/premios">{t('home.ctaAwards')}</More>
            </div>
          </div>
        </article>
        <article className="tile tile-labs">
          <div className="unit-copy">
            <h2>{t('home.unitLabs')}</h2>
            <p className="unit-subhead">{t('home.unitLabsSub')}</p>
            <div className="unit-links">
              <More href="#/laboratorios">{t('home.learnMore')}</More>
            </div>
          </div>
        </article>
      </div>

      <section className="unit unit-finale">
        <div className="unit-copy">
          <h2>{t('home.unitFinale')}</h2>
          <p className="unit-subhead">
            {t('home.twoRoutesBody', {
              finished: t('home.finished'),
              dev: t('home.dev'),
            })}
          </p>
          <div className="unit-links">
            <More href="#/filme">{t('home.ctaFilm')}</More>
            <More href="#/premios">{t('home.ctaAwards')}</More>
          </div>
        </div>
      </section>
    </div>
  )
}
