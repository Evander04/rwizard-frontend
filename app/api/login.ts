export async function loginWS(formData:any) {
    try {        
        const url = `${process.env.HOST}${process.env.CONTROLLER_AUTH}/signin`;
        const params = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData)
        };

        const response = await fetch(url, params);
        const results = await response.json();
        return results;

    } catch (error) {
        console.log("login error=>"+error);        
        return null
    }
}