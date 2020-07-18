
var speedType = (function () {
    function SpeedType() {
        this.score = 0;
        this.timer = 0;
        this.gameStart = false;
        this.difficulty = 'easy';
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
            selectElm.addEventListener('change', onSelectionChanged);
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
        SpeedType.prototype.getDifficultLevel = function (id) {
            return selectOptions[id];
        }
        SpeedType.prototype.setDifficult = function (diffLevel) {
            this.difficulty = diffLevel;
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
            return wordData[Math.floor(Math.random() * Math.floor(wordData.length - 1))];
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
        var settingsbtn = document.getElementById('settings-btn');
        settingsbtn.addEventListener('click', onSettingClicked.bind(this, selectFormContainer))
        clearDOM(selectContainer);
        selectContainer.appendChild(speedType.renderDOMSelectComponent('settings-select', speedType.getAllDifficultLevel(), 'settings-Label'));
        settingsContainer.appendChild(speedType.renderDOMStartType('settings-timestart'));
        settingsContainer.appendChild(speedType.renderDOMEndType('settings-timeranout'));
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
    var startBtn = document.getElementById('settings-startGame');
    startBtn.addEventListener('click', onReload.bind(this));
    var startTime = document.getElementById('settings-timestart');
    startTime.style.display = 'block';
    var endTime = document.getElementById('settings-timeranout');
    endTime.style.display = 'none';
}
//---------default events binded-------------//
function onSelectionChanged(event) {

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
//-------------------------------------//
function onReload(event) {
    var startElm = document.getElementById('settings-startGame');
    startElm.style.display = 'none';
    var diffSelectionElm = document.getElementById('settings-select');
    var diffLevelIndex = diffSelectionElm.selectedIndex;
    var diffLevelType = this.getDifficultLevel(diffLevelIndex);
    var domTimerElm = document.getElementById('settings-timer-info');
    switch(diffLevelType.value) {
        case 'Easy':
            this.setTimer(10);
            break;
        case 'Medium': 
            this.setTimer(5);
            domTimerElm
            break;
        case 'Hard':
            this.setTimer(2);
            domTimerElm
            break;
    }
    domTimerElm.innerHTML = this.getTimer();
    updateDOMGame.call(this);
    updateDOMGameTimer.call(this);
    
}
function updateDOMGame() {
    var preTextShow = document.getElementById('settings-following');
    var textShow = document.getElementById('settings-following-info');
    textShow.innerHTML = this.randomWords();
}
function updateDOMGameTimer() {
    var clockTick = this.getTimer();
    var domTimerInfo = document.getElementById('settings-timer-info');
    var refInterval = setInterval(() => {
        clockTick--;
        domTimerInfo.innerHTML = clockTick;
        console.log('loading');
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




