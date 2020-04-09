(function() {
    var memoryList = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    var flickNumber = 0;
    var selectedCards = [];
    function createCards() {
        var fragmentDiv = document.createDocumentFragment('div');
        var gameElm = document.getElementById('game');
        memoryList.forEach((eachCard, id) => {
            var card = document.createElement('div');
            var backCard =  backCards(eachCard, id+1);
            var frontCard =  frontCards(eachCard, id+1);
            card.classList = 'cards'
            card.appendChild(backCard);
            card.appendChild(frontCard);
            fragmentDiv.append(card);
        });
        gameElm.appendChild(fragmentDiv);
    }

    function backCards(val, id) {
        var backElm = document.createElement('div');
        backElm.classList = 'back';
        backElm.id = `back${id}`;
        backElm.innerHTML = `CARD${val}`;
        return backElm;
    }
    function frontCards(val, id) {
        var frontElm = document.createElement('div');
        frontElm.classList = 'front';
        frontElm.id = `front${id}`;
        frontElm.innerHTML = 'Guess the Card';
        frontElm.onclick = cardHandler.bind(this);
        return frontElm;
    }

    function cardHandler(event) {
        var clickedElm = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        selectedCards.push(memoryList[clickedElm]);
        validateSelectedCard()
    }

    function validateSelectedCard() {
        var count = selectedCards.length;
        if (count >= 2) {
            
        }
    }
    
    createCards();
})()