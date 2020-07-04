(function(){
    'use strict';
    // initialization variables...
    var headerTxtElm = document.getElementById('headerTxt');
    var footerTxtElm = document.getElementById('footerTxt');
    var cardLayoutElm = document.getElementById('cardLayout');
    var cardLayoutActionElm = document.getElementById('cardAction');
    var shuffleActionBtn = document.getElementById('shuffleBtn');
    var sortActionBtn = document.getElementById('sortBtn');

    var mqMax = '700px';
    var mqMin = '0px';
    var mqPhone = null;
    var mqDesktop = null;

    var fragmentGridElms = createNewDOMFragment();
    var cardGrid = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var colorGrid = ['#BFBFBF', '#6F98A8', '#2B8EAD', '#2F454E'];
    var previousColor = '';
    var sortTypes = ['sort', 'shuffle'];
    var selectedSort = sortTypes[0];  

    var cardColours = [];
    var shuffledColours = [];

    function createNewDOMFragment() {
        // use fragments for dom optimization...
        return document.createDocumentFragment();
    }
    function generateCardsColor() {
        for (var i = 0 ; i  < cardGrid.length; i++) {
            var gridColor = randomizeColor();
            cardColours.push(gridColor);
        }
    }
    function generateCards(cardGrid, cardColours) {
        fragmentGridElms = createNewDOMFragment();
        cardLayoutElm.innerHTML = '';
        for (var i = 0 ; i  < cardGrid.length; i++) {
            fragmentGridElms.appendChild(createCard(cardGrid[i], 'gridBlock', cardColours[i]));
        }
        cardLayoutElm.appendChild(fragmentGridElms);
    }
    function createCard(cardNumber, className, gridColor) {
        var divElm = document.createElement('div');
        divElm.className = className;
        divElm.innerText = cardNumber;
        
        var devicetype = uiDesignDetectChanges();
        divElm = designChanges(divElm, gridColor, devicetype);
        return divElm;
    }
    function uiDesignDetectChanges() {
        mqPhone = window.matchMedia( `(min-width: ${mqMin}) and (max-width: ${mqMax})` );
        mqDesktop = window.matchMedia( `(min-width: ${mqMax})` );
        return (mqPhone.matches) ? 'phone' : 'desktop';
    }
    function designChanges(elm, elmColor, devicetype) {
        if (devicetype == 'desktop')  { 
            elm.style.backgroundColor = elmColor;
            elm.className = 'gridBlock';
        }
        else if (devicetype == 'phone') {
            elm.style.backgroundColor = '#EFEFEF';
            elm.className = 'responsive-gridBlock';
            elm.style.borderColor = elmColor;
        }
        return elm;
    }
    function randomizeColor() {
        var colorSelected = colorGrid[getRandomNumber(3, 0)];
        if (!previousColor) previousColor = colorSelected;
        else if (previousColor != colorSelected) previousColor = colorSelected;
        else if (previousColor == colorSelected) {
            while(previousColor == colorSelected) {
                colorSelected = colorGrid[getRandomNumber(3, 0)];
            }
            previousColor = colorSelected;
        }
        return previousColor;
    }
    function getRandomNumber(max, min) {
        return Math.round(Math.random() * (max - min) + min);
    }

    sortActionBtn.addEventListener('click', clickHandler.bind(null, 'sort'));
    shuffleActionBtn.addEventListener('click', clickHandler.bind(null, 'shuffle'));
    
    function clickHandler(sortTypeSelected) {
        var colorSelection = JSON.parse(JSON.stringify(cardColours));
        
        switch(sortTypeSelected) {
            case 'sort' :
                if (selectedSort != sortTypeSelected) {
                    selectedSort = sortTypeSelected;
                    var gridList = cloneGridCards(cardGrid);
                    generateCards(gridList, colorSelection);
                }
                break;
            case 'shuffle' :
                if (selectedSort != sortTypeSelected) { 
                    shuffledColours = [];
                    selectedSort = sortTypeSelected;
                    var gridList = cloneGridCards(cardGrid);
                    var shuffleGridList = [];
                    for (var i = gridList.length - 1 ; i >= 0; i--) {
                        var num = getRandomNumber(gridList.length - 1, 0);
                        shuffledColours.push(colorSelection.splice(num, 1)[0]);
                        shuffleGridList.push(gridList.splice(num, 1)[0]);
                    }
                    generateCards(shuffleGridList, shuffledColours);
                }
                break;
        }
    }
    window.addEventListener('resize', onResizeAction())
    function onResizeAction() {
        // debounce concept 
        // on resize called after finishing resize operation.
        var invokedResizeEvent = null;
        return function(windowEvent) {
            if (!invokedResizeEvent) {
                invokedResizeEvent = setTimeout(function() { handlerOnScreenResize(); }, 500);
            } else if (invokedResizeEvent) {
                clearTimeout(invokedResizeEvent);
                invokedResizeEvent = setTimeout(function() { handlerOnScreenResize(); }, 500);
            }
        }
    }
    function handlerOnScreenResize() {
        var devicetype = uiDesignDetectChanges();
        var clonedCardLayout = cardLayoutElm.cloneNode(true);
        var gridList = Array.from(clonedCardLayout.childNodes);
        if (mqPhone.matches) {
            for (var i = 0; i < gridList.length; i++) {
                var eachCard = gridList[i];
                eachCard = designChanges(eachCard, cardColours[i], devicetype);
                fragmentGridElms.appendChild(eachCard);
            }
        } else if (mqDesktop.matches) {
            for (var i = 0; i < gridList.length; i++) {
                var eachCard = gridList[i];
                eachCard = designChanges(eachCard, cardColours[i], devicetype);
                fragmentGridElms.appendChild(eachCard);
            }
        }
        cardLayoutElm.innerHTML = '';
        cardLayoutElm.appendChild(fragmentGridElms);
    }
    function cloneGridCards(cardGrid) {
        return JSON.parse(JSON.stringify(cardGrid));
    }

    generateCardsColor();
    generateCards(cloneGridCards(cardGrid), cardColours);
}())