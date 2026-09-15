export const packageItemIds = [
  'titles',
  'logline',
  'short-synopsis',
  'full-synopsis',
  'credits-sheet',
  'director-bio',
  'director-photo',
  'director-statement',
  'stills',
  'poster',
  'trailer',
  'screener',
  'subs-en',
  'srt',
  'contact',
]

export const selectedDeliveryIds = [
  'dcp',
  'press-kit',
  'clean-trailer',
  'accessibility',
  'exhibition-terms',
]

export const rightsItemIds = [
  'interviews',
  'minors',
  'music-composition',
  'music-master',
  'archive-stills',
  'archive-video',
  'locations',
  'authority',
  'eo',
]

export const requirementIds = [
  'finished',
  'completion',
  'duration',
  'premiere',
  'screener',
  'subs',
  'rights',
  'fee',
  'deadline',
]

/** @deprecated use packageItemIds — kept for readiness math */
export const packageItems = packageItemIds.map((id) => ({ id }))
export const rightsItems = rightsItemIds.map((id) => ({ id }))
