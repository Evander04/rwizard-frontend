export const setToken = async (token:string) => {
    try {
        let tokenStored = await localStorage.setItem("token",token);
        return tokenStored;
    } catch (e) {
        return undefined
    }
}

export const getToken = async () => {
    try {
         let tokenStored = await localStorage.getItem("token");
         if (tokenStored) {
            return tokenStored;
         } else {
            return false;
         }
    } catch (e) {
        return null;
    }
}

export const setSession = async (session:any) => {
    try {
        let sessionStored = await localStorage.setItem("session",session);
        return sessionStored;
    } catch (e) {
        return undefined
    }
}

export const getSession = async () => {
    try {
         let sessionStored = await localStorage.getItem("session");
         if (sessionStored) {
            return sessionStored;
         } else {
            return false;
         }
    } catch (e) {
        return null;
    }
}

export const removeSession = async () => {
    try {
        await localStorage.removeItem("token");
        await localStorage.removeItem("session");
        return true;
    } catch (e) {
        return null;
    }
}