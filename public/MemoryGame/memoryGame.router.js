const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

app.set('memorygame', path.join(__dirname, '/public/MemoryGame'));

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/memoryGame.html'));
})

module.exports = router;