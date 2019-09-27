const express = require('express');
const path = require('path');
const router = express.Router();
const PORT = process.env.PORT || 3000;
const app = express();
const home = require("./public/HomePage/home");


app.use((req, res, next) => {
    next();
})

app.get('/', home);


app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});