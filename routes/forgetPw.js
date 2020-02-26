const express = require('express'),
      forgetPwRouter = express.Router(),
      nodemailer = require('nodemailer'),
      sendGridTransport = require('nodemailer-sendgrid-transport'),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs')

      require('../models/clientModel')
      let clientSchema = mongoose.model('client')
const transporter = nodemailer.createTransport(sendGridTransport({
    auth:{
        api_key:'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'
    }
}))

forgetPwRouter.route("/forget")
    .post((request,response) => {
        clientSchema.findOne({email: request.body.email})
        .then(user => {
            if(!user) response.status(404).json({message: "Wrong Email"})
            const secret = `${user.email}+forgetPwSecret123`
            const token = jwt.sign({
                email: user.email
            },
            secret,
            {expiresIn:'5m'})
            clientSchema.updateOne({email: user.email},{
                $set: {token: secret}
            })
            .then(data => response.send(data))
            .catch(err => response.send({ err: err.errmsg }))
            transporter.sendMail({
            to: user.email,
            from: 'admin@proConstruct.com',
            subject: 'Forget Password',
            html: `<html>
            <head>
                <title>Forget Password Email</title>
            </head>
            <body>
                <div>
                    <h3>Dear ${user.name},</h3>
                    <p>You requested for a password reset, kindly use this <a href="http://localhost:4200/reset/${token}">link</a> to reset your password</p>
                    <br>
                    <p>Cheers!</p>
                </div>
            </body>
            </html>`
        })
        })
        .catch(err => response.send({ err: err.errmsg }))
        
    });

    forgetPwRouter.route("/reset/:token")
        .post((request, response) => {
        let email = jwt.decode(request.params.token).email
            
           
        
        clientSchema.findOne({email:email})
        .then(data =>{ 
            
            let secret = data.token;
            jwt.verify(request.params.token, secret,
                (err, decoded) => {
                    
                    if (err)
                        return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                    else {
                        var password = request.body.password
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                request.body.password = hash;
                                clientSchema.updateOne({email:email},{
                                    $set:{password: request.body.password}
                                }).then(data => console.log(data))
                                .catch(err => response.send())
                            });
                        }); 
                    }
                }
            )
        })
        .catch(err => response.send({ err: err.errmsg }))
        
        //console.log(request.body.password)
    })

module.exports = forgetPwRouter
