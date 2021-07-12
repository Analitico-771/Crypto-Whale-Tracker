
import React from 'react';

function HeaderERC20() {
  const headerERC20 = 
  <div className="d-flex flex-row blockchain-txns-header">
  <div className="flex-fill p-2 blockchain-txns-header-hash">Hash</div>
  <div className="flex-fill p-2 blockchain-txns-header-symbol">Symbol</div>
  <div className="flex-fill p-2 blockchain-txns-header-blocknumber">Block Number</div>
  <div className="flex-fill p-2 blockchain-txns-header-timestamp" blockchain-txns-header>Time Stamp</div>
  <div className="flex-fill p-2 blockchain-txns-header-from" >From</div>
  <div className="flex-fill p-2 blockchain-txns-header-to">To</div>
  <div className="flex-fill p-2 blockchain-txns-header-value">Symbol Value</div>
</div>

  return <>
    {headerERC20}
  </>

}

export default HeaderERC20