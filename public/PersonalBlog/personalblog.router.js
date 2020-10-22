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
    res.sendFile(path.join(__dirname, '/Footer/personalblog.floatmenue.html'));
});
router.get('/aboutPage', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/About/personalblog.about.html'));
});
router.get('/contactPage', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/Contact/personalblog.contact.html'))
});
router.get('/homePage', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/Home/personalblog.home.html'));
});
router.get('/profilePic', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/Images/MyProfile.png'));
});
router.get('/backgroudPic', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/Images/cool-background.png'));
});

module.exports = router;