let mongoose = require ('mongoose');

let cartmodel = new mongoose.Schema({
    _id:Number,
    pending:Number,
    completed:Number

});
//mapping
mongoose.model("cart",cartmodel);
