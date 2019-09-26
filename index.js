const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
const aboutRoute = require('./controller/about-controller');
const defaultRoute = require('./controller/default-controller');

app.use('/', defaultRoute)
app.use('/about', aboutRoute);


app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});