(function () {
    var CASHE_NAME = 'newsapp';
    var urlCache = [
        '/PWANewsApp/pwanewsapp.html',
        '/PWANewsApp/pwanewsapp.css',
        '/PWANewsApp/pwanewsapp.js'
    ];
    this.addEventListener('install', (event) => {
        self.skipWaiting();
        event.waitUntil(
            caches.open(CASHE_NAME)
                .then((cache) => {
                    console.log('Cache Opened!')
                    return cache.addAll(urlCache);
                })
        )
    });
    this.addEventListener('activate', (event) => {
        console.log('Activated ', CASHE_NAME);
    });
    this.addEventListener('fetch', (event) => {
        debugger;
        console.log('Event URL:', event.request.url);
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) {
                        console.log('Response found:', response);
                        return response;
                    } else {
                        return fetch(event.request);
                    }
                })
                .catch(err => console.log(err))
        )
        
    });
})();
