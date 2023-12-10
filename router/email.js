const express=require('express');
const nodemailer = require('nodemailer');

const app=express.Router();

///////////
///email sending
////////////
// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "gsmtp.gmail.com",
    port: 587,
    requireTLS: true,
    secure: false,
    auth: {
                // user: 'inevitableapptest@gmail.com',

                user: 'zaydsheikh360@gmail.com',
                // pass: 'fiddtnvwktcucugh'
                pass: 'fwrkdbtyobxkivdx'

    }

  });




  
  // Endpoint to send an email
  app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
  
    const mailOptions = {
      from: 'zaydsheikh360@gmail.com', // Sender's email address
      to: to, // Recipient's email address
      subject: subject,
      text: text,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully.' });
      }
    });
  });

  module.exports=app;