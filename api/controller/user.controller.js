const bcryptjs = require("bcryptjs");
const User = require("../models/users.model");
const httpStatusCode = require("../constant/constant");


const test = (req, res) => {
    res.json({message : "API is working!!"});
}

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, profilePic } = req.body;
        console.log("userId :", userId);
        console.log("username :", username);
        console.log(req.body);
        
        

    //    if(password){
    //     if(password.length < 6){
    //         return res.status(httpStatusCode.BAD_REQUEST).json({
    //             success: false,
    //             message: "Password must be at least 6 characters!",
    //         });
    //     }
    //     password = bcryptjs.hashSync(password, 10);
    //    }

    //    if(username){
    //     if(username.length < 6){
    //         return res.status(httpStatusCode.BAD_REQUEST).json({
    //             success: false,
    //             message: "Username must be at least 3 characters!",
    //         });
    //     }
    //     if(username.includes(" ")){
    //         return res.status(httpStatusCode.BAD_REQUEST).json({
    //             success: false,
    //             message: "Username must not contain spaces!",
    //         });
    //     }
    //     if(username !== username.toLowerCase()){
    //         return res.status(httpStatusCode.BAD_REQUEST).json({
    //             success: false,
    //             message: "Username must be in lowercase!",
    //         });
    //     }
    //     if(username !== username.replace(/[^a-zA-Z0-9]/g, "")){
    //         return res.status(httpStatusCode.BAD_REQUEST).json({
    //             success: false,
    //             message: "Username must not contain special characters!",
    //         });
    //     }
    //    }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            username,
            email,
            profilePic,
        }, {new: true});
        

        if (!updatedUser) {
            return res.status(httpStatusCode.NOT_FOUND).json({
                success: false,
                message: "User not found!",
            });
        }

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "User updated successfully!",
            data: {user:updatedUser},
        });
    } catch (error) {
        console.error("Update user error:", error);
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error.message,
        });
    }
};



module.exports = {test, updateUser};

