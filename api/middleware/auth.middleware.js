
const jwt = require('jsonwebtoken');
const httpStatusCode = require('../constant/constant');
const dotenv = require("dotenv");
dotenv.config();

async function getToken(user) {
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized: Token not provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(httpStatusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
}


module.exports = {
    getToken,
    verifyToken, 
};
