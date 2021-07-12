// source: https://codelabs.developers.google.com/codelabs/workbox-lab/#3
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
    console.log(`Workbox is loaded.`);

    // remove search parameters for proper navigation
    workbox.precaching.precacheAndRoute([], {
        ignoreUrlParametersMatching: [/.*/]
    });

    // cache Google fonts and stylesheets used by mdbook
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        new workbox.strategies.CacheFirst({
            cacheName: "google-fonts-stylesheets"
        })
    );

    self.addEventListener('activate', function (event) {
        event.waitUntil(
            caches.keys().then(
                function (cacheNames) {
                    return Promise.all(
                        cacheNames
                            .filter(function (cacheNames) { })
                            .map(function (cacheName) {
                                return caches.delete(cacheName);
                            })
                    );
                }
            )
        );
    });

    self.addEventListener('message', function (event) {
        if (event.data.action === 'skipWaiting') {
            this.self.skipWaiting();
        }
    });
} else {
    console.log(`Workbox didn't load.`);
}