const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.set("ballGame", path.join(__dirname, "public/BallGame"));

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "/ball.html"));
});

module.exports = router;