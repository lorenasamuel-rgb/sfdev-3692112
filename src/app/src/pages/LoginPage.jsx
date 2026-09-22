import { useState } from 'react'
import { firstName, initials, MIN_PASSWORD_LENGTH } from '../lib/account.js'
import { formatDate } from '../lib/dates.js'
import { useAccount } from '../state/accountContext.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

const emptyForm = { name: '', email: '', password: '', confirm: '', remember: true }

function StorageNote() {
  const { mode } = useAccount()
  const { t } = useLanguage()
  const key = mode === 'supabase' ? 'cloud' : 'local'
  return (
    <aside className={`callout ${mode === 'supabase' ? 'callout-good' : 'callout-warn'}`}>
      <h3>{t(`account.${key}.title`)}</h3>
      <p>{t(`account.${key}.body`)}</p>
    </aside>
  )
}

function AccountPanel() {
  const { account, mode, pending, signOut, forgetAccount } = useAccount()
  const { sync, updateFilm, clearCloudRoute } = useAppState()
  const { locale, t } = useLanguage()
  const [notice, setNotice] = useState('')
  const cloud = mode === 'supabase'

  function onUseInFilm() {
    updateFilm({
      producerName: account.name,
      producerEmail: account.email,
    })
    setNotice(t('account.useInFilmDone'))
  }

  function onForget() {
    if (!window.confirm(t('account.forgetConfirm'))) return
    forgetAccount()
  }

  function onClearCloud() {
    if (!window.confirm(t('account.clearCloudConfirm'))) return
    clearCloudRoute().then(() => setNotice(t('account.clearCloudDone')))
  }

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>{t('account.welcome', { name: firstName(account) })}</h1>
          <p>{t(cloud ? 'account.signedInCloudLede' : 'account.signedInLede')}</p>
        </div>
        <div className="page-head-aside">
          <p className="account-card">
            <span className="account-initials" aria-hidden="true">
              {initials(account)}
            </span>
            <span>
              <strong>{account.name || account.email}</strong>
              <span className="muted">{account.email}</span>
            </span>
          </p>
        </div>
      </header>

      <section className="panel">
        <h2>{t('account.details')}</h2>
        <dl className="spec">
          <div>
            <dt>{t('account.name')}</dt>
            <dd>{account.name || '-'}</dd>
          </div>
          <div>
            <dt>{t('account.email')}</dt>
            <dd>{account.email}</dd>
          </div>
          <div>
            <dt>{t('account.since')}</dt>
            <dd>{formatDate(account.createdAt.slice(0, 10), locale)}</dd>
          </div>
          {cloud ? (
            <div>
              <dt>{t('account.route')}</dt>
              <dd>{t(`account.sync.${sync.status}`)}</dd>
            </div>
          ) : null}
        </dl>
        <div className="btn-row">
          <button type="button" className="btn" onClick={onUseInFilm}>
            {t('account.useInFilm')}
          </button>
          <button type="button" className="btn-ghost" onClick={signOut} disabled={pending}>
            {t('account.signOut')}
          </button>
          {cloud ? (
            <button type="button" className="btn-ghost danger" onClick={onClearCloud}>
              {t('account.clearCloud')}
            </button>
          ) : (
            <button type="button" className="btn-ghost danger" onClick={onForget}>
              {t('account.forget')}
            </button>
          )}
        </div>
        {notice ? (
          <p className="note good" role="status">
            {notice}
          </p>
        ) : null}
      </section>

      <StorageNote />
    </div>
  )
}

