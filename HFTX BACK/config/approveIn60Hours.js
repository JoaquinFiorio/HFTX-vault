const User = require('../models/nosql/users');
const BalanceDeposit = require('../models/nosql/balanceDeposit');


const approveIn5minutes = async (id) => {
    try {
        const deposit = await BalanceDeposit.findById(id);
        if (!deposit) {
            return res.status(404).json({ message: "Deposit not found" });
        }
        const approvedBalance = {
            status: 'approved',
            aprovedDate: Date.now()
        }
        setTimeout(async () => {
        const approvedDeposit = await BalanceDeposit.findByIdAndUpdate(id, approvedBalance, { new: true });
        const user = await User.findById(approvedDeposit.user);
        const newBalance = user.workingBalance + approvedDeposit.amount;
        const update = {
            workingBalance: newBalance,
        }
        await User.findByIdAndUpdate(user._id, update, { new: true });
        }, 
        // change to approve in 2 minutes
        60 * 1000 * 2);

    } catch (error) {
        console.log(error);
    }
}

module.exports = approveIn5minutes;