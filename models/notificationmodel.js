let mongoose= require('mongoose');

let notificationModel= new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        required:true
    },
    client:{
        type:Number,
        ref:"client",
        required:true
    },
    isseen:{
        type:Boolean,
        require:true
    },
    isread:{
        type:Boolean,
        require:true
    }
});
//mapping

mongoose.model("notification",notificationModel);