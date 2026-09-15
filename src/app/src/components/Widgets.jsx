import { evaluateFestival, readinessScore, statusLabel } from '../lib/eligibility.js'
import { packageItems, rightsItems } from '../data/checklists.js'
import { useAppState } from '../state/context.js'

export function EligibilityBadge({ result }) {
  return (
    <span className={`badge badge-${result.status}`}>{statusLabel(result.status)}</span>
  )
}

export function ReadinessMeter() {
  const { film, package: packageState, rights } = useAppState()
  const score = readinessScore(film, packageState, rights, packageItems, rightsItems)
  return (
    <div className="meter" aria-label={`Preparação ${score} de 100`}>
      <div className="meter-head">
        <span>Preparação para inscrever</span>
        <strong>{score}/100</strong>
      </div>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export function Checklist({ items, stateMap, onToggle, extra }) {
  const groups = [...new Set(items.map((item) => item.group))]
  return (
    <div className="checklist">
      {groups.map((group) => (
        <section key={group} className="checklist-group">
          <h3>{group}</h3>
          <ul>
            {items
              .filter((item) => item.group === group)
              .map((item) => (
                <li key={item.id}>
                  <label className={stateMap[item.id] ? 'is-done' : ''}>
                    <input
                      type="checkbox"
                      checked={Boolean(stateMap[item.id])}
                      onChange={() => onToggle(item.id)}
                    />
                    <span>
                      <strong>{item.label}</strong>
                      {item.hint ? <em>{item.hint}</em> : null}
                    </span>
                  </label>
                </li>
              ))}
          </ul>
        </section>
      ))}
      {extra}
    </div>
  )
}

export function FestivalCard({ festival, film, onOpen }) {
  const result = evaluateFestival(film, festival)
  return (
    <article className="festival-card">
      <header>
        <p className="eyebrow">
          {festival.city} · {festival.country}
        </p>
        <h3>
          <a href={`#/festivais/${festival.id}`}>{festival.name}</a>
        </h3>
        <EligibilityBadge result={result} />
      </header>
      <p>{festival.focus}</p>
      <ul className="chip-row">
        {festival.openToIndependents ? <li>Independentes</li> : null}
        {festival.openToFirstTimers ? <li>Estreantes</li> : null}
        {festival.duration?.shortMax ? <li>Curta &lt; {festival.duration.shortMax} min</li> : null}
        {festival.hasLabs ? <li>{festival.labsName}</li> : null}
      </ul>
      <button type="button" className="btn-ghost" onClick={onOpen}>
        Ver regulamento resumido
      </button>
    </article>
  )
}

export function PremiereCallout() {
  return (
    <aside className="callout callout-warn">
      <h3>Cuidado com a estreia</h3>
      <p>
        Não publique o documentário integralmente no YouTube, Vimeo público ou plataformas de
        streaming antes de definir a estratégia de festivais. Essa publicação pode eliminar o
        status de estreia. Um link privado com senha para avaliação geralmente não é considerado
        lançamento público.
      </p>
    </aside>
  )
}

export function EmptyFilmHint() {
  const { film, loadSample } = useAppState()
  if (film.originalTitle) return null
  return (
    <div className="empty-film">
      <p>Cadastre o documentário para cruzar duração, estreia e data de conclusão com cada festival.</p>
      <div className="btn-row">
        <a className="btn" href="#/filme">
          Cadastrar filme
        </a>
        <button type="button" className="btn-ghost" onClick={loadSample}>
          Carregar filme de exemplo
        </button>
      </div>
    </div>
  )
}
