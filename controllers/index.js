var express = require("express");
var router = express.Router();
var Pin = require("../models/pin");
module.exports = function(passport) {
    router.get("/", function(req, res) {
        var pins = req.flash("pins");
        if (pins.length > 0) {
            handlePinView(req, res, null, pins);
        } else {
            Pin.find({}, handlePinView.bind(null, req, res));
        }
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

function handlePinView(req, res, err, pins) {
    var enableDelete = req.flash("enableDelete");
    var resContent = { user: req.user, enableDelete: enableDelete };
    resContent.pins = pins;
    resContent.message = req.flash("message");
    res.render("home", resContent);
}
