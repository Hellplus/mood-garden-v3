import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/theme.css'
import './styles/components.css'
import './styles/animations.css'
import './styles/mobile.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const SERVICE_WORKER_CACHE_PREFIX = 'mood-garden-v3-cache-'
const SERVICE_WORKER_CLEANUP_RELOAD_KEY = 'mood-garden-v3-sw-cleanup-reloaded'

async function getServiceWorkerRegistrations() {
  if (!('serviceWorker' in navigator)) {
    return []
  }

  if (typeof navigator.serviceWorker.getRegistrations === 'function') {
    return navigator.serviceWorker.getRegistrations()
  }

  const registration = await navigator.serviceWorker.getRegistration()
  return registration ? [registration] : []
}

async function cleanupServiceWorker() {
  if (!import.meta.env.PROD) {
    return
  }

  window.addEventListener('load', () => {
    const runCleanup = async () => {
      const hadController = Boolean(navigator.serviceWorker?.controller)
      const registrations = await getServiceWorkerRegistrations()
      const cacheNames =
        'caches' in window
          ? (await window.caches.keys()).filter((cacheName) =>
              cacheName.startsWith(SERVICE_WORKER_CACHE_PREFIX),
            )
          : []

      await Promise.all([
        ...registrations.map((registration) => registration.unregister()),
        ...cacheNames.map((cacheName) => window.caches.delete(cacheName)),
      ])

      const shouldReload = hadController || registrations.length > 0 || cacheNames.length > 0
      const hasReloaded = window.sessionStorage.getItem(SERVICE_WORKER_CLEANUP_RELOAD_KEY)

      if (shouldReload && !hasReloaded) {
        window.sessionStorage.setItem(SERVICE_WORKER_CLEANUP_RELOAD_KEY, 'true')
        window.location.reload()
        return
      }

      if (!shouldReload) {
        window.sessionStorage.removeItem(SERVICE_WORKER_CLEANUP_RELOAD_KEY)
      }
    }

    runCleanup().catch((error) => {
      console.warn('Mood Garden service worker cleanup failed.', error)
    })
  })
}

cleanupServiceWorker()
