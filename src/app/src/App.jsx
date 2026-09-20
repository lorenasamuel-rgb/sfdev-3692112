import { useEffect, useMemo, useState } from 'react'
import { AppStateProvider } from './state/AppState.jsx'
import { useAppState } from './state/context.js'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { useLanguage } from './i18n/context.js'
import { HomePage } from './pages/HomePage.jsx'
import { FilmPage } from './pages/FilmPage.jsx'
import { ArchivePage } from './pages/ArchivePage.jsx'
import { FestivalsPage } from './pages/FestivalsPage.jsx'
import { FestivalDetailPage } from './pages/FestivalDetailPage.jsx'
import { AwardsPage } from './pages/AwardsPage.jsx'
import { PackagePage } from './pages/PackagePage.jsx'
import { RightsPage } from './pages/RightsPage.jsx'
import { SubmissionsPage } from './pages/SubmissionsPage.jsx'
import { GuidePage, LabsPage } from './pages/GuidePage.jsx'
import { readinessScore } from './lib/eligibility.js'
import { packageItems, rightsItems } from './data/checklists.js'

const NAV = [
  { href: '#/guia', id: 'guia' },
  { href: '#/filme', id: 'filme' },
  { href: '#/festivais', id: 'festivais' },
  { href: '#/pacote', id: 'pacote' },
  { href: '#/direitos', id: 'direitos' },
  { href: '#/inscricoes', id: 'inscricoes' },
  { href: '#/laboratorios', id: 'laboratorios' },
  { href: '#/arquivo', id: 'arquivo' },
  { href: '#/premios', id: 'premios' },
]

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const path = raw.startsWith('/') ? raw : `/${raw}`
  const parts = path.split('/').filter(Boolean)
  return { path, parts }
}

function Router() {
  const [route, setRoute] = useState(parseHash)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash())
      setMenuOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    if (!window.location.hash) window.location.hash = '#/'
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const page = useMemo(() => {
    const [section, id] = route.parts
    if (!section) return <HomePage />
    if (section === 'filme') return <FilmPage />
    if (section === 'arquivo') return <ArchivePage />
    if (section === 'festivais' && id) return <FestivalDetailPage id={id} />
    if (section === 'festivais') return <FestivalsPage />
    if (section === 'premios') return <AwardsPage />
    if (section === 'pacote') return <PackagePage />
    if (section === 'direitos') return <RightsPage />
    if (section === 'inscricoes') return <SubmissionsPage />
    if (section === 'guia') return <GuidePage />
    if (section === 'laboratorios') return <LabsPage />
    return <HomePage />
  }, [route])

  const active = route.parts[0] || 'home'
  const isHome = active === 'home'

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className={`shell${isHome ? ' is-home' : ''}`}>
      <Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div id="globalnav-menu" className={`nav-drawer${menuOpen ? ' is-open' : ''}`}>
        <LanguageSwitch />
        {NAV.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={active === item.id ? 'is-active' : ''}
            aria-current={active === item.id ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <NavLabel id={item.id} />
          </a>
        ))}
      </div>
      <p className="ribbon">
        <RibbonText />
      </p>
      <main className={isHome ? 'main-home' : 'main-app'}>{page}</main>
      <SiteFooter />
    </div>
  )
}

function NavLabel({ id }) {
  const { t } = useLanguage()
  return t(`nav.${id}`)
}

function RibbonText() {
  const { t } = useLanguage()
  return t('chrome.ribbon')
}

function LanguageSwitch() {
  const { locale, setLocale, t } = useLanguage()
  return (
    <div className="lang-switch" role="group" aria-label={t('nav.language')}>
      <button
        type="button"
        className={locale === 'pt' ? 'is-active' : ''}
        aria-pressed={locale === 'pt'}
        onClick={() => setLocale('pt')}
      >
        PT
      </button>
      <button
        type="button"
        className={locale === 'en' ? 'is-active' : ''}
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  )
}

function Header({ active, menuOpen, setMenuOpen }) {
  const { film, package: packageState, rights, submissions } = useAppState()
  const { t } = useLanguage()
  const score = readinessScore(film, packageState, rights, packageItems, rightsItems)

  return (
    <header className="globalnav">
      <div className="globalnav-content">
        <a
          className="brand"
          href="#/"
          aria-label={t('brand')}
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true" />
          <span>{t('brand')}</span>
        </a>
        <LanguageSwitch />
        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="globalnav-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="visually-hidden">{menuOpen ? t('chrome.closeMenu') : t('chrome.openMenu')}</span>
          <span aria-hidden="true" />
        </button>
        <nav className="globalnav-links" aria-label={t('nav.sections')}>
          {NAV.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                className={isActive ? 'is-active' : ''}
                aria-current={isActive ? 'page' : undefined}
              >
                {t(`nav.${item.id}`)}
              </a>
            )
          })}
        </nav>
        <p className="topbar-film">
          {film.originalTitle || t('nav.noFilm')}
          <span>{t('nav.submissions', { score, count: submissions.length })}</span>
        </p>
      </div>
    </header>
  )
}

function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-lead">{t('chrome.footerLead')}</p>
        <div className="footer-sitemap">
          <div>
            <h2>{t('chrome.footerRota')}</h2>
            <ul>
              <li>
                <a href="#/filme">{t('nav.filme')}</a>
              </li>
              <li>
                <a href="#/festivais">{t('nav.festivais')}</a>
              </li>
              <li>
                <a href="#/pacote">{t('nav.pacote')}</a>
              </li>
              <li>
                <a href="#/direitos">{t('nav.direitos')}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t('chrome.footerTrack')}</h2>
            <ul>
              <li>
                <a href="#/inscricoes">{t('nav.inscricoes')}</a>
              </li>
              <li>
                <a href="#/guia">{t('nav.guia')}</a>
              </li>
              <li>
                <a href="#/laboratorios">{t('nav.laboratorios')}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t('chrome.footerArchive')}</h2>
            <ul>
              <li>
                <a href="#/arquivo">{t('nav.arquivo')}</a>
              </li>
              <li>
                <a href="#/premios">{t('nav.premios')}</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer-copy">{t('footer')}</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppStateProvider>
        <Router />
      </AppStateProvider>
    </LanguageProvider>
  )
}
