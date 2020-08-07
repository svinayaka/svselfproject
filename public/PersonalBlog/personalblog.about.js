(function() {
    loadAboutStyleSheet();
    loadProfilePic();
})();
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