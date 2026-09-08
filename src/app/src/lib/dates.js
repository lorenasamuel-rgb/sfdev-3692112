import { defaultLocale } from '../i18n/translate.js'

export function formatDate(iso, locale = defaultLocale) {
  if (!iso) return '—'
  const [year, month, day] = iso.split('-')
  if (!year || !month || !day) return iso
  if (locale === 'en') return `${day} ${monthName(month, 'en')} ${year}`
  return `${day}/${month}/${year}`
}

function monthName(month, locale) {
  const names = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  }
  return (names[locale] ?? names.en)[Number(month) - 1] ?? month
}
