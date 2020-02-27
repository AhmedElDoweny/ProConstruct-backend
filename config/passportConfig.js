const passport = require('passport'),
    localStrategy = require('passport-local').Strategy;
require('../models/clientModel')
require('../models/adminModel')
let mongoose = require('mongoose')



let clientSchema = mongoose.model('client')
let adminSchema = mongoose.model('admin')

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            adminSchema.findOne({email:username}, 
                (err, admin) => {
                    if (err) return done(err);
                    else if (!admin){
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
                        //return done(null, false, { message: 'Email is not registered' });
                    else if (!admin.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    else //return console.log(admin)
                        return done(null, admin)
                }
                )
            // clientSchema.findOne({ email: username },
            //     (err, client) => {
            //         if (err) return done(err);
            //         else if (!client)
            //             return done(null, false, { message: 'Email is not registered' });
            //         else if (!client.verifyPassword(password))
            //             return done(null, false, { message: 'Wrong password.' });
            //         else
            //             return done(null, client)
            //     }
            // )
        }
    )
);