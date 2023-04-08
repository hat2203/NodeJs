let mongoose = require("mongoose");

let classroom = new mongoose.Schema({
    name: String,
    room: String
});

module.exports = mongoose.model("Classroom",classroom);