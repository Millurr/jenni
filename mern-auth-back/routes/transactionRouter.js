const router = require('express').Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/transactionModel');
const Inventory = require('../models/invModel');

router.post("/", async (req, res) => {
    const {items, transactionId, count, total, username, name} = req.body;
    // const item = await Inventory.findById({_id: itemId});
    items.forEach( async (item) => {
        const foundItem = await Inventory.findById({_id: item._id});
        if (foundItem.count < item.count) return res.status(400).json({msg: "Not enough inventory."});
        else if (item.count <= 0) return res.status(400).json({msg: "User must input a valid number"});
        else foundItem.count -= item.count;

        await foundItem.save();
    });

    console.log(items);
    const newTrans = new Transaction({
        items,
        transactionId,
        count,
        total,
        username,
        name
    });

    // const savedTrans = await newTrans.save();

    res.json(newTrans);
})

module.exports = router;
