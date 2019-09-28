const express = require("express");
const router = express.Router();
const path = require("path")
const app = express();

app.set("About", path.join(__dirname, "public/About"));

router.get("/", (req, res, next) => {
    res.render(path.join(__dirname, "/about"));
});

module.exports = router;