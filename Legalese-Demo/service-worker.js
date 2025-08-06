self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('legalese-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/about.html',
        '/create.html',
        '/profile.html',
        '/templates.html',
        '/splash.html',
        '/css/styles.css',
        '/js/app.js',
        '/assets/logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
