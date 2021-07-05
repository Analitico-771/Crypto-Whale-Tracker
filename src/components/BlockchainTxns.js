
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import uuid from 'uuid';
import WalletAddressForm from './WalletAddressForm'
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
            BlockchainTxns.refresh()
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
          <div>
            <div className="content">
              <div className="vertical-split">
                <div className="card bg-dark text-white">
                  <div className="card-header">Welcome {`${user}`}</div>
                  <div className="card-body">
                    <WalletAddressForm />
                    <p>
                      Enter a valid Ethereum wallet. Each wallet you enter is saved below and you can add and delete them as you wish. You can then do other types of searches for the wallets saved.<br /><br />
                      The initial display is based on a wide search of the blockchain and up-to 1,000 results max.<br /><br />
                      Invalid entries will not be saved.
                    </p>
                  </div>
                </div>
                <div className="card bg-dark text-white">
                  <div className="card-header">Saved Whale Addresses</div>
                  <div className="card-body">
                  <div className="address-list"><br />
                      {/* begin mapping whale wallet address list */}
                      <p className="card-body address-list"> {address.map(addressObj => {
                    return <>
                      <p className="address-list">
                      {addressObj}<br />
                      {/* other api call buttons and delete button */}
                      <button className="address-buttons" onClick={()=>fetchWalletData(url1000, address)}>Txns</button>
                      <button className="address-buttons" onClick={()=>fetchWalletData(ERC20, address)}>ERC20</button>
                      <button className="address-buttons" onClick={()=>fetchWalletData(NFTS, address)}>NFTS</button>
                      <button className="address-delete">Del</button>
                      </p>
                      <br />
                      </>;
                    })} 
                  </p>

                      {/* end mapping whale wallet address list */}
                  </div>
                  </div>
                </div>
              </div>
              <div className="vertical">
                {/* <div className="card bg-dark text-white">
                  <div className="card-header">
                    Analytics
                  </div>
                  <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div> */}
                <div className="card bg-dark text-white">
                  <div className="card-header">Blockchain Txns</div>
                    {/* begin mapping walletData Blockchain Txns */}
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
                </div>
              </div>
              {/* <div className="vertical">
                <div className="card bg-dark text-white">
                  <div className="card-header">
                    Card Title 6
                  </div>
                  <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </>
    )
};

export default BlockchainTxns;
