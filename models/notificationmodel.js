let mongoose= require('mongoose');

let notificationmodel=mongoose.Schema({
    _id:Number,
    title:String,
    content:String
});
//mapping

mongoose.model("notigication",notificationmodel);
