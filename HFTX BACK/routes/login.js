const {auth, verify, getUser} = require('../controllers/login');
const express = require('express');
const {verifyToken} = require('../config/jwt');
const router = express.Router();

router.get('/:wallet',auth);
router.post('/',verify);
router.get('/', verifyToken, getUser);

module.exports = router;