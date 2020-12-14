const router = require('express').Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/transactionModel');
const Inventory = require('../models/invModel');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

router.post("/", async (req, res) => {
    const {items, transactionId, count, total, username, name, userId} = req.body;
    // const item = await Inventory.findById({_id: itemId});
    items.forEach( async (item) => {
        const foundItem = await Inventory.findById({_id: item._id});
        if (foundItem.count < item.count) return res.status(400).json({msg: "Not enough inventory."});
        else if (item.count <= 0) return res.status(400).json({msg: "User must input a valid number"});
        else foundItem.count -= item.count;

        await foundItem.save();
    });

    const newTrans = new Transaction({
        items,
        transactionId,
        count,
        total,
        username,
        name,
        userId
    });

    const savedTrans = await newTrans.save();

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'millurr0@gmail.com',
            pass: 'Miller2450!'
        }
    });

    var mailOptions = {
        from: 'millurr0@gmail.com',
        to: 'josh.miller1994@yahoo.com, josh.miller@selu.edu',
        subject: 'New Company',
        html: '<h1>' +  username +'</h1>'
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent to ' + info.response);
        }
    })

    res.json(savedTrans);
})

router.get('/gettrans/:userId', async (req, res) => {
    const transactions = await Transaction.find({userId: req.params.userId});
    res.json(transactions);
});

module.exports = router;
