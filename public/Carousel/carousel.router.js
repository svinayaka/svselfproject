const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

app.set('carousel', path.join(__dirname, 'public/Carousel'));

router.get('/', (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    res.sendFile(path.join(__dirname, '/carousel.html'));
});

module.exports = router;