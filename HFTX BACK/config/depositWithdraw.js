const User = require('../models/nosql/users');
const BalanceDeposit = require('../models/nosql/balanceDeposit');
const approveIn5minutes = require('../config/approveIn60Hours');

const deposit = async (address, amount, block, transaction) => {
    try {
    const user = await User.findOne({ wallet: address });
    if (!user) {
        await User.create({ wallet: address });
    }
    const getAllBalance = await BalanceDeposit.findOne({block: block});
    if(!getAllBalance){
    const deposit = await BalanceDeposit.create({ user: user._id, amount , block, transaction });
    // change to approve in 3 minutes
    approveIn5minutes(deposit._id);

    return deposit;
    }
    } catch (error) {
        console.log(error);
    }
}

module.exports = deposit;
