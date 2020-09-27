const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const compression = require('compression');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/wildshootout.html'));
});

module.exports = router;

