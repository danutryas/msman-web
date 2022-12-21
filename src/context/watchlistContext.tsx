import { ReactNode, createContext, useEffect, useState } from "react";
import { contextProps } from "./main";

interface watchlistProps{
    watchlist : any,
    addMovieToWatchList : (object : any) => void
    addSeriesToWatchList : (object : any) => void
}


const WatchlistContext = createContext({} as watchlistProps)

export const WatchlistContextProvider = ({children} : contextProps) => {
    const initialValue = {
        movies : [],
        series : [],
    }
    const [watchlist,setWatchlist] = useState(initialValue)

    const addMovieToWatchList = (objData : object) => {
        setWatchlist((watchlist: any) => ({
            ...watchlist,
            movies : [
                ...watchlist.movies,
                objData
            ]
        }))
    }
    const addSeriesToWatchList = (objData : object) => {
        setWatchlist((watchlist: any) => ({
            ...watchlist,
            series : [
                ...watchlist.series,
                objData
            ]
        }))
    }

    return(
        <WatchlistContext.Provider value={{watchlist,addMovieToWatchList,addSeriesToWatchList}}>
            {children}
        </WatchlistContext.Provider>
    )
}
export default WatchlistContext;