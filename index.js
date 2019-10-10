const express = require('express');
const path = require('path');
const router = express.Router();
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const home = require("./public/HomePage/home");
const about = require("./public/About/about");
const parallex = require("./public/Parallax_Scrolling/parallax_Scrolling");
const ballGame = require("./public/BallGame/ball");

app.set("view engine", "pug");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", home);
app.use("/about", about);
app.use("/parallex", parallex);
app.use("/ballGame", ballGame)
console.log(__dirname);
app.get("/info", (req, res, next) => {
    res.render(path.join(__dirname, "public/About/about"));
});

app.post("/", (req, res, next) => {
    console.log(req.body);
    res.send("Response Recieved" + __dirname).status(200);
})


app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});