import axiosApi from "../config/axios";

const userLoading = () => ({
    type: 'USER_LOADING',
});

const userSuccess = (payload) => ({
    type: 'USER_SUCCESS',
    payload,
});

const userError = (payload) => ({
    type: 'USER_ERROR',
    payload,
});

const userReset = () => ({
    type: 'USER_RESET',
});

const resetError = () => ({
    type: 'RESET_ERROR',
});

const userDeposits = (payload) => ({
    type: 'USERDEPOSITS',
    payload,
});

const ApyHistory = (payload) => ({
    type: 'APY_HISTORY',
    payload,
});


export const fetchMessage = () => async (dispatch) => {
    dispatch(userLoading());
    try {

        let tronWeb = await window.tronWeb;
        if (tronWeb && tronWeb.ready) {
            const wallet = await tronWeb.defaultAddress.base58;
           
            const response = await axiosApi.get("/login/" + wallet);

            const hexMessage = tronWeb.toHex(response.data.message);
            const signedMessage = await tronWeb.trx.signMessage(hexMessage);
            // const verifiedMessage = await tronWeb.trx.verifyMessage(hexMessage, signedMessage);
            const responseMessage = await axiosApi.post("/login", { wallet, signedMessage });
            const { user, message, token } = responseMessage.data;

            dispatch(userSuccess({ user, message }));
            localStorage.setItem("verification-token", token);
        }
    } catch (error) {
        console.log('error', error)
        dispatch(userError({ errorMessages: error }));
    }
}

export const loginToken = () => async (dispatch) => {
    dispatch(userLoading());
    try {
        const token = localStorage.getItem("verification-token");
        const response = await axiosApi.get("/login/", {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const { user, message } = response.data;

        dispatch(userSuccess({ user, message }));
    } catch (error) {
        dispatch(userError({ errorMessages: error }));
        localStorage.removeItem("verification-token");
    }
}

export const logout = () => async (dispatch) => {
    dispatch(userReset());
    localStorage.removeItem("verification-token");
}

export const resetErrorUser = () => async (dispatch) => {
    dispatch(resetError());
}

export const fetchUserDeposits = () => async (dispatch) => {
    dispatch(userLoading());
    try {
        const token = localStorage.getItem("verification-token");
        const response = await axiosApi.get("/deposit/user", {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const { pendingDeposits, approvedDeposits, retireBalance, rewardedHistory, latesApy, workingBalance } = response.data;
  
        dispatch(userDeposits({ pendingDepositsUser: pendingDeposits, approvedDepositsUser: approvedDeposits, retireBalance, rewardedHistory, latesApy, totalWorkingBalance:workingBalance.toFixed(2) }));
    } catch (error) {
        dispatch(userError({ errorMessages: error }));
    }
}

export const buttonWithdraw = (amount) => async (dispatch) => {
    dispatch(userLoading());
    try {

        const token = localStorage.getItem("verification-token");
        const response = await axiosApi.post("/retire/", { amount }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const { pendingDeposits, approvedDeposits, retireBalance } = response.data;

        dispatch(userDeposits({ pendingDepositsUser: pendingDeposits, approvedDepositsUser: approvedDeposits, retireBalance }));
    } catch (error) {
        if (error.response.data.message) {
            dispatch(userError({ errorMessages: error.response.data.message }));
        } else {

            dispatch(userError({ errorMessages: error }));
        }
        console.log('error', error)
    }
}

export const getRewardHistory = () => {
    return async dispatch => {
        dispatch(userLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.get("/reward/getApyHistory",
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            const { apyHistory } = response.data;
         
            dispatch(ApyHistory({ apyHistory }));
        } catch (error) {
            dispatch(userError({ errorMessages: error }));
        }
    };
}
export const ErrorReset = () => async (dispatch) => {
    dispatch(resetError());
}



