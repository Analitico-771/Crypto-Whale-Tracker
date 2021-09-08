
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { submit } from '../actions/walletActions';
import { remove } from '../actions/walletActions';
import Header from './Header';
import HeaderERC20 from './HeaderERC20';
import Analytics from './Analytics'
import Transactions from './Transactions'
import WalletAddressForm from './WalletAddressForm'
import {convertedDate} from './helpers';
import {convertedValue} from './helpers';
import {welcomeText} from './helpers';
// import {findLogo} from './helpers'
// import {rpcURL} from '../keys';
// const Web3 = require('web3');
// const web3 = new Web3(rpcURL);

const user = `Anonymous`;

const BlockchainTxns = () => {
    const [showERC20, setshowERC20] = useState(false);
    const [showAnalytics, setAnalytics] = useState(false);
    const address = useSelector(state => state.wallet.address);
    const lastAddress = useSelector(state => state.wallet.lastAddress);
    const walletData = useSelector(state => state.wallet.walletData);
    const dispatch = useDispatch();

    useEffect(() => {
        //*componentDidUnmount - clean up function
        //   return () => {
        //     effect
        //   };
    },[showERC20]);//componenentDidMount

    const fetchWalletData = async (e, input) => {
        try {
            // console.log(e.target.className)
            // className="Address-Button 0"
            //Address-Button ${index} => ["Address-Button", "0"]
            const classArray = e.target.className.split(" ");
            // console.log(classArray[classArray.length - 1]);
            // 0
            const whaleAddressIndex = classArray[classArray.length - 1];
            const whaleAddress = address[whaleAddressIndex];
            let url="";
            switch(input){
                case "url1000":
                  url = `https://api.etherscan.io/api?module=account&action=txlist&address=${whaleAddress}&startblock=0&endblock=99999999&page=1&offset=1000&sort=desc&apikey=${process.env.REACT_APP_API_KEY}`;
                  setshowERC20(false);
                break;
                
                case "ERC20":
                  url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${whaleAddress}&startblock=0&endblock=99999999&page=1&offset=1000&sort=desc&apikey=${process.env.REACT_APP_API_KEY}`;
                  if(!showAnalytics) setshowERC20(true);
                break;

                case "NFTS":
                  url = `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${whaleAddress}&startblock=0&endblock=999999999&page=1&offset=100&sort=desc&apikey=${process.env.REACT_APP_API_KEY}`;
                  setshowERC20(false);
                break;

                default:
                  setshowERC20(false);
                break;
            };
            //Needs try{} catch{}
            try{
              const response = await fetch(url); //api call for symbol information
              const walletData = await response.json();
              if(walletData.message !== 'OK'){
                alert(`${walletData.message} for address ${whaleAddress}.  Please try again!`);
              }
              else {
                // header(input);
                // console.log(walletData.result.hash); //console.log api object
                // if(input === "ERC20") console.log(`line 78 `, walletData.result[0].tokenSymbol);
                // if(input === "ERC20") console.log(`line 78 `, walletData.result.hash);
                dispatch(submit(whaleAddress, walletData));
              };
            }catch(err){
              alert(`Error with fetching data. Please try again. ${err}`)
            };
            
        }
        catch(err) {
            alert(err);
        };
    };
    // for testing only - getting the actual date from a timestamp
    // let convertedDate = (blockNumber) => {
    //     let blockInfo = web3.eth.getBlock(blockNumber, async (error, block) => {
    //         let timestamp = await block.timestamp;
    //         let date = (timestamp * 1000);
    //         date = new Date (date);
    //         // console.log(`Date ${date}`)
    //         // return date;
    //     })
    // }

    const getRemoveWallet = (e, index) => {
        // console.log(e.target.className)
        // className="Address-Button 0"
        //Address-Button ${index} => ["Address-Button", "0"]
        const classArray = e.target.className.split(" ");
        // console.log(classArray[classArray.length - 1]);
        // 0
        const whaleAddressIndex = classArray[classArray.length - 1];
        const whaleAddress = address[whaleAddressIndex];
        // console.log(whaleAddress);
        dispatch(remove(whaleAddress));
    };
    
    // function importAll(r) {
      
    //   var images = [];
    //   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item)//.toString().toLowerCase()
    //   })
    //   return images;
    // }
    
    // const logos = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

    // console.log("logos ", logos[`eth.png`])

    // const findLogo = (symbol) => {
    //   let file = `${symbol.toLowerCase()}.png`;
      
    //   // console.log(file);
    //   console.log(`file present`);
    //   return <img className="logo" src={logos[`eth.png`]} alt="" />      
    //   // return <img className="logo" src={require(file)} alt="" />      
      
    // };

    const findLogo = (symbol) => {
      // console.log(walletData.result.tokenSymbol);
      // console.log(symbol);
      symbol = symbol.toLowerCase();
      let file = require(`./assets/images/${symbol}.png`).default;
      // console.log(file);
      if(!file){
        console.log(`file not present`);
      }
      else{
        console.log(`file present`);
        // return file;
        console.log(`break 1`);
        // file = require(file)?.default;
        // console.log(`break 2`);
        return file;
        // return require(file).default;
        // return <img className="logo" src={file} alt="" />
        // return <img className="logo" src={require(file)} alt="" />
      };
    };

    return (
        <>
          <div>
            <div className="content">
              <div className="vertical-split">
                <div className="card bg-dark text-white">
                  <div className="card-header">Welcome {`${user}`}</div>
                  <div className="card-body">
                    <WalletAddressForm />
                    { welcomeText }
                  </div>
                </div>  
                <div className="card bg-dark text-white">
                  <div className="card-header">Saved Whale Addresses</div>
                  <div className="card-body">
                  <div className="address-list"><br />
                      {/* begin mapping whale wallet address list */}
                      <div className="card-body address-list"> {address && address.map((addressNumber, index) => {
                        return <>
                          <div className="address-list">
                            <h6 >{addressNumber}</h6>
                            {/* other api call buttons and delete button */}
                            <button className={`address-buttons ${index}`} onClick={(e)=>fetchWalletData(e, "url1000")}>Txns</button>
                            <button className={`address-buttons ${index}`} onClick={(e)=>fetchWalletData(e, "ERC20")}>ERC20</button>
                            <button className={`address-buttons ${index}`} onClick={(e)=>fetchWalletData(e, "NFTS")}>NFTS</button>
                            <button className={`address-buttons ${index}`} onClick={(e)=>getRemoveWallet(e)}>Del</button>
                          </div>
                          <br />
                          </>;
                        })} 
                      </div>
                      {/* end mapping whale wallet address list */}
                  </div>
                  </div>
                </div>
              </div>
              <div className="vertical">
                <div className="card bg-dark text-white">

                {/* { showAnalytics ? <Analytics /> : <Transactions /> } */}


                    <div className="card-header">Data for wallet address :<span> {<span> {'\u00A0'} {lastAddress}</span> } </span> 
                    { showAnalytics ? null : (showERC20 ? <HeaderERC20 /> : <Header />) }
                    </div>
                    {/* begin mapping walletData Blockchain Txns */}
                    { showAnalytics ? <Analytics /> : null}
                    <div className="card-body d-flex flex-column"> {walletData && walletData.map(walletData => {
                        return <>
                            <div className="d-flex flex-row blockchain-txns">
                              <div className="flex-fill p-2 blockchain-txns-hash">{`${walletData.hash}`}</div>
                              {/* {showERC20 ? <div className="flex-fill p-2 blockchain-txns-symbol" >  {walletData.tokenSymbol && walletData.tokenSymbol} </div> : null} */}
                              {showERC20 && walletData.tokenSymbol ? <div className="flex-fill p-2 blockchain-txns-symbol" > <img className="logo" src={findLogo(walletData.tokenSymbol)} alt="" /> </div> : null}
                              {/* {showERC20  && walletData.tokenSymbol ? <div className="flex-fill p-2 blockchain-txns-symbol" > {findLogo(walletData.tokenSymbol)} </div> : null} */}
                              {/* {walletData.tokenSymbol && walletData.tokenSymbol} */}
                              {/* {findLogo(walletData.tokenSymbol)} */}
                              {/* require(`../images/bat.png`) */}
                              <div className="flex-fill p-2 blockchain-txns-blocknumber">{`${walletData.blockNumber}`}</div>
                              <div className="flex-fill p-2 blockchain-txns-timestamp">{convertedDate(walletData.timeStamp)}</div>
                              <div className="flex-fill p-2 blockchain-txns-from">{`${walletData.from}`}</div>
                              <div className="flex-fill p-2 blockchain-txns-to">{`${walletData.to}`}</div>
                              <div className="flex-fill p-2 blockchain-txns-value">{`${convertedValue(walletData.value)}`}</div>
                            </div>
                          </>;
                        })}
                        {/* end mapping walletData Blockchain Txns */}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
};

export default BlockchainTxns;
