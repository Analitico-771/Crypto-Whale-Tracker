
//import React from 'react';
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import WalletAddressForm from './components/WalletAddressForm'
import {apiKEY} from './keys';

import { submit } from './actions/walletActions';

let user = `Anonymous`;

function App() {
  const [textValue, setTextValue] = useState('');
  const address = useSelector(state => state.wallet.address);
  const dispatch = useDispatch();
  console.log(address)
  // console.log(apiKEY)
  const url1000 = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=des&apikey=${apiKEY}`;
  const ERC20 = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=des&apikey=${apiKEY}`;
  const NFTS = `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=999999999&page=1&offset=1000&sort=des&apikey=${apiKEY}`;
 
  async function getWalletData(input, address) {
    
      try {
        const response = await fetch(input); //api call for symbol information
        const walletData = await response.json();
        if(walletData.message !== 'OK'){
          
          alert(`${walletData.message} for address ${address}.  Please try again!`)
        }
        else{
          console.log(walletData); //console.log api object
          // dispatch(submit(textValue, walletData));
        }
      }
      catch(err) {
        alert(err);
      }
  }

  return (
    <>
      <div>
        <div className="content">
          <div className="vertical-split">
            <div className="card bg-dark text-white">
              <div className="card-header">
                Welcome {`${user}`}
              </div>
              <div className="card-body">
                <WalletAddressForm />
                <p>
                  Enter a valid Ethereum wallet. Each wallet you enter is saved to the right and you can add and delete them as you wish. You can then do other types of searches for the wallets saved.<br /><br />
                  The initial display is based on a wide search of the blockchain and up-to 1,000 results max.<br /><br />
                  Invalid entries will not be saved.
                </p>
              </div>
              
            </div>
            <div className="card bg-dark text-white">
              <div className="card-header">
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div className="vertical">
            <div className="card bg-dark text-white">
              <div className="card-header">
              Saved Whale Addresses
              </div>
              <div className="card-body">
                <div className="address-list"><br />
                  {/* begin mapping whale wallet address list */}
                  <p className="address-list"> {address.map(addressObj => {
                    return <>
                      <p className="address-list">
                      {addressObj}<br />
                      {/* other api call buttons and delete button */}
                      <button className="address-buttons" onClick={()=>getWalletData(url1000, address)}>Txns</button>
                      <button className="address-buttons" onClick={()=>getWalletData(ERC20, address)}>ERC20</button>
                      <button className="address-buttons" onClick={()=>getWalletData(NFTS, address)}>NFTS</button>
                      <button className="address-delete">Del</button>
                      </p>
                      <br />
                      </>;
                    })} 
                  </p>
                  {/* end mapping whale wallet address list */}
                </div>
                <br />
              </div>
            </div>
          </div>
          <div className="vertical-split">
            <div className="card bg-dark text-white">
              <div className="card-header">
                Analytics
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            <div className="card bg-dark text-white">
              <div className="card-header">
                BlockChain Txns
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div className="vertical">
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title 6
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App


