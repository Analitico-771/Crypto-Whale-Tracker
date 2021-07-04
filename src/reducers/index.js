
import { combineReducers } from "redux";
import web3 from './walletReducer';

let rootReducer = combineReducers({

    wallet: web3

});

export default rootReducer;