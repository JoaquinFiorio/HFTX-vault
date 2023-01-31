const mongoose = require("mongoose");

const RewardedScheme = new mongoose.Schema(
    {
        user: {
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
    }
);

module.exports = mongoose.model("RewardedHistory", RewardedScheme);
