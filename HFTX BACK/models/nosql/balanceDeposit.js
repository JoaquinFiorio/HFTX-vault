const mongoose = require("mongoose");

const BalanceDepositScheme = new mongoose.Schema(
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
        block: {
            type: Number,
            require: true,
            unique: true,
        },
        transaction: {
            type: String,
            require: true,
            unique: true
        },
        status: {
            type: String,
            default: "pending",
            Enum: ["pending", "approved", "Rejected"],
        },
        aprovedDate: {
            type: Date,
        },
        aprovedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        rejectedDate: {
            type: Date,
        },
        rejectedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        paidDate: {
            type: Date,
        }
    }
);

module.exports = mongoose.model("BalanceDeposit", BalanceDepositScheme);