export function LoginPage() {
  const { account, mode, notice, clearNotice, pending, ready, signedIn, signIn, signUp } =
    useAccount()
  const { t } = useLanguage()
  const [formMode, setFormMode] = useState(account ? 'signIn' : 'signUp')
  const [form, setForm] = useState(() => ({ ...emptyForm, email: account?.email ?? '' }))
  const [errors, setErrors] = useState({})

  if (signedIn && account) return <AccountPanel />

  const cloud = mode === 'supabase'
  const creating = formMode === 'signUp'

  function field(name) {
    return {
      value: form[name],
      onChange: (event) => {
        const { value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
        setErrors((current) => ({ ...current, [name]: null, form: null }))
      },
    }
  }

  function message(code) {
    return t(`account.error.${code}`, { min: MIN_PASSWORD_LENGTH })
  }

  function switchMode(next) {
    setFormMode(next)
    setErrors({})
    clearNotice()
    setForm((current) => ({ ...current, password: '', confirm: '' }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    if (pending) return
    const result = creating ? await signUp(form) : await signIn(form)
    setErrors(result)
    if (Object.keys(result).length === 0) {
      setForm((current) => ({ ...current, password: '', confirm: '' }))
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>{t('account.title')}</h1>
          <p>{t(cloud ? 'account.ledeCloud' : 'account.lede')}</p>
        </div>
        <div className="page-head-aside">
          <div className="auth-tabs" role="group" aria-label={t('account.tabsLabel')}>
            <button
              type="button"
              className={creating ? '' : 'is-active'}
              aria-pressed={!creating}
              onClick={() => switchMode('signIn')}
            >
              {t('account.signIn')}
            </button>
            <button
              type="button"
              className={creating ? 'is-active' : ''}
              aria-pressed={creating}
              onClick={() => switchMode('signUp')}
            >
              {t('account.signUp')}
            </button>
          </div>
        </div>
      </header>

      {!ready ? <p className="note">{t('account.connecting')}</p> : null}
      {notice ? (
        <p className="note good" role="status">
          {t(`account.notice.${notice}`)}
        </p>
      ) : null}
      {!cloud && !account && !creating ? (
        <p className="note warn">{t('account.noAccountYet')}</p>
      ) : null}
      {!cloud && account && creating ? (
        <p className="note warn">{t('account.existing', { email: account.email })}</p>
      ) : null}

      <form className="dossier auth-form" onSubmit={onSubmit} noValidate>
        <fieldset>
          <legend>{creating ? t('account.signUp') : t('account.signIn')}</legend>

          {errors.form ? (
            <p className="note bad" role="alert">
              {message(errors.form)}
            </p>
          ) : null}

          {creating ? (
            <label className={errors.name ? 'has-error' : ''}>
              {t('account.name')}
              <input
                {...field('name')}
                autoComplete="name"
                placeholder={t('account.namePlaceholder')}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'account-name-error' : undefined}
              />
              {errors.name ? (
                <span id="account-name-error" className="field-error">
                  {message(errors.name)}
                </span>
              ) : null}
            </label>
          ) : null}

          <label className={errors.email ? 'has-error' : ''}>
            {t('account.email')}
            <input
              type="email"
              {...field('email')}
              autoComplete="email"
              placeholder={t('account.emailPlaceholder')}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'account-email-error' : undefined}
            />
            {errors.email ? (
              <span id="account-email-error" className="field-error">
                {message(errors.email)}
              </span>
            ) : null}
          </label>

          <label className={errors.password ? 'has-error' : ''}>
            {t('account.password')}
            <input
              type="password"
              {...field('password')}
              autoComplete={creating ? 'new-password' : 'current-password'}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={
                errors.password ? 'account-password-error' : creating ? 'account-password-hint' : undefined
              }
            />
            {errors.password ? (
              <span id="account-password-error" className="field-error">
                {message(errors.password)}
              </span>
            ) : creating ? (
              <span id="account-password-hint" className="field-hint">
                {t('account.passwordHint', { min: MIN_PASSWORD_LENGTH })}
              </span>
            ) : null}
          </label>

          {creating ? (
            <label className={errors.confirm ? 'has-error' : ''}>
              {t('account.confirm')}
              <input
                type="password"
                {...field('confirm')}
                autoComplete="new-password"
                aria-invalid={errors.confirm ? 'true' : 'false'}
                aria-describedby={errors.confirm ? 'account-confirm-error' : undefined}
              />
              {errors.confirm ? (
                <span id="account-confirm-error" className="field-error">
                  {message(errors.confirm)}
                </span>
              ) : null}
            </label>
          ) : null}

          {cloud ? null : (
            <label className="check">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(event) => {
                  const { checked } = event.target
                  setForm((current) => ({ ...current, remember: checked }))
                }}
              />
              {t('account.remember')}
            </label>
          )}

          <div className="btn-row">
            <button type="submit" className="btn" disabled={pending}>
              {pending
                ? t('account.working')
                : creating
                  ? t('account.submitSignUp')
                  : t('account.submitSignIn')}
            </button>
            <button
              type="button"
              className="btn-text"
              onClick={() => switchMode(creating ? 'signIn' : 'signUp')}
            >
              {creating ? t('account.haveAccount') : t('account.noAccount')}
            </button>
          </div>
        </fieldset>
      </form>

      <StorageNote />
    </div>
  )
}
