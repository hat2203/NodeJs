const Subject = require("../models/subject");

exports.get = (req, res)=>{
    Subject.find({}).then(rs=>{
        res.render("subject/list",{
            items : rs
        })
        }).catch(err=>{
            res.send(err);
    });
}

exports.createSubject = (req,res)=>{
    res.render("subject/create");
}

exports.saveCreateSubject = (req, res)=>{
    let s = req.body;
    let newSubject = new Subject(s);
    newSubject.save().then(rs=>{
        res.redirect("/subject/")
    }).catch(err=>{
        res.send(err);
    })
}

exports.updateSubject = (req,res)=>{
    let id = req.params.id;
    Subject.findById(id).then(rs=>{
        res.render("subject/update",{
            data: rs
        });
    }).catch(err=>{
        res.send(err);
    })
}

exports.saveUpdateSubject = (req,res)=> {
    let id = req.params.id;
    let data = req.body;
    Subject.findByIdAndUpdate(id, data)
        .then(rs => res.redirect("/subject/"))
        .catch(err => res.send(err));
}

exports.deleteSubject = (req,res)=>{
    let id = req.params.id;
    Subject.findByIdAndDelete(id)
        .then(rs=>res.redirect("/subject/"))
        .catch(err=>res.send(err));
}