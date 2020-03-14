const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

app.set('/websiteDesign', path.join(__dirname, "public/websiteDesign"));

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "/websiteDesign.html"));
});

module.exports = router;