import { Dispatch, SetStateAction } from "react"
import { Movie, Tv } from "./card"

export interface UserAccountContextProps {
    account : UserAccount
    setAccount : Dispatch<SetStateAction<UserAccount>>
    addWatchList : (data : WatchlistBody) => void
    removeWatchList : () => void
    addFavorite : (data : FavoriteBody) => void
    removeFavorite : () => void
    addRated : () => void
    removeRated : () => void
}

export interface UserAccount {
    details : DetailsAccount
    watchlist : UserWatchlist
    favorite : UserFavorite
    rated : UserRated
}

export interface UserWatchlist {
    movies : ListMovieAccount
    tv : ListTvAccount
}
export interface UserFavorite {
    movies : ListMovieAccount
    tv : ListTvAccount
}
export interface UserRated {
    movies : ListMovieAccount
    tv : ListTvAccount
}

export interface DetailsAccount {
    avatar : Object;
    id: number;
    iso_639_1: String;
    iso_3166_1: String;
    name: String;
    include_adult: boolean;
    username: String;
}
export interface ListMovieAccount {
    page : number
    results : Array<Movie>
    total_pages : number
    total_results : number
}
export interface ListTvAccount {
    page : number
    results : Array<Tv>
    total_pages : number
    total_results : number
}
export interface WatchlistBody {
    media_type: String,
    media_id: number,
    watchlist: boolean
}
export interface FavoriteBody {
    media_type: String,
    media_id: number,
    favorite: boolean
}
