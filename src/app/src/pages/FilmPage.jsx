import { ReadinessMeter } from '../components/Widgets.jsx'
import { useAppState } from '../state/context.js'

export function FilmPage() {
  const { film, updateFilm, loadSample } = useAppState()

  function field(name, kind = 'text') {
    if (kind === 'checkbox') {
      return {
        checked: Boolean(film[name]),
        onChange: (event) => updateFilm({ [name]: event.target.checked }),
      }
    }
    return {
      value: film[name] ?? '',
      onChange: (event) => updateFilm({ [name]: event.target.value }),
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Ficha do documentário</p>
          <h1>O filme que você vai inscrever</h1>
          <p>
            Duração, data de conclusão, estreia e idioma definem a elegibilidade. Independentes e
            estreantes podem inscrever — desde que o filme caiba no regulamento.
          </p>
        </div>
        <div className="page-head-aside">
          <ReadinessMeter />
          <button type="button" className="btn-ghost" onClick={loadSample}>
            Preencher com exemplo
          </button>
        </div>
      </header>

      <form className="dossier" onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <legend>Identidade</legend>
          <label>
            Título original
            <input required {...field('originalTitle')} placeholder="A Casa do Rio" />
          </label>
          <label>
            Título em inglês
            <input {...field('englishTitle')} placeholder="The River House" />
          </label>
          <label className="full">
            Logline
            <textarea rows="2" {...field('logline')} placeholder="Uma ou duas frases." />
          </label>
          <label className="full">
            Sinopse curta
            <textarea rows="3" {...field('shortSynopsis')} />
          </label>
          <label className="full">
            Sinopse completa
            <textarea rows="5" {...field('fullSynopsis')} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Ficha técnica</legend>
          <label>
            Duração (minutos)
            <input type="number" min="1" {...field('durationMinutes')} />
          </label>
          <label>
            Data de conclusão
            <input type="date" {...field('completionDate')} />
          </label>
          <label>
            País de produção
            <input {...field('productionCountry')} placeholder="Brasil" />
          </label>
          <label>
            Idiomas do áudio
            <input {...field('languages')} placeholder="português" />
          </label>
          <label>
            Estágio
            <select {...field('stage')}>
              <option value="finished">Documentário finalizado</option>
              <option value="wip">Work in progress</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <legend>Estreia e publicação</legend>
          <label>
            Maior estreia já realizada
            <select {...field('premiereStatus')}>
              <option value="none">Ainda não estreou</option>
              <option value="national">Estreia nacional</option>
              <option value="european">Estreia europeia</option>
              <option value="international">Estreia internacional</option>
              <option value="world">Estreia mundial (já usada)</option>
            </select>
          </label>
          <label className="check">
            <input type="checkbox" {...field('publishedPublicly', 'checkbox')} />
            O filme inteiro já está público (YouTube, Vimeo público ou streaming)
          </label>
        </fieldset>

        <fieldset>
          <legend>Screener</legend>
          <label>
            Link privado
            <input type="url" {...field('screenerUrl')} placeholder="https://vimeo.com/..." />
          </label>
          <label>
            Senha
            <input {...field('screenerPassword')} />
          </label>
          <label className="check">
            <input type="checkbox" {...field('hasEnglishSubtitles', 'checkbox')} />
            Screener com legendas em inglês
          </label>
          <label className="check">
            <input type="checkbox" {...field('hasSrt', 'checkbox')} />
            Arquivo .srt disponível
          </label>
        </fieldset>

        <fieldset>
          <legend>Quem inscreve</legend>
          <label>
            Direção
            <input {...field('directorName')} />
          </label>
          <label>
            Produtor ou responsável
            <input {...field('producerName')} />
          </label>
          <label>
            E-mail
            <input type="email" {...field('producerEmail')} />
          </label>
          <label>
            Telefone
            <input {...field('producerPhone')} />
          </label>
          <label className="full">
            Biografia da direção
            <textarea rows="3" {...field('directorBio')} />
          </label>
          <label className="full">
            Declaração da direção
            <textarea rows="3" {...field('directorStatement')} />
          </label>
        </fieldset>
      </form>
    </div>
  )
}
