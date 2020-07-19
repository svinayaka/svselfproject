
var speedType = (function () {
    function SpeedType() {
        this.score = 0;
        this.timer = 0;
        this.gameStart = false;
        this.difficulty = 'easy';
        currentWord = '';
        var wordData = ["prefiguration", "archetype", "epitome", "guide", "holotype", "image", "loadstar", "lodestar", "microcosm", "original", "paradigm", "pilot", "prototype", "template", "templet", "type specimen"];
        var selectOptions = [
            { id: 'selectLabel', className: 'selectLabel', value: 'Easy' },
            { id: 'selectLabel', className: 'selectLabel', value: 'Medium' },
            { id: 'selectLabel', className: 'selectLabel', value: 'Hard' }
        ];
        SpeedType.prototype.renderDOMSelectComponent = function (id, options, labelId) {
            var documentFrag = document.createDocumentFragment();
            var selectElm = document.createElement('select');
            var selectLabelElm = document.createElement('label');
            selectElm.addEventListener('change', onSelectionChanged.bind(this));
            selectLabelElm.htmlFor = id;
            selectLabelElm.id = labelId;
            selectLabelElm.classList.add(labelId);
            selectLabelElm.innerHTML = 'Difficulty';
            selectElm.id = id;
            selectElm.classList.add(id);
            options.forEach((eachOpt, index) => {
                selectElm.appendChild(generateOptions(eachOpt, index));
            });
            documentFrag.appendChild(selectLabelElm);
            documentFrag.appendChild(selectElm);
            return documentFrag;
        }
        SpeedType.prototype.renderDOMStartType = function (idName) {
            var list = [{ id: 'settings-timer', txt: 'Time Left' }, { id: 'settings-score', txt: 'Score' }, { id: 'settings-following', txt: 'Word' }];
            var documentFrag = document.createDocumentFragment();
            var timeStartElm = document.createElement('section');
            timeStartElm.id = idName;
            timeStartElm.classList.add(idName);
            var headerElm = document.createElement('h2');
            headerElm.innerHTML = 'Speed Typer';
            timeStartElm.appendChild(headerElm);
            var divElm = document.createElement('div');
            divElm.id = idName + '--timescore';
            divElm.classList.add(idName + '--timescore');
            list.forEach((eachList) => {
                divElm.appendChild(generateStartGameInfo(eachList));
            });
            timeStartElm.appendChild(divElm);
            var inputElm = document.createElement('input');
            inputElm.id = 'settings-typeArea';
            inputElm.classList.add('settings-typeArea');
            inputElm.placeholder = 'Enter the word';
            inputElm.autofocus = true;
            timeStartElm.appendChild(inputElm);
            // finally append...
            documentFrag.appendChild(timeStartElm);
            return documentFrag;
        }
        SpeedType.prototype.renderDOMEndType = function (id) {
            var timeEndElm = document.createElement('section');
            timeEndElm.classList.add(id);
            timeEndElm.id = id;
            var headerElm = document.createElement('h2');
            headerElm.innerHTML = 'Time Ran Out';
            timeEndElm.appendChild(headerElm);
            var paraElm = document.createElement('p');
            paraElm.innerHTML = 'Your final score is ';
            var spanElm = document.createElement('span');
            spanElm.classList.add('settings-timeover-finalscore');
            spanElm.id = 'settings-timeover-finalscore';
            paraElm.appendChild(spanElm);
            timeEndElm.appendChild(paraElm);
            var btnElm = document.createElement('button');
            btnElm.id = 'settings-timeover-reload';
            btnElm.classList.add('settings-timeover-reload');
            btnElm.innerHTML = 'Reload';
            btnElm.addEventListener('click', onReload.bind(this));
            timeEndElm.appendChild(btnElm);
            return timeEndElm;
        }
        SpeedType.prototype.getAllDifficultLevel = function () {
            return selectOptions;
        }
        SpeedType.prototype.getDifficultLevel = function () {
            return this.difficulty;
        }
        SpeedType.prototype.setDifficultLevel = function (diffLevel) {
            this.difficulty = selectOptions[diffLevel];
        }
        SpeedType.prototype.setScore = function (score) {
            this.score = score;
        }
        SpeedType.prototype.getScore = function() {
            return this.score;
        }
        SpeedType.prototype.setTimer = function (timer) {
            this.timer = timer;
        }
        SpeedType.prototype.getTimer = function() {
            return this.timer;
        }
        SpeedType.prototype.getAllWords = function () {
            return wordData;
        }
        SpeedType.prototype.randomWords = function () {
            currentWord = wordData[Math.floor(Math.random() * Math.floor(wordData.length - 1))]
            return currentWord;
        }
        SpeedType.prototype.getCurrentWord = function () {
            return currentWord;
        }
    }
    return new SpeedType();
})();
function generateStartGameInfo(list) {
    var textElm = document.createTextNode(list.txt);
    var paraElm = document.createElement('p');
    var spanElm = document.createElement('span');
    paraElm.id = list.id;
    paraElm.classList.add(list.id);
    spanElm.id = list.id + '-info';
    spanElm.classList.add(list.id + '-info');
    paraElm.appendChild(textElm);
    paraElm.appendChild(spanElm);
    return paraElm;
}

(function (speedType) {
    if (speedType) {
        var selectFormContainer = document.getElementById('settings-form-container');
        var selectContainer = document.getElementById('settings-select-container');
        var settingsContainer = document.getElementById('settings-timer-container');
        clearDOM(selectContainer);
        selectContainer.appendChild(speedType.renderDOMSelectComponent('settings-select', speedType.getAllDifficultLevel(), 'settings-Label'));
        settingsContainer.appendChild(speedType.renderDOMStartType('settings-timestart'));
        settingsContainer.appendChild(speedType.renderDOMEndType('settings-timeranout'));
        bindAllEvents.call(speedType, selectFormContainer);
        init.call(speedType);
    };
})(speedType);

