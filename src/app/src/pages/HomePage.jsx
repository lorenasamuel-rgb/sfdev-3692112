import { stepDefinitions } from '../data/festivals.js'
import { useLanguage } from '../i18n/context.js'

const STEP_HREF = {
  choose: '#/festivais',
  rules: '#/guia',
  form: '#/filme',
  screener: '#/pacote',
  fee: '#/inscricoes',
  wait: '#/inscricoes',
  delivery: '#/direitos',
}

export function HomePage() {
  const { t } = useLanguage()
  return (
    <div className="page home">
      <section className="board board-hero">
        <p className="board-live">{t('home.live')}</p>
        <h1>{t('home.heroTitle')}</h1>
        <p className="board-lede">{t('home.lede')}</p>
        <div className="board-actions">
          <a className="btn" href="#/filme">
            {t('home.ctaFilm')}
          </a>
          <a className="btn-ghost on-dark" href="#/festivais">
            {t('home.ctaFestivals')}
          </a>
        </div>
      </section>

      <section className="board board-paper">
        <h2>{t('home.how')}</h2>
        <p>{t('home.unitHowSub')}</p>
        <ol className="home-steps">
          {stepDefinitions.map((step) => (
            <li key={step.id}>
              <a href={STEP_HREF[step.id] || '#/guia'}>
                <strong>{t(`steps.${step.id}.title`)}</strong>
                <span>{t(`steps.${step.id}.detail`)}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="board-grid">
        <a className="board-card" href="#/festivais">
          <h2>{t('home.unitFestivals')}</h2>
          <p>{t('home.unitFestivalsSub')}</p>
        </a>
        <a className="board-card" href="#/pacote">
          <h2>{t('home.unitPackage')}</h2>
          <p>{t('home.unitPackageSub')}</p>
        </a>
        <a className="board-card" href="#/arquivo">
          <h2>{t('home.unitArchive')}</h2>
          <p>{t('home.unitArchiveSub')}</p>
        </a>
        <a className="board-card" href="#/premios">
          <h2>{t('home.unitAwards')}</h2>
          <p>{t('home.unitAwardsSub')}</p>
        </a>
      </section>

      <section className="board board-finale">
        <h2>{t('home.unitFinale')}</h2>
        <p>
          {t('home.twoRoutesBody', {
            finished: t('home.finished'),
            dev: t('home.dev'),
          })}
        </p>
        <div className="board-actions">
          <a className="btn" href="#/filme">
            {t('home.ctaFilm')}
          </a>
          <a className="btn-ghost on-dark" href="#/laboratorios">
            {t('home.labsLink')}
          </a>
        </div>
      </section>
    </div>
  )
}
