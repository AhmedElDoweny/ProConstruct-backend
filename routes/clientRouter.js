let express = require('express'),
    clientRouter = express.Router(),
    mongoose = require('mongoose');

    require('../models/clientModel')
    let clientSchema = mongoose.model('client')

    // get all clients
clientRouter.route("/client/:id?")
            .get((request, response) => {
                if(request.params.id){
                    clientSchema.findOne({_id: request.params.id})
                    .then(data => response.send(data))
                    .catch(err => response.send({err: err.errmsg}))
                }
                else{
                    clientSchema.find({})
                    .then(data => response.send(data))
                    .catch(err => response.send({err: err.errmsg}))
                }
            })
            // add new Clients
            .post((request, response) => {
                
                let client = new clientSchema({
                    _id: request.body._id,
                    name: request.body.name,
                    password: request.body.password,
                    email: request.body.email,
                    phone: request.body.phone,
                    locatioin: request.body.location,
                    image: request.body.image,
                    role: request.body.role,
                    post: request.body.post,
                    cart: request.body.cart
                })
                
                client.save()
                    .then(data => {response.send(data)})
                    .catch(err => response.send({err:err.errmsg}))
            })
            // edit client
            .put((request, response) => {
                clientSchema.updateOne({_id:request.body._id},{
                    $set:{
                        name: request.body.name,
                        password: request.body.password,
                        email: request.body.email,
                        phone: request.body.phone,
                        locatioin: request.body.location,
                        image: request.body.image,
                        role: request.body.role,
                        post: request.body.post,
                        cart: request.body.cart,
                        notification: request.body.notification
                    }
                })
                .then(data => response.send(data))
                .catch(err => response.send({err: err.errmsg}))
            })
            // delete client
            .delete((request, response) => {
                clientSchema.deleteOne({_id: request.body._id})
                .then(() => response.send({ deleted: true }))
                .catch(err => response.send({err: err.errmsg}))
            })

module.exports = clientRouter;
