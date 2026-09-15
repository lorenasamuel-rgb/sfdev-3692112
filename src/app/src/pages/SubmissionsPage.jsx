import { festivals, getFestivalById, stepDefinitions } from '../data/festivals.js'
import { evaluateFestival } from '../lib/eligibility.js'
import { EligibilityBadge } from '../components/Widgets.jsx'
import { labelCountry } from '../lib/labels.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

const STATUS_VALUES = ['considering', 'submitted', 'awaiting', 'selected', 'not_selected', 'withdrawn']

export function SubmissionsPage() {
  const { film, submissions, addSubmission, updateSubmission, toggleStep, removeSubmission } =
    useAppState()
  const { locale, t } = useLanguage()
  const tracked = new Set(submissions.map((item) => item.festivalId))
  const available = festivals.filter((festival) => !tracked.has(festival.id))

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{t('submissions.eyebrow')}</p>
          <h1>{t('submissions.title')}</h1>
          <p>{t('submissions.lede')}</p>
        </div>
        {available.length ? (
          <label className="inline-add">
            {t('submissions.add')}
            <select
              defaultValue=""
              onChange={(event) => {
                if (event.target.value) addSubmission(event.target.value)
                event.target.value = ''
              }}
            >
              <option value="" disabled>
                {t('submissions.choose')}
              </option>
              {available.map((festival) => (
                <option key={festival.id} value={festival.id}>
                  {festival.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </header>

      {submissions.length === 0 ? (
        <div className="empty-film">
          <p>{t('submissions.empty')}</p>
          <a className="btn" href="#/festivais">
            {t('submissions.goFestivals')}
          </a>
        </div>
      ) : (
        <div className="submission-list">
          {submissions.map((item) => {
            const festival = getFestivalById(item.festivalId)
            if (!festival) return null
            const result = evaluateFestival(film, festival, new Date(), locale)
            return (
              <article key={item.id} className="panel submission">
                <header>
                  <div>
                    <h2>
                      <a href={`#/festivais/${festival.id}`}>{festival.name}</a>
                    </h2>
                    <p className="muted">
                      {festival.city} · {labelCountry(festival.country, t)} · {festival.platform}
                    </p>
                  </div>
                  <EligibilityBadge result={result} />
                </header>

                <label>
                  {t('submissions.status')}
                  <select
                    value={item.status}
                    onChange={(event) => updateSubmission(item.id, { status: event.target.value })}
                  >
                    {STATUS_VALUES.map((value) => (
                      <option key={value} value={value}>
                        {t(`submissions.${value}`)}
                      </option>
                    ))}
                  </select>
                </label>

                <ol className="step-checks">
                  {stepDefinitions.map((step) => (
                    <li key={step.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={Boolean(item.steps[step.id])}
                          onChange={() => toggleStep(item.id, step.id)}
                        />
                        <span>
                          {step.number}. {t(`steps.${step.id}.title`)}
                        </span>
                      </label>
                    </li>
                  ))}
                </ol>

                {item.status === 'selected' ? (
                  <p className="note">{t('submissions.selectedNote')}</p>
                ) : null}

                <label className="full">
                  {t('submissions.notes')}
                  <textarea
                    rows="2"
                    value={item.notes}
                    onChange={(event) => updateSubmission(item.id, { notes: event.target.value })}
                    placeholder={t('submissions.notesPlaceholder')}
                  />
                </label>

                <button type="button" className="btn-text" onClick={() => removeSubmission(item.id)}>
                  {t('submissions.remove')}
                </button>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
