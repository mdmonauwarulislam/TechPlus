const bcryptjs = require("bcryptjs");
const User = require("../models/users.model");


const test = (req, res) => {
    res.json({message : "API is working!!"});
}

const updateUser = async (req, res) => {
    console.log(req.user);

    try {
        const { userId } = req.params;
        const { name, email, password, profilePic } = req.body;

        // Validation for the username
        if (name) {
            const nameRegex = /^[a-z]{5,20}$/;
            if (!nameRegex.test(name)) {
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Username must be lowercase, contain no special characters, and be between 5 to 20 letters.",
                });
            }
        }

        // Validation for the password
        if (password && password.length < 8) {
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "Password must be at least 8 characters long.",
            });
        }

        // Prepare the update object
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) updateData.password = bcryptjs.hashSync(password, 10);
        if (profilePic) updateData.profilePic = profilePic;

        // Find and update the user
        let user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!user) {
            return res.status(httpStatusCode.NOT_FOUND).json({
                success: false,
                message: "User not found!",
            });
        }

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "User updated successfully!",
            data: user,
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

