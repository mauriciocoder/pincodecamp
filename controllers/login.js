var express = require("express");
var router = express.Router();
module.exports = function(passport) {
    router.get("/twitter", passport.authenticate("twitter"));
    
    router.get("/twitter/return", 
        passport.authenticate("twitter", { failureRedirect: "/login/twitter" }),
        function(req, res) {
            res.redirect("/");
        }
    );
    
    // For session management
	passport.serializeUser(function (user, done) {
		console.log("serializeUser user=" + JSON.stringify(user));
		done(null, user.id);
	});

    // For session management
	passport.deserializeUser(function (object, done) {
		console.log("deserializeUser user=" + JSON.stringify(object));
		done(null, object);
		/*
		User.findById(id, function (err, user) {
			done(err, user);
		});
		*/
	});
    
    return router;
};
