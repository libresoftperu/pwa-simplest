self.addEventListener('install', function(event) {
  console.log('WORKER: install event in progress.');
  event.waitUntil(
    caches
      .open('simple-sw-v1')
      .then(function(cache) {
        return cache.addAll([
          './'
        ]);
      })
      .then(function() {
        console.log('WORKER: install completed');
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('WORKER: fetch event in progress.');
  event.respondWith(
    caches
      .match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
