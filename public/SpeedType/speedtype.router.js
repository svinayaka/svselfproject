const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const compression = require('compression');

app.use(compression());
app.use('SpeedType', express.static('/public/SpeedType'));
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/speedtype.html'));
});

module.exports = router;