const InitialState = {
    pendingDeposits: [],
    approvedDeposits: [],
    pendingWithdrawal: [],
    approvedWithdrawal: [],
    paidWithdrawal: [],
    loading: false,
    error: null,
    dataLoaded: false,
    apy : 0,
    totalWorkingBalance: 0,
}

export const adminReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ADMIN_LOADING':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'ADMIN_LOAD_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                dataLoaded: true,
                pendingDeposits: action.payload.pendingDeposits,
                approvedDeposits: action.payload.approvedDeposits,
                pendingWithdrawal: action.payload.pendingWithdrawal,
                approvedWithdrawal: action.payload.approvedWithdrawal,
                paidWithdrawal: action.payload.paidWithdrawal,
            }
        case 'ADMIN_LOAD_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                dataLoaded: false
            }
        case 'GET_APY_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                dataLoaded: true,
                apy: action.payload.apy,
                totalWorkingBalance: action.payload.totalWorkingBalance
            }
        case 'ADMIN_RESET':
            return InitialState
        
        default:
            return state
    }
}

export default adminReducer