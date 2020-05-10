const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

app.set('pwanewsapp', path.join(__dirname, '/public/PWANewsApp'))

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/pwanewsapp.html'));
});

module.exports = router;
