(function() {
    var memoryList = [1,2,3,4,5,6,7,8];
    function createCards() {
        var div = document.createDocumentFragment('div');
        var gameElm = document.getElementById('game');
        var cardList = memoryList.map((eachCard, id) => {
            var card = document.createElement('div');
            var backCard =  backCards(id+1);
            var frontCard =  frontCards(id+1);
            card.appendChild(backCard);
            card.appendChild(frontCard);
            return card;
        });
        div.appendChild(cardList);
        gameElm.appendChild(div);
    }

    function backCards(id) {
        var backElm = document.createElement('div');
        backElm.classList = 'back';
        backElm.id = `back${id}`
        return backElm;
    }
    function frontCards(id) {
        var frontElm = document.createElement('div');
        frontElm.classList = 'front';
        frontElm.id = `front${id}`;
        return frontElm;
    }
    createCards();
})()