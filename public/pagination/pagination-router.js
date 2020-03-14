const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

app.set("pagination", path.join(__dirname, "/public/pagination-router"));

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, '/pagination.html'))
});

module.exports = router;