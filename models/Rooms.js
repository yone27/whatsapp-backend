const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RoomSchema = new Schema({
    members: [{
        type: Schema.ObjectId,
        ref: "users"
    }],
    messages: [{
        type: Schema.ObjectId,
        ref: "messages"
    }],
    creatorId: {
        type: Schema.ObjectId,
        ref: "users"
    },
    name: String,
    createat: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("rooms", RoomSchema);
