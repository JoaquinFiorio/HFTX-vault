import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import adminReducer from "./adminReducer";
import appDataReducer from "./appDataReducer";
import connectionReducer from "./conecctionReducer";
import userReducer from "./userReducer";



const rootReducer = combineReducers({
    blockchain: connectionReducer,
    user: userReducer, 
    admin: adminReducer,
    data: appDataReducer
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers);
}

const store = configureStore();

export default store;