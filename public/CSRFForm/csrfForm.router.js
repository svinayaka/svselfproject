const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const csurf = require('csurf');

app.use(csurf());
app.use('CSRFForm', express.static('/public/CSRFForm'));

router.get('/', (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    res.sendFile(path.join(__dirname, '/csrfForm.html'));
});
router.post('/', (req, res, next) => {
    res.redirect('csrf/csrfLogIn');
})

router.get('/csrfLogIn', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/csrfFormLoggedIn.html'));
})

module.exports = router;