import test from 'node:test'
import assert from 'node:assert/strict'
import { translate } from './translate.js'

test('traduz chave aninhada em português e interpola', () => {
  assert.equal(translate('pt', 'nav.filme'), 'Ficha')
  assert.equal(translate('pt', 'nav.arquivo'), 'Arquivo')
  assert.equal(translate('pt', 'nav.submissions', { score: 80, count: 2 }), '80/100 · 2 inscrições')
})

test('traduz a mesma chave em inglês', () => {
  assert.equal(translate('en', 'nav.filme'), 'Film file')
  assert.equal(translate('en', 'home.heroTitle'), 'Submit the film.')
  assert.equal(translate('en', 'nav.submissions', { score: 80, count: 2 }), '80/100 · 2 submissions')
})

test('o título em inglês aponta para o arquivo', () => {
  assert.match(translate('pt', 'film.englishTitlePlaceholder'), /arquivo/i)
  assert.match(translate('en', 'film.englishTitlePlaceholder'), /archive/i)
})

test('a área de conta fala as duas línguas', () => {
  assert.equal(translate('pt', 'nav.conta'), 'Conta')
  assert.equal(translate('en', 'nav.conta'), 'Account')
  assert.equal(translate('pt', 'account.welcome', { name: 'Ana' }), 'Olá, Ana')
  assert.equal(translate('en', 'account.welcome', { name: 'Ana' }), 'Hello, Ana')
  assert.match(translate('pt', 'account.error.passwordShort', { min: 8 }), /8/)
  assert.match(translate('en', 'account.error.passwordShort', { min: 8 }), /8/)
})

test('a conta é assumida como local nas duas línguas', () => {
  assert.match(translate('pt', 'account.local.body'), /localStorage/)
  assert.match(translate('en', 'account.local.body'), /localStorage/)
})

test('traduz avançar e voltar nas secções', () => {
  assert.equal(translate('pt', 'chrome.next'), 'Seguinte')
  assert.equal(translate('pt', 'chrome.back'), 'Anterior')
  assert.equal(translate('en', 'chrome.next'), 'Next')
  assert.equal(translate('en', 'chrome.back'), 'Back')
})
