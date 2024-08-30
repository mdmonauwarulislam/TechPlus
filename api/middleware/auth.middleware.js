
const jwt = require('jsonwebtoken');
const httpStatusCode = require('../constant/constant');
const dotenv = require("dotenv");
dotenv.config();

const getToken = async (user) => {
    const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('Generated Token:', token);
    return token;
};


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('Authorization Header:', req.headers.authorization);
    console.log('Extracted Token:', token);

    if (!token) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
            success: false,
            message: 'Unauthorized: Token not provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(httpStatusCode.UNAUTHORIZED).json({
            success: false,
            message: 'Unauthorized: Invalid token'
        });
    }
};



module.exports = {
    getToken,
    verifyToken, 
};
