
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

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const whitelist = ['http://localhost:4100', 'http://localhost:4200', 'http://localhost:4300', 'http://localhost:4400'];
const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        if (whitelist.includes(origin))
            return callback(null, true)

        callback(new Error('Not allowed by CORS'));
    }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection', function (socket) {
//     console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ a user connected ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
// });

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
});

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

// io.on("connection", socket => {
//     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ user is connected ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

//     socket.on('my message', (msg) => {
//         debugger;
//         console.log('message: ' + msg);
//     });

//     socket.on("disconnect", () => console.log("################## user is disconnected ##################"))
// })

module.exports = app;