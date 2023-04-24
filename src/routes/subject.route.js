const express = require("express");
let router = express.Router();
let subjectController = require("../controllers/subject.controller");

router.get("/",subjectController.get);
router.get("/createSubject", subjectController.createSubject);
router.post("/createSubject", subjectController.saveCreateSubject);
router.get("/updateSubject/:id", subjectController.updateSubject);
router.post("/updateSubject/:id", subjectController.saveUpdateSubject);
router.get("/deleteSubject/:id", subjectController.deleteSubject);

module.exports = router;