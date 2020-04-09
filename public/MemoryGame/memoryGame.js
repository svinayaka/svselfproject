(function() {
    var memoryList = [1,2,3,4,5,6,7,8];
    function createCards() {
        var div = document.createDocumentFragment('div');
        var gameElm = document.getElementById('game');
        var cardList = memoryList.map((eachCard) => {
            var 
        });

    }

    function backCards(id) {
        var backElm = document.createElement('div');
        backElm.classList = 'back';
        backElm.id = id;
        return backElm;
    }
    function frontCards(id) {
        var frontElm = document.createElement('div');
        frontElm.classList = 'front';
        frontElm.id = id;
        return frontElm;
    }
})()