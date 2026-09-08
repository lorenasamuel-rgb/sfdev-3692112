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
  { href: '#/filme', id: 'filme' },
  { href: '#/arquivo', id: 'arquivo' },
  { href: '#/festivais', id: 'festivais' },
  { href: '#/premios', id: 'premios' },
  { href: '#/pacote', id: 'pacote' },
  { href: '#/direitos', id: 'direitos' },
  { href: '#/inscricoes', id: 'inscricoes' },
  { href: '#/guia', id: 'guia' },
  { href: '#/laboratorios', id: 'laboratorios' },
]

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const path = raw.startsWith('/') ? raw : `/${raw}`
  const parts = path.split('/').filter(Boolean)
  return { path, parts }
}

function Router() {
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
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

  return (
    <div className="shell">
      <Header active={active} />
      <main>{page}</main>
      <Footer />
    </div>
  )
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

function Header({ active }) {
  const { film, package: packageState, rights, submissions } = useAppState()
  const { t } = useLanguage()
  const score = readinessScore(film, packageState, rights, packageItems, rightsItems)

  return (
    <header className="topbar">
      <a className="brand" href="#/">
        <span className="brand-mark" aria-hidden="true" />
        {t('brand')}
      </a>
      <LanguageSwitch />
      <nav aria-label={t('nav.sections')}>
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
    </header>
  )
}

function Footer() {
  const { t } = useLanguage()
  return (
    <footer>
      <p>{t('footer')}</p>
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
