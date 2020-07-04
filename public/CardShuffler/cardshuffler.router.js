const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');


app.set('cardshuffler', path.join(__dirname, 'public/CardShuffler'));

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'cardshuffler.html'));
});

module.exports = router;

