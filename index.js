// day la file chung cua mot du an, ca mot prj chi chay mot file nay
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    // ham listen la mot event loop luon lang nghe va ko bao gio stop, chi stop khi duoc tat
    console.log("Sever is running...");
})


//khai bao rout

app.set("view engine","ejs");// ejs la ten module su dung
//connect mongodb
const database = require("./src/database");

app.get("/",function (req,res){
   // res.send("Hello everybody");// phan hoi tra ve giong return trong PHP, tra ve trang chu dang html
    let student = {
        name: "Nguyen Van A",
        age: 18
    };
    let classRoom = {
        name: "T2203E",
        room: "B14"
    }
    res.render("home",{
        student: student,
        classRoom: classRoom
    });
});

app.get("/student",function (req,res){
    res.render("studentList")
});

app.get("/createStudent",function (req,res) {
    res.render("createStudent")
});
app.get("/updateStudent",function (req,res){
    res.render("updateStudent")
})

