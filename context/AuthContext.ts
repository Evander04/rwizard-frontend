import {
    createContext
} from "react";


const AuthContext = createContext({
    auth:undefined,
    logIn:(user: any) => null,
    signOut:() => null
});

export default AuthContext;