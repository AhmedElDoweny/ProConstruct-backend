let mongoose = require("mongoose"),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    autoInc = require("mongoose-auto-increment"),
    connection = mongoose.createConnection(`mongodb://localhost:27017/ProConstruct`, { useNewUrlParser: true, useUnifiedTopology: true });
    autoInc.initialize(connection)


// create schema
let clientSchema = new mongoose.Schema({
    _id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: `Name can't be empty`
    },
    password:{
        type: String,
        required: `Password can't be empty`,
        minlength: [5, `Password must be atleast 5 character long`]
    },
    email:{
        type: String,
        required: `Email can't be empty`,
        unique: true
    },
    role: String,
    location: String,
    phone: String,
    image: String,
    post:{
        type: [Number],
        ref: "post"
    },
    cart:{
        type: Number,
        ref: "cart",
    },
    notification:{
        type: [Number],
        ref: "notification"
    }

})
// Custom validation for email
clientSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

clientSchema.plugin(autoInc.plugin, {model:'client',field: '_id', startAt: 1, incrementBy: 1 })

// Events
clientSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Methods
clientSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

let secret = 'SECRET#123'
clientSchema.methods.generateJwt = function () {
    return jwt.sign({ 
        email: this.email,
        _id:this._id},
        secret,
    {
        expiresIn: "1h"
    });
}

// mapping
mongoose.model("client",clientSchema)