import { useState } from 'react'
import { formatRuntime, posterSrc } from '../lib/format.js'

export function FilmCard({
  title,
  year,
  synopsis,
  form,
  country,
  poster,
  posterAlt,
  genres = [],
  runtimeSeconds,
  directors,
}) {
  const [shortlisted, setShortlisted] = useState(false)
  const image = posterSrc(poster)
  const genreLabel = genres.filter(Boolean).join(' · ')

  return (
    <article className={`film-card${shortlisted ? ' is-shortlisted' : ''}`}>
      {image ? (
        <img className="film-card__poster" src={image} alt={posterAlt || `Poster of ${title}`} />
      ) : (
        <div className="film-card__poster film-card__poster--empty" aria-hidden="true">
          Sem cartaz
        </div>
      )}
      <div className="film-card__body">
        <p className="film-card__meta">
          {year} · {form} · {country}
        </p>
        <h3>{title}</h3>
        {directors ? <p className="film-card__directors">{directors}</p> : null}
        <p className="film-card__synopsis">{synopsis}</p>
        <p className="film-card__details">
          {formatRuntime(runtimeSeconds)}
          {genreLabel ? ` · ${genreLabel}` : ''}
        </p>
        <button
          type="button"
          className="ghost"
          onClick={() => setShortlisted((current) => !current)}
        >
          {shortlisted ? 'Na shortlist' : 'Adicionar à shortlist'}
        </button>
      </div>
    </article>
  )
}
