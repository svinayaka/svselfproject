(function () {
    var searchUsr = {
        part: '', //snippet
        q: '',
        type: '', // channel, playlist, video
        relevanceLanguage:'',
        videoDefinition:'', // any, standard, high
        maxResults: 5,
        order: '', //date, raing, relevance, title, videoCount, viewCount
    }
    var userInput = document.getElementById('youtube-searchInput');
    var userSearch = document.getElementById('youtube-searchBtn');

    userSearch.addEventListener('click', (evet) => {
        youtubeSearch();
    });

    function youtubeSearch() {
        fetch(BASEURL + '?' + 'part=snippet&q=test&key=AIzaSyAIq4ZiW6OB7G6U4_hxUYAPFQNL3NVs7nU&maxResults=20',{
            mode: "no-cors",
            method: 'GET',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials" : true 
        })
        .then((resp) => resp.json())
        .then(resp => {
            debugger;
        })
    }

}())

