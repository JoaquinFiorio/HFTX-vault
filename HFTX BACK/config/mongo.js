const mongoose = require("mongoose");

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(
    "mongodb://localhost:/HFTX",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("****SUCCESSFUL_CONNECTION****");
      } else {
        console.log("****CONNECTION_ERROR****");
      }
    }
  );
};

module.exports = dbConnect;
