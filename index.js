const express = require('express');
const path = require('path');
const session = require('express-session');
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
const youtube = require('./public/Youtube/youtube.router');
const csrf = require('./public/CSRFForm/csrfForm.router');
const carousel = require('./public/Carousel/carousel.router');
const dashboard = require('./public/DashBoard/dashboard.router');
const webworker = require('./public/WebWorker/webworker.router');
const pwanewsapp = require('./public/PWANewsApp/pwanewsapp.router');
const cardshuffler = require('./public/CardShuffler/cardshuffler.router');
const moviebooking = require('./public/MovieBooking/moviebooking.router');
const speedtype = require('./public/SpeedType/speedtype.router');
const cssanimation = require('./public/CSSAnimations/cssanimations.router');

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname + '/public')));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, cookie: { maxAge: 60000 } }));
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
app.use('/youtube', youtube);
app.use('/csrf', csrf);
app.use('/carousel', carousel);
app.use('/dashboard', dashboard);
app.use('/webworker', webworker);
app.use('/pwanewsapp', pwanewsapp);
app.use('/cardshuffler', cardshuffler);
app.use('/moviebooking', moviebooking);
app.use('/speedtype', speedtype);
app.use('/cssanimation', cssanimation);

app.use('carouseImage', express.static(path.join(__dirname, '/public/Carousel/images')));

app.post("/", (req, res, next) => {
    console.log(req.body);
    res.sendFile(path.join(__dirname, "/public/BallGame/ball.css"));
})

app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});