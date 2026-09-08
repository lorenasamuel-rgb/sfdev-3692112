import { useMemo, useState } from 'react'
import { FilmCard } from '../components/FilmCard.jsx'
import { buildAwardJourneys, JOURNEY_STAGES } from '../lib/awardsJourney.js'

export function AwardsPage() {
  const journeys = useMemo(() => buildAwardJourneys(), [])
  const [onlyComplete, setOnlyComplete] = useState(true)
  const visible = onlyComplete ? journeys.filter((journey) => journey.complete) : journeys

  return (
    <section className="stack">
      <h1>Jornada de prêmios</h1>
      <p className="lede">
        Cada filme do arquivo conectado tem honrarias ligadas a festivais e prêmios. A jornada
        completa vai da seleção oficial à indicação e à vitória.
      </p>

      <label className="check-row">
        <input
          type="checkbox"
          checked={onlyComplete}
          onChange={(event) => setOnlyComplete(event.target.checked)}
        />
        Mostrar só jornadas completas ({journeys.filter((journey) => journey.complete).length})
      </label>

      <ol className="journey-list">
        {visible.map((journey) => (
          <li key={journey.film.id} className="journey-item">
            <FilmCard
              title={journey.film.title}
              year={journey.film.year}
              synopsis={journey.film.synopsis}
              form={journey.film.form}
              country={journey.film.country}
              poster={journey.film.poster}
              posterAlt={journey.film.posterAlt}
              genres={journey.film.genres}
              runtimeSeconds={journey.film.runtimeSeconds}
              directors={journey.directors}
            />
            <ol className="timeline">
              {journey.events.map((event, index) => (
                <li key={`${event.bodyId}-${event.result}-${index}`}>
                  <span className={`stage stage--${event.result.replace(/\s+/g, '-').toLowerCase()}`}>
                    {event.result}
                  </span>
                  <strong>{event.bodyName}</strong>
                  <span>
                    {event.year}
                    {event.section ? ` · ${event.section}` : ''}
                  </span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <p className="hint">
        Etapas possíveis no Git: {JOURNEY_STAGES.join(' → ')}.
      </p>
    </section>
  )
}
