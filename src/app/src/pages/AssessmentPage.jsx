import { useState } from 'react'
import { scoreAssessment } from '../lib/assessment.js'

const EMPTY = {
  filmTitle: '',
  genre: 'Documentary',
  runtime: '',
  premiere: 'no',
  pressKit: 'yes',
  trailer: 'yes',
}

export function AssessmentPage({ onComplete }) {
  const [form, setForm] = useState(EMPTY)

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const score = scoreAssessment(form)
    onComplete({
      ...form,
      runtime: form.runtime === '' ? null : Number(form.runtime),
      score,
    })
  }

  return (
    <section className="stack">
      <h1>Avaliação do filme</h1>
      <p className="lede">
        Mesmo fluxo da Week 2, agora em React: título, forma, duração, estreia e materiais. A
        pontuação continua no navegador.
      </p>

      <form className="assessment-form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="filmTitle">
          Título do filme
        </label>
        <input
          id="filmTitle"
          required
          value={form.filmTitle}
          onChange={(event) => update('filmTitle', event.target.value)}
        />

        <label className="form-label" htmlFor="genre">
          Gênero / forma
        </label>
        <select
          id="genre"
          value={form.genre}
          onChange={(event) => update('genre', event.target.value)}
        >
          <option>Drama</option>
          <option>Documentary</option>
          <option>Comedy</option>
          <option>Animation</option>
          <option>Experimental</option>
        </select>

        <label className="form-label" htmlFor="runtime">
          Duração (minutos)
        </label>
        <input
          id="runtime"
          type="number"
          min="1"
          value={form.runtime}
          onChange={(event) => update('runtime', event.target.value)}
        />

        <label className="form-label" htmlFor="premiere">
          O filme já estreou em público?
        </label>
        <select
          id="premiere"
          value={form.premiere}
          onChange={(event) => update('premiere', event.target.value)}
        >
          <option value="no">Não</option>
          <option value="yes">Sim</option>
        </select>

        <label className="form-label" htmlFor="pressKit">
          Há press kit?
        </label>
        <select
          id="pressKit"
          value={form.pressKit}
          onChange={(event) => update('pressKit', event.target.value)}
        >
          <option value="yes">Sim</option>
          <option value="no">Não</option>
        </select>

        <label className="form-label" htmlFor="trailer">
          Há trailer?
        </label>
        <select
          id="trailer"
          value={form.trailer}
          onChange={(event) => update('trailer', event.target.value)}
        >
          <option value="yes">Sim</option>
          <option value="no">Não</option>
        </select>

        <button type="submit">Ver pontuação de prontidão</button>
      </form>
    </section>
  )
}
