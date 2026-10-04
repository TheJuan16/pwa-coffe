const CACHE_NAME = 'dev-coffe-v1';

// Recursos críticos a almacenar en caché (basado en la estructura de tu proyecto)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
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
  // Imágenes del sitio
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

// 1. Evento Install: Guarda los archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Guardando archivos en caché');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Evento Activate: Limpia cachés antiguas
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

// 3. Evento Fetch: Estrategia "Cache First, fallback to Network"
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si el recurso está en caché, lo entrega; si no, lo busca en la red
        return response || fetch(event.request);
      })
  );
});