var express = require("express");
var router = express.Router();
module.exports = function(passport) {
    router.get("/", function(req, res) {
        console.log("Chegou na raiz!");
        res.render("home", null);
    });
    
    router.use("/login", require("./login")(passport));
    router.use("/pin", require("./pin")(passport));
    
    return router;
}
