this.addEventListener('message', function (e) {
    var count = e.data;
    for (var i = 0; i < count; i++) { }
    this.postMessage('You Said:' + i);
}, false);