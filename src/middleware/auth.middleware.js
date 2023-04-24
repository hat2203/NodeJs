exports.guest = (req,res,next)=>{
    const auth = req.session.auth;
    if(auth){
        return res.redirect("/students/student");
    }
    next();
}
exports.logged_in =  (req,res,next)=>{
    const auth = req.session.auth;
    if(auth){
        return next();
    }
    res.redirect("/auth/login");
};