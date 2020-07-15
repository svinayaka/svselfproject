var speedType = (function() {
    function SpeedType() {
        SpeedType.prototype.renderDOMSelectComponent = function(id, options, labelId) {
            // settings-select
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
    }
    return new SpeedType();
})() || null;

if (speedType) {
    (function() {
        var selectFormContainer = document.getElementById('settings-form-container');
        var selectContainer = document.getElementById('settings-select-container');
        var settingsbtn = document.getElementById('settings-btn');
        settingsbtn.addEventListener('click', onSettingClicked.bind(this, selectFormContainer))
        var selectOptions = [
            {id: 'selectLabel', className: 'selectLabel', value: 'Easy'},
            {id: 'selectLabel', className: 'selectLabel', value: 'Medium'},
            {id: 'selectLabel', className: 'selectLabel', value: 'Hard'}
        ];
        clearDOM(selectContainer);
        selectContainer.appendChild(speedType.renderDOMSelectComponent('settings-select', selectOptions, 'settings-Label'));
    })();
}
//---------default binding-------------//
function onSelectionChanged(event) {

}
function onSettingClicked(elm) {
    debugger;
    if (elm.classList.contains('settings-form-container-hide')) {
        elm.classList.remove('settings-form-container-hide');
        elm.classList.add('settings-form-container-show');
    } else {
        elm.classList.remove('settings-form-container-show');
        elm.classList.add('settings-form-container-hide');
    }
}
//-------------------------------------//
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


