const express = require("express");
const router = express.Router();
const path = require("path")
const app = express();

app.use("Home", express.static("/public/HomePage"));

router.get("/", (req, res, next) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "/home.html"));
})

module.exports = router;