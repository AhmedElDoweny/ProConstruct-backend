let mongoose = require("mongoose"),
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
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
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
clientSchema.plugin(autoInc.plugin, {model:'client',field: '_id', startAt: 1, incrementBy: 1 })
// mapping
mongoose.model("client",clientSchema)
