self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('fox-store').then((cache) => cache.addAll([
        '/index.html',
        /* '/css/custom.css',
        '/js/custom.js', */

        '/assets/img/favicon.png',
        '/assets/img/logo-md.png',
        '/assets/img/logo.png',
        '/pwa.js',
      ])),
    );
});

self.addEventListener('fetch', (e) => {
    // console.log('Event fetch: '+e.request.url)
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});