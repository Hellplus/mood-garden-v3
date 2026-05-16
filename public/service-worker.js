const CACHE_PREFIX = 'mood-garden-v3-cache-'
const CACHE_NAME = 'mood-garden-v3-cache-v3-1-dx2-r-fix2'
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
            .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

function fetchFresh(request) {
  return fetch(new Request(request, { cache: 'reload' }))
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetchFresh(request)

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
    event.respondWith(networkFirst(request))
  }
})
