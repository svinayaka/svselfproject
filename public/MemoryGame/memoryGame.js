(function() {
    var memoryList = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    var selectedCards = [];
    var totalScore = memoryList.length/2;
    var score = 0;
    var results = [];
    var removeClickEventHandler = {};
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
        selectedCards.push({ id: clickedElm, val: memoryList[clickedElm]});
        checkEventClickHandler(clickedElm, event);
        validateSelectedCard(event);
    }

    function checkEventClickHandler(clickedElm, event) {
        removeClickEventHandler[clickedElm] = event.target; 
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
        var resultValMatch = (selectedCards[0].val == selectedCards[1].val) ? true : false;
        var resultIdDiff = (selectedCards[0].id != selectedCards[1].id) ? true : false;
        var removeHandlers = Object.keys(removeClickEventHandler);
        if (resultValMatch && resultIdDiff) {
            removeHandlers.forEach((eachEvent) => removeClickEventHandler[eachEvent].onclick = null);
            incrementScores();
            selectedCards.length = 0;
            removeClickEventHandler = {};
        } else {
            reverseflipCardBackWard(removeHandlers, removeClickEventHandler);
            selectedCards.length = 0;
            removeClickEventHandler = {};
        }
    }

    function incrementScores() {
        score = score++;
    }

    function reverseflipCardBackWard(removeHandlers, removeClickEventHandler) {
        removeHandlers.forEach((eachEvent) => {
            removeClickEventHandler[eachEvent].style.transform = "rotateY(0deg)";
            removeClickEventHandler[eachEvent].previousElementSibling.style.transform = "rotateY(90deg)";
        });
    }

    function flipCardBackWard(event) {
        event.target.style.transform = "rotateY(90deg)";
        event.target.previousElementSibling.style.transform = "rotateY(0deg)";
    }
    
    createCards();
})()