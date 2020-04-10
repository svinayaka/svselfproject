(function() {
    var memoryList = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    var selectedCards = [];
    var results = [];
    memoryList = shuffleArray(memoryList);
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

    function shuffleArray(cards) {
        var shuffledCards = []; 
        for (let i = cards.length ; i >= 0; i--) {
            var idx = parseInt(Math.random() * (8 - 0) + 0);
            var elm = cards.splice(idx, 1)[0];
            if (!isNaN(elm)) {
                shuffledCards.push(elm);
            } else {
                i = cards.length;
            }
        }
        return shuffledCards;
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
        validateSelectedCard(event);
    }

    function validateSelectedCard(event) {
        var count = selectedCards.length;
        if (count >= 2) {
            flipCardBackWard(event);
            checkResults(event);
        } else {
            flipCardBackWard(event);
        }
    }

    function checkResults(event) {
        var resultMatch = (selectedCards[0] == selectedCards[1]) ? true : false;
        if (resultMatch) {
            console.log('Matches!')
            selectedCards.length = 0;
        } else {
            selectedCards.length = 0;
        }
    }

    function flipCardBackWard(event) {
        event.target.style.transform = "rotateY(90deg)";
        event.target.previousElementSibling.style.transform = "rotateY(0deg)";
    }
    
    createCards();
})()