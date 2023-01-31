const initialState = {
    isConnected: false,
    wallet : null,
    totalbalance : 0,
    USDT_CONTRACT : null,
    APP_CONTRACT : null,
    loading : false,
    error : false,
    errorMessages : null,
    usdtAddress: null,
    contractAddress: null
}

const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CONNECTION_LOADING':
            return {
                ...state,
                loading: true,

            };
        case 'CONNECTION_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                errorMessages : null,
                isConnected: true,
                wallet : action.payload.wallet,
                totalbalance : action.payload.totalbalance,
                USDT_CONTRACT : action.payload.USDT_CONTRACT,
                APP_CONTRACT : action.payload.APP_CONTRACT,
                usdtAddress: action.payload.usdtAddress,
                contractAddress: action.payload.contractAddress
            };
        case 'CONNECTION_ERROR':
            return {
                ...state,
                loading: false,
                error: true,
                errorMessages : action.payload.errorMessages,
            };
        case 'CONNECTION_RESET':
            return initialState;
        case 'RESET_ERROR':
            return {
                ...state,
                error: false,
                errorMessages : null,
            };
        default:
            return state;
    }
}

export default connectionReducer;
