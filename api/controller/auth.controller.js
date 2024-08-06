const User = require("../models/users.model");
const bcryptjs = require('bcryptjs');
const httpStatusCode = require("../constant/constant");
const { getToken } = require("../middleware/auth.middleware");

const signup = async (req, res,) => {

    try {
        const { username, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(httpStatusCode.CONFLICT).json({
                success: false,
                message: "User is already registered with this email. Please login!"
            });
        }

        // Hashing password and creating new user
        const hash = await bcryptjs.hash(password, 10);

        let newUser = await User.create({
            username,
            email,
            password: hash,
        });

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "User created",
            data: newUser,
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error.message,
        });
    }
};

const signin = async (req, res) => {
    try {
        
        const { email, password, } = req.body;

        let user = await User.findOne({ email });
       
        if (!user) {
            return res.status(httpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: "Invalid email and password. Please register first!",
            });
        }

        let isMatch = bcryptjs.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "Email or password is incorrect!",
            });
        }

        if (isMatch) {
            const token = await getToken(user);
            res.cookie("token", token);
            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Successfully logged in!",
                data: { user, token },
            });
        } else {
            return res.status(httpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: "Invalid email or password!",
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error.message,
        });
    }
};


module.exports = { signup, signin };