import { useMemo, useState } from 'react'
import { festivals } from '../data/festivals.js'
import { evaluateFestival } from '../lib/eligibility.js'
import { EmptyFilmHint, FestivalCard } from '../components/Widgets.jsx'
import { useAppState } from '../state/context.js'

export function FestivalsPage() {
  const { film } = useAppState()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('all')
  const [filter, setFilter] = useState('all')

  const rows = useMemo(() => {
    return festivals
      .map((festival) => ({ festival, result: evaluateFestival(film, festival) }))
      .filter(({ festival, result }) => {
        const hay = `${festival.name} ${festival.city} ${festival.country} ${festival.focus}`.toLowerCase()
        if (query && !hay.includes(query.toLowerCase())) return false
        if (region !== 'all' && festival.region !== region) return false
        if (filter === 'eligible' && result.status !== 'eligible') return false
        if (filter === 'labs' && !festival.hasLabs) return false
        if (filter === 'latam' && festival.region !== 'América Latina') return false
        return true
      })
      .sort((a, b) => b.result.score - a.result.score)
  }, [film, query, region, filter])

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Passo 1</p>
          <h1>Escolher os festivais adequados</h1>
          <p>
            Cruze tema, duração, país e estágio com o regulamento de cada casa. Não é preciso ser
            cineasta conhecida: independentes e estreantes também podem inscrever. Cada festival,
            porém, tem regras próprias.
          </p>
        </div>
      </header>

      <EmptyFilmHint />

      <div className="filters">
        <input
          type="search"
          placeholder="Buscar festival, cidade ou tema"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select value={region} onChange={(event) => setRegion(event.target.value)}>
          <option value="all">Todas as regiões</option>
          <option value="América Latina">América Latina</option>
          <option value="Europa">Europa</option>
          <option value="América do Norte">América do Norte</option>
        </select>
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="all">Todos os status</option>
          <option value="eligible">Só elegíveis com meu filme</option>
          <option value="labs">Com laboratório ou mercado</option>
        </select>
      </div>

      <div className="card-grid">
        {rows.map(({ festival }) => (
          <FestivalCard
            key={festival.id}
            festival={festival}
            film={film}
            onOpen={() => {
              window.location.hash = `#/festivais/${festival.id}`
            }}
          />
        ))}
      </div>
      {rows.length === 0 ? <p className="muted">Nenhum festival com esses filtros.</p> : null}
    </div>
  )
}
