let express = require('express'),
    clientRouter = express.Router(),
    mongoose = require('mongoose'),
    jwtConfig = require('../config/jwtConfig');


    require('../models/clientModel')
    let clientSchema = mongoose.model('client')
    
    // get all clients
clientRouter.route("/client/:id?")
            .get((jwtConfig.verifyJwtToken),(request, response) => {
                if(request.params.id){
                    clientSchema.findOne({_id: request.params.id})
                    .then(data => response.send(data))
                    .catch(err => response.send({err: err.errmsg}))
                }
                else if(request.email){
                    clientSchema.findOne({email: request.email})
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
            .post((request, response, next) => {
                
                let client = new clientSchema({
                    _id: request.body._id,
                    name: request.body.name,
                    password: request.body.password,
                    email: request.body.email,
                    phone: request.body.phone,
                    locatioin: request.body.location,
                    image: request.body.image,
                    role: request.body.role
                })
                
                client.save((err, data) => {
                    if(!err)  response.status(200).json({ "token": data.generateJwt() }); //response.send(data)
                    else {
                        if(err.code == 11000)
                            response.status(442).send(['Email is already existing'])
                        else
                            return next(err)
                    }
                })
                    
            })
            // edit client
            .patch((jwtConfig.verifyJwtToken),(request, response) => {
                clientSchema.updateOne({email:request.email},{
                    $set:request.body.edit
                })
                .then(data => response.send(data))
                .catch(err => response.send({err: err.errmsg}))
            })
            // delete client
            .delete((jwtConfig.verifyJwtToken),(request, response) => {
                clientSchema.deleteOne({_id: request.body._id})
                .then(() => response.send({ deleted: true }))
                .catch(err => response.send({err: err.errmsg}))
            })


module.exports = clientRouter;
