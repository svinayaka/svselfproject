const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const compression = require('compression');
const htmlToJson = require('html-to-json');
const fs = require('fs');

app.use(compression());

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/personalblog.html'));
});
router.get('/footerPage', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/personalblog.floatmenue.html'));
});
router.get('/aboutPage', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/personalblog.about.html'));
});
router.get('/homePage', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/personalblog.home.html'));
});
router.get('/profilePic', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/Images/MyProfile.png'));
});

module.exports = router;