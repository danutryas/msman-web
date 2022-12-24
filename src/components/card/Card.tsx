import {  useContext, useEffect, useState } from 'react';
import '../../styles/card.scss'
import {  Add, Check, FavoriteBorder, FavoriteOutlined,    Star,   StarBorderOutlined, } from '@mui/icons-material';
import WatchlistContext from '../../context/watchlistContext';
import UserAccountContext, { initialValueAccount } from '../../context/Account';
import { Movie, Tv } from '../../interface/card';
import AuthContext from '../../context/Auth';
import axios from '../../API/axios';

interface MovieProps {
    movie: Movie;
}
interface SeriesProps {
    tv: Tv;
}

const MovieCard = ({movie}: MovieProps) => {
    // context import
    const {auth} = useContext(AuthContext)
    const {account,addWatchList,addFavorite,addRated,getUserAccount,getWatchlist,getFavorite} = useContext(UserAccountContext);
    
    // data manipulation
    const IMAGE_URL = process.env.REACT_APP_IMAGE_URL
    const releaseYear = movie.release_date !== undefined ? movie.release_date.slice(0,4) : 0
    const movieRating = movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : 0.0
    
    // state 
    const [isFavorited,setIsFavorited] = useState(false)
    const [isRated,setIsRated] = useState(false)
    const [isWatchlist,setIsWatchlist] = useState(false)

    // function
    const addMovieToFavorite = () => {
        setIsFavorited(prev => !prev)
        addFavorite({
            media_type : "movie",
            media_id : movie.id,
            favorite : !isFavorited,
        })
        getFavorite(auth.sessionId)
    }
    const giveRatingToMovie = () => {
        setIsRated(prev => !prev)
    }
    const addMovieToWatchlist = () => {
        setIsWatchlist(prev => !prev)
        addWatchList({
            media_type : "movie",
            media_id : movie.id,
            watchlist : !isWatchlist,
        })
        getWatchlist(auth.sessionId)
    }    

    useEffect(() => {
        if (account !== initialValueAccount) {
            let data = account.watchlist.movies.results
            data.map((mov : Movie) => {
                if (mov.id === movie.id){
                    setIsWatchlist(true)
                }
            })
            data = account.favorite.movies.results
            data.map((mov : Movie) => {
                if (mov.id === movie.id){
                    setIsFavorited(true)
                }
            })
            data = account.rated.movies.results
            data.map((mov : Movie) => {
                if (mov.id === movie.id){
                    setIsRated(true)
                }
            })
        }
    },[])


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

const SeriesCard = ({tv}: SeriesProps) => {
    // import contextAPI
    const {auth} = useContext(AuthContext)
    const {account,addWatchList,addFavorite,addRated,getWatchlist,getFavorite} = useContext(UserAccountContext);

    // data manipulation 
    const IMAGE_URL = process.env.REACT_APP_IMAGE_URL
    const firstReleaseYear = tv.first_air_date !== undefined ? tv.first_air_date.slice(0,4) : 0
    const movieRating = tv.vote_average !== undefined ? tv.vote_average.toFixed(1) : 0.0
 
    // state
    const [isFavorited,setIsFavorited] = useState(false)
    const [isRated,setIsRated] = useState(false)
    const [isWatchlist,setIsWatchlist] = useState(false)

    // function
    const addMovieToFavorite = () => {
        setIsFavorited(prev => !prev)
        addFavorite({
            media_type : "tv",
            media_id : tv.id,
            favorite : !isFavorited,
        });
        getFavorite(auth.sessionId);
    }
    const giveRatingToMovie = () => {
        setIsRated(prev => !prev)
    }
    const addMovieToWatchlist = () => {
        setIsWatchlist(prev => !prev)
        addWatchList({
            media_type : "tv",
            media_id : tv.id,
            watchlist : !isWatchlist,
        });
        getWatchlist(auth.sessionId);
    }    

    useEffect(() => {
        if (account !== initialValueAccount) {
            let data = account.watchlist.tv.results
            data.map((series : Tv) => {
                if (series.id === tv.id){
                    setIsWatchlist(true)
                }
            })
            data = account.favorite.tv.results
            data.map((series : Tv) => {
                if (series.id === tv.id){
                    setIsFavorited(true)
                }
            })
            data = account.rated.tv.results
            data.map((series : Tv) => {
                if (series.id === tv.id){
                    setIsRated(true)
                }
            })
        }
    },[])

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
