let express = require("express"),
    mongoose= require("mongoose"),
    cartRouter =express.Router();


    require("../models/cartmodel");
    let cartmodel=mongoose.model("cart");


cartRouter.route("/cart/:_id?")
                .get((request,response)=>{
                    if(request.params._id){
                        cartmodel.findOne({ _id:request.params._id })
                            .then(result=>{
                                response.send(result);
                            })
                            .catch((err)=>{
                                response.send({ err: err.errmsg })
                            })
                    }else{
                        cartmodel.find({})
                            .then(result=>{
                                response.send(result); 
                            })
                            .catch((err)=>{
                                response.send({ err: err.errmsg })
                            })
                    }
                })
                //add
                .post((request,response)=>{
                    
                    let cartObject=new cartmodel({
                        _id : request.body._id,
                        client : request.body.client,
                        pending : request.body.pending,
                        completed : request.body.completed,
                        rejected : request.body.rejected
                    });
                    
                    cartObject.save().then(data=>{
                        response.send(data)
                    }).catch((err)=>{
                        response.send({ err: err.errmsg });
                    })
                })

                //Edit
                .put((request,response)=>{
                    cartmodel.updateOne({ _id:request.body._id },{
                        client : request.body.client,
                        pending : request.body.pending,
                        completed : request.body.completed,
                        rejected : request.body.rejected,
                    })
                        .then((data)=>{
                            response.send(data)
                        })
                        .catch((err)=>{
                            response.send({ err: err.errmsg });
                        })
                })

                .delete((request,response)=>{
                    cartmodel.deleteOne({ _id:request.params._id })
                        .then(()=>response.send("deleted")) 
                        .catch((err)=>{response.send({ err: err.errmsg })
                        })
                })

module.exports=cartRouter;