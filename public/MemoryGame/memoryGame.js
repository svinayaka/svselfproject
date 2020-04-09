(function() {
    var memoryList = [1,2,3,4,5,6,7,8];
    function createCards() {
        var fragmentDiv = document.createDocumentFragment('div');
        var gameElm = document.getElementById('game');
        memoryList.forEach((eachCard, id) => {
            var card = document.createElement('div');
            var backCard =  backCards(id+1);
            var frontCard =  frontCards(id+1);
            card.classList = 'cards'
            card.appendChild(backCard);
            card.appendChild(frontCard);
            fragmentDiv.append(card);
        });
        gameElm.appendChild(fragmentDiv);
    }

    function backCards(id) {
        var backElm = document.createElement('div');
        backElm.classList = 'back';
        backElm.id = `back${id}`;
        backElm.innerHTML = 'Back';
        return backElm;
    }
    function frontCards(id) {
        var frontElm = document.createElement('div');
        frontElm.classList = 'front';
        frontElm.id = `front${id}`;
        frontElm.innerHTML = 'Front';
        frontElm.onclick = cardHandler.bind(this);
        return frontElm;
    }

    function cardHandler() {

    }
    createCards();
})()