const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Quiz = new Schema({
    author: String,
    title: String,
    id: String,
    questions: Array
})

module.exports =  mongoose.model("Quiz", Quiz);