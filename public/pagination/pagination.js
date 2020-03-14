const pagination = document.querySelector('.pages');
const output = document.querySelector('.output');

const posts = {
    postPerPage : 10,
    currentPage : 1,
    results: null
}

const init = function() {
    const url = 'https://randomuser.me/api/?results=100';
    fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
        if (resp && Array.isArray(resp.results)) {
            posts.results = resp.results;
            loadPage(1)
        }
    });
}

const loadPage = function(pg) {
    let startPost = (posts.currentPage-1)*posts.postPerPage;
    let totalPages = Math.ceil(posts.results.length/ posts.postPerPage);
    let endPost = startPost + posts.postPerPage
    posts.currentPage = pg;
    output.innerHTML = `<h1>Page ${posts.currentPage}</h1>`;
    var framgmentDoc = document.createDocumentFragment();
    for(let x = startPost; x < posts.postPerPage; x++) {
        let div = document.createElement('div');
        div.innerHTML = `${posts.results[x].name.first}<br>`;
        framgmentDoc.appendChild(div);
        console.log(posts.results[x]);
    }
    output.appendChild(framgmentDoc);
}

window.addEventListener('load', function() {
    init();
})