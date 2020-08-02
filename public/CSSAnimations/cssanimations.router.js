const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const compression = require('compression');

app.use(compression());

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/cssanimations.html'));
})

module.exports = router;