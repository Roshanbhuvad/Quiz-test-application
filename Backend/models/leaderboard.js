const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Leaderboard = new Schema({
    id: String,
    quiz: String,
    leaders: Array
});

module.exports=  mongoose.model("Leaderboard", Leaderboard);