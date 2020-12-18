const router = require('express').Router();

router.get('/', async(req, res) => {
    const indexPath = path.join('client', 'build', 'index.html');

    // res.sendFile();
    res.json({
        "test": indexPath.toString(),
    });
});

module.exports = router;