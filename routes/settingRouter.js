const express = require("express"),
    settingRouter = express.Router(),
    mongoose = require("mongoose");

require("../models/settingModel");
const settingSchema = mongoose.model("setting");

settingRouter.route("/setting/:select?")
    // GET -> retrieve specific field 
    .get((request, response) => {
        settingSchema.findOne({ _id: 1 }).select(request.params.select)
            .then(data => response.send(data))
            .catch(error => response.send(error))
    })

    // PATCH -> edit specific field
    .patch((request, response) => {
        settingSchema.updateOne({ _id: 1 }, { $set: request.body.change })
            .then(data => response.send(data))
            .catch(error => response.send(error))
    })

    // PUT -> push to newsLetterEmails or contactEmails array
    .put((request, response) => {
        settingSchema.updateOne({ _id: 1 }, { $push: request.body.push })
            .then(data => response.send(data))
            .catch(error => response.send(error))
    })

module.exports = settingRouter;