const express = require("express"),
    adminRouter = express.Router(),
    mongoose = require("mongoose");
    jwtConfig = require('../config/jwtConfig');

require("../models/adminModel");
const adminSchema = mongoose.model("admin");

adminRouter.route("/admin/:_id?")

    // GET -> get one admin
    .get((jwtConfig.verifyJwtToken),(request, response) => {
        if (request.params._id) {
            adminSchema.findOne({ _id: request.params._id })
                .then(data => response.send(data))
                .catch(error => response.send(error))
        }
        else if(request.email){
            adminSchema.findOne({ email: request.email })
                .then(data => response.send(data))
                .catch(error => response.send(error))
        }
        else {
            adminSchema.find({})
                .then(data => { response.send(data); console.log(request.params.id) })
                .catch(error => response.send(error))
        }
    })

    // Post ->  new admin
    .post((request, response) => {

        let newAdmin = new adminSchema({
            _id: request.body._id,
            name: request.body.name,
            password: request.body.password,
            email: request.body.email,
            role: request.body.role,
            phone: request.body.phone,
            image: request.body.image,
            notification: request.body.notification
        })

        newAdmin.save()
            .then(data => response.send(data))
            .catch(error => response.send(error))
    })

    // PUT -> edit admin
    .put((request, response) => {
        adminSchema.updateOne({ _id: request.body._id }, {
            name: request.body.name,
            password: request.body.password,
            email: request.body.email,
            role: request.body.role,
            phone: request.body.phone,
            image: request.body.image,
            notification: request.body.notification
        })
            .then(data => response.send(data))
            .catch(error => response.send(error))
    })

    // DELETE -> delete admin
    .delete((request, response) => {
        adminSchema.deleteOne({ _id: request.body._id })
            .then(data => response.send(data))
            .catch(error => response.send(error))
    })


module.exports = adminRouter;