function init() {
    var startElm = document.getElementById('settings-timestart');
    var endElm = document.getElementById('settings-timeranout');
    showHide.call(this, startElm, endElm);
    var timerElm = document.getElementById('settings-timer-info');
    var scoreElm = document.getElementById('settings-score-info');
    resetGame.call(this, scoreElm, timerElm);
    gameRender.call(this);
}
function bindAllEvents(selectFormContainer) {
    var inputEnterElm = document.getElementById('settings-typeArea');
    var settingsbtn = document.getElementById('settings-btn');
    var startBtn = document.getElementById('settings-startGame');
    inputEnterElm.addEventListener('keypress', onEnterClicked.bind(this));
    settingsbtn.addEventListener('click', onSettingClicked.bind(this, selectFormContainer));
    startBtn.addEventListener('click', onReload.bind(this));
}
function showHide(showElm, hideElm) {
    hideElm.style.display = 'none';
    showElm.style.display = 'block';
}
function resetGame(scoreReset, timeReset) {
    this.setScore(0);
    this.setTimer(0);
    scoreReset.innerHTML = 0;
    timeReset.innerHTML = 0;
}
function gameRender() {
    var startTime = document.getElementById('settings-timestart');
    startTime.style.display = 'block';
    var endTime = document.getElementById('settings-timeranout');
    endTime.style.display = 'none';
}
//---------default events binded-------------//
function onSelectionChanged(event) {
    updateGameDifficult.call(this);
}
function onSettingClicked(elm) {
    if (elm.classList.contains('settings-form-container-hide')) {
        elm.classList.remove('settings-form-container-hide');
        elm.classList.add('settings-form-container-show');
    } else {
        elm.classList.remove('settings-form-container-show');
        elm.classList.add('settings-form-container-hide');
    }
}
function onEnterClicked(event) {
    if (event.keyCode == 13 && event.key == 'Enter') {
        var typedWord = event.target.value.toLowerCase();
        var correctWord = this.getCurrentWord();
        var currentScore = this.getScore();
        var currentTimer = this.getTimer();
        var difficultType = this.getDifficultLevel();
        if (typedWord == correctWord) {
            this.setScore(++currentScore);
            incrementTimer.call(this, currentTimer, difficultType);
            updateDOMScore.call(this);
            updateDOMTimer.call(this);
            updateDOMWord.call(this);
            event.target.value = '';
        }
    }
}
function updateDOMWord() {
    var wordElm = document.getElementById('settings-following-info');
    var newWord = this.randomWords();
    wordElm.innerHTML = newWord;
}
function updateDOMScore() {
    var scoreElm = document.getElementById('settings-score-info');
    scoreElm.innerHTML = this.getScore();
}
function updateDOMTimer() {
    var timerElm = document.getElementById('settings-timer-info');
    timerElm.innerHTML = this.getTimer();
}
function incrementTimer(currentTimer, difficultType) {
    var domTimerElm = document.getElementById('settings-timer-info');
    switch(difficultType.value) {
        case 'Easy':
            this.setTimer(6 + currentTimer); 
            break;
        case 'Medium' :
            this.setTimer(4 + currentTimer); 
            break;
        case 'Hard' :
            this.setTimer(2 + currentTimer); 
            break;
    }
    domTimerElm.innerHTML = this.getTimer();

}
//-------------------------------------//
function onReload(event) {
    var startElm = document.getElementById('settings-startGame');
    startElm.style.display = 'none';
    gameRender.call(this);
    updateGameDifficult.call(this);
    updateDOMGame.call(this);
    updateDOMGameTimer.call(this);
}
function updateGameDifficult() {
    var diffSelectionElm = document.getElementById('settings-select');
    var diffLevelIndex = diffSelectionElm.selectedIndex;
    this.setDifficultLevel(diffLevelIndex);
    var currentTimer = this.getTimer();
    var diffLevelType = this.getDifficultLevel();
    incrementTimer.call(this, currentTimer, diffLevelType, 0);
}
function updateDOMGame() {
    var preTextShow = document.getElementById('settings-following');
    var textShow = document.getElementById('settings-following-info');
    textShow.innerHTML = this.randomWords();
}
function updateDOMGameTimer() {
    var domTimerInfo = document.getElementById('settings-timer-info');
    var refInterval = setInterval(() => {
        var clockTick = this.getTimer();
        this.setTimer(--clockTick);
        domTimerInfo.innerHTML = clockTick;
        if (clockTick == 0) {
            gameTimeUp.call(this, clockTick, refInterval);
        }
    }, 1000);
}
function gameTimeUp(clockTick, refInterval) {
    this.setTimer(clockTick);
    clearInterval(refInterval);
    gameOver.call(this);
}
function gameOver() {
    var startTime = document.getElementById('settings-timestart');
    startTime.style.display = 'none';
    var scoreElm = document.getElementById('settings-timeover-finalscore');
    scoreElm.innerHTML = this.getScore();
    var endTime = document.getElementById('settings-timeranout');
    endTime.style.display = 'block';
}

//---------------------//
function generateOptions(option, index) {
    var optElm = document.createElement('OPTION');
    optElm.value = option.value;
    optElm.innerHTML = option.value;
    optElm.classList.add(option.className);
    optElm.id = option.classId + index;
    return optElm;
}
function clearDOM(elm) {
    elm.innerHTML = '';
}
    //--------------------//




