(function() {
    let memoryList = null;
    let selectedCards = null;
    let tries = null;
    let timer = null;
    let totalScore = null;
    let score = null;
    let results = null;
    let removeClickEventHandler = null;

    function createCards() {
        let fragmentDiv = document.createDocumentFragment('div');
        let gameElm = document.getElementById('game');
        gameElm.innerHTML = '';
        memoryList.forEach((eachCard, id) => {
            let card = document.createElement('div');
            let backCard =  backCards(eachCard, id+1);
            let frontCard =  frontCards(eachCard, id+1);
            card.classList = 'cards'
            card.appendChild(backCard);
            card.appendChild(frontCard);
            fragmentDiv.append(card);
        });
        gameElm.appendChild(fragmentDiv);
    }

    function shuffleArray(cards) {
        let shuffledCards = []; 
        for (let i = cards.length ; i >= 0; i--) {
            let idx = parseInt(Math.random() * (8 - 0) + 0);
            let elm = cards.splice(idx, 1)[0];
            if (elm) {
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
        backElm.innerHTML = `${val}`;
        return backElm;
    }
    function frontCards(val, id) {
        let frontElm = document.createElement('div');
        frontElm.classList = 'front';
        frontElm.id = `front${id}`;
        frontElm.innerHTML = 'Guess the Card';
        frontElm.onclick = cardHandler.bind(this);
        return frontElm;
    }

    function cardHandler(event) {
        let clickedElm = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        selectedCards.push({ id: clickedElm, val: memoryList[clickedElm]});
        checkEventClickHandler(clickedElm, event);
        validateSelectedCard(event);
    }

    function checkEventClickHandler(clickedElm, event) {
        removeClickEventHandler[clickedElm] = event.target; 
    }

    function validateSelectedCard(event) {
        let count = selectedCards.length;
        if (count >= 2) {
            flipCardBackWard(event);
            checkResults(event);
        } else {
            flipCardBackWard(event);
        }
    }

    function checkResults(event) {
        let resultValMatch = (selectedCards[0].val == selectedCards[1].val) ? true : false;
        let resultIdDiff = (selectedCards[0].id != selectedCards[1].id) ? true : false;
        let removeHandlers = Object.keys(removeClickEventHandler);
        if (resultValMatch && resultIdDiff) {
            removeHandlers.forEach((eachEvent) => removeClickEventHandler[eachEvent].onclick = null);
            incrementScores();
            selectedCards.length = 0;
            removeClickEventHandler = {};
            ++tries;
            validateTries();
        } else {
            reverseflipCardBackWard(removeHandlers, removeClickEventHandler);
            selectedCards.length = 0;
            removeClickEventHandler = {};
            --tries;
        }
        validateTries();
    }

    function validateTries() {
        const triesElm = document.getElementById('tries');
        triesElm.innerHTML = `Tries: ${tries}`;
        if (tries <= 0) {
            stopGame();
        }
    }

    function incrementScores() {
        score++;
        let scoreElm = document.getElementById('score');
        scoreElm.innerText = `Score: ${score}`;   
    }

    function reverseflipCardBackWard(removeHandlers, removeClickEventHandler) {
        setTimeout(() => {
            removeHandlers.forEach((eachEvent) => {
                removeClickEventHandler[eachEvent].style.transform = "rotateY(0deg)";
                removeClickEventHandler[eachEvent].previousElementSibling.style.transform = "rotateY(90deg)";
            });
        }, 1500);
    }

    function flipCardBackWard(event) {
        event.target.style.transform = "rotateY(90deg)";
        event.target.previousElementSibling.style.transform = "rotateY(0deg)";
    }

    function startTimer() {
        let clearInterval = null;
        const timerElm = document.getElementById('timer');
        timerElm.innerText = `Timer: ${timer}`;
        interval = setInterval(() => {
            --timer;
            timerElm.innerText = `Timer: ${timer}`;
            if (timer <= 0) {
                window.clearInterval(interval);
                stopGame();
            }
        }, 1000)
    }

    function stopGame() {
        const gameElm = document.getElementById('game');
        const cards = Array.from(gameElm.children);
        cards.forEach((eachCard) => {
            eachCard.children[1].onclick = null;
        })
        
    }

    const startGameElm = document.getElementById('newGame');
    startGameElm.addEventListener('click', () => {
        var List1 = ['cat','dog','tiger','lion','orange','apple','bannana','ice-cream'];
        var List2 = ['cat','dog','tiger','lion','orange','apple','bannana','ice-cream'];
        selectedCards = [];
        score = 0;
        results = [];
        
        timer = 60;
        removeClickEventHandler = {};
        memoryList = shuffleArray(List1).concat(shuffleArray(List2));
        tries = memoryList.length;
        totalScore = memoryList.length/2;
        
        startTimer();
        validateTries();
        createCards();
    })
})()