const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const compression = require('compression');

app.use(compression());
app.use('MovieBooking', express.static('/public/MovieBooking'));
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/moviebooking.html'));
});

module.exports = router;