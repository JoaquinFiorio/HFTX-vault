const TronWeb = require('tronweb');
const deposit = require('../config/depositWithdraw');
const contractAbi = require('./contractAbi2.json');

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://nile.trongrid.io");
const solidityNode = new HttpProvider("https://nile.trongrid.io");
const eventServer = new HttpProvider("https://nile.trongrid.io");
const privateKey = "2f477a143c88ef2cd8bc5772e9c1bf98f655ca05a45f14520b489c8f623e9464";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

//const contractAddress = "TBrP1UH8QggrHNPb6mMRZPsH9RhiiHVV3m"
  //const contractAddress = "TR1EdSbHGy3fva8bcV1J9NL2GqyT51NsD6"

  //const contractAddress = "TDUmabSdG42wWnnSEoxXJntuic4BqWnFwn"

  const contractAddress = "TSzGncYFK6e5gBcA1Qk7wy4nBa5yf4TfXS"


  




const sendMessage =() => {
    const randomMessage = Math.random().toString(36).substring(7);
    return randomMessage;
}

const verifyMenssage = async({message, signedMessage, address}) => {
    try{
    const hexMessage = tronWeb.toHex(message);
 
    const verify = await tronWeb.trx.verifyMessage(hexMessage, signedMessage, address)
  
    return verify;
    }catch(err){ 
        console.log(err);
        return false;
    }
}

const getContractEvents = async() => {

    try{
        //get contract from abi
    let contract = await tronWeb.contract(contractAbi, contractAddress);
  
    // await every transaction in contract
    await contract.Deposit().watch((err, res) => {
        if (err) {
            console.log(err);

        } else {
  
            const {amount, user} = res.result;
            const block = res.block;
            const transaction = res.transaction;

            const userToHex = tronWeb.address.fromHex(user);
            const amountToNumber = amount / 10 ** 6;
            deposit(userToHex, amountToNumber, block, transaction);
        }
    });
    }catch(err){
        console.log("tron error",err);
    }
    
}





module.exports = {
    sendMessage,
    verifyMenssage,
    getContractEvents
}