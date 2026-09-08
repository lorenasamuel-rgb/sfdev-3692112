export function labelCountry(country, t) {
  const key = `country.${country}`
  const value = t(key)
  return value === key ? country : value
}

export function labelForm(form, t) {
  const key = `form.${form}`
  const value = t(key)
  return value === key ? form : value
}

export function labelFocus(tag, t) {
  const key = `focus.${tag}`
  const value = t(key)
  return value === key ? tag : value
}

export function labelMonth(month, t) {
  const key = `month.${month}`
  const value = t(key)
  return value === key ? month : value
}

export function labelHonour(result, t) {
  const key = `honourResult.${result}`
  const value = t(key)
  return value === key ? result : value
}
