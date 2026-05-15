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

    navigator.serviceWorker.register(serviceWorkerUrl).catch((error) => {
      console.warn('Mood Garden service worker registration failed.', error)
    })
  })
}

registerServiceWorker()
