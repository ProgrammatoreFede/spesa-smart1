const CACHE_NAME = 'spesa-store-v1';
const FILES_TO_CACHE = [
  '/spesa-smart/',
  '/spesa-smart/index.html',
  '/spesa-smart/icon-192.png',
  '/spesa-smart/icon-512.png'
];

// Install: metto in cache i file principali
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate: pulizia vecchie cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch: rispondo prima dalla cache, poi dalla rete
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
