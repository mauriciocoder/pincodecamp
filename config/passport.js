var login = require("./login");
//var User = require("../models/user");

module.exports = function (passport, app) {
	// For session management
	passport.serializeUser(function (user, done) {
		console.log("serializeUser user=" + JSON.stringify(user));
		//done(null, user.id);
	});

    // For session management
	passport.deserializeUser(function (object, done) {
		console.log("deserializeUser user=" + JSON.stringify(object));
		/*
		User.findById(id, function (err, user) {
			done(err, user);
		});
		*/
	});
	
	login(passport, app);
};