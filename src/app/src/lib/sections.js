export const SECTION_FLOW = [
  { href: '#/guia', id: 'guia' },
  { href: '#/filme', id: 'filme' },
  { href: '#/festivais', id: 'festivais' },
  { href: '#/pacote', id: 'pacote' },
  { href: '#/direitos', id: 'direitos' },
  { href: '#/inscricoes', id: 'inscricoes' },
]

export const PRIMARY_NAV = [
  { href: '#/filme', id: 'filme' },
  { href: '#/festivais', id: 'festivais' },
  { href: '#/pacote', id: 'pacote' },
  { href: '#/direitos', id: 'direitos' },
  { href: '#/inscricoes', id: 'inscricoes' },
]

export const MORE_NAV = [
  { href: '#/guia', id: 'guia' },
  { href: '#/laboratorios', id: 'laboratorios' },
  { href: '#/arquivo', id: 'arquivo' },
  { href: '#/premios', id: 'premios' },
]

export function sectionNeighbors(id) {
  const index = SECTION_FLOW.findIndex((item) => item.id === id)
  if (index < 0) return { prev: null, next: null }
  return {
    prev: index > 0 ? SECTION_FLOW[index - 1] : null,
    next: index < SECTION_FLOW.length - 1 ? SECTION_FLOW[index + 1] : null,
  }
}
