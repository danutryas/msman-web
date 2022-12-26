import { Dispatch, SetStateAction } from "react"
import { Tv } from "./series"
import { Movie } from "./movie"

export interface UserAccountContextProps {
    account : DetailsAccount
    setAccount : Dispatch<SetStateAction<DetailsAccount>>
    getUserAccount : () => void
}
export interface UserListContextProps {
    userWatchlist : UserWatchlist
    setUserWatchlist : Dispatch<SetStateAction<UserWatchlist>>
    userFavorite : UserFavorite
    setUserFavorite : Dispatch<SetStateAction<UserFavorite>>
    getWatchlist : () => void
    getFavorite : () => void
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

export const initialValueDetailsAccount : DetailsAccount = {
    avatar : {},
    id: 0,
    iso_639_1: "",
    iso_3166_1: "",
    name: "",
    include_adult: false,
    username: "",
}

export const initialValueWatchlist : UserWatchlist = {
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
export const initialValueFavorite : UserFavorite = {
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
export const initialValueRated : UserRated = {
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