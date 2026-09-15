import { packageItemIds, selectedDeliveryIds } from '../data/checklists.js'
import { Checklist, ReadinessMeter } from '../components/Widgets.jsx'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

export function PackagePage() {
  const { package: packageState, togglePackage, film } = useAppState()
  const { t } = useLanguage()
  const items = packageItemIds.map((id) => ({
    id,
    group: t(`packageItems.${id}.group`),
    label: t(`packageItems.${id}.label`),
    hint: t(`packageItems.${id}.hint`),
  }))
  const done = packageItemIds.filter((id) => packageState[id]).length

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{t('package.eyebrow')}</p>
          <h1>{t('package.title')}</h1>
          <p>{t('package.lede')}</p>
        </div>
        <div className="page-head-aside">
          <ReadinessMeter />
          <p className="muted">
            {t('package.done', { done, total: packageItemIds.length })}
            {film.originalTitle ? ` · ${film.originalTitle}` : ''}
          </p>
        </div>
      </header>

      <Checklist items={items} stateMap={packageState} onToggle={togglePackage} />

      <section className="panel">
        <h2>{t('package.selected')}</h2>
        <ul className="plain-list">
          {selectedDeliveryIds.map((id) => (
            <li key={id}>{t(`deliveryItems.${id}`)}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
