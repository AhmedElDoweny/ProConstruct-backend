
let express = require('express');
let postRouter = express.Router();
let jwtConfig = require('../config/jwtConfig');

let multer = require('multer');
let mongoose = require('mongoose');
require("../models/postModel");

let postSchema = mongoose.model('post');

require("../models/clientModel");

let clientschema = mongoose.model('client');

// path of image
const dir = "./public/images";

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, dir);
    },
    filename: (request, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});

// extention of uploaded image
var upload = multer({
    storage: storage,
    fileFilter: (request, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('this format not allowed only [png,jpg,jpeg]'));
        }
    }
})

postRouter.route("/posts")
    .get((request, response) => {
        postSchema.find({})
            .populate({ path: "client" })
            .then((data) => {
                response.send(data)
            })
            .catch((error) => { response.send(error) })
    })


    .post((jwtConfig.verifyJwtToken), upload.single('image'), (request, response) => {

        const url = request.protocol + '://' + request.get('host');
        console.log(url)
        console.log("role: ", request.role)
        if (request.role == "sProvider") {
            let postObject = new postSchema({
                title: request.body.title,
                category: request.body.category,
                description: request.body.description,
                price: request.body.price,
                image: url + '/public/images/' + request.file.filename,
                client: request.body.client
            })
            postObject.save()
                .then((data) => {
                    console.log("cl",request.body.client)
                    clientschema.updateOne({_id:request.body.client},{
                      
                        $push:{'post':data._id}

                    })
                    .then((data)=>{response.send(data);console.log(data)})
                    .catch((err)=>{response.send(err)})
                })
                .catch((error) => {
                    response.send(error);
                })

        }
        else response.status(500).send({ message: "not authorized" })
    })

    .put((request, response) => {
        postSchema.updateOne({ _id: request.body._id }, {
            $set: {
                title: request.body.title,
                category: request.body.category,
                description: request.body.description,
                price: request.body.price,
                image: request.body.image,
                location: request.body.location
            }
        })
            .then((data) => {
                response.send(data);
            })
            .catch((error) => {
                response.send(error);
            })
    })

    .delete((request, response) => {
        postSchema.deleteOne({ _id: request.body._id })
            .then((data) => {
                response.send(data);
            })
            .catch((error) => {
                response.send(error);
            })
    })


// post-details
postRouter.get("/posts/:id", (request, response) => {
    postSchema.findOne({ _id: request.params.id }).populate({ path: "client" })
        .then(data => { response.send(data) })
        .catch(error => { response.send(error) })
})


module.exports = postRouter;