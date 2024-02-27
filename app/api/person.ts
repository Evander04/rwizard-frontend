export async function findAllPerson() {
    try {        
        const url = `${process.env.HOST}${process.env.CONTROLLER_PERSON}/findAll`;

        const params = {
            method:"GET",
            headers:{
                "Content-Type":"application/json",            
                "Authorization":`${process.env.AUTH_TOKEN}`,
            },            
        };

        const response = await fetch(url, params);
        const results = await response.json();
        return results;

    } catch (error) {
        console.log("login error=>"+error);        
        return null
    }
}

export async function findPerson(body:object) {
    try {        
        const url = `${process.env.HOST}${process.env.CONTROLLER_PERSON}/find`;

        const params = {
            method:"POST",            
            headers:{
                "Content-Type":"application/json",
                "Authorization":`${process.env.AUTH_TOKEN}`,
            },          
            body:JSON.stringify(body)  
        };

        const response = await fetch(url, params);
        const results = await response.json();
        return results;

    } catch (error) {
        console.log("login error=>",error);    
        return undefined;
    }
}