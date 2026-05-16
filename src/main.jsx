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

function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
    return
  }

  window.addEventListener('load', () => {
    const serviceWorkerUrl = `${import.meta.env.BASE_URL}service-worker.js`
    const hadController = Boolean(navigator.serviceWorker.controller)
    let hasReloadedForUpdate = false

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || hasReloadedForUpdate) {
        return
      }

      hasReloadedForUpdate = true
      window.location.reload()
    })

    navigator.serviceWorker
      .register(serviceWorkerUrl)
      .then((registration) => {
        registration.update().catch((error) => {
          console.warn('Mood Garden service worker update check failed.', error)
        })

        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }

        registration.addEventListener('updatefound', () => {
          const nextWorker = registration.installing

          if (!nextWorker) {
            return
          }

          nextWorker.addEventListener('statechange', () => {
            if (nextWorker.state === 'installed' && navigator.serviceWorker.controller) {
              nextWorker.postMessage({ type: 'SKIP_WAITING' })
            }
          })
        })
      })
      .catch((error) => {
        console.warn('Mood Garden service worker registration failed.', error)
      })
  })
}

registerServiceWorker()
