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
const initialValue : UserAccount = {
    details : initialValueDetails,
    watchlist : initialValueWatchlist,
    favorite : initialValueFavorite,
    rated : initialValueRated,
}


export const AccountProvider = ({children} : contextProps) => {
    const [account,setAccount] = useState(initialValue)

    
    const addWatchList = async ( data : WatchlistBody) => {
        try {
            const sid = window.localStorage.getItem('sid')
            const response = await axios.post(`/account/${account.details.id}/watchlist`,data,{params :{session_id : sid}})
            console.log(response)
        }catch (e) {
            console.log(e)
        }
    }
    const removeWatchList = async () => {
        // const sid = window.localStorage.getItem('sid')
        // const response = await axios.get("/account/:account_id/watchlist",{params :{session_id : sid}})
        // console.log(response)
    }
    const addFavorite = async (data : FavoriteBody) => {
        const sid = window.localStorage.getItem('sid')
        const response = await axios.post(`/account/${account.details.id}/favorite`,data,{params :{session_id : sid}})
        console.log(response)
    }
    const removeFavorite = async () => {
        // const sid = window.localStorage.getItem('sid')
        // const response = await axios.get("/account/:account_id/watchlist",{params :{session_id : sid}})
        // console.log(response)
    }
    const addRated = async () => {
        // const sid = window.localStorage.getItem('sid')
        // const response = await axios.get("/account/:account_id/watchlist",{params :{session_id : sid}})
        // console.log(response)
    }
    const removeRated = async () => {
        // const sid = window.localStorage.getItem('sid')
        // const response = await axios.get("/account/:account_id/watchlist",{params :{session_id : sid}})
        // console.log(response)
    }


    const getUserAccount = async (session : String | null) => {
        if (session !== null) {
            try {
                const details = await axios.get("/account",{params :{session_id : session}})
                const watchlistTv = await axios.get(`/account/${details.data.id}/watchlist/tv`,{params :{session_id : session}})
                const watchlistMovies = await axios.get(`/account/${details.data.id}/watchlist/movies`,{params :{session_id : session}})
                const favoriteTv = await axios.get(`/account/${details.data.id}/favorite/tv`,{params :{session_id : session}})
                const favoriteMovies = await axios.get(`/account/${details.data.id}/favorite/movies`,{params :{session_id : session}})
                const ratedMovies = await axios.get(`/account/${details.data.id}/rated/movies`,{params :{session_id : session}})
                setAccount((acc: any) => ({
                    ...acc,
                    details : details.data,
                    watchlist : {
                        tv : watchlistTv.data,
                        movies : watchlistMovies.data,
                    },
                    favorite : {
                        tv: favoriteTv.data,
                        movies: favoriteMovies.data,
                    },
                    rated : {
                        ...acc.rated,
                        movies : ratedMovies.data,
                    },
                }))
            } catch (e : any) {
                console.log(e.response)
            }
        }
    }

    useEffect(() => {
        const sid = window.localStorage.getItem('sid')
        getUserAccount(sid)
    },[])


    return(
        <UserAccountContext.Provider value={{account,setAccount,addWatchList,removeWatchList,
            addFavorite,
            removeFavorite,
            addRated,
            removeRated,}}>
            {children}
        </UserAccountContext.Provider>
    )
}   

export default UserAccountContext;