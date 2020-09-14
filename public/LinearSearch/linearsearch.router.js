const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/linearsearch.html'));
})

module.exports = router;