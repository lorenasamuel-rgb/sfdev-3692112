import test from 'node:test'
import assert from 'node:assert/strict'
import {
  checkCredentials,
  createAccount,
  digest,
  firstName,
  initials,
  MIN_PASSWORD_LENGTH,
  normalizeEmail,
  validateSignIn,
  validateSignUp,
} from './account.js'

const salt = 'abc12345'

function newAccount(overrides = {}) {
  return createAccount({
    name: 'Ana Ribeiro',
    email: '  Ana@Arquivo.PT ',
    password: 'festival2026',
    ...overrides,
  }, salt)
}

test('o email é guardado sem espaços e em minúsculas', () => {
  assert.equal(normalizeEmail('  Ana@Arquivo.PT '), 'ana@arquivo.pt')
  assert.equal(newAccount().email, 'ana@arquivo.pt')
})

test('a senha nunca é guardada em texto', () => {
  const account = newAccount()
  assert.equal(account.password, undefined)
  assert.ok(!JSON.stringify(account).includes('festival2026'))
  assert.equal(account.secret, digest('festival2026', salt))
})

test('a mesma senha com sal diferente dá digest diferente', () => {
  assert.notEqual(digest('festival2026', 'abc12345'), digest('festival2026', '87654321'))
})

test('criar conta exige nome, email válido e senha longa', () => {
  assert.deepEqual(
    validateSignUp({ name: ' ', email: 'ana', password: 'curta', confirm: 'curta' }),
    { name: 'nameRequired', email: 'emailInvalid', password: 'passwordShort' },
  )
  assert.equal(MIN_PASSWORD_LENGTH, 8)
})

test('as duas senhas têm de coincidir', () => {
  const errors = validateSignUp({
    name: 'Ana Ribeiro',
    email: 'ana@arquivo.pt',
    password: 'festival2026',
    confirm: 'festival2025',
  })
  assert.deepEqual(errors, { confirm: 'confirmMismatch' })
})

test('um formulário de criação preenchido não tem erros', () => {
  const errors = validateSignUp({
    name: 'Ana Ribeiro',
    email: 'ana@arquivo.pt',
    password: 'festival2026',
    confirm: 'festival2026',
  })
  assert.deepEqual(errors, {})
})

test('entrar só verifica email e senha preenchidos', () => {
  assert.deepEqual(validateSignIn({ email: '', password: '' }), {
    email: 'emailRequired',
    password: 'passwordRequired',
  })
  assert.deepEqual(validateSignIn({ email: 'ana@arquivo.pt', password: 'x' }), {})
})

test('as credenciais certas entram, ignorando maiúsculas no email', () => {
  const account = newAccount()
  assert.equal(checkCredentials(account, { email: 'ANA@arquivo.pt', password: 'festival2026' }), null)
})

test('email ou senha errados devolvem o mesmo erro', () => {
  const account = newAccount()
  assert.equal(
    checkCredentials(account, { email: 'outra@arquivo.pt', password: 'festival2026' }),
    'badCredentials',
  )
  assert.equal(
    checkCredentials(account, { email: 'ana@arquivo.pt', password: 'festival2025' }),
    'badCredentials',
  )
})

test('sem conta neste navegador o erro é outro', () => {
  assert.equal(checkCredentials(null, { email: 'ana@arquivo.pt', password: 'festival2026' }), 'noAccount')
})

test('o cabeçalho saúda pelo primeiro nome e tem iniciais', () => {
  const account = newAccount()
  assert.equal(firstName(account), 'Ana')
  assert.equal(initials(account), 'AR')
})

test('uma conta só com email ainda dá iniciais', () => {
  const account = newAccount({ name: '' })
  assert.equal(firstName(account), 'ana')
  assert.equal(initials(account), 'A')
})
