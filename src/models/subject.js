let mongoose = require("mongoose");

let subject = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minLength:2,
        maxLength: 255
    },
    hour :{
        type: Number,
        required: true,
        min:1,
        max: 100
    },

    teacher: {
        name:{
            type: String,
            required: true,
            minLength: 2,
            maxLength: 255
        },
        email:{
            type: String,
            required: true,
            minLength: 6,
            maxLength: 255
        },
        tel: {
            type: String,
            required: true,
            validate: {
                validator: (v)=>{
                    return v.startsWith('+1');
                }
            },message: t=> `${t} vui lòng điền số điện thoại hợp lệ`
        }
    }
})

module.exports = mongoose.model("Subject",subject);