export const STORAGE_KEYS = {
  records: 'moodGardenFlowers',
  legacyRecords: 'mood-garden-records',
  theme: 'mood-garden-theme',
  onboarding: 'mood-garden-onboarding',
}

function getLocalStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null
  }

  return window.localStorage
}

export function readJson(key, fallback = null) {
  const storage = getLocalStorage()

  if (!storage) {
    return fallback
  }

  try {
    const rawValue = storage.getItem(key)

    if (!rawValue) {
      return fallback
    }

    return JSON.parse(rawValue)
  } catch (error) {
    console.warn(`Failed to read localStorage key "${key}".`, error)
    return fallback
  }
}

export function writeJson(key, value) {
  const storage = getLocalStorage()

  if (!storage) {
    return false
  }

  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`Failed to write localStorage key "${key}".`, error)
    return false
  }
}

export function removeJson(key) {
  const storage = getLocalStorage()

  if (!storage) {
    return false
  }

  try {
    storage.removeItem(key)
    return true
  } catch (error) {
    console.warn(`Failed to remove localStorage key "${key}".`, error)
    return false
  }
}

export function readRecords() {
  const primaryRecords = readJson(STORAGE_KEYS.records, null)

  if (Array.isArray(primaryRecords)) {
    return primaryRecords
  }

  const legacyRecords = readJson(STORAGE_KEYS.legacyRecords, null)
  return Array.isArray(legacyRecords) ? legacyRecords : []
}

export function writeRecords(records) {
  return writeJson(STORAGE_KEYS.records, Array.isArray(records) ? records : [])
}

export function clearStoredRecords() {
  return writeRecords([])
}
