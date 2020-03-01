let mongoose = require('mongoose'),
    autoInc = require("mongoose-auto-increment"),
    connection = mongoose.createConnection(`mongodb://localhost:27017/ProConstruct`, { useNewUrlParser: true, useUnifiedTopology: true });
autoInc.initialize(connection)

let notificationModel = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        required: true
    },
    client: {
        type: Number,
        ref: "client",
        required: true
    },
    from:{
        type: Number,
        ref: "client",
        required: true
    },
    isseen: {
        type: Boolean,
        require: true
    },
    isread: {
        type: Boolean,
        require: true
    }
});
notificationModel.plugin(autoInc.plugin, { model: 'notification', field: '_id', startAt: 1, incrementBy: 1 })

//mapping

mongoose.model("notification", notificationModel);