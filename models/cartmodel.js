let mongoose = require ('mongoose');

let cartmodel = new mongoose.Schema({
    _id:{
        type:Number,
        required:true,
        min:1
    },
    pending:{
        type:Number,
        required:true
    },
    completed:{
        type:Number,
        required:true
    }

});
//mapping
mongoose.model("cart",cartmodel);
