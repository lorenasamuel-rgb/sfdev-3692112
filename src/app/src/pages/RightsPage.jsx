import { rightsItemIds } from '../data/checklists.js'
import { Checklist } from '../components/Widgets.jsx'
import { useAppState } from '../state/context.js'
import { useLanguage } from '../i18n/context.js'

export function RightsPage() {
  const { rights, toggleRights } = useAppState()
  const { t } = useLanguage()
  const items = rightsItemIds.map((id) => ({
    id,
    group: t(`rightsItems.${id}.group`),
    label: t(`rightsItems.${id}.label`),
    hint: t(`rightsItems.${id}.hint`),
  }))
  const done = rightsItemIds.filter((id) => rights[id]).length

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{t('rights.eyebrow')}</p>
          <h1>{t('rights.title')}</h1>
          <p>{t('rights.lede')}</p>
        </div>
        <p className="muted">{t('rights.done', { done, total: rightsItemIds.length })}</p>
      </header>

      <Checklist items={items} stateMap={rights} onToggle={toggleRights} />
    </div>
  )
}
