const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const compression = require('compression');
const fileSystem = require('fs')

app.use(compression());
app.use('SpeedType', express.static('/public/SpeedType'));
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/speedtype.html'));
});
router.get('/wolf', (req, res, next) => {
    const musicFilePath = path.join(__dirname, '/music/wolf.mp3');
    const stat = fileSystem.statSync(musicFilePath);
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });
    const readStream = fileSystem.createReadStream(musicFilePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
})

module.exports = router;