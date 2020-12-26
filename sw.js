const staticCacheName = 'site-static-v2';
const dynamicCache = 'site-dynamic-v2'
const assets = [
    '/',                // URL route
    '/index.html',      // Files needed
    '/js/app.js',
    '/js/ui.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v70/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/img/dish.png',
    '/pages/fallback.html'
]
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }

        })
    })

}



self.addEventListener('install', e => {

    e.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets)
        }))

})

self.addEventListener('activate', evt => {

    evt.waitUntil(
        caches.keys().then(keys => {

            return Promise.all(
                keys
                    .filter(key => key !== staticCacheName && key !== dynamicCache)
                    .map(key => caches.delete(key))
            )
        })
    )
})


self.addEventListener('fetch', evt => {
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCache).then(cache => {

                        cache.put(evt.request.url, fetchRes.clone())
                        limitCacheSize(dynamicCache, 15)
                        return fetchRes
                    })
                })
            }).catch(() => {
                if (evt.request.url.indexOf('.html') !== -1)
                    return caches.match('/pages/fallback.html');
            }
            ))
    }
})