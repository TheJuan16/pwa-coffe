const CACHE_NAME = 'dev-coffe-v2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json',
  // Iconos del manifest
  './img/icons/icon-72x72.png',
  './img/icons/icon-96x96.png',
  './img/icons/icon-128x128.png',
  './img/icons/icon-144x144.png',
  './img/icons/icon-152x152.png',
  './img/icons/icon-192x192.png',
  './img/icons/icon-384x384.png',
  './img/icons/icon-512x512.png',
  // Imágenes locales de café
  './img/cafe7.jpg',
  './img/cafe2.jpg',
  './img/cafe3.jpg',
  './img/cafe4.jpg',
  './img/cafe5.png',
  './img/cafe6.jpg',
  './img/cafe8.jpg',
  './img/cafe9.jpg',
  './img/cafe10.jpg',
  './img/cofi.jpg'
];

// 1. Evento Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Guardando archivos estáticos en caché');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Evento Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Evento Fetch (Network First con guardado dinámico para API e imágenes)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});