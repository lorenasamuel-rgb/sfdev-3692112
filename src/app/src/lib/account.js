const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FNV_OFFSETS = [0x811c9dc5, 0x01000193, 0x9dc5811c, 0x5f3759df]

export const MIN_PASSWORD_LENGTH = 8

export function normalizeEmail(email) {
  return String(email ?? '')
    .trim()
    .toLowerCase()
}

export function normalizeName(name) {
  return String(name ?? '')
    .trim()
    .replace(/\s+/g, ' ')
}

export function isEmail(value) {
  return EMAIL_PATTERN.test(normalizeEmail(value))
}

function fnv1a(input, offset) {
  let hash = offset >>> 0
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash.toString(16).padStart(8, '0')
}

// The archive has no server to hold a password, so the browser keeps a salted
// digest instead of the typed characters. This is enough to keep the password
// out of localStorage in the clear and no more: it is not authentication.
export function digest(password, salt = '') {
  const input = `${salt}:${String(password ?? '')}`
  return FNV_OFFSETS.map((offset) => fnv1a(input, offset)).join('')
}

export function makeSalt(random = Math.random) {
  return Math.floor(random() * 0xffffffff)
    .toString(16)
    .padStart(8, '0')
}

export function validateSignUp({ name, email, password, confirm } = {}) {
  const errors = {}
  if (!normalizeName(name)) errors.name = 'nameRequired'
  if (!normalizeEmail(email)) errors.email = 'emailRequired'
  else if (!isEmail(email)) errors.email = 'emailInvalid'
  if (!password) errors.password = 'passwordRequired'
  else if (password.length < MIN_PASSWORD_LENGTH) errors.password = 'passwordShort'
  else if (confirm !== password) errors.confirm = 'confirmMismatch'
  return errors
}

export function validateSignIn({ email, password } = {}) {
  const errors = {}
  if (!normalizeEmail(email)) errors.email = 'emailRequired'
  else if (!isEmail(email)) errors.email = 'emailInvalid'
  if (!password) errors.password = 'passwordRequired'
  return errors
}

export function createAccount({ name, email, password }, salt = makeSalt(), now = new Date()) {
  return {
    name: normalizeName(name),
    email: normalizeEmail(email),
    salt,
    secret: digest(password, salt),
    createdAt: now.toISOString(),
  }
}

export function checkCredentials(account, { email, password } = {}) {
  if (!account) return 'noAccount'
  if (normalizeEmail(email) !== account.email) return 'badCredentials'
  if (digest(password, account.salt) !== account.secret) return 'badCredentials'
  return null
}

export function firstName(account) {
  const name = normalizeName(account?.name)
  if (name) return name.split(' ')[0]
  return account?.email ? account.email.split('@')[0] : ''
}

export function initials(account) {
  const name = normalizeName(account?.name)
  const source = name || normalizeEmail(account?.email).replace(/[@.].*$/, '')
  const words = source.split(/[\s._-]+/).filter(Boolean)
  if (words.length === 0) return '?'
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}
