const {pendingBalanceRetire, approvedBalanceRetire, paidBalance} = require('../controllers/retire');
const express = require('express');
const {verifyToken} = require('../config/jwt');

const router = express.Router();

router.post('/', verifyToken, pendingBalanceRetire);
router.put('/:id', verifyToken, approvedBalanceRetire);
router.put('/paid/:id', verifyToken, paidBalance);


module.exports = router;