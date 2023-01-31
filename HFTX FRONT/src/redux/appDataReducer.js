const InitialState = {
    totalWorkingBalance: 0,
    apyHistory: [],  
    apyHistoryLoaded: false, 
}

export const appDataReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'APPDATA_LOADING':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'APPDATA_LOAD_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                apyHistoryLoaded: true,
                apyHistory: action.payload.apyHistory,
                totalWorkingBalance: action.payload.totalWorkingBalance,
            }
        case 'APPDATA_LOAD_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                apyHistoryLoaded: false
            }
        case 'APPDATA_RESET':
            return InitialState
        
        default:
            return state
    }
}

export default appDataReducer