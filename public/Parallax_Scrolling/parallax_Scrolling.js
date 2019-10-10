const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

app.set("Parallex", path.join(__dirname, "/public/Parallax_Scrolling"));
const url = path.join(__dirname, "/parallax_Scrolling.css");

router.get("/", (req, res, next) => {
    console.log(url);
    res.render(path.join(__dirname, "/parallax_Scrolling"));
})


module.exports = router; 
// 