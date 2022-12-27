import { createContext, useContext, useEffect, useState, useTransition } from "react";
import { contextProps } from "../context/ContextWrapper";
import { DetailsAccount, FavoriteBody,  UserAccountContextProps, UserFavorite, UserListContextProps, UserRated, UserWatchlist, WatchlistBody, initialValueFavorite, initialValueRated, initialValueWatchlist } from "../User/user";
import AuthContext from "../Auth/Auth";
import axios from "../API/axios";
import { useQuery } from "react-query";
import UserAccountContext from "../User/Account";

const UserListContext = createContext({} as UserListContextProps)

export const UserListProvider = ({children} : contextProps) => {
    // import context
    const {account} = useContext(UserAccountContext)
    const {auth} = useContext(AuthContext)

    // state
    const [userWatchlist, setUserWatchlist] = useState(initialValueWatchlist)
    const [userFavorite, setUserFavorite] = useState(initialValueFavorite)
    // const [userRated, setUserRated] = useState()
    const accountId = account?.id
    
    // function to fetch data 
    const getWatchlist = async () => {
        try {
            const watchlistTv = await axios.get(`/account/${account?.id}/watchlist/tv`,{params :{session_id : auth.sessionId}})
            const watchlistMovies = await axios.get(`/account/${account?.id}/watchlist/movies`,{params :{session_id : auth.sessionId}})
            setUserWatchlist({
                tv : watchlistTv.data,
                movies : watchlistMovies.data
            })
        }catch (e: any) {
            console.log(e)
        }
    }
    const getFavorite = async () => {
        try {
            const favoriteTv = await axios.get(`/account/${account?.id}/favorite/tv`,{params :{session_id : auth.sessionId}})
            const favoriteMovies = await axios.get(`/account/${account?.id}/favorite/movies`,{params :{session_id : auth.sessionId}})
            setUserFavorite({
                tv : favoriteTv.data,
                movies : favoriteMovies.data
            })
        }catch (e: any) {
            console.log(e)
        }
    }
    // const getRated = async () => {
    //     try {
    //         const ratedMovies = await axios.get(`/account/${account.details.id}/rated/movies`,{params :{session_id : sid}})
    //         setAccount((account : UserAccount) => ({
    //             ...account,
    //             rated : {
    //                 ...account.rated,
    //                 movies : ratedMovies.data,
    //             },
    //         }))
    //     }catch (e: any) {
    //         console.log(e)
    //     }
    // }
    
    // react-query hooks to trigger data fetching     
    useQuery('user-watchlist',getWatchlist,{enabled : !!auth.sessionId && !!accountId,refetchOnMount : true, refetchOnWindowFocus : true})
    useQuery('user-favorite',getFavorite,{enabled : !!auth.sessionId && !!accountId,refetchOnMount : true, refetchOnWindowFocus : true})

    return(
        <UserListContext.Provider value={{userWatchlist, setUserWatchlist,userFavorite, setUserFavorite,getWatchlist,getFavorite,}}>
            {children}
        </UserListContext.Provider>
    )
}   

export default UserListContext;