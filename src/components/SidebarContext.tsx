import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const STORAGE_KEY = 'aries:sidebar-hidden'

type SidebarState = {
  hidden: boolean
  toggle: () => void
  setHidden: (v: boolean) => void
}

const SidebarContext = createContext<SidebarState | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  /*
   * Always starts visible so the server render and the first client render
   * agree; the stored preference is applied on mount instead. Restoring it
   * during render would be a hydration mismatch.
   */
  const [hidden, setHiddenState] = useState(false)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === '1') setHiddenState(true)
    } catch {
      /* private mode / storage disabled — just keep the default */
    }
  }, [])

  const setHidden = useCallback((v: boolean) => {
    setHiddenState(v)
    try {
      window.localStorage.setItem(STORAGE_KEY, v ? '1' : '0')
    } catch {
      /* non-fatal: the preference simply won't persist */
    }
  }, [])

  const toggle = useCallback(() => setHidden(!hidden), [hidden, setHidden])

  const value = useMemo(
    () => ({ hidden, toggle, setHidden }),
    [hidden, toggle, setHidden],
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within a SidebarProvider')
  return ctx
}
