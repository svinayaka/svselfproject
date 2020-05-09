const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

app.use('dashboard', express.static('/public/DashBoard'));

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/dashboard.html'));
});

module.exports = router;