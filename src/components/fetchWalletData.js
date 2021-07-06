
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import uuid from 'uuid';
// import WalletAddressForm from './WalletAddressForm'
import {apiKEY} from '../keys';
import {rpcURL} from '../keys';

import { submit } from '../actions/walletActions';

const Web3 = require('web3');
const web3 = new Web3(rpcURL);

let user = `Anonymous`;


const BlockchainTxns = () => {
    const [textValue, setTextValue] = useState('');
    const address = useSelector(state => state.wallet.address);
    const walletData = useSelector(state => state.wallet.walletData);
    // console.log('This is walletData')
    // console.log(walletData)
    const dispatch = useDispatch();

    console.log(address)//Don't forget to delete

    const url1000 = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=des&apikey=${apiKEY}`;
    const ERC20 = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=des&apikey=${apiKEY}`;
    const NFTS = `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=999999999&page=1&offset=1000&sort=des&apikey=${apiKEY}`;
 
    let fetchWalletData = async (input, fetchAddress) => {
        try {
            const response = await fetch(input); //api call for symbol information
            const walletData = await response.json();
            if(walletData.message !== 'OK'){
            
            alert(`${walletData.message} for address ${address}.  Please try again!`)
            }
            else {
            console.log(walletData); //console.log api object
            dispatch(submit(address, walletData));
            }
        }
        catch(err) {
            alert(err);
        }
    }
    // for testing only - getting the actual date from a timestamp
    let convertDate = (blockNumber) => {
        let blockInfo = web3.eth.getBlock(blockNumber, async (error, block) => {
            let timestamp = await block.timestamp;
            let date = (timestamp * 1000);
            date = new Date (date);
            console.log(`Date ${date}`)
            return <>
                {date}
            </>
            // console.log(`Timestamp ${timestamp}`)
        })
    }

    return (
        <>
          <div className="card-body d-flex flex-column"> {walletData.map(walletData => {
            return <>
              <div className="d-flex flex-row blockchain-txns">
                <div className="flex-fill p-2">{`${walletData.hash}...`}</div>
                  <div className="flex-fill p-2">{`${walletData.blockNumber}...`}</div>
                  {/* <div className="flex-fill p-2">{walletData.timeStamp === walletData.timeStamp ? (<>{walletData.timeStamp}</>) : null}</div> */}

                  <div className="flex-fill p-2"> date   </div>
                  {/* code for the web3 query */}
                  <div className="flex-fill p-2">{`${walletData.from}...`}</div>
                  <div className="flex-fill p-2">{`${walletData.to}...`}</div>
                  <div className="flex-fill p-2">{`${walletData.value}...`}</div>
              </div>
                  </>;
            })}
              {/* end mapping walletData Blockchain Txns */}
          </div>
        </>
    )
};

export default BlockchainTxns;
