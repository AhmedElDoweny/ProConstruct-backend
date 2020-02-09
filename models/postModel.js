let mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    _id:Number,
    title:String,
    category:String,
    description:String,
    price:Number,
    image:String,
    client:{
        type:Number,
        ref : "client"
    }
});

mongoose.model("post",postSchema);
