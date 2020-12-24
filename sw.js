const staticCacheName = 'site-static-v2';
const assets = [
    '/',                // URL route
    '/index.html',      // Files needed
    '/js/app.js',
    '/js/ui.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v70/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/img/dish.png'
]

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
                    .filter(key => key !== staticCacheName)
                    .map( key => caches.delete(key))
            )
        })
    )
})


self.addEventListener('fetch', evt => {


    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})