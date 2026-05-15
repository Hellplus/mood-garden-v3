import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_DURATION = 3200
const toastTypes = new Set(['success', 'error', 'info'])

function normalizeToastType(type) {
  return toastTypes.has(type) ? type : 'info'
}

function useToast() {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current && typeof window !== 'undefined') {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const dismissToast = useCallback(() => {
    clearTimer()
    setToast(null)
  }, [clearTimer])

  const showToast = useCallback((message, type = 'info', duration = DEFAULT_DURATION) => {
    if (!message) {
      return
    }

    clearTimer()

    const nextToast = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      message,
      type: normalizeToastType(type),
    }

    setToast(nextToast)

    if (duration > 0 && typeof window !== 'undefined') {
      timerRef.current = window.setTimeout(() => {
        setToast(null)
        timerRef.current = null
      }, duration)
    }
  }, [clearTimer])

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  return {
    toast,
    showToast,
    dismissToast,
  }
}

export default useToast
