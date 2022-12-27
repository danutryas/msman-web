import { Dispatch, SetStateAction } from "react"
import { Genre } from "../interface/show"
export interface SeriesContextProps {
    seriesList : SeriesList
    setSeriesList : Dispatch<SetStateAction<SeriesList>>
}
export interface SeriesList {
    discovery: Array<Tv>,
    popular : Array<Tv>,
    topRated : Array<Tv>,
    airingToday: Array<Tv>,
}
export const initialValueTvList : SeriesList = {
    discovery: [],
    popular : [],
    topRated : [],
    airingToday: [],
}
export interface Tv {
    id : number
    poster_path? : string
    backdrop_path? : string
    genres : Array<Genre>
    homepage? : string
    original_name : string
    vote_average : number
    name : string
    in_production : boolean
    last_air_date : string
    first_air_date : string
    number_of_episodes : number
    number_of_seasons : number
    seasons : Array<Season>
}
export const initialValueTv = { 
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
export interface Season {
    air_date : string,
    episode_count : number,
    id : number,
    name : string,
    overview : string,
    season_number : number
}
export const initialValueSeason = {
    air_date : "",
    episode_count : 0,
    id : 0,
    name : "",
    overview : "",
    season_number : 0
}

