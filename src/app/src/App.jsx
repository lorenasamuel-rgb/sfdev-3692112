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
import { ArchivePage } from './pages/ArchivePage.jsx'
import { AwardsPage } from './pages/AwardsPage.jsx'
import { AssessmentPage } from './pages/AssessmentPage.jsx'
import { ReportPage } from './pages/ReportPage.jsx'
import { readinessScore } from './lib/eligibility.js'
import { packageItems, rightsItems } from './data/checklists.js'

const NAV = [
  { href: '#/filme', id: 'filme', label: 'Filme' },
  { href: '#/festivais', id: 'festivais', label: 'Festivais' },
  { href: '#/arquivo', id: 'arquivo', label: 'Arquivo' },
  { href: '#/premios', id: 'premios', label: 'Prêmios' },
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

function readAssessment() {
  try {
    const saved = localStorage.getItem('festivalAssessment')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function Router() {
  const [route, setRoute] = useState(parseHash)
  const [assessment, setAssessment] = useState(readAssessment)

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    if (!window.location.hash) window.location.hash = '#/'
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  function handleAssessed(result) {
    localStorage.setItem('festivalAssessment', JSON.stringify(result))
    setAssessment(result)
    window.location.hash = '#/relatorio'
  }

  const page = useMemo(() => {
    const [section, id] = route.parts
    if (!section) return <HomePage />
    if (section === 'filme') return <FilmPage />
    if (section === 'festivais' && id) return <FestivalDetailPage id={id} />
    if (section === 'festivais') return <FestivalsPage />
    if (section === 'arquivo') return <ArchivePage />
    if (section === 'premios') return <AwardsPage />
    if (section === 'avaliacao') return <AssessmentPage onComplete={handleAssessed} />
    if (section === 'relatorio') {
      return (
        <ReportPage
          assessment={assessment}
          onRestart={() => {
            window.location.hash = '#/avaliacao'
          }}
        />
      )
    }
    if (section === 'pacote') return <PackagePage />
    if (section === 'direitos') return <RightsPage />
    if (section === 'inscricoes') return <SubmissionsPage />
    if (section === 'guia') return <GuidePage />
    if (section === 'laboratorios') return <LabsPage />
    return <HomePage />
  }, [route, assessment])

  const active = route.parts[0] || 'home'

  return (
    <div className="shell">
      <Header active={active} />
      <main>{page}</main>
      <footer>
        <p>
          Rota Doc organiza o processo de inscrição. A seleção é curatorial e cada festival tem
          edital próprio — confirme prazos, taxas e estreia no site oficial.
        </p>
      </footer>
    </div>
  )
}

function Header({ active }) {
  const { film, package: packageState, rights, submissions } = useAppState()
  const score = readinessScore(film, packageState, rights, packageItems, rightsItems)

  return (
    <header className="topbar">
      <a className="brand" href="#/">
        <span className="brand-mark" aria-hidden="true" />
        Rota Doc
      </a>
      <nav>
        {NAV.map((item) => (
          <a key={item.id} href={item.href} className={active === item.id ? 'is-active' : ''}>
            {item.label}
          </a>
        ))}
      </nav>
      <p className="topbar-film">
        {film.originalTitle || 'Sem filme cadastrado'}
        <span>
          {score}/100 · {submissions.length} inscrições
        </span>
      </p>
    </header>
  )
}

export default function App() {
  return (
    <AppStateProvider>
      <Router />
    </AppStateProvider>
  )
}
