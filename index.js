const express = require('express');
const path = require('path');
const router = express.Router();
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const home = require("./public/HomePage/home");
const about = require("./public/About/about");

app.set("view engine", "pug");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", home);
app.use("/about", about);

app.get("/info", (req, res, next) => {
    res.render(path.join(__dirname, "public/About/about"));
});

app.post("/", (req, res, next) => {
    console.log(req.body);
    res.send("Response Recieved").status(200);
})


app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});