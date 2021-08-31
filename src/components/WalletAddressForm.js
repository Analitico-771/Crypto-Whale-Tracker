
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { submit } from '../actions/walletActions';
import { keys } from "../keys";
import uuid from 'uuid';
import './walletAddressForm.css';

// const apiKEY = process.env.REACT_APP_API_KEY;
const apiKEY = keys.apiKEY;

console.log(apiKEY);

const WalletAddressForm = () => {
  const [textValue, setTextValue] = useState('');
  // const [isValid, setIsValid] = useState(false);
  // const [selectValue, setSelectValue] = useState('Select Token')
  const address = useSelector(state => state.wallet.address);
  const dispatch = useDispatch(address);

  const handleForm = (e) => {
    e.preventDefault()
    const url100 = `https://api.etherscan.io/api?module=account&action=txlist&address=${textValue}&startblock=0&endblock=99999999&page=1&offset=1000&sort=desc&apikey=${apiKEY}`;

    let getWalletData = async () => {
      try {
        const response = await fetch(url100); //api call for symbol information
        const walletData = await response.json();
        if(walletData.message !== 'OK'){
          alert(`${walletData.message} for address ${textValue}.  Please try another address`);
          setTextValue("");
        }
        else {
          // const uuID = {...state, id: uuid() };
          dispatch(submit(textValue, walletData));
          setTextValue("");
        }
      }
      catch(err) {
        alert(`Failed to fetch data. Please try again. ${err}`);
      }
    }
    getWalletData();
  }

  return <>
    <div className="form-group fg--search">
      <form onSubmit={handleForm}>
        <input className="input" onSubmit={handleForm} type="text" value={textValue} placeholder="type an address" onChange={(e)=>setTextValue(e.target.value)} />
        <button type="submit"><i className="fa fa-search"></i></button>
      </form>
    </div>
  </>;
};

export default WalletAddressForm;