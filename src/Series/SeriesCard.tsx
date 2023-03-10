import {  useContext, useEffect, useState } from 'react';
import '../styles/card.scss'
import {  Add, Check, FavoriteBorder, FavoriteOutlined,    Star,   StarBorderOutlined, } from '@mui/icons-material';
import UserAccountContext from '../User/Account';
import AuthContext from '../Auth/Auth';
import UserListContext from '../UserList/ListContext';
import { FavoriteBody, WatchlistBody } from '../User/user';
import axios from '../API/axios';
import { ITv } from './seriesInterface';

interface SeriesProps {
    tv: ITv;
}

const SeriesCard = ({tv}: SeriesProps) => {
    // import contextAPI
    const {auth} = useContext(AuthContext);
    const {account} = useContext(UserAccountContext);
    const {userWatchlist,userFavorite,getFavorite,getWatchlist} = useContext(UserListContext)

    // data manipulation 
    const firstReleaseYear = tv.first_air_date !== undefined ? tv.first_air_date.slice(0,4) : 0
    const movieRating = tv.vote_average !== undefined ? tv.vote_average.toFixed(1) : 0.0
 
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

    const addSeriesToFavorite = () => {
        addFavorite({
            media_type : "tv",
            media_id : tv.id,
            favorite : !cardStatus.isFavorited,
        });
        setCardStatus((prev) => ({
            ...prev,
            isFavorited : !prev.isFavorited
        }))
        getFavorite();
        getWatchlist();

    }
    const giveRatingToSeries = () => {}
    const addSeriesToWatchlist = () => {
        addWatchList({
            media_type : "tv",
            media_id : tv.id,
            watchlist : !cardStatus.isWatchlist,
        });
        setCardStatus((prev) => ({
            ...prev,
            isWatchlist : !prev.isWatchlist
        }))
        getWatchlist();
        getFavorite();

    }

    useEffect(() => {
        const wl = userWatchlist?.tv.results
        wl.map((series : ITv) => {
            if (series.id === tv.id){
                setCardStatus((prev) => ({
                    ...prev,
                    isWatchlist : true
                }))
            }
            return "";
        })
        const fv = userFavorite?.tv.results
        fv.map((series : ITv) => {
            if (series.id === tv.id){
                setCardStatus((prev) => ({
                    ...prev,
                    isFavorited : true
                }))
            }
            return "";
        })
    },[userWatchlist,userFavorite,tv])
    
    return ( 
        <div className="card">
            <div className="card-image">
                <img src={`${process.env.REACT_APP_IMAGE_URL}` + tv.poster_path} className="image-poster" alt={tv.name}/>
                <div className="card-type">
                    <p>series</p>
                </div>
                <div className="add-favorite" onClick={addSeriesToFavorite}>
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
                            <p>{`${firstReleaseYear}`}</p>
                        </div>
                        <div className="rating">
                            <p>{movieRating}</p>
                            <button className="icon" onClick={giveRatingToSeries}>
                                {
                                    cardStatus.isRated ?
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
                    <button onClick={addSeriesToWatchlist}>
                        {cardStatus.isWatchlist ? <Check fontSize='inherit' />:<Add  fontSize='inherit'/>}
                        <span>Watchlist</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SeriesCard;