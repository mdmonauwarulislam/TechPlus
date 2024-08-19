const express = require('express');
const { test, updateUser } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/test', test);
router.put('/update/:userId',verifyToken, updateUser);

module.exports = router;