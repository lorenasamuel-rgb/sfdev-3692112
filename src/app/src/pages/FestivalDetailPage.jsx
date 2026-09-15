import { getFestivalById, premiereLabels, stepDefinitions } from '../data/festivals.js'
import { evaluateFestival } from '../lib/eligibility.js'
import { EligibilityBadge } from '../components/Widgets.jsx'
import { useAppState } from '../state/context.js'

export function FestivalDetailPage({ id }) {
  const festival = getFestivalById(id)
  const { film, addSubmission, submissions } = useAppState()

  if (!festival) {
    return (
      <div className="page">
        <h1>Festival não encontrado</h1>
        <a href="#/festivais">Voltar à lista</a>
      </div>
    )
  }

  const result = evaluateFestival(film, festival)
  const already = submissions.some((item) => item.festivalId === festival.id)

  return (
    <div className="page festival-detail">
      <p className="eyebrow">
        <a href="#/festivais">Festivais</a> · {festival.edition} · {festival.platform}
      </p>
      <header className="page-head">
        <div>
          <h1>{festival.name}</h1>
          <p>
            {festival.city}, {festival.country}. {festival.description}
          </p>
        </div>
        <div className="page-head-aside">
          <EligibilityBadge result={result} />
          {already ? (
            <a className="btn" href="#/inscricoes">
              Ver na lista de inscrições
            </a>
          ) : (
            <button type="button" className="btn" onClick={() => addSubmission(festival.id)}>
              Adicionar às inscrições
            </button>
          )}
        </div>
      </header>

      <div className="split">
        <section className="panel">
          <h2>Cruzamento com o seu filme</h2>
          <p className="muted">{result.category.label}</p>
          {result.matches.length ? (
            <ul className="plain-list yes">
              {result.matches.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {result.warnings.map((item) => (
            <p key={item.code} className="note warn">
              {item.message}
            </p>
          ))}
          {result.issues.map((item) => (
            <p key={item.code} className="note bad">
              {item.message}
            </p>
          ))}
        </section>

        <section className="panel">
          <h2>Exigências típicas de estreia</h2>
          <ul className="plain-list">
            {festival.premierePrograms.map((program) => {
              const ok = result.eligiblePrograms.includes(program)
              return (
                <li key={program.name}>
                  <strong>{program.name}</strong> — {premiereLabels[program.required]}
                  <span className={ok ? 'ok' : 'no'}>{ok ? ' possível' : ' bloqueada'}</span>
                  <em>{program.note}</em>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <section className="panel">
        <h2>Regulamento em resumo</h2>
        <dl className="spec">
          <div>
            <dt>Finalizado / WIP</dt>
            <dd>
              {festival.acceptsFinished ? 'Finalizados sim. ' : 'Finalizados não. '}
              {festival.acceptsWip ? 'Aceita work in progress.' : 'Seleção oficial pede filme fechado.'}
            </dd>
          </div>
          <div>
            <dt>Duração</dt>
            <dd>{festival.duration.notes}</dd>
          </div>
          <div>
            <dt>Conclusão</dt>
            <dd>
              {festival.completionAfter
                ? `Edição de referência pedia conclusão depois de ${festival.completionAfter}. `
                : ''}
              {festival.completionMaxMonths
                ? `Janela típica: últimos ${festival.completionMaxMonths} meses.`
                : 'Confirme a data no edital.'}
            </dd>
          </div>
          <div>
            <dt>Legendas</dt>
            <dd>{festival.englishSubtitlesWhen}</dd>
          </div>
          <div>
            <dt>Taxa</dt>
            <dd>{festival.feeNote}</dd>
          </div>
          <div>
            <dt>Screener</dt>
            <dd>Link privado, válido até o fim da seleção, sem bloqueio geográfico.</dd>
          </div>
        </dl>
        <p className="muted">
          Este resumo não substitui o edital. Sempre leia o regulamento vigente antes de divulgar o
          filme ou pagar a taxa.
        </p>
        <div className="btn-row">
          <a className="btn" href={festival.website} target="_blank" rel="noreferrer">
            Abrir regulamento oficial
          </a>
          {festival.labsUrl ? (
            <a className="btn-ghost" href={festival.labsUrl} target="_blank" rel="noreferrer">
              {festival.labsName || 'Labs'}
            </a>
          ) : null}
        </div>
      </section>

      <section>
        <h2>Depois de escolher este festival</h2>
        <ol className="steps compact">
          {stepDefinitions.slice(1).map((step) => (
            <li key={step.id}>
              <span>{String(step.number).padStart(2, '0')}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
