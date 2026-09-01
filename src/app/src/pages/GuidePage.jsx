import { commonRequirements } from '../data/checklists.js'
import { PremiereCallout } from '../components/Widgets.jsx'

export function GuidePage() {
  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Regulamento</p>
          <h1>Requisitos mais comuns</h1>
          <p>
            Cada festival possui regulamento próprio. Use esta lista como roteiro de leitura do
            edital — nunca como substituto.
          </p>
        </div>
      </header>

      <div className="req-table">
        {commonRequirements.map((item) => (
          <article key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.meaning}</p>
          </article>
        ))}
      </div>

      <PremiereCallout />

      <section className="split">
        <article className="panel">
          <h2>Sheffield DocFest</h2>
          <p>
            Recebe documentários finalizados, de qualquer duração e de vários países. Em 2026,
            considerava curta a produção com menos de 40 minutos e cobrava taxas diferentes
            conforme a duração e o prazo de inscrição.
          </p>
          <a href="https://www.sheffdocfest.com/film-programme-entries" target="_blank" rel="noreferrer">
            Film Programme Entries
          </a>
        </article>
        <article className="panel">
          <h2>IDFA 2026</h2>
          <p>
            Exigiu formulário completo, pagamento, screener com legendas em inglês e documentários
            concluídos depois de uma data determinada. Algumas competições também exigiram estreia
            mundial, internacional ou europeia.
          </p>
          <a
            href="https://professionals.idfa.nl/program/festival-entries/festival-entry-regulations/"
            target="_blank"
            rel="noreferrer"
          >
            Festival Entry Regulations
          </a>
        </article>
      </section>
    </div>
  )
}

export function LabsPage() {
  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Desenvolvimento</p>
          <h1>Laboratórios, mercados e pitching</h1>
          <p>
            Se o documentário ainda estiver em desenvolvimento, a rota é outra: apresenta-se o
            projeto para buscar financiamento, coprodução ou distribuição — não uma cópia final
            para seleção oficial.
          </p>
        </div>
      </header>

      <section className="panel">
        <h2>Quando usar esta rota</h2>
        <ul className="plain-list">
          <li>Imagem e som ainda não estão fechados.</li>
          <li>Você busca coprodutor, fundo ou agente de vendas.</li>
          <li>É um primeiro filme e precisa de laboratório de desenvolvimento.</li>
        </ul>
      </section>

      <div className="card-grid">
        <article className="festival-card">
          <p className="eyebrow">Sheffield</p>
          <h3>MeetMarket</h3>
          <p>
            Aceita projetos em diferentes estágios e também realizadores estreantes. Inscrição
            distinta da seleção de filmes finalizados.
          </p>
          <a href="https://www.sheffdocfest.com/meetmarket-entries" target="_blank" rel="noreferrer">
            MeetMarket Entries
          </a>
        </article>
        <article className="festival-card">
          <p className="eyebrow">Amsterdã</p>
          <h3>IDFA Forum</h3>
          <p>Mercado de coprodução ligado ao IDFA, para projetos e filmes em busca de parceiros.</p>
        </article>
        <article className="festival-card">
          <p className="eyebrow">Copenhague</p>
          <h3>CPH:FORUM</h3>
          <p>Mercado do CPH:DOX para documentários em desenvolvimento.</p>
        </article>
        <article className="festival-card">
          <p className="eyebrow">Toronto</p>
          <h3>Hot Docs Forum</h3>
          <p>Encontros de indústria e Deal Maker para financiamento e distribuição.</p>
        </article>
      </div>
    </div>
  )
}
