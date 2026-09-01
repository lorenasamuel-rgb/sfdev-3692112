import { stepDefinitions } from '../data/festivals.js'
import { PremiereCallout } from '../components/Widgets.jsx'

export function HomePage() {
  return (
    <div className="page home">
      <section className="hero">
        <p className="eyebrow">Para produtores independentes e estreantes</p>
        <h1>Inscrever o documentário em festival não exige distribuidora. Exige regulamento.</h1>
        <p className="lede">
          Um documentário participa de um festival por meio de uma inscrição e, depois, passa por
          uma seleção curatorial. Esta ferramenta ajuda a escolher festivais, montar o pacote,
          checar direitos e acompanhar cada inscrição — sem tratar a inscrição como garantia de
          participação.
        </p>
        <div className="btn-row">
          <a className="btn" href="#/filme">
            Cadastrar meu filme
          </a>
          <a className="btn-ghost" href="#/festivais">
            Ver festivais
          </a>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Como funciona</h2>
          <ol className="steps">
            {stepDefinitions.map((step) => (
              <li key={step.id}>
                <span>{String(step.number).padStart(2, '0')}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="stack">
          <PremiereCallout />
          <aside className="callout">
            <h3>Duas rotas</h3>
            <p>
              Filme <strong>finalizado</strong>: inscrição na seleção oficial. Filme em{' '}
              <strong>desenvolvimento</strong>: laboratórios, mercados e pitching — como o
              MeetMarket do Sheffield DocFest, que aceita projetos em diferentes estágios e
              realizadores estreantes.
            </p>
            <a href="#/laboratorios">Ir para laboratórios e mercados</a>
          </aside>
        </div>
      </section>
    </div>
  )
}
