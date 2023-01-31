const User = require('../models/nosql/users');
const BalanceDeposit = require('../models/nosql/balanceDeposit');
const BalanceRetire = require('../models/nosql/balanceRetire');
const Reward = require('../models/nosql/rewardedHistory');
const AdminPanel = require('../models/nosql/adminpanel');

const getDeposits = async(req, res) => {
    const {userId} = req;
    const user = await User.findById(userId);
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }   
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const pendingDeposits = await BalanceDeposit.find({status:'pending'}).populate('user');
        const approvedDeposits = await BalanceDeposit.find({status:'approved'}).populate('user');
        const pendingBalanceRetire = await BalanceRetire.find({state:'pending'}).populate('user');
        const approvedBalanceRetire = await BalanceRetire.find({state:'approved'}).populate('user');
        const rejectedBalanceRetire = await BalanceRetire.find({state:'rejected'}).populate('user');
        const paidBalanceRetire = await BalanceRetire.find({state:'paid'}).populate('user');
        const rewardedHistory = await Reward.find({}).populate('user');
        let latesApy = ''
        const adminPanel = await AdminPanel.find({});
        adminPanel.map((item) => {
            latesApy = item
        })
        const today = new Date();
        const apyDate = new Date(latesApy.date)
        const todayDate = today.getDate();
        const apyDateDate = apyDate.getDate();

        if(todayDate !== apyDateDate){
            latesApy = 0
        }

        res.status(200).json({pendingDeposits, approvedDeposits, pendingBalanceRetire, approvedBalanceRetire, rejectedBalanceRetire, paidBalanceRetire, rewardedHistory, latesApy});
  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUserDeposits = async(req, res) => {
    const {userId} = req;
    const user = await User.findById(userId);
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }
    try {
        const pendingDeposits = await BalanceDeposit.find({user: userId, status:'pending'}).populate('user');
        const approvedDeposits = await BalanceDeposit.find({user: userId, status:'approved'}).populate('user');
        const retireBalance = await BalanceRetire.find({user: userId}).populate('user');
        const rewardedHistory = await Reward.find({user: userId}).populate('user');

        let latesApy = ''
        const adminPanel = await AdminPanel.find({});
        adminPanel.map((item) => {
            latesApy = item
        })
        let workingBalance = 0;
        const getAllUsers = await User.find();
        getAllUsers.map(user => {
            workingBalance += user.workingBalance;
        });
        const today = new Date();
        const apyDate = new Date(latesApy.date)
        const todayDate = today.getDate();
        const apyDateDate = apyDate.getDate();
   
        if(todayDate !== apyDateDate){
            latesApy = 0
        }

        res.status(200).json({pendingDeposits, approvedDeposits, retireBalance, rewardedHistory, latesApy: latesApy, workingBalance});
  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
        


const SaveDeposit = async(req, res) => {
    const {amount, block, transaction} = req.body;
    const userId = req.user;
    try{
    const user = await User.findById(userId);
    const getAllBalance = await BalanceDeposit.findOne({block: block});
    if(!getAllBalance){
    const deposit = await BalanceDeposit.create({ user: user._id, amount , block, transaction });
    return res.status(200).json({deposit});
    }
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const approveDeposit = async(req, res) => {
    const {id} = req.params;
    const {userId} = req

    try{
    const user = await User.findById(userId);
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }   
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }

    const deposit = await BalanceDeposit.findById(id);
    if(!deposit){
        return res.status(404).json({message: "Deposit not found"});
    }
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    const approvedBalance = {
        status: "approved",
        aprovedBy: user._id,
        aprovedDate: Date.now()
    }
    const updatedDeposit = await BalanceDeposit.findByIdAndUpdate(id, approvedBalance, {new: true});
    const addBalance = user.workingBalance + deposit.amount;
    await User.findByIdAndUpdate(userId, {workingBalance: addBalance}, {new: true});
    const pendingDeposits = await BalanceDeposit.find({status:'pending'}).populate('user');
    const approvedDeposits = await BalanceDeposit.find({status:'approved'}).populate('user');
    res.status(200).json({pendingDeposits, approvedDeposits});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const rejectDeposit = async(req, res) => {
    const {id} = req.params;
    const {userId} = req

    try{
    const user = await User.findById(userId);
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    const deposit = await BalanceDeposit.findById(id);
    if(!deposit){
        return res.status(404).json({message: "Deposit not found"});
    }
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    const rejectedBalance = {
        status: "rejected",
        rejectedBy: user._id,
        rejectedDate: Date.now()
    }
    const updatedDeposit = await BalanceDeposit.findByIdAndUpdate(id, rejectedBalance, {new: true});
    const pendingDeposits = await BalanceDeposit.find({status:'pending'}).populate('user');
    const approvedDeposits = await BalanceDeposit.find({status:'approved'}).populate('user');
    const rejectedDeposits = await BalanceDeposit.find({status:'rejected'}).populate('user');
    const pendingBalanceRetire = await BalanceRetire.find({state:'pending'}).populate('user');
    const approvedBalanceRetire = await BalanceRetire.find({state:'approved'}).populate('user');
    const rejectedBalanceRetire = await BalanceRetire.find({state:'rejected'}).populate('user');
    const paidBalanceRetire = await BalanceRetire.find({state:'paid'}).populate('user');
    res.status(200).json({pendingDeposits, approvedDeposits, rejectedDeposits, pendingBalanceRetire, approvedBalanceRetire, rejectedBalanceRetire, paidBalanceRetire});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const changeDepositToPaid = async(req, res) => {
    const {id} = req.params;
    const {userId} = req

    try{
    const user = await User.findById(userId);
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    const retire = await BalanceRetire.findById(id);
    if(!retire){
        return res.status(404).json({message: "Retire not found"});
    }
    const paidBalance = {
        state: "paid",
        paidDate: Date.now()
    }
    const updatedDeposit = await BalanceRetire.findByIdAndUpdate(id, paidBalance, {new: true});
    const pendingDeposits = await BalanceDeposit.find({status:'pending'}).populate('user');
    const approvedDeposits = await BalanceDeposit.find({status:'approved'}).populate('user');
    const rejectedDeposits = await BalanceDeposit.find({status:'rejected'}).populate('user');
    const pendingBalanceRetire = await BalanceRetire.find({state:'pending'}).populate('user');
    const approvedBalanceRetire = await BalanceRetire.find({state:'approved'}).populate('user');
    const rejectedBalanceRetire = await BalanceRetire.find({state:'rejected'}).populate('user');
    const paidBalanceRetire = await BalanceRetire.find({state:'paid'}).populate('user');

    res.status(200).json({pendingDeposits, approvedDeposits, rejectedDeposits, pendingBalanceRetire, approvedBalanceRetire, rejectedBalanceRetire, paidBalanceRetire});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const changeBatchDepositToPaid = async(req, res) => {
    const {deposits} = req.body;
    const {userId} = req
    try{
    const user = await User.findById(userId);
    console.log(user)
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    deposits.map(async (deposit) => {
        const updatedDeposit = await BalanceRetire.findByIdAndUpdate(deposit, {state: "paid", paidDate: Date.now(), approvedBy: user._id}, {new: true});
    })
    const pendingDeposits = await BalanceDeposit.find({status:'pending'}).populate('user');
    const approvedDeposits = await BalanceDeposit.find({status:'approved'}).populate('user');
    const rejectedDeposits = await BalanceDeposit.find({status:'rejected'}).populate('user');
    const pendingBalanceRetire = await BalanceRetire.find({state:'pending'}).populate('user');
    const approvedBalanceRetire = await BalanceRetire.find({state:'approved'}).populate('user');
    const rejectedBalanceRetire = await BalanceRetire.find({state:'rejected'}).populate('user');
    const paidBalanceRetire = await BalanceRetire.find({state:'paid'}).populate('user');

    res.status(200).json({pendingDeposits, approvedDeposits, rejectedDeposits, pendingBalanceRetire, approvedBalanceRetire, rejectedBalanceRetire, paidBalanceRetire});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const changeBatchDepositToapproved = async(req, res) => {
    const {deposits} = req.body;
    const {userId} = req
    try{
    const user = await User.findById(userId);
    console.log(user)
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    deposits.map(async (deposit) => {
        const updatedDeposit = await BalanceRetire.findByIdAndUpdate(deposit, {state: "approved", paidDate: Date.now(), approvedBy: user._id}, {new: true});
    })
    const pendingDeposits = await BalanceDeposit.find({status:'pending'}).populate('user');
    const approvedDeposits = await BalanceDeposit.find({status:'approved'}).populate('user');
    const rejectedDeposits = await BalanceDeposit.find({status:'rejected'}).populate('user');
    const pendingBalanceRetire = await BalanceRetire.find({state:'pending'}).populate('user');
    const approvedBalanceRetire = await BalanceRetire.find({state:'approved'}).populate('user');
    const rejectedBalanceRetire = await BalanceRetire.find({state:'rejected'}).populate('user');
    const paidBalanceRetire = await BalanceRetire.find({state:'paid'}).populate('user');

    res.status(200).json({pendingDeposits, approvedDeposits, rejectedDeposits, pendingBalanceRetire, approvedBalanceRetire, rejectedBalanceRetire, paidBalanceRetire});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
    




module.exports = {
    SaveDeposit, 
    approveDeposit, 
    getDeposits, 
    rejectDeposit, 
    getUserDeposits, 
    changeDepositToPaid,
    changeBatchDepositToPaid,
    changeBatchDepositToapproved
}
