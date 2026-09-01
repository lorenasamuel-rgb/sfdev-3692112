import { festivals, getFestivalById, stepDefinitions } from '../data/festivals.js'
import { evaluateFestival } from '../lib/eligibility.js'
import { EligibilityBadge } from '../components/Widgets.jsx'
import { useAppState } from '../state/context.js'

const STATUS_OPTIONS = [
  { value: 'considering', label: 'Em análise' },
  { value: 'submitted', label: 'Inscrito' },
  { value: 'awaiting', label: 'Aguardando seleção' },
  { value: 'selected', label: 'Selecionado' },
  { value: 'not_selected', label: 'Não selecionado' },
  { value: 'withdrawn', label: 'Retirado' },
]

export function SubmissionsPage() {
  const { film, submissions, addSubmission, updateSubmission, toggleStep, removeSubmission } =
    useAppState()
  const tracked = new Set(submissions.map((item) => item.festivalId))
  const available = festivals.filter((festival) => !tracked.has(festival.id))

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Acompanhamento</p>
          <h1>Inscrições em andamento</h1>
          <p>
            A inscrição não garante participação. Use os sete passos para não pagar taxa antes de
            conferir estreia, data de conclusão e screener.
          </p>
        </div>
        {available.length ? (
          <label className="inline-add">
            Adicionar festival
            <select
              defaultValue=""
              onChange={(event) => {
                if (event.target.value) addSubmission(event.target.value)
                event.target.value = ''
              }}
            >
              <option value="" disabled>
                Escolher…
              </option>
              {available.map((festival) => (
                <option key={festival.id} value={festival.id}>
                  {festival.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </header>

      {submissions.length === 0 ? (
        <div className="empty-film">
          <p>Nenhuma inscrição ainda. Escolha um festival compatível com o seu filme.</p>
          <a className="btn" href="#/festivais">
            Ir aos festivais
          </a>
        </div>
      ) : (
        <div className="submission-list">
          {submissions.map((item) => {
            const festival = getFestivalById(item.festivalId)
            if (!festival) return null
            const result = evaluateFestival(film, festival)
            return (
              <article key={item.id} className="panel submission">
                <header>
                  <div>
                    <h2>
                      <a href={`#/festivais/${festival.id}`}>{festival.name}</a>
                    </h2>
                    <p className="muted">
                      {festival.city} · {festival.platform}
                    </p>
                  </div>
                  <EligibilityBadge result={result} />
                </header>

                <label>
                  Status
                  <select
                    value={item.status}
                    onChange={(event) => updateSubmission(item.id, { status: event.target.value })}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <ol className="step-checks">
                  {stepDefinitions.map((step) => (
                    <li key={step.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={Boolean(item.steps[step.id])}
                          onChange={() => toggleStep(item.id, step.id)}
                        />
                        <span>
                          {step.number}. {step.title}
                        </span>
                      </label>
                    </li>
                  ))}
                </ol>

                {item.status === 'selected' ? (
                  <p className="note">
                    Selecionado: assine o termo de exibição e envie a cópia final, materiais de
                    divulgação e legendas.
                  </p>
                ) : null}

                <label className="full">
                  Notas
                  <textarea
                    rows="2"
                    value={item.notes}
                    onChange={(event) => updateSubmission(item.id, { notes: event.target.value })}
                    placeholder="Prazo, taxa paga, senha do Vimeo, categoria…"
                  />
                </label>

                <button type="button" className="btn-text" onClick={() => removeSubmission(item.id)}>
                  Remover
                </button>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
