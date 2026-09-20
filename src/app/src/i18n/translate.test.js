import test from 'node:test'
import assert from 'node:assert/strict'
import { translate } from './translate.js'

test('traduz chave aninhada em português e interpola', () => {
  assert.equal(translate('pt', 'nav.filme'), 'Start')
  assert.equal(translate('pt', 'nav.arquivo'), 'Search')
  assert.equal(translate('pt', 'nav.submissions', { score: 80, count: 2 }), '80/100 · 2 inscrições')
})

test('traduz a mesma chave em inglês', () => {
  assert.equal(translate('en', 'nav.filme'), 'Start')
  assert.equal(translate('en', 'home.heroTitle'), 'Submit the film.')
  assert.equal(translate('en', 'nav.submissions', { score: 80, count: 2 }), '80/100 · 2 submissions')
})

test('traduz avançar e voltar nas secções', () => {
  assert.equal(translate('pt', 'chrome.next'), 'Seguinte')
  assert.equal(translate('pt', 'chrome.back'), 'Anterior')
  assert.equal(translate('en', 'chrome.next'), 'Next')
  assert.equal(translate('en', 'chrome.back'), 'Back')
})
