var speedType = (function() {
    function SpeedType() {
        SpeedType.prototype.renderDOMSelectComponent = function(id, options, labelId) {
            var documentFrag = document.createDocumentFragment();
            var selectElm = document.createElement('select');
            var selectLabelElm = document.createElement('label');
            selectElm.addEventListener('change', onSettingClicked);
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
        SpeedType.prototype.renderDOMStartType = function(idName) {
            var list = [{ id:'settings-timer', txt:'Time Left'}, { id:'settings-score', txt:'Score'}];
            var documentFrag = document.createDocumentFragment();
            var timeStartElm = document.createElement('section');
            timeStartElm.id = idName;
            timeStartElm.classList.add(idName);
            var headerElm = document.createElement('h2');
            headerElm.innerHTML = 'Speed Typer';
            timeStartElm.appendChild(headerElm);
            list.forEach((eachList) => {
                timeStartElm.appendChild(generateStartGameInfo(eachList));
            });
            var paraElm = document.createElement('p');
            paraElm.id = 'settings-following';
            paraElm.classList.add('settings-following');
            paraElm.innerHTML = 'Type the following:';
            timeStartElm.appendChild(paraElm);
            var inputElm = document.createElement('input');
            inputElm.id = 'settings-typeArea';
            inputElm.classList.add('settings-typeArea');
            inputElm.placeholder = 'Enter the word';
            timeStartElm.appendChild(inputElm);
            // finally append...
            documentFrag.appendChild(timeStartElm);
            return documentFrag;
        }
        SpeedType.prototype.renderDOMEndType = function(id) {
            
            
        }
    }
    return new SpeedType();
})() || null;

if (speedType) {
    (function() {
        var selectFormContainer = document.getElementById('settings-form-container');
        var selectContainer = document.getElementById('settings-select-container');
        var settingsContainer = document.getElementById('settings-timer-container');
        var settingsbtn = document.getElementById('settings-btn');
        settingsbtn.addEventListener('click', onSettingClicked.bind(this, selectFormContainer))
        var selectOptions = [
            {id: 'selectLabel', className: 'selectLabel', value: 'Easy'},
            {id: 'selectLabel', className: 'selectLabel', value: 'Medium'},
            {id: 'selectLabel', className: 'selectLabel', value: 'Hard'}
        ];
        clearDOM(selectContainer);
        selectContainer.appendChild(speedType.renderDOMSelectComponent('settings-select', selectOptions, 'settings-Label'));
        settingsContainer.appendChild(speedType.renderDOMStartType('settings-timestart'));
        // settingsContainer.appendChild(speedType.renderDOMStartType('settings-timeranout'));
    })();
}
//---------default binding-------------//
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
function generateStartGameInfo(list) {
    var textElm = document.createTextNode(list.txt);
    var paraElm = document.createElement('p');
    var spanElm = document.createElement('span');
    paraElm.id = list.id;
    paraElm.classList.add(list.id);
    spanElm.id = list.id+'info';
    spanElm.classList.add(list.id+'info');
    paraElm.appendChild(textElm);
    paraElm.appendChild(spanElm);
    return paraElm;
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


