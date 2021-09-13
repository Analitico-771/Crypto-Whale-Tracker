
import React from "react";

// import fs from 'fs';

// export const findLogo = (symbol) => {
        
//         let file = `./images/${symbol}.png`;
//         if(fs.existsSync(file)){
//                 console.log(`file present`);
//                 // logo = removeLastCharacter(file);
//                 // console.log(logo);
//                 // return logo
//                 file = `images/${symbol}.png`;
//                 return file
                
//         };
// };

export const convertedDate = (date) => {
    // console.log(date)
    date = (date * 1000);
    // let convertedDate = new Date(date);
    let convertedDate = new Date(date).toLocaleString().split(',')[0];
    // let convertedDate = new Date(date).toUTCString();
    // console.log(convertedDate);
    return convertedDate;
}

export const convertedValue = (value) => {
    // console.log(value)
    let convertedValue = (value);
    if(convertedValue === undefined){
        convertedValue = 0;
    }
    else {
        convertedValue = convertedValue / 1000000000000000000;
    }
    return convertedValue;
}

export const welcomeText = 
    <p>
        Enter a valid Ethereum wallet. Each wallet you enter is saved below and you can add and delete them as you wish. You can then do other types of searches for the wallets saved.<br /><br />
        The initial display is based on a wide search of the blockchain and up-to 1000 results max.<br /><br />
        Invalid or double entries will not be saved.
    </p>


    


  
