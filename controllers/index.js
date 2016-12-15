var express = require("express");
var router = express.Router();
module.exports = function(passport) {
    router.get("/", function(req, res) {
        var resContent = { user: req.user };
        resContent.message = req.flash("message");
        //console.log("resContent = " + JSON.stringify(resContent));
        res.render("home", resContent);
    });
    
    /* Handle Logout */
	router.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});
    
    router.use("/login", require("./login")(passport));
    router.use("/pin", require("./pin")(passport));
    
    return router;
}
