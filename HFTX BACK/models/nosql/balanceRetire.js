const mongoose = require("mongoose");

const BalanceRetireScheme = new mongoose.Schema(
    {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        amount: {
            type: Number,
            require: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        state : {
            type: String,
            enum : ['pending','approved','paid','rejected'],
            default: 'pending',
        },
        approvedDate: {
            type: Date,
        },
        approvedBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        paidDate: {
            type: Date,
        },
        paidBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        paidTx:{
            type: String,
        },
        rejectedDate: {
            type: Date,
        },
        rejectedBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }
);

module.exports = mongoose.model("BalanceRetire", BalanceRetireScheme);