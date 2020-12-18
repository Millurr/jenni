const router = require('express').Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/transactionModel');
const Inventory = require('../models/invModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

router.post("/", async (req, res) => {
    const {items, transactionId, count, total, username, name, address, userId, email} = req.body;
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
        status: 'Pending',
        address,
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
        to: 'josh.miller1994@yahoo.com, ' + email,
        subject: 'New Company',
        html: '<h1>' +  username +'</h1>'
    }

    console.log(email);

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

router.get('/alltrans', async(req, res) => {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const level = req.header('level');
    if (level !== "4") return res.status(400).json({msg: "You do not have valid permissions."});

    const transactions = await Transaction.find();
    res.json(transactions);
});

module.exports = router;
