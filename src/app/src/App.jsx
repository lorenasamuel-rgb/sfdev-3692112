import { useEffect, useMemo, useState } from 'react'
import { AppStateProvider } from './state/AppState.jsx'
import { useAppState } from './state/context.js'
import { HomePage } from './pages/HomePage.jsx'
import { FilmPage } from './pages/FilmPage.jsx'
import { FestivalsPage } from './pages/FestivalsPage.jsx'
import { FestivalDetailPage } from './pages/FestivalDetailPage.jsx'
import { PackagePage } from './pages/PackagePage.jsx'
import { RightsPage } from './pages/RightsPage.jsx'
import { SubmissionsPage } from './pages/SubmissionsPage.jsx'
import { GuidePage, LabsPage } from './pages/GuidePage.jsx'
import { readinessScore } from './lib/eligibility.js'
import { packageItems, rightsItems } from './data/checklists.js'

const NAV = [
  { href: '#/filme', id: 'filme', label: 'Filme' },
  { href: '#/festivais', id: 'festivais', label: 'Festivais' },
  { href: '#/pacote', id: 'pacote', label: 'Pacote' },
  { href: '#/direitos', id: 'direitos', label: 'Direitos' },
  { href: '#/inscricoes', id: 'inscricoes', label: 'Inscrições' },
  { href: '#/guia', id: 'guia', label: 'Guia' },
  { href: '#/laboratorios', id: 'laboratorios', label: 'Labs' },
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
    if (section === 'festivais' && id) return <FestivalDetailPage id={id} />
    if (section === 'festivais') return <FestivalsPage />
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
        {NAV.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={active === item.id ? 'is-active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
      <p className="ribbon">
        A inscrição não garante participação. Confirme prazos, taxas e estreia no edital vigente.
      </p>
      <main className={isHome ? 'main-home' : 'main-app'}>{page}</main>
      <SiteFooter />
    </div>
  )
}

function Header({ active, menuOpen, setMenuOpen }) {
  const { film, package: packageState, rights, submissions } = useAppState()
  const score = readinessScore(film, packageState, rights, packageItems, rightsItems)

  return (
    <header className="globalnav">
      <div className="globalnav-content">
        <a className="brand" href="#/" aria-label="Rota Doc, início" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true" />
          <span>Rota Doc</span>
        </a>
        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="globalnav-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="visually-hidden">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
          <span aria-hidden="true" />
        </button>
        <nav className="globalnav-links">
          {NAV.map((item) => (
            <a key={item.id} href={item.href} className={active === item.id ? 'is-active' : ''}>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="topbar-film">
          {film.originalTitle || 'Sem filme'}
          <span>
            {score}/100 · {submissions.length} {submissions.length === 1 ? 'inscrição' : 'inscrições'}
          </span>
        </p>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-lead">
          Rota Doc organiza o processo de inscrição de documentários em festivais. A seleção é
          curatorial e cada casa tem edital próprio.
        </p>
        <div className="footer-sitemap">
          <div>
            <h2>Rota</h2>
            <ul>
              <li>
                <a href="#/filme">Filme</a>
              </li>
              <li>
                <a href="#/festivais">Festivais</a>
              </li>
              <li>
                <a href="#/pacote">Pacote</a>
              </li>
              <li>
                <a href="#/direitos">Direitos</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Acompanhar</h2>
            <ul>
              <li>
                <a href="#/inscricoes">Inscrições</a>
              </li>
              <li>
                <a href="#/guia">Guia</a>
              </li>
              <li>
                <a href="#/laboratorios">Labs e mercados</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Sobre</h2>
            <ul>
              <li>
                <a href="#/guia">Requisitos comuns</a>
              </li>
              <li>
                <a href="#/festivais">Catálogo de referência</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer-copy">
          Os resumos de regulamento são de referência. Confirme sempre o edital vigente antes de
          divulgar o filme ou pagar a taxa.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <AppStateProvider>
      <Router />
    </AppStateProvider>
  )
}
