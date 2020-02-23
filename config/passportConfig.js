const passport = require('passport'),
    localStrategy = require('passport-local').Strategy;
require('../models/clientModel')
let mongoose = require('mongoose')

let clientSchema = mongoose.model('client')

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            clientSchema.findOne({ email: username },
                (err, client) => {
                    if (err) return done(err);
                    else if (!client)
                        return done(null, false, { message: 'Email is not registered' });
                    else if (!client.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    else
                        return done(null, client)
                }
            )
        }
    )
);