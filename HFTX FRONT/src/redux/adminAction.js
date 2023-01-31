import axiosApi from "../config/axios";

const adminLoading = () => {
    return {
        type: "ADMIN_LOADING"
    };
};

const adminLoadSuccess = (payload) => {
    return {
        type: "ADMIN_LOAD_SUCCESS",
        payload
    };
};

const adminLoadFailure = error => {
    return {
        type: "ADMIN_LOAD_FAILURE",
        payload: {
            error
        }
    };
};

export const adminReset = () => {
    return {
        type: "ADMIN_RESET"
    };
};

const getApySuccess = (payload) => {
    return {
        type: "GET_APY_SUCCESS",
        payload
    };
};

export const loadAdminData = () => {
    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.get("/deposit/",
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );


            const { pendingDeposits, approvedDeposits, pendingBalanceRetire, approvedBalanceRetire, paidBalanceRetire } = response.data;

            dispatch(adminLoadSuccess({ pendingDeposits, approvedDeposits, pendingWithdrawal: pendingBalanceRetire, approvedWithdrawal: approvedBalanceRetire, paidWithdrawal: paidBalanceRetire }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
        }
    };
}

export const approveDeposit = (id) => {

    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.put("/deposit/" + id, {},
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );


            const { pendingDeposits, approvedDeposits } = response.data;
            dispatch(adminLoadSuccess({ pendingDeposits, approvedDeposits }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
        }
    };
}

export const rejectDeposit = (id) => {

    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.delete("/deposit/" + id,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );


            const { pendingDeposits, approvedDeposits } = response.data;
            dispatch(adminLoadSuccess({ pendingDeposits, approvedDeposits }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
        }
    };
}

export const approveOneWithdrawal = (id) => {

    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.put("/retire/" + id, {},
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );


            const { pendingBalanceRetire, approvedBalanceRetire, paidBalanceRetire } = response.data;
            dispatch(adminLoadSuccess({ pendingWithdrawal: pendingBalanceRetire, approvedWithdrawal: approvedBalanceRetire, paidWithdrawal: paidBalanceRetire }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
        }
    };
}

export const approveCheckedWithdrawal = (deposits) => {
    
    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.put("/deposit/batch/approved", {deposits},
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );


            const { pendingDeposits, approvedDeposits, pendingBalanceRetire, approvedBalanceRetire, paidBalanceRetire } = response.data;
            dispatch(adminLoadSuccess({ pendingWithdrawal: pendingBalanceRetire, approvedWithdrawal: approvedBalanceRetire, paidWithdrawal: paidBalanceRetire, pendingDeposits, approvedDeposits }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
        }
    };
}

export const changeDepositToPaid = (id) => {
    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.put("/deposit/paid/" + id, {},
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            const { pendingDeposits, approvedDeposits, pendingBalanceRetire, approvedBalanceRetire, paidBalanceRetire } = response.data;
            dispatch(adminLoadSuccess({ pendingWithdrawal: pendingBalanceRetire, approvedWithdrawal: approvedBalanceRetire, paidWithdrawal: paidBalanceRetire, pendingDeposits, approvedDeposits }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
            console.log(error);
        }
    };
}

export const changeBatchDepositToPaid = (deposits) => {
    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.put("/deposit/batch/paid", { deposits },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            const { pendingDeposits, approvedDeposits, pendingBalanceRetire, approvedBalanceRetire, paidBalanceRetire } = response.data;
            dispatch(adminLoadSuccess({ pendingWithdrawal: pendingBalanceRetire, approvedWithdrawal: approvedBalanceRetire, paidWithdrawal: paidBalanceRetire, pendingDeposits, approvedDeposits }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
            console.log(error);
        }
    };
}




export const saveApy = (apyAmount) => {

    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.post("/reward/saveTodayApy", { apyAmount },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );


            const { apy, totalWorkingBalance } = response.data;
            dispatch(getApySuccess({ apy, totalWorkingBalance: totalWorkingBalance.toFixed(2) }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
            console.log('error', error)
        }
    };
}

export const getApy = () => {
    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.get("/reward/getTodayApy",
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );


            const { apy, totalWorkingBalance } = response.data;
         

            dispatch(getApySuccess({ apy, totalWorkingBalance: totalWorkingBalance.toFixed(2) }));

        } catch (error) {
            dispatch(adminLoadFailure(error));
        }
    };
}

export const modifyApy = (newApy, apyId) => {

    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.put("/reward/modifyTodayApy", { newApy, apyId },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );


            const { apy, totalWorkingBalance } = response.data;
            dispatch(getApySuccess({ apy, totalWorkingBalance: totalWorkingBalance.toFixed(2) }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
        }
    };
}

export const payTodayReward = () => {
    return async dispatch => {
        dispatch(adminLoading());
        try {
            const token = localStorage.getItem("verification-token");
            const response = await axiosApi.get("/reward/payRewards", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const { apy, totalWorkingBalance } = response.data;
            dispatch(getApySuccess({ apy, totalWorkingBalance: totalWorkingBalance.toFixed(2) }));
        } catch (error) {
            dispatch(adminLoadFailure(error));
        }
    };
}

