import { useCallback, useMemo, useState } from 'react'
import { loadState, saveState, sampleFilm } from '../lib/storage.js'
import { packageItems, rightsItems } from '../data/checklists.js'
import { AppStateContext } from './context.js'

export function AppStateProvider({ children }) {
  const [state, setState] = useState(loadState)

  const persist = useCallback((updater) => {
    setState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      saveState(next)
      return next
    })
  }, [])

  const updateFilm = useCallback(
    (patch) => {
      persist((current) => ({
        ...current,
        film: { ...current.film, ...patch },
      }))
    },
    [persist],
  )

  const togglePackage = useCallback(
    (id) => {
      persist((current) => ({
        ...current,
        package: { ...current.package, [id]: !current.package[id] },
      }))
    },
    [persist],
  )

  const toggleRights = useCallback(
    (id) => {
      persist((current) => ({
        ...current,
        rights: { ...current.rights, [id]: !current.rights[id] },
      }))
    },
    [persist],
  )

  const addSubmission = useCallback(
    (festivalId) => {
      persist((current) => {
        if (current.submissions.some((item) => item.festivalId === festivalId)) {
          return current
        }
        return {
          ...current,
          submissions: [
            ...current.submissions,
            {
              id: `${festivalId}-${Date.now()}`,
              festivalId,
              status: 'considering',
              notes: '',
              steps: {
                choose: true,
                rules: false,
                form: false,
                screener: false,
                fee: false,
                wait: false,
                delivery: false,
              },
              createdAt: new Date().toISOString(),
            },
          ],
        }
      })
    },
    [persist],
  )

  const updateSubmission = useCallback(
    (id, patch) => {
      persist((current) => ({
        ...current,
        submissions: current.submissions.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }))
    },
    [persist],
  )

  const toggleStep = useCallback(
    (id, stepId) => {
      persist((current) => ({
        ...current,
        submissions: current.submissions.map((item) => {
          if (item.id !== id) return item
          const steps = { ...item.steps, [stepId]: !item.steps[stepId] }
          const submitted = steps.form && steps.screener && steps.fee
          const waiting = submitted && steps.wait
          let status = item.status
          if (item.status === 'considering' && submitted) status = 'submitted'
          if (waiting && status === 'submitted') status = 'awaiting'
          return { ...item, steps, status }
        }),
      }))
    },
    [persist],
  )

  const removeSubmission = useCallback(
    (id) => {
      persist((current) => ({
        ...current,
        submissions: current.submissions.filter((item) => item.id !== id),
      }))
    },
    [persist],
  )

  const loadSample = useCallback(() => {
    persist((current) => ({
      ...current,
      film: sampleFilm(),
      package: Object.fromEntries(packageItems.map((item) => [item.id, true])),
      rights: Object.fromEntries(
        rightsItems.filter((item) => item.id !== 'eo').map((item) => [item.id, true]),
      ),
    }))
  }, [persist],)

  const value = useMemo(
    () => ({
      ...state,
      updateFilm,
      togglePackage,
      toggleRights,
      addSubmission,
      updateSubmission,
      toggleStep,
      removeSubmission,
      loadSample,
    }),
    [
      state,
      updateFilm,
      togglePackage,
      toggleRights,
      addSubmission,
      updateSubmission,
      toggleStep,
      removeSubmission,
      loadSample,
    ],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
