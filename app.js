var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("cookie-parser")());

// Configuring passport
var passport = require("passport");

////////////////

//var User = require("../models/user");
var Strategy = require("passport-twitter").Strategy;

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
    callbackURL: process.env.CALLBACK_URL + "/login/twitter/return"
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));
  
////////////////

app.use(require("express-session")({ secret: "MySecretKey", resave: true, saveUninitialized: true }));
// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
// Forbidden to change stack order!!!
var flash = require("connect-flash");
app.use(flash());

// Mongoose Config
var mongoose = require("mongoose");
var dbUrl = process.env.PINCODECAMP_DB_URL;
mongoose.connect(dbUrl);

// Mustache Config
var mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
//app.use(require('./middlewares/users'))
app.use(require("./controllers")(passport));

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("dbUrl = " + dbUrl);
    console.log("PinCodeCamp Listening on port " + port);
});