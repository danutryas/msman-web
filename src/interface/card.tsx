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

export interface Genre {
    id : number
    name : string
}
export interface Season {
    air_date : string,
    episode_count : number,
    id : number,
    name : string,
    overview : string,
    season_number : number
}
