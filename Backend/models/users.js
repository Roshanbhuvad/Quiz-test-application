const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    id: String,
    username: String
});

module.exports =mongoose.model("User", User);