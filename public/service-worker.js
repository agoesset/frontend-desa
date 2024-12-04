const CACHE_NAME = "desa-digital-v1";

// Assets to cache
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline",
  "/img/icons/icon-72x72.png",
  "/img/icons/icon-96x96.png",
  "/img/icons/icon-128x128.png",
  "/img/icons/icon-144x144.png",
  "/img/icons/icon-152x152.png",
  "/img/icons/icon-192x192.png",
  "/img/icons/icon-384x384.png",
  "/img/icons/icon-512x512.png",
];

// Install SW
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing....");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate SW
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  // Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  // Check if request is made by chrome extensions or web page
  // If request is made for web page url must contains http.
  if (!(event.request.url.indexOf("http") === 0)) return;

  // Skip POST requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cache
        caches.open(CACHE_NAME).then((cache) => {
          // Add response to cache
          if (event.request.method === "GET") {
            cache.put(event.request, resClone);
          }
        });
        return res;
      })
      .catch(() => caches.match(event.request).then((res) => res))
  );
});
