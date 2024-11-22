const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/PasswordManger");

const passSchema = mongoose.Schema({
    url:String ,
    username:String,
    password:String
});

module.exports = mongoose.model("Passmang",passSchema);
