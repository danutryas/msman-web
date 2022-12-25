import {  useContext, useEffect, useState } from 'react';
import '../../styles/card.scss'
import {  Add, Check, FavoriteBorder, FavoriteOutlined, Star, StarBorderOutlined} from '@mui/icons-material';
import UserAccountContext from '../../context/Account';
import { Movie} from '../../interface/card';
import UserListContext from '../../context/ListContext';
import { FavoriteBody, WatchlistBody } from '../../interface/user';
import axios from '../../API/axios';
import AuthContext from '../../context/Auth';

interface MovieProps {
    movie: Movie;
}

const MovieCard = ({movie}: MovieProps) => {
    // context import
    const {auth} = useContext(AuthContext)
    const {account} = useContext(UserAccountContext);
    const {userWatchlist,userFavorite,getFavorite, getWatchlist} = useContext(UserListContext)
    
    // data manipulation
    const releaseYear = movie.release_date !== undefined ? movie.release_date.slice(0,4) : 0
    const movieRating = movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : 0.0
   
    // state 
    const [cardStatus,setCardStatus] = useState({
        isFavorited : false,
        isRated : false,
        isWatchlist : false,
    })

    // function
    const addWatchList = async ( data : WatchlistBody) => {
        try {
            await axios.post(`/account/${account?.id}/watchlist`,data,{params :{session_id : auth?.sessionId}})
        }catch (e) {
            console.log(e)
        }
    }
    const addFavorite = async (data : FavoriteBody) => {
        try {
            await axios.post(`/account/${account?.id}/favorite`,data,{params :{session_id : auth?.sessionId}})
        } catch (e) {
            console.log(e)
        }
    }

    const addMovieToFavorite = () => {
        addFavorite({
            media_type : "movie",
            media_id : movie.id,
            favorite : !cardStatus.isFavorited,
        })
        getFavorite()
        getWatchlist()
        setCardStatus((prev) => ({
            ...prev,
            isFavorited : !prev.isFavorited
        }))
    }
    const giveRatingToMovie = () => {
    }
    const addMovieToWatchlist = () => {
        addWatchList({
            media_type : "movie",
            media_id : movie.id,
            watchlist : !cardStatus.isWatchlist,
        })
        setCardStatus((prev) => ({
            ...prev,
            isWatchlist : !prev.isWatchlist
        }))
        getWatchlist()
        getFavorite()

    }    

    useEffect(() => {
        const wl = userWatchlist?.movies.results
        wl.map((mov : Movie) => {
            if (mov.id === movie.id){
                setCardStatus((prev) => ({
                    ...prev,
                    isWatchlist : true
                }))
            }
        })
        const fv = userFavorite?.movies.results
        fv.map((mov : Movie) => {
            if (mov.id === movie.id){
                setCardStatus((prev) => ({
                    ...prev,
                    isFavorited : true
                }))
            }
        })
    },[userWatchlist,userFavorite])

    return ( 
        <div className="card">
            <div className="card-image">
                <img src={`${process.env.REACT_APP_IMAGE_URL}` + movie.poster_path} className="image-poster"/>
                <div className="card-type">
                    <p>movie</p>
                </div>
                <div className="add-favorite" onClick={addMovieToFavorite}>
                    <div className="bookmark-wrapper">
                        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 0H4C1.8 0 0.0200005 1.8 0.0200005 4L0 36L14 30L28 36V4C28 1.8 26.2 0 24 0Z"/>
                        </svg>
                    </div>
                    <div className="plus-icon">
                        {cardStatus.isFavorited ? <FavoriteOutlined fontSize='inherit'/>:<FavoriteBorder fontSize='inherit'/>}
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
                                    cardStatus.isRated ?
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
                        {
                            cardStatus.isWatchlist ? 
                            <Check fontSize='inherit' />
                            :
                            <Add  fontSize='inherit'/>
                        }
                        <span>Watchlist</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default MovieCard;