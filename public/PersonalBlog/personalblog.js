(function() {
    var floatMenues = {};
    fetch(window.location.origin + '/personalblog/footerPage').then(resp => {
        return resp.text()
    }).then(resp => {
        var footerElm = document.getElementById('footer');
        footerElm.appendChild(DOMParser(resp));
        invoke.call(floatMenues);
    }).catch(err => {
        
    });
    function DOMParser(html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstElementChild;
    }
})();  
function invoke() {
    this.menues = [
        { txt: 'Home', selected: true, id: 'HOME', type: 'menues' },
        { txt: 'About', selected: false, id: 'ABOUT', type: 'menues' },
        { txt: 'Contact', selected: false, id: 'CONTACT', type: 'menues' },
    ];
    this.__proto__.onSelection = function (selectionId) {
        this.menues.forEach(eachMenu => {
            if (eachMenu.id === selectionId) eachMenu.selected = true;
            else eachMenu.selected = false;
        });
        return this.menues;
    }
    this.renderMenues = function () {
        var fragmentDOM = document.createDocumentFragment();
        this.menues.forEach(eachMenu => {
            fragmentDOM.appendChild(createDiv.call(this, eachMenu));
        })
        return fragmentDOM;
    }
    this.__proto__.removeDOM = function (elmRef) {
        elmRef.innerHTML = '';
        return elmRef;
    }
    this.__proto__.initializeMenu = function () {
        return this.renderMenues();
    }
    function createDiv(divRef) {
        var divElm = document.createElement('div');
        var divTxt = document.createTextNode(divRef.txt);
        divElm.id = divRef.id;
        divElm.className = divRef.type;
        if (divRef.selected) divElm.classList.add('selectedMenu');
        else divElm.classList.remove('selectedMenu');
        divElm.appendChild(divTxt);
        divElm.addEventListener('click', onMenuClick.bind(this));
        return divElm;
    }
    function onMenuClick(event) { }
    var scrollMenuElm = document.getElementById('scrollMenuContainer');
    scrollMenuElm.appendChild(this.initializeMenu());
}