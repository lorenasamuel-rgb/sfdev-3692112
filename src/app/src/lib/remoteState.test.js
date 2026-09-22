import test from 'node:test'
import assert from 'node:assert/strict'
import { emptyState } from './emptyState.js'
import { chooseState, isEmptyState, rowToState, stateToRow } from './remoteState.js'

function filledState() {
  return {
    film: { ...emptyState.film, originalTitle: 'Maré Alta', durationMinutes: '18' },
    package: { logline: true },
    rights: {},
    submissions: [{ id: 'a-1', festivalId: 'a', status: 'considering' }],
  }
}

test('a rota vai para a linha da conta com a data da gravação', () => {
  const row = stateToRow(filledState(), 'user-1', new Date('2026-09-22T10:00:00.000Z'))
  assert.equal(row.user_id, 'user-1')
  assert.equal(row.film.originalTitle, 'Maré Alta')
  assert.equal(row.submissions.length, 1)
  assert.equal(row.updated_at, '2026-09-22T10:00:00.000Z')
})

test('uma linha da nuvem volta com todos os campos da ficha', () => {
  const state = rowToState({ film: { originalTitle: 'Maré Alta' }, package: null, submissions: null })
  assert.equal(state.film.originalTitle, 'Maré Alta')
  assert.equal(state.film.form, 'Documentary')
  assert.deepEqual(state.package, {})
  assert.deepEqual(state.submissions, [])
})

test('uma conta sem linha na nuvem não devolve estado', () => {
  assert.equal(rowToState(null), null)
})

test('reconhece uma rota vazia', () => {
  assert.equal(isEmptyState(structuredClone(emptyState)), true)
  assert.equal(isEmptyState(filledState()), false)
  assert.equal(isEmptyState({ ...emptyState, package: { logline: true } }), false)
  assert.equal(isEmptyState({ ...emptyState, film: { ...emptyState.film, publishedPublicly: true } }), false)
})

test('a nuvem ganha quando tem trabalho guardado', () => {
  const result = chooseState(structuredClone(emptyState), filledState())
  assert.equal(result.source, 'remote')
  assert.equal(result.state.film.originalTitle, 'Maré Alta')
})

test('o navegador ganha quando a nuvem ainda está vazia', () => {
  const local = filledState()
  const result = chooseState(local, structuredClone(emptyState))
  assert.equal(result.source, 'local')
  assert.equal(result.state, local)
})

test('sem linha na nuvem fica o que está no navegador', () => {
  const local = filledState()
  assert.deepEqual(chooseState(local, null), { state: local, source: 'local' })
})
