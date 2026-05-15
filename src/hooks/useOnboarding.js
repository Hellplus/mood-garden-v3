import { useState } from 'react'
import { readJson, STORAGE_KEYS, writeJson } from '../utils/storage.js'

function hasCompletedOnboarding() {
  const storedValue = readJson(STORAGE_KEYS.onboarding, null)

  if (storedValue === true) {
    return true
  }

  return storedValue?.completed === true
}

function useOnboarding() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => !hasCompletedOnboarding())

  function openOnboarding() {
    setIsOnboardingOpen(true)
  }

  function closeOnboarding() {
    writeJson(STORAGE_KEYS.onboarding, {
      completed: true,
      completedAt: new Date().toISOString(),
    })
    setIsOnboardingOpen(false)
  }

  function completeOnboarding() {
    closeOnboarding()
  }

  return {
    isOnboardingOpen,
    openOnboarding,
    closeOnboarding,
    completeOnboarding,
  }
}

export default useOnboarding
