import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

type ExpandOverlayContextValue = {
  openKey: string | null
  toggle: (key: string) => void
  close: () => void
}

const ExpandOverlayContext = createContext<ExpandOverlayContextValue | null>(
  null,
)

export function useExpandOverlay() {
  const ctx = useContext(ExpandOverlayContext)
  if (!ctx) {
    throw new Error('useExpandOverlay must be used within ExpandOverlayProvider')
  }
  return ctx
}

export function ExpandOverlayProvider({ children }: { children: ReactNode }) {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const close = useCallback(() => setOpenKey(null), [])
  const toggle = useCallback((key: string) => {
    setOpenKey((current) => (current === key ? null : key))
  }, [])

  useEffect(() => {
    if (!openKey) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openKey, close])

  return (
    <ExpandOverlayContext.Provider value={{ openKey, toggle, close }}>
      {children}
      <Overlay visible={openKey !== null} onClose={close} />
    </ExpandOverlayContext.Provider>
  )
}

function Overlay({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setTarget(document.body)
  }, [])

  if (!target) return null

  return createPortal(
    <div
      className={visible ? 'expand-overlay is-visible' : 'expand-overlay'}
      onClick={onClose}
      aria-hidden={!visible}
    />,
    target,
  )
}
