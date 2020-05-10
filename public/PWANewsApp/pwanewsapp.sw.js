var CASHE_NAME = 'newsapp';
var urlCache = [
    '/PWANewsApp/pwanewsapp.html',
    '/PWANewsApp/pwanewsapp.css',
    '/PWANewsApp/pwanewsapp.js'
];
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CASHE_NAME)
            .then((cache) => {
                console.log('Cache Opened!')
                return cache.addAll(urlCache);
            })
    )
});
this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request) 
            .then((response) => {
                if (response) {
                    return response;
                } else {
                    return fetch(event.target);
                }
            })
    )
})
