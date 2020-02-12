const express = require("express"),
    adminRouter = express.Router(),
    mongoose = require("mongoose");

require("../models/adminModel");
const adminSchema = mongoose.model("admin");

adminRouter.route("/admin/:_id?")

    // GET -> get one admin
    .get((request, response) => {
        if (request.params.id) {
            adminSchema.findOne({ _id: request.params.id })
                .then(data => response.send(data))
                .catch(error => response.send(error))
        } else {
            adminSchema.find({})
                .then(data => response.send(data))
                .catch(error => response.send(error))
        }
    })

    // Post ->  new admin
    .post((request, response) => {

        let newAdmin = new adminSchema({
            _id: request.params._id,
            name: request.params.name,
            password: request.params.password,
            email: request.params.email,
            role: request.params.role,
            phone: request.params.phone,
            image: request.params.image,
            notification: request.params.notification
        })

        newAdmin.save()
            .then(data => response.send(data))
            .catch(error => response.send(error))
    })

    // PUT -> edit admin
    .put((request, response) => {
        adminSchema.updateOne({ _id: request.body._id }, {
            name: request.params.name,
            password: request.params.password,
            email: request.params.email,
            role: request.params.role,
            phone: request.params.phone,
            image: request.params.image,
            notification: request.params.notification
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