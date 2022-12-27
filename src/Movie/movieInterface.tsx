import { Dispatch, SetStateAction } from "react"
import { Genre } from "../interface/show"
export interface MovieContextProps {
    movieList : MovieList
    setMovieList : Dispatch<SetStateAction<MovieList>>
}
export interface MovieList {
    discovery: Array<Movie>,
    popular : Array<Movie>,
    topRated : Array<Movie>,
    upcoming: Array<Movie>,
    nowPlaying: Array<Movie>,
}
export const initialValueMovieList : MovieList = {
    discovery: [],
    nowPlaying: [],
    popular : [],
    topRated : [],
    upcoming : [],
}
export interface Movie {
    id : number
    poster_path? : string
    backdrop_path? : string
    genres : Array<Genre>
    homepage? : string
    original_title : string
    release_date : string
    runtime? : number
    vote_average : number
    title : string
};
