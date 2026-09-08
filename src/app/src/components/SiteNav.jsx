const LINKS = [
  { id: 'home', label: 'Início' },
  { id: 'archive', label: 'Arquivo' },
  { id: 'festivals', label: 'Festivais' },
  { id: 'awards', label: 'Prêmios' },
  { id: 'assessment', label: 'Avaliação' },
]

export function SiteNav({ page, onNavigate }) {
  return (
    <header className="site-header">
      <p className="brand">Festival Journey</p>
      <nav aria-label="Seções">
        {LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            className={page === link.id || (link.id === 'assessment' && page === 'report') ? 'nav-link is-active' : 'nav-link'}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
