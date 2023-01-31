const User = require('../models/nosql/users');
const BalanceRetire = require('../models/nosql/balanceRetire');

const pendingBalanceRetire = async (req, res) => {
    const {userId} = req;
    const user = await User.findById(userId);
   
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }
    const {amount} = req.body;
    if(amount > user.workingBalance){
        return res.status(400).json({message: "Insufficient balance"});
    }
    //if pending balance retire is more than 1, return error
    const pendingBalanceRetire = await BalanceRetire.find({user: userId, state: "pending"});
    if(pendingBalanceRetire.length > 0){

        return res.status(400).json({message: "You have a pending withdraw request"});
    }
    try {
        const retire = await BalanceRetire.create({user: userId, amount});
        const pendingDeposits = await BalanceRetire.find({user: userId, state: "pending"});
        const approvedDeposits = await BalanceRetire.find({user: userId, state: "approved"});
        const retireBalance = await BalanceRetire.find({user: userId, state: "paid"});
        return res.status(200).json({pendingDeposits, approvedDeposits, retireBalance});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const approvedBalanceRetire = async (req, res) => {
    const {userId} = req;

    try {
    const {id} = req.params;
    const user = await User.findById(userId);
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }
    const retire = await BalanceRetire.findById(id);
    if(!retire){
        return res.status(404).json({message: "Retire not found"});
    }
    if(retire.state !== "pending"){
        return res.status(400).json({message: "Retire already approved"});
    }
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }

        const approved = await BalanceRetire.findByIdAndUpdate(id, {
            state: "approved",
            approvedBy: userId,
            approvedDate: Date.now()
        }, {new: true});

        await User.findByIdAndUpdate(approved.user, {
            $inc: {workingBalance: -approved.amount}
        }, {new: true});
        const pendingBalanceRetire = await BalanceRetire.find({state: "pending"}).populate("user");
        const approvedBalanceRetire = await BalanceRetire.find({state: "approved"}).populate("user");
        const paidBalanceRetire = await BalanceRetire.find({state: "paid"}).populate("user");
        return res.status(200).json({pendingBalanceRetire, approvedBalanceRetire, paidBalanceRetire});   
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


        

const paidBalance = async (req, res) => {
    const {userId} = req;
    const {id} = req.params;
    const user = await User.findById(userId);
    if(!userId){
        return res.status(401).json({message: "Login first"});
    }
    const retire = await BalanceRetire.findById(id);
    if(!retire){
        return res.status(404).json({message: "Retire not found"});
    }
    if(retire.status !== "approved"){
        return res.status(400).json({message: "Retire not approved"});
    }
    if(user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const paid = await BalanceRetire.findByIdAndUpdate(id, {
            status: "paid",
            paidBy: userId,
            paidAt: Date.now()
        }, {new: true});

        return res.status(200).json({paid});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    pendingBalanceRetire,
    approvedBalanceRetire,
    paidBalance
}

