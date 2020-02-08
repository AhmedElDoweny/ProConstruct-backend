let mongoose= require('mongoose');

let notificationModel=mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    title:String,
    content:String
});
//mapping

mongoose.model("notification",notificationModel);
