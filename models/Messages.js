const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'users',
        required: true
    }
})

module.exports = mongoose.model("messages", MessageSchema);