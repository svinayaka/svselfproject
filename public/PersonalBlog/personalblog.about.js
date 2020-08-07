(function() {
    initialize();
})();
function initialize() {
    var aboutPage = document.getElementById('aboutPage');
    aboutPage.appendChild(createDiv().appendChild(createImg()));
    aboutPage.appendChild(createDiv());
}
function createDiv() {
    var divElm = document.createElement('div');
    return divElm;
}
function createImg() {
    var imgElm = document.createElement('img');
    imgElm.src = ORIGINALURL + '/personalblog/profilePic';
    imgElm.classList.add('myProfile');
    return imgElm;
}