import festivals from '../data/festivals.json'

export function scoreAssessment({ runtime, premiere, pressKit, trailer }) {
  let score = 50
  const minutes = Number(runtime)

  if (Number.isFinite(minutes) && minutes > 0 && minutes <= 15) {
    score += 10
  }

  if (premiere === 'no') {
    score += 15
  }

  if (pressKit === 'yes') {
    score += 15
  }

  if (trailer === 'yes') {
    score += 10
  }

  return Math.min(100, score)
}

export function readinessMessage(score) {
  if (score >= 80) {
    return 'O filme parece bem preparado para inscrições em festivais.'
  }

  if (score >= 60) {
    return 'Há potencial, mas alguns pontos devem ser reforçados antes de inscrever.'
  }

  return 'Monte a estratégia e os materiais de divulgação antes de começar as inscrições.'
}

export function suggestFestivals(score) {
  const pool = festivals.filter((festival) => festival.focus?.length)
  let matches = pool

  if (score >= 85) {
    matches = pool.filter((festival) => festival.focus.includes('New voices'))
  } else if (score >= 70) {
    matches = pool.filter((festival) => festival.focus.includes('Documentary'))
  } else if (score >= 50) {
    matches = pool.filter((festival) => festival.format?.includes('Online'))
  }

  const picked = matches.slice(0, 3)
  return picked.length === 3 ? picked : pool.slice(0, 3)
}

export function checklistFromAssessment({ premiere, pressKit, trailer }) {
  return [
    { done: premiere === 'no', label: 'Estreia de festival ainda disponível' },
    { done: pressKit === 'yes', label: 'Press kit pronto' },
    { done: trailer === 'yes', label: 'Trailer pronto' },
  ]
}
