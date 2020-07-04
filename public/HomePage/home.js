const express = require("express");
const router = express.Router();
const path = require("path");
var compression = require('compression');
const app = express();

app.use(compression());
app.use('Dashboard', express.static('/public/DashBoard'));
// app.use("Home", express.static("/public/HomePage"));

router.get("/", (req, res, next) => {
    // res.render(path.join(__dirname, "/home"));
    // using alternate
    const newPath = __dirname.split('public')[0] ;
    res.sendFile(path.join(newPath, "/public/DashBoard/dashboard.html"));
})

module.exports = router;