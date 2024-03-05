export async function findAllPerson(auth:any) {
    try {        
        const url = `${process.env.HOST}${process.env.CONTROLLER_PERSON}/findAll`;

        const params = {
            method:"GET",
            headers:{
                "Content-Type":"application/json",            
                "Authorization":auth.token,
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

export async function findPerson(body:object,token:any) {
    try {        
        const url = `${process.env.HOST}${process.env.CONTROLLER_PERSON}/find`;

        const params = {
            method:"POST",            
            headers:{
                "Content-Type":"application/json",
                "Authorization":token,
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