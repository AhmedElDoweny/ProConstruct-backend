let express = require("express"),
    mongoose = require("mongoose"),
    notificationRouter = express.Router();

require("../models/notificationmodel");
require("../models/clientModel");

let notificationschema = mongoose.model("notification");
let clientSchema = mongoose.model("client");

//routing
notificationRouter.route("/notification/:_id?")
    //get notifications
    .get((request, response) => {
        if (request.params._id) {
            notificationschema.find({ client: request.params._id })
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
            title: request.body.title,
            content: request.body.content,
            client: request.body.client,
            isseen: false,
            isread: false
        });
        console.log("Add ==>" + notifObject);
        notifObject.save().then(data => {
            clientSchema.updateOne({_id:request.body.client},{
                $push:{"notification": data._id}
            }).then(d=>console.log('notification added -> ', d, "n_id: ", data._id))
            .catch(e=>console.log(e))
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