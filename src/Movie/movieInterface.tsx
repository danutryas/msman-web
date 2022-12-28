import { Dispatch, SetStateAction } from "react"
import { IGenre } from "../genre/genreInterface"
export interface MovieContextProps {
    movieList : IMovieList
    setMovieList : Dispatch<SetStateAction<IMovieList>>
}
export interface IMovieList {
    discovery: Array<IMovie>,
    popular : Array<IMovie>,
    topRated : Array<IMovie>,
    upcoming: Array<IMovie>,
    nowPlaying: Array<IMovie>,
}
export const initialValueMovieList : IMovieList = {
    discovery: [],
    nowPlaying: [],
    popular : [],
    topRated : [],
    upcoming : [],
}
export interface IMovie {
    id : number
    poster_path? : string
    backdrop_path? : string
    genres : Array<IGenre>
    homepage? : string
    original_title : string
    release_date : string
    runtime? : number
    vote_average : number
    title : string
};
