import { createContext, useEffect, useState } from "react";
import { contextProps } from "../context/ContextWrapper";
import { Auth, AuthContextProps, LoginAccount, requestToken } from "./authInterface";
import axios from "../API/axios";
import { url } from "../API/url";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    //
    const login = async (e : any) => {
        e.preventDefault()
        const expired = requestToken.expires_at.toString()
        const expiredTime = new Date(expired)
        const currentTime = new Date()
        if (currentTime < expiredTime) {
            try {
                const response = await axios.post(url.auth.createTokenLogin,LoginAccount)
                if (response.data.success) {
                    try {
                        await axios.post(
                            url.auth.createSession,
                            JSON.stringify({ request_token : response.data.request_token})
                        )
                        .then((response) => {
                            window.localStorage.setItem('sid', response.data.session_id);
                            setAuth({
                                isAuth : true,
                                sessionId : response.data.session_id
                            })
                        })
                        .then(() => {
                            navigate("/")
                        })

                    }catch (e : any) {
                        console.log(e.response.data)
                    }
                }
            }catch (e : any) {
                console.log(e.response.data)
            }
        }
    };
    const getRequestToken = async (isCancelled : boolean) => {
        try {
            const response = await axios.get(url.auth.createTokenNew)
            if (!isCancelled){
                setRequestToken(response.data)
                setLoginAccount((account : any)=> ({...account, request_token : response?.data.request_token})) 
            }
        }catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        let isCancelled = false;
        getRequestToken(isCancelled);
        const session_id = window.localStorage.getItem('sid')
        if (!isCancelled) {
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
        }
        return () => {
            isCancelled = true;
        }
    },[])


    return (
        <AuthContext.Provider value={{auth,setAuth,LoginAccount,setLoginAccount,requestToken,setRequestToken,login}}>
            {children}
        </AuthContext.Provider>        
    )
}
export default AuthContext;