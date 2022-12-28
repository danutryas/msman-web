import { Dispatch, SetStateAction } from "react";

export interface ILoginAccount {
    username : String;
    password : String;
    request_token : String;
}

export interface AuthContextProps {
    auth  : IAuth
    setAuth : Dispatch<SetStateAction<IAuth>>
    LoginAccount : ILoginAccount
    setLoginAccount : Dispatch<SetStateAction<ILoginAccount>>
    login : (e : any) => Promise<void>
}

export interface IAuth {
    isAuth : boolean
    sessionId : string
}