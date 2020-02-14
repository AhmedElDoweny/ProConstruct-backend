let mongoose = require("mongoose"),
    autoInc = require("mongoose-auto-increment"),
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

// mapping
mongoose.model("admin", adminSchema)
