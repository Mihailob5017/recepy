const staticCacheName = 'site-static';
const assets = [
    '/',                // URL route
    '/index.html',      // Files needed
    '/js/app.js',
    '/js/ui.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/img/dish.png'
]

self.addEventListener('install', e => {

    e.waitUntill(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets')
            cache.addAll(assets)
        }))

})

self.addEventListener('activate', e => {
    console.log('service worker has been activated')
})

self.addEventListener('fetch', e => {

})