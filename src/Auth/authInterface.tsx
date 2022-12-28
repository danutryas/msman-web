import { Dispatch, SetStateAction } from "react";

export interface LoginAccount {
    username : String;
    password : String;
    request_token : String;
}

export interface requestToken {
    expires_at : String ;
    request_token : String;
    success : Boolean;
}
export interface AuthContextProps {
    auth  : Auth
    setAuth : Dispatch<SetStateAction<Auth>>
    LoginAccount : LoginAccount
    setLoginAccount : Dispatch<SetStateAction<LoginAccount>>
    login : (e : any) => Promise<void>
}

export interface Auth {
    isAuth : boolean
    sessionId : string
}