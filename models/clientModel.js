let mongoose = require("mongoose");

// create schema
let clientSchema = new mongoose.Schema({
    _id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    role: String,
    location: String,
    phone: Number,
    image: String,
    post:{
        type: [Number],
        ref: "post"
    },
    cart:{
        type: Number,
        ref: "cart",
    },
    notification:{
        type: [Number],
        ref: "notification"
    }


})

// mapping
mongoose.model("client",clientSchema)