// This router does not store data to Mongo, it will just process emails.
const router = require('express').Router();
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

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

    readHTMLFile(__dirname + '/templates/contact.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             name, email, pnumber, subject, message
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'contact.jmcraft@gmail.com',
            to: 'millurr0@gmail.com, ' + email + ', ' + 'contact.jmcraft@gmail.com',
            subject: subject + ' -- ' + name + '--' + pnumber,
            html: htmlToSend
        }
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

});

module.exports = router;