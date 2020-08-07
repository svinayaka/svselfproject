(function() {
    //initialize();
    loadAboutStyleSheet();
    loadProfilePic();
})();
// function initialize() {
//     var aboutPage = document.getElementById('aboutPage');
//     var dummy1 = createDiv('leftAboutPage', 'leftAboutPage');
//     var temp = dummy1.appendChild(dummy2);
//     debugger;
//     aboutPage.appendChild(dummy);
//     aboutPage.appendChild(createDiv('rightAboutPage', 'rightAboutPage'));
// }
// function mainLayout() {
//     createDiv('leftAboutPage', 'leftAboutPage');

// }
// function createDiv(className, Id) {
//     var divElm = document.createElement('div');
//     divElm.classList.add(className);
//     divElm.id = Id;
//     return divElm;
// }
// function createImg() {
//     var imgElm = document.createElement('img');
//     imgElm.src = ORIGINALURL + '/personalblog/profilePic';
//     imgElm.classList.add('myProfile');
//     return imgElm;
// }
function loadAboutStyleSheet() {
    var aboutPage = document.getElementById('aboutPage');
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", ORIGINALURL + ABOUTCSS);
    aboutPage.appendChild(fileref);
}
function loadProfilePic() {
    var imgElm = document.getElementById('leftAboutPageProfilePic');
    imgElm.src = ORIGINALURL + '/personalblog/profilePic';
    imgElm.classList.add('myProfile');
}