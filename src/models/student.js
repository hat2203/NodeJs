let mongoose = require("mongoose");

let student = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    tel: String
});

module.exports = mongoose.model("Student",student);