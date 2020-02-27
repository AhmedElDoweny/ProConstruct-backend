let express = require('express'),
    clientRouter = express.Router(),
    mongoose = require('mongoose'),
    jwtConfig = require('../config/jwtConfig');

require('../models/clientModel')
let clientSchema = mongoose.model('client')
require("../models/cartmodel");
    let cartmodel=mongoose.model("cart");

// get all clients

clientRouter.route("/client/:id?")
    .get((jwtConfig.verifyJwtToken), (request, response) => {
        if (request.params.id) {
            clientSchema.findOne({ _id: request.params.id })
                .then(data => response.send(data))
                .catch(err => response.send({ err: err.errmsg }))
        }
        else if (request.email) {
            clientSchema.findOne({ email: request.email })
                .populate({path:'post'})
                .then(data => response.send(data))
                .catch(err => response.send({ err: err.errmsg }))
        }
        else {
            clientSchema.find({})
                .then(data => response.send(data))
                .catch(err => response.send({ err: err.errmsg }))
        }
    })
    // add new Clients
    .post((request, response, next) => {
        let lastId;

        let client = new clientSchema({
            name: request.body.name,
            password: request.body.password,
            email: request.body.email,
            phone: request.body.phone,
            locatioin: request.body.location,
            image: request.body.image,
            role: request.body.role,
            post: [],
            notification: []
        })
        client.save((err, data) => {
            if (!err) {

                clientSchema.findOne({ email: client.email })
                    .then(data => {
                        let cart = new cartmodel({
                            client: data._id,
                            pending: [],
                            completed: [],
                            rejected: []
                        })
                        cart.save().then(cartData => {
                            clientSchema.updateOne({ email: client.email }, {
                                $set: { cart: cartData._id }
                            })
                                .then(cart => response.status(200).json({ "token": data.generateJwt() }))
                                .catch(err => { })
                        }).catch((err) => { })
                    })
                    .catch(err => console.log(err))
            } //response.send(data)
            else {
                if (err.code == 11000)
                    response.status(442).send(['Email is already existing'])
                else
                    return next(err)
            }
        })


    })
    // edit client
    .patch((jwtConfig.verifyJwtToken), (request, response) => {
        clientSchema.updateOne({ email: request.email }, {
            $set: request.body.edit
        })
            .then(data => response.send(data))
            .catch(err => response.send({ err: err.errmsg }))
    })
    // delete client
    .delete((jwtConfig.verifyJwtToken), (request, response) => {
        clientSchema.deleteOne({ _id: request.params.id })
            .then(() => response.send({ deleted: true }))
            .catch(err => response.send({ err: err.errmsg }))
    })

    clientRouter.route("/clients")
    .get((jwtConfig.verifyJwtToken), (request, response) => {
            clientSchema.find({})
                .then(data => response.send(data))
                .catch(err => response.send({ err: err.errmsg }))
        
    })


module.exports = clientRouter;
