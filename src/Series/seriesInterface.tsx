import { Dispatch, SetStateAction } from "react"
import { IGenre } from "../genre/genreInterface"
export interface SeriesContextProps {
    seriesList : ISeriesList
    setSeriesList : Dispatch<SetStateAction<ISeriesList>>
}
export interface ISeriesList {
    discovery: Array<ITv>,
    popular : Array<ITv>,
    topRated : Array<ITv>,
    airingToday: Array<ITv>,
}
export const initialValueTvList : ISeriesList = {
    discovery: [],
    popular : [],
    topRated : [],
    airingToday: [],
}
export interface ITv {
    id : number
    poster_path? : string
    backdrop_path? : string
    genres : Array<IGenre>
    homepage? : string
    original_name : string
    vote_average : number
    name : string
    in_production : boolean
    last_air_date : string
    first_air_date : string
    number_of_episodes : number
    number_of_seasons : number
    seasons : Array<ISeason>
}
export const initialValueTv : ITv = { 
    id : 0,
    poster_path : "",
    backdrop_path : "",
    genres : [],
    homepage : "",
    original_name : "",
    vote_average : 0,
    name : "",
    in_production : false,
    last_air_date : "",
    first_air_date : "",
    number_of_episodes : 0,
    number_of_seasons : 0,
    seasons : [],
}
export interface ISeason {
    air_date : string,
    episode_count : number,
    id : number,
    name : string,
    overview : string,
    season_number : number
}
export const initialValueSeason : ISeason = {
    air_date : "",
    episode_count : 0,
    id : 0,
    name : "",
    overview : "",
    season_number : 0
}

