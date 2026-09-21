import { sectionNeighbors } from '../lib/sections.js'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

export function SectionPager({ current, wrap = true }) {
  const { t } = useLanguage()
  const { clearFilm } = useAppState()
  const { prev, next } = sectionNeighbors(current)

  const buttons = (
    <>
      {prev ? (
        <a className="btn-ghost" href={prev.href}>
          <span aria-hidden="true">‹</span> {t('chrome.back')}
        </a>
      ) : null}
      {next ? (
        <a className="btn" href={next.href}>
          {t('chrome.next')} <span aria-hidden="true">›</span>
        </a>
      ) : null}
      <button type="button" className="btn-ghost" onClick={clearFilm}>
        {t('film.clear')}
      </button>
    </>
  )

  if (!wrap) return buttons
  return (
    <nav className="btn-row" aria-label={t('nav.sections')}>
      {buttons}
    </nav>
  )
}
