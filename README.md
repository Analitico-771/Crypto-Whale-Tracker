1. This app fetches the transaction information of a crypto wallet from the blockchain and displays it on the screen as useful analytical data.  The user is able to save multiple wallets that he/she is tracking and also able to view multiple assets (currencies) held in the wallet.  Future capability will be for the user to create an account to save the wallets being tracked. User identity is protected since there's no KYC requirement and the user is not connecting or otherwise exposing his/her crypto assets on this site, and all that's required for the site to maintain the saved data is a user profile created with email and password.

    I used Etherscan API to fetch blockchain data and a price API to fetch the current price at the time of fetch.  I also used a .env.local file to protect addresses/api-keys/and node endpoints.

2. M.V.P
    *Provide the following:
    - Securely connect to API
    - Build out all pages with buttons
    - All buttons working and navigates to designated page
    - All API calls display the proper object layout

3. Color schemes 
- I used bootstrap cards
- The colors used are #007bff, #1d1d1d, and #95999c

* Title Crypto Whale Tracker (with link to live Demo TBD)

* Overview
This app is a DeFi DApp based on Smart Contract ERC20 Token standards and Ethereum Blockchain. The user can securely connect to the Ehterscan network and fetch data from a wallet he/she wishes to track for analytical purposes and maintain a saved list of wallets they wish to track on a consistent basis.

* Languages:  React, Redux, CSS, JS, HTML
    * Other: Ethereum, JSON, Postman, Web3, Babelrc, Solidity,
     
* Stretch Goals (Future)
    * Analytics result view for ERC20 API call

* Code Snippets

    The code below shows how the header is displayed based on the type of api call. If the user selects the ERC20 results then the header and the view are displayed accordingly.  The ERC20 displays the Symbol Name

        <div className="vertical">
            <div className="card bg-dark text-white">
                <div className="card-header">Blockchain Transactions for wallet address :<span>{<span> {'\u00A0'} {lastAddress}</span> }</span>
                  
                {showERC20 ? <HeaderERC20 /> : <Header />}
                    
                  
                </div>
                {/* begin mapping walletData Blockchain Txns */}
                <div className="card-body d-flex flex-column"> {walletData && walletData.map(walletData => {
                    return <>
                        <div className="d-flex flex-row blockchain-txns">
                          <div className="flex-fill p-2 blockchain-txns-hash">{`${walletData.hash}`}</div>
                          {showERC20 ? <div className="flex-fill p-2 blockchain-txns-symbol">{walletData.tokenSymbol && walletData.tokenSymbol}</div> : null}
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

    The below code shows the conversion for the date and value data received from the blockchain and then returned to the component for rendering.

        export const convertedDate = (date) => {
            date = (date * 1000);
            let convertedDate = new Date (date);
            return convertedDate.toString();
        }

        export const convertedValue = (value) => {
            let convertedValue = (value);
            if(convertedValue === undefined){
                convertedValue = 0;
            }
            else {
                convertedValue = convertedValue / 1000000000000000000;//this is the Wei value for ethereum
            }
            return convertedValue;
        }

* Screenshots Of The App
    * ![](/project_images/app_image1.jpg)
    * ![](/project_images/app_image2.jpg)

* Screenshots Testing The App
    * ![](/project_images/app_test1.jpg)
    * ![](/project_images/app_test2.jpg)

* Logo
    * ![](/src/components/logo.png)

* Developer Team
    * Jose Tollinchi
    * https://github.com/AnaIitico

* Resources
    * https://etherscan.io/apis
    * https://web3js.readthedocs.io/en/v1.3.4/
    * https://javascript.info/async
    * https://reactjs.org/
    * https://docs.soliditylang.org/en/v0.5.7/
    * https://eips.ethereum.org/EIPS/eip-20
    * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
    