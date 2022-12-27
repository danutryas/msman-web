import { createContext, useContext,  useState } from "react";
import { contextProps } from "../context/ContextWrapper";
import {  UserAccountContextProps, initialValueDetailsAccount } from "./user";
import AuthContext from "../Auth/Auth";
import axios from "../API/axios";
import { useQuery } from "react-query";
import { url } from "../url";

const UserAccountContext = createContext({} as UserAccountContextProps)

export const AccountProvider = ({children} : contextProps) => {
    const {auth} = useContext(AuthContext)
    const [account,setAccount] = useState(initialValueDetailsAccount)
    
    // function to fetch data 
    const getUserAccount = async () => {
        try {
            const details = await axios.get(url.account.details,{params :{session_id : auth.sessionId}})
            setAccount(details.data)

        } catch (e : any) {
            console.log(e)
        }
    }
    // react-query hooks to trigger data fetching 
    useQuery('user-account',getUserAccount,{enabled : !!auth.sessionId})

    return(
        <UserAccountContext.Provider value={{account,setAccount,getUserAccount}}>
            {children}
        </UserAccountContext.Provider>
    )
}   

export default UserAccountContext;