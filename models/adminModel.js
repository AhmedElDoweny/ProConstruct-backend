let mongoose = require("mongoose");

// create schema
let adminSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phone: String,
    image: String,
    notification: {
        type: [Number],
        ref: "notification"
    }


})

// mapping
mongoose.model("admin", adminSchema)
