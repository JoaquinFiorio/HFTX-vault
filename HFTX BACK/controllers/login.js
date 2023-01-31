const User = require('../models/nosql/users');
const BalanceDeposit = require('../models/nosql/balanceDeposit');
const {createToken} = require('../config/jwt');
const {sendMessage, verifyMenssage} = require('../blockchain/config');


const auth = async (req, res) => {
    const { wallet } = req.params;
   
    const message = sendMessage();
    const user = await User.findOne({ wallet });
    if (!user) {
        const newUser = await User.create({ wallet, verifyMessage: message });
        return res.status(200).json({ message: newUser.verifyMessage });
    }
    await User.findOneAndUpdate({ wallet }, { verifyMessage: message });
    const updatedUser = await User.findOne({ wallet });
    return res.status(200).json({ message: updatedUser.verifyMessage });
}


const verify = async(req, res) => {
    const { wallet, signedMessage } = req.body;

    const user = await User.findOne({ wallet });
 
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const verify = await verifyMenssage({ message: user.verifyMessage, signedMessage, address: wallet });
    if (!verify) {
        return res.status(400).json({ message: "Invalid signature" });
    }
    const token = createToken({ user });
    return res.status(200).json({ token, user, message: "User verified" });
}


const getUser = async(req, res) => {
    const  {userId}  = req;
    const user = await User.findById(userId)
  
    return res.send({ user })
};

module.exports = {
    auth,
    verify,
    getUser
};