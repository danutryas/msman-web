import { useEffect, useState } from 'react';
import '../../styles/card.scss'
import {  Add, Check, FavoriteBorder, FavoriteOutlined,  Movie,  Star,  StarBorder,  StarBorderOutlined, } from '@mui/icons-material';

interface MovieProps {
    movie: any;
}

const MovieCard = ({movie}: MovieProps) => {

    const IMAGE_URL = process.env.REACT_APP_IMAGE_URL
    const releaseYear = movie.release_date != undefined ? movie.release_date.slice(0,4) : 0
    const movieRating = movie.vote_average != undefined ? movie.vote_average.toFixed(1) : 0.0
 
    const [isFavorited,setIsFavorited] = useState(false)
    const [isRated,setIsRated] = useState(false)
    const [isWatchlist,setIsWatchlist] = useState(false)

    const addMovieToFavorite = () => {
        setIsFavorited(prev => !prev)
    }
    const giveRatingToMovie = () => {
        setIsRated(prev => !prev)
    }
    const addMovieToWatchlist = () => {
        setIsWatchlist(prev => !prev)
    }    

    return ( 
        <div className="card">
            <div className="card-image">
                <img src={`${IMAGE_URL}` + movie.poster_path} className="image-poster"/>
                <div className="add-favorite" onClick={addMovieToFavorite}>
                    <div className="bookmark-wrapper">
                        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 0H4C1.8 0 0.0200005 1.8 0.0200005 4L0 36L14 30L28 36V4C28 1.8 26.2 0 24 0Z"/>
                        </svg>
                    </div>
                    <div className="plus-icon">
                        {isFavorited ? <FavoriteOutlined fontSize='inherit'/>:<FavoriteBorder fontSize='inherit'/>}
                    </div>
                </div>
            </div>
            <div className="card-text">
                <div className="card-description">
                    <div className="movie-overview">
                        <div className="release">
                            <p>{releaseYear}</p>
                        </div>
                        <div className="rating">
                            <p>{movieRating}</p>
                            <button className="icon" onClick={giveRatingToMovie}>
                                {
                                    isRated ?
                                    <Star fontSize='inherit'/> :
                                    <StarBorderOutlined fontSize='inherit'/> 
                                }
                            </button>
                        </div>
                    </div>
                    <div className="movie-title">
                        <p>{movie ? movie.title : ""}</p>
                    </div>
                </div>
                <div className="card-action">
                    <button onClick={addMovieToWatchlist}>
                        {isWatchlist ? <Check fontSize='inherit' />:<Add  fontSize='inherit'/>}
                        <span>Watchlist</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
interface SeriesProps {
    tv: any;
}
const SeriesCard = ({tv}: SeriesProps) => {

    const IMAGE_URL = process.env.REACT_APP_IMAGE_URL
    const firstReleaseYear = tv.first_air_date != undefined ? tv.first_air_date.slice(0,4) : 0
    const movieRating = tv.vote_average != undefined ? tv.vote_average.toFixed(1) : 0.0
 
    const [isFavorited,setIsFavorited] = useState(false)
    const [isRated,setIsRated] = useState(false)
    const [isWatchlist,setIsWatchlist] = useState(false)

    const addMovieToFavorite = () => {
        setIsFavorited(prev => !prev)
    }
    const giveRatingToMovie = () => {
        setIsRated(prev => !prev)
    }
    const addMovieToWatchlist = () => {
        setIsWatchlist(prev => !prev)
    }    

    return ( 
        <div className="card">
            <div className="card-image">
                <img src={`${IMAGE_URL}` + tv.poster_path} className="image-poster"/>
                <div className="add-favorite" onClick={addMovieToFavorite}>
                    <div className="bookmark-wrapper">
                        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 0H4C1.8 0 0.0200005 1.8 0.0200005 4L0 36L14 30L28 36V4C28 1.8 26.2 0 24 0Z"/>
                        </svg>
                    </div>
                    <div className="plus-icon">
                        {isFavorited ? <FavoriteOutlined fontSize='inherit'/>:<FavoriteBorder fontSize='inherit'/>}
                    </div>
                </div>
            </div>
            <div className="card-text">
                <div className="card-description">
                    <div className="movie-overview">
                        <div className="release">
                            <p>{`${firstReleaseYear}`}</p>
                        </div>
                        <div className="rating">
                            <p>{movieRating}</p>
                            <button className="icon" onClick={giveRatingToMovie}>
                                {
                                    isRated ?
                                    <Star fontSize='inherit'/> :
                                    <StarBorderOutlined fontSize='inherit'/> 
                                }
                            </button>
                        </div>
                    </div>
                    <div className="movie-title">
                        <p>{tv ? tv.name : ""}</p>
                    </div>
                </div>
                <div className="card-action">
                    <button onClick={addMovieToWatchlist}>
                        {isWatchlist ? <Check fontSize='inherit' />:<Add  fontSize='inherit'/>}
                        <span>Watchlist</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export {MovieCard,SeriesCard};

interface Movie {
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
interface Tv {
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
interface Genre {
    id : number
    name : string
}
interface Season {
    air_date : string,
    episode_count : number,
    id : number,
    name : string,
    overview : string,
    season_number : number
}