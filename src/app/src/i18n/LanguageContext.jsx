import { useCallback, useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './context.js'
import { defaultLocale, translate } from './translate.js'
import { strings } from './strings.js'

const STORAGE_KEY = 'rota-doc-locale'

function readLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'pt') return saved
  } catch {
    /* ignore */
  }
  return defaultLocale
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(readLocale)

  const setLocale = useCallback((next) => {
    setLocaleState(next === 'en' ? 'en' : 'pt')
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale === 'en' ? 'en' : 'pt-BR'
    document.title = strings[locale].meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', strings[locale].meta.description)
  }, [locale])

  const t = useCallback((key, vars) => translate(locale, key, vars), [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
