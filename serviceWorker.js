
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('olistictimer').then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './style.css',
                './app.js',
                './manifest.json',
                './assets/icon-192.png',
                './assets/icon-512.png',
                './assets/logo-header.png',
                './assets/splash-1024.png'
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
