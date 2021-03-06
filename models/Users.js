const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    createat: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("users", UserSchema);
