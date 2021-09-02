
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
            if(state.address.includes(action.data.address)){
                return {
                    ...state,
                    lastAddress: action.data.address,
                    walletData: action.data.data.result,
                }
            }
            else{
                return {
                    ...state, 
                    walletData: action.data.data.result,
                    lastAddress: action.data.address,
                    address: [...state.address, action.data.address]
                    }
            }

        case REMOVE:
            let arrayCopy = [...state.address];
            // console.log(action)
            let newArray = arrayCopy.filter(address => address !== action.address)
            // console.log(newArray)
            if(action.address === state.lastAddress){
                return {
                    ...state,
                    address: newArray,
                    walletData: [],
                    lastAddress: ""
                }
            }
            else{
                return {
                    ...state,
                    address: newArray,
                }
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