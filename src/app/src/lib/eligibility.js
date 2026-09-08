import { defaultLocale, translate } from '../i18n/translate.js'
import { formatDate as formatDateValue } from './dates.js'

const MONTH_MS = 1000 * 60 * 60 * 24 * 30.4375

/** O que o filme ainda pode oferecer, dado o maior status de estreia já usado. */
const CAN_STILL_OFFER = {
  none: ['none', 'national', 'european', 'international', 'world'],
  national: ['none', 'european', 'international'],
  european: ['none', 'national'],
  international: ['none', 'national', 'european'],
  world: ['none', 'national'],
}

export function monthsSince(dateString, now = new Date()) {
  if (!dateString) return null
  const completed = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(completed.getTime())) return null
  return (now.getTime() - completed.getTime()) / MONTH_MS
}

export function filmHasEnglishAudio(film) {
  const languages = (film.languages ?? '')
    .toLowerCase()
    .split(/[,/;]+/)
    .map((part) => part.trim())
  return languages.some((language) =>
    ['english', 'inglês', 'ingles', 'en'].includes(language),
  )
}

export function durationCategory(minutes, festival, locale = defaultLocale) {
  const t = (key, vars) => translate(locale, key, vars)
  if (!minutes || minutes <= 0) return { id: 'unknown', label: t('elig.durationUnknown') }
  const shortMax = festival?.duration?.shortMax ?? 40
  const mediumMax = festival?.duration?.mediumMax ?? null
  if (minutes < shortMax) return { id: 'short', label: t('elig.durationShort', { max: shortMax }) }
  if (mediumMax && minutes < mediumMax) {
    return {
      id: 'medium',
      label: t('elig.durationMedium', { min: shortMax, max: mediumMax - 1 }),
    }
  }
  return { id: 'feature', label: t('elig.durationFeature', { minutes }) }
}

export function premiereCovers(filmStatus, required) {
  const need = required || 'none'
  const have = filmStatus || 'none'
  const still = CAN_STILL_OFFER[have] ?? CAN_STILL_OFFER.none
  return still.includes(need)
}

function formOverlapsFestival(filmForm, festival) {
  const form = (filmForm || '').toLowerCase()
  if (!form) return null
  const tags = (festival.focusTags ?? []).map((tag) => tag.toLowerCase())
  if (!tags.length) return null
  if (tags.includes(form)) return true
  if (form === 'documentary' && tags.includes('social practice')) return true
  if (form === 'animation' && tags.includes('music video')) return true
  if (form === 'experimental' && tags.includes('visual culture')) return true
  const generic = tags.includes('short film') || tags.includes('new voices') || tags.includes('place') || tags.includes('climate')
  if (generic && !tags.some((tag) => ['documentary', 'animation', 'experimental', 'music video'].includes(tag))) {
    return true
  }
  if (tags.some((tag) => ['documentary', 'animation', 'experimental', 'music video'].includes(tag))) {
    return false
  }
  return true
}

