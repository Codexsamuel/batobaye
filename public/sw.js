// Service Worker pour Batobaye Market
const CACHE_NAME = 'batobaye-market-v1';
const urlsToCache = [
  '/',
  '/admin',
  '/about',
  '/contact',
  '/products'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
}); 