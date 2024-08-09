const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        require:true,
        unique:true,
    },
    email :{
        type:String,
        require:true,
        unique:true,
    },
    password :{
        type:String,
        require:true,
    },
    profilePic :{
        type:String,
        default:"https://res.cloudinary.com/dh3hgr3fq/image/upload/v1633340066/Profile%20Pic/default-profile-pic_rz5q4o.png",
    },

}, {timeStamp:true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;