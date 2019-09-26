const express = require('express');
const path = require('path');
const router = express.Router();
const PORT = process.env.PORT || 3000;
const app = express();
const aboutRoute = require('./controller/about/about-controller');
const defaultRoute = require('./controller/default/default-controller');

app.use('/default', defaultRoute)
app.use('/about', aboutRoute);

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})


app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});