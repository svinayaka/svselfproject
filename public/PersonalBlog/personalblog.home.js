(function() {
    fetch(window.location.origin + '/personalblog/homePage')
    .then(resp => resp.text())
    .then(resp => {
        var mainElm = document.getElementById('main');
        mainElm.appendChild(DOMParser(resp));
    });
    function DOMParser(html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstElementChild;
    }
})();