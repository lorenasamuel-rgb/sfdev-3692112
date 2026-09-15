import { stepDefinitions } from '../data/festivals.js'

export function HomePage() {
  return (
    <div className="page home">
      <section className="unit unit-hero">
        <div className="unit-copy">
          <p className="unit-kicker">Rota Doc</p>
          <h1>Inscrever o documentário.</h1>
          <p className="unit-subhead">Não exige distribuidora. Exige regulamento.</p>
          <div className="unit-links">
            <a href="#/filme">
              Cadastrar <span aria-hidden="true">›</span>
            </a>
            <a href="#/festivais">
              Ver festivais <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </section>

      <section className="unit unit-festivals">
        <div className="unit-copy">
          <h2>Festivais.</h2>
          <p className="unit-subhead">Cruze duração, estreia e país com cada casa.</p>
          <div className="unit-links">
            <a href="#/festivais">
              Saiba mais <span aria-hidden="true">›</span>
            </a>
            <a href="#/guia">
              Guia <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </section>

      <section className="unit unit-package">
        <div className="unit-copy">
          <h2>Festival package.</h2>
          <p className="unit-subhead">Prepare uma vez. Reutilize em cada inscrição.</p>
          <div className="unit-links">
            <a href="#/pacote">
              Saiba mais <span aria-hidden="true">›</span>
            </a>
            <a href="#/direitos">
              Direitos <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </section>

      <div className="tile-grid">
        <article className="tile tile-rights">
          <div className="unit-copy">
            <h2>Direitos.</h2>
            <p className="unit-subhead">Música, arquivo, entrevistas e E&amp;O.</p>
            <div className="unit-links">
              <a href="#/direitos">
                Conferir <span aria-hidden="true">›</span>
              </a>
            </div>
          </div>
        </article>
        <article className="tile tile-labs">
          <div className="unit-copy">
            <h2>Labs.</h2>
            <p className="unit-subhead">Mercados e pitching para filmes em desenvolvimento.</p>
            <div className="unit-links">
              <a href="#/laboratorios">
                Saiba mais <span aria-hidden="true">›</span>
              </a>
            </div>
          </div>
        </article>
        <article className="tile tile-submissions">
          <div className="unit-copy">
            <h2>Inscrições.</h2>
            <p className="unit-subhead">Sete passos até o termo de exibição.</p>
            <div className="unit-links">
              <a href="#/inscricoes">
                Acompanhar <span aria-hidden="true">›</span>
              </a>
            </div>
          </div>
        </article>
        <article className="tile tile-steps">
          <div className="unit-copy">
            <h2>Como funciona.</h2>
            <p className="unit-subhead">A inscrição não é garantia de seleção.</p>
          </div>
          <ol className="home-steps">
            {stepDefinitions.map((step) => (
              <li key={step.id}>
                <span>{String(step.number).padStart(2, '0')}</span>
                {step.title}
              </li>
            ))}
          </ol>
        </article>
      </div>

      <section className="unit unit-finale">
        <div className="unit-copy">
          <h2>Duas rotas. Um processo.</h2>
          <p className="unit-subhead">
            Filme finalizado: seleção oficial. Projeto em desenvolvimento: laboratórios e mercados.
          </p>
          <div className="unit-links">
            <a href="#/filme">
              Começar <span aria-hidden="true">›</span>
            </a>
            <a href="#/laboratorios">
              Ver labs <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
