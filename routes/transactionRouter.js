const router = require('express').Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/transactionModel');
const Inventory = require('../models/invModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

var readHTMLFile = function (path, callback) {
    fs.readFile(path, {
        encoding: 'utf-8'
    }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'millurr0@gmail.com',
        pass: process.env.EMAIL_PW
    }
});

router.post("/", async (req, res) => {
    let {
        items,
        transactionId,
        count,
        total,
        username,
        name,
        address,
        userId,
        email
    } = req.body;
    // const item = await Inventory.findById({_id: itemId});
    items.forEach(async (item) => {
        const foundItem = await Inventory.findById({
            _id: item._id
        });
        if (foundItem.count < item.count) return res.status(400).json({
            msg: "Not enough inventory."
        });
        else if (item.count <= 0) return res.status(400).json({
            msg: "User must input a valid number"
        });
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
        tracking: undefined,
        address,
        userId
    });

    const savedTrans = await newTrans.save();

    let newItem = []
    for (let i = 0; i < items.length; i++) {
        newItem.push({
            item: items[i].item,
            price: items[i].price,
            count: items[i].count,
            total: items[i].count * items[i].price
        })
    }


    readHTMLFile(__dirname + '/templates/trans.html', function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            orderId: newTrans['_id'],
            items: newItem,
            count,
            total,
            address,
            name
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'millurr0@gmail.com',
            to: 'josh.miller1994@yahoo.com, ' + email,
            subject: 'New Company',
            html: htmlToSend
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent to ' + info.response);
            }
        })
    });

    res.json(savedTrans);
});

router.get('/gettrans/:userId', async (req, res) => {
    const transactions = await Transaction.find({
        userId: req.params.userId
    });
    res.json(transactions);
});

router.get('/alltrans', async (req, res) => {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const level = req.header('level');
    if (level !== "4") return res.status(400).json({
        msg: "You do not have valid permissions."
    });

    const transactions = await Transaction.find();
    res.json(transactions);
});

// edits the transactions for the admin to show the status
// pass through status, tracking, id
router.put('/edit', async (req, res) => {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const level = req.header('level');
    if (level !== "4") return res.status(400).json({
        msg: "You do not have valid permissions."
    });

    let {
        status,
        tracking,
        id
    } = req.body;

    let transaction = await Transaction.findById({
        _id: id
    });

    transaction.status = status;

    if (transaction) transaction.tracking = tracking;

    if (status == 'Shipped' && (transaction.userId != 'Guest')) {

        // gets the user id that is registered to the transaction to send an email upon the transaction being changed to shipped
        let user = await User.findById({
            _id: transaction.userId
        });

        readHTMLFile(__dirname + '/templates/shipped.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                tracking
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'millurr0@gmail.com',
                to: 'josh.miller1994@yahoo.com, ' + user.email,
                subject: 'New Company',
                html: htmlToSend
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent to ' + info.response);
                }
            })
        });
    }

    console.log(transaction);

    const updated = await transaction.save();
    res.json(updated);
});

module.exports = router;