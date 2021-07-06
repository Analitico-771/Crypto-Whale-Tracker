
import {SUBMIT} from '../actions/types';
import {REMOVE} from '../actions/types';
import {INCREMENT} from '../actions/types';
import {DECREMENT} from '../actions/types';

const web3 = (state, action) => {
    
    if(state == null){
        state = {
            counter: 0,
            address: [],
            lastAddress: "",
            walletData: []
        }
    }

    switch(action.type){

        case SUBMIT:

            // [].includes(searchCriteria)
            if(state.address.includes(action.data.address)){
                return {
                    ...state,
                    lastAddress: action.data.address,
                    walletData: action.data.data.result,
                } 
            }else{
                return {
                    ...state, 
                    walletData: action.data.data.result,
                    lastAddress: action.data.address,
                    address: [...state.address, action.data.address]
                    }
            }

        case REMOVE:
            return {
                ...state,
                address: [...state.address, action.data.address]
            }

        case INCREMENT:
            return {
                ...state, 
                counter: state.counter + action.data
            }

        case DECREMENT:
            return {
                ...state, 
                counter: state.counter - action.data
            }
            
        default:
            return state;
    }
}

export default web3;