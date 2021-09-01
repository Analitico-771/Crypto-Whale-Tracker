
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {increment} from '../actions/walletActions'
import {decrement} from '../actions/walletActions'


const Hooks = () => {
    //global state variable 
    const count = useSelector(state => state.wallet.counter);

    //local state 
    // eslint-disable-next-line no-unused-vars
    const [title, setTitle] = useState("Redux Template")

    //receive dispatch function 
    const dispatch = useDispatch();

    //componentDidMount (executes once)

    useEffect(() => {

    //*componentDidUnmount - clean up function
    //   return () => {
    //     effect
    //   };
    }, [])

  return <>

    <h1>{title}</h1>

    <h3>{count}</h3>
    <button onClick={()=>dispatch(decrement(1))}>- Global State -</button>
    <button onClick={()=>dispatch(increment(1))}>+ Global State +</button>
    
  </>;
};

export default Hooks;