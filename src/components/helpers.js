
export const convertedDate = (date) => {
    // console.log(date)
    date = (date * 1000);
    let convertedDate = new Date (date);
    // console.log(convertedDate);
    return convertedDate.toString();
}

export const convertedValue = (value) => {
    console.log(value)
    let convertedValue = (value);
    // console.log(convertedDate);
    return convertedValue;
}