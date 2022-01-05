'use strict';

var cacheVersion = 9;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = '/offline.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function (cache) {
      return cache.addAll([
        '/',
        '/ui/css/main.css',
        '/ui/js/main.js',
        '/ui/css/critical.css',
        '/ui/webfonts/helvetica/helveticaneue-roman-webfont.woff',
        '/ui/webfonts/helvetica/helveticaneue-bold-webfont.woff',
        offlineUrl
      ]);
    })
  );
});

this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // Return the offline page
        return caches.match(offlineUrl);
      })
    );
  } else {
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});
