let mongoose = require("mongoose");

let student = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [6,'Phải nhập tên tối thiểu 6 chữ cái'],
        maxLength: 255
        },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 255
    },
    age:  {
        type: Number,
        required: true,
        min: 18,
        max:100
    },
    tel: {
        type: String,
        required: true,
        validate: {
            validator: (v)=>{
                return v.startsWith('+1');
            }
        },message: t=> `${t} vui lòng điền số điện thoại hợp lệ`
    },
    avatar: String
});

module.exports = mongoose.model("Student",student);