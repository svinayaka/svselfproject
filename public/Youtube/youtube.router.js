const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

app.set('youtube', path.join(__dirname, '/public/Youtube'));

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'youtube.html'));
});

module.exports = router;