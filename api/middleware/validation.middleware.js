const { validationResult } = require('express-validator');
const httpStatusCode = require('../constant/constant');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
            success: false,
            errors: errors.array().map(error => ({
                field: error.param,
                message: error.msg,
            })),
        });
    }
    next();
};

module.exports = validateFields;
