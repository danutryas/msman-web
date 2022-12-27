import { createContext, useEffect, useState } from "react";
import { contextProps } from "../context/ContextWrapper";
import { Auth, AuthContextProps, LoginAccount, requestToken } from "./authInterface";
import axios from "../API/axios";
import { url } from "../API/url";

const AuthContext = createContext({} as AuthContextProps)

const initialState : Auth = {
    isAuth : false,
    sessionId : ""
}
const initialStateReqToken : requestToken = {
    expires_at : "",
    request_token : "",
    success : "",
}
const initialStateAcc : LoginAccount = {
    username : "",
    password : "",
    request_token : ""
}

export const AuthProvider  = ({children} : contextProps) => {
    const [LoginAccount,setLoginAccount] = useState(initialStateAcc);
    const [auth,setAuth] = useState(initialState)
    const [requestToken, setRequestToken] = useState(initialStateReqToken)
    const login = async (e : any) => {
        e.preventDefault()
        const expired = requestToken.expires_at
        const expiredTime = new Date(expired.toString())
        const currentTime = new Date()
        if (currentTime < expiredTime) {
            try {
                const response = await axios.post(url.auth.createTokenLogin,LoginAccount)
                if (response.data.success) {
                    try {
                        const responseLogin = await axios.post(
                            url.auth.createSession,
                            JSON.stringify({ request_token : response.data.request_token})
                        )
                        window.localStorage.setItem('sid', responseLogin.data.session_id);
                    }catch (e : any) {
                        console.log(e.response.data)
                    }
                }
            }catch (e : any) {
                console.log(e.response.data)
            }
        }else {
            getRequestToken()
        }
    };
    const getRequestToken = async () => {
        try {
            const response = await axios.get(url.auth.createTokenNew)
            setRequestToken(response.data)
            setLoginAccount((account : any)=> ({...account, request_token : response?.data?.request_token})) 
        }catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        getRequestToken();
        const session_id = window.localStorage.getItem('sid')
        if (session_id === null) {
            setAuth((auth : any) => ({
                ...auth,
                isAuth : false
            }))
        }else {
            setAuth((auth : any) => ({
                ...auth,
                isAuth : true,
                sessionId : session_id
            }))
        }
    },[])


    return (
        <AuthContext.Provider value={{auth,setAuth,LoginAccount,setLoginAccount,requestToken,setRequestToken,login}}>
            {children}
        </AuthContext.Provider>        
    )
}
export default AuthContext;