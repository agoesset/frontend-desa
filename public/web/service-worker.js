const staticCacheName = "precache-v3.2.0";
const dynamicCacheName = "runtimecache-v3.2.0";

// Pre Caching Assets
const precacheAssets = [
  "/",
  "/offline",
  "/img/icons/icon-72x72.png",
  "/img/icons/icon-96x96.png",
  "/img/icons/icon-128x128.png",
  "/img/icons/icon-144x144.png",
  "/img/icons/icon-152x152.png",
  "/img/icons/icon-192x192.png",
  "/img/icons/icon-384x384.png",
  "/img/icons/icon-512x512.png",
  "/img/bg-img/no-internet.png",
  "/js/theme-switching.js",
  "/manifest.json",
  "/web/js/pwa.js",
];

// Install Event
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(precacheAssets);
    })
  );
});

// Activate Event
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request).then((response) => {
            return caches.open(dynamicCacheName).then(function (cache) {
              // Store the response in cache
              cache.put(event.request, response.clone());
              return response;
            });
          })
        );
      })
      .catch(function () {
        // Fallback Page, When No Internet Connection
        return caches.match("/offline");
      })
  );
});
