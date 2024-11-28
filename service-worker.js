self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('fox-store').then((cache) => cache.addAll([
        '/DV-proyecto_final-pwa/index.html',
        /* '/css/custom.css',
        '/js/custom.js', */

        '/DV-proyecto_final-pwa/assets/img/favicon.png',
        '/DV-proyecto_final-pwa/assets/img/logo-md.png',
        '/DV-proyecto_final-pwa/assets/img/logo.png',
        '/DV-proyecto_final-pwa/pwa.js',
      ])),
    );
});

self.addEventListener('fetch', (e) => {
    // console.log('Event fetch: '+e.request.url)
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});