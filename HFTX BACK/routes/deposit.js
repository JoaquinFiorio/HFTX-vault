const {SaveDeposit, approveDeposit, getDeposits, rejectDeposit, getUserDeposits, changeDepositToPaid, changeBatchDepositToPaid, changeBatchDepositToapproved} = require('../controllers/deposit');
const express = require('express');
const {verifyToken} = require('../config/jwt');
const router = express.Router();


router.post('/', verifyToken, SaveDeposit);
router.put('/:id', verifyToken, approveDeposit);
router.get('/', verifyToken,  getDeposits);
router.delete('/:id', verifyToken, rejectDeposit);
router.get('/user', verifyToken, getUserDeposits);
router.put('/paid/:id', verifyToken, changeDepositToPaid);
router.put('/batch/paid', verifyToken, changeBatchDepositToPaid);
router.put('/batch/approved', verifyToken, changeBatchDepositToapproved);


module.exports = router;