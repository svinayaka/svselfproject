const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/counting.html'));
});

module.exports = router;