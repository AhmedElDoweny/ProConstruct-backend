const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let clientRouter = require('./routes/clientRouter');
var cors = require('cors');

const cartRouter=require("./routes/cartRouter");
const notificationRouter = require("./routes/notificationRouter");

const postRouter = require("./routes/postRouter");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// console request
app.use((request,response,next)=>{
    console.log("url-> ",request.url,"method-> ",request.method);
    next();
})

// home route
app.use(/\//,(request,response)=>{
    response.send("WELCOME HOME...")
})

app.use(clientRouter)
app.use(postRouter);
app.use(cartRouter);
app.use(notificationRouter);

// 404 route
app.use("**",(request,response)=>{
    response.send("404 NOT Found")
})

module.exports = app;
