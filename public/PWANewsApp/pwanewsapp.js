(function () {
        
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            try {
                var serviceWorker = navigator.serviceWorker.register('/PWANewsApp/pwanewsapp.sw.js');
                serviceWorker
                .then(register => {
                    console.log(register);
                })
                .catch(err => console.log('Error in getting Service Worker file!', err));
            } catch (err) {
                console.log(err);
            } 
        });
    }
})();