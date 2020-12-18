const router = require('express').Router();

router.get('/', async(req, res) => {
    const indexPath = path.join('client', 'build', 'index.html');
    console.log(IndexPath);
    res.sendFile(indexPath);
});

module.exports = router;