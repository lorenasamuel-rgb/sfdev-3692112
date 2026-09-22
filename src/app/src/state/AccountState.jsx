import { useCallback, useMemo, useState } from 'react'
import { AccountContext } from './accountContext.js'
import { checkCredentials, createAccount, validateSignIn, validateSignUp } from '../lib/account.js'

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

  const persist = useCallback((updater) => {
    setSession((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      saveSession(next)
      return next
    })
  }, [])

  const signUp = useCallback(
    (form) => {
      const errors = validateSignUp(form)
      if (Object.keys(errors).length > 0) return errors
      persist({
        account: createAccount(form),
        signedIn: true,
        remember: form.remember !== false,
      })
      return {}
    },
    [persist],
  )

  const signIn = useCallback(
    (form) => {
      const errors = validateSignIn(form)
      if (Object.keys(errors).length > 0) return errors
      const failure = checkCredentials(session.account, form)
      if (failure) return { form: failure }
      persist((current) => ({ ...current, signedIn: true, remember: form.remember !== false }))
      return {}
    },
    [persist, session.account],
  )

  const signOut = useCallback(() => {
    persist((current) => ({ ...current, signedIn: false }))
  }, [persist])

  const forgetAccount = useCallback(() => {
    persist({ ...emptySession })
  }, [persist])

  const value = useMemo(
    () => ({
      account: session.account,
      signedIn: session.signedIn,
      remember: session.remember,
      signUp,
      signIn,
      signOut,
      forgetAccount,
    }),
    [session, signUp, signIn, signOut, forgetAccount],
  )

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}
