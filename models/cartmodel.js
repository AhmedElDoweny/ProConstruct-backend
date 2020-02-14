let mongoose = require ('mongoose'),
    autoInc = require("mongoose-auto-increment"),
    connection = mongoose.createConnection(`mongodb://localhost:27017/ProConstruct`, { useNewUrlParser: true, useUnifiedTopology: true });
    
    autoInc.initialize(connection);

let cartModel = new mongoose.Schema({
    _id:{
        type:Number,
        required:true,
    
    },
    client:{
        type:Number,
        ref:"client",
        required:true
    },
    pending:[{
        type:Number,
        ref:"post",
        required:true
    }],
    completed:[{
        type:Number,
        ref:"post",
        required:true
    }],
    rejected:[{
        type:Number,
        ref:"post",
        required:true
    }]

});

cartModel.plugin(autoInc.plugin, {model:'cart',field: '_id', startAt: 1, incrementBy: 1 });

//mapping
mongoose.model("cart",cartModel);