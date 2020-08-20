// SERVER URLs
var ORIGINALURL = window.location.origin;
var BGURL = '/personalblog/backgroudPic';
var FOOTERURL = '/personalblog/footerPage';
var ABOUTURL = '/personalblog/aboutpage';
var HOMEURL = '/personalblog/homePage';
var CONTACTURL = '/personalblog/contactPage';

// LOCAL URLs
var ABOUTJS = '/PersonalBlog/personalblog.about.js';
var HOMEJS = '/PersonalBlog/personalblog.home.js';
var CONTACTJS = '/PersonalBlog/personalblog.contact.js';
var ABOUTCSS = '/PersonalBlog/personalblog.about.css';

var CONTENTDOMPAGE = '';
(function() {
    var floatMenues = {};
    getDOMRequest(ORIGINALURL + FOOTERURL).then(footerResponse.bind(floatMenues)).catch(responseError);
})();  
function footerResponse(resp) {
    var footerElm = document.getElementById('footer');
    footerElm.appendChild(DOMParser(resp));
    invoke.call(this);
}

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
        divElm.dataset.val = divRef.id;
        if (divRef.selected) divElm.classList.add('selectedMenu');
        else divElm.classList.remove('selectedMenu');
        divElm.appendChild(divTxt);
        divElm.addEventListener('click', onMenuClick.bind(this));
        return divElm;
    }
    function onMenuClick(event) { 
        var menuSelected = event.target.dataset.val;
        switch(menuSelected) {
            case 'ABOUT' :
                getDOMRequest(ORIGINALURL + ABOUTURL).then(aboutResponse.bind(this));
                break;
            case 'HOME' :
                getDOMRequest(ORIGINALURL + HOMEURL).then(homeResponse.bind(this));
                break;
        }
    }
    
    var scrollMenuElm = document.getElementById('scrollMenuContainer');
    scrollMenuElm.appendChild(this.initializeMenu()); 
}

// DOM render response
function aboutResponse(resp) {
    var mainElm = document.getElementById('main');
    mainElm.innerHTML = '';
    var aboutPage = DOMParser(resp);
    var aboutScript = document.createElement("script");
    aboutScript.src = ABOUTJS;
    aboutPage.appendChild(aboutScript);
    mainElm.appendChild(aboutPage);
}
function homeResponse(resp) {
    var mainElm = document.getElementById('main');
    mainElm.innerHTML = '';
    var homePage = DOMParser(resp);
    var homeScript = document.createElement("script");
    homeScript.src = HOMEJS;
    homeScript.defer = true;
    homePage.appendChild(homeScript);
    CONTENTDOMPAGE = homePage;
    mainElm.appendChild(homePage);
}
function contactResponse(resp) {
    var mainElm = document.getElementById('main');
    mainElm.innerHTML = '';
    var aboutPage = DOMParser(resp);
    var aboutScript = document.createElement("script");
    aboutScript.src = CONTACTJS;
    aboutScript.defer = true;
    aboutPage.appendChild(aboutScript);
    CONTENTDOMPAGE = homePage;
    mainElm.appendChild(aboutPage);
}

// Common functions
function getDOMRequest(url) {
    return fetch(url).then(resp => {
        return resp.text();
    });
}
function DOMParser(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}
function responseError(err) { /*TODO*/ };

window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Active!')
      } else {
        console.log('InActive!')
      }
});

window.onload = function() {
    var bodyElm = document.getElementsByTagName('body')[0];
    bodyElm.background = ORIGINALURL + BGURL;
}
