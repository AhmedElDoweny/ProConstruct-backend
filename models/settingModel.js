let mongoose = require("mongoose");

// create schema
let settingSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    aboutApp: {
        type: String
    },
    contactEmail: {
        type: String
    },
    links: {
        type: [{
            title: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true
            }
        }],
    },
    contactsEmails: [{
        type: [{
            id: {
                type: Number,
                required: true
            },
            name: String,
            email: {
                type: String,
                required: true
            },
            subject: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
        }]
    }],
    newsLetterEmails: [String]
})

// mapping
mongoose.model("setting", settingSchema)