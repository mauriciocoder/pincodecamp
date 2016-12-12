//var User = require("../models/user");
var Strategy = require("passport-twitter").Strategy;

module.exports = function(passport, app) {
    app.get("/login/twitter", passport.authenticate("twitter"));
    
    // Configure the Twitter strategy for use by Passport.
    //
    // OAuth 1.0-based strategies require a `verify` function which receives the
    // credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
    // user's behalf, along with the user's profile.  The function must invoke `cb`
    // with a user object, which will be set at `req.user` in route handlers after
    // authentication.
    passport.use(new Strategy({
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackURL: "https://fcc-fullstack-working-projects-mauriciobonetti.c9users.io/login/twitter/return"
      },
      function(token, tokenSecret, profile, cb) {
        // In this example, the user's Twitter profile is supplied as the user
        // record.  In a production-quality application, the Twitter profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
      }));
      
    app.get("/login/twitter/return", 
        passport.authenticate("twitter", { failureRedirect: "/login/twitter" }),
        function(req, res) {
            res.redirect("/");
        }
    );
};