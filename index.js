// day la file chung cua mot du an, ca mot prj chi chay mot file nay
const express = require("express");
const app = express();
//connect mongodb
const database = require("./src/database");
const Student = require("./src/models/student");
const Classroom = require("./src/models/classroom");
const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    // ham listen la mot event loop luon lang nghe va ko bao gio stop, chi stop khi duoc tat
    console.log("Sever is running...");
})


//khai bao rout

app.set("view engine","ejs");// ejs la ten module su dung
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


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
    const Student = require("./src/models/student");
    Student.find({}).then(rs=>{
        res.render("studentList",{
            items: rs
        })
    }).catch(err=>{
        res.send(err);
    });
});

app.get("/createStudent",(req,res)=>{
    res.render("createStudent");
})
app.post("/createStudent",(req,res)=>{
    let s = req.body;
    const Student = require("./src/models/student");
    let newStudent = new Student(s);
    newStudent.save().then(rs=>{
        res.redirect("/student");
    }).catch(err=>{
        res.send(err);
    })
});

app.get("/updateStudent/:id",function (req,res){
    let id = req.params.id;
    let Student = require("./src/models/student");
    Student.findById(id).then(rs=>{
        res.render("updateStudent",{
            data: rs
        });
    }).catch(err=>{
        res.send(err);
    })
})

app.post("/updateStudent/:id",(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let Student = require("./src/models/student");
    Student.findByIdAndUpdate(id,data)
        .then(rs=>res.redirect("/student"))
        .catch(err=>res.send(err));

    //cach tuong duong
    // Student.findByIdAndUpdate(id,data).then(rs=>{
    //     res.redirect("/student");
    // }).catch(err=>{
    //     res.send(err);
    // })
})
app.get("/deleteStudent/:id",function (req,res){
    let id = req.params.id;
    let Student = require("./src/models/student");
    Student.findByIdAndDelete(id)
        .then(rs=>res.redirect("/student"))
        .catch(err=>res.send(err));
})

//classroom
app.get("/classRoom",function (req,res){
    const Classroom = require("./src/models/classroom");
    Classroom.find({}).then(rs=>{
        res.render("class/list",{
            items: rs
        })
    }).catch(err=>{
        res.send(err);
    });
});

app.get("/createClass",(req,res)=>{
    res.render("class/create");
})

app.post("/createClass",(req,res)=>{
    let s = req.body;
    const Classroom = require("./src/models/classroom");
    let newClassroom = new Classroom(s);
    newClassroom.save().then(rs=>{
        res.redirect("/classRoom");
    }).catch(err=>{
        res.send(err);
    })
})

app.get("/updateClass/:id",function (req,res){
    let id = req.params.id;
    let Classroom = require("./src/models/classroom");
    Classroom.findById(id).then(rs=>{
        res.render("class/update",{
            data: rs
        });
    }).catch(err=>{
        res.send(err);
    })
})

app.post("/updateClass/:id",(req,res)=> {
    let id = req.params.id;
    let data = req.body;
    let Classroom = require("./src/models/classroom");
    Classroom.findByIdAndUpdate(id, data)
        .then(rs => res.redirect("/classRoom"))
        .catch(err => res.send(err));
})

app.get("/deleteClass/:id",(req,res)=>{
    let id = req.params.id;
    let Classroom = require("./src/models/classroom");
    Classroom.findByIdAndDelete(id)
        .then(rs => res.redirect("/classRoom"))
        .catch(err => res.send(err));
})

