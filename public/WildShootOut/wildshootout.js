// https://subscription.packtpub.com/video/web_development/9781789801385/79426/79432/game-prep-style-your-game
var lastHideOut = null;
var gameOver = false;
var score = 0;
var gameBoardCards = 8;

var startBtn = document.getElementById('wildShootOut__gameStart');
var endBtn = document.getElementById('wildShootOut__gameEnd');

var gameBoard = document.getElementById('wildShootOut__board');

startBtn.addEventListener('click', startGame);

function startGame() {
    createGameBoard()
}

function createGameBoard() {
    gameBoard.innerHTML = '';
    var frag = document.createDocumentFragment();
    for (var i = 0 ; i < gameBoardCards; i++) {
        var divElm = document.createElement('div');
        divElm.className = "wildShootOut__boardCards";
        var divFriend = document.createElement('div');
        divFriend.setAttribute('class', 'wildShootOut__boardCards__friend');
        var divEnemy = document.createElement('div');
        divEnemy.setAttribute('class', 'wildShootOut__boardCards__bad');
        var divBrick = document.createElement('div');
        divBrick.setAttribute('class', 'wildShootOut__boardCards__brick');
        divElm.appendChild(divFriend);
        divElm.appendChild(divEnemy);
        divElm.appendChild(divBrick);
        frag.appendChild(divElm);
    }
    gameBoard.appendChild(frag);
}