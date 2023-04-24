const Student = require("../models/student");
const nodemailer = require("nodemailer");
const config_mail = {
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: "nguyenthihakrvn2506@gmail.com",
        pass: 'ilfjcroznngjzmyk'
    }
};
const transport = nodemailer.createTransport(config_mail);

exports.get = async (req, res)=>{ //async dung de xu li bat dong bo

    try {
        const auth = req.session.auth;
        const ls1 = await Student.find({});
        res.render("studentList",{
            items : ls1,
            auth: auth
        });
    }catch (err) {
        res.send(err);
    }
}

exports.createStudent = (req,res)=>{
    res.render("createStudent");
}

exports.saveCreateStudent =async (req,res)=>{
    let s = req.body;
    const file = req.file;
    if (file)
        s.avatar = "uploads/student"+file.filename;
    let newStudent = new Student(s);
    try {
        await newStudent.save();
        //send email
            await transport.sendMail({
                from: "Demo NodeJs T2203E",
                to: "nguyenthihakrvn2506@gmail.com",
                subject: "Test Send Mail function",
                html: '<p>Mail Send from Demo NodeJs</p>'
            })
        //end
        res.redirect("/students/student");
    }catch (err){
        res.send(err);
    }
}

exports.updateStudent = (req,res)=>{
    let id = req.params.id;
    Student.findById(id).then(rs=>{
        res.render("updateStudent",{
            data: rs
        });
    }).catch(err=>{
        res.send(err);
    })
}

exports.saveUpdateStudent = (req,res)=>{
    let id = req.params.id;
    let data = req.body;
    Student.findByIdAndUpdate(id,data)
        .then(rs=>res.redirect("/students/student"))
        .catch(err=>res.send(err));

    //cach tuong duong
    // Student.findByIdAndUpdate(id,data).then(rs=>{
    //     res.redirect("/student");
    // }).catch(err=>{
    //     res.send(err);
    // })
}

exports.deleteStudent = (req,res)=>{
    let id = req.params.id;
    Student.findByIdAndDelete(id)
        .then(rs=>res.redirect("/students/student"))
        .catch(err=>res.send(err));
}

