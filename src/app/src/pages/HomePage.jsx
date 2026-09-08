export function HomePage({ onNavigate }) {
  return (
    <section className="stack">
      <h1>Festival Journey</h1>
      <p className="lede">
        Monte uma rota mais inteligente para o filme: leia o arquivo do Git, cruze festivais e
        acompanhe a jornada de prêmios — da seleção oficial até a vitória.
      </p>

      <section>
        <h2>O filme está pronto para festival?</h2>
        <p>
          Festival Journey usa o <strong>Fictional Film Archive</strong> commitado no Git para
          mostrar filmes, festivais e honrarias. Independentes podem avaliar o próprio filme,
          ver lacunas e receber indicações práticas antes de inscrever.
        </p>
        <div className="btn-row">
          <button type="button" onClick={() => onNavigate('assessment')}>
            Começar avaliação
          </button>
          <button type="button" className="ghost" onClick={() => onNavigate('archive')}>
            Ver arquivo de filmes
          </button>
        </div>
      </section>
    </section>
  )
}
