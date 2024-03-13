export const UseRemoveChars = (inputValue:string) => {
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    return numericValue
};