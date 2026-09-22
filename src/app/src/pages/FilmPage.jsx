import { useState } from 'react'
import { ReadinessMeter, PremiereCallout } from '../components/Widgets.jsx'
import { TitleSearch } from '../components/TitleSearch.jsx'
import { SectionPager } from '../components/SectionPager.jsx'
import { downloadRouteReport } from '../lib/downloadReport.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

export function FilmPage() {
  const { film, package: packageState, rights, submissions, updateFilm, loadSample, clearFilm } =
    useAppState()
  const { locale, t } = useLanguage()
  const [titleError, setTitleError] = useState('')

  function field(name, kind = 'text') {
    if (kind === 'checkbox') {
      return {
        checked: Boolean(film[name]),
        onChange: (event) => updateFilm({ [name]: event.target.checked }),
      }
    }
    return {
      value: film[name] ?? '',
      onChange: (event) => {
        if (name === 'originalTitle') setTitleError('')
        updateFilm({ [name]: event.target.value })
      },
    }
  }

  function onSubmit(event) {
    event.preventDefault()
    if (!film.originalTitle?.trim()) {
      setTitleError(t('film.titleRequired'))
      return
    }
    setTitleError('')
  }

  function onClear() {
    if (!window.confirm(t('film.clearConfirm'))) return
    clearFilm()
    setTitleError('')
  }

  return (
    <div className="page">
      <header className="page-head">
        <div>
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
            <button
              type="button"
              className="btn"
              onClick={() => {
                downloadRouteReport({
                  film,
                  packageState,
                  rights,
                  submissions,
                  t,
                  locale,
                }).catch((error) => {
                  console.error(error)
                })
              }}
            >
              {t('chrome.pdf')}
            </button>
            <SectionPager current="filme" wrap={false} />
          </div>
        </div>
      </header>

      <form className="dossier" key={film.archiveFilmId || 'blank'} onSubmit={onSubmit} noValidate>
        <fieldset>
          <legend>{t('film.eligibility')}</legend>
          <label className={titleError ? 'has-error' : ''}>
            {t('film.originalTitle')}
            <input
              {...field('originalTitle')}
              required
              aria-invalid={titleError ? 'true' : 'false'}
              aria-describedby={titleError ? 'title-error' : undefined}
            />
            {titleError ? (
              <span id="title-error" className="field-error">
                {titleError}
              </span>
            ) : null}
          </label>
          <label>
            {t('film.englishTitle')}
            <TitleSearch
              id="film-english-title"
              value={film.englishTitle ?? ''}
              onChange={(next) => updateFilm({ englishTitle: next })}
              placeholder={t('film.englishTitlePlaceholder')}
            />
          </label>
          <label>
            {t('film.duration')}
            <input type="number" min="1" {...field('durationMinutes')} />
          </label>
          <label>
            {t('film.completion')}
            <input type="date" {...field('completionDate')} />
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
          <label>
            {t('film.languages')}
            <input {...field('languages')} />
          </label>
          <label>
            {t('film.country')}
            <input {...field('productionCountry')} />
          </label>
        </fieldset>

        <fieldset>
          <legend>{t('film.premiere')}</legend>
          <PremiereCallout />
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

        <details className="more-fields">
          <summary>{t('film.moreCopy')}</summary>
          <fieldset>
            <legend>{t('film.identity')}</legend>
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
        </details>

        <div className="btn-row film-clear">
          <button type="button" className="btn-ghost danger" onClick={onClear}>
            {t('film.clear')}
          </button>
        </div>
        <SectionPager current="filme" />
      </form>
    </div>
  )
}
