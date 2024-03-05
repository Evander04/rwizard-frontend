export const UseDateFormat = (dateData:Date) => {
    let date = new Date(dateData);
    return date.toLocaleDateString("en-US");
}