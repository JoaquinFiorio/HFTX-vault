import axiosApi from "../config/axios";

const appDataLoading = () => ({
    type: 'APPDATA_LOADING',
});


const appDataSuccess = (payload) => ({
    type: 'APPDATA_LOAD_SUCCESS',
    payload,
});

const appDataFailure = (error) => ({
    type: 'APPDATA_LOAD_FAILURE',
    payload: {
        error,
    },
});


export const appDataReset = () => ({
    type: 'APPDATA_RESET',
});


export const loadAppData = () => {
    return async (dispatch) => {
     
        dispatch(appDataLoading());
        try {
            const response = await axiosApi.get('/reward/getData');
            const { apyHistory, totalWorkingBalance } = response.data;
          
            dispatch(appDataSuccess({ apyHistory, totalWorkingBalance: totalWorkingBalance.toFixed(2) }));
        } catch (error) {
            console.log('error', error);
            dispatch(appDataFailure(error));
        }
    };
};
