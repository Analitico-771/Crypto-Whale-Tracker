
export const convertedDate = (date) => {
    // console.log(date)
    date = (date * 1000);
    let convertedDate = new Date (date);
    // console.log(convertedDate);
    return convertedDate.toString();
}

export const convertedValue = (value) => {
    // console.log(value)
    let convertedValue = (value);
    if(convertedValue === undefined){
        convertedValue = 0;
    }
    // console.log(convertedDate);
    return convertedValue;
}

export const welcomeText = 
    <p>
        Enter a valid Ethereum wallet. Each wallet you enter is saved below and you can add and delete them as you wish. You can then do other types of searches for the wallets saved.<br /><br />
        The initial display is based on a wide search of the blockchain and up-to 100 results max.<br /><br />
        Invalid or double entries will not be saved.
    </p>


  
