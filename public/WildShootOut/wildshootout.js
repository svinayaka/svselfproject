// https://subscription.packtpub.com/video/web_development/9781789801385/79426/79432/game-prep-style-your-game
var lastHideOut = [];
var gameOver = false;
var clearStartedGame = null;
var score = 0;
var gameBoardCards = 8;
var tries = 3;
var popNumber = 2; 
var timer = 100;
var timerRef = null;

var startBtn = document.getElementById('wildShootOut__gameStart');
var endBtn = document.getElementById('wildShootOut__gameEnd');
var audioElm = document.getElementById('playAudio');
var wildScoreBoard = document.getElementById('wildShootOut__scoreBoard');
var wildScoreBoardTries = document.getElementById('wildShootOut__scoreBoardTriesLeft');
var wildScoreBoardTimer = document.getElementById('wildShootout__scoreBoardTimer');

var gameBoard = document.getElementById('wildShootOut__board');

startBtn.addEventListener('click', startGame);
endBtn.addEventListener('click', endGame);

function reset() {
    lastHideOut = [];
    gameOver = false;
    clearStartedGame = null;
    score = 0;
    gameBoardCards = 8;
    tries = 3;
    popNumber = 2; 
    timer = 100;
    timerRef = null;
}

function startGame() {
    reset();
    audioElm.play();
    createGameBoard();
    startGameBoard();
    startBtn.disabled = true;
    endBtn.disabled = false;
    gameOver = false;
    timerRef = setInterval(function() {
        wildScoreBoardTimer.innerHTML = `Timer: ${--timer}`;
        if (timer <= 0) endGame();
    }, 1000);
}

function endGame() {
    audioElm.pause();
    audioElm.currentTime = 0;
    startBtn.disabled = false;
    endBtn.disabled = true;
    gameOver = true;
    window.clearInterval(timerRef);
}

function createGameBoard() {
    gameBoard.innerHTML = '';
    var frag = document.createDocumentFragment();
    for (var i = 0 ; i < gameBoardCards; i++) {
        var divElm = document.createElement('div');
        divElm.className = "wildShootOut__boardCards";
        var divFriend = document.createElement('div');
        divFriend.setAttribute('class', 'wildShootOut__boardCards__friend');
        divFriend.dataset.target = 'good';
        divFriend.addEventListener('click', shootout);
        var divEnemy = document.createElement('div');
        divEnemy.setAttribute('class', 'wildShootOut__boardCards__bad');
        divEnemy.dataset.target = 'bad';
        divEnemy.addEventListener('click', shootout);
        var divBrick = document.createElement('div');
        divBrick.setAttribute('class', 'wildShootOut__boardCards__brick');
        divElm.appendChild(divFriend);
        divElm.appendChild(divEnemy);
        divElm.appendChild(divBrick);
        frag.appendChild(divElm);
    }
    gameBoard.appendChild(frag);
}

function shootout(event) {
    var shootType = event.target.dataset.target;
    (shootType == 'bad') ? ++score : --tries; 
    if (tries <= 0) {
        endGame();
    } 
    updateScoreBoard(score, tries);
}

function updateScoreBoard(scores, tries) {
    wildScoreBoard.innerHTML = `Score: ${scores}`;
    wildScoreBoardTries.innerHTML = `Tries: ${tries}`; 
}

function startGameBoard() {
    randomCardPicker();
}
function intervalBasedCard(cardId, cardElm) {
    if (cardId >= 0 && cardElm) {
        var cardToShow = Math.floor(Math.random() * Math.floor(cardElm.children.length - 1));
        var cardDisplayed = cardElm.children[cardToShow];
        var className = (!cardDisplayed.className.includes('--show')) ?cardDisplayed.className + '--show' : cardDisplayed.classList[cardDisplayed.classList.length-1];
        cardDisplayed.classList.add(className);
        (function(clsName, elmId, elm) {
            clearStartedGame = setTimeout(function() {
                elm.classList.remove(clsName);
                if (!gameOver) {
                    randomCardPicker();
                } else {
                    clearTimeout(clearStartedGame);
                }
            }, 700);
        })(className, cardId, cardDisplayed);
    }
}

function randomCardPicker() {
    var gameBoard = document.querySelectorAll('.wildShootOut__boardCards');
    var currentCard = Math.floor(Math.random() * Math.floor(gameBoard.length));
    var firstId;
    var cardElm;
    if (lastHideOut.includes(currentCard)) {
        randomCardPicker();
    } else {
        lastHideOut.push(currentCard);
    }
    firstId = lastHideOut.shift();
    cardElm = gameBoard[firstId];
    intervalBasedCard(firstId, cardElm);
}