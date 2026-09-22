import test from 'node:test'
import assert from 'node:assert/strict'
import { accountFromUser, mapAuthError, needsEmailConfirmation } from './authErrors.js'

test('sem erro não há código', () => {
  assert.equal(mapAuthError(null), null)
})

test('credenciais erradas do Supabase viram o erro da página', () => {
  assert.equal(mapAuthError({ code: 'invalid_credentials' }), 'badCredentials')
  assert.equal(mapAuthError({ message: 'Invalid login credentials' }), 'badCredentials')
})

test('email já registado e email por confirmar são erros distintos', () => {
  assert.equal(mapAuthError({ code: 'user_already_exists' }), 'emailTaken')
  assert.equal(mapAuthError({ message: 'User already registered' }), 'emailTaken')
  assert.equal(mapAuthError({ code: 'email_not_confirmed' }), 'emailNotConfirmed')
})

test('senha fraca do servidor usa a mesma mensagem da validação local', () => {
  assert.equal(mapAuthError({ message: 'Password should be at least 6 characters' }), 'passwordShort')
})

test('limite de pedidos e falha de rede têm aviso próprio', () => {
  assert.equal(mapAuthError({ message: 'Email rate limit exceeded' }), 'rateLimited')
  assert.equal(mapAuthError({ message: 'Failed to fetch' }), 'network')
})

test('um erro desconhecido não fica sem mensagem', () => {
  assert.equal(mapAuthError({ message: 'something else entirely' }), 'remoteUnknown')
})

test('o utilizador do Supabase vira a conta da aplicação', () => {
  const account = accountFromUser({
    id: 'uuid-1',
    email: 'ana@arquivo.pt',
    created_at: '2026-09-22T10:00:00.000Z',
    user_metadata: { name: 'Ana Ribeiro' },
  })
  assert.deepEqual(account, {
    id: 'uuid-1',
    name: 'Ana Ribeiro',
    email: 'ana@arquivo.pt',
    createdAt: '2026-09-22T10:00:00.000Z',
  })
})

test('uma conta por confirmar não abre sessão', () => {
  assert.equal(needsEmailConfirmation({ user: { id: 'uuid-1' }, session: null }), true)
  assert.equal(needsEmailConfirmation({ user: { id: 'uuid-1' }, session: { access_token: 'x' } }), false)
})
