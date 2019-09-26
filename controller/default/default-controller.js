const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Blank Page Loaded!');
});

module.exports = router;