export function evaluateFestival(film, festival, now = new Date(), locale = defaultLocale) {
  const t = (key, vars) => translate(locale, key, vars)
  const issues = []
  const warnings = []
  const matches = []

  const stage = film.stage || 'finished'
  const minutes = Number(film.durationMinutes) || 0
  const category = durationCategory(minutes, festival, locale)
  const ageMonths = monthsSince(film.completionDate, now)

  if (stage === 'wip' && !festival.acceptsWip) {
    issues.push({
      code: 'wip',
      message: t('elig.wip', {
        name: festival.name,
        labs: festival.labsName || t('elig.labsFallback'),
      }),
    })
  } else if (stage === 'wip' && festival.acceptsWip) {
    matches.push(t('elig.wipOk'))
  } else if (stage === 'finished' && festival.acceptsFinished) {
    matches.push(t('elig.finishedOk'))
  }

  if (festival.openToIndependents) {
    matches.push(t('elig.independents'))
  }
  if (festival.openToFirstTimers) {
    matches.push(t('elig.firstTimers'))
  }

  if (!minutes) {
    warnings.push({
      code: 'duration-missing',
      message: t('elig.durationMissing'),
    })
  } else if (festival.duration?.shortOnly && minutes >= (festival.duration.shortMax ?? 40)) {
    issues.push({
      code: 'too-long',
      message: t('elig.tooLong', { max: festival.duration.shortMax ?? 40, minutes }),
    })
  } else {
    matches.push(t('elig.durationMatch', { label: category.label }))
  }

  const formFit = formOverlapsFestival(film.form, festival)
  if (formFit === false) {
    warnings.push({
      code: 'form-mismatch',
      message: t('elig.formMismatch', {
        focus: festival.focus,
        form: t(`form.${film.form}`) === `form.${film.form}` ? film.form : t(`form.${film.form}`),
      }),
    })
  } else if (formFit === true && film.form) {
    matches.push(
      t('elig.formMatch', {
        form: t(`form.${film.form}`) === `form.${film.form}` ? film.form : t(`form.${film.form}`),
      }),
    )
  }

  if (festival.completionAfter && film.completionDate) {
    if (film.completionDate < festival.completionAfter) {
      issues.push({
        code: 'too-old-date',
        message: t('elig.tooOldDate', { date: formatDateValue(festival.completionAfter, locale) }),
      })
    } else {
      matches.push(t('elig.afterDate', { date: formatDateValue(festival.completionAfter, locale) }))
    }
  } else if (festival.completionMaxMonths && ageMonths != null) {
    if (ageMonths > festival.completionMaxMonths) {
      issues.push({
        code: 'too-old',
        message: t('elig.tooOld', {
          age: Math.floor(ageMonths),
          max: festival.completionMaxMonths,
        }),
      })
    } else if (ageMonths < 0) {
      warnings.push({
        code: 'future-date',
        message: t('elig.futureDate'),
      })
    } else {
      matches.push(t('elig.inWindow', { max: festival.completionMaxMonths }))
    }
  } else if (festival.completionMaxMonths && !film.completionDate) {
    warnings.push({
      code: 'completion-missing',
      message: t('elig.completionMissing', { max: festival.completionMaxMonths }),
    })
  }

  if (film.publishedPublicly) {
    issues.push({
      code: 'public-release',
      message: t('elig.publicRelease'),
    })
  }

  const eligiblePrograms = (festival.premierePrograms ?? []).filter((program) => {
    if (film.publishedPublicly) return program.required === 'none'
    return premiereCovers(film.premiereStatus || 'none', program.required)
  })
  const blockedPrograms = (festival.premierePrograms ?? []).filter(
    (program) => !eligiblePrograms.includes(program),
  )

  if (blockedPrograms.length && eligiblePrograms.length) {
    warnings.push({
      code: 'premiere-partial',
      message: t('elig.premierePartial', { names: blockedPrograms.map((p) => p.name).join(', ') }),
    })
  } else if (blockedPrograms.length && !eligiblePrograms.length) {
    issues.push({
      code: 'premiere-blocked',
      message: t('elig.premiereBlocked'),
    })
  } else if (eligiblePrograms.length) {
    matches.push(t('elig.sections', { names: eligiblePrograms.map((program) => program.name).join(', ') }))
  }

  const audioIsEnglish = filmHasEnglishAudio(film)
  if (festival.englishSubtitlesRequired && !audioIsEnglish && !film.hasEnglishSubtitles) {
    const message = t('elig.subs')
    if (!film.languages) {
      warnings.push({ code: 'subs', message: t('elig.subsAsk', { message }) })
    } else {
      issues.push({ code: 'subs', message })
    }
  } else if (festival.englishSubtitlesRequired && film.hasEnglishSubtitles) {
    matches.push(t('elig.subsOk'))
  } else if (festival.englishSubtitlesRequired && audioIsEnglish) {
    matches.push(t('elig.audioEn'))
  }

  if (!film.screenerUrl) {
    warnings.push({
      code: 'screener',
      message: t('elig.screenerMissing'),
    })
  } else {
    matches.push(t('elig.screenerOk'))
  }

  let status = 'eligible'
  if (issues.length) status = 'ineligible'
  else if (warnings.length) status = 'review'

  const score = Math.max(
    0,
    100 - issues.length * 28 - warnings.length * 10 + Math.min(matches.length * 3, 15),
  )

  return {
    status,
    score: Math.min(100, score),
    issues,
    warnings,
    matches,
    category,
    eligiblePrograms,
    blockedPrograms,
  }
}

export function readinessScore(film, packageState, rightsState, packageItems, rightsItems) {
  let score = 20
  if (film.originalTitle) score += 6
  if (film.englishTitle) score += 4
  if (film.logline) score += 6
  if (film.durationMinutes) score += 6
  if (film.completionDate) score += 6
  if (film.productionCountry) score += 4
  if (film.languages) score += 4
  if (film.stage === 'finished') score += 8
  if ((film.premiereStatus || 'none') === 'none' && !film.publishedPublicly) score += 10
  if (film.hasEnglishSubtitles) score += 6
  if (film.screenerUrl) score += 8
  if (film.producerEmail) score += 4

  const packageDone = packageItems.filter((item) => packageState[item.id]).length
  const rightsDone = rightsItems.filter((item) => rightsState[item.id]).length
  score += Math.round((packageDone / packageItems.length) * 12)
  score += Math.round((rightsDone / rightsItems.length) * 12)

  if (film.publishedPublicly) score -= 20
  return Math.max(0, Math.min(100, score))
}

export function formatDate(iso, locale = defaultLocale) {
  return formatDateValue(iso, locale)
}

export function statusLabel(status, locale = defaultLocale) {
  if (status === 'eligible') return translate(locale, 'status.eligible')
  if (status === 'review') return translate(locale, 'status.review')
  if (status === 'ineligible') return translate(locale, 'status.ineligible')
  return status
}
