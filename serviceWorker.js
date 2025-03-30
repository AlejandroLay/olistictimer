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

// 🔔 Preparado para Push Notifications (pendiente de que iOS lo habilite completamente)
self.addEventListener('push', e => {
    const data = e.data ? e.data.json() : {};
    const title = data.title || "Olistic Timer";
    const options = {
        body: data.body || "Recuerda tomar tu Olistic 💊",
        icon: './assets/icon-192.png',
        badge: './assets/icon-192.png'
    };
    e.waitUntil(self.registration.showNotification(title, options));
});

// 🔔 Acción al hacer click en la notificación
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(clients.openWindow('./'));
});
