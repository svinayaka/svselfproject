const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const compression = require('compression');
const fs = require('fs');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/wildshootout.html'));
});
router.get('/friendImg', (req, res, next) => {
    res.sendFile(path.join(__dirname,'/images/citizen.png'));
});
router.get('/enemyImg', (req, res, next) => {
    res.sendFile(path.join(__dirname,'/images/terrorist2.png'));
});
router.get('/brickImg', (req, res, next) => {
    res.sendFile(path.join(__dirname,'/images/bricks.jpg'));
});
router.get('/music', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/music/Illusionary_Daytime.mp3'));
});

module.exports = router;

