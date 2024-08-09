const express = require('express');
const { signup, signin, google } = require('../controller/auth.controller.js');
const router = express.Router();
const { check } = require('express-validator');
const validateFields = require('../middleware/validation.middleware');
// const { verifyToken } = require('../middleware/auth.middleware.js');

router.post('/signup', [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
], validateFields, signup);

router.post('/signin', [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
], validateFields,  signin);

router.post('/google', google);

module.exports = router;