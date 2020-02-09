
let express = require('express');
let postRouter = express.Router();

let mongoose = require('mongoose');
require("../Models/postModel");

postRouter.route("/post")
          .get((request,response)=>{
                postSchema.find({})
                .then((data)=>{
                    response.send(data)
                })
                .catch((error)=>{response.send(error)})
          })

          .post((request,response)=>{
                let postObject = new postSchema({
                    _id:request.body.id,
                    title:request.body.title,                    
                    category:request.body.category,                    
                    description:request.body.description,          
                    price:request.body.price,          
                    image:request.body.image         
                });
                postObject.save()
                          .then((data)=>{
                                response.send(data);
                           })
                           .catch((error)=>{
                               response.send(error);
                           })
          })

          .put((request,response)=>{
                postSchema.updateOne({_id:request.body.id},{
                    $set:{
                        title:request.body.title,                    
                        category:request.body.category,                    
                        description:request.body.description,          
                        price:request.body.price,          
                        image:request.body.image         
                    }
                })
                .then((data)=>{
                    response.send(data);
                })
                .catch((error)=>{
                    response.send(error);
                })
          })

          .delete((request,response)=>{
                postSchema.deleteOne({_id:request.body.id})
                .then((data)=>{
                    response.send(data);
                })
                .catch((error)=>{
                    response.send(error);
                })
          })



module.exports = postRouter;