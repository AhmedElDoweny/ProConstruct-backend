let mongoose = require("mongoose");

// create schema
let clientSchema = new mongoose.Schema({
    _id:{
        type: Number,
        required: true
    },
    aboutApp:{
        type: String,
        required: true
    },
    contactEmail:{
        type: String,
        required: true
    },
    links:{
        type: [{
            title:{
                type:String,
                required: true
            },
            link:{
                type:String,
                required: true
            }
        }],
        required: true
    },

})

// mapping
mongoose.model("client",clientSchema)
