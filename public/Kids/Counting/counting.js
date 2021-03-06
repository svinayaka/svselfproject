(function() {
    var info = {};
    info.countElm = document.getElementById("gameCount");
    info.startElm = document.getElementById("beginGame");
    info.endElm = document.getElementById("endGame");
    info.player = document.getElementById("player");
    info.interValRef = info.startElm.addEventListener('click', beginGame(info));
    info.endElm.addEventListener('click', endGame(info));
    info.firstCount = document.getElementById("firstCount");
    info.secondCount = document.getElementById("secondCount");
    
})();

function randomTopBottomPercentage() {
    return Math.floor(Math.random() * 80).toString() + "%"; 
}
function randomLeftRightPercentage() {
    return Math.floor(Math.random() * 80).toString() + "%"; 
}

function randomNumbers(info) {
    info.firstCount.innerHTML = Math.floor(Math.random() * 10);
    info.secondCount.innerHTML = Math.floor(Math.random() * 10);
    info.interCountRef = setInterval(function() {
        info.firstCount.innerHTML = Math.floor(Math.random() * 10);
        info.secondCount.innerHTML = Math.floor(Math.random() * 10);
    }, 9000);
}

function beginGame(info) {
    return () => {
        if (!info.interValRef) { 
            info.interValRef = setInterval(function() {
                info.countElm.style.left = randomLeftRightPercentage();
                info.countElm.style.top = randomTopBottomPercentage();
            }, 9000);
        }
        randomNumbers(info);
        info.player.play()
    }
}

function endGame(info) { 
    return () => {
        if (info.interValRef) {
            window.clearInterval(info.interValRef);
            window.clearInterval(info.interCountRef);
            info.player.pause();
        }
    }
}