const permission = "student";
const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'public/uploads/student');
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});
const upload = multer({storage:storage});
let router = express.Router();
let studentController = require("../controllers/student.controller");

const middleware = require("./../middleware/student.middleware");
router.use(middleware.can_view);
router.use("/createStudent",middleware.can_action);
router.use("/updateStudent/:id",middleware.can_action);
router.use("/deleteStudent/:id",middleware.can_action);

router.get("/student",studentController.get);
router.get("/createStudent",studentController.createStudent);
router.post("/createStudent",upload.single("avatar"),studentController.saveCreateStudent);
router.get("/updateStudent/:id",studentController.updateStudent);
router.post("/updateStudent/:id",studentController.saveUpdateStudent);
router.get("/deleteStudent/:id",studentController.deleteStudent);

module.exports = router;