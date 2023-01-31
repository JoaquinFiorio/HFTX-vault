const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
    wallet: {
      type: String,
      require: true,
      unique: true,
  
    },
    verifyMessage: {
      type: String,      
    },
    role:{
      type: String,
      Enum: ["user", "admin", "banned"],
      default: "user",
    },
    workingBalance:{
      type: Number,
      default: 0,
    },
    totalProfits:{
      type: Number,
      default: 0,
    },
    referenceUsers:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    refence : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  }
);
    
module.exports = mongoose.model("User", UserScheme);
