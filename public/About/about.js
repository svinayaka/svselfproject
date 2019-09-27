const express = require("express");
const router = express.Router();
const path = require("path")
const app = express();

app.use("About", express.static("/public/About"));

router.get("/", (req, res, next) => {
    console.log(__dirname);
    res.send("<p>about</p>");
});

module.exports = router;