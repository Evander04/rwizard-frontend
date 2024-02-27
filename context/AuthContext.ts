import {
    createContext
} from "react";


const AuthContext = createContext({
    token:undefined,
    username:undefined,
    role:undefined,
    logIn:(user: any) => null,
    signOut:() => null
});

export default AuthContext;