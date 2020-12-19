const router = require('express').Router();
const path = require('path');


// Adds new item to inventory
router.get('/', async (req, res) => {
    try {
        const indexPath = path.join(__dirname, '../..', 'client', 'build', 'index.html');
        console.log(indexPath);
        res.sendFile(indexPath);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;