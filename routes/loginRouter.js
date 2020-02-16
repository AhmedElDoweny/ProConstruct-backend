let express = require('express'),
    loginRouter = express.Router(),
    passport = require('passport')
    mongoose = require('mongoose');

loginRouter.route("/login")
    .post((request, response, next) => {
        passport.authenticate('local', (err, client, info) => {
            if (err) return response.status(400).json(err);
            // registered user
            else if (client) return response.status(200).json({ "token": client.generateJwt() });
            // unknown user or wrong password
            else return response.status(404).json(info);
        })(request, response)
    })
module.exports = loginRouter