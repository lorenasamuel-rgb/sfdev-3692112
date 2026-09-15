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

export function durationCategory(minutes, festival) {
  if (!minutes || minutes <= 0) return { id: 'unknown', label: 'Duração não informada' }
  const shortMax = festival?.duration?.shortMax ?? 40
  const mediumMax = festival?.duration?.mediumMax ?? null
  if (minutes < shortMax) return { id: 'short', label: `Curta (menos de ${shortMax} min)` }
  if (mediumMax && minutes < mediumMax) {
    return { id: 'medium', label: `Média (${shortMax}–${mediumMax - 1} min)` }
  }
  return { id: 'feature', label: `Longa (${minutes} min)` }
}

export function premiereCovers(filmStatus, required) {
  const need = required || 'none'
  const have = filmStatus || 'none'
  const still = CAN_STILL_OFFER[have] ?? CAN_STILL_OFFER.none
  return still.includes(need)
}

export function evaluateFestival(film, festival, now = new Date()) {
  const issues = []
  const warnings = []
  const matches = []

  const stage = film.stage || 'finished'
  const minutes = Number(film.durationMinutes) || 0
  const category = durationCategory(minutes, festival)
  const ageMonths = monthsSince(film.completionDate, now)

  if (stage === 'wip' && !festival.acceptsWip) {
    issues.push({
      code: 'wip',
      message: `${festival.name} seleciona documentários finalizados. Para este estágio, veja ${festival.labsName || 'laboratórios e mercados'}.`,
    })
  } else if (stage === 'wip' && festival.acceptsWip) {
    matches.push('Aceita work in progress.')
  } else if (stage === 'finished' && festival.acceptsFinished) {
    matches.push('Aceita documentário finalizado.')
  }

  if (festival.openToIndependents) {
    matches.push('Aberto a produtores independentes.')
  }
  if (festival.openToFirstTimers) {
    matches.push('Estreantes podem inscrever.')
  }

  if (!minutes) {
    warnings.push({
      code: 'duration-missing',
      message: 'Informe a duração para enquadrar curta, média ou longa.',
    })
  } else {
    matches.push(`Categoria provável: ${category.label}.`)
  }

  if (festival.completionAfter && film.completionDate) {
    if (film.completionDate < festival.completionAfter) {
      issues.push({
        code: 'too-old-date',
        message: `O festival pediu filmes concluídos depois de ${formatDate(festival.completionAfter)}.`,
      })
    } else {
      matches.push(`Conclusão depois de ${formatDate(festival.completionAfter)}.`)
    }
  } else if (festival.completionMaxMonths && ageMonths != null) {
    if (ageMonths > festival.completionMaxMonths) {
      issues.push({
        code: 'too-old',
        message: `Concluído há cerca de ${Math.floor(ageMonths)} meses. A janela típica deste festival é de ${festival.completionMaxMonths} meses.`,
      })
    } else if (ageMonths < 0) {
      warnings.push({
        code: 'future-date',
        message: 'A data de conclusão está no futuro. Confirme se o filme já pode ser inscrito como finalizado.',
      })
    } else {
      matches.push(`Dentro da janela de conclusão (${festival.completionMaxMonths} meses).`)
    }
  } else if (festival.completionMaxMonths && !film.completionDate) {
    warnings.push({
      code: 'completion-missing',
      message: `Informe a data de conclusão. Este festival costuma pedir os últimos ${festival.completionMaxMonths} meses.`,
    })
  }

  if (film.publishedPublicly) {
    issues.push({
      code: 'public-release',
      message:
        'O filme foi publicado integralmente em plataforma pública. Isso costuma eliminar o status de estreia e pode tornar o filme inelegível para competições importantes.',
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
      message: `Com o status de estreia atual, algumas seções ficam indisponíveis (${blockedPrograms.map((p) => p.name).join(', ')}).`,
    })
  } else if (blockedPrograms.length && !eligiblePrograms.length) {
    issues.push({
      code: 'premiere-blocked',
      message: 'O status de estreia atual não atende às competições listadas deste festival.',
    })
  } else if (eligiblePrograms.length) {
    matches.push(
      `Seções possíveis: ${eligiblePrograms.map((program) => program.name).join(', ')}.`,
    )
  }

  const audioIsEnglish = filmHasEnglishAudio(film)
  if (festival.englishSubtitlesRequired && !audioIsEnglish && !film.hasEnglishSubtitles) {
    const message =
      'Screener com legendas em inglês costuma ser obrigatório quando o áudio não está em inglês.'
    if (!film.languages) {
      warnings.push({ code: 'subs', message: `${message} Informe o idioma do filme.` })
    } else {
      issues.push({ code: 'subs', message })
    }
  } else if (festival.englishSubtitlesRequired && film.hasEnglishSubtitles) {
    matches.push('Legendas em inglês declaradas.')
  } else if (festival.englishSubtitlesRequired && audioIsEnglish) {
    matches.push('Áudio em inglês.')
  }

  if (!film.screenerUrl) {
    warnings.push({
      code: 'screener',
      message: 'Cadastre um link privado (Vimeo com senha) sem bloqueio geográfico.',
    })
  } else {
    matches.push('Screener informado.')
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

export function formatDate(iso) {
  if (!iso) return '—'
  const [year, month, day] = iso.split('-')
  if (!year || !month || !day) return iso
  return `${day}/${month}/${year}`
}

export function statusLabel(status) {
  if (status === 'eligible') return 'Elegível'
  if (status === 'review') return 'Revisar regulamento'
  if (status === 'ineligible') return 'Provavelmente inelegível'
  return status
}
