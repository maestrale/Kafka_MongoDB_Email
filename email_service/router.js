'use strict';
var nodemailer = require('nodemailer');
const express = require('express');

module.exports = function (app) {
  const apiRoutes = express.Router(),
        emailRoutes = express.Router();

        apiRoutes.use('/email', emailRoutes);
        emailRoutes.post('/new', (req, res) => {
          console.log('\nREQ. received, adding to EMAIL worker queque');
          res.status(200).send({ response: '200, SUCCESS'})
          var transporter = nodemailer.createTransport({
            service: 'gmail', // could be INFOCLOUDSERV
            auth: {
              user: 'rsstatusbyfrancesco@gmail.com',
              pass: 'Passwordprova1'
            }
          });

          var mailOptions = {
            from: 'rsstatusbyfrancesco@gmail.com',
            to: 'francesco.kolman@gmail.com',
            subject: 'Sending Email using Node.js',
            text: JSON.stringify(req.body)
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        });
        
        app.use('/api', apiRoutes);
};