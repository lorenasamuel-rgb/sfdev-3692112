import { useState } from 'react'
import { SiteNav } from './components/SiteNav.jsx'
import { ArchivePage } from './pages/ArchivePage.jsx'
import { AssessmentPage } from './pages/AssessmentPage.jsx'
import { AwardsPage } from './pages/AwardsPage.jsx'
import { FestivalsPage } from './pages/FestivalsPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ReportPage } from './pages/ReportPage.jsx'
import './App.css'

function readAssessment() {
  try {
    const saved = localStorage.getItem('festivalAssessment')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function App() {
  const [page, setPage] = useState('home')
  const [assessment, setAssessment] = useState(readAssessment)

  function handleAssessed(result) {
    localStorage.setItem('festivalAssessment', JSON.stringify(result))
    setAssessment(result)
    setPage('report')
  }

  return (
    <div className="shell">
      <SiteNav page={page} onNavigate={setPage} />
      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'archive' && <ArchivePage />}
      {page === 'festivals' && <FestivalsPage />}
      {page === 'awards' && <AwardsPage />}
      {page === 'assessment' && <AssessmentPage onComplete={handleAssessed} />}
      {page === 'report' && (
        <ReportPage assessment={assessment} onRestart={() => setPage('assessment')} />
      )}
    </div>
  )
}

export default App
