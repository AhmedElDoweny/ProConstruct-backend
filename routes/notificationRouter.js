let express = require("express"),
    mongoose = require("mongoose"),
    notificationRouter = express.Router();

require("../models/notificationmodel");

let notificationschema = mongoose.model("notification");

//routing
notificationRouter.route("/notification/:_id?")
    //get notifications
    .get((request, response) => {
        if (request.params._id) {
            notificationschema.findOne({ _id: request.params._id })
                .then(result => {
                    response.send(result);
                })
                .catch((err) => {
                    response.send({ err: err.errmsg })
                })
        } else {
            notificationschema.find({})
                .then(result => {
                    response.send(result);
                })
                .catch((err) => {
                    response.send({ err: err.errmsg })
                })
        }

    })
    //add notification
    .post((request, response) => {
        let notifObject = new notificationschema({
            _id: request.body._id,
            title: request.body.title,
            content: request.body.content,
            client: request.body.client,
            isseen: request.body.isseen,
            isread: request.body.isread

        });
        console.log("Add ==>" + notifObject);
        notifObject.save().then(data => {
            response.send(data)
        }).catch((err) => {
            response.send({ err: err.errmsg });
        })
    })
    //Edit
    .put((request, response) => {
        notificationschema.updateOne({ _id: request.body._id }, {
            $set: {
                title: request.body.title,
                content: request.body.content,
                client: request.body.client,
                isseen: request.body.isseen,
                isread: request.body.isread,

            }

        })
            .then((data) => {
                response.send(data)
            })
            .catch((err) => {
                response.send({ err: err.errmsg });
            })
    })
    //delete
    .delete((request, response) => {
        notificationschema.deleteOne({ _id: request.params._id })
            .then(() => response.send({ deleted: "deleted" }))
            .catch((err) => { response.send({ err: err.errmsg }) })
    })



module.exports = notificationRouter;