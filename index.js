const express = require('express');
const path = require('path');
const router = express.Router();
const PORT = process.env.PORT || 3000;
const app = express();
const home = require("./public/HomePage/home");
const about = require("./public/About/about");


app.use("/", home);
app.use("/about", about);

// app.get('/', home);
// app.get('/about', about);


app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});