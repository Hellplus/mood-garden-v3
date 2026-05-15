const CACHE_NAME = 'mood-garden-v3-cache-v3-0-j'
const BASE_PATH = '/mood-garden-v3/'
const SHELL_ASSETS = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}manifest.webmanifest`,
  `${BASE_PATH}icons/icon.svg`,
  `${BASE_PATH}favicon.svg`,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  const networkResponse = await fetch(request)

  if (networkResponse.ok) {
    const cache = await caches.open(CACHE_NAME)
    cache.put(request, networkResponse.clone())
  }

  return networkResponse
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch {
    return (
      (await caches.match(request)) ||
      (await caches.match(BASE_PATH)) ||
      (await caches.match(`${BASE_PATH}index.html`))
    )
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') {
    return
  }

  const requestUrl = new URL(request.url)

  if (requestUrl.origin !== self.location.origin) {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request))
    return
  }

  if (
    requestUrl.pathname.startsWith(`${BASE_PATH}assets/`) ||
    requestUrl.pathname.startsWith(`${BASE_PATH}icons/`) ||
    requestUrl.pathname.endsWith('manifest.webmanifest') ||
    requestUrl.pathname.endsWith('favicon.svg')
  ) {
    event.respondWith(cacheFirst(request))
  }
})
