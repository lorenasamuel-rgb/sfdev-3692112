import { ReadinessMeter } from '../components/Widgets.jsx'
import { TitleSearch } from '../components/TitleSearch.jsx'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

export function FilmPage() {
  const { film, updateFilm, loadSample, clearFilm } = useAppState()
  const { t } = useLanguage()

  function field(name, kind = 'text') {
    if (kind === 'checkbox') {
      return {
        checked: Boolean(film[name]),
        onChange: (event) => updateFilm({ [name]: event.target.checked }),
      }
    }
    return {
      value: film[name] ?? '',
      onChange: (event) => updateFilm({ [name]: event.target.value }),
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{t('film.eyebrow')}</p>
          <h1>{t('film.title')}</h1>
          <p>{t('film.lede')}</p>
          {film.archiveFilmId ? (
            <p className="muted">
              {t('film.archiveHint', { title: film.originalTitle, year: film.archiveYear })}
            </p>
          ) : null}
        </div>
        <div className="page-head-aside">
          <ReadinessMeter />
          <div className="btn-row">
            <button type="button" className="btn-ghost" onClick={loadSample}>
              {t('film.sample')}
            </button>
            <button type="button" className="btn-ghost" onClick={clearFilm}>
              {t('film.clear')}
            </button>
          </div>
        </div>
      </header>

      <form className="dossier" onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <legend>{t('film.identity')}</legend>
          <TitleSearch />
          <label>
            {t('film.englishTitle')}
            <input {...field('englishTitle')} placeholder="The Quiet Cartographer" />
          </label>
          <label className="full">
            {t('film.logline')}
            <textarea rows="2" {...field('logline')} />
          </label>
          <label className="full">
            {t('film.shortSynopsis')}
            <textarea rows="3" {...field('shortSynopsis')} />
          </label>
          <label className="full">
            {t('film.fullSynopsis')}
            <textarea rows="5" {...field('fullSynopsis')} />
          </label>
        </fieldset>

        <fieldset>
          <legend>{t('film.sheet')}</legend>
          <label>
            {t('film.duration')}
            <input type="number" min="1" {...field('durationMinutes')} />
          </label>
          <label>
            {t('film.completion')}
            <input type="date" {...field('completionDate')} />
          </label>
          <label>
            {t('film.country')}
            <input {...field('productionCountry')} />
          </label>
          <label>
            {t('film.languages')}
            <input {...field('languages')} />
          </label>
          <label>
            {t('film.form')}
            <select {...field('form')}>
              <option value="Documentary">{t('film.formDocumentary')}</option>
              <option value="Drama">{t('film.formDrama')}</option>
              <option value="Animation">{t('film.formAnimation')}</option>
              <option value="Experimental">{t('film.formExperimental')}</option>
            </select>
          </label>
          <label>
            {t('film.stage')}
            <select {...field('stage')}>
              <option value="finished">{t('film.stageFinished')}</option>
              <option value="wip">{t('film.stageWip')}</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <legend>{t('film.premiere')}</legend>
          <label>
            {t('film.premiereStatus')}
            <select {...field('premiereStatus')}>
              <option value="none">{t('film.premiereNone')}</option>
              <option value="national">{t('film.premiereNational')}</option>
              <option value="european">{t('film.premiereEuropean')}</option>
              <option value="international">{t('film.premiereInternational')}</option>
              <option value="world">{t('film.premiereWorld')}</option>
            </select>
          </label>
          <label className="check">
            <input type="checkbox" {...field('publishedPublicly', 'checkbox')} />
            {t('film.published')}
          </label>
        </fieldset>

        <fieldset>
          <legend>{t('film.screener')}</legend>
          <label>
            {t('film.screenerUrl')}
            <input type="url" {...field('screenerUrl')} placeholder="https://vimeo.com/..." />
          </label>
          <label>
            {t('film.screenerPassword')}
            <input {...field('screenerPassword')} />
          </label>
          <label className="check">
            <input type="checkbox" {...field('hasEnglishSubtitles', 'checkbox')} />
            {t('film.hasSubs')}
          </label>
          <label className="check">
            <input type="checkbox" {...field('hasSrt', 'checkbox')} />
            {t('film.hasSrt')}
          </label>
        </fieldset>

        <fieldset>
          <legend>{t('film.people')}</legend>
          <label>
            {t('film.director')}
            <input {...field('directorName')} />
          </label>
          <label>
            {t('film.producer')}
            <input {...field('producerName')} />
          </label>
          <label>
            {t('film.email')}
            <input type="email" {...field('producerEmail')} />
          </label>
          <label>
            {t('film.phone')}
            <input {...field('producerPhone')} />
          </label>
          <label className="full">
            {t('film.directorBio')}
            <textarea rows="3" {...field('directorBio')} />
          </label>
          <label className="full">
            {t('film.directorStatement')}
            <textarea rows="3" {...field('directorStatement')} />
          </label>
        </fieldset>
      </form>
    </div>
  )
}
