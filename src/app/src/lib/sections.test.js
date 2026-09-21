import test from 'node:test'
import assert from 'node:assert/strict'
import { sectionNeighbors, SECTION_FLOW } from './sections.js'

test('a primeira secção só avança', () => {
  const { prev, next } = sectionNeighbors('guia')
  assert.equal(prev, null)
  assert.equal(next.id, 'filme')
})

test('uma secção no meio tem anterior e seguinte', () => {
  const { prev, next } = sectionNeighbors('festivais')
  assert.equal(prev.id, 'filme')
  assert.equal(next.id, 'pacote')
})

test('a última secção da rota só volta', () => {
  const { prev, next } = sectionNeighbors('inscricoes')
  assert.equal(prev.id, 'direitos')
  assert.equal(next, null)
})

test('páginas fora da rota não têm pager', () => {
  const { prev, next } = sectionNeighbors('premios')
  assert.equal(prev, null)
  assert.equal(next, null)
})

test('a rota de ensino cobre seis secções', () => {
  assert.deepEqual(
    SECTION_FLOW.map((item) => item.id),
    ['guia', 'filme', 'festivais', 'pacote', 'direitos', 'inscricoes'],
  )
})
