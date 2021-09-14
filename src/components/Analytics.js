
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
// import {convertedDate} from './helpers';
// import {convertedValue} from './helpers';


const Analytics = () => {
    //global state variable
    // eslint-disable-next-line
    const address = useSelector(state => state.wallet.address);
    // eslint-disable-next-line
    const lastAddress = useSelector(state => state.wallet.lastAddress);
    // eslint-disable-next-line
    const walletData = useSelector(state => state.wallet.walletData);

    //local state
    // eslint-disable-next-line no-unused-vars
    const [showERC20, setshowERC20] = useState(false);

    //receive dispatch function
    // eslint-disable-next-line
    const dispatch = useDispatch();

    //componentDidMount (executes once) without dependency array }, []);
    useEffect(() => {

    //*componentDidUnmount - clean up function
    //   return () => {
    //     effect
    //   };
    }, []);

  return <>

    <h1>Analytics Page</h1>
    
  </>;
};

export default Analytics;