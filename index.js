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
const pagination = require("./public/pagination/pagination-router");
const websiteDesign = require("./public/websiteDesign/websiteDesign-router");
// const socketIO = require("./public/SocketIO/Socket-router");
const memorygame = require("./public/MemoryGame/memoryGame.router");

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", home);
app.use("/about", about);
app.use("/parallex", parallex);
app.use("/ballGame", ballGame)
app.use("/pagination", pagination);
app.use("/websiteDesign", websiteDesign);
// app.use("/socketio", socketIO);
app.use('/memorygame', memorygame);


app.post("/", (req, res, next) => {
    console.log(req.body);
    res.sendFile(path.join(__dirname, "/public/BallGame/ball.css"));
})

app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});