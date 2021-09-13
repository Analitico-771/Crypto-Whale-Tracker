
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from "react-bootstrap";
import '../App.css';
import { submit } from '../actions/walletActions';
import { remove } from '../actions/walletActions';
import Header from './Header';
import HeaderERC20 from './HeaderERC20';
import Analytics from './Analytics'
// import Transactions from './Transactions'
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
                console.log(walletData.result);
                // if(input === "ERC20") console.log(walletData.result);
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

    const findLogo = (symbol) => {
      symbol = symbol.toLowerCase();
      // if(!require(`./assets/images/${symbol}.png`).default) {
      //   //sdfdsf
      // }
      try{
        let file = require(`./assets/images/${symbol}.png`).default;
        if(!file) {
        console.log(`file not present`);
        file = require(`./assets/images/ghostbusters.png`).default;
        return file
      }
      else {
        console.log(`file present`);
        return file;
      };
      }catch(err) {
        return require(`./assets/images/ghostbusters.png`).default;
      }
      
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
                      <div className="card-body"> {address && address.map((addressNumber, index) => {
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


                    <Container className="card-header">Data for wallet address :<span> {<span> {'\u00A0'} {lastAddress}</span> } </span> 
                    { showAnalytics ? null : (showERC20 ? <HeaderERC20 /> : <Header />) }
                    </Container>
                    {/* begin mapping walletData Blockchain Txns */}
                    { showAnalytics ? <Analytics /> : null}
                    <Container className="card-body"> {walletData && walletData.map(walletData => {
                        return <>
                            <Row className="blockchain-txns">
                              <Col className="blockchain-txns-hash">{`${walletData.hash}`}</Col>
                              {/* {showERC20 ? <div className="flex-fill p-2 blockchain-txns-symbol" > {walletData.tokenSymbol && walletData.tokenSymbol} </div> : null} */}
                              {showERC20 && walletData.tokenSymbol ? <Col className=" blockchain-txns-symbol" > <img className="logo" src={findLogo(walletData.tokenSymbol)} alt="" /> {walletData.tokenSymbol && walletData.tokenSymbol} </Col> : null}
                              {/* {showERC20  && walletData.tokenSymbol ? <div className="flex-fill p-2 blockchain-txns-symbol" > {findLogo(walletData.tokenSymbol)} </div> : null} */}
                              {/* {walletData.tokenSymbol && walletData.tokenSymbol} */}
                              {/* {findLogo(walletData.tokenSymbol)} */}
                              {/* require(`../images/bat.png`) */}
                              <Col className="blockchain-txns-blocknumber">{`${walletData.blockNumber}`}</Col>
                              <Col className="blockchain-txns-timestamp">{convertedDate(walletData.timeStamp)}</Col>
                              <Col className="blockchain-txns-from">{`${walletData.from}`}</Col>
                              <Col className="blockchain-txns-to">{`${walletData.to}`}</Col>
                              <Col className="blockchain-txns-value">{`${convertedValue(walletData.value)}`}</Col>
                            </Row>
                          </>;
                        })}
                        {/* end mapping walletData Blockchain Txns */}
                    </Container>
                </div>
              </div>
            </div>
          </div>
        </>
    )
};

export default BlockchainTxns;
