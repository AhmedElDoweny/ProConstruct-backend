let mongoose = require ('mongoose');

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
    }] ,
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
//mapping
mongoose.model("cart",cartModel);
