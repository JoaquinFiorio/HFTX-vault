require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const {getContractEvents} = require("./blockchain/config");


const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 3001;

app.use("/", require("./routes"));


app.listen(port, () => {
  console.log(`SERVER_ON_PORT_${port}`);
});

dbConnect();
getContractEvents();
