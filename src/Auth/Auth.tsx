import { createContext, useEffect, useState } from "react";
import { contextProps } from "../context/ContextWrapper";
import { IAuth, AuthContextProps, ILoginAccount } from "./authInterface";
import axios from "../API/axios";
import { url } from "../API/url";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const AuthContext = createContext({} as AuthContextProps)

const initialState : IAuth = {
    isAuth : false,
    sessionId : ""
}
const initialStateAcc : ILoginAccount = {
    username : "",
    password : "",
    request_token : ""
}

export const AuthProvider  = ({children} : contextProps) => {
    const [LoginAccount,setLoginAccount] = useState(initialStateAcc);
    const [auth,setAuth] = useState(initialState)
    const navigate = useNavigate();
    // function
    const createRequestToken = async () => {
        try {
            const response = await axios.get(url.auth.createTokenNew)
            setLoginAccount((account : any)=> ({...account, request_token : response?.data.request_token})) 
        }catch (e){
            console.log(e)
        }
    }
    const createRequestTokenWithLogin = () => {
        return axios.post(url.auth.createTokenLogin,LoginAccount)
    }
    const createSession = () => {
        axios.post(url.auth.createSession,JSON.stringify({ request_token : dataToken?.data.request_token}))
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
    } 
    const login = async (e : any) => {
        e.preventDefault()
        fetchCreateToken()
    };
    const checkIsAuth = () => {
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
    }

    // http request
    const {data : dataToken,refetch : fetchCreateToken} = useQuery('create-token',createRequestTokenWithLogin,{enabled : false,})
    useQuery('create-session',createSession,{enabled : !!dataToken,})
    useQuery('request-token',createRequestToken,{refetchOnMount : true,refetchOnWindowFocus : true})

    useEffect(() => {
        let isCancelled = false;
        if (!isCancelled) checkIsAuth()        
        return () => {
            isCancelled = true;
        }
    },[])


    return (
        <AuthContext.Provider value={{auth,setAuth,LoginAccount,setLoginAccount,login}}>
            {children}
        </AuthContext.Provider>        
    )
}
export default AuthContext;