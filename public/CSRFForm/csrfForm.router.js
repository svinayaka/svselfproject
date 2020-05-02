const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

app.use('CSRFForm', express.static('/public/CSRFForm'));

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/csrfForm.html'));
});
router.post('/csrfLogIn', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/csrfFormLoggedIn.html'));
})

module.exports = router;