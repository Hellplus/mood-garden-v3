export const STORAGE_KEYS = {
  records: 'mood-garden-records',
  theme: 'mood-garden-theme',
  onboarding: 'mood-garden-onboarding',
}

export function readFromStorage(key, fallback = null) {
  const rawValue = window.localStorage.getItem(key)

  if (!rawValue) {
    return fallback
  }

  try {
    return JSON.parse(rawValue)
  } catch {
    return fallback
  }
}

export function writeToStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeFromStorage(key) {
  window.localStorage.removeItem(key)
}
