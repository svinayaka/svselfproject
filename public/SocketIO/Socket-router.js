const express = require('express');
const path = require('path');
const route = express.Router();
const app = express();

app.set("socketio", path.join(__dirname, '/public/SocketIO'));

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'Socket.html'))
});

module.exports = router;

