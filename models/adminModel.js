let mongoose = require("mongoose"),
    autoInc = require("mongoose-auto-increment"),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    connection = mongoose.createConnection(`mongodb://localhost:27017/ProConstruct`, { useNewUrlParser: true, useUnifiedTopology: true });
autoInc.initialize(connection)

// create schema
let adminSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phone: String,
    image: String,
    notification: [{
        type: Number,
        ref: "notification"
    }]


})
adminSchema.plugin(autoInc.plugin, { model: 'admin', field: '_id', startAt: 1, incrementBy: 1 })

adminSchema.pre("save", function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
})

// verify password
adminSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

let secret = 'SECRET#123'
adminSchema.methods.generateJwt = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
        },
        secret,
        {
            expiresIn: "1h"
        });
}

// mapping
mongoose.model("admin", adminSchema)
