const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    contacts: {
        type: Schema.ObjectId,
        ref: "rooms"
    },
    createat: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("users", UserSchema);
