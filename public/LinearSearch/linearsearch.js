var linearSearchModal = (function() {
    var modal = {};
    modal.data = [];

    modal.__proto__.push = function(val) {
        this.data.push(val);
    }
    modal.__proto__.search = function(findVal, callback) {
        return this.data.find(function(val, id) {
            callback(val, id, val==findVal);
            return val == findVal;
        });
    }
    return modal;
})();

var linearSearchUI = (function(linearSearchModal) {
    var UI = {};
    UI.ElementList = [];
    UI.__proto__.createElements = function() {
        linearSearchModal.forEach(function(val) {
            this.ElementList.push(document.createElement('div'));
        });
    }
    UI.__proto__.search = function(elmVal) {
        linearSearchModal.search(elmVal, this.highlightChanges)
    }
    UI.__proto__.insertElements = function(val) {
        linearSearchModal.data.push(val);
        this.ElementList.push(document.createElement('div'));
    }
    UI.__proto__.highlightChanges = function(val, id, foundStatus) {

    }
    UI.__proto__.renderElementsAtDOM = function() {

    }
})(linearSearchModal);


