const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cartRouter=require("./routes/cartRouter");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.use(cartRouter)
// 404 route
app.use("**",(request,response)=>{
    response.send("404 NOT Found")
})

module.exports = app;
