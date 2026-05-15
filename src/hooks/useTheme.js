import { useEffect, useState } from 'react'
import { readJson, STORAGE_KEYS, writeJson } from '../utils/storage.js'

export const THEME_OPTIONS = [
  { id: 'light', label: '晨光', description: '清爽明亮的浅色花园' },
  { id: 'dark', label: '夜色', description: '低亮度的安静夜间模式' },
  { id: 'cozy', label: '暖手账', description: '更柔和的纸感暖色' },
]

const DEFAULT_THEME = 'light'
const themeIds = new Set(THEME_OPTIONS.map((theme) => theme.id))

function normalizeTheme(value) {
  if (typeof value === 'string' && themeIds.has(value)) {
    return value
  }

  if (value && typeof value === 'object' && themeIds.has(value.theme)) {
    return value.theme
  }

  return DEFAULT_THEME
}

function getInitialTheme() {
  return normalizeTheme(readJson(STORAGE_KEYS.theme, DEFAULT_THEME))
}

function applyThemeToDocument(theme) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.dataset.theme = theme
  document.body.dataset.theme = theme
}

function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    applyThemeToDocument(theme)
    writeJson(STORAGE_KEYS.theme, theme)
  }, [theme])

  function setTheme(nextTheme) {
    setThemeState(normalizeTheme(nextTheme))
  }

  return {
    theme,
    themes: THEME_OPTIONS,
    availableThemes: THEME_OPTIONS,
    setTheme,
  }
}

export default useTheme
