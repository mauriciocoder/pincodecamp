var mongoose = require("mongoose");

module.exports = mongoose.model("Pin", {
    url: String,
    description: String,
    owner: String,
    ownerImage: String,
    likes: [String]
});