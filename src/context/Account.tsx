import { createContext, useContext, useEffect, useState, useTransition } from "react";
import { contextProps } from "./main";
import { DetailsAccount, FavoriteBody, UserAccount, UserAccountContextProps, UserFavorite, UserRated, UserWatchlist, WatchlistBody } from "../interface/user";
import AuthContext from "./Auth";
import axios from "../API/axios";

const UserAccountContext = createContext({} as UserAccountContextProps)

const initialValueDetails : DetailsAccount = {
    avatar : {},
    id: 0,
    iso_639_1: "",
    iso_3166_1: "",
    name: "",
    include_adult: false,
    username: "",
}
const initialValueWatchlist : UserWatchlist = {
    movies : {
        page : 0,
        results : [],
        total_pages : 0,
        total_results : 0
    },
    tv : {
        page : 0,
        results : [],
        total_pages : 0,
        total_results : 0
    },
}
const initialValueFavorite : UserFavorite = {
    movies : {
        page : 0,
        results : [],
        total_pages : 0,
        total_results : 0
    },
    tv : {
        page : 0,
        results : [],
        total_pages : 0,
        total_results : 0
    },
}
const initialValueRated : UserRated = {
    movies : {
        page : 0,
        results : [],
        total_pages : 0,
        total_results : 0
    },
    tv : {
        page : 0,
        results : [],
        total_pages : 0,
        total_results : 0
    },
}
export const initialValueAccount : UserAccount = {
    details : initialValueDetails,
    watchlist : initialValueWatchlist,
    favorite : initialValueFavorite,
    rated : initialValueRated,
}



export const AccountProvider = ({children} : contextProps) => {
    const [account,setAccount] = useState(initialValueAccount)
    const [sid,setSid]  = useState('')
    
    const addWatchList = async ( data : WatchlistBody) => {
        try {
            const response = await axios.post(`/account/${account.details.id}/watchlist`,data,{params :{session_id : sid}})
        }catch (e) {
            console.log(e)
        }
    }
    const addFavorite = async (data : FavoriteBody) => {
        const response = await axios.post(`/account/${account.details.id}/favorite`,data,{params :{session_id : sid}})
        console.log(response)
    }
    const addRated = async () => {
        // const response = await axios.get("/account/:account_id/watchlist",{params :{session_id : sid}})
        // console.log(response)
    }
    const removeRated = async () => {
        // const response = await axios.get("/account/:account_id/watchlist",{params :{session_id : sid}})
        // console.log(response)
    }
    const getWatchlist = async (sid : String |  null) => {
        try {
            const watchlistTv = await axios.get(`/account/${account.details.id}/watchlist/tv`,{params :{session_id : sid}})
            const watchlistMovies = await axios.get(`/account/${account.details.id}/watchlist/movies`,{params :{session_id : sid}})
            setAccount((account : UserAccount) => ({
                ...account,
                watchlist : {
                    tv : watchlistTv.data,
                    movies : watchlistMovies.data
                }
            }))
        }catch (e: any) {
            console.log(e)
        }
    }
    const getFavorite = async (sid : String |  null) => {
        try {
            const favoriteTv = await axios.get(`/account/${account.details.id}/favorite/tv`,{params :{session_id : sid}})
            const favoriteMovies = await axios.get(`/account/${account.details.id}/favorite/movies`,{params :{session_id : sid}})
            setAccount((account : UserAccount) => ({
                ...account,
                favorite : {
                    tv : favoriteTv.data,
                    movies : favoriteMovies.data
                }
            }))
        }catch (e: any) {
            console.log(e)
        }
    }
    const getRated = async (sid : String |  null) => {
        try {
            const ratedMovies = await axios.get(`/account/${account.details.id}/rated/movies`,{params :{session_id : sid}})
            setAccount((account : UserAccount) => ({
                ...account,
                rated : {
                    ...account.rated,
                    movies : ratedMovies.data,
                },
            }))
        }catch (e: any) {
            console.log(e)
        }
    }
    const getUserAccount = async (sid : String | null) => {
        try {
            const details = await axios.get("/account",{params :{session_id : sid}})
            setAccount((acc: UserAccount) => ({
                ...acc,
                details : details.data,
            }))

        } catch (e : any) {
            console.log(e)
        }
    }

    useEffect(() => {
        const sid = window.localStorage.getItem('sid')
        setSid(sid ? sid : "")
        getUserAccount(sid)
        getWatchlist(sid)
        getFavorite(sid)
        getRated(sid)
    },[])



    return(
        <UserAccountContext.Provider value={{account,setAccount,addWatchList,addFavorite,addRated,getUserAccount,getWatchlist,getFavorite,getRated}}>
            {children}
        </UserAccountContext.Provider>
    )
}   

export default UserAccountContext;