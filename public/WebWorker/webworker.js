(function () {
    var webWorker = new Worker('/WebWorker/webworker.external.js');
    var startBtn = document.getElementById('startBtn');
    var countInput = document.getElementById('timer');
    var calculate = 0;
    var started = false;
    startBtn.addEventListener('click', (e) => {
        if (!started) {
            started = true;
            startBtn.innerText = 'Stop';
            webWorker.postMessage(calculate);
            webWorker.addEventListener('message', function (e) {
                started = false;
                startBtn.innerText = 'Start';
                window.alert('This is output number counting finished!' + e.data);
                webWorker.terminate();
                webWorker = new Worker('/WebWorker/webworker.external.js');
            });
        } else if (started) {
            webWorker.terminate();
            webWorker = new Worker('/WebWorker/webworker.external.js');
            started = false;
            startBtn.innerText = 'Start';
        }
    });
    countInput.addEventListener('keypress', function (e) {
        calculate = (typeof (parseInt(e.target.value)) == 'number') ? parseInt(countInput.value) : 0;
    })
})();