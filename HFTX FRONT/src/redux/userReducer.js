const initialState = {
    user: null,
    userLoaded: false,
    loading: false,
    error: false,
    errorMessages: null,
    message: null,
    pendingDepositsUser: [],
    approvedDepositsUser: [],
    retireBalance: [],
    rewardedHistory: [],
    apyHistory: [],
    apyHistoryLoaded: false,
    latesApy: 0,
    totalWorkingBalance: 0,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'USER_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                errorMessages: null,
                userLoaded: true,
                user: action.payload.user,
            };
        case 'USER_ERROR':
            return {
                ...state,
                loading: false,
                error: true,
                errorMessages: action.payload.errorMessages,
            };
        case 'USERDEPOSITS':
            return {
                ...state,
                loading: false,
                error: null,
                errorMessages: null,
                pendingDepositsUser: action.payload.pendingDepositsUser,
                approvedDepositsUser: action.payload.approvedDepositsUser,
                retireBalance: action.payload.retireBalance,
                rewardedHistory: action.payload.rewardedHistory,
                latesApy: action.payload.latesApy,
                totalWorkingBalance: action.payload.totalWorkingBalance,
                
            };
        case 'APY_HISTORY':
       
            return {
                ...state,
                loading: false,
                error: null,
                errorMessages: null,
                apyHistory: action.payload.apyHistory,
                apyHistoryLoaded: true,
            };
        case 'CONNECTION_RESET':
            return initialState;
        case 'RESET_ERROR':
            return {
                ...state,
                error: false,
                errorMessages: null,
            };
        default:
            return state;
    }
};

export default userReducer;