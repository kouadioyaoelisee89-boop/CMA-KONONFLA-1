/* ============================================================
   KingdomHub — Service Worker
   À déployer à la racine du projet Vercel (même niveau que index.html)
   ============================================================ */

const CACHE = 'kingdomhub-v1';

const EXTERNALS = [
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Cinzel+Decorative:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.allSettled(EXTERNALS.map(url =>
        fetch(url, { mode: 'no-cors' })
          .then(r => cache.put(url, r))
          .catch(() => {})
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  const isExternal = EXTERNALS.some(u => url.startsWith(u.split('?')[0]));
  const isLocal = url.startsWith(self.location.origin);

  if (isLocal) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const networkFetch = fetch(e.request)
          .then(r => {
            if (r && r.status === 200) {
              caches.open(CACHE).then(c => c.put(e.request, r.clone()));
            }
            return r;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
    return;
  }

  if (isExternal) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const networkFetch = fetch(e.request, { mode: 'no-cors' })
          .then(r => {
            caches.open(CACHE).then(c => c.put(e.request, r.clone()));
            return r;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
  }
});
