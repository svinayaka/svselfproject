// Tutorial
// https://subscription.packtpub.com/video/application_development/9781838642211/99740/99743/cache

(function () {
    const APIKEY = '604ca1a2deb2439684eb76c966aa72d7';    
    const BASEURL = 'http://newsapi.org/v2/top-headlines';
    const countryListElm = document.getElementById('countrylist');
    const categoryListElm = document.getElementById('countryCategory');
    const searchBtn = document.getElementById('searchBtn');
    const countrylist = [
        { countryKey: 'in', countryName: 'in' },
        { countryKey: 'usa', countryName: 'usa' },
    ];
    const categorylist = [
        { categoryKey: 'entertainment', categoryName: 'Entertainment' },
        { categoryKey: 'health', categoryName: 'Health' },
    ];

    searchBtn.addEventListener('click', (event) => {
        var countryInput = document.getElementById('country').value;
        var categoryInput = document.getElementById('category').value;
        var fetchURL = generateURL(BASEURL, countryInput.toLowerCase(), categoryInput.toLowerCase(), APIKEY);
        fetch(fetchURL)
            .then(response => response.json())
            .then(resp => {
                console.log(resp);
            }, err => console.log(err))
            .catch(err => console.log(err));
    })

    function generateCountryList() {
        var fragmentCountryList = document.createDocumentFragment();
        for (var i = 0; i < countrylist.length; i++) {
            fragmentCountryList.appendChild(createList(countrylist[i], 'countryName', 'countryKey'));
        }
        countryListElm.appendChild(fragmentCountryList);
    }
    function generateCategoryList() {
        var fragmentCategoryList = document.createDocumentFragment();
        for (var i = 0; i < categorylist.length; i++) {
            fragmentCategoryList.appendChild(createList(categorylist[i], 'categoryName', 'categoryKey'));
        }
        categoryListElm.appendChild(fragmentCategoryList);
    }
    function createList(countryInfo, name, key) {
        var list = document.createElement('option');
        list.value = countryInfo[name];
        list.dataset.countryKey = countryInfo[key];
        return list;
    }
    function generateURL(baseurl, country, category, apikey) {
        var baseURL = baseurl;
        var countryKey = (country) ? 'country=' + country + '&': '';
        var categoryKey = (category) ? 'category=' + category + '&': '';
        var apiKey = (apikey) ? 'apiKey=' + apikey : '';
        var completeUrl = baseURL + '?' + countryKey + categoryKey + apiKey;
        return completeUrl;
    }

    function triggerServiceWorker() {
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
    }
    generateCountryList();
    generateCategoryList();
    triggerServiceWorker();
})();