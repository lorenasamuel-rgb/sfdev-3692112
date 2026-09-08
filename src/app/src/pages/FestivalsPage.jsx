import { useMemo, useState } from 'react'
import festivals from '../data/festivals.json'
import { FestivalCard } from '../components/FestivalCard.jsx'

export function FestivalsPage() {
  const [country, setCountry] = useState('all')
  const countries = useMemo(
    () => ['all', ...new Set(festivals.map((festival) => festival.country))].sort(),
    [],
  )
  const visible = festivals.filter(
    (festival) => country === 'all' || festival.country === country,
  )

  return (
    <section className="stack">
      <h1>Festivais</h1>
      <p className="lede">
        {festivals.length} festivais fictícios do arquivo no Git. Use o filtro para cruzar país e
        foco — os nomes e regulamentos são de ensino, não de editais reais.
      </p>

      <label className="form-label" htmlFor="countryFilter">
        País
      </label>
      <select
        id="countryFilter"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      >
        {countries.map((item) => (
          <option key={item} value={item}>
            {item === 'all' ? 'Todos' : item}
          </option>
        ))}
      </select>

      <div className="card-grid">
        {visible.map((festival) => (
          <FestivalCard key={festival.id} {...festival} />
        ))}
      </div>
    </section>
  )
}
