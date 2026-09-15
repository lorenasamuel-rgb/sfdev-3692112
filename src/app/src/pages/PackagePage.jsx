import { packageItems, selectedDeliveryItems } from '../data/checklists.js'
import { Checklist, ReadinessMeter } from '../components/Widgets.jsx'
import { useAppState } from '../state/context.js'

export function PackagePage() {
  const { package: packageState, togglePackage, film } = useAppState()
  const done = packageItems.filter((item) => packageState[item.id]).length

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Festival package</p>
          <h1>Materiais que os festivais pedem</h1>
          <p>
            Prepare o pacote uma vez e reutilize nas inscrições. Se o documentário for selecionado,
            o festival poderá pedir cópia de exibição em DCP ou ProRes, press kit, trailer limpo e
            materiais de acessibilidade.
          </p>
        </div>
        <div className="page-head-aside">
          <ReadinessMeter />
          <p className="muted">
            {done} de {packageItems.length} itens prontos
            {film.originalTitle ? ` · ${film.originalTitle}` : ''}
          </p>
        </div>
      </header>

      <Checklist items={packageItems} stateMap={packageState} onToggle={togglePackage} />

      <section className="panel">
        <h2>Se for selecionado</h2>
        <ul className="plain-list">
          {selectedDeliveryItems.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
