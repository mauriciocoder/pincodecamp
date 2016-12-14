var express = require("express");
var router = express.Router();
module.exports = function(passport) {
    /* Handle add pin GET */
    router.get("/add", function(req, res) {
        console.log("TODO: Verificar se o usuário chega na requisicao");
        //var resContent = { user: req.user, authenticated: req.isAuthenticated() };
        res.render("add", null);
    });
    
    return router;
};
