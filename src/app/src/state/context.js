import { createContext, useContext } from 'react'

export const AppStateContext = createContext(null)

export function useAppState() {
  const value = useContext(AppStateContext)
  if (!value) throw new Error('useAppState precisa do AppStateProvider')
  return value
}
