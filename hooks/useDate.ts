export const UseDateFormat = (dateData:Date) => {
    let date = new Date(dateData);
    return date.toLocaleDateString("en-US");
}

export const UseDateInput = (dateData:Date) => {
    let date = new Date(dateData);
    if(dateData===null){
        date=new Date()
    }
    let year = date.toLocaleString("en-US", { year: "numeric" });
    let month = date.toLocaleString("en-US", { month: "2-digit" });
    let day = date.toLocaleString("en-US", { day: "2-digit" });
    return year + "-" + month + "-" + day;
}