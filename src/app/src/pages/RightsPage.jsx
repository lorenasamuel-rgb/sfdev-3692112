import { rightsItems } from '../data/checklists.js'
import { Checklist } from '../components/Widgets.jsx'
import { useAppState } from '../state/context.js'

export function RightsPage() {
  const { rights, toggleRights } = useAppState()
  const done = rightsItems.filter((item) => rights[item.id]).length

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Antes de inscrever</p>
          <h1>Atenção especial aos direitos</h1>
          <p>
            Música, arquivo, entrevistas e locações precisam estar licenciados. Quem inscreve
            precisa ter autoridade para exibir o filme. Para distribuição posterior, alguns
            compradores também podem exigir seguro de Errors &amp; Omissions (E&amp;O).
          </p>
        </div>
        <p className="muted">
          {done} de {rightsItems.length} conferidos
        </p>
      </header>

      <Checklist items={rightsItems} stateMap={rights} onToggle={toggleRights} />
    </div>
  )
}
