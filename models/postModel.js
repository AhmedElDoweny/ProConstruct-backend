let mongoose = require('mongoose'),
    autoInc = require("mongoose-auto-increment"),
    connection = mongoose.createConnection(`mongodb://localhost:27017/ProConstruct`, { useNewUrlParser: true, useUnifiedTopology: true });
autoInc.initialize(connection)

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
    },
    location:{}

});
postSchema.plugin(autoInc.plugin, { model: 'post', field: '_id', startAt: 1, incrementBy: 1 })

mongoose.model("post", postSchema);
