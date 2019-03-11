const express = require('express');
const sgMail = require('@sendgrid/mail');
const Client = require('../models/clientModel');
//const config = require('./config');

var myEmail = "ahmad.khalilieh@mail.huji.ac.il";

const router = express.Router();

router.post('/', (req, res, next) => {
    var message = req.body.message;
    var user = req.body.name;
    var email = req.body.email;

    Client.find({ email: email }).exec()
        .then(clients => {
            const client = new Client({
                name: user,
                email: email
            });

            client.save().then(function () {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: myEmail,
                    from: 'ahmadfk90@gmail.com',
                    subject: 'Message from Client: ' + user,
                    text: message + " , " + 'Client: ' + email
                };
                sgMail.send(msg);
                res.send('It works !!');
            })
                .catch(err => console.log(err));
        })
});


module.exports = router;