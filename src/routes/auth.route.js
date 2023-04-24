const express = require("express");
let router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'public/uploads/user');
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});
const upload = multer({storage:storage});

let authController = require("../controllers/register.controller");
const middleware = require("./../middleware/auth.middleware")

router.use("/register",middleware.guest);
router.use("/login",middleware.guest);
router.use("/change-password",middleware.logged_in);

router.get("/register",authController.get);
router.post("/register",upload.single("avatar"),authController.create);
router.get("/login",authController.login);
router.post("/login",authController.loginUser);

router.get("/change-password",authController.changePassForm);
router.post("/change-password",authController.updatePass);

router.post("/forgotPassword",authController.sendMail);


module.exports = router;