import { useMemo, useState } from 'react'
import films from '../data/films.json'
import { FilmCard } from '../components/FilmCard.jsx'

export function ArchivePage() {
  const [formFilter, setFormFilter] = useState('all')
  const forms = useMemo(
    () => ['all', ...new Set(films.map((film) => film.form))],
    [],
  )
  const visible = films.filter((film) => formFilter === 'all' || film.form === formFilter)

  return (
    <section className="stack">
      <h1>Arquivo de filmes</h1>
      <p className="lede">
        Doze filmes da coleção mais rica (Week 4) no Git. O mesmo componente <code>FilmCard</code>{' '}
        recebe props diferentes em cada cartão.
      </p>

      <label className="form-label" htmlFor="formFilter">
        Forma
      </label>
      <select
        id="formFilter"
        value={formFilter}
        onChange={(event) => setFormFilter(event.target.value)}
      >
        {forms.map((form) => (
          <option key={form} value={form}>
            {form === 'all' ? 'Todas' : form}
          </option>
        ))}
      </select>

      <div className="card-grid">
        {visible.map((film) => (
          <FilmCard
            key={film.id}
            title={film.title}
            year={film.year}
            synopsis={film.synopsis}
            form={film.form}
            country={film.country}
            poster={film.poster}
            posterAlt={film.posterAlt}
            genres={film.genres}
            runtimeSeconds={film.runtimeSeconds}
          />
        ))}
      </div>
    </section>
  )
}
