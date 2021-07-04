
import {SUBMIT} from '../actions/types';
import {INCREMENT} from '../actions/types';
import {DECREMENT} from '../actions/types';

const web3 = (state, action) => {
    
    if(state == null){
        state = {
            counter: 0,
            address: [],
            walletData: []
        }
    }

    switch(action.type){

        case SUBMIT:
            return {
                ...state, 
                walletData: action.data.data.result,
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