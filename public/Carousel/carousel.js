(function () {
    var listFrag = document.createDocumentFragment();
    var carouselContainer = document.getElementById('quotes-carousel');
    var carouselList = imagesList;
    var current, previous, next;

    function assignItemClasses() {
        var itemList = Array.from(document.getElementsByClassName('quotes'));
        previous = itemList[itemList - 1];
        next = itemList[1];
        current = itemList[0]; 
    }

    function generateCarousel() {
        for (var i = 0; i < carouselList.length; i++) {
            var list = createCarouselList('quotes');
            var itemImg = createCarouselItem('quotes-image', 'img', carouselList[i]);
            var itemTxt = createCarouselItem('quotes-text', 'txt', carouselList[i]);
            list.appendChild(itemImg);
            list.appendChild(itemTxt);
            listFrag.appendChild(list);
        }
        carouselContainer.appendChild(listFrag);
    }

    function createCarouselList(className) {
        var listElm = document.createElement('li');
        listElm.className = className;
        return listElm;
    }
    function createCarouselItem(className, type, params) {
        var itemElm = document.createElement('div');
        itemElm.className = className;
        switch (type) {
            case 'txt':
                itemElm.innerText = params.txt;
                break;
            case 'img':
                //itemElm.style.backgroundImage = 'url(' + params.img + ')'; 
                itemElm.style.backgroundColor = params.imgBg;
                break;
        }
        return itemElm;
    }

    generateCarousel();
}())