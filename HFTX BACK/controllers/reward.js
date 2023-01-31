const User = require('../models/nosql/users');
const AdminPanel = require('../models/nosql/adminpanel');
const Reward = require('../models/nosql/rewardedHistory');

const saveTodayApy = async (req, res) => {

    try {
        const { apyAmount } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        //get last apy
        const getApys = await AdminPanel.find();
        let lastApy = 0;
        getApys.map(apy => {
            if (apy.date < new Date()) {
                lastApy = apy
            }
        });

        let workingBalance = 0;
        const getAllUsers = await User.find();
        getAllUsers.map(user => {
            workingBalance += user.workingBalance;
        });


        if (getApys.length > 0) {
      
            const apyDate = new Date(lastApy.date)
        
            const day = apyDate.getDate();
            const month = apyDate.getMonth();
            const year = apyDate.getFullYear();
            const today = new Date();
            const todayDay = today.getDate();
            const todayMonth = today.getMonth();
            const todayYear = today.getFullYear();

            // if (day === todayDay && month === todayMonth && year === todayYear) {
            //     return res.status(400).json({ message: "Today apy already saved", apy , totalWorkingBalance: workingBalance});
            // }
        }
        
        if(apyAmount > 0){
        const adminPanel = await AdminPanel.create({ apy: apyAmount, date: new Date() });
        return res.status(200).json({ message: "Today apy saved", apy: adminPanel , totalWorkingBalance: workingBalance});
        }else{
            const adminPanel = await AdminPanel.create({ date: new Date() });
            return res.status(200).json({ message: "Today apy saved", apy: adminPanel , totalWorkingBalance: workingBalance});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const modifyTodayApy = async (req, res) => {
    console.log("trying to modify apy");
    try {
        const { newApy, apyId } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        const getApys = await AdminPanel.findById(apyId);
        if (!getApys) {
            return res.status(404).json({ message: "Apy not found" });
        }
        const modifyApy = await AdminPanel.findByIdAndUpdate(apyId, { apy: newApy });

        let workingBalance = 0;
        const getAllUsers = await User.find();
        getAllUsers.map(user => {
            workingBalance += user.workingBalance;
        });
        if (!modifyApy) {
            return res.status(500).json({ message: "Internal server error" });
        }
        const findApy = await AdminPanel.findById(apyId);
        return res.status(200).json({ message: "Apy modified successfully", apy: findApy , totalWorkingBalance: workingBalance});
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getTodayApy = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const today = new Date();
        const getApys = await AdminPanel.find();
        let lastApy = 0;
        getApys.map(apy => {
            if (apy.date < new Date()) {
                lastApy = apy
            }
        });

        let workingBalance = 0;

        const getAllUsers = await User.find();
        getAllUsers.map(user => {
            workingBalance += user.workingBalance;
       
        });

        if (getApys.length > 0) {
            const apyDate = new Date(lastApy.date)
            const day = apyDate.getDate();
            const month = apyDate.getMonth();
            const year = apyDate.getFullYear();
            const todayDay = today.getDate();
            const todayMonth = today.getMonth();
            const todayYear = today.getFullYear();
            if (day === todayDay && month === todayMonth && year === todayYear) {
                return res.status(200).json({ apy: lastApy, totalWorkingBalance: workingBalance});
            } else {
                return res.status(200).json({ apy: lastApy , totalWorkingBalance: workingBalance});
            }
        } else {
            return res.status(200).json({ apy: lastApy , totalWorkingBalance: workingBalance});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getApyHistory = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const apyHistory = await AdminPanel.find();
        if (!apyHistory) {
            return res.status(400).json({ message: "Apy history not found" });
        } else {
            return res.status(200).json({ message: "Apy history found", apyHistory });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getData = async (req, res) => {

    try {
        const apyHistory = await AdminPanel.find();
        const getAllUsers = await User.find();
        let workingBalance = 0;
        getAllUsers.map(user => {
            workingBalance += user.workingBalance;
       
        });
        if (!apyHistory) {
            return res.status(400).json({ message: "Apy history not found" });
        } else {
            return res.status(200).json({ message: "Apy history found", apyHistory , totalWorkingBalance: workingBalance});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const payRewards = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let lastApy = 0;
        const getApys = await AdminPanel.find();
        getApys.map(apy => {
            if (apy.date < new Date()) {
                lastApy = apy
            }
        });

        let workingBalance = 0;
        let users = [];
        const getAllUsers = await User.find();
        getAllUsers.map(user => {
            workingBalance += user.workingBalance;
            users.push(user._id);
        });

        
        if (getApys.length > 0) {
            const apyDate = new Date(lastApy.date)
            const day = apyDate.getDate();
            const month = apyDate.getMonth();
            const year = apyDate.getFullYear();
            const today = new Date();
            const todayDay = today.getDate();
            const todayMonth = today.getMonth();
            const todayYear = today.getFullYear();
            if (day === todayDay && month === todayMonth && year === todayYear) {
                getAllUsers.map(async user => {
                    const reward = (user.workingBalance * lastApy.apy) / 100;
                    const newReward = await Reward.create({ user: user._id, amount: reward, date: new Date() });
                    const totalReward = user.totalProfits  + reward;
                    const newUser = await User.findByIdAndUpdate(user._id, 
                        { $inc: { workingBalance: reward }, 
                        totalProfits: totalReward,
                    }, { new: true });
                });
                const modifyApyTotalPayed = await AdminPanel.findByIdAndUpdate(lastApy._id, { 
                    totalPayed: workingBalance * lastApy.apy / 100, 
                    payed: true, 
                    TotalworkingBalance:  (workingBalance * lastApy.apy / 100) + workingBalance,
                    usersRewarded: users,
                }, { new: true });
                return res.status(200).json({ message: "Rewards payed", apy: modifyApyTotalPayed, totalWorkingBalance: workingBalance });
            } else {
                return res.status(400).json({ message: "Today apy not found" , totalWorkingBalance: workingBalance});
            }
        } else {
            return res.status(400).json({ message: "Today apy not found", totalWorkingBalance: workingBalance });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    saveTodayApy,
    modifyTodayApy,
    getTodayApy,
    getApyHistory,
    payRewards,
    getData
}



