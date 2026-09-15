import test from 'node:test'
import assert from 'node:assert/strict'
import { translate } from './translate.js'

test('traduz chave aninhada em português e interpola', () => {
  assert.equal(translate('pt', 'nav.filme'), 'Filme')
  assert.equal(translate('pt', 'nav.submissions', { score: 80, count: 2 }), '80/100 · 2 inscrições')
})

test('traduz a mesma chave em inglês', () => {
  assert.equal(translate('en', 'nav.filme'), 'Film')
  assert.equal(translate('en', 'nav.submissions', { score: 80, count: 2 }), '80/100 · 2 submissions')
})

test('cai para português se a chave faltar no locale', () => {
  assert.equal(translate('en', 'brand'), 'Rota Doc')
})
