import { useEffect, useMemo, useState } from 'react'
import { AppStateProvider } from './state/AppState.jsx'
import { useAppState } from './state/context.js'
import { AccountProvider } from './state/AccountState.jsx'
import { useAccount } from './state/accountContext.js'
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
import { LoginPage } from './pages/LoginPage.jsx'
import { readinessBand, readinessScore } from './lib/eligibility.js'
import { firstName, initials } from './lib/account.js'
import { packageItems, rightsItems } from './data/checklists.js'
import { ACCOUNT_NAV, MORE_NAV, PRIMARY_NAV } from './lib/sections.js'

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
    if (section === 'conta') return <LoginPage />
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
        <p className="drawer-label">
          <NavLabel id="route" />
        </p>
        {PRIMARY_NAV.map((item) => (
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
        <p className="drawer-label">
          <NavLabel id="more" />
        </p>
        {MORE_NAV.map((item) => (
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
        <p className="drawer-label">
          <NavLabel id="conta" />
        </p>
        <DrawerAccount active={active} onNavigate={() => setMenuOpen(false)} />
      </div>
      <p className="ribbon">
        <RibbonText />
      </p>
      <main className={isHome ? 'main-home' : 'main-app'}>{page}</main>
      <SiteFooter active={active} />
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

function useAccountLabel() {
  const { account, signedIn } = useAccount()
  const { t } = useLanguage()
  return signedIn ? firstName(account) : t('account.signIn')
}

function DrawerAccount({ active, onNavigate }) {
  const { signedIn, signOut } = useAccount()
  const { t } = useLanguage()
  const item = ACCOUNT_NAV[0]
  const label = useAccountLabel()

  return (
    <>
      <a
        href={item.href}
        className={active === item.id ? 'is-active' : ''}
        aria-current={active === item.id ? 'page' : undefined}
        onClick={onNavigate}
      >
        {label}
      </a>
      {signedIn ? (
        <button
          type="button"
          className="drawer-action"
          onClick={() => {
            signOut()
            onNavigate()
          }}
        >
          {t('account.signOut')}
        </button>
      ) : null}
    </>
  )
}

function AccountControl() {
  const { account, signedIn, signOut } = useAccount()
  const { t } = useLanguage()

  if (!signedIn) {
    return (
      <a className="account-link" href="#/conta">
        {t('account.signIn')}
      </a>
    )
  }

  return (
    <div className="account-control">
      <a className="account-link" href="#/conta">
        <span className="account-initials" aria-hidden="true">
          {initials(account)}
        </span>
        <span className="account-name">{firstName(account)}</span>
      </a>
      <button type="button" className="account-out" onClick={signOut}>
        {t('account.signOut')}
      </button>
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

function Header({ active, menuOpen, setMenuOpen }) {
  const { film, package: packageState, rights, submissions } = useAppState()
  const { t } = useLanguage()
  const score = readinessScore(film, packageState, rights, packageItems, rightsItems)
  const band = readinessBand(score)

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
        <nav className="globalnav-links" aria-label={t('nav.route')}>
          {PRIMARY_NAV.map((item) => {
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
        <LanguageSwitch />
        <AccountControl />
        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="globalnav-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="visually-hidden">
            {menuOpen ? t('chrome.closeMenu') : t('chrome.openMenu')}
          </span>
          <span aria-hidden="true" />
        </button>
        <p className="topbar-film">
          {film.originalTitle || t('nav.noFilm')}
          <span>
            {t(`widgets.band.${band}`)} · {t('nav.submissions', { score, count: submissions.length })}
          </span>
        </p>
      </div>
    </header>
  )
}

function Sitemap({ active }) {
  const { t } = useLanguage()
  const accountLabel = useAccountLabel()
  const groups = [
    {
      title: t('chrome.footerRota'),
      items: PRIMARY_NAV,
    },
    {
      title: t('nav.more'),
      items: MORE_NAV,
    },
    {
      title: t('nav.conta'),
      items: ACCOUNT_NAV,
    },
  ]

  return (
    <div className="footer-sitemap">
      {groups.map((group) => (
        <div key={group.title}>
          <h2>{group.title}</h2>
          <ul>
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={active === item.id ? 'is-active' : ''}
                  aria-current={active === item.id ? 'page' : undefined}
                >
                  {item.id === 'conta' ? accountLabel : t(`nav.${item.id}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function SiteFooter({ active }) {
  const { t } = useLanguage()
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="directory-lead">{t('chrome.footerLead')}</p>
        <Sitemap active={active} />
        <p className="footer-copy">{t('footer')}</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AccountProvider>
        <AppStateProvider>
          <Router />
        </AppStateProvider>
      </AccountProvider>
    </LanguageProvider>
  )
}
