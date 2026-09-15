export function FestivalCard({ name, city, country, usualMonth, focus = [], format = [], description }) {
  return (
    <article className="festival-card">
      <p className="film-card__meta">
        {city}, {country} · {usualMonth}
      </p>
      <h3>{name}</h3>
      <p>{description}</p>
      <ul className="tag-list">
        {focus.map((item) => (
          <li key={item}>{item}</li>
        ))}
        {format.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
