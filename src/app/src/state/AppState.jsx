import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { emptyFilm, emptyState, loadState, saveState, sampleFilm } from '../lib/storage.js'
import { packageItems, rightsItems } from '../data/checklists.js'
import { filmToDossier, getArchiveFilmById } from '../data/archive.js'
import { chooseState, ROUTE_TABLE, rowToState, stateToRow } from '../lib/remoteState.js'
import { getSupabase } from '../lib/supabase.js'
import { AppStateContext } from './context.js'
import { useAccount } from './accountContext.js'

const SYNC_DELAY = 900

export function AppStateProvider({ children }) {
  const [state, setState] = useState(loadState)
  const { mode, account } = useAccount()
  const userId = mode === 'supabase' && account ? account.id : null
  const [sync, setSync] = useState({ userId: null, status: 'off', at: null })
  const hydratedFor = useRef(null)

  // Until the account reports back, the status follows the account itself
  // rather than the last thing a request wrote.
  const syncStatus = !userId ? 'off' : sync.userId === userId ? sync.status : 'loading'

  const persist = useCallback((updater) => {
    setState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      saveState(next)
      return next
    })
  }, [])

  // Signing in pulls the route saved on the account; an empty account is filled
  // with whatever this browser was already holding.
  useEffect(() => {
    if (!userId) {
      hydratedFor.current = null
      return undefined
    }
    if (hydratedFor.current === userId) return undefined

    let active = true

    getSupabase()
      .then((client) =>
        client
          .from(ROUTE_TABLE)
          .select('film, package, rights, submissions, updated_at')
          .eq('user_id', userId)
          .maybeSingle(),
      )
      .then(({ data, error }) => {
        if (!active) return
        if (error) throw error
        hydratedFor.current = userId
        setState((current) => {
          const { state: next } = chooseState(current, rowToState(data))
          saveState(next)
          return next
        })
        setSync({ userId, status: 'ready', at: new Date().toISOString() })
      })
      .catch(() => {
        if (active) setSync({ userId, status: 'error', at: null })
      })

    return () => {
      active = false
    }
  }, [userId])

  // Every change is written back to the account, coalesced so typing in the
  // film file does not turn into one request per keystroke.
  useEffect(() => {
    if (!userId || hydratedFor.current !== userId) return undefined

    const timer = setTimeout(() => {
      setSync((current) => ({ ...current, userId, status: 'saving' }))
      getSupabase()
        .then((client) =>
          client.from(ROUTE_TABLE).upsert(stateToRow(state, userId), { onConflict: 'user_id' }),
        )
        .then(({ error }) => {
          if (error) throw error
          setSync({ userId, status: 'ready', at: new Date().toISOString() })
        })
        .catch(() => setSync({ userId, status: 'error', at: null }))
    }, SYNC_DELAY)

    return () => clearTimeout(timer)
  }, [state, userId])

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
  }, [persist])

  const loadArchiveFilm = useCallback(
    (filmId) => {
      const archiveFilm = getArchiveFilmById(filmId)
      if (!archiveFilm) return
      persist((current) => ({
        ...current,
        film: { ...emptyFilm, ...filmToDossier(archiveFilm) },
      }))
    },
    [persist],
  )

  const clearFilm = useCallback(() => {
    persist(structuredClone(emptyState))
  }, [persist])

  const clearCloudRoute = useCallback(async () => {
    if (!userId) return
    setSync((current) => ({ ...current, userId, status: 'saving' }))
    try {
      const client = await getSupabase()
      const { error } = await client.from(ROUTE_TABLE).delete().eq('user_id', userId)
      if (error) throw error
      persist(structuredClone(emptyState))
      setSync({ userId, status: 'ready', at: new Date().toISOString() })
    } catch {
      setSync({ userId, status: 'error', at: null })
    }
  }, [persist, userId])

  const value = useMemo(
    () => ({
      ...state,
      sync: { status: syncStatus, at: sync.at },
      updateFilm,
      togglePackage,
      toggleRights,
      addSubmission,
      updateSubmission,
      toggleStep,
      removeSubmission,
      loadSample,
      loadArchiveFilm,
      clearFilm,
      clearCloudRoute,
    }),
    [
      state,
      syncStatus,
      sync.at,
      updateFilm,
      togglePackage,
      toggleRights,
      addSubmission,
      updateSubmission,
      toggleStep,
      removeSubmission,
      loadSample,
      loadArchiveFilm,
      clearFilm,
      clearCloudRoute,
    ],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
