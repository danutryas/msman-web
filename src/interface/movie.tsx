import { Genre } from "./show"

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
}

