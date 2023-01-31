const { saveTodayApy, modifyTodayApy, getTodayApy, getApyHistory, payRewards, getData } = require('../controllers/reward');
const {verifyToken} = require('../config/jwt');
const router = require('express').Router();

router.post('/saveTodayApy', verifyToken, saveTodayApy);
router.put('/modifyTodayApy', verifyToken, modifyTodayApy);
router.get('/getTodayApy', verifyToken, getTodayApy);
router.get('/getApyHistory', verifyToken, getApyHistory);
router.get('/payRewards', verifyToken, payRewards);
router.get('/getData', getData);

module.exports = router;
