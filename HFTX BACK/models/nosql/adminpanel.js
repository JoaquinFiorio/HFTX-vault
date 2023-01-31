const mongoose = require("mongoose");

const AdminPanelScheme = new mongoose.Schema(
    {
        apy : {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        },
        dayRewarded: {
            type: Number,
            require: true,
        },
        payed:{
            type: Boolean,
            default: false,
        },
        totalPayed:{
            type: Number,
            default: 0,
        }, 
        TotalworkingBalance:{
            type: Number,
            default: 0,
        },
        usersRewarded: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }]

    }
);

module.exports = mongoose.model("AdminPanel", AdminPanelScheme);