var express = require("express");
var router = express.Router();
var Pin = require("../models/pin");

module.exports = function(passport) {
    /* Handle add pin GET */
    router.get("/add", function(req, res) {
        if (!req.user) {
            return res.redirect("/");
        }
        var resContent = { message: req.flash("message")};
        res.render("add", resContent);
    });
    
    /* Handle mypins pin GET */
    router.get("/mypins", function(req, res) {
        if (!req.user) {
            return res.redirect("/");
        }
        Pin.find({ "owner": req.user._json.id }, handlePinsView.bind(null, req, res, true));
    });
    
    /* Handle user pin GET */
    router.get("/user/:OWNER_ID", function(req, res) {
        var ownerId = req.params.OWNER_ID;
        Pin.find({ "owner": ownerId }, handlePinsView.bind(null, req, res, false));
    });
    
    /* Handle add pin POST */
    router.post("/add", function(req, res) {
        if (!req.user) {
            return res.redirect("/");
        }
        var url = req.body.url;
        var description = req.body.description;
        var errorMessage = validateInput(url, description);
        if (errorMessage) {
            req.flash("message", errorMessage);
            return res.redirect("/pin/add");
        }
        var owner = req.user._json.id;
        var ownerImage = req.user._json.profile_image_url_https;
        var pin = new Pin();
        pin.owner = owner;
        pin.ownerImage = ownerImage;
        pin.url = url;
        pin.description = description;
        pin.save(function(err) {
            req.flash("message", "Pin Added");
            return res.redirect("/");
        });
    });
    
    /* Handle delete pin */
    router.get("/delete/:ID", function(req, res) {
        if (!req.user) {
            return res.redirect("/");
        }
        var pinId = req.params.ID;
        var userId = req.user._json.id;
         Pin.remove({
            "$and": [
                {"_id" : pinId},
                {"owner" : userId}
            ]
         }, function(err) {
            req.flash("message", "Pin removed with success!");
            return res.redirect("/pin/mypins");
         });
    });
    
    return router;
};

//Returns error message if any. Otherwise returns null
function validateInput(url, description) {
    if (!url || !description) {
        return "All Fields Required";
    }
    var URL_REGEX = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (!URL_REGEX.test(url)) {
        return "Invalid Url";
    }
}

function handlePinsView(req, res, enableDelete, err, pins) {
    req.flash("pins", pins);
    req.flash("enableDelete", enableDelete);
    return res.redirect("/");
}
