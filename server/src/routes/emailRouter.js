const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const nodemailer = require("nodemailer");

router.post('/api/email', auth, async (req, res) => {

    
    try {
        const email = req.body
        console.log(email)

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
            }
        });

        let info = await transporter.sendMail({
            from: `"${email.inviter}" <craig.macritchie.admin@gmail.com>`, // sender address
            to: `${email.receiver}`, // list of receivers
            subject: `Join CVI Chat APP room: ${email.room}`, // Subject line
            text: "", // plain text body
            html: `<b>You've been invited to the ${email.room} on Circle Chat App</b>
                        <a href="http://localhost:3000/room/${email.id}"> go to ${email.room}</a>  ` // html body
        });

        
            
            

            res.status(201).send(info)
    } catch (e) { 
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router