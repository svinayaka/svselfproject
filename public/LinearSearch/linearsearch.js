var linearSearchModal = (function() {
    var modal = {};
    modal.data = [];

    modal.__proto__.push = function(val) {
        this.data.push(val);
    }
    modal.__proto__.search = function(findVal, callback) {
        var dataExecutor = [];
        return this.data.find(function(val, id) {
            dataExecutor.push(id);
            var invoke = function() {
                if (Array.isArray(dataExecutor) && dataExecutor.length > 0) {
                    var index = dataExecutor.shift();
                    var completion = new Promise(function(resolve, reject) {
                        resolve(callback(val, id, this.date[index]==findVal));
                    });
                    completion.then(function() {
                        invoke();
                    }) 
                } 
            }
            (function() {
                invoke();
            })().bind(this);
            return val == findVal;
        });
    }
    modal.__proto__.insertAll = function(ary) {
        this.data = ary;
    }
    modal.__proto__.clearAll = function() {
        this.data = [];
    }
    return modal;
})();

var linearSearchUI = (function(linearSearchModal) {
    var UI = {};
    var parentId = 'main';
    UI.ElementList = [];
    UI.__proto__.createElements = function() {
        this.ElementList = [];
        linearSearchModal.forEach(function(val) {
            this.ElementList.push(document.createElement('div'));
        });
    }
    UI.__proto__.clearElements = function() {
        this.ElementList = [];
    }
    UI.__proto__.search = function(elmVal) {
        linearSearchModal.search(elmVal, this.highlightChanges)
    }
    UI.__proto__.insertElements = function(val) {
        linearSearchModal.data.push(val);
        this.ElementList.push(document.createElement('div'));
        UI.createElements();
        UI.renderElementsAtDOM();
    }
    UI.__proto__.highlightChanges = function(val, id, foundStatus) {
        var complete = new Promise(function(resolve, reject) {
            this.ElementList[id].style.animation = "scaleSize 1s";
            this.ElementList[id].addEventListener("webkitAnimationEnd", function() { 
                var completion = new Promise(function(innerresolve, innerreject) {
                    this.animateEndFunction();
                    innerresolve('animationCompleted!');
                })
                completion.then(res => { resolve('animationCompleted!') });
            });
        })
        return complete.then(res => { return res; });
    }
    UI.__proto__.animateEndFunction = function() {
        
    }
    UI.__proto__.renderElementsAtDOM = function() {
        var docFrag = document.createDocumentFragment();
        var mainElm = document.getElementById(parentId);
        this.ElementList.forEach(function(eachDiv) {
            docFrag.appendChild(eachDiv);
        });
        mainElm.appendChild(docFrag);
    }
    UI.__proto__.addSearchModalList = function() {

    } 
    return UI;
})(linearSearchModal);


linearSearchModal.insertAll

