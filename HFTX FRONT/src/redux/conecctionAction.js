import TronWeb from 'tronweb';
import contractAbi from '../ABIS/contractAbi.json';

const connectionLoading = () => {
    return {
        type: 'CONNECTION_LOADING',
    };
}

const connectionSuccess = (payload) => {
    return {
        type: 'CONNECTION_SUCCESS',
        payload,
    };
}

const connectionError = (payload) => {
    return {
        type: 'CONNECTION_ERROR',
        payload,
    };
}

const connectionReset = () => {
    return {
        type: 'CONNECTION_RESET',
    };
}

const resetError = () => {
    return {
        type: 'RESET_ERROR',
    };
}

export const connectWallet = () => {
    return async (dispatch) => {
        dispatch(connectionLoading());
        try {
            // const HttpProvider = TronWeb.providers.HttpProvider;
            // const fullNode = new HttpProvider("https://nile.trongrid.io");
            // const solidityNode = new HttpProvider("https://nile.trongrid.io");
            // const eventServer = new HttpProvider("https://nile.trongrid.io");

            // const res = await window.tronLink.request({ method: 'tron_requestAccounts' });

            // console.log(res);

            // const tronWeb = new TronWeb(
            //     fullNode,
            //     solidityNode,
            //     eventServer,
            // );
 
            // const isConnected = await tronWeb.isConnected();
            // console.log(tronWeb);
            // if (isConnected) {
            //     const address = await tronWeb.defaultAddress.base58;
            //     console.log(address);
            //     let usdtAddress = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'
            //     let contractAddress = 'TBrP1UH8QggrHNPb6mMRZPsH9RhiiHVV3m'
            //     let USDT_CONTRACT = await tronWeb.contract().at(usdtAddress);
            //     let APP_CONTRACT = await tronWeb.contract().at(contractAddress);
            //     let balance = await USDT_CONTRACT.balanceOf(address).call();

            //     let balanceInUsdt = await tronWeb.fromSun(balance);

            //     dispatch(connectionSuccess({wallet: address, totalbalance : balanceInUsdt, USDT_CONTRACT, APP_CONTRACT, usdtAddress, contractAddress}));
            // }
            // console.log(tronWeb);

            // const wallet = await tronWeb.defaultAddress.base58;
            // let usdtAddress = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'
            // let USDT_CONTRACT = await tronWeb.contract().at(usdtAddress);
            // let contractAddress = 'TBrP1UH8QggrHNPb6mMRZPsH9RhiiHVV3m'
            // let APP_CONTRACT = await tronWeb.contract().at(contractAddress);
            // let totalbalance = await USDT_CONTRACT.balanceOf(wallet).call();
            // let totalBalanceToNumber = await tronWeb.fromSun(totalbalance);

            await tronLink.request({
                method: 'tron_requestAccounts',
            })
            // const HttpProvider = Tronweb.providers.HttpProvider;
            // const fullNode = new HttpProvider("https://nile.trongrid.io");
            // const solidityNode = new HttpProvider("https://nile.trongrid.io");
            // const eventServer = new HttpProvider("https://nile.trongrid.io");

            let trweb = await window.tronWeb;
           
            if (trweb && trweb.ready) {
                let wallet = await trweb.defaultAddress.base58;
        
                //get chain id

                let usdtAddress = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'
                //let contractAddress = 'TDUmabSdG42wWnnSEoxXJntuic4BqWnFwn'
                let contractAddress = 'TSzGncYFK6e5gBcA1Qk7wy4nBa5yf4TfXS'

                let USDT_CONTRACT = await trweb.contract().at(usdtAddress);
                let totalbalance = await USDT_CONTRACT.balanceOf(wallet).call();
                let totalBalanceToNumber = await trweb.fromSun(totalbalance);
                let APP_CONTRACT = await trweb.contract(contractAbi, contractAddress);
                 dispatch(connectionSuccess({ wallet, totalbalance:totalBalanceToNumber , USDT_CONTRACT , APP_CONTRACT, usdtAddress, contractAddress }));  

            } else {
                dispatch(connectionError({ error: "TronWeb not installed" }));
            }
        } catch (error) {
            console.log('error', error)
            dispatch(connectionError({ errorMessages: "connect to TronGrid Mainnet" }));
        }
    };
}

export const fetchErrorReset = () => {
    return async (dispatch) => {
        dispatch(resetError());
    };
}

export const logout = () => {
    return async (dispatch) => {
        dispatch(connectionReset());
        localStorage.removeItem('verification-token');
    };
}