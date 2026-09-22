import { useCallback, useEffect, useMemo, useState } from 'react'
import { AccountContext } from './accountContext.js'
import {
  checkCredentials,
  createAccount,
  normalizeEmail,
  normalizeName,
  validateSignIn,
  validateSignUp,
} from '../lib/account.js'
import { accountFromUser, mapAuthError, needsEmailConfirmation } from '../lib/authErrors.js'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase.js'

const STORAGE_KEY = 'rota-doc-account-v1'

const emptySession = { account: null, signedIn: false, remember: true }

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...emptySession }
    const parsed = JSON.parse(raw)
    return {
      account: parsed.account ?? null,
      signedIn: Boolean(parsed.account) && Boolean(parsed.signedIn),
      remember: parsed.remember !== false,
    }
  } catch {
    return { ...emptySession }
  }
}

function saveSession(session) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        account: session.account,
        signedIn: session.remember ? session.signedIn : false,
        remember: session.remember,
      }),
    )
  } catch {
    /* ignore */
  }
}

export function AccountProvider({ children }) {
  const [session, setSession] = useState(loadSession)
  const [remote, setRemote] = useState({ account: null, ready: !isSupabaseConfigured })
  const [pending, setPending] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined
    let active = true
    let subscription = null

    getSupabase()
      .then(async (client) => {
        const { data } = await client.auth.getSession()
        if (!active) return
        setRemote({ account: accountFromUser(data.session?.user ?? null), ready: true })
        subscription = client.auth.onAuthStateChange((_event, nextSession) => {
          setRemote({ account: accountFromUser(nextSession?.user ?? null), ready: true })
        }).data.subscription
      })
      .catch(() => {
        if (active) setRemote({ account: null, ready: true })
      })

    return () => {
      active = false
      subscription?.unsubscribe()
    }
  }, [])

  const persist = useCallback((updater) => {
    setSession((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      saveSession(next)
      return next
    })
  }, [])

  const signUp = useCallback(
    async (form) => {
      const errors = validateSignUp(form)
      if (Object.keys(errors).length > 0) return errors

      if (!isSupabaseConfigured) {
        persist({
          account: createAccount(form),
          signedIn: true,
          remember: form.remember !== false,
        })
        return {}
      }

      setPending(true)
      try {
        const client = await getSupabase()
        const { data, error } = await client.auth.signUp({
          email: normalizeEmail(form.email),
          password: form.password,
          options: { data: { name: normalizeName(form.name) } },
        })
        if (error) return { form: mapAuthError(error) }
        if (needsEmailConfirmation(data)) setNotice('confirmEmail')
        return {}
      } catch (error) {
        return { form: mapAuthError(error) }
      } finally {
        setPending(false)
      }
    },
    [persist],
  )

  const signIn = useCallback(
    async (form) => {
      const errors = validateSignIn(form)
      if (Object.keys(errors).length > 0) return errors

      if (!isSupabaseConfigured) {
        const failure = checkCredentials(session.account, form)
        if (failure) return { form: failure }
        persist((current) => ({ ...current, signedIn: true, remember: form.remember !== false }))
        return {}
      }

      setPending(true)
      try {
        const client = await getSupabase()
        const { error } = await client.auth.signInWithPassword({
          email: normalizeEmail(form.email),
          password: form.password,
        })
        if (error) return { form: mapAuthError(error) }
        setNotice('')
        return {}
      } catch (error) {
        return { form: mapAuthError(error) }
      } finally {
        setPending(false)
      }
    },
    [persist, session.account],
  )

  const signOut = useCallback(async () => {
    setNotice('')
    if (!isSupabaseConfigured) {
      persist((current) => ({ ...current, signedIn: false }))
      return
    }
    setPending(true)
    try {
      const client = await getSupabase()
      await client.auth.signOut()
    } finally {
      setPending(false)
    }
  }, [persist])

  const forgetAccount = useCallback(() => {
    persist({ ...emptySession })
  }, [persist])

  const mode = isSupabaseConfigured ? 'supabase' : 'local'
  const account = mode === 'supabase' ? remote.account : session.account
  const signedIn = mode === 'supabase' ? Boolean(remote.account) : session.signedIn

  const value = useMemo(
    () => ({
      mode,
      account,
      signedIn,
      ready: mode === 'supabase' ? remote.ready : true,
      pending,
      notice,
      clearNotice: () => setNotice(''),
      remember: session.remember,
      signUp,
      signIn,
      signOut,
      forgetAccount,
    }),
    [
      mode,
      account,
      signedIn,
      remote.ready,
      pending,
      notice,
      session.remember,
      signUp,
      signIn,
      signOut,
      forgetAccount,
    ],
  )

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}
