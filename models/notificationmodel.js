let mongoose= require('mongoose');

let notificationmodel=mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    title:String,
    content:String
});
//mapping

mongoose.model("notigication",notificationmodel);
