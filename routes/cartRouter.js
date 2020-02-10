let express = require("express"),
    mongoose= require("mongoose"),
    cartRouter =express.Router();


    require("../models/cartmodel");
    let cartmodel=mongoose.model("cart");


cartRouter.route("/cart")
                .get("/cart/:id" , (requuest,response)=>{

                    cartmodel.findOne({_id:requuest.body.id})
                    .then((result)=>{
                        response.send(result);
                    })
                    .catch((error)=>{
                        response.send(error)
                    })
                })
                //add
                .post((request,response)=>{
                    let cartObject=new cartmodel({
                        _id:request.body._id,
                        client:request.body.client,
                        pending:request.body.pending,
                        completed:request.body.completed,
                        rejected:request.body.rejected
                    });
                    console.log("Add ==>" + cartObject);
                    cartObject.save().then(data=>{
                        response.send(data)
                    }).catch((error)=>{
                        response.send(error)
                    })
                })
                //Edit
                .put((request,response)=>{
                    cartmodel.updateOne({_id:request.body._id},{
                        client:request.body.client,
                        pending:request.body.pending,
                        completed:request.body.completed
                    })
                    .then((data)=>{
                        response.send(data)
                    })
                    .then((err)=>{
                        response.send(err)  
                    })
                })
                .delete("/cart/:id",(request,response)=>{
                    cartmodel.deleteOne({_id:request.params.id})
                    .then(()=>response.send("deleted")) 
                    .catch((err)=>{response.send(err.errmsg)})
                })



module.exports=cartRouter;