const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Default About page Loaded!');
});
router.get('/promotion', (req, res) => {
    res.send('Promotion Page Loaded!');
});

module.exports = router;