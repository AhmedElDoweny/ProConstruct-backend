let express = require("express"),
    mongoose= require("mongoose"),
    notificationRouter=express.Router();

    require("../models/notificationmodel");

let notificationschema = mongoose.model("notification");

//routing
notificationRouter.route()
.get()


module.exports=notificationRouter;