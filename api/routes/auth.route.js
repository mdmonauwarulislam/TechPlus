const express = require('express');
const { signup, signin } = require('../controller/auth.controller.js');
const router = express.Router();
const { check } = require('express-validator');
const validateFields = require('../middleware/validation.middleware');

router.post('/signup', [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
], validateFields, signup);

router.get("./signin", [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
], validateFields, signin);

module.exports = router;