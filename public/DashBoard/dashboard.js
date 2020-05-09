(function () {
    var projectElm = document.getElementById('projectList');
    var projectListFragment = document.createDocumentFragment();
    var projectList = [
        { txt: 'Memory Game', url: window.location.origin + '/memorygame/' }
    ];
    function generateProjectList() {
        projectList.forEach(function (eachProject) {
            projectListFragment.appendChild(createProjectList('projectList', eachProject));
        });
        projectElm.appendChild(projectListFragment);
    }
    function createProjectList(className, projectInfo) {
        var listElm = document.createElement('li');
        var hrefElm = document.createElement('a');
        listElm.className = className;
        hrefElm.className = 'projectList';
        hrefElm.href = projectInfo.url;
        hrefElm.target = '_blank';
        hrefElm.innerText = projectInfo.txt;
        listElm.appendChild(hrefElm);
        return listElm;
    }
    setTimeout(function () {
        generateProjectList();
    }, 100);
})();