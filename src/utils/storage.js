export const STORAGE_KEYS = {
  records: 'mood-garden-records',
  theme: 'mood-garden-theme',
  onboarding: 'mood-garden-onboarding',
}

export function readFromStorage(_key, fallback = null) {
  return fallback
}

export function writeToStorage() {
  return undefined
}

export function removeFromStorage() {
  return undefined
}
