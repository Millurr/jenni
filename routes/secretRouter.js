const router = require('express').Router();

router.get('/', async (req, res) => {
    res.json({'cap': process.env.CAPTCHA})
});

module.exports = router;