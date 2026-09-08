import { strings } from './strings.js'

export const defaultLocale = 'pt'

export function interpolate(value, vars = {}) {
  return value.replace(/\{(\w+)\}/g, (_, key) => (vars[key] == null ? '' : String(vars[key])))
}

export function translate(locale, key, vars) {
  const dict = strings[locale] ?? strings[defaultLocale]
  const fallback = strings[defaultLocale]
  const value = key.split('.').reduce((node, part) => node?.[part], dict)
  const backup = key.split('.').reduce((node, part) => node?.[part], fallback)
  const resolved = typeof value === 'string' ? value : typeof backup === 'string' ? backup : key
  return interpolate(resolved, vars)
}
