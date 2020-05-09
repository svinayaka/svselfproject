const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

app.set('webworker', path.join(__dirname, '/public/WebWorker'));

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/webworker.html'));
});

module.exports = router;