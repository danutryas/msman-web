import {  useContext, useState } from 'react';
import '../../styles/card.scss'
import {  Add, Check, FavoriteBorder, FavoriteOutlined,    Star,   StarBorderOutlined, } from '@mui/icons-material';
import WatchlistContext from '../../context/watchlistContext';
import UserAccountContext from '../../context/Account';

interface MovieProps {
    movie: any;
}

const MovieCard = ({movie}: MovieProps) => {
    const {addWatchList,addFavorite,addRated} = useContext(UserAccountContext);
    const IMAGE_URL = process.env.REACT_APP_IMAGE_URL
    const releaseYear = movie.release_date !== undefined ? movie.release_date.slice(0,4) : 0
    const movieRating = movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : 0.0
    

    const [isFavorited,setIsFavorited] = useState(false)
    const [isRated,setIsRated] = useState(false)
    const [isWatchlist,setIsWatchlist] = useState(false)

    const addMovieToFavorite = () => {
        setIsFavorited(prev => !prev)
        addFavorite({
            media_type : "movie",
            media_id : movie.id,
            favorite : true,
        })
    }
    const giveRatingToMovie = () => {
        setIsRated(prev => !prev)
    }
    const addMovieToWatchlist = () => {
        setIsWatchlist(prev => !prev)
        // addMovieToWatchList(movie)
        console.log(movie.id)
        addWatchList({
            media_type : "movie",
            media_id : movie.id,
            watchlist : true,
        })
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
    const {addSeriesToWatchList} = useContext(WatchlistContext)
    const {addWatchList,addFavorite,addRated} = useContext(UserAccountContext);

    const IMAGE_URL = process.env.REACT_APP_IMAGE_URL
    const firstReleaseYear = tv.first_air_date !== undefined ? tv.first_air_date.slice(0,4) : 0
    const movieRating = tv.vote_average !== undefined ? tv.vote_average.toFixed(1) : 0.0
 
    const [isFavorited,setIsFavorited] = useState(false)
    const [isRated,setIsRated] = useState(false)
    const [isWatchlist,setIsWatchlist] = useState(false)

    const addMovieToFavorite = () => {
        setIsFavorited(prev => !prev)
        addFavorite({
            media_type : "tv",
            media_id : tv.id,
            favorite : true,
        })
    }
    const giveRatingToMovie = () => {
        setIsRated(prev => !prev)
    }
    const addMovieToWatchlist = (series : any) => {
        addWatchList({
            media_type : "tv",
            media_id : tv.id,
            watchlist : true,
        })
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
