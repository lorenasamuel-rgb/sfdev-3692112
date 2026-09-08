import { FestivalCard } from '../components/FestivalCard.jsx'
import {
  checklistFromAssessment,
  readinessMessage,
  suggestFestivals,
} from '../lib/assessment.js'

export function ReportPage({ assessment, onRestart }) {
  if (!assessment) {
    return (
      <section className="stack">
        <h1>Relatório</h1>
        <p>Ainda não há avaliação salva.</p>
        <button type="button" onClick={onRestart}>
          Fazer avaliação
        </button>
      </section>
    )
  }

  const checklist = checklistFromAssessment(assessment)
  const festivals = suggestFestivals(assessment.score)
  const runtimeText = assessment.runtime ? `${assessment.runtime} minutos` : 'Duração não informada'

  return (
    <section className="stack">
      <h1>Relatório da jornada</h1>
      <h2>Pontuação de prontidão: {assessment.score}/100</h2>
      <section>
        <h2>{assessment.filmTitle}</h2>
        <p>
          {assessment.genre} · {runtimeText}
        </p>
      </section>
      <p>{readinessMessage(assessment.score)}</p>

      <section>
        <h2>Checklist de preparação</h2>
        <ul className="check-list">
          {checklist.map((item) => (
            <li key={item.label}>
              {item.done ? '✓' : '✗'} {item.label}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Festivais sugeridos</h2>
        <p>Indicações a partir da lista de festivais do Git, não de um ranking comercial.</p>
        <div className="card-grid">
          {festivals.map((festival) => (
            <FestivalCard key={festival.id} {...festival} />
          ))}
        </div>
      </section>

      <button type="button" className="ghost" onClick={onRestart}>
        Nova avaliação
      </button>
    </section>
  )
}
