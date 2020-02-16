
require('./config/passportConfig');
let jwtConfig = require('./config/jwtConfig')

const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    cors = require('cors'),
    passport = require('passport');


const clientRouter = require('./routes/clientRouter'),
    cartRouter = require("./routes/cartRouter"),
    notificationRouter = require("./routes/notificationRouter"),
    postRouter = require("./routes/postRouter"),
    loginRouter = require("./routes/loginRouter"),
    settingRouter = require("./routes/settingRouter"),
    adminRouter = require("./routes/adminRouter");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// console request
app.use((request, response, next) => {
    console.log("url-> ", request.url, "method-> ", request.method);
    next();
})

// home route
app.use(/\//, (request, response) => {
    response.send("WELCOME HOME...")
})
app.use(passport.initialize())
app.use(loginRouter)
app.use(clientRouter);
app.use(postRouter);
app.use(cartRouter);
app.use(notificationRouter);
app.use(adminRouter);
app.use(settingRouter);

// 404 route
app.use("**", (request, response) => {
    response.send("404 NOT Found")
})

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    
});

module.exports = app;