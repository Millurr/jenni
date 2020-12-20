// This router does not store data to Mongo, it will just process emails.
const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/contact', async(req, res) => {

    let {name, email, pnumber, subject, message} = req.body;

    if (!name) return res.status(400).json({msg: "A name must exist"});
    if (!email) return res.status(400).json({msg: "An email must exist"});
    if (!pnumber) pnumber = 'N/A'
    if (!subject) return res.status(400).json({msg: "A subject must exist"});
    if (!message) return res.status(400).json({msg: "A message must exist"});

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contact.jmcraft@gmail.com',
            pass: process.env.EMAIL_PW
        }
    });

    var mailOptions = {
        from: 'contact.jmcraft@gmail.com',
        to: 'millurr0@gmail.com, ' + email,
        subject: subject + ' -- ' + name + '--' + pnumber,
        text: message
    }

    console.log(email);

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        else {
            console.log('Email sent to ' + info.response);
            res.json({'success': 'Your inquirement has been sent.'})
        }
    })
});

module.exports = router;